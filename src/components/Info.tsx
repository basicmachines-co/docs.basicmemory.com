import Callout from './Callout'

interface InfoProps {
  children: React.ReactNode
  title?: string
}

export default function Info({ children, title }: InfoProps) {
  return <Callout type="info" title={title}>{children}</Callout>
}