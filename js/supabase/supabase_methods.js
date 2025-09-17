import {supabaseClient} from './supabase_client.js'

// Sign up user
export const signUpUser = async (name, email, password, avatarUrl = null) => {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          ...(avatarUrl && { avatarUrl }), // only include if provided
        },
      },
    })

    console.log("Sign up data:", data)
    console.log("Sign up error:", error)

    if (error) {
      return { success: false, signUpError: error.message }
    }

    return { success: true, user: data.user, session: data.session }
  } catch (err) {
    return { success: false, signUpError: err.message }
  }
}

// Login User
export const loginUser = async (email, password) => {
  const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })

  if (loginError) {
    return {
      success: false,
      signUpError: loginError.message,
    }
  }

  return {
    success: true,
    data: loginData,
  }
}