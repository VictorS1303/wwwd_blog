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

    console.log(postsData)

    return postsData || []
}

fetchLatestPosts()

// Fetch accordian data
export const fetchAccordianData = async () => {
  const { data: accordianData, error: accordianError } = await supabaseClient
    .from('accordians')
    .select('*')
    .order('accordian_number', { ascending: true });

  if (accordianError) {
    console.log(accordianError.message, accordianError.hint);
  }

  console.log(accordianData)
  return accordianData || [];
}
