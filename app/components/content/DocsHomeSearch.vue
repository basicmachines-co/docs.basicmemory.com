<template>
  <UContentSearchButton
    label="Search the documentation"
    icon="i-lucide-search"
    :collapsed="false"
    size="xl"
    block
    variant="outline"
    class="bm-docs-search"
    :ui="{
      base: 'justify-start',
      label: 'flex-1 text-left',
      trailing: 'ml-auto',
    }"
  />
</template>
