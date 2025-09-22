import { supabaseClient } from "../supabase/supabase_client.js"

// Fetch posts
export const fetchAllPosts = async () =>
{
    const { data: postsData, error: postsError } = await supabaseClient
      .from("blog_posts")
      .select("*")
      .order('publish_date', {ascending: true})

    if (postsError)
    {
        throw new Error(`Failed to fetch posts: ${postsError.message}`)
    }
    
    return postsData || []
}

// Fetch single posts by slug
export const fetchSinglePostBySlug = async (slug) =>
{
    const { data: post, error } = await supabaseClient
        .from("blog_posts")
        .select("*")
        .eq("post_slug", slug)
        .single()

    if (error)
    {
        console.log("Error: ", error.hint, error.message, slug)
    }
    
    return post || []
}

// Fetch filtered posts
export const fetchFilteredPosts = async (searchTerm) =>
{
    const { data: posts } = await supabaseClient
      .from("blog_posts")
      .select("*")
      .ilike("post_categories", `%${searchTerm}%`)
      .order("publish_date", { ascending: true })
    
   
    return posts || []
}

// Fetch latest posts
export const fetchLatestPosts = async () => {
    const { data: postsData, error: postsError } = await supabaseClient
      .from("blog_posts")
      .select("*")
      .order('publish_date', { ascending: false })
      .limit(3)

    if (postsError) {
        throw new Error(`Failed to fetch posts: ${postsError.message}`)
    }

    return postsData || []
}

// fetchLatestPosts()

// Fetch accordian data
export const fetchAccordianData = async () => {
  const { data: accordianData, error: accordianError } = await supabaseClient
    .from('accordians')
    .select('*')
    .order('accordian_number', { ascending: true });

  if (accordianError) {
    console.log(accordianError.message, accordianError.hint);
  }

  return accordianData || [];
}

// Fetch random post
export const fetchRandomPost = async () => {
  const {data: randomPostData, error: randomPostError} = await supabaseClient
  .from('random_blog_post')
  .select('post_slug')
  .limit(1)
  .single()

  if(randomPostError)
  {
    console.log(randomPostError.message, randomPostError.hint)
  }

  return randomPostData.post_slug
}

// Fetch error page data
export const fetchErrorPageData = async () =>
{
  const {data: errorPageData, error: errorPageError} = await supabaseClient
  .from('error_page')
  .select('*')

  if(errorPageError)
  {
    console.log(errorPageData.message, errorPageError.hint)
  }

  return errorPageData[0] || []
}

// Fetch landing page data
export const fetchLandingPageData = async () =>
{
  const {data: landingPageData, error: landingPageError} = await supabaseClient
  .from('landing_page')
  .select('*')
  
  if(landingPageError)
  {
    console.log(landingPageError.message, landingPageError.hint)
  }

  return landingPageData[0] || []
}

fetchLandingPageData()

// Fetch hero data
export const fetchHeroData = async () =>
{
  const {data: heroData, error: heroError} = await supabaseClient
  .from('heroes')
  .select('*')

  if(heroError)
  {
    console.log(heroError.message, heroError.hint)
  }

  console.log(heroData[0].hero_images)

  return heroData || []
}

await fetchHeroData()

// Sign up
export const signUpUser = async (email, password) => {
  const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return {
      success: false,
      error: signUpError.message,
    };
  }

  return {
    success: true,
    data: signUpData,
  };
};

// Login user
export const loginUser = async (email, password) =>
{
  const {data: loginData, error: loginError} = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })

  if(!loginData || loginError)
  {
    console.log('Login error', loginData.error, loginData.message)
    return {success: false, error: loginError.message}
  }

  console.log('User logged in:', data.user)
  return { success: true, user: data.user }
}