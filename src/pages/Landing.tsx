// src/pages/Landing.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, ArrowRight,
  Menu, X, Wrench, BookOpen,
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

  const [open, setOpen] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'docente' | 'alumno' | 'director'>('docente')
  const [selectedTaller, setSelectedTaller] = useState(0)

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
        <div style={{ position:'absolute', bottom:-160, left:-120, width:520, height:520, background:'#02d47e', clipPath:'polygon(0 0,100% 0,0 100%)', opacity:.07, pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, background:'#043941', clipPath:'polygon(100% 0,100% 100%,0 100%)', opacity:.06, pointerEvents:'none' }} />

        {/* Triángulos flotantes */}
        <div style={{ position:'absolute', top:'10%', left:'6%', width:110, height:110, background:'#02d47e', clipPath:'polygon(50% 0,100% 100%,0 100%)', opacity:.28, animation:'heroFb 11s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'20%', right:'6%', width:90, height:90, background:'#d4c4fc', clipPath:'polygon(50% 0,100% 100%,0 100%)', opacity:.45, animation:'heroFb 9s ease-in-out infinite 1.5s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'20%', left:'5%', width:80, height:80, background:'#f8ee91', clipPath:'polygon(50% 100%,0 0,100% 0)', opacity:.5, animation:'heroFd 13s ease-in-out infinite 1s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'28%', right:'5%', width:70, height:70, background:'#b8edd0', clipPath:'polygon(50% 0,100% 100%,0 100%)', opacity:.55, animation:'heroFb 10s ease-in-out infinite 3s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'48%', left:'22%', width:60, height:60, background:'#d4c4fc', clipPath:'polygon(50% 100%,0 0,100% 0)', opacity:.3, animation:'heroFa 14s ease-in-out infinite 2s', pointerEvents:'none' }} />

        {/* Círculos */}
        <div style={{ position:'absolute', top:'8%', right:'20%', width:110, height:110, borderRadius:'50%', background:'#f8ee91', opacity:.3, animation:'heroFf 8s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'52%', left:'2%', width:80, height:80, borderRadius:'50%', background:'#d4c4fc', opacity:.38, animation:'heroFf 12s ease-in-out infinite 2s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'15%', right:'16%', width:60, height:60, borderRadius:'50%', background:'#02d47e', opacity:.3, animation:'heroFf 9s ease-in-out infinite 1s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'35%', left:'26%', width:44, height:44, borderRadius:'50%', background:'#b8edd0', opacity:.35, animation:'heroFf 14s ease-in-out infinite 3s', pointerEvents:'none' }} />

        {/* Cruces / símbolo + */}
        <svg style={{ position:'absolute', top:'26%', left:'2%', width:64, height:64, opacity:.35, animation:'heroFe 11s ease-in-out infinite', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#02d47e"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#02d47e"/>
        </svg>
        <svg style={{ position:'absolute', top:'13%', left:'38%', width:52, height:52, opacity:.32, animation:'heroFe 9s ease-in-out infinite 2s', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#d4c4fc"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#d4c4fc"/>
        </svg>
        <svg style={{ position:'absolute', bottom:'25%', right:'3%', width:56, height:56, opacity:.38, animation:'heroFe 13s ease-in-out infinite 1s', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#f8ee91"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#f8ee91"/>
        </svg>
        <svg style={{ position:'absolute', top:'62%', right:'24%', width:44, height:44, opacity:.3, animation:'heroFe 10s ease-in-out infinite 3.5s', pointerEvents:'none' }} viewBox="0 0 28 28">
          <rect x="11" y="2" width="6" height="24" rx="3" fill="#b8edd0"/>
          <rect x="2" y="11" width="24" height="6" rx="3" fill="#b8edd0"/>
        </svg>

        {/* Cuadrado rotado */}
        <div style={{ position:'absolute', top:'28%', left:'43%', width:150, height:150, background:'#f8ee91', borderRadius:20, opacity:.13, transform:'rotate(22deg)', animation:'heroFf 10s ease-in-out infinite', pointerEvents:'none' }} />

        {/* ── Columna izquierda ── */}
        <div style={{ position:'relative', zIndex:2, animation:'heroNavIn .7s ease both' }}>

          {/* H1 */}
          <h1 style={{ fontSize:'clamp(2.4rem,4.2vw,3.8rem)', fontWeight:800, lineHeight:1.04, letterSpacing:'-1.8px', color:'#043941', marginBottom:20 }}>
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
              <span style={{ display:'block', fontSize:'clamp(1.4rem,2.5vw,2rem)', fontWeight:800, color:'#02d47e', lineHeight:1, letterSpacing:'-.04em', marginBottom:4 }}>
                {s.n}<span style={{ color:'rgba(255,255,255,.6)', fontSize:'.7em' }}>{s.hi}</span>
              </span>
              <span style={{ fontSize:'var(--t-overline)', fontWeight:600, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', textTransform:'uppercase' }}>{s.label}</span>
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
        <div style={{ position:'absolute', top:-80, left:'5%', width:220, height:220, background:'#b8edd0', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.4, pointerEvents:'none', animation:'heroFa 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-120, right:'4%', width:260, height:260, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.4, pointerEvents:'none', animation:'heroFd 18s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'40%', right:-60, width:120, height:96, background:'#f8ee91', borderRadius:'0 0 48px 48px', opacity:.4, pointerEvents:'none', animation:'heroFb 14s ease-in-out infinite 1s' }} />

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:'2.8rem' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'var(--t-label)', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:14 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              ¿Para quién?
            </span>
            <h2 style={{ fontSize:'var(--t-display)', fontWeight:800, lineHeight:1.1, color:'#043941', margin:0 }}>
              Una plataforma,{' '}
              <span style={{ color:'#02d47e' }}>tres experiencias</span>
            </h2>
          </div>

          {/* Tab selector — cards de rol */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:'1rem' }}>
            {([
              { key: 'docente',  emoji: '🔧', label: 'Docente',  tagline:'Capacitación y certificación', activeColor:'#043941', activeBg:'#043941', activeText:'#fff',    accentBar:'#02d47e',  hoverBg:'rgba(4,57,65,.04)' },
              { key: 'alumno',   emoji: '⭐', label: 'Alumno',   tagline:'Proyectos prácticos guiados',  activeColor:'#02d47e', activeBg:'#e8fff4', activeText:'#043941', accentBar:'#02d47e',  hoverBg:'rgba(2,212,126,.06)' },
              { key: 'director', emoji: '📊', label: 'Director', tagline:'Seguimiento institucional',     activeColor:'#f59e0b', activeBg:'#fffbeb', activeText:'#92400e', accentBar:'#f59e0b',  hoverBg:'rgba(245,158,11,.06)' },
            ] as const).map(tab => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = tab.hoverBg }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = '#fff' }}
                  style={{
                    display:'flex', flexDirection:'column', alignItems:'flex-start',
                    padding:'1.3rem 1.5rem 1.4rem',
                    borderRadius:16,
                    border: isActive ? `2px solid ${tab.activeColor}` : '2px solid rgba(4,57,65,.1)',
                    background: isActive ? tab.activeBg : '#fff',
                    cursor:'pointer',
                    transition:'all .22s cubic-bezier(.4,0,.2,1)',
                    boxShadow: isActive ? `0 8px 28px ${tab.activeColor}22` : '0 2px 10px rgba(4,57,65,.06)',
                    textAlign:'left',
                    position:'relative',
                    overflow:'hidden',
                    width:'100%',
                  }}
                >
                  {/* Barra accent superior */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background: isActive ? tab.accentBar : 'rgba(4,57,65,.07)', borderRadius:'16px 16px 0 0', transition:'background .22s' }} />

                  {/* Emoji */}
                  <span style={{ fontSize:'2rem', marginBottom:10, marginTop:4, display:'block', lineHeight:1 }}>{tab.emoji}</span>

                  {/* Rol */}
                  <span style={{ fontSize:'1.05rem', fontWeight:800, color: isActive ? tab.activeText : '#043941', marginBottom:4, display:'block' }}>
                    {tab.label}
                  </span>

                  {/* Tagline */}
                  <span style={{ fontSize:'var(--t-label)', fontWeight:500, lineHeight:1.4, display:'block',
                    color: isActive ? (tab.key === 'docente' ? 'rgba(255,255,255,.55)' : 'rgba(4,57,65,.5)') : 'rgba(4,57,65,.38)',
                  }}>
                    {tab.tagline}
                  </span>

                  {/* Indicador activo */}
                  {isActive && (
                    <div style={{ position:'absolute', bottom:12, right:14, fontSize:'var(--t-label)', fontWeight:800,
                      color: tab.key === 'docente' ? 'rgba(255,255,255,.4)' : `${tab.activeColor}80`,
                    }}>
                      ↓ viendo
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Conector visual entre cards y contenido */}
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <span style={{
              fontSize:'var(--t-label)', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase',
              color: activeTab === 'docente' ? 'rgba(4,57,65,.5)' : activeTab === 'alumno' ? '#5b21b6' : '#92400e',
              background: activeTab === 'docente' ? 'rgba(2,212,126,.1)' : activeTab === 'alumno' ? 'rgba(212,196,252,.15)' : 'rgba(248,238,145,.2)',
              padding:'.3rem .9rem', borderRadius:100, display:'inline-block',
            }}>
              Tu experiencia como {activeTab === 'docente' ? 'Docente' : activeTab === 'alumno' ? 'Alumno' : 'Director'} ↓
            </span>
          </div>

          {/* Tab content */}
          {activeTab === 'docente' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center', animation:'fadeInUp .4s ease both' }}>
              {/* Texto */}
              <div>
                <h3 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:800, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
                  Domina tu taller,<br />
                  certifícate y enseña<br />
                  con confianza.
                </h3>
                <p style={{ fontSize:'var(--t-body-lg)', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:'0 0 1.8rem' }}>
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
                      <span style={{ fontSize:'var(--t-body)', fontWeight:600, color:'#043941' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Imagen */}
              <div style={{ position:'relative', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 64px rgba(4,57,65,.16)' }}>
                <img
                  src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=700&q=80"
                  alt="Docente EPT en taller"
                  style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, transparent 50%, rgba(4,57,65,.55) 100%)' }} />
              </div>
            </div>
          )}

          {activeTab === 'alumno' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center', animation:'fadeInUp .4s ease both' }}>
              {/* Texto */}
              <div>
                <h3 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:800, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
                  Aprende haciendo,<br />
                  a tu ritmo<br />
                  y con tu docente.
                </h3>
                <p style={{ fontSize:'var(--t-body-lg)', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:'0 0 1.8rem' }}>
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
                      <span style={{ fontSize:'var(--t-body)', fontWeight:600, color:'#043941' }}>{feat}</span>
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
                      <span style={{ fontSize:'var(--t-label)', fontWeight:700, color:p.textColor }}>{p.nombre}</span>
                      <span style={{ fontSize:'var(--t-overline)', fontWeight:600, color:p.textColor, opacity:.7 }}>· En proceso</span>
                    </div>
                  ))}
                </div>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.35)', fontSize:'var(--t-body-lg)', fontWeight:800, padding:'1rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
                >
                  Próximamente <span style={{ fontSize:'var(--t-label)', fontWeight:600, background:'#f8ee91', color:'#92400e', padding:'.15rem .5rem', borderRadius:100 }}>Beta 2025</span>
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
                  <p style={{ margin:0, fontSize:'var(--t-overline)', fontWeight:700, color:'rgba(4,57,65,.5)', letterSpacing:'.06em', textTransform:'uppercase' }}>Proyectos disponibles</p>
                  <p style={{ margin:'2px 0 0', fontSize:'1.3rem', fontWeight:800, color:'#043941' }}>2 en proceso</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'director' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center', animation:'fadeInUp .4s ease both' }}>
              {/* Texto */}
              <div>
                <h3 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:800, lineHeight:1.15, color:'#043941', margin:'0 0 1rem' }}>
                  Monitorea el avance<br />
                  pedagógico<br />
                  de tu institución.
                </h3>
                <p style={{ fontSize:'var(--t-body-lg)', color:'rgba(4,57,65,.6)', lineHeight:1.8, margin:'0 0 1.8rem' }}>
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
                      <span style={{ fontSize:'var(--t-body)', fontWeight:600, color:'#043941' }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.35)', fontSize:'var(--t-body-lg)', fontWeight:800, padding:'1rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
                >
                  En desarrollo <span style={{ fontSize:'var(--t-label)', fontWeight:600, background:'rgba(245,158,11,.15)', color:'#92400e', padding:'.15rem .5rem', borderRadius:100 }}>Pronto</span>
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
                  <p style={{ margin:0, fontSize:'var(--t-overline)', fontWeight:700, color:'rgba(4,57,65,.5)', letterSpacing:'.06em', textTransform:'uppercase' }}>Módulo de seguimiento</p>
                  <p style={{ margin:'2px 0 0', fontSize:'1.3rem', fontWeight:800, color:'#043941' }}>En desarrollo</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ════════════════════════════════════════════════════ */}
      <section id="como" style={{ background: 'hsl(54,89%,98%)', padding: '5.5rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shape fondo — círculo lila top-right, triángulo amarillo bottom-left, círculo verde mid-left */}
        <div style={{ position:'absolute', top:-100, right:-80, width:340, height:340, borderRadius:'50%', background:'#d4c4fc', opacity:.35, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:'3%', width:260, height:260, background:'#f8ee91', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.45, pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'45%', left:-40, width:100, height:100, borderRadius:'50%', background:'#02d47e', opacity:.22, pointerEvents:'none' }} />

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header — izquierda + bajada derecha */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'end', marginBottom:'5rem' }}>
            <div>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'var(--t-label)', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:16 }}>
                <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
                Nuestra metodología
              </span>
              <h2 style={{ fontSize:'var(--t-display)', fontWeight:800, lineHeight:1.08, color:'#043941', margin:0 }}>
                Una progresión que{' '}
                <span style={{ color:'#02d47e' }}>respeta tu recorrido</span>
              </h2>
            </div>
            <p style={{ fontSize:'1rem', color:'rgba(4,57,65,.55)', lineHeight:1.8, margin:0, alignSelf:'end' }}>
              No empezamos desde un contenido genérico. Cada etapa se construye sobre la anterior — desde quién eres como docente hasta lo que tus alumnos experimentan en el taller.
            </p>
          </div>

          {/* 4 etapas */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, position:'relative' }}>

            {([
              {
                n: '01',
                numColor: '#02d47e',
                barColor: '#02d47e',
                title: 'Te conocemos antes de enseñarte',
                copy: 'Empezamos por entender tu contexto: qué taller tienes, qué sabes, qué necesitas. Sin supuestos genéricos.',
              },
              {
                n: '02',
                numColor: '#7c3aed',
                barColor: '#d4c4fc',
                title: 'Tu taller es el primer objeto de estudio',
                copy: 'El espacio donde trabajas — sus zonas, su equipamiento — se convierte en el punto de partida del aprendizaje.',
              },
              {
                n: '03',
                numColor: '#d97706',
                barColor: '#f8ee91',
                title: 'Diseñas, no solo aprendes',
                copy: 'Avanzas hacia la práctica pedagógica: cómo organizar una sesión, cómo guiar a tus estudiantes con lo que ya tienes.',
              },
              {
                n: '04',
                numColor: '#047857',
                barColor: '#b8edd0',
                title: 'Una sesión real como cierre',
                copy: 'El cierre no es un examen. Es aplicar lo aprendido con tus alumnos, en tu taller. Eso es lo que se certifica.',
              },
            ]).map((stage, i) => (
              <div key={i} style={{ position:'relative', zIndex:1, background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 4px 20px rgba(4,57,65,.07)', padding:'0 0 28px' }}>

                {/* Barra de color superior */}
                <div style={{ height:4, background:stage.barColor, borderRadius:'16px 16px 0 0', marginBottom:24 }} />

                <div style={{ padding:'0 24px' }}>
                  {/* Número grande */}
                  <span style={{ fontSize:'3.5rem', fontWeight:800, lineHeight:1, color:stage.numColor, letterSpacing:'-.03em', display:'block', marginBottom:20 }}>
                    {stage.n}
                  </span>

                  <h3 style={{ fontSize:'var(--t-body-lg)', fontWeight:800, color:'#043941', margin:'0 0 .75rem', lineHeight:1.35 }}>
                    {stage.title}
                  </h3>
                  <p style={{ fontSize:'var(--t-body)', color:'rgba(4,57,65,.52)', lineHeight:1.75, margin:0 }}>
                    {stage.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* ══ TALLERES (role-aware) ════════════════════════════════════════════ */}
      <section id="talleres" style={{ background: '#fff', padding: '5rem 1.5rem', position:'relative', overflow:'hidden' }}>

        {/* Shapes */}
        <div style={{ position:'absolute', top:-70, left:'8%', width:108, height:260, background:'#f8ee91', borderRadius:'0 0 54px 54px', opacity:.32, pointerEvents:'none', animation:'heroFb 13s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-100, right:'6%', width:300, height:300, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.28, pointerEvents:'none', animation:'heroFd 16s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'14%', left:'5%', width:52, height:52, background:'#02d47e', clipPath:'polygon(38% 0%,62% 0%,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0% 62%,0% 38%,38% 38%)', animation:'heroSpin 24s linear infinite', pointerEvents:'none', opacity:.45 }} />

        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header dinámico */}
          <div style={{ textAlign:'center', maxWidth:640, margin:'0 auto 3.2rem' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'var(--t-label)', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:14 }}>
              <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
              {activeTab === 'docente' && 'Especialidades disponibles'}
              {activeTab === 'alumno'  && 'Proyectos en desarrollo'}
              {activeTab === 'director' && 'Estado por especialidad'}
            </span>
            <h2 style={{ fontSize:'var(--t-display)', fontWeight:800, lineHeight:1.1, color:'#043941', margin:'0 0 .75rem' }}>
              {activeTab === 'docente' && <>{talleresConfig.length} especialidades <span style={{ color:'#02d47e' }}>técnicas</span></>}
              {activeTab === 'alumno'  && <>Proyectos <span style={{ color:'#02d47e' }}>para alumnos</span></>}
              {activeTab === 'director' && <>Seguimiento <span style={{ color:'#f59e0b' }}>por taller</span></>}
            </h2>
            <p style={{ fontSize:'var(--t-body)', color:'rgba(4,57,65,.5)', lineHeight:1.75, margin:0 }}>
              {activeTab === 'docente' && 'Selecciona un taller para explorar su ruta de aprendizaje, competencias y equipamiento.'}
              {activeTab === 'alumno'  && 'Kits de proyectos guiados por tu docente. Más especialidades en camino.'}
              {activeTab === 'director' && 'Vista global del avance de formación docente en tu institución.'}
            </p>
          </div>

          {/* ── DOCENTE: split panel lista + detalle editorial ── */}
          {activeTab === 'docente' && (() => {
            const t = talleresConfig[selectedTaller]
            const accentColor = `hsl(${t.color})`
            const bienes = (() => {
              const todos = getBienesByTaller(t.slug)
              const innov = todos.filter(b => b.tipo === 'EQUIPOS' && b.zona.includes('INNOVA'))
              const resto = todos.filter(b => b.tipo === 'EQUIPOS' && !b.zona.includes('INNOVA'))
              return [...innov, ...resto].slice(0, 4)
            })()
            return (
              <div style={{ animation:'fadeInUp .4s ease both' }}>
                <style>{`
                  @media (max-width:768px) {
                    .talleres-split  { flex-direction: column !important; }
                    .talleres-list   { width: 100% !important; max-height: 200px !important; flex-direction: row !important; overflow-x: auto; overflow-y: hidden; gap: 4px !important; padding: 6px !important; }
                    .talleres-detail { min-height: 0 !important; }
                  }
                `}</style>
                <div className="talleres-split" style={{ display:'flex', gap:24, alignItems:'stretch', marginBottom:'2.5rem' }}>

                  {/* ── Lista izquierda ── */}
                  <div className="talleres-list" style={{ flexShrink:0, width:260, display:'flex', flexDirection:'column', gap:2, overflowY:'auto', maxHeight:540 }}>
                    {talleresConfig.map((item, i) => {
                      const isActive = selectedTaller === i
                      const itemAccent = `hsl(${item.color})`
                      return (
                        <div
                          key={item.slug}
                          onClick={() => setSelectedTaller(i)}
                          style={{
                            display:'flex', alignItems:'center', gap:10,
                            padding:'9px 12px 9px 14px',
                            borderRadius:10,
                            cursor:'pointer',
                            borderLeft: `3px solid ${isActive ? itemAccent : 'transparent'}`,
                            background: isActive ? 'rgba(255,255,255,.9)' : 'transparent',
                            transition:'all .16s ease',
                          }}
                          onMouseEnter={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.5)'; el.style.borderLeftColor='rgba(4,57,65,.12)' } }}
                          onMouseLeave={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.borderLeftColor='transparent' } }}
                        >
                          <span style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.06em', color: isActive ? itemAccent : 'rgba(4,57,65,.28)', width:24, flexShrink:0 }}>
                            T{String(item.numero).padStart(2,'0')}
                          </span>
                          <span style={{ flex:1, fontSize:'var(--t-body)', fontWeight: isActive ? 700 : 400, color: isActive ? '#043941' : 'rgba(4,57,65,.5)', lineHeight:1.3, transition:'all .16s' }}>
                            {item.nombre}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* ── Panel detalle editorial ── */}
                  <div className="talleres-detail" style={{ flex:1, borderRadius:20, overflow:'hidden', background:'#fff', boxShadow:'0 8px 40px rgba(4,57,65,.1)', display:'flex', flexDirection:'column' }}>

                    {/* Hero */}
                    <div style={{ height:220, position:'relative', overflow:'hidden', flexShrink:0 }}>
                      <img key={t.slug} src={t.imagen} alt={t.nombre}
                        style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.55) saturate(.75)' }} />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,57,65,.95) 0%, rgba(4,57,65,.3) 55%, transparent 100%)' }} />
                      {/* Acento de color en esquina */}
                      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />
                      <div style={{ position:'absolute', bottom:22, left:24, right:24 }}>
                        <h3 style={{ margin:0, fontSize:'clamp(1.3rem,2.5vw,1.75rem)', fontWeight:800, color:'#fff', lineHeight:1.15, letterSpacing:'-.01em' }}>{t.nombre}</h3>
                      </div>
                    </div>

                    {/* Contenido editorial */}
                    <div style={{ flex:1, padding:'24px 28px 28px', display:'flex', flexDirection:'column', gap:22 }}>

                      {/* Descripción */}
                      <p style={{ margin:0, fontSize:'var(--t-body-lg)', color:'rgba(4,57,65,.6)', lineHeight:1.7, fontWeight:400 }}>
                        {t.descripcion}
                      </p>

                      {/* Competencias — sin etiqueta, solo la lista */}
                      {t.competencias?.length > 0 && (
                        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                          {t.competencias.slice(0, 3).map((c: string, ci: number) => (
                            <div key={ci} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                              <span style={{ fontSize:'var(--t-label)', fontWeight:800, color: accentColor, marginTop:2, flexShrink:0 }}>
                                {String(ci + 1).padStart(2, '0')}
                              </span>
                              <span style={{ fontSize:'var(--t-body-lg)', color:'#043941', lineHeight:1.5, fontWeight:500 }}>{c}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Separador + equipamiento inline */}
                      {bienes.length > 0 && (
                        <div style={{ borderTop:'1px solid rgba(4,57,65,.07)', paddingTop:18 }}>
                          <p style={{ margin:'0 0 6px', fontSize:'var(--t-overline)', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(4,57,65,.35)' }}>
                            Equipamiento del taller
                          </p>
                          <p style={{ margin:0, fontSize:'var(--t-body)', color:'rgba(4,57,65,.55)', lineHeight:1.6 }}>
                            {bienes.map(b => b.nombre).join('  ·  ')}
                          </p>
                        </div>
                      )}

                      {/* Stat line al fondo */}
                      <div style={{ marginTop:'auto', display:'flex', alignItems:'center', gap:16 }}>
                        <span style={{ fontSize:'var(--t-label)', fontWeight:700, color:'rgba(4,57,65,.3)', letterSpacing:'.04em' }}>
                          {modulosLXP.length} módulos · 150h · Certificación MINEDU
                        </span>
                        <div style={{ flex:1, height:1, background:'rgba(4,57,65,.07)' }} />
                        <span style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.08em', color: accentColor }}>
                          T{String(t.numero).padStart(2,'0')}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )
          })()}

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
                        <h3 style={{ margin:0, fontSize:'1.05rem', fontWeight:800, color:'#043941', lineHeight:1.2 }}>{p.nombre}</h3>
                      </div>
                      <span style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', background:p.color, color:p.textColor, padding:'.3rem .7rem', borderRadius:100, whiteSpace:'nowrap', flexShrink:0 }}>
                        En proceso
                      </span>
                    </div>
                    <div style={{ padding:'1.2rem 1.4rem 1.4rem' }}>
                      <p style={{ fontSize:'var(--t-body)', color:'rgba(4,57,65,.6)', lineHeight:1.7, margin:'0 0 1rem' }}>{p.desc}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ flex:1, height:6, borderRadius:100, background:'rgba(4,57,65,.07)', overflow:'hidden' }}>
                          <div style={{ width:'35%', height:'100%', borderRadius:100, background:`linear-gradient(90deg, ${p.color}, ${p.color}bb)` }} />
                        </div>
                        <span style={{ fontSize:'var(--t-label)', fontWeight:700, color:'rgba(4,57,65,.45)', whiteSpace:'nowrap' }}>{p.modulos} mód. · Beta</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:'center' }}>
                <p style={{ fontSize:'var(--t-body)', color:'rgba(4,57,65,.4)', margin:'0 0 .8rem' }}>Más kits en desarrollo — disponibles en 2025</p>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.3)', fontSize:'var(--t-body-lg)', fontWeight:800, padding:'.9rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
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
                          <span style={{ fontSize:'var(--t-body)', fontWeight:800, color:'#043941', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:160 }}>{t.nombre}</span>
                          <span style={{ fontSize:'var(--t-overline)', fontWeight:700, color:semColor, background:`${semColor}15`, padding:'.2rem .55rem', borderRadius:100, flexShrink:0, marginLeft:8 }}>{semLabel}</span>
                        </div>
                        <div style={{ height:5, borderRadius:100, background:'rgba(4,57,65,.07)', overflow:'hidden' }}>
                          <div style={{ width:`${pct}%`, height:'100%', borderRadius:100, background:`linear-gradient(90deg, ${semColor}, ${semColor}cc)`, transition:'width .6s ease' }} />
                        </div>
                        <span style={{ fontSize:'var(--t-overline)', color:'rgba(4,57,65,.4)', marginTop:4, display:'block' }}>{pct}% docentes formados</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ textAlign:'center' }}>
                <button
                  disabled
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(4,57,65,.07)', color:'rgba(4,57,65,.3)', fontSize:'var(--t-body-lg)', fontWeight:800, padding:'.9rem 2rem', borderRadius:100, border:'1.5px solid rgba(4,57,65,.1)', cursor:'not-allowed' }}
                >
                  Dashboard completo — En desarrollo
                </button>
              </div>
            </div>
          )}

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
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'var(--t-label)', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:14 }}>
                <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
                Preguntas frecuentes
              </span>
              <h2 style={{ fontSize:'var(--t-display)', fontWeight:800, lineHeight:1.15, color:'#043941', margin:0 }}>
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
                        <p style={{ fontSize:'var(--t-body-lg)', fontWeight:800, color:'#043941', margin:0, lineHeight:1.4 }}>{item.q}</p>
                        {isOpen && (
                          <p style={{ fontSize:'var(--t-body)', color:'rgba(4,57,65,.5)', lineHeight:1.75, margin:'10px 0 0', paddingTop:10, borderTop:`1px solid ${color}20` }}>
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
            <div style={{ borderRadius:24, overflow:'hidden', background:'linear-gradient(145deg, #043941 0%, #032e34 100%)', boxShadow:'0 20px 56px rgba(4,57,65,.28)', border:'1px solid rgba(2,212,126,.1)', borderTop:'3px solid #f8ee91', position:'relative' }}>
              {/* Glow fondo */}
              <div style={{ position:'absolute', bottom:-60, right:-60, width:200, height:200, background:'radial-gradient(circle, rgba(2,212,126,.14) 0%, transparent 70%)', pointerEvents:'none' }} />

              <div style={{ position:'relative', zIndex:1, padding:'2.2rem' }}>
                {/* Badge */}
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(2,212,126,.18)', border:'1px solid rgba(2,212,126,.25)', borderRadius:100, padding:'.3rem .8rem', marginBottom:'1.4rem' }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#02d47e', boxShadow:'0 0 0 2px rgba(2,212,126,.35)', display:'inline-block' }} />
                  <span style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', color:'#02d47e' }}>Respuesta &lt; 24h</span>
                </div>

                {/* Icono */}
                <div style={{ width:52, height:52, borderRadius:14, background:'rgba(2,212,126,.12)', border:'1px solid rgba(2,212,126,.18)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.2rem', fontSize:'1.7rem' }}>
                  🚀
                </div>

                <h3 style={{ fontSize:'1.15rem', fontWeight:800, color:'#fff', margin:'0 0 10px', lineHeight:1.25 }}>
                  ¿Listo para empezar?
                </h3>
                <p style={{ fontSize:'var(--t-body)', color:'rgba(255,255,255,.5)', margin:'0 0 1.8rem', lineHeight:1.7 }}>
                  Accede a la plataforma o escríbenos directamente. Te ayudamos a incorporar tu colegio en menos de 24h.
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <button
                    onClick={goToApp}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.95rem 1.2rem', borderRadius:12, background:'#02d47e', color:'#043941', fontWeight:800, fontSize:'var(--t-body)', border:'none', cursor:'pointer', transition:'all .2s', boxShadow:'0 4px 16px rgba(2,212,126,.35)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(2,212,126,.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 16px rgba(2,212,126,.35)' }}
                  >
                    🚀 Ingresar a la plataforma
                  </button>

                  <a
                    href="https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP+%F0%9F%91%8B"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.95rem 1.2rem', borderRadius:12, background:'#25d366', color:'#fff', fontWeight:800, fontSize:'var(--t-body)', textDecoration:'none', transition:'all .2s', boxShadow:'0 4px 12px rgba(37,211,102,.25)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(37,211,102,.45)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 12px rgba(37,211,102,.25)' }}
                  >
                    💬 WhatsApp
                  </a>

                  <a
                    href="mailto:contacto@grama.pe"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'.95rem 1.2rem', borderRadius:12, background:'transparent', color:'rgba(255,255,255,.65)', fontWeight:700, fontSize:'var(--t-body)', textDecoration:'none', border:'1px solid rgba(255,255,255,.14)', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,.25)' }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,.14)' }}
                  >
                    📧 Escribir por email
                  </a>
                </div>

                <p style={{ fontSize:'var(--t-overline)', textAlign:'center', margin:'1.4rem 0 0', color:'rgba(255,255,255,.25)', lineHeight:1.5 }}>
                  Equipo GRAMA · Programa TSF-MINEDU
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

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
              <p style={{ fontSize:'var(--t-body)', color:'rgba(255,255,255,.45)', lineHeight:1.75, margin:'14px 0 20px', maxWidth:260 }}>
                Formación técnica híbrida para docentes EPT. Diseñado con MINEDU para talleres especializados en todo el Perú.
              </p>
              {/* Badge MINEDU */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(2,212,126,.1)', border:'1px solid rgba(2,212,126,.18)', borderRadius:100, padding:'.35rem .9rem' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#02d47e', display:'inline-block', flexShrink:0 }} />
                <span style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', color:'#02d47e' }}>Programa TSF · MINEDU Perú</span>
              </div>
            </div>

            {/* Col 2 — Plataforma */}
            <div>
              <p style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:16 }}>Plataforma</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { label:'Acceder', href:'/login' },
                  { label:'¿Para quién?', href:'#perfiles' },
                  { label:'Cómo funciona', href:'#como' },
                  { label:'Especialidades', href:'#talleres' },
                  { label:'Preguntas frecuentes', href:'#faq' },
                ].map(l => (
                  <a key={l.label} href={l.href}
                    style={{ fontSize:'var(--t-body)', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                  >{l.label}</a>
                ))}
              </div>
            </div>

            {/* Col 3 — Talleres */}
            <div>
              <p style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:16 }}>Talleres EPT</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {talleresConfig.slice(0, 5).map(t => (
                  <a key={t.slug} href={`#talleres`}
                    style={{ fontSize:'var(--t-body)', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s', display:'flex', alignItems:'center', gap:6 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                  >
                    <span style={{ width:4, height:4, borderRadius:'50%', background:'rgba(2,212,126,.4)', flexShrink:0 }} />
                    {t.nombreCorto}
                  </a>
                ))}
                <span style={{ fontSize:'var(--t-label)', color:'rgba(255,255,255,.25)', marginTop:2 }}>+ {talleresConfig.length - 5} más</span>
              </div>
            </div>

            {/* Col 4 — Contacto */}
            <div>
              <p style={{ fontSize:'var(--t-overline)', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:16 }}>Contacto</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <a
                  href="https://wa.me/51900000000?text=Hola%2C+soy+docente+EPT+y+tengo+una+consulta+sobre+GRAMA+LXP"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'var(--t-body)', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#25d366')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                >
                  💬 WhatsApp
                </a>
                <a href="mailto:contacto@grama.pe"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'var(--t-body)', color:'rgba(255,255,255,.45)', textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                >
                  📧 contacto@grama.pe
                </a>
                <p style={{ fontSize:'var(--t-label)', color:'rgba(255,255,255,.22)', margin:'8px 0 0', lineHeight:1.6 }}>
                  Soporte: Lun–Vie<br/>Respuesta &lt; 24h
                </p>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div style={{ height:1, background:'rgba(255,255,255,.07)', marginBottom:'1.8rem' }} />

          {/* Bottom bar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <p style={{ fontSize:'var(--t-label)', color:'rgba(255,255,255,.22)', margin:0 }}>
              © {new Date().getFullYear()} GRAMA Proyectos Educativos · Todos los derechos reservados
            </p>
            <div style={{ display:'flex', gap:20 }}>
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href}
                  style={{ fontSize:'var(--t-label)', fontWeight:600, color:'rgba(255,255,255,.3)', textDecoration:'none', transition:'color .2s' }}
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
