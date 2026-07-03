# Docs TODO

Last updated: 2026-07-02 (docs-updates-2026-07 branch). Items found during the July 2026 audit that need screenshots, product verification, or a human decision. Working checks: `npm run check:docs` (broken links/assets fail; version literals and orphaned screenshots warn).

## Screenshots to capture or re-verify

### New captures needed (features shipped July 1)
- [ ] **Onboarding / Getting Started project** — new-tenant landing with the seeded tutorial project and floating onboarding popup (for `start-here/2.quickstart-cloud.md` step 1)
- [ ] **Activity view** showing agent/MCP writes alongside member edits (for `cloud/02.web-app.md` → Activity)
- [ ] **Explore 3D graph view** (for `cloud/02.web-app.md` → Explore the graph)
- [ ] **Snapshots page with workspace selector** (replaces pre-v2 shots below)
- [ ] Optional: partner portal dashboard (for `teams/4.partners.md`)

### Stale/pre-v2 — replace or delete
- [ ] `public/screenshots/cloud-app/snapshots-list.png`, `create-snapshot.png`, `restore-files.png` — pre-v2 UI, used by `cloud/05.cloud-snapshots.md` as plain `![]()` images; recapture as `::theme-image` light/dark pairs
- [ ] `public/screenshots/cloud-app/themes.gif` + themes page imagery — predate the JSON preset system
- [ ] Now unreferenced after quickstart-cloud rewrite (delete or recapture): `public/screenshots/cloud/signup.png`, `public/screenshots/cloud-app/first-note.png`, `public/screenshots/claude/project-list-response.png`, `public/screenshots/claude/create-first-note.png`

### Claude UI shots — unverified vintage, re-verify against current Claude
- [ ] `public/screenshots/claude/settings-connectors.png`, `add-connector.png`, `oauth-connect.png`, `configure-tools.png` and `public/attachments/claude-tools-menu.png` — now used only by `integrations/1.claude-desktop.md`, the single canonical Claude cloud walkthrough (quickstart and cloud-guide link to it). `oauth-authorize.png` is now unreferenced — delete or fold into a recapture.
- [ ] `public/screenshots/claude/tools-menu-local.png` (used by `start-here/3.quickstart-local.md`)
- [x] Root-level `public/claude-settings-*.png` (Feb 2026 set) — deleted; superseded by the consolidated walkthrough

### Teams shots — May 2026 vintage, predate Teams/Members relabel
- [ ] `v2-settings-teams-*`, `v2-team-invite-*`, `v2-team-invitation-*`, `v2-team-accept-invite-*`, `v2-team-manage-billing-*`, `v2-team-usage-*` — verify visible labels match the current "Teams"/"Members" nav and 5-role invite dropdown

When capturing, record source screen, date, theme, and owning page in `docs/screenshots.json` (the checker validates manifest entries).

## Verify against production

- [ ] **July-1 onboarding batch deployed?** `quickstart-cloud.md` and `web-app.md` now describe the seeded Getting Started project, onboarding popup, Show-onboarding replay, Activity feed with agent writes, and Explore graph. Confirm these are live at app.basicmemory.com before production docs deploy.
- [ ] `app.basicmemory.com/notes` route used in quickstart step 5 — confirm it's the canonical notes URL
- [ ] **Themes page** (`cloud/06.themes.md`): claims theme choice persists only in browser localStorage — likely superseded by the JSON preset system. Also verify where theme selection lives in Settings and whether the TweakCN custom-CSS workflow is still supported.
- [ ] `bm project ls --name <project>` in `cloud/03.cloud-sync.md` command reference — confirm the subcommand exists (everything else on that page is source-verified)
- [ ] `api-keys.md`: curl example against `https://cloud.basicmemory.com/api/v2/projects` — confirm path

## Verify against external products (fast-moving UIs)

- [ ] **ChatGPT MCP setup path** — now consistent across pages ("Settings → Developer → Custom MCP Servers"); verify against current ChatGPT UI, and check the YouTube walkthrough link still matches.
- [ ] **Claude Desktop connector flow** — "Settings → Claude → Connectors" wording + the screenshot sets above
- [ ] **Claude advanced research** — the research-mode page was deleted; a troubleshooting bullet in `integrations/1.claude-desktop.md` still claims research runs without MCP access. Verify current Claude behavior.
- [ ] **Hermes slash-command patch** — version pin removed from `integrations/11.hermes.md`; check whether current Hermes Agent releases still need MONKEYPATCH.md and update or drop the warning
- [ ] **Codex `bearer_token_env_var` config** in `cloud/07.api-keys.md` — verify against current Codex config schema
- [ ] Explainer video embed on `what-is-basic-memory` (basicmemory.com/videos/explainer-video.mp4) — still current?

## Open decisions / structural

- [ ] **Quickstart duplication** — cloud and local quickstarts share near-identical structure ("what you can do now" tables, example workflows); fine for now, but they must be edited in pairs
- [ ] **What's New numbering** — nav order is Teams(0), Changelog(1), Hermes(3), Cloud(4), Skills(6), OpenClaw(7), AI-docs(8) with gaps; consider renumbering and whether the Cloud announcement should outrank plugin announcements
- [ ] **Teams page "Personal Cloud" label** — app switcher says "Personal"; table in `teams/1.about.md` says "Personal Cloud"
- [ ] `web-app.md` → "Organize with folders" shows a local `~/basic-memory/` tree in a web-app context
- [ ] `cloud-guide.md` "search and tools menu" Claude wording is vague
- [ ] Keep pricing out of docs (none present today; the only safe reference is the marketing site)
- [ ] `docs/docs-audit.md` register predates this branch's changes — treat this file as current; update the register when doing the next structured audit
