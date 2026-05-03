// src/components/TallerMarquee.tsx
import { talleresConfig } from '@/data/talleresConfig'

interface TallerMarqueeProps {
  speed?: number   // segundos por loop completo
  reverse?: boolean
}

export function TallerMarquee({ speed = 38, reverse = false }: TallerMarqueeProps) {
  // Duplicamos para loop infinito sin salto
  const items = [...talleresConfig, ...talleresConfig]

  return (
    <div style={{
      overflow: 'hidden',
      background: 'var(--grama-oscuro)',
      padding: '11px 0',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
      flexShrink: 0,
    }}>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `taller-marquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
          willChange: 'transform',
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {items.map((t, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}
          >
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.28)',
              padding: '0 6px 0 28px',
            }}>
              T{String(t.numero).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.55)',
              padding: '0 20px 0 0',
            }}>
              {t.nombre}
            </span>
            <span style={{ color: 'var(--grama-menta)', opacity: .5, fontSize: 7, lineHeight: 1 }}>●</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes taller-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
