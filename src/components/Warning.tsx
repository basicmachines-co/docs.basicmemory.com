import Callout from './Callout'

interface WarningProps {
  children: React.ReactNode
  title?: string
}

export default function Warning({ children, title }: WarningProps) {
  return <Callout type="warning" title={title}>{children}</Callout>
}