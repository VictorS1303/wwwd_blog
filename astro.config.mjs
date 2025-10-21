// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code'
import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  
  vite: {
    plugins: [tailwindcss()],
  },
  
  devToolbar: {
    enabled: false,
  },
  
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  output: 'server',
  adapter: netlify()
});