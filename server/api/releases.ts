import { defineCachedEventHandler } from 'nitropack/runtime'

export default defineCachedEventHandler(async () => {
  const repo = 'basicmachines-co/basic-memory'
  const response = await fetch(
    `https://api.github.com/repos/${repo}/releases?per_page=50`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'basic-memory-docs',
      }
    }
  )

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `GitHub API error: ${response.statusText}`
    })
  }

  return response.json()
}, {
  maxAge: 60 * 60, // Cache for 1 hour
  name: 'github-releases',
  getKey: () => 'releases'
})
