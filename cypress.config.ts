import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://frontend-radio-browser-hugo-leonardo.vercel.app',
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
