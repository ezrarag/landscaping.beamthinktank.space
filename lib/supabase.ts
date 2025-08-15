import { createClient } from '@supabase/supabase-js'

// Environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a fallback client for build time
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for build time
    return {
      from: () => ({
        select: () => ({ order: () => ({ limit: () => ({ data: [], error: null }) }) }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ data: null, error: null }) }),
      }),
      auth: {
        signUp: () => Promise.resolve({ data: null, error: null }),
        signIn: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      }
    } as any
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export const supabase = createSupabaseClient()

// Database types for TypeScript
export interface Project {
  id: string
  title: string
  description: string
  location: string
  status: 'planning' | 'active' | 'completed'
  progress: number
  target_date: string
  created_at: string
  updated_at: string
  before_image?: string
  after_image?: string
  volunteers_needed: number
  current_volunteers: number
}

export interface Volunteer {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  city: string
  interests: string[]
  availability: string[]
  experience: string
  message?: string
  created_at: string
  status: 'pending' | 'approved' | 'active'
}

export interface Donation {
  id: string
  amount: number
  frequency: 'one-time' | 'monthly'
  project_id?: string
  first_name: string
  last_name: string
  email: string
  message?: string
  stripe_payment_intent_id: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface ServiceRequest {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  city: string
  project_type: string
  description: string
  timeline: string
  budget_range: string
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
  created_at: string
}
