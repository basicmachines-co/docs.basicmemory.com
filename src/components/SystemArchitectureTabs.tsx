import React, { useState } from 'react'

export default function SystemArchitectureTabs() {
  const [activeTab, setActiveTab] = useState(0)
  
  const tabs = [
    {
      label: "File Layer",
      content: (
        <div>
          <p><strong>Markdown Files</strong> serve as the source of truth:</p>
          <ul>
            <li>Human-readable and editable</li>
            <li>Version control friendly</li>
            <li>Standard format compatibility</li>
            <li>Complete data ownership</li>
          </ul>
        </div>
      )
    },
    {
      label: "Processing Layer", 
      content: (
        <div>
          <p><strong>Sync Service</strong> processes changes:</p>
          <ul>
            <li>File system monitoring</li>
            <li>Markdown parsing</li>
            <li>Entity extraction</li>
            <li>Database updates</li>
          </ul>
        </div>
      )
    },
    {
      label: "Storage Layer",
      content: (
        <div>
          <p><strong>SQLite Database</strong> provides:</p>
          <ul>
            <li>Fast querying capabilities</li>
            <li>Full-text search indexing</li>
            <li>Relationship mapping</li>
            <li>Metadata storage</li>
          </ul>
        </div>
      )
    },
    {
      label: "Interface Layer",
      content: (
        <div>
          <p><strong>MCP Server</strong> exposes:</p>
          <ul>
            <li>Standardized tool interface</li>
            <li>Real-time data access</li>
            <li>Secure authentication</li>
            <li>Cross-platform compatibility</li>
          </ul>
        </div>
      )
    }
  ]
  
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'border-b-2 border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900 p-6">
        {tabs[activeTab].content}
      </div>
    </div>
  )
}