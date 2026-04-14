// Server Component — renderizable en RSC
interface ProgressRingProps {
  percentage:   number
  size?:        number
  strokeWidth?: number
  label?:       string
  sublabel?:    string
  dark?:        boolean
}

export function ProgressRing({
  percentage,
  size = 100,
  strokeWidth = 8,
  label,
  sublabel,
  dark = false,
}: ProgressRingProps) {
  const radius      = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset      = circumference - (percentage / 100) * circumference

  const trackColor = dark ? 'rgba(255,255,255,0.1)' : 'rgba(4,57,65,0.1)'
  const textColor  = dark ? '#d2ffe1' : '#043941'
  const mutedColor = dark ? 'rgba(210,255,225,0.5)' : 'rgba(4,57,65,0.45)'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={trackColor} strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="#02d47e"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      {/* Texto centrado */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span
          className="font-extrabold leading-none"
          style={{ fontSize: size * 0.22, color: textColor }}
        >
          {percentage}%
        </span>
        {label && (
          <span style={{ fontSize: size * 0.11, color: mutedColor, marginTop: 2 }}>
            {label}
          </span>
        )}
        {sublabel && (
          <span style={{ fontSize: size * 0.09, color: mutedColor }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
