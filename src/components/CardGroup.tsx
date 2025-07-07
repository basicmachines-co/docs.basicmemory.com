import { cn } from '@/lib/utils'

interface CardGroupProps {
  cols?: 1 | 2 | 3 | 4
  children: React.ReactNode
  className?: string
}

export default function CardGroup({ cols = 2, children, className }: CardGroupProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        {
          'grid-cols-1': cols === 1,
          'grid-cols-1 md:grid-cols-2': cols === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4,
        },
        className
      )}
    >
      {children}
    </div>
  )
}