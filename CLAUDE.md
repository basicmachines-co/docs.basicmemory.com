# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation website for Basic Memory (`docs.basicmemory.com`), built with Docus (Nuxt-based documentation theme). The site provides comprehensive documentation including guides, integrations, how-to articles, and technical references.

### What is Basic Memory?

**Basic Memory** is a user-first knowledge management system built on the Model Context Protocol (MCP) that enables persistent AI memory across conversations. Instead of losing valuable insights in conversation history, users build a persistent knowledge base where both human and AI can read, write, and enhance each other's work.

**Repository**: https://github.com/basicmachines-co/basic-memory
**Website**: https://basicmemory.com
**Current Version**: v0.18.0 (released January 28, 2026)

**Key Features**:
- 17 MCP tools for AI integration (write_note, read_note, edit_note, search_notes, build_context, etc.)
- Local markdown files create a semantic knowledge graph
- Multi-project support with project switching
- Integrations with Claude Desktop, VS Code, Cursor, Obsidian
- Python-based with FastAPI endpoints and comprehensive CLI
- Real-time file synchronization
- SQLite and PostgreSQL database backends

**v0.18.0 Major Features**:
- Context-aware wiki link resolution with source_path support
- Directory support for move_note and delete_note tools
- Local MCP cloud mode routing for simultaneous local/cloud usage
- Cloud snapshot CLI commands for backup management

### Basic Memory Cloud

**Basic Memory Cloud** is a multi-tenant cloud platform that provides hosted Basic Memory instances with subscription billing and authentication.

**Repository**: https://github.com/basicmachines-co/basic-memory-cloud
**Status**: public beta

**Architecture**:
- **Web App** (Vue.js + Nuxt) - Frontend with WorkOS AuthKit magic link authentication
- **Cloud Service** (FastAPI + ARQ) - Tenant management and provisioning
- **MCP Gateway** - Proxy routing to tenant instances with JWT validation
- **API Service** - Per-tenant Basic Memory instances with full isolation
- **Database** - Neon PostgreSQL with branch-per-PR workflow
- **Infrastructure** - Fly.io container orchestration
- **Billing** - Polar subscription integration

**Key Capabilities**:
- WorkOS AuthKit authentication with magic links
- Per-user isolated Basic Memory instances
- Automatic tenant provisioning via ARQ job queue
- Cloud sync via rclone for local-cloud bidirectional sync
- Subscription-based access control
- OAuth 2.1 server for MCP client registration

### Documentation Scope

This documentation site covers both:
1. **Basic Memory** (local-first product) - Installation, MCP tools, CLI, integrations, knowledge format
2. **Basic Memory Cloud** (upcoming) - Cloud-specific features, authentication, sync, billing

The site documents the latest v0.17.x release and includes cloud product documentation.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Build production site
npm run preview      # Preview production build locally
just deploy development  # Deploy to development environment
just deploy production   # Deploy to production environment
```

## Architecture

### Tech Stack
- **Framework**: Docus (Nuxt 4-based documentation theme)
- **Styling**: Tailwind CSS 4 with Nuxt UI
- **Content**: Markdown with MDC syntax
- **Search**: Built-in full-text search
- **LLM Integration**: nuxt-llms for AI-friendly documentation
- **Deployment**: Fly.io with Docker containerization

### Directory Structure

```
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

### Key Architectural Patterns

**Configuration** (`app/app.config.ts`):
- Docus theme configuration (header, footer, socials, TOC)
- Nuxt UI color and component customization

**Navigation**:
- File-based routing via numbered directory prefixes (e.g., `1.start-here/`)
- `.navigation.yml` files for section titles and icons
- Automatic sidebar generation from content structure

**Component System**:
- MDC (Markdown Components) syntax for inline components
- Custom Vue components in `app/components/content/`
- Built-in Docus components: `::note`, `::warning`, `::tip`, `::code-group`

**Theming**:
- Dark mode built-in with Nuxt UI
- Tailwind CSS 4 with CSS variables
- Theme configuration in `app/app.config.ts`

## Content Guidelines

### Adding Documentation Pages

1. Create `.md` file in appropriate `content/` subdirectory
2. Use numeric prefix for ordering (e.g., `1.getting-started.md`)
3. Add frontmatter:
   ```yaml
   ---
   title: Page Title
   description: Optional description
   ---
   ```

### Using MDC Components

```md
::note
Important information here
::

::warning
Warning message
::

::code-group
```bash [npm]
npm install basic-memory
```
```bash [pip]
pip install basic-memory
```
::
```

## Site Configuration

- Site URL: `https://docs.basicmemory.com` (in nuxt.config.ts)
- Docus configuration in `app/app.config.ts`
- LLM-friendly output via nuxt-llms module

## Documentation Status & Priorities

Documentation is up-to-date for v0.17.x release. Cloud product documentation is complete.

### Reference Materials

When documenting features:
- **Basic Memory CHANGELOG**: `gh api repos/basicmachines-co/basic-memory/contents/CHANGELOG.md`
- **Release Notes**: `gh release view v0.17.2 --repo basicmachines-co/basic-memory`
- **Basic Memory README**: https://github.com/basicmachines-co/basic-memory
- **Cloud README**: https://github.com/basicmachines-co/basic-memory-cloud
- **Cloud CLAUDE.md**: https://github.com/basicmachines-co/basic-memory-cloud/blob/main/CLAUDE.md
