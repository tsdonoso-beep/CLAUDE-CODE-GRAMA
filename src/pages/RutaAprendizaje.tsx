// src/pages/RutaAprendizaje.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, Video, Award } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { modulosLXP } from '@/data/modulosLXP'
import { mockProximaSesion } from '@/mock/mockEstados'
import { ModuloCard } from '@/components/lxp/ModuloCard'
import { LiveSessionCard } from '@/components/lxp/LiveSessionCard'
import { useProgress } from '@/contexts/ProgressContext'
import { useAuth } from '@/contexts/AuthContext'
import { trackNavegacion } from '@/lib/tracker'

export default function RutaAprendizaje() {
  const { taller, slug } = useTaller()
  const { getTallerProgreso, getEstadoModuloLXP } = useProgress()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug === 'taller-general-ept') {
      navigate(`/taller/${slug}/repositorio`, { replace: true })
    }
  }, [slug, navigate])

  useEffect(() => {
    if (!user?.id || !slug) return
    trackNavegacion(user.id, 'ruta_aprendizaje', slug)
  }, [user?.id, slug])
  const progresoTaller = getTallerProgreso(slug ?? '')

  if (!taller || slug === 'taller-general-ept') return null

  const sesionesEnVivo = modulosLXP.flatMap(m =>
    m.subSecciones.flatMap(s =>
      s.contenidos.filter(c => c.tipo === 'EN_VIVO')
    )
  ).length

  // Módulo actual: el primero en_curso o el primero disponible
  const moduloActual = modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'en_curso')
    ?? modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'disponible')

  return (
    <div>
      {/* ── Hero ── */}
      <div className="px-8 pt-10 pb-16 relative overflow-hidden" style={{ background: '#043941' }}>
        {/* Imagen de fondo del taller */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${taller.imagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
        }} />
        {/* Overlay + patrón */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(4,57,65,0.92) 45%, rgba(4,57,65,0.65) 100%)' }} />
        <div className="absolute inset-0 grama-pattern opacity-40" />

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-8 items-center">

          {/* Columna izquierda: info */}
          <div>
            <p className="overline-label font-semibold mb-2" style={{ color: 'var(--grama-menta)' }}>
              {taller.nombreCorto}
            </p>
            <h1 className="text-h1 font-extrabold text-white mb-3 leading-tight">
              Tu Ruta de Aprendizaje
            </h1>
            <p className="text-sm mb-6 max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
              7 módulos secuenciados para dominar el equipamiento y el Programa Formativo EPT
            </p>
            <div className="flex flex-wrap gap-5">
              {[
                { icon: BookOpen, value: '7 módulos', sub: 'M0 → M6' },
                { icon: Clock,    value: '150 horas',  sub: 'A + S + Presencial' },
                { icon: Video,    value: `${sesionesEnVivo} sesiones`, sub: 'en vivo' },
                { icon: Award,    value: 'Constancia',    sub: 'Inroprin' },
              ].map(s => (
                <div key={s.value} className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(2,212,126,0.12)' }}>
                    <s.icon size={16} color="#02d47e" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{s.value}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: progreso prominente */}
          <div className="hidden lg:block">
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="overline-label mb-4" style={{ color: 'rgba(2,212,126,0.7)' }}>
                Tu Progreso
              </p>

              {/* Número — usa t-display del sistema de tipografía */}
              <div className="flex items-end gap-2 mb-3">
                <span className="t-display text-white leading-none">
                  {progresoTaller.porcentaje}
                </span>
                <span className="t-h2 font-extrabold mb-1" style={{ color: 'var(--grama-menta)' }}>%</span>
                <span className="t-body mb-2 ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>completado</span>
              </div>

              {/* Barra de progreso */}
              <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progresoTaller.porcentaje}%`,
                    background: 'linear-gradient(90deg, var(--grama-menta), #00c16e)',
                    minWidth: progresoTaller.porcentaje > 0 ? 8 : 0,
                  }}
                />
              </div>
              <p className="t-body mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {progresoTaller.completados} de {progresoTaller.total} actividades
              </p>

              {/* Módulo actual / siguiente */}
              {moduloActual && (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: 'rgba(2,212,126,0.10)', border: '1px solid rgba(2,212,126,0.2)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-extrabold"
                    style={{ background: 'var(--grama-menta)', color: 'var(--grama-oscuro)' }}>
                    {String(moduloActual.numero).padStart(2, '0')}
                  </div>
                  <div className="min-w-0">
                    <p className="t-body font-bold text-white truncate">{moduloActual.nombre}</p>
                    <p className="overline-label mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {progresoTaller.porcentaje === 0 ? 'Comienza aquí' : 'Continúa aquí'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Ola de transición hero → contenido */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 48 }}>
            <path d="M0,24 C360,52 1080,0 1440,28 L1440,48 L0,48 Z" fill="#f4f8f9" />
          </svg>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 grid lg:grid-cols-3 gap-6" style={{ background: '#f4f8f9' }}>
        {/* Timeline de módulos (2/3) */}
        <div className="lg:col-span-2">
          <h2 className="text-h3 font-extrabold mb-6" style={{ color: 'var(--grama-oscuro)' }}>
            Secuencia de módulos
          </h2>

          <div>
            {modulosLXP.map((modulo, idx) => (
              <ModuloCard
                key={modulo.id}
                modulo={modulo}
                estado={getEstadoModuloLXP(modulo.id)}
                isLast={idx === modulosLXP.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Sidebar derecho (1/3) */}
        <div className="space-y-5">
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

          {/* Resumen de horas */}
          <div className="p-4 rounded-2xl" style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(4,57,65,0.07)' }}>
            <h3 className="text-sm font-extrabold mb-3" style={{ color: 'var(--grama-oscuro)' }}>
              Desglose de horas
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Virtual asíncrono', hours: modulosLXP.reduce((a, m) => a + m.horasAsincrono, 0), color: '#e3f8fb', text: '#045f6c' },
                { label: 'Sincrónico (en vivo)', hours: modulosLXP.reduce((a, m) => a + m.horasSincrono, 0), color: '#fdf8da', text: '#ca8a04' },
                { label: 'Presencial', hours: modulosLXP.reduce((a, m) => a + m.horasPresencial, 0), color: '#d2ffe1', text: '#00c16e' },
              ].map(h => (
                <div key={h.label} className="flex items-center justify-between text-xs">
                  <span className="font-medium" style={{ color: 'var(--grama-oscuro)' }}>{h.label}</span>
                  <span className="font-extrabold px-2.5 py-0.5 rounded-full" style={{ background: h.color, color: h.text }}>
                    {h.hours}h
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: '#e3f8fb' }}>
                <span className="font-bold" style={{ color: 'var(--grama-oscuro)' }}>Total</span>
                <span className="font-extrabold" style={{ color: 'var(--grama-menta)' }}>
                  {modulosLXP.reduce((a, m) => a + m.horasTotal, 0)}h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
