// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), pagefind()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
      wrap: false
    }
  }
});