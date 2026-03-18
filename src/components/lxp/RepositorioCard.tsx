// src/components/lxp/RepositorioCard.tsx
import { useNavigate, useParams } from 'react-router-dom'
import { FileText, Video, Shield, Package, Wrench, Sofa, BookOpen, HardHat, Factory } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Bien = Record<string, any>

interface RepositorioCardProps {
  bien: Bien
}

const TIPO_CONFIG: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  EQUIPOS:      { icon: Package,  color: '#00c16e', label: 'Equipo' },
  HERRAMIENTAS: { icon: Wrench,   color: '#0891b2', label: 'Herramienta' },
  MOBILIARIO:   { icon: Sofa,     color: '#8b5cf6', label: 'Mobiliario' },
  PEDAGOGICO:   { icon: BookOpen, color: '#f59e0b', label: 'Pedagógico' },
  'PRODUCCIÓN': { icon: Factory,  color: '#06b6d4', label: 'Producción' },
  SEGURIDAD:    { icon: HardHat,  color: '#ef4444', label: 'Seguridad' },
  '':           { icon: Package,  color: '#6b7280', label: 'Bien' },
}

function zonaColor(zona: string): string {
  const z = zona.toUpperCase()
  if (z.includes('INVESTIGAC')) return '#0891b2'
  if (z.includes('INNOVAC'))    return '#00c16e'
  if (z.includes('DEPÓSITO') || z.includes('ALMAC')) return '#f59e0b'
  if (z.includes('SEGURIDAD')) return '#ef4444'
  return '#045f6c'
}

export function RepositorioCard({ bien }: RepositorioCardProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const tipoConf = TIPO_CONFIG[bien.tipo] ?? TIPO_CONFIG['']
  const TypeIcon = tipoConf.icon
  const color = zonaColor(bien.zona ?? '')

  // Breadcrumb: zona > area > subarea (solo los que tienen valor)
  const breadcrumb = [bien.zona, bien.area, bien.subarea].filter(Boolean)

  return (
    <button
      onClick={() => navigate(`/taller/${slug}/repositorio/bien/${bien.n}`)}
      className="w-full text-left rounded-xl border-2 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md group"
      style={{ borderColor: '#e3f8fb', background: '#ffffff' }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#e3f8fb' }}>
          <TypeIcon size={18} style={{ color: tipoConf.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm leading-tight line-clamp-2 group-hover:underline" style={{ color: '#043941' }}>
            {bien.nombre}
          </h3>
          {(bien.marca || bien.modelo) && (
            <p className="text-xs mt-0.5" style={{ color: '#045f6c' }}>
              {[bien.marca, bien.modelo].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: '#e3f8fb', color: '#043941' }}>
          ×{bien.cantidad}
        </span>
      </div>

      {/* Jerarquía zona → area → subarea */}
      <div className="flex flex-wrap gap-1 mb-3">
        {breadcrumb.map((seg, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span style={{ color: '#94a3b8', fontSize: 10 }}>›</span>}
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: i === 0 ? color + '20' : '#f1f5f9',
                color: i === 0 ? color : '#64748b',
              }}
            >
              {seg}
            </span>
          </span>
        ))}
      </div>

      {/* Tipo */}
      <span
        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold mb-3"
        style={{ background: tipoConf.color + '18', color: tipoConf.color }}
      >
        <TypeIcon size={10} />
        {tipoConf.label}
      </span>

      {/* Recursos disponibles */}
      <div className="flex gap-2 mt-1">
        <ResourceBadge icon={FileText} label="Manual" color="#043941" />
        <ResourceBadge icon={Video}    label="Video"  color="#00c16e" />
        <ResourceBadge icon={Shield}   label="IPERC"  color="#ef4444" />
      </div>

      <p className="text-xs mt-2" style={{ color: '#94a3b8' }}>{bien.codigoEntidad}</p>
    </button>
  )
}

function ResourceBadge({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded" style={{ background: color + '15', color }}>
      <Icon size={10} />
      {label}
    </span>
  )
}
