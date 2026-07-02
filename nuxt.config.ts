export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/sitemap'],
  compatibilityDate: '2025-07-15',
  routeRules: {
    '/': { redirect: { to: '/welcome', statusCode: 301 } },
    '/start-here/getting-started': { redirect: { to: '/local/getting-started', statusCode: 301 } },
    '/start-here/why-basic-memory': { redirect: { to: '/start-here/what-is-basic-memory', statusCode: 301 } },
    '/changelog': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
    '/whats-new/v0.22.0': { redirect: { to: '/whats-new/changelog', statusCode: 301 } },
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
