<script setup lang="ts">
const { headerLinks, sidebarNavigation } = useDocsNavigation()
</script>

<template>
  <div class="space-y-5">
    <nav class="grid grid-cols-2 gap-2" aria-label="Documentation sections">
      <UButton
        v-for="link in headerLinks"
        :key="link.to"
        :to="link.to"
        :label="link.label"
        :icon="link.icon"
        :variant="link.active ? 'soft' : 'ghost'"
        :color="link.active ? 'primary' : 'neutral'"
        class="justify-start"
      />
    </nav>

    <USeparator />

    <UContentNavigation
      :navigation="sidebarNavigation"
      highlight
      variant="link"
    />
  </div>
</template>
