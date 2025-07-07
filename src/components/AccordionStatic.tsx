import React from 'react'
import { cn } from '@/lib/utils'

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={cn('accordion-container divide-y divide-border rounded-lg border', className)}>
      {children}
    </div>
  )
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger flex w-full items-center justify-between px-6 py-4 text-left font-medium transition-all hover:bg-muted/50"
        data-state={defaultOpen ? 'open' : 'closed'}
      >
        <span>{title}</span>
        <svg
          className={cn('accordion-icon h-4 w-4 shrink-0 transition-transform duration-200', defaultOpen && 'rotate-180')}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={cn('accordion-content overflow-hidden', defaultOpen ? '' : 'hidden')}>
        <div className="px-6 pb-4 pt-0 text-sm">
          {children}
        </div>
      </div>
    </div>
  )
}