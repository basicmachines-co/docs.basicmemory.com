import { cn } from '@/lib/utils'
import React from 'react'

interface StepsProps {
  children: React.ReactNode
  className?: string
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn('space-y-4 steps-container', className)}>
      {children}
    </div>
  )
}

interface StepProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function Step({ title, children, className }: StepProps) {
  return (
    <div className={cn('relative pl-10 step-item', className)}>
      <div className="step-number absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
      </div>
      <div className="space-y-2">
        {title && (
          <h4 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h4>
        )}
        <div className="text-sm text-muted-foreground [&>*:first-child]:mt-0">
          {children}
        </div>
      </div>
    </div>
  )
}