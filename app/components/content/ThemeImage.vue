<template>
  <span class="block">
    <img :src="light" :alt="alt" class="block dark:hidden rounded-md" />
    <img :src="dark" :alt="alt" class="hidden dark:block rounded-md" />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  light: string
  dark: string
  alt?: string
}>()
</script>
