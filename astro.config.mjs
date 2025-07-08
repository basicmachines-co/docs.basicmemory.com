// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), pagefind(), mermaid({
    themes: {
      light: 'default',
      dark: 'base'
    },
    mermaidConfig: {
      themeVariables: {
        darkMode: true,
        primaryTextColor: '#f3f4f6',
        secondaryTextColor: '#e5e7eb',
        tertiaryTextColor: '#d1d5db'
      }
    }
  })],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      wrap: false
    }
  },
  site: 'https://docs.basicmemory.com'
});
