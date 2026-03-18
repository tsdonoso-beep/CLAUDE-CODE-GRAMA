// src/components/GramaLogo.tsx
// Wordmark CSS — independiente del PNG, funciona en cualquier fondo

interface GramaLogoProps {
  variant?: 'light' | 'dark'   // light = para fondos oscuros, dark = para fondos claros
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function GramaLogo({ variant = 'light', size = 'md', className = '' }: GramaLogoProps) {
  const sizes = { sm: { mark: 18, text: 13, sub: 7 }, md: { mark: 22, text: 16, sub: 8 }, lg: { mark: 30, text: 22, sub: 10 } }
  const s = sizes[size]

  const textColor     = variant === 'light' ? '#ffffff'           : '#043941'
  const accentColor   = variant === 'light' ? '#02d47e'           : '#02d47e'
  const subColor      = variant === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(4,57,65,0.45)'

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} style={{ lineHeight: 1 }}>
      {/* ── Marca geométrica ── */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        style={{ display: 'block', flexShrink: 0 }}
      >
        <polygon points="2,22 12,2 12,22" fill={accentColor} />
        <polygon points="12,2 22,12 12,12" fill={textColor} opacity="0.85" />
        <rect x="12" y="12" width="10" height="10" fill={textColor} opacity="0.5" />
      </svg>

      {/* ── Wordmark ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{ fontSize: s.text, fontWeight: 900, color: textColor, letterSpacing: '0.08em', lineHeight: 1 }}
        >
          GRAMA
        </span>
        <span
          style={{ fontSize: s.sub, fontWeight: 500, color: subColor, letterSpacing: '0.04em', lineHeight: 1 }}
        >
          Proyectos Educativos
        </span>
      </div>
    </div>
  )
}
