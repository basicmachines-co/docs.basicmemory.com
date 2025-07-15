import React, { useState } from 'react'

export interface Tab {
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  tabs: Tab[]
  defaultActiveTab?: number
  className?: string
  tabButtonClassName?: string
  contentClassName?: string
  onChange?: (activeTabIndex: number) => void
}

function Tabs({ 
  tabs, 
  defaultActiveTab = 0, 
  className = '',
  tabButtonClassName = '',
  contentClassName = '',
  onChange 
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)
  
  const handleTabChange = (index: number) => {
    setActiveTab(index)
    onChange?.(index)
  }
  
  return (
    <div className={`my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'border-b-2 border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            } ${tabButtonClassName}`}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div 
        className={`bg-white dark:bg-gray-900 p-6 ${contentClassName}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        id={`tabpanel-${activeTab}`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  )
}

export default Tabs