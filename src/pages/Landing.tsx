// src/pages/Landing.tsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Clock, Award, Users, Building2, Briefcase,
  Video, FileText, ChevronRight, ChevronLeft, ArrowRight,
  Layers, Package, CheckCircle, Mail, Menu, X, Wrench,
} from 'lucide-react'
import { GramaLogo } from '@/components/GramaLogo'
import { useAuth } from '@/contexts/AuthContext'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller } from '@/data/bienesData'
import { modulosLXP } from '@/data/modulosLXP'

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '9',    label: 'Talleres EPT' },
  { value: '36+',  label: 'Docentes capacitados' },
  { value: '200+', label: 'Fichas descargables' },
  { value: '150h', label: 'Formación híbrida' },
]

const FEATURES = [
  {
    icon: Package,
    overline: 'El problema',
    title: 'El conocimiento técnico se queda en las cajas',
    desc: 'Los equipos llegan al taller pero los docentes no reciben formación para usarlos. El conocimiento es presencial, único e irrecuperable: cuando el docente rota, todo se pierde.',
    accent: true,
  },
  {
    icon: Layers,
    overline: 'Nuestra solución',
    title: 'Una ruta de aprendizaje híbrida diseñada para ti',
    desc: 'Accede a 7 módulos formativos con contenido asíncrono, sesiones en vivo y práctica presencial. Aprende sobre cada equipo a tu ritmo, desde cualquier lugar y cuando puedas.',
    accent: false,
  },
  {
    icon: Award,
    overline: 'El resultado',
    title: 'Autonomía docente garantizada al finalizar',
    desc: 'Al completar la ruta, dominas el uso pedagógico de cada equipo de tu taller y puedes replicar ese aprendizaje con tus estudiantes — con confianza y sin depender de nadie.',
    accent: false,
  },
]

const PRODUCTS = [
  { icon: Video,    title: 'Acceso asíncrono',      desc: 'Videos + lecturas + fichas disponibles 24/7' },
  { icon: FileText, title: 'Repositorio completo',   desc: 'Manuales, fichas IPRC y protocolos descargables' },
  { icon: Clock,    title: 'Acompañamiento en vivo', desc: 'Sesiones sincrónicas con expertos por taller' },
]

const COMMUNITY = [
  { icon: Users,     color: '#02d47e', bg: 'rgba(2,212,126,0.08)',   title: 'Docentes EPT',            desc: 'Accede a la ruta de aprendizaje, domina el uso pedagógico de los equipos y mejora tus competencias técnicas.', cta: 'Ingresar a la plataforma', action: 'app' },
  { icon: Building2, color: '#045f6c', bg: 'rgba(4,95,108,0.08)',    title: 'Instituciones Educativas', desc: 'Si tu IE ya cuenta con talleres EPT equipados, GRAMA capacita a tus docentes para entender y aprovechar al máximo cada equipo especializado.', cta: 'Escribirnos',              action: 'mail' },
  { icon: Briefcase, color: '#043941', bg: 'rgba(4,57,65,0.08)',     title: 'Coordinadores EPT',       desc: 'Gestiona el avance formativo de tu equipo docente, monitorea el progreso y garantiza la implementación pedagógica.', cta: 'Contactar',            action: 'mail' },
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
        style={{ background: 'linear-gradient(to right, #f0faf5 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f0faf5 0%, transparent 100%)' }} />

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
    <div className="overflow-hidden py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 shrink-0 text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
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
                    <div key={i} className="flex items-start gap-1.5 px-2 py-1.5 rounded-lg" style={{ background: '#f0faf5' }}>
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
                    style={{ background: '#f0faf5' }}
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
          </div>

          {/* Footer */}
          <div className="p-4 space-y-3 shrink-0 border-t" style={{ borderColor: '#f0faf5' }}>
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
                style={{ background: '#f0faf5', color: 'var(--grama-oscuro)' }}
              >
                <ChevronLeft size={13} /> Anterior
              </button>
              <button
                onClick={onNext}
                disabled={isLast}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-opacity-80 disabled:opacity-30"
                style={{ background: '#f0faf5', color: 'var(--grama-oscuro)' }}
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
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#ffffff' }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(4,57,65,0.08)' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GramaLogo variant="dark" size="sm" />
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-xs font-semibold transition-opacity hover:opacity-60" style={{ color: 'var(--grama-oscuro)' }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={goToApp}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
                style={{ background: '#02d47e', color: 'var(--grama-oscuro)' }}
              >
                Ir a la plataforma <ChevronRight size={13} />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
                style={{ background: '#02d47e', color: 'var(--grama-oscuro)' }}
              >
                Iniciar sesión <ChevronRight size={13} />
              </button>
            )}
            <button className="md:hidden p-1.5 rounded-lg" onClick={() => setMobileMenuOpen(o => !o)} style={{ color: 'var(--grama-oscuro)' }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ borderColor: 'rgba(4,57,65,0.08)', background: '#ffffff' }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="block text-sm font-semibold" style={{ color: 'var(--grama-oscuro)' }} onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold" style={{ background: '#02d47e', color: 'var(--grama-oscuro)' }}>
              Iniciar sesión <ChevronRight size={14} />
            </button>
          </div>
        )}
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-16" style={{ background: '#f0faf5' }}>
        {/* Patrón GRAMA — sutil sobre fondo claro */}
        <div className="absolute inset-0 grama-pattern opacity-60" />

        {/* Tangram decorativo — esquinas fijas, opacidad reducida para fondo claro */}
        <Tangram color="#02d47e" opacity={0.07} rotate={15}  className="absolute w-80 h-80 -top-8 -right-8" />
        <Tangram color="#02d47e" opacity={0.05} rotate={-20} className="absolute w-64 h-64 bottom-16 -left-8" />
        <Tangram color="#043941" opacity={0.03} rotate={45}  className="absolute w-48 h-48 top-1/2 left-1/3" />

        {/* Piezas individuales del tangram flotando — tonos suaves sobre claro */}
        <svg viewBox="0 0 80 80" className="absolute pointer-events-none float-a" style={{ width:70, height:70, top:'12%', left:'6%', animationDuration:'14s' }}>
          <polygon points="0,80 40,0 80,80" fill="#02d47e" fillOpacity={0.10} />
        </svg>
        <svg viewBox="0 0 60 60" className="absolute pointer-events-none float-b" style={{ width:50, height:50, top:'48%', left:'12%', animationDuration:'18s' }}>
          <polygon points="30,0 60,60 0,60" fill="#043941" fillOpacity={0.06} />
        </svg>
        <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-c" style={{ width:42, height:42, top:'6%', left:'40%', animationDuration:'11s' }}>
          <rect x="4" y="4" width="42" height="42" transform="rotate(20 25 25)" fill="#02d47e" fillOpacity={0.08} />
        </svg>
        <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-d" style={{ width:38, height:38, top:'20%', right:'20%', animationDuration:'9s' }}>
          <polygon points="25,0 50,50 0,50" fill="#02d47e" fillOpacity={0.09} />
        </svg>
        <svg viewBox="0 0 80 40" className="absolute pointer-events-none float-a" style={{ width:64, height:32, top:'58%', right:'15%', animationDuration:'16s' }}>
          <polygon points="20,0 80,0 60,40 0,40" fill="#043941" fillOpacity={0.05} />
        </svg>
        <svg viewBox="0 0 80 80" className="absolute pointer-events-none float-b" style={{ width:58, height:58, bottom:'15%', right:'6%', animationDuration:'13s' }}>
          <polygon points="0,0 80,40 0,80" fill="#02d47e" fillOpacity={0.07} />
        </svg>
        <svg viewBox="0 0 40 40" className="absolute pointer-events-none float-c" style={{ width:34, height:34, bottom:'28%', left:'30%', animationDuration:'21s' }}>
          <polygon points="20,0 40,40 0,40" fill="#043941" fillOpacity={0.06} />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-14 lg:pt-24 lg:pb-16">
          {/* Grid hero: texto izq, visual der */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

            {/* Columna texto */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-in-up stagger-1" style={{ background: 'rgba(2,212,126,0.10)', border: '1px solid rgba(2,212,126,0.22)' }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#02d47e' }} />
                <span className="overline-label font-extrabold" style={{ color: 'var(--grama-menta)' }}>
                  Plataforma Nacional · Talleres EPT · MINEDU Perú
                </span>
              </div>

              <h1 className="t-hero font-extrabold leading-[1.05] mb-6 animate-fade-in-up stagger-2" style={{ letterSpacing: '-0.03em', color: 'var(--grama-oscuro)' }}>
                Potenciamos la{' '}
                <span style={{ color: 'var(--grama-menta)' }}>educación técnica</span>
                {' '}del Perú
              </h1>

              <p className="text-sm leading-loose mb-10 max-w-lg animate-fade-in-up stagger-3" style={{ color: 'var(--tc-secondary)' }}>
                GRAMA acompaña a docentes EPT en la implementación y dominio pedagógico de talleres técnicos especializados — desde cualquier lugar, a tu ritmo.
              </p>

              <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-4">
                <button
                  onClick={isLoggedIn ? goToApp : () => navigate('/login')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] hover:shadow-lg"
                  style={{ background: '#02d47e', color: 'var(--grama-oscuro)' }}
                >
                  {isLoggedIn ? 'Ir a la plataforma' : 'Comenzar ahora'}
                  <ArrowRight size={15} />
                </button>
                <a
                  href="#talleres"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: 'transparent', color: 'var(--grama-oscuro)', border: '1.5px solid rgba(4,57,65,0.18)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(4,57,65,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  Explorar talleres
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>

            {/* Columna visual — marco de plataforma */}
            <div className="hidden lg:flex items-center justify-center animate-fade-in-up stagger-3">
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  background: '#ffffff',
                  border: '1.5px solid rgba(4,57,65,0.09)',
                  boxShadow: '0 24px 64px rgba(4,57,65,0.10), 0 4px 16px rgba(4,57,65,0.06)',
                  aspectRatio: '16/10',
                }}
              >
                {/* Barra de navegador simulada */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ background: '#f8fafc', borderColor: 'rgba(4,57,65,0.07)' }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fca5a5' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fde68a' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#bbf7d0' }} />
                  <div className="ml-3 flex-1 h-5 rounded-md flex items-center px-3" style={{ background: '#f1f5f9', maxWidth: 200 }}>
                    <span className="text-[10px] font-medium" style={{ color: '#94a3b8' }}>grama.edu.pe/taller/…</span>
                  </div>
                </div>
                {/* Contenido — composición alusiva a la plataforma */}
                <div className="flex h-full" style={{ background: '#f0faf5' }}>
                  {/* Sidebar mini */}
                  <div className="w-14 shrink-0 flex flex-col items-center py-4 gap-3" style={{ background: '#043941' }}>
                    <div className="w-7 h-7 rounded-lg" style={{ background: 'rgba(2,212,126,0.25)' }} />
                    {[0,1,2].map(i => (
                      <div key={i} className="w-6 h-6 rounded-md" style={{ background: i === 0 ? 'rgba(2,212,126,0.18)' : 'rgba(255,255,255,0.06)' }} />
                    ))}
                  </div>
                  {/* Content area */}
                  <div className="flex-1 p-4 flex flex-col gap-3">
                    <div className="h-4 rounded-md w-2/5" style={{ background: 'rgba(4,57,65,0.10)' }} />
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      {[1,0,0,0,1,0].map((active, i) => (
                        <div key={i} className="rounded-xl" style={{ background: active ? 'rgba(2,212,126,0.12)' : '#ffffff', border: `1.5px solid ${active ? 'rgba(2,212,126,0.25)' : 'rgba(4,57,65,0.07)'}` }} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 rounded-lg flex-1" style={{ background: '#02d47e' }} />
                      <div className="h-7 rounded-lg w-20" style={{ background: 'rgba(4,57,65,0.07)' }} />
                    </div>
                  </div>
                </div>
                {/* Badge overlay */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(4,57,65,0.85)', backdropFilter: 'blur(8px)' }}>
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#02d47e' }} />
                  <span className="text-[10px] font-bold text-white">Plataforma activa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats band — sobre fondo claro */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: 'rgba(4,57,65,0.06)', border: '1px solid rgba(4,57,65,0.07)' }}>
            {STATS.map(s => (
              <div key={s.value} className="flex flex-col items-center py-6 px-4" style={{ background: '#ffffff' }}>
                <span className="font-extrabold leading-none mb-1.5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--grama-oscuro)' }}>{s.value}</span>
                <span className="text-xs font-medium text-center" style={{ color: 'rgba(4,57,65,0.45)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee tickers */}
        <TalleresMarquee />
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-28 px-6 relative overflow-hidden">
        {/* Tangram fondo sutil */}
        <Tangram color="#02d47e" opacity={0.035} rotate={30} className="absolute w-96 h-96 -right-20 top-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div
            ref={featuresHeaderReveal.ref}
            className="max-w-xl mb-16"
            style={{ opacity: featuresHeaderReveal.visible ? 1 : 0, transform: featuresHeaderReveal.visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <span className="inline-flex items-center gap-2 overline-label font-extrabold mb-3" style={{ color: 'var(--grama-menta)' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              ¿Por qué GRAMA?
            </span>
            <h2 className="t-h1 font-extrabold leading-tight mb-3" style={{ color: 'var(--grama-oscuro)' }}>
              El conocimiento no debería perderse
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Transformamos la capacitación presencial y efímera en un ecosistema híbrido de aprendizaje accesible, transferible y duradero.
            </p>
          </div>

          {/* Features — 3 cards homologadas */}
          <div ref={featuresReveal.ref} className="grid md:grid-cols-3 gap-5 mb-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group relative p-7 rounded-3xl border overflow-hidden"
                style={{
                  borderColor: 'rgba(2,212,126,0.25)',
                  background: 'linear-gradient(145deg, #f0fdf9 0%, #e8fdf2 100%)',
                  opacity: featuresReveal.visible ? 1 : 0,
                  transform: featuresReveal.visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                  transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.14}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.14}s`,
                }}
              >
                {/* Tangram flotante en card — animado */}
                <div
                  className={i === 0 ? 'float-c' : i === 1 ? 'float-a' : 'float-b'}
                  style={{ position: 'absolute', bottom: -12, right: -12, '--dur': `${14 + i * 3}s` } as React.CSSProperties}
                >
                  <Tangram color="#02d47e" opacity={0.13} rotate={i * 35} className="w-28 h-28" />
                </div>

                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(2,212,126,0.18)', border: '1px solid rgba(2,212,126,0.2)' }}>
                    <f.icon size={22} style={{ color: 'var(--grama-menta)' }} />
                  </div>
                  <span className="overline-label font-extrabold mb-2 block" style={{ color: 'var(--grama-menta)' }}>
                    {f.overline}
                  </span>
                  <h3 className="text-base font-extrabold mb-3 leading-snug" style={{ color: 'var(--grama-oscuro)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Product strip */}
          <div className="rounded-3xl overflow-hidden grid md:grid-cols-3 gap-px" style={{ background: 'rgba(2,212,126,0.2)' }}>
            {PRODUCTS.map(p => (
              <div key={p.title} className="flex items-center gap-4 px-6 py-5" style={{ background: '#043941' }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(2,212,126,0.15)' }}>
                  <p.icon size={17} style={{ color: 'var(--grama-menta)' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{p.title}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TALLERES ════════════════════════════════════════════════════════ */}
      <section id="talleres" className="py-28 px-6 relative overflow-hidden" style={{ background: '#f0faf5' }}>
        <Tangram color="#043941" opacity={0.025} rotate={-15} className="absolute w-80 h-80 -left-10 bottom-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div
            ref={talleresHeaderReveal.ref}
            className="text-center max-w-2xl mx-auto mb-16"
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
      <section id="comunidad" className="py-28 px-6 relative overflow-hidden">
        <Tangram color="#02d47e" opacity={0.04} rotate={60} className="absolute w-72 h-72 -right-8 top-8 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 overline-label font-extrabold mb-3" style={{ color: 'var(--grama-menta)' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              Para toda la comunidad
            </span>
            <h2 className="t-h1 font-extrabold leading-tight mb-3" style={{ color: 'var(--grama-oscuro)' }}>
              Diseñado para toda la comunidad EPT
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Un ecosistema pensado para cada actor del programa formativo técnico.
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

      {/* ══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}
          >
            {/* Tangram decorativo en el CTA */}
            <Tangram color="#02d47e" opacity={0.12} rotate={20}  className="absolute -top-10 -right-10 w-64 h-64 pointer-events-none" />
            <Tangram color="#ffffff" opacity={0.04} rotate={-30} className="absolute -bottom-8 -left-8 w-48 h-48 pointer-events-none" />
            <div className="absolute pointer-events-none" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(2,212,126,0.12) 0%, transparent 65%)', right: -80, top: -80 }} />

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
                  href="mailto:contacto@grama.pe"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  <Mail size={14} /> contacto@grama.pe
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
                Programa MSE-SFT · MINEDU Perú
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
