import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  age?: string
  size?: string
  gender?: string
  description?: string
  medical_info?: string
  personality?: string[]
  good_with_kids?: boolean
  good_with_pets?: boolean
  energy_level?: string
  adoption_fee?: number
  location?: string
  image_url?: string
  is_adopted?: boolean
  created_at?: string
  updated_at?: string
}

export interface AdoptionApplication {
  id: string
  pet_id: string
  applicant_name: string
  email: string
  phone: string
  address: string
  housing_type?: string
  has_yard?: boolean
  has_other_pets?: boolean
  other_pets_info?: string
  experience_with_pets?: string
  reason_for_adoption?: string
  status?: string
  user_id?: string
  created_at?: string
}