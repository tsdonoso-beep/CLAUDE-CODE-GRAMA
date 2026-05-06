// src/components/lxp/ProgressRing.tsx
interface ProgressRingProps {
  percentage: number       // 0-100
  size?: number            // px, default 80
  strokeWidth?: number     // px, default 7
  label?: string           // texto debajo del porcentaje
  sublabel?: string
  dark?: boolean           // true = texto blanco (para fondos oscuros)
}

export function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 7,
  label,
  sublabel,
  dark = false,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const textColor       = dark ? 'rgba(255,255,255,0.9)' : '#043941'
  const labelColor      = dark ? 'rgba(255,255,255,0.7)' : '#043941'
  const sublabelColor   = dark ? 'rgba(255,255,255,0.45)' : '#045f6c'
  const trackColor      = dark ? 'rgba(255,255,255,0.1)' : '#d2ffe1'

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#02d47e"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)',
            filter: 'drop-shadow(0 0 4px rgba(2,212,126,0.5))',
          }}
        />
        {/* Porcentaje centrado */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            transform: `rotate(90deg)`,
            transformOrigin: `${size / 2}px ${size / 2}px`,
            fontSize: size * 0.22,
            fontWeight: 800,
            fontFamily: 'Manrope, sans-serif',
            fill: textColor,
          }}
        >
          {percentage}%
        </text>
      </svg>
      {label && (
        <p className="text-xs font-bold text-center leading-tight" style={{ color: labelColor }}>
          {label}
        </p>
      )}
      {sublabel && (
        <p className="text-[10px] text-center" style={{ color: sublabelColor }}>
          {sublabel}
        </p>
      )}
    </div>
  )
}
