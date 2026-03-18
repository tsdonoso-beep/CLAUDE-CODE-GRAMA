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
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* ── Marca geométrica ── */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        {/* Tangram simplificado: 3 piezas */}
        {/* Triángulo grande superior-izq */}
        <polygon points="2,22 12,2 12,22" fill={accentColor} opacity="1" />
        {/* Triángulo superior-der */}
        <polygon points="12,2 22,12 12,12" fill={textColor} opacity="0.85" />
        {/* Cuadrado inferior-der */}
        <rect x="12" y="12" width="10" height="10" fill={textColor} opacity="0.5" />
      </svg>

      {/* ── Wordmark ── */}
      <div style={{ lineHeight: 1 }}>
        <div
          className="font-black tracking-[0.06em]"
          style={{ fontSize: s.text, color: textColor, letterSpacing: '0.08em' }}
        >
          GRAMA
        </div>
        <div
          className="font-medium tracking-wide"
          style={{ fontSize: s.sub, color: subColor, marginTop: 1, letterSpacing: '0.04em' }}
        >
          Proyectos Educativos
        </div>
      </div>
    </div>
  )
}
