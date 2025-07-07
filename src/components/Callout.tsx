import { cn } from '@/lib/utils'

interface CalloutProps {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'note' | 'tip'
  title?: string
  className?: string
}

const calloutStyles = {
  info: {
    container: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-300'
  },
  warning: {
    container: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-300'
  },
  note: {
    container: 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/20',
    icon: 'text-gray-600 dark:text-gray-400',
    title: 'text-gray-900 dark:text-gray-300'
  },
  tip: {
    container: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-300'
  }
}

const icons = {
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  note: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  tip: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.05 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
      <path d="M13 18h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Z" />
    </svg>
  )
}

export default function Callout({ children, type = 'note', title, className }: CalloutProps) {
  const styles = calloutStyles[type]
  const icon = icons[type]
  const defaultTitle = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div className={cn('my-6 rounded-lg border p-4', styles.container, className)}>
      <div className="flex gap-3">
        <div className={cn('flex-shrink-0 pt-2', styles.icon)}>
          {icon}
        </div>
        <div className="flex-1 space-y-2">
          {(title || !children || typeof children === 'string') && (
            <div className={cn('font-medium leading-none tracking-tight', styles.title)}>
              {title || defaultTitle}
            </div>
          )}
          <div className="text-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}