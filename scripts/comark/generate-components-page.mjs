// Generate content/03.cloud/18.comark-components.md from basic-memory-cloud:
// each example's source comes from the playground's examples, and each
// attribute table from the Comark attribute catalog the app validates against,
// so the page shows exactly what the playground renders and a note accepts.
//
// Run from the docs root after either file changes in the cloud repo:
//   npm run gen:comark -- ../basic-memory-cloud
// Screenshots in public/screenshots/comark/ are captured separately.
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const cloudDir = resolve(process.argv[2] ?? "../basic-memory-cloud");
const outFile = "content/03.cloud/18.comark-components.md";

const { playgroundExamples: examples } = await import(
  join(cloudDir, "packages/comark-harness/src/playground-examples.ts")
);
const { comarkComponentReference } = await import(
  join(cloudDir, "packages/editor-schema/src/comark-attributes.ts")
);

const REQUIRED = {
  always: "Required.",
  "without-body": "Required unless the body has the data.",
  "without-query": "Required unless it's a live view.",
};
const cell = (text) => text.replace(/\|/g, "\\|").replace(/\n/g, " ");
const code = (values) => values.map((v) => `\`${v}\``).join(", ");

function attributeTable(name) {
  const reference = comarkComponentReference(name);
  if (!reference) throw new Error(`no attribute reference for ${name}`);
  const entries = Object.entries(reference.attributes);
  const rows = [...entries.filter(([, a]) => !a.legacy), ...entries.filter(([, a]) => a.legacy)].map(
    ([attr, a]) => {
      const accepts = a.values ? code(a.values) : (a.format ?? "Text");
      const def = a.default === undefined ? "" : a.values?.includes(a.default) ? `\`${a.default}\`` : a.default;
      const notes = [a.legacy ? "*Legacy.*" : "", a.description, a.required ? `**${REQUIRED[a.required]}**` : ""]
        .filter(Boolean)
        .join(" ");
      return `| \`${attr}\` | ${cell(accepts)} | ${cell(def)} | ${cell(notes)} |`;
    },
  );
  let out = reference.body ? `**Body:** ${reference.body}\n\n` : "";
  out += `| Attribute | Accepts | Default | Description |\n| --- | --- | --- | --- |\n${rows.join("\n")}\n`;
  return out;
}

const PLAY = "https://app.basicmemory.com/playground";
const groups = [
  ["content", "Content and layout"],
  ["chart", "Charts"],
  ["live", "Live views"],
];

let out = `---
title: Comark Components
description: Every Basic Memory Comark component, with its Markdown source, how it renders, every attribute it accepts, and a link to try it in the playground.
---

Basic Memory Cloud renders these components in Notes, the [Wiki](/cloud/wiki), and [shared notes](/cloud/shared-notes). Each one is written as Markdown: a \`::bm-\` directive with attributes in braces, a body, and a closing \`::\`. Everywhere else, in a local editor, on GitHub, or in a raw \`bm_read\`, the same note reads as plain Markdown, so your AI writes and reads these as text.

Each example below shows its source, how it renders, and every attribute it accepts. **Open in playground** loads it in the [Comark playground](${PLAY}){target="_blank"}, where you can edit the source and switch between the rendered view and the plain text an agent reads. See [Live Notes](/cloud/live-notes) for how components and live views fit into a note.

::tip
Your AI can learn every component and its attributes from the \`memory-comark\` [agent skill](/integrations/skills), or from the \`comark(7)\` manual page (\`bm man comark\`, or \`memory://man/comark(7)\` over MCP).
::
`;

for (const [group, heading] of groups) {
  const items = examples.filter((e) => e.group === group);
  out += `\n---\n\n## ${heading}\n`;
  for (const e of items) {
    const fence = e.markdown.includes("```") ? "````" : "```";
    out += `\n### ${e.group === "live" ? "Live pipelines" : e.label}\n\n\`${e.id}\`: ${e.description}\n\n${fence}markdown\n${e.markdown.trim()}\n${fence}\n\n`;
    if (e.group !== "live") {
      out += `::theme-image{light="/screenshots/comark/comark-${e.id}-light.png" dark="/screenshots/comark/comark-${e.id}-dark.png" alt="The ${e.id} example rendered"}\n::\n\n`;
    }
    out += `[Open in playground ↗](${PLAY}?example=${e.id}){target="_blank"}\n`;
    if (e.group !== "live") out += `\n#### ${e.label} attributes\n\n${attributeTable(e.id)}`;
  }
}
writeFileSync(outFile, out);
console.log(`wrote ${outFile}`);
