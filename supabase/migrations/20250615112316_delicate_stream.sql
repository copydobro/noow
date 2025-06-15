/*
  # Database Functions and Triggers

  1. Functions
    - `update_daily_session_stats` - Update daily statistics
    - `check_achievements` - Check and award achievements
    - `get_user_streak` - Calculate user streak
    - `get_productivity_summary` - Get productivity summary

  2. Triggers
    - Auto-update daily sessions when cycles complete
    - Auto-check achievements when stats change
*/

-- Function to update daily session statistics
CREATE OR REPLACE FUNCTION update_daily_session_stats()
RETURNS TRIGGER AS $$
DECLARE
  session_date date := COALESCE(NEW.completed_at::date, OLD.completed_at::date, CURRENT_DATE);
  user_uuid uuid := COALESCE(NEW.user_id, OLD.user_id);
BEGIN
  -- Only process completed cycles
  IF NEW.status = 'completed' THEN
    INSERT INTO daily_sessions (
      user_id,
      session_date,
      total_cycles,
      work_cycles,
      activation_cycles,
      rest_cycles,
      total_work_time,
      total_activation_time,
      total_rest_time
    )
    SELECT 
      user_uuid,
      session_date,
      COUNT(*),
      COUNT(*) FILTER (WHERE cycle_type = 'work'),
      COUNT(*) FILTER (WHERE cycle_type = 'activation'),
      COUNT(*) FILTER (WHERE cycle_type = 'rest'),
      COALESCE(SUM(actual_duration) FILTER (WHERE cycle_type = 'work'), 0),
      COALESCE(SUM(actual_duration) FILTER (WHERE cycle_type = 'activation'), 0),
      COALESCE(SUM(actual_duration) FILTER (WHERE cycle_type = 'rest'), 0)
    FROM productivity_cycles
    WHERE user_id = user_uuid 
      AND completed_at::date = session_date
      AND status = 'completed'
    ON CONFLICT (user_id, session_date)
    DO UPDATE SET
      total_cycles = EXCLUDED.total_cycles,
      work_cycles = EXCLUDED.work_cycles,
      activation_cycles = EXCLUDED.activation_cycles,
      rest_cycles = EXCLUDED.rest_cycles,
      total_work_time = EXCLUDED.total_work_time,
      total_activation_time = EXCLUDED.total_activation_time,
      total_rest_time = EXCLUDED.total_rest_time,
      updated_at = now();

    -- Update user statistics
    INSERT INTO user_statistics (
      user_id,
      total_cycles,
      total_work_time,
      total_activation_time,
      total_rest_time,
      last_activity_date
    )
    SELECT 
      user_uuid,
      COUNT(*),
      COALESCE(SUM(actual_duration) FILTER (WHERE cycle_type = 'work'), 0),
      COALESCE(SUM(actual_duration) FILTER (WHERE cycle_type = 'activation'), 0),
      COALESCE(SUM(actual_duration) FILTER (WHERE cycle_type = 'rest'), 0),
      session_date
    FROM productivity_cycles
    WHERE user_id = user_uuid AND status = 'completed'
    ON CONFLICT (user_id)
    DO UPDATE SET
      total_cycles = EXCLUDED.total_cycles,
      total_work_time = EXCLUDED.total_work_time,
      total_activation_time = EXCLUDED.total_activation_time,
      total_rest_time = EXCLUDED.total_rest_time,
      last_activity_date = EXCLUDED.last_activity_date,
      updated_at = now();
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Function to calculate user streak
CREATE OR REPLACE FUNCTION calculate_user_streak(user_uuid uuid)
RETURNS integer AS $$
DECLARE
  current_streak integer := 0;
  check_date date := CURRENT_DATE;
  has_activity boolean;
BEGIN
  LOOP
    SELECT EXISTS(
      SELECT 1 FROM daily_sessions 
      WHERE user_id = user_uuid 
        AND session_date = check_date 
        AND total_cycles > 0
    ) INTO has_activity;
    
    IF NOT has_activity THEN
      EXIT;
    END IF;
    
    current_streak := current_streak + 1;
    check_date := check_date - INTERVAL '1 day';
  END LOOP;
  
  RETURN current_streak;
END;
$$ LANGUAGE plpgsql;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION check_and_award_achievements()
RETURNS TRIGGER AS $$
DECLARE
  achievement_record RECORD;
  user_uuid uuid := NEW.user_id;
  current_streak integer;
BEGIN
  -- Calculate current streak
  current_streak := calculate_user_streak(user_uuid);
  
  -- Update streak in user_statistics
  UPDATE user_statistics 
  SET 
    current_streak = current_streak,
    best_streak = GREATEST(best_streak, current_streak),
    updated_at = now()
  WHERE user_id = user_uuid;

  -- Check all achievements
  FOR achievement_record IN 
    SELECT a.* FROM achievements a
    WHERE a.is_active = true
      AND NOT EXISTS (
        SELECT 1 FROM user_achievements ua 
        WHERE ua.user_id = user_uuid AND ua.achievement_id = a.id
      )
  LOOP
    CASE achievement_record.criteria_type
      WHEN 'cycles_completed' THEN
        IF NEW.total_cycles >= achievement_record.criteria_value THEN
          INSERT INTO user_achievements (user_id, achievement_id)
          VALUES (user_uuid, achievement_record.id);
        END IF;
      
      WHEN 'streak_days' THEN
        IF current_streak >= achievement_record.criteria_value THEN
          INSERT INTO user_achievements (user_id, achievement_id)
          VALUES (user_uuid, achievement_record.id);
        END IF;
      
      WHEN 'total_time' THEN
        IF (NEW.total_work_time + NEW.total_activation_time + NEW.total_rest_time) >= achievement_record.criteria_value THEN
          INSERT INTO user_achievements (user_id, achievement_id)
          VALUES (user_uuid, achievement_record.id);
        END IF;
      
      WHEN 'activations_completed' THEN
        IF NEW.total_activation_time >= achievement_record.criteria_value * 120 THEN -- Assuming 2 minutes per activation
          INSERT INTO user_achievements (user_id, achievement_id)
          VALUES (user_uuid, achievement_record.id);
        END IF;
    END CASE;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to get productivity summary
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
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ds.session_date,
    ds.total_cycles,
    ds.total_work_time,
    ds.total_activation_time,
    ds.total_rest_time,
    CASE 
      WHEN ds.total_cycles = 0 THEN 0
      ELSE ROUND((ds.total_work_time::numeric / (ds.total_work_time + ds.total_activation_time + ds.total_rest_time)) * 100, 2)
    END as productivity_score
  FROM daily_sessions ds
  WHERE ds.user_id = user_uuid
    AND ds.session_date BETWEEN start_date AND end_date
  ORDER BY ds.session_date;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_daily_stats_trigger
  AFTER INSERT OR UPDATE ON productivity_cycles
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_session_stats();

CREATE TRIGGER check_achievements_trigger
  AFTER UPDATE ON user_statistics
  FOR EACH ROW
  EXECUTE FUNCTION check_and_award_achievements();