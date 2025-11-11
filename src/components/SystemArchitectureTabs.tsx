import Tabs, { type Tab } from './Tabs'

export default function SystemArchitectureTabs() {
  const tabs: Tab[] = [
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
  
  return <Tabs tabs={tabs} />
}