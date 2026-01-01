# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation website for Basic Memory (`docs.basicmemory.com`), built with Astro, React components, and MDX for content. The site provides comprehensive documentation including guides, integrations, how-to articles, and technical references.

### What is Basic Memory?

**Basic Memory** is a user-first knowledge management system built on the Model Context Protocol (MCP) that enables persistent AI memory across conversations. Instead of losing valuable insights in conversation history, users build a persistent knowledge base where both human and AI can read, write, and enhance each other's work.

**Repository**: https://github.com/basicmachines-co/basic-memory
**Website**: https://basicmemory.com
**Current Version**: v0.17.2 (released December 29, 2025)

**Key Features**:
- 17 MCP tools for AI integration (write_note, read_note, edit_note, search_notes, build_context, etc.)
- Local markdown files create a semantic knowledge graph
- Multi-project support with project switching
- Integrations with Claude Desktop, VS Code, Cursor, Obsidian
- Python-based with FastAPI endpoints and comprehensive CLI
- Real-time file synchronization
- SQLite and PostgreSQL database backends

**v0.17.x Major Features**:
- API v2 migration complete - all MCP tools use optimized v2 endpoints
- Auto-format files on save with built-in Python formatter
- Anonymous usage telemetry (Homebrew-style opt-out)
- CLI stability improvements - commands no longer hang on exit
- Cloud mode discovery for recent_activity across projects
- PostgreSQL/Neon database support as alternative to SQLite

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
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
npm run astro ...    # Run Astro CLI commands
```

## Architecture

### Tech Stack
- **Framework**: Astro 5 with MDX and React integration
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: React (TSX) and Astro components
- **Search**: Pagefind for static search
- **Diagrams**: Mermaid integration with theme support
- **Syntax Highlighting**: Shiki with GitHub light/dark themes

### Directory Structure

```
src/
├── components/     # React and Astro components
│   ├── *.tsx      # React components (Callout, Card, CodeBlock, Tabs, etc.)
│   └── *.astro    # Astro components (Header, Sidebar, Footer, etc.)
├── config/
│   └── navigation.ts  # Navigation configuration
├── layouts/
│   ├── Layout.astro      # Base layout
│   └── DocsLayout.astro  # Docs page layout with sidebar + TOC
├── lib/
│   └── utils.ts   # Utility functions (cn, etc.)
├── pages/         # File-based routing
│   ├── index.mdx
│   ├── guides/
│   ├── integrations/
│   ├── how-to/
│   └── technical/
└── styles/        # Global styles and CSS variables
```

### Key Architectural Patterns

**Navigation System** (`src/config/navigation.ts`):
- Centralized configuration for all navigation
- `navConfig.sidebar`: Hierarchical sidebar structure with sections and items
- `navConfig.sidebarTopLinks`: External links with icons (GitHub, Discord, etc.)
- `navConfig.topNav`: Top navigation links
- Interface: `SidebarSection` containing `NavItem[]`

**Layout Composition**:
- `Layout.astro`: Base layout with head/meta tags
- `DocsLayout.astro`: Three-column layout (Sidebar → Content → TableOfContents)
- Uses frontmatter `layout` field in MDX files

**Component System**:
- Documentation components exported from `src/components/index.ts`
- Custom components available in MDX: `Card`, `CardGroup`, `Callout`, `Tip`, `Warning`, `Note`, `Info`, `Steps`, `Tabs`, `CodeBlock`, `CodeGroup`, `InstallationTabs`
- All use Tailwind CSS with dark mode support via `class` strategy

**Path Aliases**:
- `@/*` maps to `./src/*` (configured in tsconfig.json)
- Always use `@/components`, `@/config`, etc. for imports

**Theming**:
- Dark mode: Class-based (`darkMode: 'class'` in Tailwind)
- Theme toggle component with localStorage persistence
- Custom CSS variables in Tailwind config for design tokens
- Mermaid diagrams support light/dark themes

## Content Guidelines

### Adding Documentation Pages

1. Create MDX file in appropriate `src/pages/` subdirectory
2. Add frontmatter:
   ```yaml
   ---
   layout: '@/layouts/DocsLayout.astro'
   title: 'Page Title'
   description: 'Optional description'
   ---
   ```
3. Add navigation entry to `src/config/navigation.ts` in correct section
4. Import and use documentation components as needed

### Using Components in MDX

```mdx
import { Card, CardGroup, Callout, Steps } from '@/components'

<Callout type="info">
  Important information here
</Callout>

<Steps>
1. First step
2. Second step
</Steps>

<CardGroup cols={2}>
  <Card title="Guide 1" href="/guide-1" />
  <Card title="Guide 2" href="/guide-2" />
</CardGroup>
```

## Navigation Updates

When adding/removing/reorganizing pages, update `src/config/navigation.ts`:

```typescript
export const navConfig = {
  sidebar: [
    {
      title: 'Section Name',
      items: [
        { title: 'Page Title', href: '/path/to/page' },
      ],
    },
  ],
}
```

The sidebar automatically highlights the current page based on `href` matching `Astro.url.pathname`.

## Styling Conventions

- Use Tailwind utility classes
- Dark mode: Add `dark:` variants for all colors
- Responsive: Mobile-first with `md:` and `lg:` breakpoints
- Custom colors use HSL CSS variables from Tailwind config
- Components should support both light and dark themes

## Site Configuration

- Site URL: `https://docs.basicmemory.com` (in astro.config.mjs)
- Mermaid diagrams use 'default' (light) and 'base' (dark) themes
- Shiki syntax highlighting uses 'github-light' and 'github-dark'
- Pagefind builds search index automatically during production build

## Documentation Status & Priorities

Documentation is up-to-date for v0.17.x release. Cloud product documentation is complete.

### Reference Materials

When documenting features:
- **Basic Memory CHANGELOG**: `gh api repos/basicmachines-co/basic-memory/contents/CHANGELOG.md`
- **Release Notes**: `gh release view v0.17.2 --repo basicmachines-co/basic-memory`
- **Basic Memory README**: https://github.com/basicmachines-co/basic-memory
- **Cloud README**: https://github.com/basicmachines-co/basic-memory-cloud
- **Cloud CLAUDE.md**: https://github.com/basicmachines-co/basic-memory-cloud/blob/main/CLAUDE.md
