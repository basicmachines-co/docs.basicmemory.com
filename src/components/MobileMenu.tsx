import { useState, useEffect } from 'react'
import NavMenu from './NavMenu'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the DOM is ready before animating
      setTimeout(() => setIsVisible(true), 10)
      // Add blur effect to background content
      document.body.style.overflow = 'hidden'
      document.documentElement.classList.add('mobile-menu-open')
    } else {
      setIsVisible(false)
      // Remove blur effect
      document.body.style.overflow = ''
      document.documentElement.classList.remove('mobile-menu-open')
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* Transparent overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ease-in-out md:hidden ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu panel - always rendered but translated off-screen when closed */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 z-50 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen && isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ maxWidth: '80vw' }}
      >
            {/* Menu header */}
            <div className="flex items-center justify-end px-4 py-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

        {/* Menu content */}
        <nav className="h-[calc(100vh-48px)] overflow-y-auto px-6 pb-16">
          <NavMenu onLinkClick={() => setIsOpen(false)} />
        </nav>
      </div>
    </div>
  )
}
