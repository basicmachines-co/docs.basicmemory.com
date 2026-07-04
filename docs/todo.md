# Docs TODO

Last updated: 2026-07-02 (docs-updates-2026-07 branch). Items found during the July 2026 audit that need screenshots, product verification, or a human decision. Working checks: `npm run check:docs` (broken links/assets fail; version literals and orphaned screenshots warn).

## Screenshots — verified 2026-07-03

Audit result: every image referenced by content exists on disk (checker enforces this); current shots are the May–June v2 capture set and accepted as current. Stale unreferenced files deleted (old Claude walkthrough spares, pre-v2 signup/first-note/themes.gif, superseded accept-invite pair).

Remaining, only if desired:
- [ ] Optional new captures: onboarding popup / Activity view / Explore graph / partner portal — pages describe these in prose today and don't require images
- [ ] When capturing anything new, record source screen, date, theme, and owning page in `docs/screenshots.json` (the checker validates manifest entries)

## Verify against production — done 2026-07-03

Verified live at app.basicmemory.com (logged-in session):
- [x] July-1 onboarding batch deployed: seeded Getting Started project (all workspaces), Help Center at /help with Connect Your AI Tool (endpoint + copy, Claude/ChatGPT guides, test prompt), Activity feed (sidebar popover + View all), Explore Graph (Graph → Project/Structured/Explore tabs, 2D/3D)
- [x] `/notes` route confirmed canonical
- [x] Settings nav matches docs (General…Version); Look & Feel = Mode + Note list + Theme swatches (saved per-browser — docs updated)
- [x] `bm project ls --name` — source-verified (project.py:1240)
- [x] `api/v2/projects` — source-verified (gateway path test + v2 project router)
- Corrections applied to docs: "Show onboarding" control doesn't exist (Help Center is the replay surface); workspaces are sidebar *sections*, not a selector dropdown; graph entry is **Graph** with Explore as a tab

## Verify against external products (fast-moving UIs)

- [ ] **ChatGPT MCP setup path** — docs now say Settings → Apps & Connectors → Advanced settings → enable Developer mode → Create (per review-agent verification); double-check against current ChatGPT UI, and check the YouTube walkthrough link still matches. Paid-plan wording is now "Plus, Pro, Business/Team, Enterprise, or Edu".
- [ ] **Cursor MCP setup** — review-agent correction applied (config via `~/.cursor/mcp.json` / `.cursor/mcp.json`, or Cursor Settings → MCP); verify against current Cursor UI
- [ ] **Claude Desktop connector flow** — "Settings → Claude → Connectors" wording + the screenshot sets above
- [ ] **Claude advanced research** — the research-mode page was deleted; a troubleshooting bullet in `integrations/1.claude-desktop.md` still claims research runs without MCP access. Verify current Claude behavior.
- [ ] **Hermes slash-command patch** — version pin removed from `integrations/11.hermes.md`; check whether current Hermes Agent releases still need MONKEYPATCH.md and update or drop the warning
- [ ] **Codex `bearer_token_env_var` config** in `cloud/07.api-keys.md` — verify against current Codex config schema
- [ ] Explainer video embed on `what-is-basic-memory` (basicmemory.com/videos/explainer-video.mp4) — still current?

## Open decisions / structural

- [ ] **Quickstart duplication** — cloud and local quickstarts share near-identical structure ("what you can do now" tables, example workflows); fine for now, but they must be edited in pairs
- [ ] **What's New numbering** — nav order is Teams(0), Changelog(1), Hermes(3), Cloud(4), Skills(6), OpenClaw(7), AI-docs(8) with gaps; consider renumbering and whether the Cloud announcement should outrank plugin announcements
- [x] **Teams page "Personal Cloud" label** — fixed in the teams-section split (table now says "Personal")
- [ ] `web-app.md` → "Organize with folders" shows a local `~/basic-memory/` tree in a web-app context
- [ ] `cloud-guide.md` "search and tools menu" Claude wording is vague
- [ ] Keep pricing out of docs (none present today; the only safe reference is the marketing site)
- [ ] `docs/docs-audit.md` register predates this branch's changes — treat this file as current; update the register when doing the next structured audit
