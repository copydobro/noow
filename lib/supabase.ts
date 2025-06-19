import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Типы для базы данных
export interface User {
  id: string;
  email: string;
  created_at: string;
  consent_given: boolean;
  test_frequency: 'minimal' | 'standard' | 'maximal';
  health_kit_enabled: boolean;
  google_fit_enabled: boolean;
}

export interface Cycle {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  exercise_type: string;
  reps: number;
}

export interface Activation {
  id: string;
  cycle_id: string;
  start_time: string;
  end_time: string;
  exercise_type: string;
  reps: number;
}

export interface CogTest {
  id: string;
  user_id: string;
  test_type: 'nback' | 'stroop';
  accuracy: number;
  reaction_time: number;
  timestamp: string;
}

export interface Feedback {
  id: string;
  cycle_id: string;
  energy_score: number;
  mood_score: number;
  notes?: string;
}

export interface HealthData {
  id: string;
  user_id: string;
  timestamp: string;
  heart_rate?: number;
  hrv?: number;
  steps?: number;
  activity_level?: number;
  source: 'healthkit' | 'googlefit';
}

export interface Acquisition {
  id: string;
  user_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} 