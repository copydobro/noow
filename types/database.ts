export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          name: string
          age_range: string
          activity_level: string
          work_start_time: string
          work_end_time: string
          timezone: string
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          age_range?: string
          activity_level?: string
          work_start_time?: string
          work_end_time?: string
          timezone?: string
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age_range?: string
          activity_level?: string
          work_start_time?: string
          work_end_time?: string
          timezone?: string
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      productivity_cycles: {
        Row: {
          id: string
          user_id: string
          cycle_type: 'work' | 'activation' | 'rest'
          planned_duration: number
          actual_duration: number
          started_at: string
          completed_at: string | null
          status: 'active' | 'completed' | 'skipped' | 'interrupted'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cycle_type: 'work' | 'activation' | 'rest'
          planned_duration: number
          actual_duration?: number
          started_at?: string
          completed_at?: string | null
          status?: 'active' | 'completed' | 'skipped' | 'interrupted'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cycle_type?: 'work' | 'activation' | 'rest'
          planned_duration?: number
          actual_duration?: number
          started_at?: string
          completed_at?: string | null
          status?: 'active' | 'completed' | 'skipped' | 'interrupted'
          notes?: string | null
          created_at?: string
        }
      }
      daily_sessions: {
        Row: {
          id: string
          user_id: string
          session_date: string
          total_cycles: number
          work_cycles: number
          activation_cycles: number
          rest_cycles: number
          total_work_time: number
          total_activation_time: number
          total_rest_time: number
          streak_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_date?: string
          total_cycles?: number
          work_cycles?: number
          activation_cycles?: number
          rest_cycles?: number
          total_work_time?: number
          total_activation_time?: number
          total_rest_time?: number
          streak_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_date?: string
          total_cycles?: number
          work_cycles?: number
          activation_cycles?: number
          rest_cycles?: number
          total_work_time?: number
          total_activation_time?: number
          total_rest_time?: number
          streak_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          criteria_type: 'cycles_completed' | 'streak_days' | 'total_time' | 'activations_completed'
          criteria_value: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon?: string
          criteria_type: 'cycles_completed' | 'streak_days' | 'total_time' | 'activations_completed'
          criteria_value: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          criteria_type?: 'cycles_completed' | 'streak_days' | 'total_time' | 'activations_completed'
          criteria_value?: number
          is_active?: boolean
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
          progress: number
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
          progress?: number
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
          progress?: number
        }
      }
      user_statistics: {
        Row: {
          id: string
          user_id: string
          total_cycles: number
          total_work_time: number
          total_activation_time: number
          total_rest_time: number
          current_streak: number
          best_streak: number
          last_activity_date: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_cycles?: number
          total_work_time?: number
          total_activation_time?: number
          total_rest_time?: number
          current_streak?: number
          best_streak?: number
          last_activity_date?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_cycles?: number
          total_work_time?: number
          total_activation_time?: number
          total_rest_time?: number
          current_streak?: number
          best_streak?: number
          last_activity_date?: string | null
          updated_at?: string
        }
      }
      productivity_metrics: {
        Row: {
          time: string
          user_id: string
          metric_type: 'focus_score' | 'energy_level' | 'productivity_index' | 'interruptions' | 'mood'
          value: number
          metadata: Record<string, any>
        }
        Insert: {
          time?: string
          user_id: string
          metric_type: 'focus_score' | 'energy_level' | 'productivity_index' | 'interruptions' | 'mood'
          value: number
          metadata?: Record<string, any>
        }
        Update: {
          time?: string
          user_id?: string
          metric_type?: 'focus_score' | 'energy_level' | 'productivity_index' | 'interruptions' | 'mood'
          value?: number
          metadata?: Record<string, any>
        }
      }
      system_events: {
        Row: {
          time: string
          user_id: string | null
          event_type: 'login' | 'logout' | 'cycle_start' | 'cycle_complete' | 'cycle_skip' | 'settings_change' | 'achievement_earned'
          event_data: Record<string, any>
        }
        Insert: {
          time?: string
          user_id?: string | null
          event_type: 'login' | 'logout' | 'cycle_start' | 'cycle_complete' | 'cycle_skip' | 'settings_change' | 'achievement_earned'
          event_data?: Record<string, any>
        }
        Update: {
          time?: string
          user_id?: string | null
          event_type?: 'login' | 'logout' | 'cycle_start' | 'cycle_complete' | 'cycle_skip' | 'settings_change' | 'achievement_earned'
          event_data?: Record<string, any>
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_streak: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
      get_productivity_summary: {
        Args: {
          user_uuid: string
          start_date?: string
          end_date?: string
        }
        Returns: {
          date: string
          total_cycles: number
          work_time: number
          activation_time: number
          rest_time: number
          productivity_score: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}