# Contributing to the Basic Memory docs

Keep documentation task-oriented, current, and explicit about whether a workflow uses Basic Memory Cloud or the open-source local project.

## Before opening a pull request

- Verify CLI commands and MCP parameters against the current `basic-memory` source or generated help.
- Verify Cloud settings, permissions, roles, billing behavior, and screenshots against the current application.
- Verify third-party integrations against the provider's official documentation.
- Avoid current-page claims tied to a release number. Put historical behavior in What's New, Changelog, or a migration page.
- Use screenshots only when they clarify a UI step that text cannot describe reliably.
- Add maintained screenshots to `docs/screenshots.json`.
- Preserve a redirect when deleting or renaming a published page.
- Run `npm run check`.

## Writing style

- Lead with the task or decision the reader is trying to complete.
- Keep Quickstarts short; link to deeper reference pages.
- Describe shipped behavior only. Label historical material as historical.
- Prefer durable names and concepts over exact button positions when third-party interfaces change frequently.
- Do not frame Basic Memory only as expanded model memory. It is a shared knowledge base for documents, workflows, projects, research, creative work, humans, AI tools, agents, and teams.
