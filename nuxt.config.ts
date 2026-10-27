export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxt/fonts', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  // Docus 5.15 turned on zeroRuntime, which makes OG images only for
  // prerendered pages. The docs are server-rendered, so pages lost their
  // og:image; generate them at request time as before.
  ogImage: {
    zeroRuntime: false,
  },
  routeRules: {
    '/': { redirect: { to: '/welcome', statusCode: 301 } },
    '/start-here/getting-started': { redirect: { to: '/local/getting-started', statusCode: 301 } },
    '/start-here/why-basic-memory': { redirect: { to: '/start-here/what-is-basic-memory', statusCode: 301 } },
    '/changelog': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/whats-new/v0.22.0': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/reference/v0.19-migration': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/cloud/edit-locally-and-in-the-app': { redirect: { to: '/cloud/cloud-sync', statusCode: 301 } },
    '/cloud/user-guide': { redirect: { to: '/cloud/cloud-guide', statusCode: 301 } },
    '/teams/partners': { redirect: { to: '/partners/about', statusCode: 301 } },
    '/concepts/canvas': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/local/canvas': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/whats-new/v0-23': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/whats-new/v0-23-upgrade': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/whats-new/hermes-plugin': { redirect: { to: '/integrations/hermes', statusCode: 301 } },
    '/whats-new/cloud': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/whats-new/agent-skills': { redirect: { to: '/integrations/skills', statusCode: 301 } },
    '/whats-new/openclaw-plugin': { redirect: { to: '/integrations/openclaw', statusCode: 301 } },
    '/whats-new/ai-friendly-docs': { redirect: { to: '/reference/llms-txt', statusCode: 301 } },
    // The Connect Agent pane was pulled from the web app.
    '/cloud/ai-collaboration': { redirect: { to: '/cloud/comments-and-suggestions', statusCode: 301 } },
    '/integrations/claude-research-mode': { redirect: { to: '/integrations/claude-desktop', statusCode: 301 } },
  },
  app: {
    head: {
      meta: [
        {
          name: 'msvalidate.01',
          content: '68D1B3FDD385F6EE2A92C3711AA66E4A',
        },
      ],
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          defer: true,
          'data-website-id': '8d51086e-5c67-401e-97b0-b24706a6d4f3',
        },
      ],
    },
  },
  site: {
    name: 'Basic Memory',
    url: 'https://docs.basicmemory.com',
  },
  llms: {
    domain: 'https://docs.basicmemory.com',
    title: 'Basic Memory Documentation',
    description: 'Documentation for Basic Memory - a knowledge management system that gives AI assistants persistent memory through the Model Context Protocol (MCP). Supports both cloud and local deployments.',
    full: {
      title: 'Basic Memory Complete Documentation',
      description: 'Complete technical documentation for Basic Memory including setup guides, MCP tools reference, knowledge format specifications, and integration guides for Claude, ChatGPT, Gemini, and other AI assistants.',
    },
    contentRawMarkdown: {
      excludeCollections: [],
      rewriteLLMSTxt: true,
    },
  },
})
