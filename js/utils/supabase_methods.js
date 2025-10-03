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
// export const signUpUser = async (email, password) => {
//   const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
//     email,
//     password,
//   });

//   if (signUpError) {
//     return {
//       success: false,
//       error: signUpError.message,
//     };
//   }

//   return {
//     success: true,
//     data: signUpData,
//   };
// };

// Register up and login
export const registerAndLogin = async (name, email, password) => {
  // 1. Sign up user
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: name,
      },
    },
  });

  console.log("Supabase signUp response:", { data, error });

  if (error) {
    console.error("Sign-up error:", error.message, error.hint);
    return { success: false, signUpError: error.message };
  }

  // 2. If session exists after sign-up, user is automatically logged in
  if (data.session) {
    console.log("User automatically signed in:", data.session.user);
    return { success: true, user: data.session.user };
  }

  // 3. If no session returned (email confirmation required), manually sign in
  console.warn("No active session after sign-up, attempting manual login...");

  const { data: loginData, error: loginError } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError) {
    console.error("Login error:", loginError.message);
    return { success: false, signUpError: loginError.message };
  }

  console.log("User logged in successfully:", loginData.session.user);

  return { success: true, user: loginData.session.user };
};

// Login user
export async function loginUser(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error("Login error:", error.message)
    return { success: false, error: error.message }
  }

  console.log("User logged in:", data.user)
  return { success: true, user: data.user }
}

// Log out user
export const logOutUser = async () => {
  const { error } = await supabaseClient.auth.signOut();

  console.log(error)  

  location.href = '/blog-posts'
}


// Fetch liked posts
export const fetchLikedPosts = async () =>
{
  const {data: {user}, error: userError} = await supabaseClient.auth.getUser()

  if(userError || !user)
  {
    console.log(`No logged in user or error fetching user: ${userError.hint, userError.message}`)
    return []
  }

  // Fetch liked posts with blog post details
  const {data: likedPostsData, error: likedPostsError} = await supabaseClient
    .from('liked_posts')
    .select(`id, user_id, created_at, blog_posts(id, post_title, post_slug, post_image)`)
    .eq('user_id', user.id)

  if(likedPostsError)
  {
    console.log(`Error fetching liked posts: ${likedPostsError.message, likedPostsError.hint}`)
  }

  // Log fetched data
  console.log('Liked posts fetched: ', likedPostsData)

  return likedPostsData || []
}

// Fetch saved posts
export const fetchSavedPosts = async () =>
{
  const {data: {user}, error: userError} = await supabaseClient.auth.getUser()

  const {data: savedPostsData, error: savedPostsError} = await supabaseClient
    .from('saved_posts')
    .select(`
      id,
      user_id,
      created_at,
      blog_posts (
        id,
        post_title,
        post_slug,
        post_image
      )
    `)
    .eq("user_id", user.id)


  if(savedPostsError)
  {
    console.log('Error fetching posts: ', savedPostsError.hint, savedPostsError.message)
  }

  console.log(savedPostsData)
  return savedPostsData || []
}

// Like post
export const likePost = async (postId) => {
  if (!postId) {
    console.log('Post ID is missing')
    return
  }

  try {
    // Get current logged-in user
    const {
      data: { user },
      error: userError
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      console.log("You must be logged in to like posts")
      return
    }

    // Check if this user already liked this post
    const { data: existingLike, error: checkError } = await supabaseClient
      .from("liked_posts")
      .select("*")
      .eq("user_id", user.id)
      .eq("post_id", postId)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // Not the "no rows found" error
      console.error("Error checking like:", checkError)
      return
    }

    if (existingLike) {
      console.log("User already liked this post")
      return
    }

    // If no like found, insert a new one
    const { data, error } = await supabaseClient
      .from("liked_posts")
      .insert([{ user_id: user.id, post_id: postId }])

    if (error) {
      console.error("Error liking post:", error)
    } else {
      console.log("Post liked successfully!", data)
    }
  } catch (err) {
    console.error("Unexpected error:", err)
  }
}

// Dislike post
export const dislikePost = async (postId) => {
    if (!postId) {
      console.error("No post ID provided for deletion")
      return
    }

    // Delete the post
    const { data, error } = await supabaseClient
      .from("liked_posts")
      .delete()
      .eq("id", postId)

    if (error) {
      console.error("Error deleting liked post:", error)
      return
    }

    console.log("Deleted liked post:", data)

    // Realtime: Remove the card from the DOM immediately
    const actionButton = document.querySelector(
      `button[data-post-id="${postId}"]`,
    )
    if (actionButton) {
      const postCard = actionButton.closest("article.post-card")
      postCard?.remove()
    }

    // Real time
    supabaseClient
        .channel("public:liked_posts")
        .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "liked_posts" },
        (payload) => {
            console.log("Realtime delete detected:", payload)
            const deletedId = payload.old.id
            const card = document
            .querySelector(`button[data-post-id="${deletedId}"]`)
            ?.closest("article.post-card")
            card?.remove()
        },
        )
    .subscribe()
}

// Prevent multiple likes
export const isPostLiked = async (postId) =>
{
    const {data: {user}, error} = await supabaseClient.auth.getUser()

    if(!user)
    {
      return false
    } 

    const {data: likedPostData, error: likedPostError} = await supabaseClient
      .from('liked_posts')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
    

    if(likedPostError)  
    {
      console.log('Error liking post: ', likedPostError.hint, likedPostError)
      return
    }

    console.log(likedPostData)
    return !!likedPostData
}

// Save Post
export const savePost = async (postId) => {
  if (!postId) {
    console.log('Post ID is missing')
    return
  }

  try {
    const { data: { user }, error } = await supabaseClient.auth.getUser()

    if (!user) {
      document.querySelector("#login_warning_modal")?.showModal()
      return
    }

    const { data: savePostData, error: savePostError } = await supabaseClient
      .from("saved_posts")
      .insert([{ user_id: user.id, post_id: postId }])

    if (savePostError) {
      console.error("Error saving post:", savePostError)
    } else {
      console.log("Post saved successfully!", savePostData)
    }
  } catch (err) {
    console.error("Unexpected error:", err)
  }
}

// Prevent multiple saves
export const isPostSaved = async (postId) =>
{
    const {data: {user}, error} = await supabaseClient.auth.getUser()

    if(!user)
    {
      return false
    } 

    const {data: savedPostData, error: savedPostError} = await supabaseClient
      .from('saved_posts')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
    

    if(savedPostError)  
    {
      console.log('Error saving post: ', savedPostError.hint, savedPostError)
      return
    }

    console.log(savedPostData)
    return !!savedPostData
}

// Unsave post
export const unsavePost = async (postId) =>
{
  if(!postId)
  {
    console.log('No post ID provided for unsaving')
    return
  }

  // Unsave the post
  const {data: savedPostData, error: savedPostError} = await supabaseClient
    .from('saved_posts')
    .delete()
    .eq('id', postId)
  
  if(savedPostError)
  {
    console.log('Error unsaving saved post: ', savedPostError.message, savedPostError.hint)
  }

  // Real time
  const actionButton = document.querySelector(`button[data-post-id="${postId}"]`)
  if (actionButton) {
    const postCard = actionButton.closest("article.post-card")
    postCard?.remove()
  }

  // Real-time subscription
  supabaseClient
    .channel("public:saved_posts")
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "saved_posts" },
      (payload) => {
        console.log("Realtime delete detected:", payload)
        const deletedId = payload.old.id
        const card = document.querySelector(`button[data-post-id="${deletedId}"]`)?.closest("article.post-card")
        card?.remove()
      }
    )
    .subscribe()
}
/*
export const dislikePost = async (postId) => {
    if (!postId) {
      console.error("No post ID provided for deletion")
      return
    }

    // Delete the post
    const { data, error } = await supabaseClient
      .from("liked_posts")
      .delete()
      .eq("id", postId)

    if (error) {
      console.error("Error deleting liked post:", error)
      return
    }

    console.log("Deleted liked post:", data)

    // Realtime: Remove the card from the DOM immediately
    const actionButton = document.querySelector(
      `button[data-post-id="${postId}"]`,
    )
    if (actionButton) {
      const postCard = actionButton.closest("article.post-card")
      postCard?.remove()
    }

    // Real time
    supabaseClient
        .channel("public:liked_posts")
        .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "liked_posts" },
        (payload) => {
            console.log("Realtime delete detected:", payload)
            const deletedId = payload.old.id
            const card = document
            .querySelector(`button[data-post-id="${deletedId}"]`)
            ?.closest("article.post-card")
            card?.remove()
        },
        )
    .subscribe()
}
*/ 