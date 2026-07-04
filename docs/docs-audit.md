# Basic Memory Docs Audit

Last updated: 2026-06-09

## Purpose

This file tracks the docs overhaul as a product audit. A page is not "done" because it reads well; it is done when current product behavior, source code, screenshots, and positioning agree.

## Source Of Truth

| Area | Primary source | Verification notes |
|---|---|---|
| Messaging | basicmemory.com, product notes, Drew/Paul decisions | Current public website uses "One knowledge base for you, your AI tools, and your team" and emphasizes plain Markdown, MCP, Cloud, open source, and teams. Avoid "just expanding memory" framing. |
| Cloud app | Live app at app.basicmemory.com | Verify settings, onboarding, workspace switcher, import, sharing, snapshots, file history, themes, and billing in the browser. |
| Collaboration | Live app invite/member flows, product notes | Verify owner and recipient flows, roles, seats, billing behavior, project access, and shared AI access. |
| CLI | basic-memory source and command help | Verify commands, flags, defaults, routing, update behavior, imports, schema commands, and local paths. |
| MCP tools | basic-memory source/tool schemas | Verify tool names, parameters, aliases, output behavior, Cloud/local parity, and ChatGPT compatibility tools. |
| Integrations | Official client docs plus live Basic Memory behavior | Verify remote MCP/OAuth versus local stdio setup for each client. Remove unsupported clients/workarounds. |
| Screenshots | Live app/browser captures plus `docs/screenshots.json` | Every screenshot should record source screen, capture date, theme, and owning docs page. |
| Pricing/limits | Live app checkout, Polar/product config, public website | Treat as high-stale-risk. Do not hard-code pricing or limits without verification. |

## Status Key

| Status | Meaning |
|---|---|
| Verified | Checked against current source of truth in this overhaul. |
| Needs audit | Plausible, but not yet verified deeply enough. |
| Needs rewrite | Known stale, incomplete, misleading, or too thin. |
| Needs screenshots | Text may be fine, but UI proof/capture is missing or stale. |
| Archive candidate | Historical or release-specific; should not sit in current docs nav unless intentionally preserved. |

## Priority Queue

1. **Integrations batch** — verify client-by-client against official current behavior and Basic Memory source.
2. **Screenshots** — resolve unreferenced screenshot warnings and snapshot-list image transform warning.
3. **How-to guides** — shorten or rewrite as durable workflows, not old marketing/tutorial sprawl.
4. **Historical release pages** — keep release material under What's New/changelog/archive, not current reference unless still useful.

## Coverage Checklist

| User job | Current home | Status | Notes |
|---|---|---|---|
| Understand what Basic Memory is | `/start-here/what-is-basic-memory` | Needs audit | Messaging mostly aligned; verify examples cover documents, workflows, research, software, and creative projects. |
| Start with Cloud | `/start-here/quickstart-cloud` | Needs audit | Check live onboarding, pricing/seat language, screenshot, and team invite mention. |
| Start locally | `/start-here/quickstart-local` | Verified | First pass checked against README/source. |
| Decide Cloud vs Open Source | Missing dedicated page | Needs rewrite | Add "Cloud or Open Source?" or equivalent; link from homepage and both quickstarts. |
| Use docs with an AI agent | `/reference/llms-txt`, `/llms.txt`, `/llms-full.txt` | Verified | Endpoints return real content locally. Homepage links to explanation page. |
| Connect an AI tool | `/integrations/*` | Needs audit | Must distinguish Cloud remote MCP/OAuth from local `uvx basic-memory mcp`. |
| Invite/collaborate with a team | `/teams/about`, `/teams/join-a-team` | Needs screenshots | Text rewritten, but live invite/recipient flow still needs final verification. |
| Import existing knowledge | `/cloud/web-app#import-data` | Needs audit | Verify current import UI and supported sources. |
| Sync local files with Cloud | `/cloud/cloud-sync`, `/cloud/edit-locally-and-in-the-app` | Needs audit | Verify current CLI behavior and local/cloud routing. |
| Use Cloud from the terminal | `/cloud/cloud-cli` | Verified | Added short command-line guide backed by current CLI source and cross-linked from Cloud onboarding/reference pages. |
| Recover notes | `/cloud/restore-lost-content`, `/cloud/cloud-snapshots`, `/cloud/file-history` | Needs screenshots | Build logs one Cloud Snapshot image transform warning. |
| Contact support | `/reference/contact-support` | Verified | Uses public `hello@basicmemory.com` contact path and separates private support from Discord/GitHub. |
| Use schemas | `/concepts/schema-system`, `/concepts/metadata-search` | Needs audit | Schema page appears substantial; verify examples against current schema commands/tools. |
| Understand observations/relations | `/concepts/observations-and-relations` | Verified | Rewritten in this audit pass; verify against parser/source during MCP reference audit. |
| Troubleshoot MCP/install/sync | `/reference/troubleshooting` | Verified | Rewritten around Cloud MCP, Cloud app, local MCP, sync/routing, search/content, config, logs. |

## Page Register

| Area | Page | Status | Action |
|---|---|---|---|
| Home | `/` | Verified | New task-first homepage. Add Cloud/Open Source decision page link when created. |
| Get Started | `/start-here/what-is-basic-memory` | Needs audit | Check examples and remove any narrow "AI memory only" framing. |
| Get Started | `/start-here/quickstart-cloud` | Needs audit | Verify onboarding, current pricing language, MCP endpoint, and screenshot. |
| Get Started | `/start-here/quickstart-local` | Verified | Keep concise; revisit after CLI reference audit. |
| Get Started | `/start-here/getting-started` | Verified | Cloud terminal guidance now points to Cloud CLI; skills framing distinguishes MCP tool access from optional usage patterns. |
| What's New | `/whats-new/teams` | Needs audit | Verify role/seat copy; keep release-specific framing out of evergreen Teams docs. |
| What's New | `/whats-new/v0.21.0` | Archive candidate | Confirm patch-release notes belong here, not current nav/reference. |
| What's New | `/whats-new/hermes-plugin` | Needs audit | Verify install command and feature list. |
| What's New | `/whats-new/cloud` | Archive candidate | Keep as release/news if still accurate. |
| What's New | `/whats-new/changelog` | Verified | Simple redirect/explanation. |
| What's New | `/whats-new/agent-skills` | Needs audit | Verify whether release/news page should mirror current 10-skill list or stay historical. |
| What's New | `/whats-new/openclaw-plugin` | Needs audit | Verify install command and feature list. |
| What's New | `/whats-new/ai-friendly-docs` | Verified | Mirrors AI-friendly reference. |
| Cloud | `/cloud/cloud-guide` | Verified | Cloud CLI and Contact Support are now surfaced; still keep feature claims tied to current Cloud pages. |
| Cloud | `/cloud/web-app` | Needs screenshots | Verify all settings sections and screenshots. |
| Cloud | `/cloud/cloud-sync` | Needs audit | Verify commands, routing, and sync statuses. |
| Cloud | `/cloud/cloud-cli` | Verified | New short guide for terminal workflows; snapshot commands corrected against source. |
| Cloud | `/cloud/cloud-snapshots` | Needs screenshots | Verify UI/CLI, retention claims, and image warning. |
| Cloud | `/cloud/web-app#themes` | Verified | Themes folded into Web App settings with current screenshot; `/cloud/themes` redirects here. |
| Cloud | `/cloud/api-keys` | Verified | Source-backed pass against current CLI API-key behavior; reduced client-specific config, clarified `bmc_` format, bearer usage, OAuth/API-key tradeoffs, and explicit per-project routing. |
| Cloud | `/cloud/routing` | Verified | Source-backed pass against current `get_client`, routing flags, project mode, workspace default, `set-cloud`, and `set-local` behavior; removed stale global Cloud mode claims. |
| Cloud | `/cloud/shared-notes` | Verified | Current screenshots present; tightened public-link safety language, removed unverified `/raw` claim, and linked support for accidental private sharing. |
| Cloud | `/cloud/edit-locally-and-in-the-app` | Needs audit | Verify CLI/sync setup and cross-link with Cloud Sync. |
| Cloud | `/cloud/restore-lost-content` | Needs audit | Verify recovery decision tree and current UI labels. Visible title is "Recover Notes." |
| Cloud | `/cloud/file-history` | Needs screenshots | Verify UI, permissions, and retention behavior. |
| Collaboration | `/teams/about` | Needs screenshots | Verify live owner flow, roles, seats, project visibility. |
| Collaboration | `/teams/join-a-team` | Needs screenshots | Verify recipient invite flow. |
| Collaboration | `/teams/copy-between-workspaces` | Needs audit | Verify copy/export/import options and avoid overpromising. |
| Open Source | `/local/local-install` | Verified | First pass checked. Revisit after CLI reference audit. |
| Open Source | `/local/cli-basics` | Verified | First pass checked. Revisit after CLI reference audit. |
| Open Source | `/local/mcp-tools-local` | Verified | First pass checked. Revisit after MCP reference audit. |
| Concepts | `/concepts/vs-built-in-memory` | Needs audit | Verify current built-in memory claims for Claude/ChatGPT/Cursor. |
| Concepts | `/concepts/knowledge-format` | Needs audit | Check duplication and align with schema/obs-rel pages. |
| Concepts | `/concepts/projects-and-folders` | Needs audit | Verify local/cloud project examples and project-prefixed permalinks. |
| Concepts | `/concepts/observations-and-relations` | Verified | Rewritten from current Knowledge Format/MCP reference behavior. |
| Concepts | `/concepts/memory-urls` | Needs audit | Verify current URL resolution behavior. |
| Concepts | `/concepts/schema-system` | Needs audit | Verify picoschema examples and command names. |
| Concepts | `/concepts/semantic-search` | Needs audit | Verify default embedding provider, config, and OpenAI provider guidance. |
| Concepts | `/concepts/metadata-search` | Needs audit | Verify filters against current tool schema. |
| Integrations | `/integrations/claude-desktop` | Needs audit | Verify official Claude connector flow and local deployment variant. |
| Integrations | `/integrations/claude-code` | Needs audit | Verify CLI commands and Cloud/local variants. |
| Integrations | `/integrations/chatgpt` | Needs audit | Verify current ChatGPT developer-mode/custom app flow. |
| Integrations | `/integrations/gemini` | Needs audit | Verify official Gemini CLI MCP config. |
| Integrations | `/integrations/codex` | Needs audit | Verify Codex app and CLI config, including desktop behavior. |
| Integrations | `/integrations/cursor` | Needs audit | Verify Cursor MCP config and Cloud/local variants. |
| Integrations | `/integrations/vscode` | Needs audit | Verify VS Code MCP configuration and direct Markdown editing guidance. |
| Integrations | `/integrations/obsidian` | Needs audit | Verify Cloud/local wording; likely durable. |
| Integrations | `/integrations/skills` | Verified | Checked against `basicmachines-co/basic-memory-skills` README; updated to 10 skills including `memory-literary-analysis`. |
| Integrations | `/integrations/openclaw` | Needs audit | Verify package name and feature list. |
| Integrations | `/integrations/hermes` | Needs audit | Verify package name and feature list. |
| Guides | `/how-to/project-documentation` | Needs audit | Keep only if durable and useful; shorten if generic. |
| Guides | `/how-to/writing-organization` | Needs audit | Good broader-use signal; check for outdated examples. |
| Guides | `/how-to/research-learning` | Needs audit | Likely durable; tighten if needed. |
| Guides | `/how-to/note-taking` | Needs audit | Check for old terminology and stale tool behavior. |
| Guides | `/how-to/personal-knowledge` | Needs audit | Avoid over-indexing docs on personal memory use case. |
| Reference | `/reference/cli-reference` | Verified | Source-backed pass against current CLI command modules; added status wait/full reindex, Team-safe pull/push guidance, upload flags, and missing `bm tool delete-note`. |
| Reference | `/reference/mcp-tools-reference` | Verified | Source-backed pass against current MCP tool signatures; added `project_id`, current search aliases/categories, UI tools, and corrected workspace/list-project behavior. |
| Reference | `/reference/ai-assistant-guide` | Needs audit | Make durable system-prompt guidance; link from quickstarts/getting-started. |
| Reference | `/reference/technical-information` | Needs audit | Verify architecture, licensing, and source links. |
| Reference | `/reference/troubleshooting` | Verified | Rewritten in this audit pass; stale `basic-memory sync` and old install assumptions removed. |
| Reference | `/reference/contact-support` | Verified | New page for private account, billing, workspace, invitation, and Cloud data issues. |
| Reference | `/reference/configuration` | Needs audit | Verify config keys and environment variables. |
| Reference | `/reference/docker` | Verified | Rewritten against current Dockerfile, Compose files, default SSE transport, mounted knowledge/config volumes, and security caveats. |
| Reference | `/reference/llms-txt` | Verified | Endpoints checked locally. |
| Reference | `/reference/v0.19-migration` | Archive candidate | Keep historical; remove from current-reference prominence if distracting. |
| Changelog | `/changelog` | Needs audit | Verify release feed/source. |

## Automated Checks To Add Or Extend

- Fail on broken internal links and missing assets.
- Warn on orphaned screenshots with source metadata missing from `docs/screenshots.json`.
- Warn on stale version literals outside `whats-new`, changelog, and migration/archive pages.
- Warn on removed commands such as `basic-memory sync` unless in historical pages.
- Warn on unsupported clients/features such as Claude Research if reintroduced.
- Warn when content pages have no title or no body headings.

## Working Rhythm

1. Pick one batch from the priority queue.
2. Verify source of truth.
3. Rewrite or delete pages.
4. Run `npm run check:docs`.
5. Browser-review the affected routes.
6. Update this audit status before moving on.
