import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY


export const getSupabaseServerClient = (cookieHeader) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Cookie: cookieHeader || "",
      },
    },
  })
}