import { createClient } from '@supabase/supabase-js'

// Access public env vars
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY

// Use localStorage only in the browser
const storage = typeof window !== 'undefined' ? window.localStorage : undefined

// Create client
export const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage,
    autoRefreshToken: true,
  },
})