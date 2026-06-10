export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  routeRules: {
    '/cloud/user-guide': { redirect: '/start-here/getting-started' },
    '/cloud/themes': { redirect: '/cloud/web-app#themes' },
    '/local/user-guide': { redirect: '/local/local-install' },
    '/start-here/why-basic-memory': { redirect: '/start-here/what-is-basic-memory' },
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
    description: 'Documentation for Basic Memory, a shared knowledge base for humans, AI tools, agents, and their teams. Covers Basic Memory Cloud and the open-source local project.',
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
