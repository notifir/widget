import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'virqte',
  fixturesFolder: false,
  includeShadowDom: true,
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },
  chromeWebSecurity: false,
})
