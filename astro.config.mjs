// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), pagefind(), mermaid()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
      wrap: false
    }
  }
});