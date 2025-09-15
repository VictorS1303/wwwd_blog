import {supabaseClient} from './supabase_client.js'

// Sign up user
export const signUpUser = async (email, password) =>
{
    const {data: signUpData, error: signUpError} = await supabaseClient.auth.signUp({
        email, password
    })

    if(signUpError)
    {
        console.log('Error signing up: ', signUpError.hint, signUpError.message)
        
        return {success: false, signUpError: signUpError.message }
    }

    const session = supabaseClient.auth.getSession()

    return {
        success: true,
        user: signUpData.user,
        session,
    }
}