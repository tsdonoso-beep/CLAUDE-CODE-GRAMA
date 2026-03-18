// src/components/lxp/ProgressRing.tsx
interface ProgressRingProps {
  percentage: number       // 0-100
  size?: number            // px, default 80
  strokeWidth?: number     // px, default 7
  label?: string           // texto debajo del porcentaje
  sublabel?: string
}

export function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 7,
  label,
  sublabel
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#d2ffe1"
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
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        {/* Text — rotated back to normal */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="rotate-90"
          style={{
            transform: `rotate(90deg)`,
            transformOrigin: `${size / 2}px ${size / 2}px`,
            fontSize: size * 0.22,
            fontWeight: 700,
            fontFamily: 'Manrope, sans-serif',
            fill: '#043941',
          }}
        >
          {percentage}%
        </text>
      </svg>
      {label && (
        <p className="text-xs font-semibold text-center leading-tight" style={{ color: '#043941' }}>
          {label}
        </p>
      )}
      {sublabel && (
        <p className="text-xs text-center" style={{ color: '#045f6c' }}>
          {sublabel}
        </p>
      )}
    </div>
  )
}
