/*
  # Timescale Extensions for Time-Series Data

  1. Extensions
    - Enable TimescaleDB extension
    - Create hypertables for time-series data

  2. New Tables
    - `productivity_metrics` - Real-time productivity metrics
      - `time` (timestamptz)
      - `user_id` (uuid)
      - `metric_type` (text)
      - `value` (numeric)
      - `metadata` (jsonb)

    - `system_events` - System and user events
      - `time` (timestamptz)
      - `user_id` (uuid)
      - `event_type` (text)
      - `event_data` (jsonb)

  3. Security
    - Enable RLS on hypertables
    - Add appropriate policies
*/

-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Create productivity metrics table
CREATE TABLE IF NOT EXISTS productivity_metrics (
  time timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  metric_type text NOT NULL CHECK (metric_type IN ('focus_score', 'energy_level', 'productivity_index', 'interruptions', 'mood')),
  value numeric NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create system events table
CREATE TABLE IF NOT EXISTS system_events (
  time timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('login', 'logout', 'cycle_start', 'cycle_complete', 'cycle_skip', 'settings_change', 'achievement_earned')),
  event_data jsonb DEFAULT '{}'::jsonb
);

-- Convert to hypertables
SELECT create_hypertable('productivity_metrics', 'time', if_not_exists => TRUE);
SELECT create_hypertable('system_events', 'time', if_not_exists => TRUE);

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
CREATE INDEX IF NOT EXISTS idx_system_events_user_time ON system_events(user_id, time DESC);
CREATE INDEX IF NOT EXISTS idx_system_events_type ON system_events(event_type);

-- Create data retention policies (keep data for 2 years)
SELECT add_retention_policy('productivity_metrics', INTERVAL '2 years', if_not_exists => TRUE);
SELECT add_retention_policy('system_events', INTERVAL '2 years', if_not_exists => TRUE);