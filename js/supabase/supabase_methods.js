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

// const email = `${email.replace(/\+s/g, '').toLowerCase()}`

// const {data: signUpData, error: signUpError} = await supabaseClient.auth.signUp({
//     email, password
// })

// if(signUpError)
// {
//     console.log('Error signing up: ', signUpError.hint, signUpError.message)
    
//     return {success: false, signUpError: signUpError.message }
// }

// const session = supabaseClient.auth.getSession()

// return {
//     success: true,
//     user: signUpData.user,
//     session,
// }