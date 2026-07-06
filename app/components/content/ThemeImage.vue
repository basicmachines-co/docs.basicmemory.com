<template>
  <span class="block">
    <img :src="light" :alt="alt" class="block rounded border border-default dark:hidden" />
    <img :src="dark" :alt="alt" class="hidden rounded border border-default dark:block" />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  light: string
  dark: string
  alt?: string
}>()
</script>
