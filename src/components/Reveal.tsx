// src/components/Reveal.tsx
import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { CSSProperties, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number          // ms
  direction?: 'up' | 'left' | 'right' | 'none'
  distance?: number       // px
  duration?: number       // ms
  threshold?: number
  style?: CSSProperties
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 24,
  duration = 600,
  threshold = 0.1,
  style,
  className,
}: RevealProps) {
  const { ref, visible } = useScrollReveal({ threshold, rootMargin: '0px 0px -32px 0px' })

  const translate =
    direction === 'up'    ? `translateY(${distance}px)` :
    direction === 'left'  ? `translateX(-${distance}px)` :
    direction === 'right' ? `translateX(${distance}px)` :
    'none'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translate,
        transition: `opacity ${duration}ms cubic-bezier(.4,0,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.4,0,.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
