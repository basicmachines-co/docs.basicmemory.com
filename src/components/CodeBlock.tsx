import React, { useState } from 'react'

interface CodeBlockProps {
  code: string
  className?: string
}

export default function CodeBlock({ code, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className={`code-block-wrapper ${className}`}>
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-gray-100/50 dark:bg-gray-900 p-4 pr-12 border border-gray-200 dark:border-gray-800">
        <code className="bg-transparent p-0 text-gray-900 dark:text-gray-100 font-light">
          {code}
        </code>
      </pre>
      <button
        onClick={copyToClipboard}
        className={`copy-button ${copied ? 'copied' : ''}`}
        title="Copy to clipboard"
      >
        {copied ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
