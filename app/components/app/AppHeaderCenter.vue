<script setup lang="ts">
const route = useRoute()
const { headerLinks } = useDocsNavigation()
const showDocsSwitch = computed(() => route.path !== '/')
</script>

<template>
  <div class="flex w-full items-center justify-end lg:justify-center">
    <div
      v-if="showDocsSwitch"
      class="bm-docs-switch hidden lg:flex"
    >
      <span class="bm-docs-switch-label">Docs for</span>

      <nav class="bm-docs-switch-options" aria-label="Choose documentation">
        <NuxtLink
          v-for="link in headerLinks"
          :key="link.to"
          :to="link.to"
          class="bm-docs-switch-link"
          :class="{ 'is-active': link.active }"
          :aria-current="link.active ? 'page' : undefined"
        >
          <UIcon :name="link.icon" />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <UContentSearchButton
      class="lg:hidden"
      collapsed
      variant="ghost"
    />
  </div>
</template>
