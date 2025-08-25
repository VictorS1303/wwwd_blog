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