// Server Component — sin estado, sin deps a contextos
interface GramaLogoProps {
  size?:      'sm' | 'md' | 'lg'
  variant?:   'light' | 'dark'
  className?: string
}

const SIZES = { sm: 24, md: 32, lg: 48 }

export function GramaLogo({ size = 'md', variant = 'dark', className }: GramaLogoProps) {
  const px = SIZES[size]
  const color = variant === 'light' ? '#d2ffe1' : '#043941'

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      {/* Símbolo geométrico tangram */}
      <svg width={px} height={px} viewBox="0 0 48 48" fill="none" aria-hidden>
        <polygon points="24,2 46,24 24,24" fill="#02d47e" />
        <polygon points="2,24 24,24 24,46" fill="#00c16e" />
        <polygon points="24,24 46,24 46,46 24,46" fill="#045f6c" />
        <polygon points="2,2 24,2 2,24" fill="#043941" />
      </svg>
      <span
        className="font-extrabold tracking-tight"
        style={{ color, fontSize: px * 0.56, lineHeight: 1 }}
      >
        GRAMA
      </span>
    </div>
  )
}
