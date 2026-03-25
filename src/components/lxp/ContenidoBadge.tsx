// src/components/lxp/ContenidoBadge.tsx
import { FileText, Video, Zap, HelpCircle, Radio, Download, Activity } from 'lucide-react'
import type { TipoContenido } from '@/data/modulosLXP'

interface ContenidoBadgeProps {
  tipo: TipoContenido
  size?: 'sm' | 'md' | 'list'
  isLiveNow?: boolean
}

const CONFIG: Record<TipoContenido, {
  label: string
  icon: React.ElementType
  bg: string
  text: string
}> = {
  PDF: {
    label: 'PDF',
    icon: FileText,
    bg: '#043941',
    text: '#ffffff',
  },
  VIDEO: {
    label: 'Video',
    icon: Video,
    bg: '#00c16e',
    text: '#ffffff',
  },
  INTERACTIVO: {
    label: 'Interactivo',
    icon: Zap,
    bg: '#0891b2',
    text: '#ffffff',
  },
  QUIZ: {
    label: 'Quiz',
    icon: HelpCircle,
    bg: '#ca8a04',
    text: '#ffffff',
  },
  EN_VIVO: {
    label: 'En Vivo',
    icon: Radio,
    bg: '#ef4444',
    text: '#ffffff',
  },
  DESCARGABLE: {
    label: 'Descargable',
    icon: Download,
    bg: '#6b7280',
    text: '#ffffff',
  },
  ACTIVIDAD_PRACTICA: {
    label: 'Actividad',
    icon: Activity,
    bg: '#f59e0b',
    text: '#ffffff',
  },
}

export function ContenidoBadge({ tipo, size = 'sm', isLiveNow = false }: ContenidoBadgeProps) {
  const { label, bg } = CONFIG[tipo]

  if (size === 'list') {
    return (
      <span className="inline-flex items-center gap-1.5 shrink-0">
        <span
          className="h-1.5 w-1.5 rounded-full shrink-0"
          style={{ background: bg }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-wide"
          style={{ color: '#64748b' }}
        >
          {label}
        </span>
        {isLiveNow && tipo === 'EN_VIVO' && (
          <span
            className="h-1.5 w-1.5 rounded-full animate-blink"
            style={{ background: bg }}
          />
        )}
      </span>
    )
  }

  const { icon: Icon, text } = CONFIG[tipo]
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full ${
        size === 'md' ? 'px-3 py-1 text-[11px]' : 'px-2.5 py-1 text-[10px]'
      }`}
      style={{ background: bg, color: text }}
    >
      <Icon size={11} />
      {label}
      {isLiveNow && tipo === 'EN_VIVO' && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full animate-blink ml-0.5"
          style={{ background: '#ffffff' }}
        />
      )}
    </span>
  )
}
