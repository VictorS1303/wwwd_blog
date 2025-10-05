// import { createServerClient } from "@supabase/ssr";
// import { APIContext } from "astro";

// export function getSupabase(cookie) {
//   return createServerClient(
//     import.meta.env.PUBLIC_SUPABASE_URL,
//     import.meta.env.SUPABASE_KEY,
//     {
//       cookies: {
//         get: (key) => c.cookies.get(key)?.value,
//         set: (key, value, options) => {
//           cookie.cookies.set(key, value, options);
//         },
//         remove: (key, options) => {
//           cookie.cookies.delete(key, options);
//         },
//       },
//     }
//   );
// }