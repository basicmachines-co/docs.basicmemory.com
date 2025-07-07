import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CodeTab {
  label: string
  value: string
  language?: string
  children: React.ReactNode
}

interface CodeGroupProps {
  children: React.ReactNode
  className?: string
}

export default function CodeGroup({ children, className }: CodeGroupProps) {
  const [activeTab, setActiveTab] = useState(0)
  
  const tabs = Array.isArray(children) ? children : [children]
  const validTabs = tabs.filter(tab => 
    tab && typeof tab === 'object' && 'props' in tab && tab.props
  )

  if (validTabs.length === 0) return null

  return (
    <div className={cn('my-6 overflow-hidden rounded-lg border bg-gray-900', className)}>
      <div className="flex border-b border-gray-800 bg-gray-950">
        {validTabs.map((tab, index) => {
          const { label, value } = tab.props
          return (
            <button
              key={value || index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                activeTab === index
                  ? 'border-b-2 border-primary bg-gray-900 text-gray-100'
                  : 'text-gray-400 hover:text-gray-200'
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="p-4">
        {validTabs[activeTab] && (
          <div className="text-sm text-gray-100">
            {validTabs[activeTab].props.children}
          </div>
        )}
      </div>
    </div>
  )
}

export function CodeTab({ children }: CodeTab) {
  return <>{children}</>
}