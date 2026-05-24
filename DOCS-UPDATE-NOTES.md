# Docs Update — Teams, New Web App, v0.21.x — Status

Build passes (`npm run build`). Push to **development** first.

> **Screenshots are landed.** All v2 screenshots (with `-light` / `-dark` variants) are in `public/screenshots/cloud-app/` and referenced via a new `:::theme-image` MDC component (`app/components/content/ThemeImage.vue`) that swaps based on the active theme. Old non-v2 screenshots that aren't used elsewhere have been deleted.

---

## What changed (content edits — done)

**Cloud — new web app (web-v2)**
- `content/3.cloud/2.web-app.md` — full rewrite for the new app: three-pane layout; **Rich editor / Source mode / Preview** modes (with correct shortcuts); drafts + **Save Draft**; **Connect Agent** / **Improve** AI collaboration; updated keyboard-shortcut and settings tables (incl. Teams section).
- `content/3.cloud/1.cloud-guide.md` — "Web Editor" → "Web App" section updated; link text fixed.
- `content/2.whats-new/2.cloud.md` — replaced stale editor docs with an announcement of the redesigned app + Teams.

**Cloud — Teams (new)**
- `content/3.cloud/9.teams.md` — new page: workspaces, roles (owner/editor/viewer), invitations + deferred seat assignment, member management, ownership transfer, per-seat billing, project sharing, workspace commands. Auto-appears in nav after Routing (numeric prefix).
- `content/2.whats-new/0.teams.md` — new "Basic Memory Teams" announcement, pinned to the **top** of What's New. The other What's New pages were renumbered up by one (`0.v0.21.0` → `1.v0.21.0`, etc.); routes are unchanged (derived from slug).

**Cloud — Shared Notes (new)**
- `content/3.cloud/10.shared-notes.md` — new page: public read-only share links (`/s/<token>`), how to share/manage/revoke, who sees what, owner/editor permissions. Available in every cloud workspace.
- Referenced from `content/2.whats-new/3.cloud.md` (cloud what's-new) and linked from the web-app guide.

**Cloud — Copy Content Between Workspaces (new)**
- `content/4.teams/3.copy-between-workspaces.md` — new how-to page covering the four workflows for cross-workspace transfer: project ZIP export/import, single-note download/upload, MCP read/write/optional-delete, and local-sync filesystem copy. Sets expectations up front that there's no atomic move yet, and documents the caveats around wikilinks, permissions, and share links. Addresses [cloud#920](https://github.com/basicmachines-co/basic-memory-cloud/issues/920).
- Cross-linked from `4.teams/1.about.md` ("Bringing existing notes into a team workspace") and `3.cloud/01.cloud-guide.md` ("Moving between cloud workspaces").

**Cloud how-tos — Restore Lost Content & Edit Locally and in the App (new)**
- `content/3.cloud/11.restore-lost-content.md` — recovery decision guide. Now leads with **File history** (per-note, faster) and uses **Snapshots** as the second tier for bigger rollbacks. Linked from `cloud-snapshots.md`.
- `content/3.cloud/10.edit-locally-and-in-the-app.md` — happy-path for hybrid editing: login → `bm cloud setup` → attach project → `--resync` baseline → daily `bm cloud bisync`. Linked from snapshots restore page as a local backstop.

**Cloud — File History (new)**
- `content/3.cloud/12.file-history.md` — new dedicated page for per-note version history (the **File history** clock icon in the note toolbar, the version timeline + diff/merge modal, **Apply** behavior, permissions, when Apply is disabled, comparison vs. snapshots). Built on Tigris S3 object versioning — cites the [Tigris case study](https://www.tigrisdata.com/blog/case-study-basic-memory/) as the architecture reference.
- Cross-linked from `02.web-app.md` ("See a note's history" in the note actions), `05.cloud-snapshots.md` (the tip pointer), and `11.restore-lost-content.md` (lead recovery tier).

**Structural — Teams as its own top-level section**
- **New top-level section** `content/4.teams/` (icon: `i-lucide-users`). Cloud = individuals, Teams = groups, Local = on-device.
  - `content/4.teams/1.about.md` (was `3.cloud/9.teams.md`) → route `/teams/about`
  - `content/4.teams/2.join-a-team.md` (was `3.cloud/12.join-a-team.md`) → route `/teams/join-a-team`
  - `content/4.teams/3.copy-between-workspaces.md` (was `3.cloud/11.copy-between-workspaces.md`) → route `/teams/copy-between-workspaces`
- **Top-level dirs renumbered** to insert Teams between Cloud and Local: `4.local → 5.local`, `5.concepts → 6.concepts`, `6.integrations → 7.integrations`, `7.how-to → 8.how-to`, `8.reference → 9.reference`. Slugs unchanged → routes unchanged for those pages.
- **Cloud pages renumbered with zero-padded prefixes** (`01.` through `11.`) to fix lex-sort ordering — Docus sorts prefixes lexicographically, so `10.shared-notes` was landing between `1.cloud-guide` and `2.web-app`. Routes unchanged (zero-padding strips like other prefixes).
- **All inbound links rewritten** to the new `/teams/*` routes (verified zero matches for old paths).

**Concepts — Metadata Search (new)**
- `content/5.concepts/8.metadata-search.md` — new dedicated page for frontmatter / metadata filtering: operator reference (`$in`, `$gt`/`$gte`/`$lt`/`$lte`, `$between`, equality, array-contains), nested-field dot notation, MCP and CLI examples, type-coercion rules, limits. Grounded in `basic-memory/docs/metadata-search.md`.
- Fixed the metadata-filters subsection in `content/5.concepts/7.semantic-search.md` — it used non-existent CLI flags (`--metadata`, `--note-types`); corrected to real flags (`--meta key=value`, `--filter '<json>'`, `--tag`, `--type`) and linked to the new dedicated page.

**Integrations — Codex (restructured)**
- `content/6.integrations/5.codex.md` — restructured to cover both **Codex app** and **Codex CLI**, each with **local MCP** and **remote MCP (Basic Memory Cloud)**. App-cloud is the simplest path; app-local needs a long-running `basic-memory mcp --transport streamable-http`. CLI keeps the existing `codex mcp add` + `~/.codex/config.toml` flows. Video kept in the CLI-local section. UI label for the Codex app's MCP settings noted as "may vary by version" — refine if needed.

**basic-memory v0.20–v0.21.x**
- `content/2.whats-new/0.v0.21.0.md` — **fixed factual errors**: `bm orphan`→`bm orphans` (lists entities with no relations, not missing files); `bm db reset`→`bm reset`; added `bm reindex`; added Teams cross-links.
- `content/8.reference/1.cli-reference.md` — added `bm orphans`, `bm update`, `bm reset --force`, `bm project add --workspace/--visibility`, `bm cloud workspace set-default`.
- `content/8.reference/2.mcp-tools-reference.md` — added `search_all_projects`, parameter aliases note, `create_memory_project(workspace=)`, cross-workspace discovery note.
- `content/5.concepts/1.knowledge-format.md` + `3.observations-and-relations.md` — added the multi-word relation-type **quoting rule** (v0.21 breaking change).
- `content/8.reference/6.configuration.md` — new **Update settings** section (`auto_update`, `update_check_interval`, `auto_update_last_checked_at`).

Homepage badge already v0.21.0 — no change needed.

---

## Screenshots — landed

All v2 screenshots are in `public/screenshots/cloud-app/` with `-light` and `-dark` variants and referenced through the new `:::theme-image` MDC component (`app/components/content/ThemeImage.vue`), which swaps the right image based on the active theme.

**v2 screenshot pairs in use** (each has `-light.png` and `-dark.png`):
`v2-overview`, `v2-search`, `v2-edit-mode`, `v2-edit-preview`, `v2-frontmatter`, `v2-new-note`, `v2-manage-projects`, `v2-import`, `v2-command`, `v2-shortcuts`, `v2-settings`, `v2-settings-teams`, `v2-file-history-button`, `v2-file-history-dialog`, `v2-shared-note-button`, `v2-shared-note-dialog`, `v2-shared-note-public-note`, `v2-shared-note-settings`, `v2-team-invite`, `v2-team-invitation`, `v2-team-accept-invite`, `v2-team-manage-billing`, `v2-team-usage`.

**Old (non-v2) screenshots still in use** (not replaced — these pages aren't part of the web-v2 redesign):
`create-snapshot.png`, `restore-files.png`, `snapshots-list.png` (in cloud-snapshots), `first-note.png` (in homepage + quickstarts), `themes.gif` (in themes).

**Deleted**: the unreferenced old-app screenshots (`overview.png`, `search-notes.png`, `editor-*`, `new-note.*`, `command-palette.png`, `manage-projects.png`, `switch-projects.png`, `import-data.png`, `settings.png`, `upload-files.png`, `edit-frontmatter.png`).

---

## Open items to confirm
- **App URL at release:** docs point to `app.basicmemory.com` (the cutover destination). The current preview at `app-v2.basicmemory.com` is **not** mentioned in docs — add a note if you want previewers pointed there before cutover.
