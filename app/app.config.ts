export default defineAppConfig({
  docus: {
    locale: 'en',
  },
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'stone',
    },
    commandPalette: {
      slots: {
        item: 'items-center',
        input: '[&_.iconify]:size-4 [&_.iconify]:mx-0.5',
        itemLeadingIcon: 'size-4 mx-0.5',
      },
    },
    contentNavigation: {
      slots: {
        linkLeadingIcon: 'size-4 mr-1',
        linkTrailing: 'hidden',
      },
      defaultVariants: {
        variant: 'link',
      },
    },
    pageLinks: {
      slots: {
        linkLeadingIcon: 'size-4',
        linkLabelExternalIcon: 'size-2.5',
      },
    },
  },
  header: {
    title: 'Basic Memory',
    logo: {
      light: '/logo-light.png',
      dark: '/logo-dark.png',
      alt: 'Basic Memory',
    },
  },
  seo: {
    title: 'Basic Memory Docs',
    description: 'Documentation for Basic Memory Cloud and local workflows.',
  },
  socials: {
    github: 'https://github.com/basicmachines-co/basic-memory',
    discord: 'https://discord.gg/tyvKNccgqN',
    reddit: 'https://www.reddit.com/r/basicmemory',
  },
  toc: {
    bottom: {
      title: 'Community',
      links: [
        { label: 'GitHub', to: 'https://github.com/basicmachines-co/basic-memory' },
        { label: 'Discord', to: 'https://discord.gg/tyvKNccgqN' },
        { label: 'Reddit', to: 'https://www.reddit.com/r/basicmemory' },
      ],
    },
  },
  github: {
    url: 'https://github.com/basicmachines-co/docs.basicmemory.com',
    branch: 'main',
    dir: '',
  },
})
