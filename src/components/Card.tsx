import { cn } from '@/lib/utils'
import IconMap from './IconMap'

interface CardProps {
  title: string
  icon?: React.ReactNode | string
  href?: string
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, icon, href, children, className }: CardProps) {
  const CardWrapper = href ? 'a' : 'div'
  
  return (
    <CardWrapper
      href={href}
      className={cn(
        'group relative rounded-lg border bg-card p-6 shadow-sm transition-all',
        href && 'hover:border-foreground/20 cursor-pointer',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex items-center justify-center text-primary">
            {typeof icon === 'string' ? <IconMap name={icon} size={20} /> : icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-medium leading-none tracking-tight">
            {title}
          </h3>
          {children && (
            <div className="text-sm text-muted-foreground">
              {children}
            </div>
          )}
        </div>
      </div>
      {href && (
        <div className="absolute right-4 top-4 text-muted-foreground transition-transform group-hover:translate-x-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      )}
    </CardWrapper>
  )
}