<template>
  <img :src="src" :alt="alt" class="w-full max-w-lg" />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()
</script>
