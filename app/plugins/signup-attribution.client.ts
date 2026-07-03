/**
 * Signup attribution capture — port of basicmemory.com's
 * src/lib/signup-attribution.ts. Writes the shared
 * `bmc_signup_attribution_v1` cookie on `.basicmemory.com` so signups at
 * app.basicmemory.com can be attributed to a docs first touch. Keep the
 * cookie name, shape, and semantics in sync with the marketing site.
 */

const COOKIE_NAME = 'bmc_signup_attribution_v1'
const COOKIE_DAYS = 90
const SELF_DOMAINS = ['basicmemory.com', 'app.basicmemory.com', 'localhost']
const PASSIVE_CHANNELS = [
  'unknown',
  'reddit',
  'google',
  'facebook',
  'microsoft',
  'x_twitter',
  'youtube',
  'referral',
] as const

type PassiveChannel = (typeof PASSIVE_CHANNELS)[number]

interface PassiveAttribution {
  event_id: string
  captured_at: string
  landing_url: string
  landing_path: string
  referrer: string | null
  referrer_host: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  gclid: string | null
  fbclid: string | null
  msclkid: string | null
  rdt_cid: string | null
  rdt_click_id: string | null
  passive_channel: PassiveChannel
}

interface SignupAttributionState {
  first_touch: PassiveAttribution
  latest_touch: PassiveAttribution
}

function safeUrl(raw: string): URL | null {
  try {
    return new URL(raw)
  } catch {
    return null
  }
}

function normalizeValue(value: string | null | undefined): string | null {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 ? normalized : null
}

function cookieValue(name: string): string | null {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`))
  if (!match || !match[1]) return null

  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}

function isPassiveChannel(value: unknown): value is PassiveChannel {
  return typeof value === 'string' && PASSIVE_CHANNELS.includes(value as PassiveChannel)
}

function isTouch(value: unknown): value is PassiveAttribution {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<PassiveAttribution>
  return typeof candidate.event_id === 'string'
    && typeof candidate.captured_at === 'string'
    && typeof candidate.landing_url === 'string'
    && typeof candidate.landing_path === 'string'
    && isPassiveChannel(candidate.passive_channel)
}

function isAttributionState(value: unknown): value is SignupAttributionState {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<SignupAttributionState>
  return isTouch(candidate.first_touch) && isTouch(candidate.latest_touch)
}

function readAttributionCookie(): SignupAttributionState | null {
  const rawValue = cookieValue(COOKIE_NAME)
  if (!rawValue) return null

  try {
    const parsed = JSON.parse(rawValue)
    return isAttributionState(parsed) ? parsed : null
  } catch {
    return null
  }
}

function isSelfDomain(hostname: string): boolean {
  return SELF_DOMAINS.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))
}

function referrerHost(): string | null {
  const referrer = normalizeValue(document.referrer)
  if (!referrer) return null

  const parsedReferrer = safeUrl(referrer)
  if (!parsedReferrer) return null

  const hostname = parsedReferrer.hostname.trim().toLowerCase()
  if (!hostname || isSelfDomain(hostname)) return null
  return hostname
}

function sourceToPassiveChannel(source: string | null): PassiveChannel | null {
  if (!source) return null

  if (source.includes('reddit') || source === 'rdt') return 'reddit'
  if (source.includes('google')) return 'google'
  if (source.includes('facebook') || source === 'fb' || source.includes('instagram')) {
    return 'facebook'
  }
  if (source.includes('bing') || source.includes('microsoft')) return 'microsoft'
  if (source.includes('twitter') || source === 'x') return 'x_twitter'
  if (source.includes('youtube') || source.includes('youtu')) return 'youtube'

  return null
}

function passiveChannel(values: {
  utmSource: string | null
  rdtCid: string | null
  rdtClickId: string | null
  gclid: string | null
  fbclid: string | null
  msclkid: string | null
  referrerHost: string | null
}): PassiveChannel {
  const utmChannel = sourceToPassiveChannel(values.utmSource)
  if (utmChannel) return utmChannel
  if (values.utmSource) return 'referral'
  if (values.rdtCid || values.rdtClickId) return 'reddit'
  if (values.gclid) return 'google'
  if (values.fbclid) return 'facebook'
  if (values.msclkid) return 'microsoft'
  if (values.referrerHost) return sourceToPassiveChannel(values.referrerHost) ?? 'referral'
  return 'unknown'
}

function eventId(): string {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID()
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
}

function buildTouch(): PassiveAttribution {
  const url = new URL(window.location.href)
  const utmSource = normalizeValue(url.searchParams.get('utm_source'))
  const rdtCid = normalizeValue(url.searchParams.get('rdt_cid'))
  const rdtClickId = normalizeValue(cookieValue('_rdt_click_id'))
  const gclid = normalizeValue(url.searchParams.get('gclid'))
  const fbclid = normalizeValue(url.searchParams.get('fbclid'))
  const msclkid = normalizeValue(url.searchParams.get('msclkid'))
  const host = referrerHost()

  return {
    event_id: eventId(),
    captured_at: new Date().toISOString(),
    landing_url: `${url.origin}${url.pathname}`,
    landing_path: url.pathname,
    referrer: host,
    referrer_host: host,
    utm_source: utmSource,
    utm_medium: normalizeValue(url.searchParams.get('utm_medium')),
    utm_campaign: normalizeValue(url.searchParams.get('utm_campaign')),
    utm_term: normalizeValue(url.searchParams.get('utm_term')),
    utm_content: normalizeValue(url.searchParams.get('utm_content')),
    gclid,
    fbclid,
    msclkid,
    rdt_cid: rdtCid,
    rdt_click_id: rdtClickId,
    passive_channel: passiveChannel({
      utmSource,
      rdtCid,
      rdtClickId,
      gclid,
      fbclid,
      msclkid,
      referrerHost: host,
    }),
  }
}

function hasSignal(touch: PassiveAttribution): boolean {
  return touch.passive_channel !== 'unknown'
    || !!touch.referrer_host
    || !!touch.utm_source
    || !!touch.utm_medium
    || !!touch.utm_campaign
    || !!touch.utm_term
    || !!touch.utm_content
    || !!touch.gclid
    || !!touch.fbclid
    || !!touch.msclkid
    || !!touch.rdt_cid
    || !!touch.rdt_click_id
}

function writeAttributionCookie(state: SignupAttributionState): void {
  const expires = new Date()
  expires.setTime(expires.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000)

  let cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))}`
  cookie += `;expires=${expires.toUTCString()};path=/;SameSite=Lax`

  const hostname = window.location.hostname.toLowerCase()
  if (hostname === 'basicmemory.com' || hostname.endsWith('.basicmemory.com')) {
    cookie += ';domain=.basicmemory.com'
  }
  if (window.location.protocol === 'https:') {
    cookie += ';Secure'
  }

  document.cookie = cookie
}

function captureSignupAttribution(): void {
  const current = readAttributionCookie()
  const captured = buildTouch()
  const state = current
    ? {
        first_touch: current.first_touch,
        latest_touch: hasSignal(captured) ? captured : current.latest_touch,
      }
    : {
        first_touch: captured,
        latest_touch: captured,
      }

  writeAttributionCookie(state)
}

export default defineNuxtPlugin(() => {
  captureSignupAttribution()
  useRouter().afterEach(() => {
    captureSignupAttribution()
  })
})
