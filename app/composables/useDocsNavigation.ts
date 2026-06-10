import type { ContentNavigationItem } from '@nuxt/content'

type DocsArea = 'cloud' | 'open-source' | 'utility'

function copySection(
  section: ContentNavigationItem | undefined,
  title?: string,
  children?: ContentNavigationItem[],
): ContentNavigationItem | undefined {
  if (!section) return

  return {
    ...section,
    title: title || section.title,
    children: children || section.children,
  }
}

function selectChildren(
  section: ContentNavigationItem | undefined,
  paths: string[],
  deployment?: 'local',
) {
  const children = section?.children || []

  return paths
    .map(path => children.find(item => item.path === path))
    .filter((item): item is ContentNavigationItem => Boolean(item))
    .map(item => deployment
      ? { ...item, to: `${item.path}?deployment=local` }
      : item)
}

export function useDocsNavigation() {
  const route = useRoute()
  const navigation = inject<Ref<ContentNavigationItem[] | null>>('navigation')

  const area = computed<DocsArea>(() => {
    if (route.path === '/changelog' || route.path.startsWith('/whats-new')) {
      return 'utility'
    }
    if (route.query.deployment === 'local') {
      return 'open-source'
    }
    if (route.path.startsWith('/local') || route.path === '/start-here/quickstart-local') {
      return 'open-source'
    }
    if (route.path.startsWith('/integrations')) {
      return 'cloud'
    }
    if (route.path.startsWith('/reference')) {
      return [
        '/reference/cli-reference',
        '/reference/configuration',
        '/reference/docker',
        '/reference/v0-19-migration',
      ].includes(route.path)
        ? 'open-source'
        : 'cloud'
    }
    return 'cloud'
  })

  const headerLinks = computed(() => [
    {
      label: 'Cloud',
      icon: 'i-lucide-cloud',
      to: '/start-here/quickstart-cloud',
      active: area.value === 'cloud',
    },
    {
      label: 'Open Source',
      icon: 'i-lucide-terminal',
      to: '/local/local-install',
      active: area.value === 'open-source',
    },
  ])

  const sidebarNavigation = computed<ContentNavigationItem[]>(() => {
    const items = navigation?.value || []
    const section = (path: string) => items.find(item => item.path === path)
    const startHere = section('/start-here')
    const startChildren = startHere?.children || []
    const integrations = section('/integrations')
    const reference = section('/reference')
    const concepts = section('/concepts')
    const structuredKnowledge = copySection(
      concepts,
      'Structure & schemas',
      selectChildren(concepts, [
        '/concepts/knowledge-format',
        '/concepts/observations-and-relations',
        '/concepts/schema-system',
        '/concepts/metadata-search',
      ]),
    )
    const remainingConcepts = copySection(
      concepts,
      'Concepts',
      (concepts?.children || []).filter(item => ![
        '/concepts/knowledge-format',
        '/concepts/observations-and-relations',
        '/concepts/schema-system',
        '/concepts/metadata-search',
      ].includes(item.path)),
    )

    if (area.value === 'open-source') {
      return [
        copySection(
          startHere,
          'Get Started',
          startChildren.filter(item => [
            '/start-here/what-is-basic-memory',
            '/start-here/quickstart-local',
          ].includes(item.path)),
        ),
        copySection(section('/local'), 'Open Source'),
        copySection(
          integrations,
          'AI tools & extensions',
          selectChildren(integrations, [
            '/integrations',
            '/integrations/claude-desktop',
            '/integrations/claude-code',
            '/integrations/gemini',
            '/integrations/codex',
            '/integrations/cursor',
            '/integrations/vscode',
            '/integrations/obsidian',
            '/integrations/skills',
            '/integrations/openclaw',
            '/integrations/hermes',
          ], 'local'),
        ),
        structuredKnowledge,
        remainingConcepts,
        copySection(
          reference,
          'Reference',
          selectChildren(reference, [
            '/reference/cli-reference',
            '/reference/mcp-tools-reference',
            '/reference/ai-assistant-guide',
            '/reference/technical-information',
            '/reference/troubleshooting',
            '/reference/contact-support',
            '/reference/configuration',
            '/reference/docker',
            '/reference/llms-txt',
            '/reference/v0-19-migration',
          ], 'local'),
        ),
      ].filter(Boolean) as ContentNavigationItem[]
    }

    if (area.value === 'utility') {
      return [
        copySection(section('/whats-new')),
      ].filter(Boolean) as ContentNavigationItem[]
    }

    return [
      copySection(
        startHere,
        'Get Started',
        startChildren.filter(item => item.path !== '/start-here/quickstart-local'),
      ),
      copySection(section('/cloud'), 'Basic Memory Cloud'),
      copySection(section('/teams'), 'Collaboration'),
      copySection(
        integrations,
        'AI tools & extensions',
        selectChildren(integrations, [
          '/integrations',
          '/integrations/claude-desktop',
          '/integrations/claude-code',
          '/integrations/chatgpt',
          '/integrations/gemini',
          '/integrations/codex',
          '/integrations/cursor',
          '/integrations/vscode',
          '/integrations/obsidian',
          '/integrations/skills',
          '/integrations/openclaw',
          '/integrations/hermes',
        ]),
      ),
      structuredKnowledge,
      copySection(section('/how-to'), 'Guides'),
      remainingConcepts,
      copySection(
        reference,
          'Reference',
          selectChildren(reference, [
            '/reference/llms-txt',
            '/reference/mcp-tools-reference',
            '/reference/ai-assistant-guide',
            '/reference/technical-information',
            '/reference/troubleshooting',
            '/reference/contact-support',
          ]),
        ),
    ].filter(Boolean) as ContentNavigationItem[]
  })

  return {
    area,
    headerLinks,
    sidebarNavigation,
  }
}
