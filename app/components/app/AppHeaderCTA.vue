<template>
  <div class="hidden items-center gap-1 sm:flex">
    <UContentSearchButton
      collapsed
      variant="ghost"
    />

    <UButton
      to="/changelog"
      label="Changelog"
      color="neutral"
      variant="ghost"
    />

    <UButton
      to="https://app.basicmemory.com"
      target="_blank"
      label="Open Basic Memory"
      trailing-icon="i-lucide-arrow-up-right"
      color="primary"
      variant="soft"
      class="hidden xl:flex"
    />
  </div>
</template>
