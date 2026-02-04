/**
 * Content negotiation middleware for AI agents
 *
 * When a request includes `Accept: text/markdown`, fetch and return the raw markdown directly.
 * This allows AI agents to get clean markdown by simply adding a header - no redirects needed.
 *
 * Example:
 *   curl -H "Accept: text/markdown" https://docs.basicmemory.com/start-here/what-is-basic-memory
 *   -> Returns raw markdown content directly
 */
export default defineEventHandler(async (event) => {
  const acceptHeader = getHeader(event, 'accept') || ''
  const path = event.path

  // Check if client prefers markdown
  const prefersMarkdown = acceptHeader.includes('text/markdown')

  // Skip if not requesting markdown, or already on a raw/special path
  if (!prefersMarkdown) return
  if (path.startsWith('/raw/')) return
  if (path.startsWith('/api/')) return
  if (path.startsWith('/_')) return
  if (path === '/llms.txt') return
  if (path === '/llms-full.txt') return
  if (path.includes('.')) return // Skip files with extensions

  // Fetch the raw markdown internally and return it directly
  const rawPath = `/raw${path}.md`

  try {
    // Use internal fetch to get the raw markdown
    const markdown = await $fetch<string>(rawPath, {
      baseURL: getRequestURL(event).origin,
    })

    // Set content type and return markdown directly
    setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
    return markdown
  } catch {
    // If raw markdown doesn't exist, let the request continue normally
    return
  }
})
