q# Basic Memory Documentation

Official documentation site for [Basic Memory](https://basicmemory.com) - a local-first knowledge management system built on the Model Context Protocol (MCP).

🌐 **Live Site:** [docs.basicmemory.com](https://docs.basicmemory.com)

## About

This repository contains the complete documentation for Basic Memory, including:

- Getting Started guides
- User Guide and AI Assistant Guide
- MCP Tools Reference
- Integration guides (Claude Desktop, ChatGPT, VS Code, Cursor, Obsidian)
- Cloud features documentation
- CLI Reference
- Release notes and What's New

## Tech Stack

- **Framework:** [Astro](https://astro.build) with React components
- **Styling:** Tailwind CSS
- **Components:** Custom documentation components (Note, Warning, Info, etc.)
- **Content:** MDX (Markdown + JSX)

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The site will be available at `http://localhost:4321`

### Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
docs.basicmemory.com/
├── public/              # Static assets
├── src/
│   ├── components/      # React components (Note, Warning, etc.)
│   ├── config/          # Site configuration (navigation, etc.)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Documentation pages (MDX)
│   │   ├── guides/      # User and developer guides
│   │   ├── integrations/ # Integration-specific docs
│   │   ├── how-to/      # Use case examples
│   │   └── technical/   # Technical deep dives
│   └── styles/          # Global styles
└── .claude/
    └── agents/          # Claude Code agent definitions
```

## Contributing Documentation

### Writing Style

- **Factual and clear** - No embellishment or marketing language
- **Present tense** - Describe what features do, not what they will do
- **Practical examples** - Include working code examples from actual usage
- **Consistent terminology** - Use terms as defined in the codebase

### Adding New Pages

1. Create `.mdx` file in appropriate directory under `src/pages/`
2. Add frontmatter with title, description, and optional icon
3. Update navigation in `src/config/navigation.ts`
4. Use standard components: `<Note>`, `<Warning>`, `<Info>`, `<Tip>`

Example:

```mdx
---
layout: '@/layouts/DocsLayout.astro'
title: 'Page Title'
description: 'Brief description'
---

import { Note, Warning, Info } from '@/components'

<Note>
Important information for readers
</Note>

## Section

Content here...
```

### Documentation Components

- `<Note>` - General information
- `<Warning>` - Important warnings
- `<Info>` - Highlighted information
- `<Tip>` - Helpful tips
- `<Steps>` / `<Step>` - Step-by-step instructions
- `<Accordion>` / `<AccordionItem>` - Collapsible sections

### AI Agent for Documentation

This repository includes a Claude Code agent for documentation writing:

`.claude/agents/basic-memory-docs-writer.md`

Use this agent for:
- Creating new documentation pages
- Updating existing documentation
- Ensuring consistent style and tone

## Deployment

Documentation is automatically deployed from the `main` branch.

## Related Repositories

- [basic-memory](https://github.com/basicmachines-co/basic-memory) - Main Basic Memory repository
- [basicmemory.com](https://github.com/basicmachines-co/basicmemory.com) - Product marketing site
- [basicmachines.co](https://github.com/basicmachines-co/basicmachines.co) - Company website

## License

See the main [Basic Memory repository](https://github.com/basicmachines-co/basic-memory) for license information.

## Support

- [Discord](https://discord.gg/tyvKNccgqN) - Community support
- [GitHub Issues](https://github.com/basicmachines-co/basic-memory/issues) - Bug reports and feature requests
- [Reddit](https://www.reddit.com/r/basicmemory) - Community discussions
