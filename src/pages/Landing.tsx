// src/pages/Landing.tsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Clock,
  ChevronRight, ChevronLeft, ArrowRight,
  Menu, X, Wrench,
} from 'lucide-react'
import { GramaLogo } from '@/components/GramaLogo'
import { useAuth } from '@/contexts/AuthContext'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller } from '@/data/bienesData'
import { modulosLXP } from '@/data/modulosLXP'
// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: '¿Para quién?',  href: '#perfiles' },
  { label: 'Cómo funciona', href: '#como' },
  { label: 'Talleres',      href: '#talleres' },
  { label: 'Preguntas',     href: '#faq' },
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
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 20px 48px rgba(4,57,65,.18)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 4px 20px rgba(4,57,65,.08)' }}
            style={{
              width:280, flexShrink:0, borderRadius:20, overflow:'hidden',
              background:'#fff', cursor:'pointer',
              boxShadow:'0 4px 20px rgba(4,57,65,.08)',
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
              <p style={{ fontSize:'.78rem', lineHeight:1.7, color:'rgba(4,57,65,.5)', margin:'0 0 14px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>{t.descripcion}</p>
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

      {/* Panel — 2 columnas en desktop */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center md:inset-0 md:items-center md:p-6" onClick={onClose}>
        <div
          className="slide-up-modal bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          style={{ maxHeight: '92vh' }}
          onClick={e => e.stopPropagation()}
        >
          {/* ── Columna izquierda: foto + identidad ── */}
          <style>{`.modal-photo-col { height: 220px; flex-shrink: 0; } @media (min-width:768px) { .modal-photo-col { height: auto; width: 250px; align-self: stretch; } }`}</style>
          <div className="modal-photo-col relative overflow-hidden">
            <div className="relative w-full h-full overflow-hidden">
              <img
                key={taller.slug}
                src={taller.imagen}
                alt={taller.nombre}
                className={`absolute inset-0 w-full h-full object-cover ${slideClass}`}
                style={{ filter: 'brightness(0.65) saturate(0.85)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(4,57,65,0.2) 0%, rgba(4,57,65,0.92) 100%)' }} />
              <Tangram color={`hsl(${taller.color})`} opacity={0.25} rotate={20} className="absolute -bottom-6 -right-6 w-28 h-28" />

              {/* Cerrar — solo visible en móvil en la foto */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 md:hidden h-8 w-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.45)' }}
              >
                <X size={14} color="white" />
              </button>

              {/* Info taller */}
              <div className={`absolute bottom-4 left-5 right-5 ${slideClass}`} key={`info-${taller.slug}`}>
                <span
                  className="text-[10px] font-extrabold px-2.5 py-1 rounded-full inline-block mb-2"
                  style={{ background: `hsl(${taller.color})`, color: '#fff' }}
                >
                  T{String(taller.numero).padStart(2, '0')} · {index + 1} de {talleresConfig.length}
                </span>
                <h2 className="font-extrabold text-white leading-tight" style={{ fontSize: 'clamp(1rem,2vw,1.35rem)' }}>{taller.nombre}</h2>
                <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>{taller.descripcion}</p>
              </div>
            </div>
          </div>

          {/* ── Columna derecha: contenido + footer ── */}
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* Cerrar — solo en desktop */}
            <div className="hidden md:flex justify-end px-4 pt-3 shrink-0">
              <button onClick={onClose} className="h-7 w-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity" style={{ background: 'rgba(4,57,65,0.07)' }}>
                <X size={13} color="#043941" />
              </button>
            </div>

            {/* Cuerpo */}
            <div key={taller.slug} className={`flex-1 overflow-y-auto px-5 pb-2 pt-1 space-y-4 ${slideClass}`}>
              {taller.slug === 'taller-general-ept' ? (
                <>
                  <div>
                    <p className="overline-label font-extrabold mb-2 flex items-center gap-1.5" style={{ color: '#02d47e' }}>
                      <Wrench size={11} /> Equipamiento representativo
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Impresora 3D FDM','Cortadora Láser CO₂','Escáner 3D','Sublimación','Kit Electrónica','Plotter de Corte'].map(n => (
                        <span key={n} className="text-[10px] font-medium px-2.5 py-1 rounded-full" style={{ background:'#e3f8fb', color:'#045f6c' }}>{n}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Fabricación Digital','Design Thinking','Emprendimiento','Prototipado','Proyectos Productivos'].map(tag => (
                      <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background:'#f0fdf6', color:'#045f6c' }}>{tag}</span>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Competencias */}
                  {taller.competencias?.length > 0 && (
                    <div>
                      <p className="overline-label font-extrabold mb-2 flex items-center gap-1.5" style={{ color: '#045f6c' }}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.2 7.8L9 2.5" stroke="#02d47e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Competencias
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

                  {/* Módulos — 2 columnas compactas */}
                  <div>
                    <p className="overline-label font-extrabold mb-2 flex items-center gap-1.5" style={{ color: '#02d47e' }}>
                      <BookOpen size={11} /> Ruta · {modulosLXP.length} módulos · 150h
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {modulosLXP.map((m, i) => (
                        <div key={m.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: '#f0fdf6' }}>
                          <span className="text-[9px] font-extrabold shrink-0" style={{ color: '#02d47e' }}>M{i}</span>
                          <span className="text-[10px] font-semibold truncate" style={{ color: 'var(--grama-oscuro)' }}>{m.nombre}</span>
                          <span className="text-[9px] ml-auto shrink-0" style={{ color: '#94a3b8' }}>{m.horasTotal}h</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Equipamiento — máx 5 chips */}
                  {bienes.length > 0 && (
                    <div>
                      <p className="overline-label font-extrabold mb-2 flex items-center gap-1.5" style={{ color: '#02d47e' }}>
                        <Wrench size={11} /> Equipamiento
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {bienes.slice(0, 5).map(b => (
                          <span key={b.nombre} className="text-[10px] font-medium px-2.5 py-1 rounded-full" style={{ background: '#e3f8fb', color: '#045f6c' }}>
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
            <div className="px-4 pb-4 pt-2.5 shrink-0 border-t space-y-2.5" style={{ borderColor: '#f0fdf6' }}>

              {/* Nav row: flechas + dots fusionados */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={onPrev}
                  disabled={isFirst}
                  className="flex items-center justify-center rounded-full transition-all disabled:opacity-20 hover:scale-110"
                  style={{ width: 30, height: 30, background: '#f0fdf6', border: 'none', cursor: isFirst ? 'default' : 'pointer', flexShrink: 0 }}
                >
                  <ChevronLeft size={15} color="#043941" />
                </button>

                <div className="flex items-center gap-1.5 flex-1 justify-center">
                  {talleresConfig.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => i !== index && onGoTo(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === index ? 18 : 5,
                        height: 5,
                        background: i === index ? '#02d47e' : '#d1f0e8',
                        border: 'none',
                        padding: 0,
                        cursor: i === index ? 'default' : 'pointer',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={onNext}
                  disabled={isLast}
                  className="flex items-center justify-center rounded-full transition-all disabled:opacity-20 hover:scale-110"
                  style={{ width: 30, height: 30, background: '#f0fdf6', border: 'none', cursor: isLast ? 'default' : 'pointer', flexShrink: 0 }}
                >
                  <ChevronRight size={15} color="#043941" />
                </button>
              </div>

              {/* CTA principal */}
              <a
                href="mailto:contacto@grama.pe"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: '#02d47e', color: '#043941', boxShadow: '0 4px 18px rgba(2,212,126,.35)' }}
              >
                Solicitar información <ArrowRight size={14} />
              </a>
            </div>
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

  const [open, setOpen] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'docente' | 'alumno' | 'director'>('docente')

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#f0fdf6' }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 52px', height:60,
        background:'rgba(255,255,255,0.94)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(2,212,126,0.12)',
      }}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} style={{ display:'flex', alignItems:'center', background:'none', border:'none', cursor:'pointer', padding:0 }}>
          <GramaLogo variant="dark" size="sm" />
        </button>

        {/* Links desktop */}
        <nav className="hidden md:flex" style={{ display:'flex', alignItems:'center', gap:32 }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} style={{ fontSize:13, fontWeight:500, color:'#043941', textDecoration:'none', opacity:.6, transition:'opacity .2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '.6')}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Derecha */}
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <span className="hidden md:block" style={{ fontSize:10, fontWeight:700, letterSpacing:'1.2px', textTransform:'uppercase', color:'rgba(4,57,65,.55)' }}>
            MINEDU · Perú
          </span>
          <button
            onClick={isLoggedIn ? goToApp : () => navigate('/login')}
            style={{ background:'#043941', color:'#fff', padding:'9px 22px', borderRadius:8, fontSize:13, fontWeight:700, border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:5, transition:'all .2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#045f6c')}
            onMouseLeave={e => (e.currentTarget.style.background = '#043941')}
          >
            {isLoggedIn ? 'Ir a la plataforma' : 'Acceder'} <ChevronRight size={13} />
          </button>
          {/* Hamburger mobile */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(o => !o)} style={{ background:'none', border:'none', cursor:'pointer', color:'#043941', padding:4 }}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ position:'absolute', top:60, left:0, right:0, background:'#fff', borderBottom:'1px solid rgba(4,57,65,0.08)', padding:'16px 24px 20px', zIndex:50, display:'flex', flexDirection:'column', gap:12 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize:14, fontWeight:600, color:'#043941', textDecoration:'none' }} onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <button onClick={() => { navigate('/login'); setMobileMenuOpen(false) }} style={{ marginTop:4, background:'#043941', color:'#fff', padding:'11px', borderRadius:8, fontSize:14, fontWeight:700, border:'none', cursor:'pointer' }}>
              Acceder →
            </button>
          </div>
        )}
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', paddingTop: 60,
        background: 'linear-gradient(135deg, #e8f8f2 0%, #e3f8fb 50%, #edf6ff 100%)',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', gap: 48,
        padding: '100px 52px 60px',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* ── Formas de fondo ── */}
        {/* Triángulos grandes de esquina */}
        <div style={{ position:'absolute', bottom:-140, left:-100, width:420, height:420, background:'#02d47e', clipPath:'polygon(0 0,100% 0,0 100%)', opacity:.06, pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:-80, right:-80, width:300, height:300, background:'#043941', clipPath:'polygon(100% 0,100% 100%,0 100%)', opacity:.05, pointerEvents:'none' }} />

        {/* Triángulos medianos flotantes */}
        <div style={{ position:'absolute', top:'12%', left:'8%', width:52, height:52, background:'#02d47e', clipPath:'polygon(50% 0,100% 100%,0 100%)', opacity:.28, animation:'heroFb 11s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'22%', right:'8%', width:44, height:44, background:'#d4c4fc', clipPath:'polygon(50% 0,100% 100%,0 100%)', opacity:.5, animation:'heroFb 9s ease-in-out infinite 1.5s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'22%', left:'8%', width:36, height:36, background:'#f8ee91', clipPath:'polygon(50% 100%,0 0,100% 0)', opacity:.55, animation:'heroFd 13s ease-in-out infinite 1s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'30%', right:'6%', width:30, height:30, background:'#b8edd0', clipPath:'polygon(50% 0,100% 100%,0 100%)', opacity:.6, animation:'heroFb 10s ease-in-out infinite 3s', pointerEvents:'none' }} />

        {/* Círculos */}
        <div style={{ position:'absolute', top:'10%', right:'22%', width:56, height:56, borderRadius:'50%', background:'#f8ee91', opacity:.32, animation:'heroFf 8s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'55%', left:'4%', width:38, height:38, borderRadius:'50%', background:'#d4c4fc', opacity:.4, animation:'heroFf 12s ease-in-out infinite 2s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'18%', right:'18%', width:26, height:26, borderRadius:'50%', background:'#02d47e', opacity:.35, animation:'heroFf 9s ease-in-out infinite 1s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'38%', left:'28%', width:18, height:18, borderRadius:'50%', background:'#043941', opacity:.12, animation:'heroFf 14s ease-in-out infinite 3s', pointerEvents:'none' }} />

        {/* Cruces / símbolo + (SVG inline) */}
        <svg style={{ position:'absolute', top:'28%', left:'3%', width:28, height:28, opacity:.35, animation:'heroFe 11s ease-in-out infinite', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#02d47e"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#02d47e"/>
        </svg>
        <svg style={{ position:'absolute', top:'15%', left:'40%', width:22, height:22, opacity:.3, animation:'heroFe 9s ease-in-out infinite 2s', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#d4c4fc"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#d4c4fc"/>
        </svg>
        <svg style={{ position:'absolute', bottom:'28%', right:'4%', width:24, height:24, opacity:.38, animation:'heroFe 13s ease-in-out infinite 1s', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#f8ee91"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#f8ee91"/>
        </svg>
        <svg style={{ position:'absolute', top:'65%', right:'26%', width:18, height:18, opacity:.28, animation:'heroFe 10s ease-in-out infinite 3.5s', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#b8edd0"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#b8edd0"/>
        </svg>

        {/* Cuadrado rotado */}
        <div style={{ position:'absolute', top:'30%', left:'44%', width:100, height:100, background:'#f8ee91', borderRadius:14, opacity:.14, transform:'rotate(22deg)', animation:'heroFf 10s ease-in-out infinite', pointerEvents:'none' }} />

        {/* ── Columna izquierda ── */}
        <div style={{ position:'relative', zIndex:2, animation:'heroNavIn .7s ease both' }}>

          {/* H1 */}
          <h1 style={{ fontSize:'clamp(2.4rem,4.2vw,3.8rem)', fontWeight:900, lineHeight:1.04, letterSpacing:'-1.8px', color:'#043941', marginBottom:20 }}>
            Formación técnica<br />
            que <em style={{ fontStyle:'normal', color:'#02d47e' }}>transforma</em><br />
            la educación
          </h1>

          {/* Subtexto limpio */}
          <p style={{ fontSize:'1rem', color:'rgba(4,57,65,.6)', lineHeight:1.75, fontWeight:450, margin:'0 0 32px', maxWidth:420 }}>
            La plataforma LXP para docentes de talleres EPT<br />
            en los 24 departamentos del Perú.
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button
              onClick={isLoggedIn ? goToApp : () => navigate('/login')}
              style={{ background:'#043941', color:'#fff', padding:'13px 28px', borderRadius:100, fontSize:14, fontWeight:700, border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:7, boxShadow:'0 4px 20px rgba(4,57,65,.25)', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#045f6c'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='#043941'; e.currentTarget.style.transform='none' }}
            >
              {isLoggedIn ? 'Ir a la plataforma' : 'Comenzar mi formación'} <ArrowRight size={14} />
            </button>
            <a href="#perfiles" style={{ border:'1.5px solid #043941', color:'#043941', padding:'12px 22px', borderRadius:100, fontSize:14, fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:7, transition:'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='#043941'; (e.currentTarget as HTMLAnchorElement).style.color='#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='transparent'; (e.currentTarget as HTMLAnchorElement).style.color='#043941' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" fill="none"/><polygon points="5.5,4.5 10,7 5.5,9.5" fill="currentColor"/></svg>
              Ver cómo funciona
            </a>
          </div>
        </div>

        {/* ── Columna derecha — imagen ── */}
        <div style={{ position:'relative', zIndex:2, animation:'heroNavIn .7s .22s ease both' }}>
          <div style={{ borderRadius:24, overflow:'hidden', boxShadow:'0 32px 80px rgba(4,57,65,.28)', position:'relative', aspectRatio:'4/3' }}>
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80"
              alt="Vista de la plataforma"
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(4,57,65,.35) 100%)', pointerEvents:'none' }} />
          </div>
        </div>

        {/* ── Stats bar (pegada al fondo del hero) ── */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'#043941', display:'grid', gridTemplateColumns:'repeat(4,1fr)', zIndex:3 }}>
          {[
            { n:'9',   hi:'',   label:'Talleres EPT' },
            { n:'36',  hi:'+',  label:'Docentes capacitados' },
            { n:'24',  hi:'',   label:'Departamentos' },
            { n:'150', hi:'h',  label:'Formación híbrida' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign:'center', padding:'18px 16px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
              <span style={{ display:'block', fontSize:'clamp(1.4rem,2.5vw,2rem)', fontWeight:900, color:'#02d47e', lineHeight:1, letterSpacing:'-.04em', marginBottom:4 }}>
                {s.n}<span style={{ color:'rgba(255,255,255,.6)', fontSize:'.7em' }}>{s.hi}</span>
              </span>
              <span style={{ fontSize:'.6rem', fontWeight:600, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', textTransform:'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PERFILES (TABS) ══════════════════════════════════════════════════ */}
      <section id="perfiles" style={{
        background: '#ffffff',
        padding: '5.5rem 1.5rem',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Shapes decorativas */}
        <div style={{ position:'absolute', top:-80, left:'5%', width:220, height:220, background:'#b8edd0', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.18, pointerEvents:'none', animation:'heroFa 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-120, right:'4%', width:260, height:260, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.14, pointerEvents:'none', animation:'heroFd 18s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'40%', right:-60, width:120, height:96, background:'#f8ee91', borderRadius:'0 0 48px 48px', opacity:.28, pointerEvents:'none', animation:'heroFb 14s ease-in-out infinite 1s' }} />

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:'2.8rem' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:14 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              ¿Para quién?
            </span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.1, color:'#043941', margin:0 }}>
              Una plataforma,{' '}
              <span style={{ color:'#02d47e' }}>tres experiencias</span>
            </h2>
          </div>

          {/* Tab buttons */}
          <div style={{ display:'flex', justifyContent:'center', gap:10, marginBottom:'3rem', flexWrap:'wrap' }}>
            {([
              { key: 'docente',  emoji: '🔧', label: 'Docente',  activeColor:'#043941', activeBg:'#043941', activeText:'#fff' },
              { key: 'alumno',   emoji: '⭐', label: 'Alumno',   activeColor:'#02d47e', activeBg:'#e8fff4', activeText:'#043941' },
              { key: 'director', emoji: '📊', label: 'Director', activeColor:'#f59e0b', activeBg:'#fffbeb', activeText:'#92400e' },
            ] as const).map(tab => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:8,
                    padding:'.65rem 1.6rem', borderRadius:100,
                    fontSize:'.85rem', fontWeight:800,
                    border: isActive ? `2px solid ${tab.activeColor}` : '2px solid rgba(4,57,65,0.1)',
                    background: isActive ? (tab.key === 'docente' ? '#043941' : tab.activeBg) : 'transparent',
                    color: isActive ? tab.activeText : 'rgba(4,57,65,0.5)',
                    cursor:'pointer',
                    transition:'all .25s cubic-bezier(.4,0,.2,1)',
                    boxShadow: isActive ? `0 4px 16px ${tab.activeColor}30` : 'none',
                  }}
                >
                  <span style={{ fontSize:'1rem' }}>{tab.emoji}</span>
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'docente' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center', animation:'fadeInUp .4s ease both' }}>
              {/* Texto */}
              <div>
                <span style={{ display:'inline-block', fontSize:'.68rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', background:'rgba(4,57,65,.08)', color:'#043941', padding:'.3rem .85rem', borderRadius:100, marginBottom:20 }}>
                  🔧 Para Docentes EPT
                </span>
                <h3 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:900, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
                  Domina tu taller,<br />
                  <span style={{ color:'#02d47e' }}>certifícate y enseña</span><br />
                  con confianza.
                </h3>
                <p style={{ fontSize:'.9rem', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:'0 0 1.8rem' }}>
                  7 módulos progresivos para que conozcas, instales y operes cada equipo de tu especialidad. Fichas descargables, videos y sesiones en vivo incluidos.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:'2rem' }}>
                  {[
                    '7 módulos por especialidad técnica',
                    'Fichas plastificables listas para usar en aula',
                    'Certificación reconocida por MINEDU',
                    'Avanza a tu propio ritmo, sin fechas límite',
                    'Acceso permanente a todo el material',
                  ].map((feat, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ width:20, height:20, borderRadius:'50%', background:'rgba(2,212,126,.15)', border:'1.5px solid #02d47e', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke="#02d47e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span style={{ fontSize:'.85rem', fontWeight:600, color:'#043941' }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/login')}
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#043941', color:'#fff', fontSize:'.88rem', fontWeight:800, padding:'1rem 2rem', borderRadius:100, border:'none', cursor:'pointer', boxShadow:'0 6px 20px rgba(4,57,65,.25)', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#045f6c'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(4,57,65,.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='#043941'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 20px rgba(4,57,65,.25)' }}
                >
                  Comenzar mi formación <ArrowRight size={15} />
                </button>
              </div>
              {/* Imagen */}
              <div style={{ position:'relative', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 64px rgba(4,57,65,.16)' }}>
                <img
                  src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=700&q=80"
                  alt="Docente EPT en taller"
                  style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, transparent 50%, rgba(4,57,65,.55) 100%)' }} />
                {/* Badge flotante */}
                <div style={{ position:'absolute', bottom:20, left:20, background:'rgba(255,255,255,.95)', backdropFilter:'blur(8px)', borderRadius:14, padding:'10px 16px', boxShadow:'0 8px 24px rgba(0,0,0,.12)' }}>
                  <p style={{ margin:0, fontSize:'.68rem', fontWeight:700, color:'rgba(4,57,65,.5)', letterSpacing:'.06em', textTransform:'uppercase' }}>Talleres disponibles</p>
                  <p style={{ margin:'2px 0 0', fontSize:'1.3rem', fontWeight:900, color:'#043941' }}>{talleresConfig.length} especialidades</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alumno' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center', animation:'fadeInUp .4s ease both' }}>
              {/* Texto */}
              <div>
                <span style={{ display:'inline-block', fontSize:'.68rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', background:'rgba(2,212,126,.12)', color:'#047857', padding:'.3rem .85rem', borderRadius:100, marginBottom:20 }}>
                  ⭐ Para Alumnos
                </span>
                <h3 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:900, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
                  Aprende haciendo,<br />
                  <span style={{ color:'#02d47e' }}>a tu ritmo</span><br />
                  y con tu docente.
                </h3>
                <p style={{ fontSize:'.9rem', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:'0 0 1.8rem' }}>
                  Contenido interactivo guiado por tu docente. Proyectos prácticos para aplicar lo que aprendes en tu especialidad técnica.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:'2rem' }}>
                  {[
                    'Proyectos prácticos con materiales reales',
                    'Contenido adaptado a tu nivel y ritmo',
                    'Sigue el avance de tu proyecto en tiempo real',
                    'Portafolio digital de tus logros',
                  ].map((feat, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ width:20, height:20, borderRadius:'50%', background:'rgba(2,212,126,.15)', border:'1.5px solid #02d47e', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke="#02d47e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span style={{ fontSize:'.85rem', fontWeight:600, color:'#043941' }}>{feat}</span>
                    </div>
                  ))}
                </div>
                {/* Proyectos "en proceso" */}
                <div style={{ display:'flex', gap:10, marginBottom:'1.8rem' }}>
                  {[
                    { nombre:'Kit de Robótica', color:'#d4c4fc', textColor:'#5b21b6' },
                    { nombre:'Kit de Matemáticas', color:'#fde68a', textColor:'#92400e' },
                  ].map(p => (
                    <div key={p.nombre} style={{ display:'flex', alignItems:'center', gap:6, background:p.color + '33', border:`1px solid ${p.color}`, borderRadius:100, padding:'.3rem .9rem' }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background:p.color }} />
                      <span style={{ fontSize:'.72rem', fontWeight:700, color:p.textColor }}>{p.nombre}</span>
                      <span style={{ fontSize:'.65rem', fontWeight:600, color:p.textColor, opacity:.7 }}>· En proceso</span>
                    </div>
                  ))}
                </div>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.35)', fontSize:'.88rem', fontWeight:800, padding:'1rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
                >
                  Próximamente <span style={{ fontSize:'.7rem', fontWeight:600, background:'#f8ee91', color:'#92400e', padding:'.15rem .5rem', borderRadius:100 }}>Beta 2025</span>
                </button>
              </div>
              {/* Imagen */}
              <div style={{ position:'relative', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 64px rgba(4,57,65,.16)' }}>
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80"
                  alt="Alumno en taller EPT"
                  style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, transparent 50%, rgba(4,57,65,.55) 100%)' }} />
                <div style={{ position:'absolute', bottom:20, left:20, background:'rgba(255,255,255,.95)', backdropFilter:'blur(8px)', borderRadius:14, padding:'10px 16px', boxShadow:'0 8px 24px rgba(0,0,0,.12)' }}>
                  <p style={{ margin:0, fontSize:'.68rem', fontWeight:700, color:'rgba(4,57,65,.5)', letterSpacing:'.06em', textTransform:'uppercase' }}>Proyectos disponibles</p>
                  <p style={{ margin:'2px 0 0', fontSize:'1.3rem', fontWeight:900, color:'#043941' }}>2 en proceso</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'director' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center', animation:'fadeInUp .4s ease both' }}>
              {/* Texto */}
              <div>
                <span style={{ display:'inline-block', fontSize:'.68rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', background:'rgba(245,158,11,.12)', color:'#92400e', padding:'.3rem .85rem', borderRadius:100, marginBottom:20 }}>
                  📊 Para Directores
                </span>
                <h3 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:900, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
                  Monitorea el avance<br />
                  <span style={{ color:'#f59e0b' }}>pedagógico</span><br />
                  de tu institución.
                </h3>
                <p style={{ fontSize:'.9rem', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:'0 0 1.8rem' }}>
                  Visibilidad completa del progreso de tus docentes en formación. Reportes por taller, módulo y avance individual en tiempo real.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:'2rem' }}>
                  {[
                    'Dashboard de avance por taller y docente',
                    'Alertas de docentes sin iniciar formación',
                    'Reportes exportables para UGEL',
                    'Semáforo de cumplimiento por especialidad',
                  ].map((feat, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ width:20, height:20, borderRadius:'50%', background:'rgba(245,158,11,.15)', border:'1.5px solid #f59e0b', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span style={{ fontSize:'.85rem', fontWeight:600, color:'#043941' }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.35)', fontSize:'.88rem', fontWeight:800, padding:'1rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
                >
                  En desarrollo <span style={{ fontSize:'.7rem', fontWeight:600, background:'rgba(245,158,11,.15)', color:'#92400e', padding:'.15rem .5rem', borderRadius:100 }}>Pronto</span>
                </button>
              </div>
              {/* Imagen */}
              <div style={{ position:'relative', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 64px rgba(4,57,65,.16)' }}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                  alt="Director monitoreando institución"
                  style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, transparent 50%, rgba(4,57,65,.55) 100%)' }} />
                <div style={{ position:'absolute', bottom:20, left:20, background:'rgba(255,255,255,.95)', backdropFilter:'blur(8px)', borderRadius:14, padding:'10px 16px', boxShadow:'0 8px 24px rgba(0,0,0,.12)' }}>
                  <p style={{ margin:0, fontSize:'.68rem', fontWeight:700, color:'rgba(4,57,65,.5)', letterSpacing:'.06em', textTransform:'uppercase' }}>Módulo de seguimiento</p>
                  <p style={{ margin:'2px 0 0', fontSize:'1.3rem', fontWeight:900, color:'#043941' }}>En desarrollo</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ══ TALLERES (role-aware) ════════════════════════════════════════════ */}
      <section id="talleres" style={{ background: '#f0fdf6', padding: '5rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shapes */}
        <div style={{ position:'absolute', top:-70, left:'8%', width:108, height:260, background:'#f8ee91', borderRadius:'0 0 54px 54px', opacity:.32, pointerEvents:'none', animation:'heroFb 13s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-100, right:'6%', width:300, height:300, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.28, pointerEvents:'none', animation:'heroFd 16s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'14%', left:'5%', width:52, height:52, background:'#02d47e', clipPath:'polygon(38% 0%,62% 0%,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0% 62%,0% 38%,38% 38%)', animation:'heroSpin 24s linear infinite', pointerEvents:'none', opacity:.45 }} />

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header dinámico */}
          <div style={{ textAlign:'center', maxWidth:640, margin:'0 auto 3.2rem' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:14 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              {activeTab === 'docente' && 'Especialidades disponibles'}
              {activeTab === 'alumno'  && 'Proyectos en desarrollo'}
              {activeTab === 'director' && 'Estado por especialidad'}
            </span>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, lineHeight:1.1, color:'#043941', margin:'0 0 .75rem' }}>
              {activeTab === 'docente' && <>{talleresConfig.length} especialidades <span style={{ color:'#02d47e' }}>técnicas</span></>}
              {activeTab === 'alumno'  && <>Proyectos <span style={{ color:'#02d47e' }}>para alumnos</span></>}
              {activeTab === 'director' && <>Seguimiento <span style={{ color:'#f59e0b' }}>por taller</span></>}
            </h2>
            <p style={{ fontSize:'.875rem', color:'rgba(4,57,65,.5)', lineHeight:1.75, margin:0 }}>
              {activeTab === 'docente' && 'Haz clic en cualquier taller para ver su ruta de aprendizaje y equipamiento.'}
              {activeTab === 'alumno'  && 'Kits de proyectos guiados por tu docente. Más especialidades en camino.'}
              {activeTab === 'director' && 'Vista global del avance de formación docente en tu institución.'}
            </p>
          </div>

          {/* ── DOCENTE: grid de talleres ── */}
          {activeTab === 'docente' && (
            <div style={{ animation:'fadeInUp .4s ease both' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16, marginBottom:'2.5rem' }}>
                {talleresConfig.map((t, i) => (
                  <div
                    key={t.slug}
                    onClick={() => openModal(i)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(4,57,65,.15)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(4,57,65,.07)' }}
                    style={{ borderRadius:16, overflow:'hidden', background:'#fff', cursor:'pointer', boxShadow:'0 4px 16px rgba(4,57,65,.07)', transition:'transform .25s ease, box-shadow .25s ease' }}
                  >
                    {/* Franja color */}
                    <div style={{ height:4, background:`hsl(${t.color})` }} />
                    {/* Imagen */}
                    <div style={{ height:130, position:'relative', overflow:'hidden' }}>
                      <img src={t.imagen} alt={t.nombre} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.72) saturate(.85)' }} />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(170deg, rgba(4,57,65,.04) 0%, rgba(4,57,65,.75) 100%)' }} />
                      <div style={{ position:'absolute', top:10, left:10, display:'inline-flex', alignItems:'center', gap:5, background:'rgba(4,57,65,.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.14)', borderRadius:100, padding:'.22rem .65rem' }}>
                        <span style={{ width:5, height:5, borderRadius:'50%', background:'#02d47e', display:'inline-block' }} />
                        <span style={{ fontSize:'.58rem', fontWeight:800, letterSpacing:'.12em', color:'rgba(255,255,255,.92)' }}>T{String(t.numero).padStart(2,'0')}</span>
                      </div>
                      <h3 style={{ position:'absolute', bottom:10, left:12, right:12, margin:0, fontSize:'.82rem', fontWeight:900, color:'#fff', lineHeight:1.2 }}>{t.nombre}</h3>
                    </div>
                    {/* Footer */}
                    <div style={{ padding:'10px 14px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontSize:'.68rem', fontWeight:700, color:'rgba(4,57,65,.45)' }}>7 módulos · 150h</span>
                      <div style={{ width:24, height:24, borderRadius:'50%', background:`hsl(${t.color})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <ChevronRight size={11} color="#fff" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:'center' }}>
                <button
                  onClick={goToApp}
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#02d47e', color:'#043941', fontSize:'.9rem', fontWeight:800, padding:'1rem 2.2rem', borderRadius:100, boxShadow:'0 6px 22px rgba(2,212,126,.4)', border:'none', cursor:'pointer', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='0 10px 32px rgba(2,212,126,.55)'; e.currentTarget.style.transform='translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='0 6px 22px rgba(2,212,126,.4)'; e.currentTarget.style.transform='none' }}
                >
                  Acceder a la plataforma completa <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* ── ALUMNO: proyectos "en proceso" ── */}
          {activeTab === 'alumno' && (
            <div style={{ animation:'fadeInUp .4s ease both' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:20, marginBottom:'2.5rem', maxWidth:720, margin:'0 auto 2.5rem' }}>
                {[
                  { nombre:'Kit de Robótica', desc:'Introducción a robótica y automatización. Armado, programación y competencias con módulos Arduino.', color:'#d4c4fc', textColor:'#5b21b6', emoji:'🤖', modulos:4 },
                  { nombre:'Kit de Matemáticas', desc:'Actividades prácticas para fortalecer razonamiento matemático con materiales manipulativos y retos.', color:'#fde68a', textColor:'#92400e', emoji:'📐', modulos:3 },
                ].map(p => (
                  <div key={p.nombre} style={{ borderRadius:20, overflow:'hidden', background:'#fff', boxShadow:'0 4px 20px rgba(4,57,65,.07)', border:`1px solid ${p.color}55` }}>
                    {/* Header color */}
                    <div style={{ background:`${p.color}33`, padding:'1.6rem', display:'flex', alignItems:'flex-start', justifyContent:'space-between', borderBottom:`1px solid ${p.color}44` }}>
                      <div>
                        <span style={{ fontSize:'2rem', display:'block', marginBottom:8 }}>{p.emoji}</span>
                        <h3 style={{ margin:0, fontSize:'1.05rem', fontWeight:900, color:'#043941', lineHeight:1.2 }}>{p.nombre}</h3>
                      </div>
                      <span style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', background:p.color, color:p.textColor, padding:'.3rem .7rem', borderRadius:100, whiteSpace:'nowrap', flexShrink:0 }}>
                        En proceso
                      </span>
                    </div>
                    <div style={{ padding:'1.2rem 1.4rem 1.4rem' }}>
                      <p style={{ fontSize:'.84rem', color:'rgba(4,57,65,.6)', lineHeight:1.7, margin:'0 0 1rem' }}>{p.desc}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ flex:1, height:6, borderRadius:100, background:'rgba(4,57,65,.07)', overflow:'hidden' }}>
                          <div style={{ width:'35%', height:'100%', borderRadius:100, background:`linear-gradient(90deg, ${p.color}, ${p.color}bb)` }} />
                        </div>
                        <span style={{ fontSize:'.7rem', fontWeight:700, color:'rgba(4,57,65,.45)', whiteSpace:'nowrap' }}>{p.modulos} mód. · Beta</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:'center' }}>
                <p style={{ fontSize:'.82rem', color:'rgba(4,57,65,.4)', margin:'0 0 .8rem' }}>Más kits en desarrollo — disponibles en 2025</p>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.3)', fontSize:'.88rem', fontWeight:800, padding:'.9rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
                >
                  Próximamente para alumnos
                </button>
              </div>
            </div>
          )}

          {/* ── DIRECTOR: semáforo por taller ── */}
          {activeTab === 'director' && (
            <div style={{ animation:'fadeInUp .4s ease both' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:14, marginBottom:'2.5rem' }}>
                {talleresConfig.map((t, i) => {
                  const semaforos = ['verde','verde','amarillo','rojo','verde','amarillo','verde','rojo','amarillo'] as const
                  const sem = semaforos[i % semaforos.length]
                  const semColor = sem === 'verde' ? '#02d47e' : sem === 'amarillo' ? '#f59e0b' : '#ef4444'
                  const semLabel = sem === 'verde' ? 'Al día' : sem === 'amarillo' ? 'En progreso' : 'Sin iniciar'
                  const pct = sem === 'verde' ? 78 + (i * 7) % 22 : sem === 'amarillo' ? 30 + (i * 11) % 30 : 0
                  return (
                    <div key={t.slug} style={{ borderRadius:14, background:'#fff', boxShadow:'0 2px 12px rgba(4,57,65,.06)', border:'1px solid rgba(4,57,65,.07)', padding:'14px 16px', display:'flex', alignItems:'center', gap:14 }}>
                      {/* Dot semáforo */}
                      <div style={{ width:10, height:10, borderRadius:'50%', background:semColor, boxShadow:`0 0 0 3px ${semColor}30`, flexShrink:0 }} />
                      {/* Info */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                          <span style={{ fontSize:'.82rem', fontWeight:800, color:'#043941', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:160 }}>{t.nombre}</span>
                          <span style={{ fontSize:'.65rem', fontWeight:700, color:semColor, background:`${semColor}15`, padding:'.2rem .55rem', borderRadius:100, flexShrink:0, marginLeft:8 }}>{semLabel}</span>
                        </div>
                        <div style={{ height:5, borderRadius:100, background:'rgba(4,57,65,.07)', overflow:'hidden' }}>
                          <div style={{ width:`${pct}%`, height:'100%', borderRadius:100, background:`linear-gradient(90deg, ${semColor}, ${semColor}cc)`, transition:'width .6s ease' }} />
                        </div>
                        <span style={{ fontSize:'.68rem', color:'rgba(4,57,65,.4)', marginTop:4, display:'block' }}>{pct}% docentes formados</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ textAlign:'center' }}>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.3)', fontSize:'.88rem', fontWeight:800, padding:'.9rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
                >
                  Dashboard completo — En desarrollo
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ══ CÓMO FUNCIONA (3 pasos) ══════════════════════════════════════════ */}
      <section id="como" style={{ background: '#ffffff', padding: '5.5rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shapes */}
        <div style={{ position:'absolute', top:-100, right:'5%', width:260, height:260, background:'#02d47e', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.07, pointerEvents:'none', animation:'heroFa 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-80, left:'6%', width:200, height:200, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.12, pointerEvents:'none', animation:'heroFd 18s ease-in-out infinite 2s' }} />

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:14 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              Cómo funciona
            </span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.1, color:'#043941', margin:0 }}>
              Tu formación en{' '}
              <span style={{ color:'#02d47e' }}>tres pasos</span>
            </h2>
          </div>

          {/* Steps */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, position:'relative' }}>

            {/* Línea conectora */}
            <div style={{ position:'absolute', top:44, left:'16.66%', right:'16.66%', height:2, background:'linear-gradient(90deg, #02d47e, #b8edd0, #02d47e)', opacity:.35, zIndex:0 }} />

            {([
              {
                n: '01',
                emoji: '🎯',
                title: 'Elige tu especialidad',
                desc: 'Selecciona tu taller EPT — Mecánica, Cocina, Confección y más. Tu ruta de aprendizaje se configura automáticamente.',
                badges: ['9 especialidades', 'Ruta personalizada'],
                color: '#02d47e',
                bg: 'rgba(2,212,126,.08)',
              },
              {
                n: '02',
                emoji: '📚',
                title: 'Aprende a tu ritmo',
                desc: '7 módulos con video, fichas técnicas descargables y sesiones en vivo. Sin fechas límite — avanza cuando puedas.',
                badges: ['7 módulos', '150h formación', 'Sin fechas límite'],
                color: '#5b8def',
                bg: 'rgba(91,141,239,.08)',
              },
              {
                n: '03',
                emoji: '🏆',
                title: 'Certifícate y enseña',
                desc: 'Aprueba la evaluación final, descarga tu certificado reconocido por MINEDU y lleva ese conocimiento al aula.',
                badges: ['Certificado MINEDU', 'Material permanente'],
                color: '#f59e0b',
                bg: 'rgba(245,158,11,.08)',
              },
            ] as const).map((step, i) => (
              <div key={i} style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'0 2rem' }}>

                {/* Número + icono */}
                <div style={{ position:'relative', marginBottom:'1.6rem' }}>
                  <div style={{ width:88, height:88, borderRadius:'50%', background:step.bg, border:`2px solid ${step.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', boxShadow:`0 8px 24px ${step.color}20` }}>
                    {step.emoji}
                  </div>
                  <div style={{ position:'absolute', top:-6, right:-6, width:26, height:26, borderRadius:'50%', background:step.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.62rem', fontWeight:900, color: step.color === '#f59e0b' ? '#92400e' : '#043941', boxShadow:`0 4px 10px ${step.color}55` }}>
                    {step.n}
                  </div>
                </div>

                <h3 style={{ fontSize:'1.05rem', fontWeight:900, color:'#043941', margin:'0 0 .75rem', lineHeight:1.25 }}>{step.title}</h3>
                <p style={{ fontSize:'.84rem', color:'rgba(4,57,65,.6)', lineHeight:1.75, margin:'0 0 1.2rem' }}>{step.desc}</p>

                {/* Badges */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center' }}>
                  {step.badges.map(b => (
                    <span key={b} style={{ fontSize:'.65rem', fontWeight:700, background:step.bg, color: step.color === '#5b8def' ? '#3b60c4' : step.color === '#f59e0b' ? '#92400e' : '#047857', padding:'.25rem .65rem', borderRadius:100, border:`1px solid ${step.color}25` }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA central */}
          <div style={{ textAlign:'center', marginTop:'3.5rem' }}>
            <button
              onClick={() => navigate('/login')}
              style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#043941', color:'#fff', fontSize:'.9rem', fontWeight:800, padding:'1rem 2.4rem', borderRadius:100, border:'none', cursor:'pointer', boxShadow:'0 8px 24px rgba(4,57,65,.25)', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#045f6c'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(4,57,65,.35)' }}
              onMouseLeave={e => { e.currentTarget.style.background='#043941'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 24px rgba(4,57,65,.25)' }}
            >
              Comenzar mi formación — gratis <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </section>

      {/* ══ FAQ + CTA ════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ background: '#f0fdf6', padding: '5.5rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shapes */}
        <div style={{ position:'absolute', top:-100, left:'10%', width:280, height:280, background:'#b8edd0', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.2, pointerEvents:'none', animation:'heroFa 17s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-100, right:'5%', width:240, height:240, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.16, pointerEvents:'none', animation:'heroFd 19s ease-in-out infinite 2s' }} />

        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 340px', gap:48, alignItems:'start' }}>

          {/* FAQ accordion */}
          <div>
            <div style={{ marginBottom:'2rem' }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:14 }}>
                <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
                Preguntas frecuentes
              </span>
              <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, lineHeight:1.15, color:'#043941', margin:0 }}>
                Todo lo que necesitas<br />
                <span style={{ color:'#02d47e' }}>saber antes de empezar</span>
              </h2>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {FAQ_ITEMS.map((item, i) => {
                const faqColors = ['#02d47e','#5b8def','#d4c4fc','#f59e0b','#b8edd0']
                const color = faqColors[i % faqColors.length]
                const isOpen = open === i
                return (
                  <div
                    key={i}
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      borderRadius:16,
                      overflow:'hidden',
                      background: isOpen ? '#fff' : 'transparent',
                      border: `1px solid ${isOpen ? color + '30' : 'rgba(4,57,65,.07)'}`,
                      boxShadow: isOpen ? `0 8px 32px ${color}18` : 'none',
                      cursor:'pointer',
                      transition:'all .3s cubic-bezier(.4,0,.2,1)',
                    }}
                  >
                    <div style={{ display:'flex', gap:14, padding:'1.25rem 1.4rem', alignItems:'flex-start', borderLeft:`5px solid ${isOpen ? color : 'rgba(4,57,65,.1)'}`, transition:'border-color .3s' }}>
                      <div style={{ width:30, height:30, borderRadius:10, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'transform .3s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                        <span style={{ fontSize:'1rem', fontWeight:800, color:color, lineHeight:1 }}>+</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:'.92rem', fontWeight:800, color:'#043941', margin:0, lineHeight:1.4 }}>{item.q}</p>
                        {isOpen && (
                          <p style={{ fontSize:'.83rem', color:'rgba(4,57,65,.5)', lineHeight:1.75, margin:'10px 0 0', paddingTop:10, borderTop:`1px solid ${color}20` }}>
                            {item.a}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA card sticky */}
          <div style={{ position:'sticky', top:100 }}>
            <div style={{ borderRadius:24, overflow:'hidden', background:'linear-gradient(145deg, #043941 0%, #032e34 100%)', boxShadow:'0 20px 56px rgba(4,57,65,.28)', border:'1px solid rgba(2,212,126,.1)', position:'relative' }}>
              {/* Glow fondo */}
              <div style={{ position:'absolute', bottom:-60, right:-60, width:200, height:200, background:'radial-gradient(circle, rgba(2,212,126,.14) 0%, transparent 70%)', pointerEvents:'none' }} />

              <div style={{ position:'relative', zIndex:1, padding:'2.2rem' }}>
                {/* Badge */}
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(2,212,126,.18)', border:'1px solid rgba(2,212,126,.25)', borderRadius:100, padding:'.3rem .8rem', marginBottom:'1.4rem' }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#02d47e', boxShadow:'0 0 0 2px rgba(2,212,126,.35)', display:'inline-block' }} />
                  <span style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', color:'#02d47e' }}>Respuesta &lt; 24h</span>
                </div>

                {/* Icono */}
                <div style={{ width:52, height:52, borderRadius:14, background:'rgba(2,212,126,.12)', border:'1px solid rgba(2,212,126,.18)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.2rem', fontSize:'1.7rem' }}>
                  🚀
                </div>

                <h3 style={{ fontSize:'1.15rem', fontWeight:900, color:'#fff', margin:'0 0 10px', lineHeight:1.25 }}>
                  ¿Listo para empezar?
                </h3>
                <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.5)', margin:'0 0 1.8rem', lineHeight:1.7 }}>
                  Accede a la plataforma o escríbenos directamente. Te ayudamos a incorporar tu colegio en menos de 24h.
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <button
                    onClick={goToApp}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.95rem 1.2rem', borderRadius:12, background:'#02d47e', color:'#043941', fontWeight:800, fontSize:'.85rem', border:'none', cursor:'pointer', transition:'all .2s', boxShadow:'0 4px 16px rgba(2,212,126,.35)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(2,212,126,.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 16px rgba(2,212,126,.35)' }}
                  >
                    🚀 Ingresar a la plataforma
                  </button>

                  <a
                    href="https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP+%F0%9F%91%8B"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.95rem 1.2rem', borderRadius:12, background:'#25d366', color:'#fff', fontWeight:800, fontSize:'.85rem', textDecoration:'none', transition:'all .2s', boxShadow:'0 4px 12px rgba(37,211,102,.25)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(37,211,102,.45)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 12px rgba(37,211,102,.25)' }}
                  >
                    💬 WhatsApp
                  </a>

                  <a
                    href="mailto:contacto@grama.pe"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.95rem 1.2rem', borderRadius:12, background:'transparent', color:'rgba(255,255,255,.65)', fontWeight:700, fontSize:'.85rem', textDecoration:'none', border:'1px solid rgba(255,255,255,.14)', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,.25)' }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,.14)' }}
                  >
                    📧 Escribir por email
                  </a>
                </div>

                <p style={{ fontSize:'.68rem', textAlign:'center', margin:'1.4rem 0 0', color:'rgba(255,255,255,.25)', lineHeight:1.5 }}>
                  Equipo GRAMA · Programa TSF-MINEDU
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
      <footer style={{ background: '#032e34', position:'relative', overflow:'hidden' }}>

        {/* Glow decorativo */}
        <div style={{ position:'absolute', top:-120, left:'20%', width:400, height:400, background:'radial-gradient(circle, rgba(2,212,126,.06) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, right:'10%', width:300, height:300, background:'radial-gradient(circle, rgba(2,212,126,.04) 0%, transparent 70%)', pointerEvents:'none' }} />

        {/* Banda superior verde */}
        <div style={{ height:3, background:'linear-gradient(90deg, #02d47e, #b8edd0 50%, #02d47e)' }} />

        {/* Contenido principal */}
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'4rem 1.5rem 2.5rem', position:'relative', zIndex:1 }}>

          {/* Grid 4 columnas */}
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:'3rem' }}>

            {/* Col 1 — Marca */}
            <div>
              <GramaLogo variant="light" size="sm" />
              <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.45)', lineHeight:1.75, margin:'14px 0 20px', maxWidth:260 }}>
                Formación técnica híbrida para docentes EPT. Diseñado con MINEDU para talleres especializados en todo el Perú.
              </p>
              {/* Badge MINEDU */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(2,212,126,.1)', border:'1px solid rgba(2,212,126,.18)', borderRadius:100, padding:'.35rem .9rem' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#02d47e', display:'inline-block', flexShrink:0 }} />
                <span style={{ fontSize:'.62rem', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', color:'#02d47e' }}>Programa TSF · MINEDU Perú</span>
              </div>
            </div>

            {/* Col 2 — Plataforma */}
            <div>
              <p style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:16 }}>Plataforma</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { label:'Acceder', href:'/login' },
                  { label:'¿Para quién?', href:'#perfiles' },
                  { label:'Cómo funciona', href:'#como' },
                  { label:'Especialidades', href:'#talleres' },
                  { label:'Preguntas frecuentes', href:'#faq' },
                ].map(l => (
                  <a key={l.label} href={l.href}
                    style={{ fontSize:'.82rem', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                  >{l.label}</a>
                ))}
              </div>
            </div>

            {/* Col 3 — Talleres */}
            <div>
              <p style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:16 }}>Talleres EPT</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {talleresConfig.slice(0, 5).map(t => (
                  <a key={t.slug} href={`#talleres`}
                    style={{ fontSize:'.82rem', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s', display:'flex', alignItems:'center', gap:6 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                  >
                    <span style={{ width:4, height:4, borderRadius:'50%', background:'rgba(2,212,126,.4)', flexShrink:0 }} />
                    {t.nombreCorto}
                  </a>
                ))}
                <span style={{ fontSize:'.75rem', color:'rgba(255,255,255,.25)', marginTop:2 }}>+ {talleresConfig.length - 5} más</span>
              </div>
            </div>

            {/* Col 4 — Contacto */}
            <div>
              <p style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:16 }}>Contacto</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <a
                  href="https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.82rem', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#25d366')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                >
                  💬 WhatsApp
                </a>
                <a href="mailto:contacto@grama.pe"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.82rem', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                >
                  📧 contacto@grama.pe
                </a>
                <p style={{ fontSize:'.75rem', color:'rgba(255,255,255,.22)', margin:'8px 0 0', lineHeight:1.6 }}>
                  Soporte: Lun–Vie<br/>Respuesta &lt; 24h
                </p>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div style={{ height:1, background:'rgba(255,255,255,.07)', marginBottom:'1.8rem' }} />

          {/* Bottom bar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <p style={{ fontSize:'.72rem', color:'rgba(255,255,255,.22)', margin:0 }}>
              © {new Date().getFullYear()} GRAMA Proyectos Educativos · Todos los derechos reservados
            </p>
            <div style={{ display:'flex', gap:20 }}>
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href}
                  style={{ fontSize:'.72rem', fontWeight:600, color:'rgba(255,255,255,.3)', textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.3)')}
                >{l.label}</a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}
