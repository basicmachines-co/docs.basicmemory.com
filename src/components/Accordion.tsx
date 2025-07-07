import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  title: string
  children: React.ReactNode
}

interface AccordionProps {
  children: React.ReactNode
  type?: 'single' | 'multiple'
  defaultOpen?: number[]
  className?: string
}

export function Accordion({ children, type = 'single', defaultOpen = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>(defaultOpen)

  const toggleItem = (index: number) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(index) ? [] : [index])
    } else {
      setOpenItems(
        openItems.includes(index)
          ? openItems.filter(i => i !== index)
          : [...openItems, index]
      )
    }
  }

  return (
    <div className={cn('divide-y divide-border rounded-lg border', className)}>
      {Array.isArray(children) ? children.map((child, index) => {
        if (child && typeof child === 'object' && 'props' in child) {
          return (
            <AccordionItemWrapper
              key={index}
              {...child.props}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          )
        }
        return null
      }) : children}
    </div>
  )
}

interface AccordionItemWrapperProps extends AccordionItem {
  isOpen: boolean
  onToggle: () => void
}

function AccordionItemWrapper({ title, children, isOpen, onToggle }: AccordionItemWrapperProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left font-medium transition-all hover:bg-muted/50"
      >
        <span>{title}</span>
        <svg
          className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
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
      <div
        className={cn(
          'overflow-hidden transition-all',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-6 pb-4 pt-0 text-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

export function AccordionItem({ title, children }: AccordionItem) {
  return <div data-title={title}>{children}</div>
}