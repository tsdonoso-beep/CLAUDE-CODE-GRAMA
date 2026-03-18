// src/components/lxp/RepositorioCard.tsx
import { useNavigate, useParams } from 'react-router-dom'
import { FileText, Video, Shield, Package, Wrench, Archive, BookOpen } from 'lucide-react'

interface BienData {
  n: number
  nombre: string
  cantidad: number
  zona: string
  descripcion: string
  usoPedagogico: string
  marca?: string
  modelo?: string
  codigoEntidad: string
  codigoInterno: string
  tipo: string
}

interface RepositorioCardProps {
  bien: BienData
}

const TIPO_CONFIG: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  EQUIPOS: { icon: Package, color: '#00c16e', label: 'Equipo' },
  HERRAMIENTAS: { icon: Wrench, color: '#0891b2', label: 'Herramienta' },
  MUEBLES: { icon: Archive, color: '#8b5cf6', label: 'Mobiliario' },
  PEDAGOGICO: { icon: BookOpen, color: '#f59e0b', label: 'Material Pedagógico' },
}

function getZonaLabel(zona: string): { label: string; color: string } {
  const z = zona.toUpperCase()
  if (z.includes('INVESTIGAC')) return { label: 'Investigación', color: '#0891b2' }
  if (z.includes('INNOVAC')) return { label: 'Innovación', color: '#00c16e' }
  if (z.includes('ACABADO')) return { label: 'Acabados', color: '#8b5cf6' }
  if (z.includes('ALMAC')) return { label: 'Almacén', color: '#f59e0b' }
  if (z.includes('SEGURIDAD')) return { label: 'Seguridad', color: '#ef4444' }
  return { label: zona.split(',')[0].trim(), color: '#045f6c' }
}

export function RepositorioCard({ bien }: RepositorioCardProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const tipoConf = TIPO_CONFIG[bien.tipo] ?? TIPO_CONFIG.EQUIPOS
  const TypeIcon = tipoConf.icon
  const zona = getZonaLabel(bien.zona)

  return (
    <button
      onClick={() => navigate(`/taller/${slug}/repositorio/bien/${bien.n}`)}
      className="w-full text-left rounded-xl border-2 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md group"
      style={{ borderColor: '#e3f8fb', background: '#ffffff' }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: '#e3f8fb' }}
        >
          <TypeIcon size={18} style={{ color: tipoConf.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-sm leading-tight line-clamp-2 group-hover:underline"
            style={{ color: '#043941' }}
          >
            {bien.nombre}
          </h3>
          {(bien.marca || bien.modelo) && (
            <p className="text-xs mt-0.5" style={{ color: '#045f6c' }}>
              {[bien.marca, bien.modelo].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{ background: '#e3f8fb', color: '#043941' }}
        >
          ×{bien.cantidad}
        </span>
      </div>

      {/* Zone + type badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: zona.color + '20', color: zona.color }}
        >
          {zona.label}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: tipoConf.color + '20', color: tipoConf.color }}
        >
          {tipoConf.label}
        </span>
      </div>

      {/* Resources available */}
      <div className="flex gap-2">
        <ResourceBadge icon={FileText} label="Manual" color="#043941" />
        <ResourceBadge icon={Video} label="Video" color="#00c16e" />
        <ResourceBadge icon={Shield} label="IPERC" color="#ef4444" />
      </div>

      {/* Code */}
      <p className="text-xs mt-2" style={{ color: '#94a3b8' }}>
        {bien.codigoEntidad}
      </p>
    </button>
  )
}

function ResourceBadge({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ElementType
  label: string
  color: string
}) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded"
      style={{ background: color + '15', color }}
    >
      <Icon size={10} />
      {label}
    </span>
  )
}
