<script setup lang="ts">
const { sidebarNavigation } = useDocsNavigation()
</script>

<template>
  <UContentNavigation
    highlight
    variant="link"
    :navigation="sidebarNavigation"
    default-open
  />
</template>
