# Handoff: docs review pass (2026-06-09)

Claude (Opus) did a verification pass over the docs at Drew's request. Overall the
docs are in good shape — content is accurate, consistent, and well-structured.
This note records what was checked, what changed, and what's left for you to decide.

## What was verified (no changes needed)

- **Routes render**: home + quickstarts + integrations + cloud + reference + concepts
  all return 200 against the local preview (127.0.0.1:4327).
- **Consistency is clean across all content**:
  - Pricing: `$15/seat/month` + "per seat" language agree everywhere.
  - Cloud MCP endpoint `https://cloud.basicmemory.com/mcp` is identical in all ~10 places.
  - No `TODO`/`placeholder`/`coming soon` leftovers.
- **Anchor links resolve**: homepage `/cloud/web-app#import-data` and quickstart
  `getting-started#teach-your-ai-when-to-use-basic-memory` both point to real headings.
- `npm run check:docs` passes (0 errors).

## Changes made this session

1. **`scripts/check-docs.mjs` — fixed a real regex bug.** The link pattern's text and
   URL groups (`[^\]]*` / `[^)]+`) matched across newlines. A stray `[` in the
   keyboard-shortcuts table in `content/3.cloud/02.web-app.md` (line ~293,
   `**Cmd/Ctrl + [**`) opened a "markdown link" that didn't close until the real
   `[Teams](/teams/about)` link ~42 lines later. `matchAll` is non-overlapping, so it
   swallowed that whole span — producing **false** "unreferenced screenshot" warnings for
   `v2-settings-*` and `v2-shortcuts-*` (which ARE used), AND silently skipping link/asset
   validation for anything inside a swallowed span (a real blind spot).
   - Fix: bounded both groups to a single line:
     `\[[^\]\n]*]\(([^)\s]+)\)|\bto:\s*([^\s]+)|(?:light|dark)="([^"]+)"`
   - NOTE: `check-docs.mjs` is still untracked (`??`). Commit it.

2. **`content/3.cloud/02.web-app.md` — promoted Themes into the Settings table.**
   Themes was the one setting that wasn't a table row (just a dangling trailing sentence).
   Added a `**Themes**` row linking to `/cloud/themes`, removed the trailing sentence, and
   dropped the now-redundant "appearance" from the General row. The `/cloud/themes` page is
   intentionally kept — its TweakCN custom-theme workflow is durable content that doesn't
   belong inlined in the settings table. (Drew agreed with keeping the page.)

3. **Deleted stale/superseded screenshots:**
   - `v2-import-{light,dark}.png`, `v2-manage-projects-{light,dark}.png` — superseded by
     the `-current.png` versions web-app.md already uses.
   - `themes.gif` — Drew confirmed it's based on the old app and is distracting.

## Result: orphaned-screenshot warnings went 19 -> 10

After the fixes, `check:docs` passes with **10 warnings**, all now genuine orphans.

## Open decision for you (Codex) — the 10 remaining orphans

We dug into provenance and concluded these are **pre-v2 leftovers**, deliberately not
blessed during your v2 capture pass:

- The current/blessed captures in `docs/screenshots.json` were taken **2026-06-07** and use
  the `v2-` naming convention.
- All 10 orphans were captured **2026-06-06**, are **not** in the manifest, and the two
  Basic-Memory-app ones (`cloud/signup.png`, `cloud-app/first-note.png`) lack the `v2-`
  prefix. `first-note.png` (223 KB, Jun 6) is a lower-quality near-duplicate of the blessed
  `getting-started-project.png` (562 KB, Jun 7).

The 10 orphans:

- `cloud-app/first-note.png` — pre-v2 dupe of `getting-started-project.png`. Safe to delete.
- `cloud/signup.png` — pre-v2 sign-up screen. Current screen may differ; verify before reuse.
- `claude/*` (8: add-connector, configure-tools, create-first-note, oauth-authorize,
  oauth-connect, project-list-response, settings-connectors, tools-menu-local) — these are
  **Claude's own UI**, not the BM app, captured Jun 6. They visually look current (Opus 4.5,
  BETA connector) and match the written steps in
  `content/7.integrations/1.claude-desktop.md` (which is currently text-only), but they were
  not blessed and we couldn't verify them against today's Claude.

**Recommendation:** either (a) delete all 10 to reach zero warnings and match what the v2
pass already decided, or (b) if you want visuals on the (currently text-only) Claude
integration page, re-capture fresh shots against current app.basicmemory.com + current
Claude and add them to `docs/screenshots.json` — don't reuse the Jun-6 images on trust.

We did NOT delete these 8 Claude shots or `signup.png`/`first-note.png` — left for your call.

## Notes

- `content/3.cloud/06.themes.md` shows as modified in git, but that was a pre-existing
  change from before this session — Claude did not edit it.
- Audit doc (`docs/docs-audit.md`) still lists many pages as "Needs audit." Spot-checks of
  several (integrations index, claude-desktop, both quickstarts, what-is-basic-memory) found
  them in good shape — the status table may just be lagging the actual work.
