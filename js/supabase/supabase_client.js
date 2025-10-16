import { createClient } from '@supabase/supabase-js'

// Access public env vars
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY

// Create client
export const supabaseClient = createClient(supabaseUrl, supabaseKey)
