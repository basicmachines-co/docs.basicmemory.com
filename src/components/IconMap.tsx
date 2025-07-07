import {
  PenTool,
  BookOpen,
  FileText,
  Eye,
  Trash,
  Move,
  Search,
  Clock,
  Link,
  Folder,
  Layers,
  Shuffle,
  Info,
  Plus,
  X,
  Star,
  Palette,
  RefreshCw,
  Brain,
  MessageCircle,
  Activity,
  Server,
  FilePenLine,
  Target,
  ZoomIn,
  Shapes,
  Play,
  MessageSquare,
  Tags,
  Workflow,
  File,
  Hammer,
  Lightbulb,
  Network,
  Pencil,
  Share2,
  type LucideIcon
} from 'lucide-react'

interface IconMapProps {
  name: string
  size?: number
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  'pen-tool': PenTool,
  'book-open': BookOpen,
  'file-pen-line': FilePenLine,
  'eye': Eye,
  'trash': Trash,
  'move': Move,
  'search': Search,
  'clock': Clock,
  'link': Link,
  'folder': Folder,
  'layers': Layers,
  'shuffle': Shuffle,
  'info': Info,
  'plus': Plus,
  'x': X,
  'star': Star,
  'file-text': FileText,
  'palette': Palette,
  'refresh-cw': RefreshCw,
  'brain': Brain,
  'message-circle': MessageCircle,
  'activity': Activity,
  'server': Server,
  'target': Target,
  'zoom-in': ZoomIn,
  'shapes': Shapes,
  'play': Play,
  'chat': MessageSquare,
  'tags': Tags,
  'workflow': Workflow,
  'file': File,
  'hammer': Hammer,
  'lightbulb': Lightbulb,
  'network': Network,
  'pencil': Pencil,
  'share-nodes': Share2,
}

export default function IconMap({ name, size = 16, className }: IconMapProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon map`)
    return null
  }
  
  return <IconComponent size={size} className={className} />
}