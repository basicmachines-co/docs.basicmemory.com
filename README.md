# Basic Memory Documentation

Official documentation site for [Basic Memory](https://basicmemory.com) - a local-first knowledge management system built on the Model Context Protocol (MCP).

**Live Site:** [docs.basicmemory.com](https://docs.basicmemory.com)

## About

This repository contains the complete documentation for Basic Memory, including:

- Getting Started guides
- Cloud and Local installation
- MCP Tools Reference
- Integration guides (Claude Desktop, ChatGPT, VS Code, Cursor, Obsidian)
- Knowledge format specification
- CLI Reference
- Release notes

## Tech Stack

- **Framework:** [Docus](https://docus.dev) (Nuxt-based documentation theme)
- **Styling:** Tailwind CSS 4 with Nuxt UI
- **Content:** Markdown with MDC syntax
- **Search:** Built-in full-text search
- **LLM Integration:** nuxt-llms for AI-friendly documentation

## Development

### Prerequisites

- Node.js 22+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The site will be available at `http://localhost:3000`

### Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:3000` |
| `npm run build` | Build production site |
| `npm run preview` | Preview production build locally |
| `just deploy development` | Deploy to development environment |
| `just deploy production` | Deploy to production environment |

## Project Structure

```
docs.basicmemory.com/
├── app/
│   ├── app.config.ts    # Docus configuration
│   └── components/      # Custom Vue components
├── content/             # Documentation pages (Markdown)
│   ├── 1.start-here/    # Getting started guides
│   ├── 2.whats-new/     # Release notes
│   ├── 3.cloud/         # Cloud documentation
│   ├── 4.local/         # Local installation
│   ├── 5.concepts/      # Core concepts
│   ├── 6.integrations/  # Integration guides
│   ├── 7.how-to/        # How-to guides
│   └── 8.reference/     # Technical reference
├── public/              # Static assets
├── server/              # Server routes (API)
├── nuxt.config.ts       # Nuxt configuration
├── Dockerfile           # Container build
├── fly.toml.template    # Fly.io deployment template
└── justfile             # Development commands
```

## Contributing Documentation

### Writing Style

- **Factual and clear** - No embellishment or marketing language
- **Present tense** - Describe what features do, not what they will do
- **Practical examples** - Include working code examples
- **Consistent terminology** - Use terms as defined in the codebase

### Adding New Pages

1. Create `.md` file in appropriate directory under `content/`
2. Use numeric prefixes for ordering (e.g., `1.getting-started.md`)
3. Add frontmatter with title and description
4. Use MDC components for callouts and special formatting

Example:

```md
---
title: Page Title
description: Brief description
---

# Page Title

Content here...

::note
Important information for readers
::

::warning
Warning message
::
```

### Documentation Components

Docus provides MDC components:

- `::note` - General information
- `::warning` - Important warnings
- `::tip` - Helpful tips
- `::code-group` - Tabbed code blocks
- `::card` - Card components
- `::steps` - Step-by-step instructions

## Deployment

### Environments

- **Development:** Auto-deploys on push to `main`
- **Production:** Manual deploy via GitHub Actions

### Fly.io Setup

```bash
# Create Fly.io apps (one-time)
just fly-init development
just fly-init production

# Deploy manually
just deploy development
just deploy production
```

### GitHub Actions

Requires `FLY_API_TOKEN` secret configured in repository settings.

### Local Docker Build

```bash
just docker-build
just docker-run
```

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
