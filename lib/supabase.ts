import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
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

export interface ProductivityCycle {
  id: string
  user_id: string
  cycle_type: 'work' | 'activation' | 'rest'
  planned_duration: number
  actual_duration: number
  started_at: string
  completed_at?: string
  status: 'active' | 'completed' | 'skipped' | 'interrupted'
  notes?: string
  created_at: string
}

export interface DailySession {
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

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  criteria_type: 'cycles_completed' | 'streak_days' | 'total_time' | 'activations_completed'
  criteria_value: number
  is_active: boolean
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  progress: number
  achievement?: Achievement
}

export interface UserStatistics {
  id: string
  user_id: string
  total_cycles: number
  total_work_time: number
  total_activation_time: number
  total_rest_time: number
  current_streak: number
  best_streak: number
  last_activity_date?: string
  updated_at: string
}

// Auth helper functions
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  if (data.user) {
    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        name,
      })

    if (profileError) throw profileError
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Profile functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Productivity cycle functions
export const createProductivityCycle = async (cycle: Omit<ProductivityCycle, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('productivity_cycles')
    .insert(cycle)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateProductivityCycle = async (id: string, updates: Partial<ProductivityCycle>) => {
  const { data, error } = await supabase
    .from('productivity_cycles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserCycles = async (userId: string, limit = 50) => {
  const { data, error } = await supabase
    .from('productivity_cycles')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Statistics functions
export const getUserStatistics = async (userId: string): Promise<UserStatistics | null> => {
  const { data, error } = await supabase
    .from('user_statistics')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const getDailySessions = async (userId: string, days = 7) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('daily_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('session_date', startDate.toISOString().split('T')[0])
    .order('session_date', { ascending: false })

  if (error) throw error
  return data
}

// Achievement functions
export const getUserAchievements = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievements(*)
    `)
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })

  if (error) throw error
  return data
}

export const getAllAchievements = async () => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('is_active', true)
    .order('criteria_value', { ascending: true })

  if (error) throw error
  return data
}

// Analytics functions
export const getProductivitySummary = async (userId: string, days = 7) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .rpc('get_productivity_summary', {
      user_uuid: userId,
      start_date: startDate.toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0]
    })

  if (error) throw error
  return data
}

// Real-time subscriptions
export const subscribeToUserCycles = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('user_cycles')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'productivity_cycles',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}

export const subscribeToUserAchievements = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('user_achievements')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'user_achievements',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}