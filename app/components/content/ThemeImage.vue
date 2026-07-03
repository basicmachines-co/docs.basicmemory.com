<template>
  <span class="block">
    <img :src="light" :alt="alt" class="block dark:hidden rounded-md border border-neutral-200 dark:border-neutral-800" />
    <img :src="dark" :alt="alt" class="hidden dark:block rounded-md border border-neutral-200 dark:border-neutral-800" />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  light: string
  dark: string
  alt?: string
}>()
</script>
