// Server Component
import type { TipoContenido } from '@/domain/shared/types'

interface ContenidoBadgeProps {
  tipo:       TipoContenido
  size?:      'sm' | 'md'
  isLiveNow?: boolean
}

const CONFIG: Record<TipoContenido, { label: string; bg: string; color: string }> = {
  VIDEO:              { label: 'Video',       bg: 'var(--color-tag-vid-bg)',  color: 'var(--color-tag-vid-text)' },
  PDF:                { label: 'PDF',         bg: 'var(--color-tag-pdf-bg)',  color: 'var(--color-tag-pdf-text)' },
  INTERACTIVO:        { label: 'Interactivo', bg: 'var(--color-tag-3d-bg)',   color: 'var(--color-tag-3d-text)'  },
  QUIZ:               { label: 'Quiz',        bg: '#fef3c7',                  color: '#92400e'                    },
  EN_VIVO:            { label: 'En Vivo',     bg: '#dcfce7',                  color: '#15803d'                    },
  DESCARGABLE:        { label: 'Descargable', bg: '#ede9fe',                  color: '#6d28d9'                    },
  ACTIVIDAD_PRACTICA: { label: 'Actividad',   bg: '#fce7f3',                  color: '#9d174d'                    },
}

export function ContenidoBadge({ tipo, size = 'sm', isLiveNow }: ContenidoBadgeProps) {
  const cfg = CONFIG[tipo] ?? { label: tipo, bg: '#f3f4f6', color: '#374151' }
  const fontSize = size === 'sm' ? '0.65rem' : '0.75rem'
  const padding  = size === 'sm' ? '2px 8px'  : '3px 10px'

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wide"
      style={{ background: cfg.bg, color: cfg.color, fontSize, padding }}
    >
      {isLiveNow && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft" />
      )}
      {cfg.label}
    </span>
  )
}
