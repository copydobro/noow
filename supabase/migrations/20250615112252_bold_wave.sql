/*
  # Achievements and Statistics System

  1. New Tables
    - `achievements` - Available achievements
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `criteria_type` (text)
      - `criteria_value` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

    - `user_achievements` - User earned achievements
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `achievement_id` (uuid, references achievements)
      - `earned_at` (timestamptz)
      - `progress` (integer)

    - `user_statistics` - Aggregated user statistics
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `total_cycles` (integer)
      - `total_work_time` (integer)
      - `total_activation_time` (integer)
      - `total_rest_time` (integer)
      - `current_streak` (integer)
      - `best_streak` (integer)
      - `last_activity_date` (date)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT '🏆',
  criteria_type text NOT NULL CHECK (criteria_type IN ('cycles_completed', 'streak_days', 'total_time', 'activations_completed')),
  criteria_value integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create user achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0,
  UNIQUE(user_id, achievement_id)
);

-- Create user statistics table
CREATE TABLE IF NOT EXISTS user_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  total_cycles integer DEFAULT 0,
  total_work_time integer DEFAULT 0,
  total_activation_time integer DEFAULT 0,
  total_rest_time integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  best_streak integer DEFAULT 0,
  last_activity_date date,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- Policies for achievements (public read)
CREATE POLICY "Anyone can view achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Policies for user_achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own achievements"
  ON user_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for user_statistics
CREATE POLICY "Users can view own statistics"
  ON user_statistics
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own statistics"
  ON user_statistics
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own statistics"
  ON user_statistics
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_statistics_user_id ON user_statistics(user_id);

-- Create trigger for user_statistics updated_at
CREATE TRIGGER handle_user_statistics_updated_at
  BEFORE UPDATE ON user_statistics
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Insert default achievements
INSERT INTO achievements (name, description, criteria_type, criteria_value) VALUES
  ('Первый цикл', 'Завершил первый цикл Noowing', 'cycles_completed', 1),
  ('Неделя силы', '7 дней подряд Noowing', 'streak_days', 7),
  ('Месяц ритма', '30 дней Noowing', 'streak_days', 30),
  ('Энергетический воин', '100 активаций', 'activations_completed', 100),
  ('Мастер концентрации', '500 циклов работы', 'cycles_completed', 500),
  ('Марафонец', '100 часов общего времени', 'total_time', 360000),
  ('Постоянство', '14 дней подряд', 'streak_days', 14),
  ('Сотня', '100 завершенных циклов', 'cycles_completed', 100)
ON CONFLICT DO NOTHING;