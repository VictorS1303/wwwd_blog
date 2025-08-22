import { defineEcConfig } from 'astro-expressive-code'

export default defineEcConfig({
  // You can set configuration options here
  themes: ['dracula', 'github-light'],
  styleOverrides: {
    // You can also override styles
    borderRadius: '0.5rem',
    frames: {
      shadowColor: '#124',
    },
  },
})