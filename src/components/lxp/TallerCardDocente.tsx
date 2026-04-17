// src/components/lxp/TallerCardDocente.tsx
import { Play, Package } from 'lucide-react'

const TOTAL_HORAS   = 150
const TOTAL_MODULOS = 7

// ── SVG Automotriz ────────────────────────────────────────────────────────────
function SvgAutomotriz() {
  return (
    <svg width="100%" height="110" viewBox="0 0 560 110" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="560" height="110" fill="#162d5c"/>
      <rect x="0" y="82" width="560" height="28" fill="#0d1f3f"/>
      <line x1="280" y1="82" x2="0"   y2="110" stroke="#1e3a6e" strokeWidth="1"/>
      <line x1="280" y1="82" x2="140" y2="110" stroke="#1e3a6e" strokeWidth="1"/>
      <line x1="280" y1="82" x2="280" y2="110" stroke="#1e3a6e" strokeWidth="1"/>
      <line x1="280" y1="82" x2="420" y2="110" stroke="#1e3a6e" strokeWidth="1"/>
      <line x1="280" y1="82" x2="560" y2="110" stroke="#1e3a6e" strokeWidth="1"/>
      {/* Tool cabinet */}
      <rect x="0" y="18" width="100" height="64" rx="4" fill="#0d2044" opacity=".7"/>
      <g fill="#3b82f6" opacity=".8">
        <rect x="12" y="28" width="4" height="22" rx="2"/>
        <ellipse cx="14" cy="27" rx="5" ry="4"/>
        <ellipse cx="14" cy="51" rx="5" ry="4"/>
      </g>
      <rect x="26" y="24" width="3" height="28" rx="1.5" fill="#60a5fa" opacity=".7"/>
      <rect x="25" y="24" width="5" height="6" rx="2" fill="#93c5fd" opacity=".7"/>
      <rect x="36" y="32" width="3" height="20" rx="1.5" fill="#7c9cc7" opacity=".7"/>
      <rect x="32" y="28" width="11" height="7" rx="2" fill="#7c9cc7" opacity=".7"/>
      <path d="M50 28 L54 42 L52 42 L56 28Z" fill="#5090d0" opacity=".7"/>
      <path d="M58 28 L54 42 L56 42 L62 28Z" fill="#5090d0" opacity=".7"/>
      <rect x="68" y="36" width="14" height="12" rx="3" fill="#2563a8" opacity=".8"/>
      <path d="M82 40 Q88 38 86 44" stroke="#60a5fa" strokeWidth="2" fill="none" opacity=".7"/>
      {/* Car body */}
      <rect x="170" y="52" width="180" height="34" rx="8" fill="#2563eb"/>
      <rect x="200" y="32" width="110" height="26" rx="10" fill="#3b82f6"/>
      <rect x="210" y="35" width="44" height="20" rx="5" fill="#93c5fd" opacity=".7"/>
      <rect x="262" y="35" width="40" height="20" rx="5" fill="#93c5fd" opacity=".6"/>
      <line x1="175" y1="65" x2="345" y2="65" stroke="#1d4ed8" strokeWidth="1.5" opacity=".6"/>
      <line x1="264" y1="54" x2="264" y2="82" stroke="#1d4ed8" strokeWidth="1" opacity=".5"/>
      <rect x="238" y="63" width="14" height="3" rx="1.5" fill="#93c5fd" opacity=".6"/>
      <rect x="290" y="63" width="14" height="3" rx="1.5" fill="#93c5fd" opacity=".6"/>
      {/* Wheels */}
      <ellipse cx="214" cy="87" rx="22" ry="8" fill="#0d1f3f"/>
      <ellipse cx="214" cy="87" rx="18" ry="7" fill="#1e3a6e"/>
      <ellipse cx="214" cy="87" rx="11" ry="5" fill="#374151"/>
      <ellipse cx="214" cy="87" rx="6"  ry="3" fill="#9ca3af"/>
      <ellipse cx="320" cy="87" rx="22" ry="8" fill="#0d1f3f"/>
      <ellipse cx="320" cy="87" rx="18" ry="7" fill="#1e3a6e"/>
      <ellipse cx="320" cy="87" rx="11" ry="5" fill="#374151"/>
      <ellipse cx="320" cy="87" rx="6"  ry="3" fill="#9ca3af"/>
      {/* Headlight */}
      <ellipse cx="180" cy="60" rx="7" ry="5" fill="#fde68a" opacity=".9"/>
      <ellipse cx="180" cy="60" rx="4" ry="3" fill="#fef3c7"/>
      <polygon points="173,57 140,48 140,72 173,63" fill="#fde68a" opacity=".12"/>
      {/* Tail light */}
      <rect x="342" y="56" width="8" height="10" rx="2" fill="#f87171" opacity=".8"/>
      <rect x="170" y="54" width="3" height="22" rx="1" fill="#1d4ed8" opacity=".7"/>
      {/* Mechanic figure */}
      <rect x="390" y="38" width="28" height="44" rx="8" fill="#1d4ed8"/>
      <circle cx="404" cy="28" r="13" fill="#f5c4a0"/>
      <ellipse cx="404" cy="18" rx="13" ry="7" fill="#2c1a0a"/>
      <rect x="390" y="16" width="28" height="8" rx="4" fill="#2563eb"/>
      <rect x="394" y="20" width="20" height="5" rx="2" fill="#93c5fd" opacity=".6"/>
      <rect x="396" y="38" width="5" height="12" rx="2" fill="#3b82f6"/>
      <rect x="407" y="38" width="5" height="12" rx="2" fill="#3b82f6"/>
      <rect x="363" y="50" width="30" height="8" rx="4" fill="#f5c4a0"/>
      <rect x="340" y="48" width="24" height="5" rx="2.5" fill="#6b7280"/>
      <ellipse cx="340" cy="50.5" rx="5" ry="4" fill="#9ca3af"/>
      <rect x="393" y="80" width="10" height="18" rx="5" fill="#1e3a6e"/>
      <rect x="407" y="80" width="10" height="18" rx="5" fill="#1e3a6e"/>
      <rect x="391" y="94" width="14" height="8" rx="3" fill="#111827"/>
      <rect x="405" y="94" width="14" height="8" rx="3" fill="#111827"/>
      {/* Jack stand */}
      <rect x="240" y="87" width="8"  height="14" rx="2" fill="#374151"/>
      <rect x="230" y="99" width="28" height="4"  rx="2" fill="#4b5563"/>
      {/* Gradient fade */}
      <defs>
        <linearGradient id="moA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="75%" stopColor="#162d5c" stopOpacity="0"/>
          <stop offset="100%" stopColor="#162d5c" stopOpacity=".3"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="560" height="110" fill="url(#moA)"/>
    </svg>
  )
}

// ── SVG Ebanistería ───────────────────────────────────────────────────────────
function SvgEbanisteria() {
  return (
    <svg width="100%" height="110" viewBox="0 0 560 110" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="560" height="110" fill="#2a1a08"/>
      <ellipse cx="300" cy="0" rx="160" ry="80" fill="#7c4f1a" opacity=".25"/>
      {/* Workbench */}
      <rect x="60" y="72" width="440" height="16" rx="3" fill="#5c3410"/>
      <rect x="60" y="86" width="440" height="4"  rx="2" fill="#3d2208"/>
      <rect x="80"  y="88" width="10" height="22" rx="2" fill="#3d2208"/>
      <rect x="470" y="88" width="10" height="22" rx="2" fill="#3d2208"/>
      {/* Wood plank */}
      <rect x="120" y="55" width="280" height="18" rx="4" fill="#7c5230" transform="rotate(-2 260 64)"/>
      <line x1="140" y1="57" x2="138" y2="72" stroke="#5c3a20" strokeWidth="1" opacity=".6"/>
      <line x1="165" y1="56" x2="163" y2="73" stroke="#5c3a20" strokeWidth="1" opacity=".5"/>
      <line x1="195" y1="55" x2="193" y2="72" stroke="#6b4428" strokeWidth="1" opacity=".4"/>
      <line x1="230" y1="55" x2="228" y2="72" stroke="#5c3a20" strokeWidth="1" opacity=".5"/>
      <line x1="265" y1="55" x2="263" y2="73" stroke="#7a5030" strokeWidth="1.5" opacity=".5"/>
      <line x1="300" y1="55" x2="298" y2="73" stroke="#5c3a20" strokeWidth="1" opacity=".4"/>
      <line x1="340" y1="55" x2="338" y2="73" stroke="#6b4428" strokeWidth="1" opacity=".5"/>
      <line x1="375" y1="56" x2="373" y2="73" stroke="#5c3a20" strokeWidth="1" opacity=".6"/>
      <rect x="120" y="55" width="280" height="3" rx="2" fill="#a06840" opacity=".4" transform="rotate(-2 260 56)"/>
      <rect x="145" y="65" width="250" height="14" rx="3" fill="#8b6040"/>
      <line x1="165" y1="66" x2="165" y2="79" stroke="#6b4828" strokeWidth="1" opacity=".6"/>
      <line x1="200" y1="66" x2="200" y2="79" stroke="#7a5530" strokeWidth="1" opacity=".5"/>
      <line x1="240" y1="66" x2="240" y2="79" stroke="#6b4828" strokeWidth="1.5" opacity=".5"/>
      <line x1="280" y1="66" x2="280" y2="79" stroke="#5c3a20" strokeWidth="1" opacity=".4"/>
      <line x1="320" y1="66" x2="320" y2="79" stroke="#7a5530" strokeWidth="1" opacity=".6"/>
      <line x1="355" y1="66" x2="355" y2="79" stroke="#6b4828" strokeWidth="1" opacity=".5"/>
      {/* Hand tools */}
      <rect x="98" y="60" width="4" height="18" rx="2" fill="#c8a870"/>
      <rect x="96" y="58" width="8" height="5" rx="1" fill="#8b6030"/>
      <polygon points="98,78 102,78 100,86" fill="#9ca3af"/>
      <rect x="108" y="64" width="3" height="16" rx="1.5" fill="#8b6030"/>
      <rect x="104" y="58" width="11" height="8" rx="2" fill="#a07040"/>
      {/* Saw */}
      <rect x="430" y="58" width="50" height="5" rx="2" fill="#9ca3af"/>
      <path d="M430 63 L433 68 L436 63 L439 68 L442 63 L445 68 L448 63 L451 68 L454 63 L457 68 L460 63 L463 68 L466 63 L469 68 L472 63 L475 68 L478 63 L480 63" stroke="#6b7280" strokeWidth="1" fill="none"/>
      <rect x="478" y="55" width="10" height="13" rx="2" fill="#b8975a"/>
      <rect x="455" y="68" width="8"  height="16" rx="2" fill="#6b7280"/>
      <rect x="450" y="68" width="18" height="4"  rx="2" fill="#9ca3af"/>
      {/* Wood shavings */}
      <ellipse cx="240" cy="80" rx="18" ry="4" fill="#c8a870" opacity=".3"/>
      <ellipse cx="310" cy="80" rx="12" ry="3" fill="#c8a870" opacity=".25"/>
      <path d="M260 79 Q268 74 276 79 Q268 82 260 79Z" fill="#e0b870" opacity=".4"/>
      <path d="M295 78 Q301 73 307 78 Q301 81 295 78Z" fill="#d4a060" opacity=".4"/>
      {/* Worker figure */}
      <rect x="385" y="78" width="11" height="22" rx="5" fill="#4a3020"/>
      <rect x="400" y="78" width="11" height="22" rx="5" fill="#4a3020"/>
      <rect x="383" y="95" width="15" height="8" rx="3" fill="#1f1209"/>
      <rect x="398" y="95" width="15" height="8" rx="3" fill="#1f1209"/>
      <rect x="380" y="42" width="32" height="40" rx="8" fill="#6b4820"/>
      <rect x="387" y="48" width="18" height="30" rx="4" fill="#8b6030"/>
      <rect x="389" y="60" width="14" height="10" rx="2" fill="#7c5028" stroke="#a07840" strokeWidth=".5"/>
      <circle cx="396" cy="30" r="13" fill="#d4956a"/>
      <ellipse cx="396" cy="20" rx="13" ry="7" fill="#2c1a0a"/>
      <rect x="383" y="19" width="26" height="7" rx="4" fill="#3d2510"/>
      <rect x="345" y="58" width="38" height="9" rx="4.5" fill="#d4956a"/>
      {/* Clamp */}
      <rect x="320" y="54" width="28" height="12" rx="3" fill="#7c5028"/>
      <rect x="322" y="52" width="14" height="5"  rx="2" fill="#a07040"/>
      <rect x="320" y="64" width="28" height="2"  rx="1" fill="#5c3818"/>
      <line x1="348" y1="65" x2="320" y2="65" stroke="#e0e0e0" strokeWidth="1" opacity=".4"/>
      {/* Lamp */}
      <line x1="300" y1="0"  x2="300" y2="15" stroke="#8b6030" strokeWidth="2"/>
      <ellipse cx="300" cy="18" rx="18" ry="6" fill="#d4a030" opacity=".8"/>
      <ellipse cx="300" cy="16" rx="14" ry="4" fill="#fde68a" opacity=".7"/>
      {/* Shadow corner */}
      <rect x="0" y="0" width="75" height="72" fill="#1a0e04" opacity=".5"/>
      <rect x="15" y="8" width="3"  height="36" rx="1.5" fill="#b8975a" opacity=".7"/>
      <rect x="8"  y="8" width="18" height="3"  rx="1.5" fill="#b8975a" opacity=".7"/>
      <rect x="28" y="20" width="36" height="5" rx="2.5" fill="#6b7280" opacity=".7"/>
      <circle cx="46" cy="22.5" r="3" fill="#d1fae5" opacity=".5"/>
    </svg>
  )
}

// ── Config per taller ─────────────────────────────────────────────────────────
const CARD_CFG: Record<string, {
  bannerBg: string; labelBg: string; labelBorder: string; labelColor: string
  tagBg: string; tagColor: string; btnBg: string; btnColor: string; btnSecondaryColor: string; btnSecondaryBorder: string
  sesBg: string; sesBorder: string
}> = {
  'mecanica-automotriz': {
    bannerBg: '#162d5c', labelBg: 'rgba(59,130,246,.25)', labelBorder: 'rgba(147,197,253,.3)', labelColor: '#93c5fd',
    tagBg: '#eff6ff', tagColor: '#1d4ed8', btnBg: '#043941', btnColor: '#02d47e',
    btnSecondaryColor: '#045f6c', btnSecondaryBorder: '#cce8eb', sesBg: '#f0faf5', sesBorder: '#cce8eb',
  },
  'ebanisteria': {
    bannerBg: '#2a1a08', labelBg: 'rgba(184,151,90,.2)', labelBorder: 'rgba(184,151,90,.35)', labelColor: '#d4b87a',
    tagBg: '#fdf3e0', tagColor: '#7a5c28', btnBg: '#3d2208', btnColor: '#d4b87a',
    btnSecondaryColor: '#7a5c28', btnSecondaryBorder: '#e8d4b0', sesBg: '#fdf8f0', sesBorder: '#e8d4b0',
  },
}

// ── Banner component ──────────────────────────────────────────────────────────
function TallerBanner({ slug, nombre, accent }: { slug: string; nombre: string; accent: string }) {
  const cfg = CARD_CFG[slug]
  return (
    <div style={{ background: cfg?.bannerBg ?? '#0f1a2e', overflow: 'hidden', position: 'relative', height: 110 }}>
      {slug === 'mecanica-automotriz' && <SvgAutomotriz />}
      {slug === 'ebanisteria'         && <SvgEbanisteria />}
      <div style={{
        position: 'absolute', top: 10, right: 12,
        background: cfg?.labelBg ?? 'rgba(2,212,126,.15)',
        border: `1px solid ${cfg?.labelBorder ?? 'rgba(2,212,126,.3)'}`,
        borderRadius: 8, padding: '4px 10px',
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: cfg?.labelColor ?? '#02d47e', letterSpacing: '.05em' }}>
          {nombre.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
interface TallerCardDocenteProps {
  slug: string
  numero: number
  nombre: string
  descripcion: string
  accent: string
  bienes: number
  progresoT: { porcentaje: number; completados: number; total: number }
  proximaSesion: { titulo: string; fechaFormateada: string; dias: number } | null
  onRuta: () => void
  onRepositorio: () => void
  animDelay?: string
}

export function TallerCardDocente({
  slug, numero, nombre, descripcion, accent,
  bienes, progresoT, proximaSesion,
  onRuta, onRepositorio, animDelay = '0s',
}: TallerCardDocenteProps) {
  const cfg = CARD_CFG[slug]

  return (
    <div
      className="animate-fade-in-up"
      style={{
        background: 'white', borderRadius: 16, marginBottom: 14,
        border: '1px solid rgba(4,57,65,.07)', overflow: 'hidden',
        transition: 'transform .28s cubic-bezier(.22,1,.36,1)',
        animationDelay: animDelay,
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {/* Top color bar */}
      <div style={{ height: 4, background: accent }} />

      {/* SVG banner */}
      <TallerBanner slug={slug} nombre={nombre} accent={accent} />

      {/* Card body */}
      <div style={{ padding: '18px 20px' }}>

        {/* Tag */}
        <span style={{
          display: 'inline-block', fontSize: 9, fontWeight: 700,
          letterSpacing: '.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 5, marginBottom: 7,
          background: cfg?.tagBg ?? `${accent}15`,
          color: cfg?.tagColor ?? accent,
        }}>
          T{String(numero).padStart(2, '0')}
        </span>

        {/* Name */}
        <p style={{ fontSize: 15, fontWeight: 700, color: '#043941', marginBottom: 5 }}>{nombre}</p>

        {/* Progress */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: '#5a8a92' }}>
              {progresoT.completados} de {progresoT.total} actividades
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: progresoT.porcentaje > 0 ? accent : '#94a3b8' }}>
              {progresoT.porcentaje}%
            </span>
          </div>
          <div style={{ height: 5, borderRadius: 100, background: 'rgba(4,57,65,0.07)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 100,
              width: `${Math.max(progresoT.porcentaje, progresoT.porcentaje > 0 ? 4 : 0)}%`,
              background: progresoT.porcentaje === 0 ? 'rgba(4,57,65,0.15)' : accent,
              transition: 'width .6s ease',
            }} />
          </div>
        </div>

        {/* Meta chips */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {[`${TOTAL_MODULOS} módulos`, `${TOTAL_HORAS}h formación`, `${bienes} bienes`].map(label => (
            <span key={label} style={{
              background: '#f0faf5', color: '#045f6c', fontSize: 10, fontWeight: 500,
              padding: '2px 8px', borderRadius: 100, border: '1px solid #cce8eb',
            }}>
              {label}
            </span>
          ))}
        </div>

        {/* Session box */}
        {proximaSesion && (
          <div style={{
            background: cfg?.sesBg ?? '#f0faf5',
            border: `1px solid ${cfg?.sesBorder ?? '#cce8eb'}`,
            borderRadius: 10, padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
          }}>
            <span className="animate-pulse" style={{
              display: 'inline-block', width: 7, height: 7,
              borderRadius: '50%', background: accent, flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 8, fontWeight: 700, color: accent,
                textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 1,
              }}>
                Próxima sesión en vivo
              </p>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#043941' }}>{proximaSesion.titulo}</p>
              <p style={{ fontSize: 10, color: '#5a8a92', marginTop: 1 }}>{proximaSesion.fechaFormateada}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: accent, lineHeight: 1 }}>{proximaSesion.dias}</p>
              <p style={{ fontSize: 9, color: '#5a8a92', fontWeight: 500 }}>{proximaSesion.dias === 1 ? 'día' : 'días'}</p>
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <button
          onClick={onRuta}
          style={{
            width: '100%', background: cfg?.btnBg ?? '#043941',
            color: cfg?.btnColor ?? '#02d47e',
            border: 'none', borderRadius: 100, padding: 10,
            fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 7, marginBottom: 7,
            transition: 'opacity .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <Play size={12} />
          {progresoT.porcentaje === 0 ? 'Iniciar Ruta' : 'Seguir Ruta'}
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onRepositorio}
          style={{
            width: '100%', background: 'transparent',
            color: cfg?.btnSecondaryColor ?? '#045f6c',
            border: `1px solid ${cfg?.btnSecondaryBorder ?? '#cce8eb'}`,
            borderRadius: 100, padding: 8,
            fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 5, transition: 'background .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#f0faf5')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <Package size={11} />
          Repositorio
        </button>
      </div>
    </div>
  )
}
