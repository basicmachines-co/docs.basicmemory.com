<template>
  <span class="block">
    <video
      ref="videoElement"
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
const props = defineProps<{
  src: string
  poster?: string
  posterDark?: string
  alt?: string
}>()

const videoElement = ref<HTMLVideoElement>()
let colorModeObserver: MutationObserver | undefined

onMounted(() => {
  const root = document.documentElement
  const syncPoster = () => {
    if (!props.poster || !videoElement.value) {
      return
    }

    const poster = root.classList.contains('dark')
      ? props.posterDark ?? props.poster.replace(/(\.[^./]+)$/, '-dark$1')
      : props.poster

    if (videoElement.value.getAttribute('poster') !== poster) {
      videoElement.value.setAttribute('poster', poster)
    }
  }

  colorModeObserver = new MutationObserver(syncPoster)
  colorModeObserver.observe(root, {
    attributes: true,
    attributeFilter: ['class'],
  })
  syncPoster()
})

onBeforeUnmount(() => {
  colorModeObserver?.disconnect()
})
</script>
