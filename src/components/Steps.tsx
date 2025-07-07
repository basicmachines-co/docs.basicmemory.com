import { cn } from '@/lib/utils'
import React from 'react'

interface StepsProps {
  children: React.ReactNode
  className?: string
}

export function Steps({ children, className }: StepsProps) {
  const steps = React.Children.toArray(children)
  
  return (
    <div className={cn('space-y-4', className)}>
      {steps.map((step, index) => {
        if (React.isValidElement(step) && step.type === Step) {
          return React.cloneElement(step as React.ReactElement<StepProps>, {
            stepNumber: index + 1,
            key: index
          })
        }
        return step
      })}
    </div>
  )
}

interface StepProps {
  title?: string
  children: React.ReactNode
  stepNumber?: number
  className?: string
}

export function Step({ title, children, stepNumber, className }: StepProps) {
  return (
    <div className={cn('relative pl-10', className)}>
      <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {stepNumber}
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