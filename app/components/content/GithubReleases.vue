<script setup lang="ts">
/**
 * GitHubReleases - Fetches and displays GitHub releases with categorized changelogs
 *
 * Fetches releases from the server API (which caches GitHub data), parses
 * release bodies to extract categories, and renders them with proper formatting.
 */

import { ref, onMounted, computed } from 'vue'

const props = withDefaults(defineProps<{
  /** GitHub repository (e.g., "owner/repo") */
  repo?: string
  /** Maximum number of releases to display */
  limit?: number
}>(), {
  repo: 'basicmachines-co/basic-memory',
  limit: 30
})

// --- Types ---
interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  body: string
  published_at: string
  html_url: string
  prerelease: boolean
  draft: boolean
}

interface CategoryData {
  emoji: string
  items: string[]
}

// --- State ---
const releases = ref<GitHubRelease[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// --- Constants ---
const categoryOrder = [
  'Breaking Changes',
  'Features',
  'Bug Fixes',
  'Performance',
  'Documentation',
  'Refactoring',
  'Chores',
  'Tests',
  'Changes',
  'New Contributors'
]

// --- Helpers ---
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getCategory(line: string): { category: string; emoji: string; text: string } {
  const lower = line.toLowerCase()

  if (lower.startsWith('feat:') || lower.startsWith('feat(')) {
    return { category: 'Features', emoji: '🚀', text: line.replace(/^feat(\([^)]+\))?:\s*/i, '') }
  }
  if (lower.startsWith('fix:') || lower.startsWith('fix(')) {
    return { category: 'Bug Fixes', emoji: '🐛', text: line.replace(/^fix(\([^)]+\))?:\s*/i, '') }
  }
  if (lower.startsWith('docs:') || lower.startsWith('docs(')) {
    return { category: 'Documentation', emoji: '📚', text: line.replace(/^docs(\([^)]+\))?:\s*/i, '') }
  }
  if (lower.startsWith('chore:') || lower.startsWith('chore(')) {
    return { category: 'Chores', emoji: '🔧', text: line.replace(/^chore(\([^)]+\))?:\s*/i, '') }
  }
  if (lower.startsWith('refactor:') || lower.startsWith('refactor(')) {
    return { category: 'Refactoring', emoji: '♻️', text: line.replace(/^refactor(\([^)]+\))?:\s*/i, '') }
  }
  if (lower.startsWith('perf:') || lower.startsWith('perf(')) {
    return { category: 'Performance', emoji: '⚡', text: line.replace(/^perf(\([^)]+\))?:\s*/i, '') }
  }
  if (lower.startsWith('test:') || lower.startsWith('test(')) {
    return { category: 'Tests', emoji: '🧪', text: line.replace(/^test(\([^)]+\))?:\s*/i, '') }
  }
  if (lower.startsWith('breaking:') || lower.includes('breaking change')) {
    return { category: 'Breaking Changes', emoji: '🚨', text: line.replace(/^breaking(\([^)]+\))?:\s*/i, '') }
  }

  return { category: 'Changes', emoji: '📦', text: line }
}

function parseReleaseBody(body: string): Map<string, CategoryData> {
  if (!body) return new Map()

  const categories = new Map<string, CategoryData>()
  const lines = body.split('\n')

  let currentSection = ''
  let currentEmoji = '📦'

  for (const line of lines) {
    const trimmed = line.trim()

    // Check for markdown headers (## Features, ### Bug Fixes, etc.)
    const headerMatch = trimmed.match(/^#{2,3}\s+(.+)/)
    if (headerMatch) {
      const header = headerMatch[1].toLowerCase()
      if (header.includes('feature') || header.includes('highlight')) {
        currentSection = 'Features'
        currentEmoji = '🚀'
      } else if (header.includes('bug') || header.includes('fix')) {
        currentSection = 'Bug Fixes'
        currentEmoji = '🐛'
      } else if (header.includes('breaking')) {
        currentSection = 'Breaking Changes'
        currentEmoji = '🚨'
      } else if (header.includes('document')) {
        currentSection = 'Documentation'
        currentEmoji = '📚'
      } else if (header.includes('performance')) {
        currentSection = 'Performance'
        currentEmoji = '⚡'
      } else if (header.includes('chore') || header.includes('internal')) {
        currentSection = 'Chores'
        currentEmoji = '🔧'
      } else if (header.includes('refactor')) {
        currentSection = 'Refactoring'
        currentEmoji = '♻️'
      } else if (header.includes('contributor')) {
        currentSection = 'New Contributors'
        currentEmoji = '👋'
      } else if (header.includes('change')) {
        currentSection = 'Changes'
        currentEmoji = '📦'
      } else {
        currentSection = headerMatch[1]
        currentEmoji = '📦'
      }
      continue
    }

    // Check for list items
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const itemText = trimmed.substring(2)

      // If no current section, try to categorize by conventional commit prefix
      if (!currentSection) {
        const { category, emoji, text } = getCategory(itemText)
        if (!categories.has(category)) {
          categories.set(category, { emoji, items: [] })
        }
        categories.get(category)!.items.push(text)
      } else {
        if (!categories.has(currentSection)) {
          categories.set(currentSection, { emoji: currentEmoji, items: [] })
        }
        categories.get(currentSection)!.items.push(itemText)
      }
    }
  }

  return categories
}

function formatItem(text: string): string {
  let result = text

  // Convert full GitHub PR URLs to short format: #123
  result = result.replace(
    /https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/g,
    `<a href="https://github.com/${props.repo}/pull/$1" class="font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 no-underline hover:underline">#$1</a>`
  )

  // Convert full GitHub issue URLs to short format
  result = result.replace(
    /https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/(\d+)/g,
    `<a href="https://github.com/${props.repo}/issues/$1" class="font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 no-underline hover:underline">#$1</a>`
  )

  // Link remaining #123 references (avoid already linked ones)
  result = result.replace(
    /(?<!<a[^>]*>)#(\d+)(?![^<]*<\/a>)/g,
    `<a href="https://github.com/${props.repo}/pull/$1" class="font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 no-underline hover:underline">#$1</a>`
  )

  // Link @mentions
  result = result.replace(
    /@([a-zA-Z0-9_-]+)/g,
    '<a href="https://github.com/$1" class="font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 no-underline hover:underline">@$1</a>'
  )

  // Style inline code (backticks)
  result = result.replace(
    /`([^`]+)`/g,
    '<code class="rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:text-gray-200">$1</code>'
  )

  // Bold the first part before "by @" if present (the description)
  const byMatch = result.match(/^(.+?)(\s+by\s+<a)/)
  if (byMatch) {
    result = `<span class="text-gray-900 dark:text-gray-100">${byMatch[1]}</span>${result.substring(byMatch[1].length)}`
  }

  // Remove "in https://github.com/..." trailing text
  result = result.replace(/\s+in\s+https:\/\/github\.com\/[^\s]+/g, '')

  return result
}

function sortCategories(categories: Map<string, CategoryData>): Array<[string, CategoryData]> {
  const entries = Array.from(categories.entries())
  return entries.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a[0])
    const bIndex = categoryOrder.indexOf(b[0])
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })
}

// --- Computed ---
const displayReleases = computed(() => {
  const filtered = releases.value.filter(r => !r.draft)
  return filtered.slice(0, props.limit)
})

// --- Fetch releases ---
async function fetchReleases() {
  loading.value = true
  error.value = null

  try {
    const data = await $fetch<GitHubRelease[]>('/api/releases')
    releases.value = data
  } catch (e) {
    console.error('Failed to fetch releases:', e)
    error.value = e instanceof Error ? e.message : 'Failed to fetch releases'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReleases()
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="github-releases">
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="flex flex-col items-center gap-3">
        <div class="size-8 animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-primary-500" />
        <span class="text-sm text-gray-500 dark:text-gray-400">Loading releases...</span>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 text-center">
      <p class="font-medium text-red-600 dark:text-red-400">Failed to load releases</p>
      <p class="mt-1 text-sm text-red-500 dark:text-red-400/80">{{ error }}</p>
      <a
        :href="`https://github.com/${repo}/releases`"
        class="mt-3 inline-block text-sm text-red-600 dark:text-red-400 underline hover:no-underline"
      >
        View releases on GitHub
      </a>
    </div>

    <!-- Releases -->
    <div v-else class="space-y-16">
      <section
        v-for="release in displayReleases"
        :key="release.id"
        class="relative"
      >
        <!-- Version header -->
        <div class="flex items-baseline gap-4 mb-6">
          <a
            :href="release.html_url"
            class="text-3xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors no-underline"
          >
            {{ release.tag_name }}
          </a>
          <time class="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {{ formatDate(release.published_at) }}
          </time>
          <span
            v-if="release.prerelease"
            class="px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/20"
          >
            Pre-release
          </span>
        </div>

        <!-- Categories -->
        <div v-if="parseReleaseBody(release.body).size > 0" class="space-y-6">
          <div
            v-for="[category, data] in sortCategories(parseReleaseBody(release.body))"
            :key="category"
          >
            <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              <span>{{ data.emoji }}</span>
              <span>{{ category }}</span>
            </h3>
            <ul class="space-y-2 ml-1">
              <li
                v-for="(item, idx) in data.items"
                :key="idx"
                class="flex gap-3 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400"
              >
                <span class="text-gray-400 dark:text-gray-600 select-none">•</span>
                <span v-html="formatItem(item)" />
              </li>
            </ul>
          </div>
        </div>

        <p v-else class="text-gray-500 dark:text-gray-400 italic">
          No release notes available.
        </p>

        <!-- Divider -->
        <div class="mt-12 border-b border-gray-200 dark:border-gray-800" />
      </section>

      <!-- Footer link -->
      <div class="pt-8 text-center">
        <a
          :href="`https://github.com/${repo}/releases`"
          class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors no-underline"
        >
          View all releases on GitHub
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure inline code doesn't break weirdly */
:deep(code) {
  white-space: nowrap;
}
</style>
