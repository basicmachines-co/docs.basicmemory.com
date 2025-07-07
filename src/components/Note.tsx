import Callout from './Callout'

interface NoteProps {
  children: React.ReactNode
  title?: string
}

export default function Note({ children, title }: NoteProps) {
  return <Callout type="note" title={title}>{children}</Callout>
}