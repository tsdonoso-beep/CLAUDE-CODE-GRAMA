// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Package, Clock, CheckCircle2, Lock, PlayCircle,
  ChevronRight, Video, ArrowRight, Layers
} from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { modulosLXP } from '@/data/modulosLXP'
import { mockEstadosModulos, mockProximaSesion, mockProgreso } from '@/mock/mockEstados'
import { LiveSessionCard } from '@/components/lxp/LiveSessionCard'
import { ProgressRing } from '@/components/lxp/ProgressRing'

export default function TallerHub() {
  const { taller, slug, bienes, totalBienes } = useTaller()
  const navigate = useNavigate()

  if (!taller) return null

  const modulosPreview = modulosLXP.slice(0, 4)

  const ESTADO_ICON: Record<string, { icon: React.ElementType; color: string; label: string }> = {
    completado: { icon: CheckCircle2, color: '#00c16e', label: 'Completado' },
    en_curso: { icon: PlayCircle, color: '#02d47e', label: 'En curso' },
    disponible: { icon: PlayCircle, color: '#045f6c', label: 'Disponible' },
    bloqueado: { icon: Lock, color: '#94a3b8', label: 'Bloqueado' },
  }

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="px-8 py-10 grama-pattern"
        style={{ background: '#043941' }}
      >
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#02d47e' }}>
            T{taller.numero} · {taller.nombreCorto}
          </p>
          <h1 className="text-3xl font-extrabold text-white mb-3 leading-tight">
            {taller.nombre}
          </h1>
          <p className="text-sm mb-6 max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {taller.descripcion}
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: Layers, value: '7 Módulos', sub: 'LXP completos' },
              { icon: Clock, value: '150 Horas', sub: 'modalidad híbrida' },
              { icon: BookOpen, value: '🎓 Certificación', sub: 'MINEDU Perú' },
            ].map(stat => (
              <div key={stat.value} className="flex items-center gap-2">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(2,212,126,0.12)' }}
                >
                  <stat.icon size={16} color="#02d47e" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{stat.value}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 grid lg:grid-cols-3 gap-6">
        {/* Main (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tu Ruta de Aprendizaje */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold" style={{ color: '#043941' }}>
                Tu Ruta de Aprendizaje
              </h2>
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                className="text-sm font-semibold flex items-center gap-1 transition-colors"
                style={{ color: '#02d47e' }}
              >
                Ver ruta completa <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {modulosPreview.map(modulo => {
                const estadoItem = mockEstadosModulos.find(e => e.moduloId === modulo.id)
                const estado = estadoItem?.estado ?? 'bloqueado'
                const conf = ESTADO_ICON[estado]
                const StatusIcon = conf.icon

                return (
                  <button
                    key={modulo.id}
                    onClick={() => estado !== 'bloqueado' && navigate(`/taller/${slug}/ruta/modulo/${modulo.numero}`)}
                    disabled={estado === 'bloqueado'}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all disabled:cursor-not-allowed hover:shadow-sm"
                    style={{
                      borderColor: estado === 'en_curso' ? '#02d47e' : '#e3f8fb',
                      background: estado === 'completado' ? '#d2ffe1' : '#ffffff',
                      opacity: estado === 'bloqueado' ? 0.6 : 1,
                    }}
                  >
                    <span className="text-xl">{modulo.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ color: '#043941' }}>
                        M{modulo.numero} · {modulo.nombre}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#045f6c' }}>
                        {modulo.horasTotal}h · {modulo.subSecciones.length} secciones
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StatusIcon size={15} style={{ color: conf.color }} />
                      <span className="text-xs font-semibold" style={{ color: conf.color }}>
                        {conf.label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => navigate(`/taller/${slug}/ruta`)}
              className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all"
              style={{ borderColor: '#e3f8fb', color: '#043941', background: '#ffffff' }}
            >
              Ver los 7 módulos completos
              <ArrowRight size={14} />
            </button>
          </section>

          {/* Repositorio de Recursos */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold" style={{ color: '#043941' }}>
                Repositorio de Recursos
              </h2>
              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                className="text-sm font-semibold flex items-center gap-1 transition-colors"
                style={{ color: '#02d47e' }}
              >
                Ver repositorio <ChevronRight size={14} />
              </button>
            </div>
            <div className="p-5 rounded-2xl border-2" style={{ borderColor: '#e3f8fb', background: '#ffffff' }}>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { value: totalBienes, label: 'Bienes totales', color: '#043941' },
                  { value: bienes.filter((b: {tipo: string}) => b.tipo === 'PEDAGOGICO').length, label: 'Manuales', color: '#00c16e' },
                  { value: bienes.filter((b: {tipo: string}) => b.tipo === 'EQUIPOS').length, label: 'Equipos', color: '#0891b2' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-extrabold" style={{ color: s.color }}>
                      {s.value}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#045f6c' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Investigación', 'Innovación', 'Acabados', 'Almacén'].map(zona => (
                  <span
                    key={zona}
                    className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: '#e3f8fb', color: '#045f6c' }}
                  >
                    Zona {zona}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background: '#043941' }}
              >
                <Package size={16} />
                Explorar repositorio
                <ArrowRight size={14} />
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar derecho (1/3) */}
        <div className="space-y-5">
          {/* Progress Ring */}
          <div
            className="p-5 rounded-2xl border-2 text-center"
            style={{ borderColor: '#e3f8fb', background: '#ffffff' }}
          >
            <h3 className="text-sm font-extrabold mb-4" style={{ color: '#043941' }}>
              Tu progreso
            </h3>
            <div className="flex justify-center mb-3">
              <ProgressRing
                percentage={mockProgreso.porcentajeGeneral}
                size={96}
                label={`${mockProgreso.modulosCompletados} de ${mockProgreso.modulosTotal} módulos`}
                sublabel="completados"
              />
            </div>
            <p className="text-xs" style={{ color: '#045f6c' }}>
              {mockProgreso.horasCompletadas}h / {mockProgreso.horasTotal}h totales
            </p>
          </div>

          {/* Próxima sesión */}
          <LiveSessionCard
            titulo={mockProximaSesion.titulo}
            moduloNombre={mockProximaSesion.moduloNombre}
            fecha={mockProximaSesion.fecha}
            duracionMin={mockProximaSesion.duracionMin}
            formador={mockProximaSesion.formador}
            plataforma={mockProximaSesion.plataforma}
            urlAcceso={mockProximaSesion.urlAcceso}
            compact
          />

          {/* Video placeholder */}
          <div
            className="rounded-2xl overflow-hidden border-2"
            style={{ borderColor: '#e3f8fb' }}
          >
            <div
              className="aspect-video flex flex-col items-center justify-center"
              style={{ background: '#043941' }}
            >
              <Video size={28} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <p className="text-xs mt-2 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Tour Virtual del Taller
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Próximamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
