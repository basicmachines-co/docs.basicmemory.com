export default defineAppConfig({
  docus: {
    locale: 'en',
  },
  ui: {
    colors: {
      primary: 'cobalt',
      secondary: 'annotation',
      neutral: 'ink',
    },
    pageHeader: {
      slots: {
        root: 'relative border-b border-default py-10',
        headline: 'mb-3 flex items-center gap-1.5 font-mono text-[13px] font-normal text-secondary',
        title: 'font-[var(--docs-font-serif)] text-[2.15rem] md:text-[3.25rem] leading-[1.06] font-medium text-pretty text-highlighted',
        description: 'font-[var(--docs-font-serif)] text-[1.15rem] md:text-[1.6875rem] leading-[1.4] italic text-pretty text-toned',
      },
    },
    header: {
      slots: {
        root: 'border-b border-default bg-default/90 backdrop-blur',
        title: 'shrink-0 font-mono text-[15px] font-semibold text-highlighted flex items-end gap-1.5',
        link: 'font-mono',
      },
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
        trigger: 'font-mono font-semibold',
        link: 'font-mono text-[13px]',
      },
      defaultVariants: {
        variant: 'link',
        highlightColor: 'secondary',
      },
    },
    contentToc: {
      slots: {
        trigger: 'group flex flex-1 items-center gap-1.5 py-1.5 -mt-1.5 font-mono text-[13px] font-semibold focus-visible:outline-primary',
        link: 'group relative flex items-center py-1 font-mono text-[12.5px] focus-visible:outline-primary',
      },
      defaultVariants: {
        highlightColor: 'secondary',
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
    x: 'https://x.com/basic_memory',
    discord: 'https://discord.gg/tyvKNccgqN',
    reddit: 'https://www.reddit.com/r/basicmemory',
    linkedin: 'https://www.linkedin.com/company/basicmemory/',
  },
  toc: {
    bottom: {
      title: 'Contact Us',
      links: [
        { label: 'Contact Support', to: '/reference/contact-support' },
        { label: 'Discord', to: 'https://discord.gg/tyvKNccgqN' },
        { label: 'GitHub', to: 'https://github.com/basicmachines-co/basic-memory' },
        { label: 'X / Twitter', to: 'https://x.com/basic_memory' },
        { label: 'LinkedIn', to: 'https://www.linkedin.com/company/basicmemory/' },
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
