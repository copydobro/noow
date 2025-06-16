/*
  # Analytics and Events Tables

  1. New Tables
    - `productivity_metrics`
      - `time` (timestamptz, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `metric_type` (text, enum constraint)
      - `value` (numeric)
      - `metadata` (jsonb)
    - `system_events`
      - `time` (timestamptz, primary key)
      - `user_id` (uuid, foreign key to user_profiles, nullable)
      - `event_type` (text, enum constraint)
      - `event_data` (jsonb)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to access their own data

  3. Performance
    - Add indexes for time-based queries
    - Add indexes for user-specific queries
    - Add composite indexes for common query patterns
*/

-- Create productivity metrics table
CREATE TABLE IF NOT EXISTS productivity_metrics (
  time timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  metric_type text NOT NULL CHECK (metric_type IN ('focus_score', 'energy_level', 'productivity_index', 'interruptions', 'mood')),
  value numeric NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  PRIMARY KEY (user_id, time)
);

-- Create system events table
CREATE TABLE IF NOT EXISTS system_events (
  time timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('login', 'logout', 'cycle_start', 'cycle_complete', 'cycle_skip', 'settings_change', 'achievement_earned')),
  event_data jsonb DEFAULT '{}'::jsonb,
  PRIMARY KEY (time, user_id)
);

-- Enable Row Level Security
ALTER TABLE productivity_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_events ENABLE ROW LEVEL SECURITY;

-- Policies for productivity_metrics
CREATE POLICY "Users can view own metrics"
  ON productivity_metrics
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own metrics"
  ON productivity_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for system_events
CREATE POLICY "Users can view own events"
  ON system_events
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert own events"
  ON system_events
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_productivity_metrics_user_time ON productivity_metrics(user_id, time DESC);
CREATE INDEX IF NOT EXISTS idx_productivity_metrics_type ON productivity_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_productivity_metrics_time ON productivity_metrics(time DESC);

CREATE INDEX IF NOT EXISTS idx_system_events_user_time ON system_events(user_id, time DESC);
CREATE INDEX IF NOT EXISTS idx_system_events_type ON system_events(event_type);
CREATE INDEX IF NOT EXISTS idx_system_events_time ON system_events(time DESC);

-- Create function to clean up old data (alternative to TimescaleDB retention policy)
CREATE OR REPLACE FUNCTION cleanup_old_analytics_data()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete productivity metrics older than 2 years
  DELETE FROM productivity_metrics 
  WHERE time < NOW() - INTERVAL '2 years';
  
  -- Delete system events older than 2 years
  DELETE FROM system_events 
  WHERE time < NOW() - INTERVAL '2 years';
END;
$$;

-- Create a function to get productivity summary (equivalent to TimescaleDB aggregation)
CREATE OR REPLACE FUNCTION get_productivity_summary(
  user_uuid uuid,
  start_date date DEFAULT CURRENT_DATE - INTERVAL '7 days',
  end_date date DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  date date,
  total_cycles integer,
  work_time integer,
  activation_time integer,
  rest_time integer,
  productivity_score numeric
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ds.session_date::date as date,
    COALESCE(ds.total_cycles, 0) as total_cycles,
    COALESCE(ds.total_work_time, 0) as work_time,
    COALESCE(ds.total_activation_time, 0) as activation_time,
    COALESCE(ds.total_rest_time, 0) as rest_time,
    CASE 
      WHEN ds.total_cycles > 0 THEN 
        ROUND((ds.total_work_time::numeric / (ds.total_cycles * 45 * 60)) * 100, 2)
      ELSE 0
    END as productivity_score
  FROM daily_sessions ds
  WHERE ds.user_id = user_uuid
    AND ds.session_date >= start_date
    AND ds.session_date <= end_date
  ORDER BY ds.session_date DESC;
END;
$$;