// export const APIRoute = async ({ request, cookies, redirect }) => {
//   const formData = await request.formData();

//   const userName = formData.get('name')?.toString();
//   const email = formData.get('email')?.toString();
//   const password = formData.get('password')?.toString();
//   const repeatPassword = formData.get('repeat_password')?.toString();

//   if (!userName || !email || !password || !repeatPassword) {
//     return new Response('All fields are required', { status: 400 });
//   }

//   if (password !== repeatPassword) {
//     return new Response("Passwords do not match", { status: 400 });
//   }

//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { full_name: userName }
//     }
//   });

//   if (error) return new Response(error.message, { status: 500 });

//   return redirect('/dashboard');
// };