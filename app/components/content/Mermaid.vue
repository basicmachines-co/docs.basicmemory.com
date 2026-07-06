<script setup lang="ts">
/**
 * Mermaid - Renders mermaid code blocks as beautiful SVG diagrams
 *
 * Uses beautiful-mermaid for rendering.
 * Click on diagram to enlarge in a modal.
 */

import { ref, watch, onMounted, computed } from 'vue'

const props = defineProps<{
  /** Mermaid diagram source code */
  code: string
}>()

// Get color mode from Nuxt
const colorMode = useColorMode()

// Detect if we're in dark mode
const isDark = computed(() => colorMode.value === 'dark')

// --- State ---
const svgContent = ref<string>('')
const error = ref<string | null>(null)
const loading = ref(true)
const showSource = ref(false)
const isModalOpen = ref(false)

// --- Modal functions ---
function openModal() {
  if (svgContent.value && !error.value) {
    isModalOpen.value = true
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

// Close modal on escape key
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// --- Render function ---
async function renderMermaid() {
  if (!props.code?.trim()) {
    error.value = 'No mermaid code provided'
    loading.value = false
    return
  }

  loading.value = true
  error.value = null

  try {
    // Dynamic import to keep bundle size down when mermaid isn't used
    const { renderMermaid: render } = await import('beautiful-mermaid')

    // Calm palette: ink neutrals, cobalt graph/link accent, annotation labels.
    const svg = await render(props.code.trim(), isDark.value
      ? {
          bg: 'hsl(0 0% 8%)',
          fg: 'hsl(0 0% 96%)',
          accent: 'hsl(212 96% 78%)',
          line: 'hsl(0 0% 28%)',
          muted: 'hsl(0 0% 64%)',
          surface: 'hsl(0 0% 17.5%)',
          border: 'hsl(0 0% 28%)',
          transparent: true,
        }
      : {
          bg: 'hsl(40 25% 95%)',
          fg: 'hsl(0 0% 20%)',
          accent: 'hsl(221 83% 50%)',
          line: 'hsl(40 8% 76%)',
          muted: 'hsl(0 0% 41%)',
          surface: 'hsl(40 18% 91%)',
          border: 'hsl(40 10% 85%)',
          transparent: true,
        })

    svgContent.value = svg
  } catch (e) {
    console.error('Mermaid render error:', e)
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}

// Render on mount and when code or color mode changes
onMounted(() => {
  renderMermaid()
  window.addEventListener('keydown', handleKeydown)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

watch(() => props.code, () => {
  renderMermaid()
})

// Re-render when color mode changes
watch(isDark, () => {
  renderMermaid()
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="mermaid-view my-4 rounded border border-default bg-muted">
    <!-- Toolbar -->
    <div class="flex items-center justify-between border-b border-default bg-elevated px-3 py-1.5">
      <span class="font-mono text-xs font-medium text-secondary">## mermaid</span>
      <div class="flex items-center gap-2">
        <button
          v-if="svgContent && !error && !showSource"
          type="button"
          class="rounded p-1 font-mono text-xs text-muted hover:bg-accented hover:text-default"
          title="Enlarge diagram"
          @click="openModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
        <button
          type="button"
          class="rounded p-1 font-mono text-xs text-muted hover:bg-accented hover:text-default"
          @click="showSource = !showSource"
        >
          {{ showSource ? 'Show Diagram' : 'Show Source' }}
        </button>
      </div>
    </div>

    <!-- Content area -->
    <div class="min-h-[100px] p-4">
      <!-- Loading state -->
      <div v-if="loading" class="flex items-center justify-center py-8">
        <div class="flex flex-col items-center gap-2">
          <div class="size-6 animate-spin rounded-full border-2 border-default border-t-primary" />
          <span class="font-mono text-sm text-muted">Rendering diagram...</span>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="flex items-start gap-3 rounded border border-error/25 bg-error/10 p-4">
        <div class="min-w-0 flex-1">
          <p class="font-medium text-error">Failed to render diagram</p>
          <p class="mt-1 text-sm text-error/80">{{ error }}</p>
          <button
            type="button"
            class="mt-2 text-sm text-error underline hover:no-underline"
            @click="showSource = true"
          >
            View source code
          </button>
        </div>
      </div>

      <!-- Source code view -->
      <div v-else-if="showSource" class="overflow-x-auto">
        <pre class="m-0 border-0 bg-transparent p-0 text-sm"><code class="text-highlighted">{{ code }}</code></pre>
      </div>

      <!-- Rendered SVG (clickable to enlarge) -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div
        v-else-if="svgContent"
        class="mermaid-svg-container flex justify-center overflow-x-auto cursor-pointer group"
        title="Click to enlarge"
        @click="openModal"
        v-html="svgContent"
      />

      <!-- No content yet -->
      <div v-else class="flex items-center justify-center py-8 font-mono text-sm text-muted">
        No diagram to display
      </div>
    </div>
  </div>

  <!-- Modal overlay -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        @click="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <!-- Modal content -->
        <div
          class="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded border border-default bg-default p-4"
          @click.stop
        >
          <!-- Close button -->
          <button
            type="button"
            class="absolute right-3 top-3 z-10 rounded-full bg-muted p-2 text-muted transition-colors hover:bg-accented hover:text-default"
            title="Close (Esc)"
            @click="closeModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Enlarged diagram -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="mermaid-modal-content min-w-[300px]"
            v-html="svgContent"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
/* Ensure SVG scales properly */
.mermaid-svg-container svg {
  max-width: 100%;
  height: auto;
}

/* Hover effect on clickable diagram */
.mermaid-svg-container:hover {
  opacity: 0.9;
}

/* Modal SVG can be larger */
.mermaid-modal-content svg {
  max-width: none;
  width: auto;
  height: auto;
  max-height: 80vh;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
