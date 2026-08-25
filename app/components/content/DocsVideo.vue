<template>
  <span class="block">
    <video
      :src="src"
      :poster="poster"
      :aria-label="alt"
      class="block w-full rounded border border-default"
      controls
      playsinline
      preload="metadata"
    />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  poster?: string
  alt?: string
}>()
</script>
