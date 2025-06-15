/*
  # Productivity Cycles and Sessions

  1. New Tables
    - `productivity_cycles` - Main cycle tracking
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `cycle_type` (text) - 'work', 'activation', 'rest'
      - `planned_duration` (integer) - in seconds
      - `actual_duration` (integer) - in seconds
      - `started_at` (timestamptz)
      - `completed_at` (timestamptz)
      - `status` (text) - 'active', 'completed', 'skipped', 'interrupted'
      - `notes` (text)
      - `created_at` (timestamptz)

    - `daily_sessions` - Daily aggregated data
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `session_date` (date)
      - `total_cycles` (integer)
      - `work_cycles` (integer)
      - `activation_cycles` (integer)
      - `rest_cycles` (integer)
      - `total_work_time` (integer) - in seconds
      - `total_activation_time` (integer) - in seconds
      - `total_rest_time` (integer) - in seconds
      - `streak_count` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own data
*/

-- Create productivity cycles table
CREATE TABLE IF NOT EXISTS productivity_cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  cycle_type text NOT NULL CHECK (cycle_type IN ('work', 'activation', 'rest')),
  planned_duration integer NOT NULL DEFAULT 0,
  actual_duration integer DEFAULT 0,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'skipped', 'interrupted')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create daily sessions table
CREATE TABLE IF NOT EXISTS daily_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_date date NOT NULL DEFAULT CURRENT_DATE,
  total_cycles integer DEFAULT 0,
  work_cycles integer DEFAULT 0,
  activation_cycles integer DEFAULT 0,
  rest_cycles integer DEFAULT 0,
  total_work_time integer DEFAULT 0,
  total_activation_time integer DEFAULT 0,
  total_rest_time integer DEFAULT 0,
  streak_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, session_date)
);

-- Enable Row Level Security
ALTER TABLE productivity_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for productivity_cycles
CREATE POLICY "Users can view own cycles"
  ON productivity_cycles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own cycles"
  ON productivity_cycles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own cycles"
  ON productivity_cycles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policies for daily_sessions
CREATE POLICY "Users can view own sessions"
  ON daily_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own sessions"
  ON daily_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own sessions"
  ON daily_sessions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_productivity_cycles_user_id ON productivity_cycles(user_id);
CREATE INDEX IF NOT EXISTS idx_productivity_cycles_started_at ON productivity_cycles(started_at);
CREATE INDEX IF NOT EXISTS idx_productivity_cycles_status ON productivity_cycles(status);
CREATE INDEX IF NOT EXISTS idx_daily_sessions_user_date ON daily_sessions(user_id, session_date);

-- Create trigger for daily_sessions updated_at
CREATE TRIGGER handle_daily_sessions_updated_at
  BEFORE UPDATE ON daily_sessions
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();