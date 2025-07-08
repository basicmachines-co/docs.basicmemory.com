import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface CodeTabProps {
  label: string
  value?: string
  language?: string
  children: React.ReactNode
}

interface CodeGroupProps {
  children: React.ReactNode
  className?: string
}

export function CodeTab({ children }: CodeTabProps) {
  return <>{children}</>
}

export default function CodeGroup({ children, className }: CodeGroupProps) {
  const [activeTab, setActiveTab] = useState(0)
  const childArray = React.Children.toArray(children)
  
  // Extract labels from CodeTab components
  const tabs: { label: string; content: React.ReactNode }[] = []
  
  childArray.forEach(child => {
    if (React.isValidElement(child) && child.props.label) {
      tabs.push({
        label: child.props.label,
        content: child.props.children
      })
    }
  })
  
  if (tabs.length === 0) {
    return null
  }
  
  return (
    <div className={cn('my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800', className)}>
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              activeTab === index
                ? 'border-b-2 border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={cn(
              'p-4',
              activeTab === index ? 'block' : 'hidden'
            )}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {tab.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}