import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative, resolve, sep } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const contentRoot = join(root, 'content')
const publicRoot = join(root, 'public')
const errors = []
const warnings = []
const retryableCodes = new Set(['ETIMEDOUT', 'EAGAIN', 'EBUSY'])

function retry(operation) {
  let lastError
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return operation()
    } catch (error) {
      lastError = error
      if (!retryableCodes.has(error.code) || attempt === 3) throw error
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 150 * (attempt + 1))
    }
  }
  throw lastError
}

const readText = path => retry(() => readFileSync(path, 'utf8'))
const listDirectory = path => retry(() => readdirSync(path))
const getStat = path => retry(() => statSync(path))

function walk(directory, extensions) {
  const files = []
  for (const name of listDirectory(directory)) {
    const path = join(directory, name)
    const stat = getStat(path)
    if (stat.isDirectory()) files.push(...walk(path, extensions))
    else if (!extensions || extensions.has(extname(path))) files.push(path)
  }
  return files
}

function slug(value) {
  return value
    .replace(/^\d+\./, '')
    .replace(/\.md$/, '')
}

function routeFor(file) {
  const parts = relative(contentRoot, file).split(sep).map(slug)
  if (parts.at(-1) === 'index') parts.pop()
  return `/${parts.join('/')}`.replace(/\/$/, '') || '/'
}

const markdownFiles = walk(contentRoot, new Set(['.md']))
const routes = new Set(markdownFiles.map(routeFor))
routes.add('/')
routes.add('/changelog')

const nuxtConfig = readText(join(root, 'nuxt.config.ts'))
for (const match of nuxtConfig.matchAll(/['"]([^'"]+)['"]\s*:\s*\{\s*redirect:/g)) {
  routes.add(match[1])
}

const referencedScreenshots = new Set()
const linkPattern = /\[[^\]\n]*]\(([^)\s]+)\)|\bto:\s*([^\s]+)|(?:light|dark)="([^"]+)"/g

for (const file of markdownFiles) {
  const source = readText(file)
  const display = relative(root, file)

  if (!display.includes(`${sep}2.whats-new${sep}`)
    && !display.endsWith(`${sep}changelog.md`)
    && !display.endsWith(`${sep}9.v0.19-migration.md`)) {
    const versions = [...source.matchAll(/(?<![-\w])v\d+\.\d+(?:\.\d+)?\b/g)]
    for (const match of versions) {
      errors.push(`${display}: current documentation contains release literal ${match[0]}`)
    }
  }

  for (const match of source.matchAll(linkPattern)) {
    let target = match[1] || match[2] || match[3]
    if (!target || target.startsWith('#') || /^[a-z]+:/i.test(target)) continue
    target = target.replace(/^<|>$/g, '').split('#')[0].split('?')[0]
    if (!target.startsWith('/')) continue

    if (target.startsWith('/screenshots/')) referencedScreenshots.add(target)

    if (target.startsWith('/raw/')
      || target === '/llms.txt'
      || target === '/llms-full.txt') continue

    if (routes.has(target.replace(/\/$/, '') || '/')) continue

    if (extname(target)) {
      if (!existsSync(join(publicRoot, target))) {
        errors.push(`${display}: missing public asset ${target}`)
      }
      continue
    }

    errors.push(`${display}: broken internal route ${target}`)
  }
}

const screenshotRoot = join(publicRoot, 'screenshots')
if (existsSync(screenshotRoot)) {
  for (const file of walk(screenshotRoot)) {
    const publicPath = `/${relative(publicRoot, file).split(sep).join('/')}`
    if (!referencedScreenshots.has(publicPath)) {
      warnings.push(`unreferenced screenshot: ${publicPath}`)
    }
  }
}

const manifestPath = join(root, 'docs', 'screenshots.json')
if (!existsSync(manifestPath)) {
  errors.push('docs/screenshots.json is missing')
} else {
  const manifest = JSON.parse(readText(manifestPath))
  for (const item of manifest.screenshots || []) {
    if (!existsSync(join(publicRoot, item.path))) {
      errors.push(`screenshot manifest references missing file: ${item.path}`)
    }
    if (!item.captured || !item.page || !item.source) {
      errors.push(`incomplete screenshot manifest entry: ${item.path}`)
    }
  }
}

for (const warning of warnings) console.warn(`WARN ${warning}`)
for (const error of errors) console.error(`ERROR ${error}`)

if (errors.length) {
  console.error(`\nDocs checks failed with ${errors.length} error(s).`)
  process.exit(1)
}

console.log(`Docs checks passed. ${warnings.length} warning(s).`)
