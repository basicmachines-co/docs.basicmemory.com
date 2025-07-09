import { navConfig } from '@/config/navigation'
import Icon from './Icon'

interface NavMenuProps {
  currentPath?: string
  onLinkClick?: () => void
}

export default function NavMenu({ currentPath, onLinkClick }: NavMenuProps) {
  return (
    <div className="space-y-6">
      {/* Top links section */}
      <div className="space-y-2">
        {navConfig.sidebarTopLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            onClick={onLinkClick}
            className="flex items-center gap-3 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors no-underline group"
            style={{ textDecoration: 'none' }}
          >
            {link.icon && (
              <div className="flex items-center justify-center w-6 h-6 rounded-md border border-gray-200 dark:border-gray-700 group-hover:bg-black dark:group-hover:bg-white group-hover:border-black dark:group-hover:border-white transition-all">
                <Icon name={link.icon} className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-black" />
              </div>
            )}
            <span>{link.title}</span>
          </a>
        ))}
      </div>

      {/* Regular navigation sections */}
      {navConfig.sidebar.map((section) => (
        <div key={section.title}>
          <h4 className="text-sm font-medium leading-none tracking-tight text-gray-900 dark:text-gray-100 px-3 mb-4 mt-10">
            {section.title}
          </h4>
          <ul className="space-y-1 list-none m-0 p-0">
            {section.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onLinkClick}
                  className={`block text-sm transition-colors hover:text-gray-900 dark:hover:text-gray-100 rounded-xl ${
                    currentPath === item.href
                      ? 'text-gray-900 dark:text-gray-100 font-medium bg-[#e8e8e8] dark:bg-gray-800 px-3.5 py-2'
                      : 'text-gray-600 dark:text-gray-400 font-normal hover:bg-gray-50 dark:hover:bg-gray-800/50 px-3 py-1.5'
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}