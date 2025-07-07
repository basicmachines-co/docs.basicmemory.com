import Callout from './Callout'

interface TipProps {
  children: React.ReactNode
  title?: string
}

export default function Tip({ children, title }: TipProps) {
  return <Callout type="tip" title={title}>{children}</Callout>
}