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
  { icon: Users,     color: '#02d47e', accent: '#02d47e', bg: 'rgba(2,212,126,0.15)',   title: 'Para Docentes',            desc: 'Domina el uso pedagógico de cada equipo. Accede a 7 módulos, fichas descargables, sesiones en vivo y certificación para mejorar tus competencias técnicas.',        cta: 'Ingresar a la plataforma', action: 'app'  },
  { icon: BookOpen,  color: '#f8ee91', accent: '#f8ee91', bg: 'rgba(248,238,145,0.15)',  title: 'Para Alumnos',            desc: 'Aprende las técnicas y procedimientos a través de contenido interactivo. Crece pedagógicamente con tu docente en un ambiente estructurado y seguro.',              cta: 'Explorar talleres',         action: 'app' },
  { icon: Briefcase, color: '#d4c4fc', accent: '#d4c4fc', bg: 'rgba(212,196,252,0.15)',  title: 'Para Directores',       desc: 'Monitorea la implementación pedagógica de tu equipo docente. Asegura calidad formativa y alineación con los estándares EPT de tu institución.',             cta: 'Solicitar demostración',   action: 'mail' },
]

const NAV_LINKS = [
  { label: 'Nosotros',        href: '#nosotros' },
  { label: 'Talleres',        href: '#talleres' },
  { label: '¿Para quién es?', href: '#comunidad' },
  { label: 'Contacto',        href: '#contacto' },
]

const WHY_CARDS = [
  {
    tag: 'EL PROBLEMA',
    tagBg: 'rgba(248,238,145,0.25)',
    tagColor: '#c8a800',
    frontBg: '#043941',
    titleFront: ['Los equipos llegan.', 'La formación, no.'],
    titleColor: '#ffffff',
    hintColor: 'rgba(255,255,255,0.4)',
    shape: 'triangle',
    shapeColor: '#f8ee91',
    backBg: '#f0fdf6',
    backBorder: 'rgba(4,57,65,0.1)',
    body: ['Los talleres técnicos reciben equipos nuevos pero los docentes no tienen formación pedagógica para usarlos.', 'Cuando el profesor rota, el conocimiento se va con él — y el ciclo empieza de nuevo.'],
  },
  {
    tag: 'LA SOLUCIÓN',
    tagBg: 'rgba(4,57,65,0.14)',
    tagColor: '#043941',
    frontBg: '#f8ee91',
    titleFront: ['Una ruta híbrida', 'para tu taller.'],
    titleColor: '#043941',
    hintColor: 'rgba(4,57,65,0.38)',
    shape: 'cross',
    shapeColor: '#043941',
    backBg: '#fefce8',
    backBorder: 'rgba(202,138,4,0.18)',
    body: ['7 módulos con video, fichas descargables y sesiones en vivo. A tu ritmo, desde cualquier dispositivo.', 'Diseñado para cada especialidad EPT: automotriz, confección, cocina, ebanistería y más.'],
  },
  {
    tag: 'EL RESULTADO',
    tagBg: 'rgba(4,57,65,0.1)',
    tagColor: '#043941',
    frontBg: '#d4c4fc',
    titleFront: ['Autonomía docente', 'garantizada.'],
    titleColor: '#1a0d4a',
    hintColor: 'rgba(26,13,74,0.38)',
    shape: 'diamond',
    shapeColor: '#043941',
    backBg: '#faf5ff',
    backBorder: 'rgba(167,139,250,0.2)',
    body: ['Al terminar dominas el uso pedagógico de cada equipo y puedes replicarlo con tus estudiantes con confianza real.', 'Con certificación, fichas listas para usar y acceso permanente al material del taller.'],
  },
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

// Hook que calcula el radio del círculo reveal basado en scroll del hero
function useCircleReveal(heroRef: React.RefObject<HTMLDivElement>) {
  const [radius, setRadius] = useState(0)
  useEffect(() => {
    const calc = () => {
      if (!heroRef.current) return
      const heroH = heroRef.current.offsetHeight
      const scrolled = window.scrollY
      const startAt = heroH * 0.35
      const endAt   = heroH * 0.88
      const progress = Math.max(0, Math.min(1, (scrolled - startAt) / (endAt - startAt)))
      const maxR = Math.hypot(window.innerWidth, window.innerHeight) * 1.1
      setRadius(progress * maxR)
    }
    window.addEventListener('scroll', calc, { passive: true })
    calc()
    return () => window.removeEventListener('scroll', calc)
  }, [heroRef])
  return radius
}

// ── Carrusel horizontal de talleres ──────────────────────────────────────────
function TalleresCarousel({ onOpenModal }: { onOpenModal: (i: number) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const speedRef  = useRef(0.8)
  const pausedRef = useRef(false)
  const rafRef    = useRef<number>()
  const items     = [...talleresConfig, ...talleresConfig]

  // Arc transform: cada card recibe scale + rotateY + translateY proporcional a su distancia del centro visible
  const applyArc = (el: HTMLDivElement) => {
    const visibleCenter = el.scrollLeft + el.clientWidth / 2
    const maxDist       = el.clientWidth * 0.5
    el.querySelectorAll<HTMLElement>('[data-card]').forEach(card => {
      const dist = (card.offsetLeft + card.offsetWidth / 2) - visibleCenter
      const n    = Math.max(-1, Math.min(1, dist / maxDist))   // [-1 … 1]
      const abs  = Math.abs(n)
      const scale   = 1 - abs * 0.06                           // 1.0 centro → 0.94 bordes (minimal zoom)
      const rotY    = -n * 8                                    // cards derecha giran suavemente
      const dropY   = abs * abs * 12                            // caída suave: 0px centro → 12px bordes
      const opacity = Math.max(0.75, 1 - abs * 0.25)           // menos oscurecimiento en bordes
      card.style.transform = `perspective(900px) rotateY(${rotY}deg) translateY(${dropY}px) scale(${scale})`
      card.style.opacity   = String(opacity)
      card.style.zIndex    = String(Math.round((1 - abs) * 20))
    })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    applyArc(el)                                                // render inicial correcto
    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += speedRef.current
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
        if (el.scrollLeft <= 0 && speedRef.current < 0) el.scrollLeft = el.scrollWidth / 2
      }
      applyArc(el)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div style={{ position:'relative' }}>
      {/* Fade masks — suaves en los bordes */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:80, zIndex:10, pointerEvents:'none', background:'linear-gradient(to right,#f0fdf6 30%,transparent)' }} />
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:80, zIndex:10, pointerEvents:'none', background:'linear-gradient(to left,#f0fdf6 30%,transparent)' }} />

      {/* Flecha izquierda */}
      <button
        style={{ position:'absolute', left:20, top:'50%', transform:'translateY(-50%)', zIndex:20, width:42, height:42, borderRadius:'50%', background:'#043941', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(4,57,65,.4)', color:'#02d47e', transition:'transform .2s, box-shadow .2s' }}
        onMouseEnter={e => { speedRef.current = -5; pausedRef.current = false; e.currentTarget.style.transform='translateY(-50%) scale(1.14)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(4,57,65,.55)' }}
        onMouseLeave={e => { speedRef.current = 0.8; e.currentTarget.style.transform='translateY(-50%)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(4,57,65,.4)' }}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Flecha derecha */}
      <button
        style={{ position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', zIndex:20, width:42, height:42, borderRadius:'50%', background:'#043941', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(4,57,65,.4)', color:'#02d47e', transition:'transform .2s, box-shadow .2s' }}
        onMouseEnter={e => { speedRef.current = 5; pausedRef.current = false; e.currentTarget.style.transform='translateY(-50%) scale(1.14)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(4,57,65,.55)' }}
        onMouseLeave={e => { speedRef.current = 0.8; e.currentTarget.style.transform='translateY(-50%)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(4,57,65,.4)' }}
      >
        <ChevronRight size={18} />
      </button>

      {/* Track — position:relative necesario para que card.offsetLeft sea relativo a este contenedor */}
      <div
        ref={scrollRef}
        style={{ position:'relative', display:'flex', gap:18, overflowX:'hidden', padding:'40px 48px 60px', scrollbarWidth:'none' }}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false; speedRef.current = 0.8 }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            data-card="true"
            onClick={() => onOpenModal(i % talleresConfig.length)}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 28px 56px rgba(4,57,65,.24)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 6px 24px rgba(4,57,65,.1)' }}
            style={{
              width:280, flexShrink:0, borderRadius:24, overflow:'hidden',
              background:'#fff', cursor:'pointer',
              boxShadow:'0 6px 24px rgba(4,57,65,.1)',
              transition:'box-shadow .3s ease',
              /* sin transition de transform — el arco actualiza cada frame */
            }}
          >
            {/* Franja de color */}
            <div style={{ height:5, background:`hsl(${t.color})` }} />

            {/* Foto */}
            <div style={{ height:210, position:'relative', overflow:'hidden' }}>
              <img src={t.imagen} alt={t.nombre} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.75) saturate(0.85)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(170deg, rgba(4,57,65,0.05) 0%, rgba(4,57,65,0.84) 100%)' }} />

              {/* Badge */}
              <div style={{ position:'absolute', top:16, left:16, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(4,57,65,0.74)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:100, padding:'.28rem .8rem' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#02d47e', display:'inline-block', flexShrink:0 }} />
                <span style={{ fontSize:'.62rem', fontWeight:800, letterSpacing:'.15em', color:'rgba(255,255,255,.94)' }}>T{String(t.numero).padStart(2,'0')}</span>
              </div>

              {/* Título */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.2rem' }}>
                <h3 style={{ fontSize:'.98rem', fontWeight:900, color:'#fff', lineHeight:1.2, margin:0 }}>{t.nombre}</h3>
              </div>
            </div>

            {/* Contenido */}
            <div style={{ padding:'18px 20px 20px' }}>
              <p style={{ fontSize:'.78rem', lineHeight:1.7, color:'#64748b', margin:'0 0 14px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>{t.descripcion}</p>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
                <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:'.7rem', fontWeight:700, color:'rgba(4,57,65,.55)' }}><BookOpen size={11} /> 7 módulos</span>
                <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:'.7rem', fontWeight:700, color:'rgba(4,57,65,.55)' }}><Clock size={11} /> 150h</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(4,57,65,0.08)' }}>
                <span style={{ fontSize:'.72rem', fontWeight:800, color:'#043941' }}>Ver ruta</span>
                <div style={{ width:28, height:28, borderRadius:'50%', background:`hsl(${t.color})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ChevronRight size={13} color="#fff" />
                </div>
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
  const colors = ['#02d47e', '#f8ee91', '#d4c4fc', '#043941', '#b8edd0']
  const WA_URL = 'https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP+%F0%9F%91%8B'

  return (
    <section style={{ background: '#f0fdf6', padding: '5.5rem 1.5rem', position:'relative', overflow:'hidden' }}>

      {/* Shapes decorativas — lenguaje hero */}
      <div style={{ position:'absolute', top:-150, right:'10%', width:300, height:300, background:'#b8edd0', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.2, pointerEvents:'none', animation:'heroFa 17s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:-100, left:'5%', width:280, height:280, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.18, pointerEvents:'none', animation:'heroFd 19s ease-in-out infinite 2s' }} />
      <div style={{ position:'absolute', top:'45%', right:-80, width:160, height:130, background:'#f8ee91', borderRadius:'0 0 60px 60px', opacity:.3, pointerEvents:'none', animation:'heroFb 15s ease-in-out infinite 1s' }} />

      <div style={{ maxWidth:1140, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ maxWidth:700, marginBottom:'3.5rem' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:16 }}>
            <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
            Preguntas frecuentes
          </span>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.15, color:'#043941', margin:'0 0 .8rem' }}>
            Todo lo que necesitas<br />
            <span style={{ color:'#02d47e' }}>saber antes de empezar</span>
          </h2>
          <p style={{ fontSize:'.9rem', color:'rgba(4,57,65,.58)', lineHeight:1.8, margin:0 }}>
            Respuestas ágiles a las preguntas más comunes sobre GRAMA LXP.
          </p>
        </div>

        {/* Layout: FAQ + Sticky */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:36, alignItems:'start' }}>

          {/* Acordeón colorido */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {FAQ_ITEMS.map((item, i) => {
              const color = colors[i % colors.length]
              const isOpen = open === i
              return (
                <div
                  key={i}
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    borderRadius:20,
                    overflow:'hidden',
                    background: isOpen ? '#fff' : 'transparent',
                    border: `1px solid ${isOpen ? color + '22' : 'rgba(4,57,65,0.06)'}`,
                    boxShadow: isOpen ? `0 12px 40px ${color}18` : 'none',
                    cursor:'pointer',
                    transition:'all .3s cubic-bezier(.4,0,.2,1)',
                  }}
                >
                  <div style={{
                    display:'flex', gap:14, padding:'1.6rem',
                    alignItems:'flex-start',
                    borderLeft: `6px solid ${color}`,
                  }}>
                    {/* Indicador */}
                    <div style={{ width:36, height:36, borderRadius:12, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .3s', transform: isOpen ? 'scale(1.1) rotate(90deg)' : 'none' }}>
                      <span style={{ fontSize:'1.3rem', fontWeight:800, color:color }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>

                    {/* Pregunta + Respuesta */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:'.95rem', fontWeight:800, color:'#043941', margin:'0 0 0.5rem', lineHeight:1.4 }}>
                        {item.q}
                      </p>

                      {isOpen && (
                        <div style={{ paddingTop:12, marginTop:12, borderTop:`1px solid ${color}24` }}>
                          <p style={{ fontSize:'.85rem', color:'#64748b', lineHeight:1.75, margin:0 }}>
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Card sticky WhatsApp */}
          <div style={{ position:'sticky', top:100 }}>
            <div style={{ borderRadius:24, padding:'2.2rem', background:'linear-gradient(135deg, #043941 0%, #032e34 100%)', boxShadow:'0 16px 48px rgba(4,57,65,.25)', overflow:'hidden', position:'relative', border:'1px solid rgba(2,212,126,.08)' }}>
              <div style={{ position:'absolute', bottom:-80, right:-80, width:260, height:260, background:'radial-gradient(circle, rgba(2,212,126,.12) 0%, transparent 70%)', pointerEvents:'none' }} />
              <div style={{ position:'relative', zIndex:10 }}>
                {/* Badge */}
                <div style={{ display:'inline-block', fontSize:'.65rem', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', background:'rgba(2,212,126,.18)', color:'#02d47e', padding:'.35rem .75rem', borderRadius:100, marginBottom:1.2, border:'1px solid rgba(2,212,126,.2)' }}>
                  ✓ Respuesta &lt; 24h
                </div>

                {/* Icon */}
                <div style={{ width:56, height:56, borderRadius:16, background:'rgba(2,212,126,.14)', border:'1px solid rgba(2,212,126,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.4rem', fontSize:'1.8rem' }}>
                  🚀
                </div>

                <h3 style={{ fontSize:'1.1rem', fontWeight:900, color:'#fff', margin:'0 0 12px', lineHeight:1.25 }}>
                  ¿Duda sin respuesta?
                </h3>
                <p style={{ fontSize:'.85rem', color:'rgba(255,255,255,.6)', margin:'0 0 1.8rem', lineHeight:1.75 }}>
                  Escríbenos por WhatsApp — soporte directo del equipo GRAMA, sin formularios ni demoras.
                </p>

                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.9rem 1.4rem', borderRadius:13, background:'#25d366', color:'#fff', fontWeight:800, fontSize:'.85rem', textDecoration:'none', border:'none', cursor:'pointer', transition:'all .2s', boxShadow:'0 4px 12px rgba(37,211,102,.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(37,211,102,.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 12px rgba(37,211,102,.3)' }}
                >
                  💚 Escribir por WhatsApp
                </a>

                <p style={{ fontSize:'.7rem', textAlign:'center', margin:'14px 0 0', color:'rgba(255,255,255,.35)' }}>
                  Equipo GRAMA · Lun–Vie
                </p>
              </div>
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

  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  // Círculo reveal: hero → por qué grama
  const heroRef = useRef<HTMLDivElement>(null)
  const circleRadius = useCircleReveal(heroRef)

  // Reveal hooks por sección
  const talleresHeaderReveal = useReveal()
  const talleresReveal = useReveal()
  const comunidadReveal = useReveal()

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#f0fdf6' }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background:'rgba(240,253,246,.88)', backdropFilter:'blur(16px)', borderColor:'rgba(4,57,65,.06)', height:64, display:'flex', alignItems:'center', animation:'heroNavIn .5s ease both' }}
      >
        <div className="w-full flex items-center justify-between gap-6" style={{ padding:'0 5vw' }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GramaLogo variant="dark" size="sm" />
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize:'.78rem', fontWeight:600, color:'rgba(4,57,65,.5)', textDecoration:'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#043941')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(4,57,65,.5)')}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button onClick={goToApp} className="hidden md:flex items-center gap-1.5 transition-all hover:-translate-y-px"
                style={{ background:'#02d47e', color:'#043941', fontSize:'.78rem', fontWeight:800, padding:'.5rem 1.3rem', borderRadius:100, boxShadow:'0 3px 14px rgba(2,212,126,.4)' }}>
                Ir a la plataforma <ChevronRight size={12} />
              </button>
            ) : (
              <button onClick={() => navigate('/login')} className="hidden md:flex items-center gap-1.5 transition-all hover:-translate-y-px"
                style={{ background:'#02d47e', color:'#043941', fontSize:'.78rem', fontWeight:800, padding:'.5rem 1.3rem', borderRadius:100, boxShadow:'0 3px 14px rgba(2,212,126,.4)' }}>
                Iniciar sesión <ChevronRight size={12} />
              </button>
            )}
            <button className="md:hidden p-1.5 rounded-lg" onClick={() => setMobileMenuOpen(o => !o)} style={{ color: '#043941' }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t absolute top-16 left-0 right-0 px-6 py-4 space-y-3" style={{ borderColor:'rgba(4,57,65,0.08)', background:'#f0fdf6', zIndex:50 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="block text-sm font-semibold" style={{ color: '#043941' }} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
            <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-bold" style={{ background:'#02d47e', color:'#043941' }}>
              Iniciar sesión <ChevronRight size={14} />
            </button>
          </div>
        )}
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#f0fdf6', position:'relative', overflow:'hidden' }}>

        {/* s1 — large mint triangle, top center-right */}
        <div style={{ position:'absolute', top:-260, left:'58%', transform:'translateX(-50%)', width:560, height:560, background:'#b8edd0', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', animation:'heroFa 15s ease-in-out infinite', pointerEvents:'none' }} />
        {/* s1b — dark teal over s1 */}
        <div style={{ position:'absolute', top:-140, left:'64%', transform:'translateX(-50%)', width:260, height:260, background:'#043941', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', animation:'heroFa 15s ease-in-out infinite .5s', pointerEvents:'none' }} />
        {/* s2 — yellow vertical bar, top-left, rounded bottom */}
        <div style={{ position:'absolute', top:-60, left:'19%', width:112, height:270, background:'#f8ee91', borderRadius:'0 0 56px 56px', animation:'heroFb 11s ease-in-out infinite 1s', pointerEvents:'none' }} />
        {/* s3 — dark teal right-pointing triangle */}
        <div style={{ position:'absolute', top:'18%', right:-200, width:420, height:340, background:'#043941', clipPath:'polygon(100% 50%,0% 0%,0% 100%)', animation:'heroFc 13s ease-in-out infinite .5s', pointerEvents:'none' }} />
        {/* s3b — lilac triangle over s3 */}
        <div style={{ position:'absolute', top:'23%', right:-90, width:200, height:160, background:'#d4c4fc', clipPath:'polygon(100% 50%,0% 0%,0% 100%)', animation:'heroFc 13s ease-in-out infinite 1s', pointerEvents:'none' }} />
        {/* s4 — large mint triangle, bottom-left */}
        <div style={{ position:'absolute', bottom:-250, left:'18%', transform:'translateX(-50%)', width:520, height:520, background:'#b8edd0', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', animation:'heroFd 14s ease-in-out infinite 1.5s', pointerEvents:'none' }} />
        {/* s4b — dark teal triangle over s4 */}
        <div style={{ position:'absolute', bottom:-120, left:'10%', transform:'translateX(-50%)', width:240, height:240, background:'#043941', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', animation:'heroFd 14s ease-in-out infinite 2s', pointerEvents:'none' }} />
        {/* s5 — lilac triangle, bottom-right */}
        <div style={{ position:'absolute', bottom:-180, left:'78%', transform:'translateX(-50%)', width:380, height:380, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', animation:'heroFd 16s ease-in-out infinite 3s', pointerEvents:'none' }} />
        {/* s6 — dark teal left-pointing triangle */}
        <div style={{ position:'absolute', top:'52%', left:-210, width:440, height:360, background:'#043941', clipPath:'polygon(0% 50%,100% 0%,100% 100%)', animation:'heroFe 13s ease-in-out infinite 2s', pointerEvents:'none' }} />
        {/* s7 — spinning green cross */}
        <div style={{ position:'absolute', top:'10%', left:'6%', width:60, height:60, background:'#02d47e', clipPath:'polygon(38% 0%,62% 0%,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0% 62%,0% 38%,38% 38%)', animation:'heroSpin 18s linear infinite', pointerEvents:'none' }} />
        {/* s8 — yellow rotated square */}
        <div style={{ position:'absolute', top:'46%', left:'5%', width:50, height:50, background:'#f8ee91', borderRadius:6, animation:'heroFf 9s ease-in-out infinite 1.2s', pointerEvents:'none' }} />

        {/* ── Hero Top ── */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'100px 5vw 60px', position:'relative' }}>
          <div className="relative z-10 text-center w-full" style={{ maxWidth:900, margin:'0 auto' }}>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full animate-fade-in-up"
              style={{ background:'rgba(4,57,65,.07)', border:'1.5px solid rgba(4,57,65,.14)', color:'rgba(4,57,65,.6)', fontSize:'.58rem', fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', padding:'.3rem 1rem', marginBottom:'1.6rem' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#02d47e', animation:'blink 2.5s infinite', flexShrink:0, display:'inline-block' }} />
              Plataforma educativa · Docentes · Alumnos · Directores
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up stagger-2" style={{ fontSize:'clamp(2.8rem,7.5vw,6.5rem)', fontWeight:900, lineHeight:.95, letterSpacing:'-.05em', marginBottom:0 }}>
              <span style={{ display:'block', color:'#043941' }}>Tu plataforma</span>
              <span style={{ display:'inline-block', color:'#043941', background:'#02d47e', padding:'.05em .22em .1em', borderRadius:12, margin:'.06em 0' }}>educativa</span>
              <span style={{ display:'block', color:'#043941' }}>para formación.</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up stagger-3"
              style={{ fontSize:'clamp(.88rem,1.4vw,.96rem)', color:'rgba(4,57,65,.55)', lineHeight:1.85, maxWidth:500, margin:'1.8rem auto 2.4rem', fontWeight:400 }}>
              Una plataforma para <strong style={{ color:'#043941', fontWeight:700 }}>docentes, alumnos y directores</strong> EPT. Formación especializada, conectada y gratuita para toda la comunidad educativa del Perú.
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-4 animate-fade-in-up stagger-4">
              <button
                onClick={isLoggedIn ? goToApp : () => navigate('/login')}
                className="inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
                style={{ background:'#02d47e', color:'#043941', fontSize:'.9rem', fontWeight:800, padding:'1rem 2.2rem', borderRadius:100, boxShadow:'0 6px 22px rgba(2,212,126,.45)', border:'none', cursor:'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 30px rgba(2,212,126,.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 6px 22px rgba(2,212,126,.45)')}
              >
                {isLoggedIn ? 'Ir a la plataforma' : 'Comenzar ahora'}
                <ArrowRight size={14} />
              </button>
              <a
                href="#talleres"
                className="inline-flex items-center gap-2 transition-all"
                style={{ color:'rgba(4,57,65,.6)', fontSize:'.86rem', fontWeight:700, border:'1.5px solid rgba(4,57,65,.2)', padding:'.96rem 1.8rem', borderRadius:100, background:'rgba(255,255,255,.6)', textDecoration:'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(4,57,65,.4)'; e.currentTarget.style.color='#043941'; e.currentTarget.style.background='#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(4,57,65,.2)'; e.currentTarget.style.color='rgba(4,57,65,.6)'; e.currentTarget.style.background='rgba(255,255,255,.6)' }}
              >
                Explorar talleres
                <ChevronRight size={12} />
              </a>
            </div>

          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 animate-fade-in-up"
          style={{ background:'#fff', borderTop:'1px solid rgba(4,57,65,.08)', animationDelay:'.7s' }}>
          {[
            { n:'10',  hi:'',  label:'Talleres EPT' },
            { n:'36',  hi:'+', label:'Docentes capacitados' },
            { n:'200', hi:'+', label:'Fichas descargables' },
            { n:'150', hi:'h', label:'Formación híbrida' },
          ].map((s, i) => (
            <div key={i} className="text-center" style={{ padding:'2rem 1.5rem', borderLeft: i > 0 ? '1px solid rgba(4,57,65,.08)' : 'none' }}>
              <span style={{ display:'block', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#043941', lineHeight:1, letterSpacing:'-.04em', marginBottom:'.4rem' }}>
                {s.n}<span style={{ color:'#02d47e' }}>{s.hi}</span>
              </span>
              <span style={{ fontSize:'.72rem', fontWeight:500, color:'rgba(4,57,65,.45)', letterSpacing:'.04em', textTransform:'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Wave de cierre — transición blanco → #f0fdf6 */}
        <div style={{ background: '#fff', lineHeight: 0 }}>
          <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%' }} preserveAspectRatio="none">
            <path d="M0,36 C360,72 720,0 1080,36 C1260,54 1380,24 1440,36 L1440,72 L0,72 Z" fill="#f0fdf6" />
          </svg>
        </div>

      </section>

      {/* ══ POR QUÉ GRAMA ═══════════════════════════════════════════════════ */}
      <section id="nosotros" style={{
        background: '#ffffff',
        padding: '5rem 1.5rem',
        overflow: 'hidden',
        position: 'relative',
        clipPath: `circle(${circleRadius}px at 50% 0%)`,
        willChange: 'clip-path',
      }}>

        {/* Shapes decorativos de fondo */}
        <div style={{ position:'absolute', top:'8%', left:'3%', width:60, height:130, background:'#b8edd0', borderRadius:'0 0 30px 30px', opacity:.3, pointerEvents:'none', transform:'rotate(-8deg)', animation:'heroFb 13s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'3%', width:50, height:110, background:'#d4c4fc', borderRadius:'0 0 25px 25px', opacity:.35, pointerEvents:'none', transform:'rotate(10deg)', animation:'heroFb 16s ease-in-out infinite 2s' }} />
        <svg viewBox="0 0 50 44" style={{ position:'absolute', top:'18%', right:'4%', width:40, height:35, opacity:.25, pointerEvents:'none', animation:'heroFe 14s ease-in-out infinite 1s' }}>
          <polygon points="25,0 50,44 0,44" fill="#f8ee91" />
        </svg>
        <svg viewBox="0 0 50 44" style={{ position:'absolute', bottom:'20%', left:'4%', width:34, height:30, opacity:.3, pointerEvents:'none', animation:'heroFc 17s ease-in-out infinite .5s' }}>
          <polygon points="25,0 50,44 0,44" fill="#02d47e" />
        </svg>

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header — con scroll reveal */}
          <div style={{ textAlign:'center', marginBottom:'3.5rem', opacity: 0, transform: 'translateY(32px)', animation: 'fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s forwards' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:16 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              ¿Por qué GRAMA?
            </span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.1, color:'#043941', margin:0 }}>
              El conocimiento técnico<br />
              <span style={{ color:'#02d47e' }}>no debería perderse</span>
            </h2>
          </div>

          {/* Flip Cards */}
          <div style={{ display:'flex', gap:'2rem', justifyContent:'center', flexWrap:'wrap', alignItems:'center' }}>
            {WHY_CARDS.map((card, i) => {
              const isFlipped = flippedCard === i
              const tilt = i === 0 ? 'rotate(-3deg)' : i === 2 ? 'rotate(3deg)' : 'none'
              return (
                // Div exterior: solo animación de entrada (opacity + translateY)
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    opacity: 0,
                    animation: `fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) ${0.2 + i * 0.15}s forwards`,
                  }}
                >
                  {/* Div interior: tilt + click + flip — sin interferencia con animación */}
                  <div
                    onClick={() => setFlippedCard(isFlipped ? null : i)}
                    style={{
                      width: 300,
                      height: 400,
                      perspective: '1000px',
                      cursor: 'pointer',
                      transform: isFlipped ? 'none' : tilt,
                      transition: 'transform .4s ease',
                    }}
                  >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d' as const,
                    transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'none',
                  }}>

                    {/* ── FRONT ── */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: 24,
                      background: card.frontBg,
                      backfaceVisibility: 'hidden' as const,
                      WebkitBackfaceVisibility: 'hidden' as any,
                      overflow: 'hidden',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}>
                      {/* Decorative shape top-right */}
                      {card.shape === 'triangle' && (
                        <div style={{ position:'absolute', top:-40, right:-30, width:160, height:160, background:card.shapeColor, opacity:.18, clipPath:'polygon(50% 0%,100% 100%,0% 100%)', transform:'rotate(180deg)' }} />
                      )}
                      {card.shape === 'cross' && (
                        <div style={{ position:'absolute', top:20, right:20, width:64, height:64, background:card.shapeColor, opacity:.22, clipPath:'polygon(38% 0%,62% 0%,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0% 62%,0% 38%,38% 38%)' }} />
                      )}
                      {card.shape === 'diamond' && (
                        <div style={{ position:'absolute', top:16, right:16, width:80, height:80, background:card.shapeColor, opacity:.25, transform:'rotate(45deg)', borderRadius:8 }} />
                      )}

                      {/* Tag */}
                      <span style={{ display:'inline-block', padding:'.25rem .75rem', borderRadius:100, fontSize:'.65rem', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', background:card.tagBg, color:card.tagColor, marginBottom:'1rem', width:'fit-content' }}>
                        {card.tag}
                      </span>

                      {/* Title */}
                      <p style={{ fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:900, lineHeight:1.15, color:card.titleColor, margin:'0 0 1.5rem' }}>
                        {card.titleFront[0]}<br />{card.titleFront[1]}
                      </p>

                      {/* Hint */}
                      <p style={{ fontSize:'.72rem', color:card.hintColor, margin:0 }}>↓ Toca para saber más</p>
                    </div>

                    {/* ── BACK ── */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: 24,
                      background: card.backBg,
                      backfaceVisibility: 'hidden' as const,
                      WebkitBackfaceVisibility: 'hidden' as any,
                      transform: 'rotateY(180deg)',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: `1.5px solid ${card.backBorder}`,
                    }}>
                      <div>
                        <span style={{ display:'inline-block', padding:'.25rem .75rem', borderRadius:100, fontSize:'.65rem', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', background:card.tagBg, color:card.tagColor, marginBottom:'1rem' }}>
                          {card.tag}
                        </span>
                        <p style={{ fontSize:'1.05rem', fontWeight:800, color:'#043941', lineHeight:1.3, marginBottom:'1rem' }}>
                          {card.titleFront[0]}<br />{card.titleFront[1]}
                        </p>
                        <p style={{ fontSize:'.82rem', lineHeight:1.65, color:'#4a7a82', marginBottom:'.75rem', margin:'0 0 .75rem' }}>
                          {card.body[0]}
                        </p>
                        <p style={{ fontSize:'.82rem', lineHeight:1.65, color:'#4a7a82' }}>
                          {card.body[1]}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setFlippedCard(null) }}
                        style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:'.75rem', fontWeight:700, color:'#043941', background:'none', border:'1.5px solid rgba(4,57,65,0.2)', borderRadius:100, padding:'.4rem 1rem', cursor:'pointer', width:'fit-content' }}
                      >
                        ← Volver
                      </button>
                    </div>

                  </div>
                </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ══ TALLERES ════════════════════════════════════════════════════════ */}
      <section id="talleres" style={{ background: '#f0fdf6', padding: '5rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shapes — mismo lenguaje que hero */}
        <div style={{ position:'absolute', top:-70, left:'8%', width:108, height:260, background:'#f8ee91', borderRadius:'0 0 54px 54px', opacity:.32, pointerEvents:'none', animation:'heroFb 13s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-100, right:'6%', width:300, height:300, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.28, pointerEvents:'none', animation:'heroFd 16s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'28%', right:-80, width:200, height:160, background:'#043941', clipPath:'polygon(100% 50%,0% 0%,0% 100%)', opacity:.06, pointerEvents:'none', animation:'heroFc 15s ease-in-out infinite 1s' }} />
        <div style={{ position:'absolute', bottom:'18%', left:-80, width:180, height:145, background:'#b8edd0', clipPath:'polygon(0% 50%,100% 0%,100% 100%)', opacity:.35, pointerEvents:'none', animation:'heroFe 14s ease-in-out infinite .5s' }} />
        <div style={{ position:'absolute', top:'14%', left:'5%', width:52, height:52, background:'#02d47e', clipPath:'polygon(38% 0%,62% 0%,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0% 62%,0% 38%,38% 38%)', animation:'heroSpin 24s linear infinite', pointerEvents:'none', opacity:.45 }} />

          {/* Header — centrado con maxWidth */}
          <div
            ref={talleresHeaderReveal.ref}
            style={{ textAlign:'center', maxWidth:600, margin:'0 auto 3rem', opacity: talleresHeaderReveal.visible ? 1 : 0, transform: talleresHeaderReveal.visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:16 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              Especialidades disponibles
            </span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.1, color:'#043941', margin:'0 0 .75rem' }}>
              {talleresConfig.length} especialidades <span style={{ color:'#02d47e' }}>técnicas</span>
            </h2>
            <p style={{ fontSize:'.875rem', color:'rgba(4,57,65,.5)', lineHeight:1.75, margin:0 }}>
              Haz clic en cualquier taller para ver su ruta de aprendizaje y equipamiento.
            </p>
          </div>

          {/* Carrusel — full width, fuera del maxWidth para usar toda la pantalla */}
          <div
            ref={talleresReveal.ref}
            style={{ margin:'0 -1.5rem 3rem', opacity: talleresReveal.visible ? 1 : 0, transform: talleresReveal.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <TalleresCarousel onOpenModal={openModal} />
          </div>

          {/* CTA */}
          <div style={{ textAlign:'center' }}>
            <button
              onClick={goToApp}
              style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#02d47e', color:'#043941', fontSize:'.9rem', fontWeight:800, padding:'1rem 2.2rem', borderRadius:100, boxShadow:'0 6px 22px rgba(2,212,126,.4)', border:'none', cursor:'pointer', transition:'box-shadow .2s ease, transform .2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 10px 32px rgba(2,212,126,.55)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='0 6px 22px rgba(2,212,126,.4)'; e.currentTarget.style.transform='none' }}
            >
              Acceder a la plataforma completa
              <ArrowRight size={15} />
            </button>
          </div>
      </section>

      {/* ══ COMUNIDAD ═══════════════════════════════════════════════════════ */}
      <section id="comunidad" style={{ background: '#ffffff', padding: '5rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shapes — mismo lenguaje que hero/talleres */}
        <div style={{ position:'absolute', top:-100, right:'5%', width:280, height:280, background:'#02d47e', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.12, pointerEvents:'none', animation:'heroFa 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-140, left:'8%', width:320, height:320, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.14, pointerEvents:'none', animation:'heroFd 18s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'40%', left:-60, width:140, height:110, background:'#f8ee91', clipPath:'polygon(0% 50%,100% 0%,100% 100%)', opacity:.25, pointerEvents:'none', animation:'heroFe 14s ease-in-out infinite 1s' }} />

        <div style={{ maxWidth:1152, margin:'0 auto' }}>

          {/* Header */}
          <div style={{ textAlign:'center', maxWidth:700, margin:'0 auto 4rem' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:16 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              Para toda la comunidad
            </span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
              Diseñado para <span style={{ color:'#02d47e' }}>docentes, alumnos</span><br/>y <span style={{ color:'#02d47e' }}>directores</span>
            </h2>
            <p style={{ fontSize:'.9rem', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:0 }}>
              GRAMA se adapta a los roles y necesidades de cada miembro de la comunidad educativa técnica.
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={comunidadReveal.ref} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:28, maxWidth:1100, margin:'0 auto' }}>
            {COMMUNITY.map((c, i) => (
              <div
                key={c.title}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-12px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 24px 56px rgba(4,57,65,.16)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='0 6px 24px rgba(4,57,65,.08)' }}
                style={{
                  borderRadius:24,
                  background:'#fff',
                  overflow:'hidden',
                  boxShadow:'0 6px 24px rgba(4,57,65,.08)',
                  transition:'transform .3s ease, box-shadow .3s ease',
                  opacity: comunidadReveal.visible ? 1 : 0,
                  transform: comunidadReveal.visible ? 'translateY(0)' : 'translateY(32px)',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                {/* Top accent strip */}
                <div style={{ height:6, background:c.accent }} />

                {/* Icon area */}
                <div style={{ padding:'2rem', display:'flex', alignItems:'center', justifyContent:'center', minHeight:140 }}>
                  <div style={{ width:80, height:80, borderRadius:20, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <c.icon size={40} style={{ color:c.color }} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding:'0 2rem 2rem' }}>
                  <h3 style={{ fontSize:'1.1rem', fontWeight:900, color:'#043941', margin:'0 0 1rem', lineHeight:1.3 }}>{c.title}</h3>
                  <p style={{ fontSize:'.88rem', lineHeight:1.7, color:'#64748b', margin:'0 0 1.8rem' }}>{c.desc}</p>

                  {/* CTA Button */}
                  <button
                    onClick={c.action === 'app' ? goToApp : () => window.location.href = 'mailto:contacto@grama.pe'}
                    style={{ display:'inline-flex', alignItems:'center', gap:6, background:c.accent, color:'#fff', fontSize:'.8rem', fontWeight:800, padding:'.7rem 1.6rem', borderRadius:100, border:'none', cursor:'pointer', transition:'box-shadow .2s, transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 8px 20px ${c.accent}44`; e.currentTarget.style.transform='translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}
                  >
                    {c.cta}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ CENTRO DE AYUDA & CONTACTO ═══════════════════════════════════════ */}
      <section id="contacto" style={{ background: '#f0fdf6', padding: '6rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shapes — hero language */}
        <div style={{ position:'absolute', top:-120, left:'12%', width:320, height:320, background:'#02d47e', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.1, pointerEvents:'none', animation:'heroFa 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-160, right:'8%', width:340, height:340, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.12, pointerEvents:'none', animation:'heroFd 18s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'50%', left:-100, width:200, height:160, background:'#f8ee91', borderRadius:'0 0 80px 80px', opacity:.28, pointerEvents:'none', animation:'heroFb 14s ease-in-out infinite 1s' }} />

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header */}
          <div style={{ textAlign:'center', maxWidth:750, margin:'0 auto 4rem' }}>
            <h2 style={{ fontSize:'clamp(2.2rem,5vw,3.2rem)', fontWeight:900, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
              Listo para <span style={{ color:'#02d47e' }}>transformar</span><br/>tu taller?
            </h2>
            <p style={{ fontSize:'.95rem', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:0 }}>
              Responde tus dudas y comienza tu ruta de aprendizaje hoy. Nuestro equipo está disponible para apoyarte.
            </p>
          </div>

          {/* FAQ + Contact Grid */}
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:40, alignItems:'start' }}>

            {/* Acordeón — misma estructura FAQ */}
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:12 }}>
                <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
                Dudas frecuentes
              </span>

              {FAQ_ITEMS.map((item, i) => {
                const colors = ['#02d47e', '#f8ee91', '#d4c4fc', '#043941', '#b8edd0']
                const color = colors[i % colors.length]
                const isOpen = open === i
                return (
                  <div
                    key={i}
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      borderRadius:18,
                      overflow:'hidden',
                      background: isOpen ? '#fff' : `${color}08`,
                      border: `1.5px solid ${isOpen ? color + '44' : color + '18'}`,
                      boxShadow: isOpen ? `0 12px 40px ${color}22` : `0 2px 8px ${color}12`,
                      cursor:'pointer',
                      transition:'all .3s cubic-bezier(.4,0,.2,1)',
                    }}
                  >
                    <div style={{
                      display:'flex', gap:12, padding:'1.4rem',
                      alignItems:'flex-start',
                      borderLeft: `6px solid ${color}`,
                    }}>
                      <div style={{ width:32, height:32, borderRadius:10, background:`${color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .3s', transform: isOpen ? 'scale(1.1) rotate(90deg)' : 'none' }}>
                        <span style={{ fontSize:'1.1rem', fontWeight:800, color:color }}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:'.96rem', fontWeight:900, color:'#043941', margin:'0 0 0.4rem', lineHeight:1.4, letterSpacing:'-.3px' }}>
                          {item.q}
                        </p>
                        {isOpen && (
                          <div style={{ paddingTop:10, marginTop:10, borderTop:`1px solid ${color}24` }}>
                            <p style={{ fontSize:'.82rem', color:'#64748b', lineHeight:1.7, margin:0 }}>
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Contact Block */}
            <div style={{ position:'sticky', top:120 }}>
              <div style={{ background:'#fff', borderRadius:22, padding:'2.4rem', border:'1px solid rgba(4,57,65,.08)', boxShadow:'0 8px 32px rgba(4,57,65,.08)' }}>
                <div style={{ width:52, height:52, borderRadius:14, background:'rgba(2,212,126,.14)', border:'1px solid rgba(2,212,126,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:1.8, fontSize:'1.8rem' }}>
                  ✨
                </div>

                <h3 style={{ fontSize:'1.08rem', fontWeight:900, color:'#043941', margin:'0 0 10px', lineHeight:1.3 }}>
                  ¿Listo para empezar?
                </h3>
                <p style={{ fontSize:'.82rem', color:'rgba(4,57,65,.6)', margin:'0 0 2rem', lineHeight:1.7 }}>
                  Abre tu cuenta o contacta a nuestro equipo directamente.
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <button
                    onClick={goToApp}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.9rem 1.2rem', borderRadius:12, background:'#02d47e', color:'#043941', fontWeight:800, fontSize:'.82rem', border:'none', cursor:'pointer', transition:'all .2s', boxShadow:'0 4px 12px rgba(2,212,126,.25)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(2,212,126,.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 12px rgba(2,212,126,.25)' }}
                  >
                    🚀 Ingresar
                  </button>

                  <a
                    href="https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP+%F0%9F%91%8B"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.9rem 1.2rem', borderRadius:12, background:'#25d366', color:'#fff', fontWeight:800, fontSize:'.82rem', textDecoration:'none', border:'none', cursor:'pointer', transition:'all .2s', boxShadow:'0 4px 12px rgba(37,211,102,.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(37,211,102,.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 12px rgba(37,211,102,.2)' }}
                  >
                    💬 WhatsApp
                  </a>

                  <a
                    href="mailto:contacto@grama.pe"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.9rem 1.2rem', borderRadius:12, background:'transparent', color:'#043941', fontWeight:800, fontSize:'.82rem', textDecoration:'none', border:'1.5px solid rgba(4,57,65,.15)', cursor:'pointer', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(4,57,65,.03)'; e.currentTarget.style.borderColor='rgba(4,57,65,.25)' }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(4,57,65,.15)' }}
                  >
                    📧 Email
                  </a>
                </div>

                <p style={{ fontSize:'.7rem', textAlign:'center', margin:'1.6rem 0 0', color:'rgba(4,57,65,.4)', lineHeight:1.5 }}>
                  Equipo GRAMA<br/>Respuesta &lt; 24h
                </p>
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
