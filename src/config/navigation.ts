export interface NavItem {
  title: string
  href: string
  external?: boolean
  icon?: string
}

export interface SidebarSection {
  title: string
  items: NavItem[]
}

export const navConfig = {
  topNav: [
    { title: 'GitHub', href: 'https://github.com/basicmachines-co/basic-memory', external: true },
  ],
  sidebarTopLinks: [
    { title: 'Basic Memory', href: 'https://basicmemory.com', external: true, icon: 'website' },
    { title: 'GitHub', href: 'https://github.com/basicmachines-co/basic-memory', external: true, icon: 'github' },
    { title: 'Discord', href: 'https://discord.gg/tyvKNccgqN', external: true, icon: 'discord' },
    { title: 'Reddit', href: 'https://www.reddit.com/r/basicmemory', external: true, icon: 'reddit' },
    { title: 'PyPI', href: 'https://pypi.org/project/basic-memory/', external: true, icon: 'pypi' },
  ],
  sidebar: [
    {
      title: 'Get Started',
      items: [
        { title: 'About Basic Memory', href: '/' },
        { title: 'Getting Started', href: '/getting-started' },
        { title: 'User Guide', href: '/user-guide' },
      ],
    },
    {
      title: "What's New",
      items: [
        { title: "What's New", href: '/whats-new' },
        { title: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Guides',
      items: [
        { title: 'Basic Memory Cloud', href: '/guides/cloud' },
        { title: 'Cloud Sync', href: '/guides/cloud-sync' },
        { title: 'Knowledge Format', href: '/guides/knowledge-format' },
        { title: 'MCP Tools Reference', href: '/guides/mcp-tools-reference' },
        { title: 'Canvas', href: '/guides/canvas' },
        { title: 'CLI Reference', href: '/guides/cli-reference' },
        { title: 'AI Assistant Guide', href: '/guides/ai-assistant-guide' },
        { title: 'Docker', href: '/guides/docker' },
      ],
    },
    {
      title: 'Integrations',
      items: [
        { title: 'Claude Desktop', href: '/integrations/claude-desktop' },
        { title: 'Claude Code', href: '/integrations/claude-code' },
        { title: 'OpenAI Codex', href: '/integrations/codex' },
        { title: 'ChatGPT', href: '/integrations/chatgpt' },
        { title: 'Google Gemini', href: '/integrations/gemini' },
        { title: 'Cursor', href: '/integrations/cursor' },
        { title: 'VS Code', href: '/integrations/vscode' },
        { title: 'Obsidian', href: '/integrations/obsidian' },
      ],
    },
    {
      title: 'How you can use Basic Memory',
      items: [
        { title: 'Project Documentation', href: '/how-to/project-documentation' },
        { title: 'Writing & Organization', href: '/how-to/writing-organization' },
        { title: 'Research & Learning', href: '/how-to/research-learning' },
        { title: 'Note Taking', href: '/how-to/note-taking' },
        { title: 'Personal Knowledge', href: '/how-to/personal-knowledge' },
      ],
    },
    {
      title: 'Technical',
      items: [
        { title: 'Technical Information', href: '/technical/technical-information' },
      ],
    },
  ] as SidebarSection[],
}
