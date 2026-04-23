// src/pages/Landing.tsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Clock, Users, Building2, Briefcase,
  ChevronRight, ChevronLeft, ChevronDown, ArrowRight,
  CheckCircle, Menu, X, Wrench,
} from 'lucide-react'
import { GramaLogo } from '@/components/GramaLogo'
import { useAuth } from '@/contexts/AuthContext'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller } from '@/data/bienesData'
import { modulosLXP } from '@/data/modulosLXP'
// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '10',   label: 'Talleres EPT' },
  { value: '36+',  label: 'Docentes capacitados' },
  { value: '200+', label: 'Fichas descargables' },
  { value: '150h', label: 'Formación híbrida' },
]


const COMMUNITY = [
  { icon: Users,     color: '#02d47e', bg: 'rgba(2,212,126,0.08)',   title: 'Docentes EPT',            desc: 'Domina el uso pedagógico de los equipos de tu taller y mejora tus competencias técnicas.',        cta: 'Ingresar a la plataforma', action: 'app'  },
  { icon: Building2, color: '#045f6c', bg: 'rgba(4,95,108,0.08)',    title: 'Instituciones Educativas', desc: 'Capacitamos a tus docentes para aprovechar al máximo cada equipo EPT especializado.',              cta: 'Escribirnos',              action: 'mail' },
  { icon: Briefcase, color: '#043941', bg: 'rgba(4,57,65,0.08)',     title: 'Coordinadores EPT',       desc: 'Monitorea el avance formativo de tu equipo y garantiza la implementación pedagógica.',             cta: 'Contactar',                action: 'mail' },
]

const NAV_LINKS = [
  { label: 'Nosotros',        href: '#nosotros' },
  { label: 'Talleres',        href: '#talleres' },
  { label: '¿Para quién es?', href: '#comunidad' },
  { label: 'Contacto',        href: '#contacto' },
]

// ── Tangram decorativo ────────────────────────────────────────────────────────
// Las 7 piezas del tangram: 2 triángulos grandes, 1 medio, 2 pequeños, 1 cuadrado, 1 paralelogramo
function Tangram({
  color = '#02d47e',
  opacity = 0.12,
  className = '',
  rotate = 0,
}: {
  color?: string
  opacity?: number
  className?: string
  rotate?: number
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Triángulo grande 1 */}
      <polygon points="0,160 80,80 0,0"         fill={color} fillOpacity={opacity} />
      {/* Triángulo grande 2 */}
      <polygon points="160,0 80,80 160,160"     fill={color} fillOpacity={opacity * 0.7} />
      {/* Triángulo mediano */}
      <polygon points="0,160 80,160 80,80"      fill={color} fillOpacity={opacity * 1.2} />
      {/* Cuadrado (rotado 45°) */}
      <rect x="70" y="30" width="40" height="40" transform="rotate(45 90 50)" fill={color} fillOpacity={opacity * 0.9} />
      {/* Triángulo pequeño 1 */}
      <polygon points="80,80 120,80 120,120"    fill={color} fillOpacity={opacity * 0.8} />
      {/* Triángulo pequeño 2 */}
      <polygon points="80,80 80,120 120,120"    fill={color} fillOpacity={opacity * 0.6} />
      {/* Paralelogramo */}
      <polygon points="120,80 160,80 160,120 120,120" fill={color} fillOpacity={opacity * 0.5} />
    </svg>
  )
}

// ── Hook reveal al hacer scroll ───────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Carrusel horizontal de talleres ──────────────────────────────────────────
function TalleresCarousel({ onOpenModal }: { onOpenModal: (i: number) => void }) {
  const scrollRef  = useRef<HTMLDivElement>(null)
  const speedRef   = useRef(0.7)
  const pausedRef  = useRef(false)
  const rafRef     = useRef<number>()
  const items = [...talleresConfig, ...talleresConfig]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const tick = () => {
      if (!pausedRef.current && el) {
        el.scrollLeft += speedRef.current
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
        if (el.scrollLeft <= 0 && speedRef.current < 0) el.scrollLeft = el.scrollWidth / 2
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #f0fdf6 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f0fdf6 0%, transparent 100%)' }} />

      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: '#043941', color: 'var(--grama-menta)' }}
        onMouseEnter={() => { speedRef.current = -4; pausedRef.current = false }}
        onMouseLeave={() => { speedRef.current = 0.7 }}
      >
        <ChevronLeft size={18} />
      </button>

      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: '#043941', color: 'var(--grama-menta)' }}
        onMouseEnter={() => { speedRef.current = 4; pausedRef.current = false }}
        onMouseLeave={() => { speedRef.current = 0.7 }}
      >
        <ChevronRight size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden px-14 pb-4"
        style={{ scrollbarWidth: 'none' }}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false; speedRef.current = 0.7 }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl overflow-hidden bg-white cursor-pointer group transition-all hover:shadow-xl hover:-translate-y-2"
            style={{ width: 248, border: '1px solid #e3f8fb' }}
            onClick={() => onOpenModal(i % talleresConfig.length)}
          >
            <div className="relative overflow-hidden" style={{ height: 272 }}>
              <img
                src={t.imagen}
                alt={t.nombre}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'brightness(0.82) saturate(0.88)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(4,57,65,0.88) 100%)' }} />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full" style={{ background: `hsl(${t.color})`, color: '#fff' }}>
                  T{String(t.numero).padStart(2, '0')}
                </span>
              </div>
              <Tangram color={`hsl(${t.color})`} opacity={0.3} rotate={15} className="absolute -bottom-3 -right-3 w-20 h-20" />
            </div>
            <div className="p-4.5" style={{ padding: '14px 16px 16px' }}>
              <h3 className="text-sm font-extrabold mb-1.5 leading-snug" style={{ color: 'var(--grama-oscuro)' }}>{t.nombre}</h3>
              <p className="text-xs leading-relaxed line-clamp-2 mb-3.5" style={{ color: '#64748b' }}>{t.descripcion}</p>
              <div className="flex items-center gap-3" style={{ color: '#94a3b8' }}>
                <span className="flex items-center gap-1 text-[10px] font-semibold"><BookOpen size={10} /> 7 módulos</span>
                <span className="flex items-center gap-1 text-[10px] font-semibold"><Clock size={10} /> 150h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Marquee de talleres ───────────────────────────────────────────────────────
function TalleresMarquee() {
  const items = [...talleresConfig, ...talleresConfig]
  return (
    <div className="overflow-hidden py-3" style={{ borderTop: '1px solid rgba(4,57,65,0.07)' }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 shrink-0 text-[11px] font-semibold" style={{ color: 'rgba(4,57,65,0.45)' }}>
            <span className="h-1 w-1 rounded-full" style={{ background: '#02d47e' }} />
            {t.nombre}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Modal carrusel de taller ──────────────────────────────────────────────────
function TallerModal({
  index, dir, onClose, onPrev, onNext, onGoTo,
}: {
  index: number
  dir: 'next' | 'prev'
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onGoTo: (i: number) => void
}) {
  const taller  = talleresConfig[index]
  const todosLos = getBienesByTaller(taller.slug)
  // Equipos representativos: EQUIPOS de INNOVACIÓN primero, luego resto, máx 8
  const equiposInnov = todosLos.filter(b => b.tipo === 'EQUIPOS' && b.zona.includes('INNOVA'))
  const equiposResto = todosLos.filter(b => b.tipo === 'EQUIPOS' && !b.zona.includes('INNOVA'))
  const bienes = [...equiposInnov, ...equiposResto].slice(0, 8)
  const isFirst = index === 0
  const isLast  = index === talleresConfig.length - 1
  const slideClass = dir === 'next' ? 'slide-in-right' : 'slide-in-left'

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in-up"
        style={{ animationDuration: '0.2s' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center md:inset-0 md:items-center md:p-6" onClick={onClose}>
        <div
          className="slide-up-modal bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          style={{ maxHeight: '92vh' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header imagen */}
          <div className="relative h-52 shrink-0 overflow-hidden">
            <img
              key={taller.slug}
              src={taller.imagen}
              alt={taller.nombre}
              className={`w-full h-full object-cover ${slideClass}`}
              style={{ filter: 'brightness(0.75) saturate(0.9)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(4,57,65,0.15) 0%, rgba(4,57,65,0.88) 100%)' }} />

            {/* Cerrar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ background: 'rgba(0,0,0,0.45)' }}
            >
              <X size={14} color="white" />
            </button>

            {/* Tangram mini */}
            <Tangram color={`hsl(${taller.color})`} opacity={0.3} rotate={15} className="absolute -bottom-4 -right-4 w-24 h-24" />

            {/* Info */}
            <div className={`absolute bottom-4 left-5 right-16 ${slideClass}`} key={`info-${taller.slug}`}>
              <span
                className="text-[11px] font-extrabold px-2.5 py-1 rounded-full inline-block mb-1.5"
                style={{ background: `hsl(${taller.color})`, color: '#fff' }}
              >
                T{String(taller.numero).padStart(2, '0')} · {index + 1} de {talleresConfig.length}
              </span>
              <h2 className="text-xl font-extrabold text-white leading-tight">{taller.nombre}</h2>
            </div>
          </div>

          {/* Cuerpo scrollable */}
          <div key={taller.slug} className={`flex-1 overflow-y-auto p-5 space-y-5 ${slideClass}`}>
            {taller.slug === 'taller-general-ept' ? (
              <>
                {/* Descripción extendida para Taller General EPT */}
                <div className="space-y-3">
                  <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                    El <strong style={{ color: 'var(--grama-oscuro)' }}>Taller General EPT</strong> es un espacio transversal de aprendizaje equipado con tecnología de fabricación digital, TICs y recursos pedagógicos de vanguardia. Está diseñado para que los docentes desarrollen proyectos productivos aplicando el enfoque de Design Thinking e innovación.
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                    A diferencia de los talleres especializados, este espacio integra herramientas de múltiples disciplinas: desde la fabricación digital (impresión 3D, corte láser, sublimación) hasta la comunicación audiovisual y el emprendimiento. Es el hub donde convergen ideas, prototipos y aprendizajes de todos los talleres EPT.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Fabricación Digital', 'Design Thinking', 'Emprendimiento', 'Prototipado', 'Proyectos Productivos'].map(tag => (
                      <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#e3f8fb', color: '#045f6c' }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Equipamiento representativo */}
                <div>
                  <p className="overline-label font-extrabold mb-2.5 flex items-center gap-2" style={{ color: 'var(--grama-menta)' }}>
                    <Wrench size={11} /> Equipamiento representativo
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Impresora 3D FDM', 'Cortadora Láser CO₂', 'Escáner 3D', 'Máquina de Sublimación',
                      'Kit de Electrónica', 'Computadoras de Escritorio', 'Cámara con Trípode',
                      'Tablet con Stylus', 'Plotter de Corte', 'Estación de Soldadura',
                    ].map(nombre => (
                      <span
                        key={nombre}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                        style={{ background: '#e3f8fb', color: '#045f6c' }}
                      >
                        {nombre}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Descripción */}
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{taller.descripcion}</p>

                {/* Competencias */}
                {taller.competencias?.length > 0 && (
                  <div>
                    <p className="overline-label font-extrabold mb-2 flex items-center gap-1.5" style={{ color: '#045f6c' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.2 7.8L9 2.5" stroke="#02d47e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Competencias que desarrollarás
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {taller.competencias.slice(0, 4).map((c, i) => (
                        <div key={i} className="flex items-start gap-1.5 px-2 py-1.5 rounded-lg" style={{ background: '#f0fdf6' }}>
                          <span className="h-1.5 w-1.5 rounded-full shrink-0 mt-1" style={{ background: '#02d47e' }} />
                          <span className="text-[10px] leading-snug" style={{ color: 'var(--grama-oscuro)' }}>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ruta de aprendizaje */}
                <div>
                  <p className="overline-label font-extrabold mb-2.5 flex items-center gap-2" style={{ color: 'var(--grama-menta)' }}>
                    <BookOpen size={11} /> Ruta de aprendizaje · 7 módulos · 150h
                  </p>
                  <div className="space-y-1.5">
                    {modulosLXP.map((m, i) => (
                      <div
                        key={m.id}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl"
                        style={{ background: '#f0fdf6' }}
                      >
                        <span className="text-[10px] font-extrabold w-5 shrink-0 text-center" style={{ color: '#94a3b8' }}>M{i}</span>
                        <span className="text-[11px] font-semibold flex-1" style={{ color: 'var(--grama-oscuro)' }}>{m.nombre}</span>
                        <span className="text-[10px] shrink-0 font-medium" style={{ color: '#94a3b8' }}>{m.horasTotal}h</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipamiento */}
                {bienes.length > 0 && (
                  <div>
                    <p className="overline-label font-extrabold mb-2.5 flex items-center gap-2" style={{ color: 'var(--grama-menta)' }}>
                      <Wrench size={11} /> Equipamiento representativo
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {bienes.map(b => (
                        <span
                          key={b.nombre}
                          className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                          style={{ background: '#e3f8fb', color: '#045f6c' }}
                        >
                          {b.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 space-y-3 shrink-0 border-t" style={{ borderColor: '#f0fdf6' }}>
            {/* Dots de posición — clickeables */}
            <div className="flex items-center justify-center gap-1.5">
              {talleresConfig.map((_, i) => (
                <button
                  key={i}
                  onClick={() => i !== index && onGoTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 20 : 6,
                    height: 6,
                    background: i === index ? '#02d47e' : '#e3f8fb',
                    cursor: i === index ? 'default' : 'pointer',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                disabled={isFirst}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-opacity-80 disabled:opacity-30"
                style={{ background: '#f0fdf6', color: 'var(--grama-oscuro)' }}
              >
                <ChevronLeft size={13} /> Anterior
              </button>
              <button
                onClick={onNext}
                disabled={isLast}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-opacity-80 disabled:opacity-30"
                style={{ background: '#f0fdf6', color: 'var(--grama-oscuro)' }}
              >
                Siguiente <ChevronRight size={13} />
              </button>
            </div>

            {/* CTA principal */}
            <a
              href="mailto:contacto@grama.pe"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}
            >
              Solicitar información <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// ── WhatsApp icon (lucide no lo incluye) ─────────────────────────────────────
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.84L.057 23.269a.75.75 0 0 0 .921.921l5.43-1.453A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.51-5.18-1.402l-.371-.221-3.853 1.031 1.031-3.854-.221-.371A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: '¿GRAMA es gratuito para los docentes EPT?',
    a: 'Sí. GRAMA LXP está diseñado para ser accesible para todos los docentes de Educación para el Trabajo. El acceso a la plataforma y sus contenidos no tiene costo para el docente ni para la institución educativa.',
  },
  {
    q: '¿Necesito internet todo el tiempo para usarlo?',
    a: 'Necesitas conexión para ver videos y sesiones en vivo, pero puedes descargar fichas técnicas y manuales en PDF para consultarlos sin internet. La plataforma está optimizada para conexiones lentas.',
  },
  {
    q: '¿Funciona en tablet o celular?',
    a: 'Sí. GRAMA está diseñado para cualquier dispositivo — computadora, tablet o celular. Recomendamos tablet o PC para una mejor experiencia con los videos y fichas de equipamiento.',
  },
  {
    q: '¿Cuánto tiempo toma completar un taller?',
    a: 'Cada taller tiene 7 módulos con aproximadamente 150 horas en total (virtual asíncrono + sesiones en vivo + presencial). Puedes avanzar a tu propio ritmo — no hay fechas de vencimiento para el contenido asíncrono.',
  },
  {
    q: '¿Cómo solicita acceso mi colegio o UGEL?',
    a: 'El acceso institucional se gestiona directamente con nuestro equipo. Escríbenos por WhatsApp y coordinamos la incorporación de tu institución o red educativa en menos de 24 horas.',
  },
]

// ── FAQ Section ───────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const WA_URL = 'https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP+%F0%9F%91%8B'

  return (
    <section className="py-20 px-6" style={{ background: '#f0fdf6' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-14 items-start">

        {/* Acordeón */}
        <div>
          <span className="inline-flex items-center gap-2 overline-label font-extrabold mb-4" style={{ color: 'var(--grama-menta)' }}>
            <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
            Preguntas frecuentes
          </span>
          <h2 className="t-h1 font-extrabold leading-tight mb-10" style={{ color: 'var(--grama-oscuro)' }}>
            Todo lo que necesitas<br />
            <span style={{ color: 'var(--grama-menta)' }}>saber antes de empezar</span>
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  background: open === i ? '#ffffff' : '#ffffff',
                  boxShadow: open === i
                    ? '0 4px 20px rgba(4,57,65,0.10)'
                    : '0 1px 4px rgba(4,57,65,0.05)',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 transition-colors"
                  style={{ background: 'transparent' }}
                >
                  <span
                    className="text-sm font-bold leading-snug"
                    style={{ color: open === i ? 'var(--grama-oscuro)' : '#334155' }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: open === i ? 'var(--grama-oscuro)' : '#f1f5f9',
                      transform: open === i ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    <ChevronDown size={14} style={{ color: open === i ? '#02d47e' : '#94a3b8' }} />
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <div className="h-px mb-4" style={{ background: 'rgba(4,57,65,0.07)' }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card WhatsApp — sticky */}
        <div className="lg:sticky lg:top-8">
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #043941 0%, #032e34 100%)',
              boxShadow: '0 16px 48px rgba(4,57,65,0.22)',
            }}
          >
            {/* Orb decorativo */}
            <div className="absolute pointer-events-none" style={{
              width: 220, height: 220,
              background: 'radial-gradient(circle, rgba(37,211,102,0.12) 0%, transparent 65%)',
              bottom: -40, right: -40,
            }} />

            <div className="relative z-10">
              {/* Ícono */}
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.2)' }}
              >
                <WhatsAppIcon size={22} />
              </div>

              <h3 className="text-lg font-extrabold text-white mb-2 leading-snug">
                ¿Tienes una pregunta<br />que no está aquí?
              </h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Escríbenos directamente y te respondemos en menos de 24 horas. Sin formularios, sin correos.
              </p>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] hover:opacity-95"
                style={{ background: '#25d366', color: '#0a2e0f' }}
              >
                <WhatsAppIcon size={16} />
                Escribir por WhatsApp
              </a>

              <p className="text-center text-[11px] mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Respuesta típica en &lt; 24h · Lun–Vie
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { profile } = useAuth()
  const isLoggedIn = !!profile

  const goToApp = () => navigate('/perfil')

  // Modal carrusel
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [modalDir, setModalDir] = useState<'next' | 'prev'>('next')

  const openModal = (i: number) => { setModalDir('next'); setModalIndex(i) }
  const closeModal = () => setModalIndex(null)
  const goPrev = () => { setModalDir('prev'); setModalIndex(i => Math.max(0, i! - 1)) }
  const goNext = () => { setModalDir('next'); setModalIndex(i => Math.min(talleresConfig.length - 1, i! + 1)) }
  const goTo   = (i: number) => { setModalDir(i > (modalIndex ?? 0) ? 'next' : 'prev'); setModalIndex(i) }

  // Reveal hooks por sección
  const featuresHeaderReveal = useReveal()
  const featuresReveal = useReveal()
  const talleresHeaderReveal = useReveal()
  const talleresReveal = useReveal()
  const comunidadReveal = useReveal()

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#f0fdf6' }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(240,253,246,0.92)', backdropFilter: 'blur(16px)', borderColor: 'rgba(4,57,65,0.08)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GramaLogo variant="dark" size="sm" />
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-xs font-semibold transition-opacity hover:opacity-60" style={{ color: '#043941' }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={goToApp}
                className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.03] hover:shadow-md"
                style={{ background: '#02d47e', color: '#043941' }}
              >
                Ir a la plataforma <ChevronRight size={13} />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.03] hover:shadow-md"
                style={{ background: '#02d47e', color: '#043941' }}
              >
                Iniciar sesión <ChevronRight size={13} />
              </button>
            )}
            <button className="md:hidden p-1.5 rounded-lg" onClick={() => setMobileMenuOpen(o => !o)} style={{ color: '#043941' }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ borderColor: 'rgba(4,57,65,0.08)', background: '#f0fdf6' }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="block text-sm font-semibold" style={{ color: '#043941' }} onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-bold" style={{ background: '#02d47e', color: '#043941' }}>
              Iniciar sesión <ChevronRight size={14} />
            </button>
          </div>
        )}
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#f0fdf6', paddingTop: 56, minHeight: '92vh' }}>

        {/* ── Small decorative shapes (con float) ── */}

        {/* Green + cross, top-left */}
        <svg className="absolute pointer-events-none float-a" width="60" height="60" viewBox="0 0 60 60"
          style={{ top: '13%', left: '4.5%', animationDuration: '14s' }}>
          <rect x="23" y="0" width="14" height="60" rx="7" fill="#02d47e" />
          <rect x="0" y="23" width="60" height="14" rx="7" fill="#02d47e" />
        </svg>

        {/* Yellow shield badge, top-left */}
        <svg className="absolute pointer-events-none float-b" width="90" height="108" viewBox="0 0 90 108"
          style={{ top: '4%', left: '10%', animationDuration: '20s' }}>
          <path d="M 0 0 L 90 0 L 90 68 Q 45 108 0 68 Z" fill="#f8ee91" />
        </svg>

        {/* Small yellow rotated square, left edge */}
        <div className="absolute pointer-events-none float-d" style={{
          left: '3.5%', top: '55%',
          width: 38, height: 38, background: '#f8ee91', borderRadius: 7,
          transform: 'rotate(24deg)', animationDuration: '12s',
        }} />

        {/* Small lilac bar, bottom-right */}
        <div className="absolute pointer-events-none float-c" style={{
          bottom: '17%', right: '2%',
          width: 180, height: 20, borderRadius: 10, background: '#d4c4fc',
          animationDuration: '15s',
        }} />

        {/* ── Large corner shapes (sin animación rotatoria — solo posición fija) ── */}

        {/* Dark teal bar, top-center partially cropped */}
        <div className="absolute pointer-events-none" style={{
          top: -10, left: '50%', transform: 'translateX(-10%)',
          width: 200, height: 30, borderRadius: 15, background: '#043941',
        }} />

        {/* Large dark teal right-pointing triangle — upper-right corner */}
        <svg className="absolute pointer-events-none" viewBox="0 0 300 380"
          style={{ top: 0, right: 0, width: 'clamp(200px, 22vw, 320px)', height: 'auto' }}>
          <polygon points="300,0 300,380 0,190" fill="#043941" />
        </svg>

        {/* Large lilac right-pointing triangle — right side, below dark teal */}
        <svg className="absolute pointer-events-none" viewBox="0 0 200 280"
          style={{ top: '36%', right: 0, width: 'clamp(140px, 16vw, 220px)', height: 'auto' }}>
          <polygon points="200,0 200,280 0,140" fill="#d4c4fc" />
        </svg>

        {/* Dark teal triangle — lower-left */}
        <svg className="absolute pointer-events-none" viewBox="0 0 180 160"
          style={{ bottom: '14%', left: 0, width: 'clamp(130px, 14vw, 200px)', height: 'auto' }}>
          <polygon points="0,0 0,160 180,80" fill="#043941" />
        </svg>

        {/* Large mint triangle — bottom-left corner */}
        <svg className="absolute pointer-events-none" viewBox="0 0 420 260"
          style={{ bottom: 0, left: 0, width: 'clamp(260px, 30vw, 450px)', height: 'auto' }}>
          <polygon points="0,260 420,260 200,0" fill="#b8edd0" />
        </svg>

        {/* Background mint hexagon, center-right (sutil) */}
        <div className="absolute pointer-events-none" style={{
          right: '6%', top: '8%',
          width: 'clamp(200px, 28vw, 380px)', height: 'clamp(200px, 28vw, 380px)',
          background: 'rgba(184,237,208,0.28)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }} />

        {/* ── Hero content ── */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          style={{ paddingTop: 'clamp(3.5rem, 10vh, 7rem)' }}>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-in-up"
            style={{ background: 'rgba(4,57,65,0.06)', border: '1px solid rgba(4,57,65,0.14)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: '#02d47e' }} />
            <span className="font-bold tracking-widest uppercase" style={{ fontSize: 11, color: '#043941', letterSpacing: '0.09em' }}>
              Plataforma Educativa · Docentes · Alumnos · Directores
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-black leading-[1.05] mb-6 animate-fade-in-up stagger-2"
            style={{ fontSize: 'clamp(3.4rem, 9.5vw, 8rem)', letterSpacing: '-0.035em', color: '#043941' }}
          >
            Tu plataforma<br />
            <span style={{
              background: '#02d47e', color: '#043941',
              borderRadius: 20, padding: '4px 32px 8px',
              display: 'inline-block', lineHeight: 1.2,
            }}>
              educativa
            </span>
            <br />para formación.
          </h1>

          {/* Subtitle */}
          <p className="leading-relaxed mb-10 mx-auto max-w-md animate-fade-in-up stagger-3"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'rgba(4,57,65,0.6)' }}>
            Una plataforma para{' '}
            <strong style={{ color: '#043941' }}>docentes, alumnos y directores</strong>{' '}
            EPT. Formación especializada, conectada y gratuita para toda la comunidad educativa del Perú.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up stagger-4">
            <button
              onClick={isLoggedIn ? goToApp : () => navigate('/login')}
              className="flex items-center gap-2 px-9 py-4 rounded-full font-bold transition-all hover:scale-[1.03] hover:shadow-lg"
              style={{ fontSize: 15, background: '#02d47e', color: '#043941' }}
            >
              {isLoggedIn ? 'Ir a la plataforma' : 'Comenzar ahora'}
              <ArrowRight size={16} />
            </button>
            <a
              href="#talleres"
              className="flex items-center gap-2 px-9 py-4 rounded-full font-bold transition-all"
              style={{ fontSize: 15, color: '#043941', border: '2px solid rgba(4,57,65,0.22)', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(4,57,65,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Explorar talleres
              <ChevronRight size={16} />
            </a>
          </div>

        </div>

        {/* ── Stats bar — white strip ── */}
        <div className="relative z-10 mt-20" style={{ borderTop: '1px solid rgba(4,57,65,0.08)', background: '#ffffff' }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.value}
                  className="flex flex-col items-center py-8 px-4"
                  style={{ borderRight: i < 3 ? '1px solid rgba(4,57,65,0.07)' : 'none' }}
                >
                  <span className="font-black leading-none mb-2" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.2rem)', color: '#043941' }}>{s.value}</span>
                  <span className="font-bold text-center uppercase tracking-wider" style={{ fontSize: 10, color: 'rgba(4,57,65,0.4)', letterSpacing: '0.1em' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <TalleresMarquee />

      </section>

      {/* ══ POR QUÉ GRAMA ═══════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-20 px-6 relative overflow-hidden" style={{ background: '#ffffff' }}>
        {/* Tangramas estáticos de fondo */}
        <Tangram color="#02d47e" opacity={0.04} rotate={30}  className="absolute w-96 h-96 -right-20 top-0 pointer-events-none" />
        <Tangram color="#043941" opacity={0.05} rotate={-18} className="absolute w-72 h-72 -left-16 bottom-8 pointer-events-none" />

        {/* Shapes — lateral izquierdo */}
        <div className="absolute pointer-events-none float-b" style={{ width: 14, height: 72, borderRadius: 8, background: '#f8ee91', opacity: 0.7, top: '14%', left: '2%', transform: 'rotate(-12deg)', animationDuration: '17s' }} />
        <svg viewBox="0 0 40 40" className="absolute pointer-events-none float-a" style={{ width: 32, height: 32, top: '55%', left: '2%', animationDuration: '13s', opacity: 0.55 }}>
          <rect x="12" y="0" width="10" height="40" rx="4" fill="#02d47e" /><rect x="0" y="12" width="40" height="10" rx="4" fill="#02d47e" />
        </svg>
        <svg viewBox="0 0 40 36" className="absolute pointer-events-none float-c" style={{ width: 30, height: 26, top: '78%', left: '1.5%', animationDuration: '20s', opacity: 0.75 }}>
          <polygon points="20,0 40,36 0,36" fill="#d4c4fc" />
        </svg>

        {/* Shapes — lateral derecho */}
        <div className="absolute pointer-events-none float-c" style={{ width: 60, height: 12, borderRadius: 8, background: '#b8edd0', opacity: 0.75, top: '10%', right: '1.5%', transform: 'rotate(8deg)', animationDuration: '15s' }} />
        <div className="absolute pointer-events-none float-a" style={{ width: 12, height: 52, borderRadius: 8, background: '#043941', opacity: 0.13, top: '42%', right: '2%', transform: 'rotate(-5deg)', animationDuration: '11s' }} />
        <svg viewBox="0 0 50 44" className="absolute pointer-events-none float-b" style={{ width: 38, height: 33, top: '70%', right: '1.5%', animationDuration: '19s', opacity: 0.7 }}>
          <polygon points="25,0 50,44 0,44" fill="#f8ee91" />
        </svg>

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div
            ref={featuresHeaderReveal.ref}
            className="mb-12"
            style={{ opacity: featuresHeaderReveal.visible ? 1 : 0, transform: featuresHeaderReveal.visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <span className="inline-flex items-center gap-2 overline-label font-extrabold mb-4" style={{ color: 'var(--grama-menta)' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              ¿Por qué GRAMA?
            </span>
            <h2 className="t-h1 font-extrabold leading-tight" style={{ color: 'var(--grama-oscuro)' }}>
              El conocimiento técnico<br />
              <span style={{ color: 'var(--grama-menta)' }}>no debería perderse</span>
            </h2>
          </div>

          {/* Layout editorial: [timeline 3fr] | [foto tall 2fr] */}
          <div
            ref={featuresReveal.ref}
            className="grid lg:grid-cols-[3fr_2fr] gap-8 items-stretch"
            style={{
              opacity: featuresReveal.visible ? 1 : 0,
              transform: featuresReveal.visible ? 'none' : 'translateY(30px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >

            {/* ── Columna izquierda: los 3 pasos del timeline ── */}
            <div className="flex flex-col gap-4">

              {/* EL PROBLEMA */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center shrink-0" style={{ width: 44 }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                    style={{ background: '#1e3a3f', border: '2px solid rgba(2,212,126,0.25)', boxShadow: '0 0 0 4px rgba(2,212,126,0.06)' }}>
                    🏫
                  </div>
                  <div className="w-px flex-1 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(4,57,65,0.18), rgba(4,57,65,0.06))', minHeight: 28 }} />
                </div>
                <div className="flex-1 pb-2">
                  <p className="overline-label mb-2 flex items-center gap-1.5" style={{ color: 'rgba(4,57,65,0.45)' }}>
                    <span className="w-1 h-1 rounded-full inline-block" style={{ background: 'rgba(4,57,65,0.35)' }} />
                    EL PROBLEMA
                  </p>
                  <div className="rounded-2xl p-6" style={{ background: '#ffffff', border: '1.5px solid rgba(4,57,65,0.14)', boxShadow: '0 2px 12px rgba(4,57,65,0.06)' }}>
                    <h3 className="font-extrabold leading-snug mb-3" style={{ fontSize: '1.1rem', color: 'var(--grama-oscuro)' }}>
                      Los equipos llegan.<br />
                      La formación, <span style={{ color: '#e11d48' }}>no.</span>
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>
                      Los talleres técnicos reciben equipos nuevos pero los docentes no tienen cómo aprender a usarlos. Cuando el profesor rota, el conocimiento desaparece con él.
                    </p>
                  </div>
                </div>
              </div>

              {/* LA SOLUCIÓN */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center shrink-0" style={{ width: 44 }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                    style={{ background: '#d0f0f5', border: '2px solid rgba(4,95,108,0.22)', boxShadow: '0 0 0 4px rgba(4,95,108,0.06)' }}>
                    💻
                  </div>
                  <div className="w-px flex-1 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(4,95,108,0.18), rgba(4,95,108,0.04))', minHeight: 28 }} />
                </div>
                <div className="flex-1 pb-2">
                  <p className="overline-label mb-2 flex items-center gap-1.5" style={{ color: '#045f6c' }}>
                    <span className="w-1 h-1 rounded-full inline-block" style={{ background: '#045f6c' }} />
                    LA SOLUCIÓN
                  </p>
                  <div className="rounded-2xl p-6" style={{ background: '#edf7f8', border: '1.5px solid rgba(4,95,108,0.12)' }}>
                    <h3 className="font-extrabold leading-snug mb-3" style={{ fontSize: '1.1rem', color: 'var(--grama-oscuro)' }}>
                      Una ruta híbrida diseñada<br />para tu taller
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#4a7a82' }}>
                      7 módulos con video, fichas descargables y sesiones en vivo. A tu ritmo, adaptado a tu especialidad EPT, desde cualquier dispositivo.
                    </p>
                  </div>
                </div>
              </div>

              {/* EL RESULTADO */}
              <div className="flex gap-4">
                <div className="shrink-0" style={{ width: 44 }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg"
                    style={{ background: '#fef3c7', border: '2px solid rgba(202,138,4,0.28)', boxShadow: '0 0 0 4px rgba(202,138,4,0.06)' }}>
                    🎯
                  </div>
                </div>
                <div className="flex-1">
                  <p className="overline-label mb-2 flex items-center gap-1.5" style={{ color: '#92400e' }}>
                    <span className="w-1 h-1 rounded-full inline-block" style={{ background: '#ca8a04' }} />
                    EL RESULTADO
                  </p>
                  <div className="rounded-2xl p-6" style={{ background: '#fef9e7', border: '1.5px solid rgba(202,138,4,0.18)' }}>
                    <h3 className="font-extrabold leading-snug mb-3" style={{ fontSize: '1.1rem', color: 'var(--grama-oscuro)' }}>
                      Autonomía docente<br />garantizada
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#78350f' }}>
                      Al terminar dominas el uso pedagógico de cada equipo y puedes replicarlo con tus estudiantes — con confianza real.
                    </p>
                  </div>
                </div>
              </div>

            </div>{/* ── fin columna timeline ── */}

            {/* ── Columna derecha: foto tall editorial ── */}
            <div className="hidden lg:block rounded-3xl overflow-hidden relative" style={{ minHeight: 420 }}>
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80"
                alt="Docente EPT logrando su autonomía formativa"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay degradado inferior con quote */}
              <div className="absolute inset-0 flex flex-col justify-end p-6"
                style={{ background: 'linear-gradient(to top, rgba(4,57,65,0.82) 0%, rgba(4,57,65,0.2) 50%, transparent 100%)' }}>
                <p className="text-sm font-semibold text-white leading-snug mb-1">
                  "Ahora puedo enseñar con los equipos<br />— y mis estudiantes lo notan."
                </p>
                <p className="text-xs" style={{ color: 'rgba(2,212,126,0.85)' }}>Docente EPT · Lima Norte</p>
              </div>
            </div>

          </div>{/* ── fin grid ── */}
        </div>
      </section>

      {/* ══ TALLERES ════════════════════════════════════════════════════════ */}
      <section id="talleres" className="py-16 px-6 relative overflow-hidden" style={{ background: '#f0fdf6' }}>
        <Tangram color="#043941" opacity={0.025} rotate={-15} className="absolute w-80 h-80 -left-10 bottom-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div
            ref={talleresHeaderReveal.ref}
            className="text-center max-w-2xl mx-auto mb-10"
            style={{ opacity: talleresHeaderReveal.visible ? 1 : 0, transform: talleresHeaderReveal.visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <span className="inline-flex items-center gap-2 overline-label font-extrabold mb-3" style={{ color: 'var(--grama-menta)' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              Especialidades disponibles
            </span>
            <h2 className="t-h1 font-extrabold leading-tight mb-3" style={{ color: 'var(--grama-oscuro)' }}>
              {talleresConfig.length} especialidades técnicas
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Haz clic en cualquier taller para ver su ruta de aprendizaje y equipamiento.
            </p>
          </div>

          <div
            ref={talleresReveal.ref}
            className="mb-12"
            style={{ opacity: talleresReveal.visible ? 1 : 0, transform: talleresReveal.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <TalleresCarousel onOpenModal={openModal} />
          </div>

          <div className="text-center">
            <button
              onClick={goToApp}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}
            >
              Acceder a la plataforma completa
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ COMUNIDAD ═══════════════════════════════════════════════════════ */}
      <section id="comunidad" className="py-16 px-6 relative overflow-hidden" style={{ background: '#ffffff' }}>
        {/* Tangramas fijos — laterales */}
        <Tangram color="#02d47e" opacity={0.13} rotate={60}  className="absolute w-96 h-96 -right-12 -top-4 pointer-events-none" />
        <Tangram color="#043941" opacity={0.08} rotate={-25} className="absolute w-72 h-72 -left-10 bottom-0 pointer-events-none" />
        <Tangram color="#02d47e" opacity={0.06} rotate={10}  className="absolute w-48 h-48 left-4 top-4 pointer-events-none" />
        {/* Piezas flotantes — izquierda */}
        <svg viewBox="0 0 60 60" className="absolute pointer-events-none float-b" style={{ width:52, height:52, top:'18%', left:'4%', animationDuration:'20s' }}>
          <polygon points="30,0 60,60 0,60" fill="#02d47e" fillOpacity={0.16} />
        </svg>
        <svg viewBox="0 0 40 40" className="absolute pointer-events-none float-a" style={{ width:34, height:34, bottom:'25%', left:'7%', animationDuration:'14s' }}>
          <rect x="3" y="3" width="34" height="34" transform="rotate(15 20 20)" fill="#043941" fillOpacity={0.10} />
        </svg>
        {/* Piezas flotantes — derecha */}
        <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-c" style={{ width:42, height:42, bottom:'22%', right:'5%', animationDuration:'17s' }}>
          <polygon points="25,0 50,50 0,50" fill="#02d47e" fillOpacity={0.14} />
        </svg>
        <svg viewBox="0 0 60 60" className="absolute pointer-events-none float-d" style={{ width:46, height:46, top:'14%', right:'8%', animationDuration:'11s' }}>
          <polygon points="0,60 30,0 60,60" fill="#043941" fillOpacity={0.08} />
        </svg>

        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 overline-label font-extrabold mb-3" style={{ color: 'var(--grama-menta)' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              Para toda la comunidad
            </span>
            <h2 className="t-h1 font-extrabold leading-tight mb-3" style={{ color: 'var(--grama-oscuro)' }}>
              Diseñado para toda la comunidad EPT
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              GRAMA sirve a toda la comunidad EPT.
            </p>
          </div>

          <div ref={comunidadReveal.ref} className="grid md:grid-cols-3 gap-6">
            {COMMUNITY.map((c, i) => (
              <div
                key={c.title}
                className="group relative p-7 rounded-3xl border flex flex-col overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{
                  borderColor: '#e3f8fb',
                  background: '#ffffff',
                  opacity: comunidadReveal.visible ? 1 : 0,
                  transform: comunidadReveal.visible ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                }}
              >
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: c.bg }}>
                  <c.icon size={22} style={{ color: c.color }} />
                </div>
                <h3 className="text-base font-extrabold mb-2" style={{ color: 'var(--grama-oscuro)' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#64748b' }}>{c.desc}</p>
                <button
                  onClick={c.action === 'app' ? goToApp : () => window.location.href = 'mailto:contacto@grama.pe'}
                  className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-60 self-start"
                  style={{ color: c.color }}
                >
                  {c.cta} <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-14 px-6" style={{ background: '#f0fdf6' }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}
          >
            {/* Tangram decorativo en el CTA — fijos */}
            <Tangram color="#02d47e" opacity={0.22} rotate={20}  className="absolute -top-10 -right-10 w-[22rem] h-[22rem] pointer-events-none" />
            <Tangram color="#ffffff" opacity={0.09} rotate={-30} className="absolute -bottom-10 -left-10 w-64 h-64 pointer-events-none" />
            <Tangram color="#02d47e" opacity={0.10} rotate={55}  className="absolute top-1/2 left-1/4 w-36 h-36 pointer-events-none" />
            <div className="absolute pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(2,212,126,0.14) 0%, transparent 65%)', right: -100, top: -100 }} />

            {/* Piezas flotantes */}
            <svg viewBox="0 0 80 80" className="absolute pointer-events-none float-a" style={{ width:72, height:72, top:'10%', right:'28%', animationDuration:'15s' }}>
              <polygon points="0,80 40,0 80,80" fill="#02d47e" fillOpacity={0.22} />
            </svg>
            <svg viewBox="0 0 60 60" className="absolute pointer-events-none float-b" style={{ width:52, height:52, bottom:'12%', right:'38%', animationDuration:'19s' }}>
              <polygon points="30,0 60,60 0,60" fill="#ffffff" fillOpacity={0.10} />
            </svg>
            <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-c" style={{ width:44, height:44, top:'20%', left:'18%', animationDuration:'12s' }}>
              <rect x="4" y="4" width="42" height="42" transform="rotate(20 25 25)" fill="#02d47e" fillOpacity={0.18} />
            </svg>
            <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-d" style={{ width:38, height:38, bottom:'18%', left:'38%', animationDuration:'10s' }}>
              <polygon points="25,0 50,50 0,50" fill="#ffffff" fillOpacity={0.08} />
            </svg>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left max-w-lg">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-6" style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.25)' }}>
                  <CheckCircle size={22} style={{ color: 'var(--grama-menta)' }} />
                </div>
                <h2 className="t-h1 font-extrabold text-white mb-3">
                  Tu taller ya está equipado.<br />Ahora falta que lo domines.
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Inicia tu ruta de aprendizaje con GRAMA y conviértete en el referente pedagógico de tu especialidad técnica.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <button
                  onClick={goToApp}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                  style={{ background: '#02d47e', color: 'var(--grama-oscuro)' }}
                >
                  Ingresar a la plataforma <ArrowRight size={15} />
                </button>
                <a
                  href="https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP+%F0%9F%91%8B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: 'rgba(37,211,102,0.15)', color: '#25d366', border: '1px solid rgba(37,211,102,0.25)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.15)')}
                >
                  <WhatsAppIcon size={15} /> Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MODAL CARRUSEL ══════════════════════════════════════════════════ */}
      {modalIndex !== null && (
        <TallerModal
          index={modalIndex}
          dir={modalDir}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          onGoTo={goTo}
        />
      )}

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#043941' }} className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <GramaLogo variant="light" size="sm" />
              <p className="text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Programa MSE-SFT · Perú
              </p>
            </div>
            <nav className="flex flex-wrap gap-6">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © {new Date().getFullYear()} GRAMA Proyectos Educativos · Todos los derechos reservados
            </p>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Plataforma TSF · Programa MIE-EPT
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
