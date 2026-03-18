// src/components/GramaLogo.tsx
// Logo GRAMA que se adapta a fondos oscuros y claros.
// variant="white"  → inversión blanca (para sidebars/headers oscuros)
// variant="color"  → logo original (para fondos claros)
// variant="glow"   → blanco con halo verde (hero oscuro, destacado)

import logoSrc from '@/assets/logo-grama-full.png'

interface GramaLogoProps {
  variant?: 'white' | 'color' | 'glow'
  className?: string
  height?: number
}

export function GramaLogo({ variant = 'white', className = '', height = 32 }: GramaLogoProps) {
  const filters: Record<string, string> = {
    // Logo PNG oscuro → blanco puro: invert + brightness
    white: 'brightness(0) invert(1)',
    // Logo original sin filtro
    color: 'none',
    // Blanco + halo verde sutil
    glow:  'brightness(0) invert(1) drop-shadow(0 0 10px rgba(2,212,126,0.55))',
  }

  return (
    <img
      src={logoSrc}
      alt="GRAMA Proyectos Educativos"
      className={className}
      style={{
        height,
        objectFit: 'contain',
        filter: filters[variant],
        transition: 'filter 0.2s ease',
      }}
    />
  )
}
