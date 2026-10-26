// Bun preload for generate-components-page.mjs: load Vite-style `./file.md?raw` imports as text.
import { plugin } from 'bun'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

plugin({
  name: 'raw',
  setup(build) {
    build.onResolve({ filter: /\?raw$/ }, args => ({
      path: resolve(dirname(args.importer), args.path.replace(/\?raw$/, '')),
      namespace: 'raw'
    }))
    build.onLoad({ filter: /.*/, namespace: 'raw' }, args => ({
      contents: `export default ${JSON.stringify(readFileSync(args.path, 'utf8'))}`,
      loader: 'js'
    }))
  }
})
