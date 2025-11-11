import Tabs, { type Tab } from './Tabs'
import CodeBlock from './CodeBlock'

export default function InstallationTabs() {
  const tabs: Tab[] = [
    {
      label: "macOS",
      content: (
        <div>
          <p>Paste this line into your terminal and press Enter:</p>
          <CodeBlock
            code="curl -LsSf https://basicmemory.com/install/latest.sh | sh"
            className="mt-3"
          />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            This single command will:
          </p>
          <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Install UV package manager (if not already installed)</li>
            <li>Install Basic Memory via UV</li>
            <li>Configure Claude Desktop automatically with your permission</li>
          </ul>
        </div>
      )
    },
    {
      label: "Windows",
      content: (
        <div>
          <p>Open PowerShell and run this command:</p>
          <CodeBlock
            code='powershell -ExecutionPolicy Bypass -c "irm https://basicmemory.com/install/latest.ps1 | iex"'
            className="mt-3"
          />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            This single command will:
          </p>
          <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Install UV package manager (if not already installed)</li>
            <li>Install Basic Memory via UV</li>
            <li>Configure Claude Desktop automatically with your permission</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <strong>Requirements:</strong> Windows 10+ with PowerShell 5.1+
          </p>
        </div>
      )
    },
    {
      label: "linux",
      content: (
        <div>
          <p>
            We're still working to bring you this feature.
            We recommend you use the Universal Installation instructions below. 👇
          </p>
        </div>
      )
    }
  ]

  return <Tabs tabs={tabs} />
}
