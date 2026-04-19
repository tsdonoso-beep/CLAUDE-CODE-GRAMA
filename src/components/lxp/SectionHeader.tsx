// src/components/lxp/SectionHeader.tsx
import React from 'react'

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  iconColor,
  action,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  title: string
  subtitle?: string
  iconColor: string
  action?: React.ReactNode
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4 border-b"
      style={{
        borderColor: 'rgba(4,57,65,0.08)',
        background: 'rgba(4,57,65,0.05)',
        boxShadow: 'var(--sh-brand-sm)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${iconColor}18` }}
        >
          <Icon size={15} style={{ color: iconColor }} />
        </div>
        <div>
          <h2 className="text-h3 font-extrabold leading-tight" style={{ color: 'var(--grama-oscuro)' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: 'rgba(4,57,65,0.45)' }}>{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}
