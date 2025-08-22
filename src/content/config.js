import { defineCollection, z } from "astro:content";

const concerts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
  }),
});

export const collections = {
  concerts,
};
