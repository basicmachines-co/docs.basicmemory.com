<template>
  <span class="block">
    <video
      :src="src"
      :aria-label="alt"
      class="block w-full rounded border border-default"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
    />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()
</script>
