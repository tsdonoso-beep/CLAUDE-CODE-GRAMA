// src/components/lxp/TallerCardDocente.tsx
import { Play, Package, CalendarDays } from 'lucide-react'

const TOTAL_HORAS   = 150
const TOTAL_MODULOS = 7

// ── SVG Automotriz ────────────────────────────────────────────────────────────
export function SvgAutomotriz() {
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
export function SvgEbanisteria() {
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

// ── SVG Electricidad ──────────────────────────────────────────────────────────
export function SvgElectricidad() {
  return (
    <svg width="100%" height="110" viewBox="0 0 560 110" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="560" height="110" fill="#131929"/>
      <rect x="0" y="88" width="560" height="22" fill="#0d1120"/>
      <line x1="280" y1="88" x2="0"   y2="110" stroke="#1e2d4e" strokeWidth="1"/>
      <line x1="280" y1="88" x2="140" y2="110" stroke="#1e2d4e" strokeWidth="1"/>
      <line x1="280" y1="88" x2="280" y2="110" stroke="#1e2d4e" strokeWidth="1"/>
      <line x1="280" y1="88" x2="420" y2="110" stroke="#1e2d4e" strokeWidth="1"/>
      <line x1="280" y1="88" x2="560" y2="110" stroke="#1e2d4e" strokeWidth="1"/>
      {/* Electrical panel */}
      <rect x="8" y="10" width="82" height="72" rx="3" fill="#1e2d4e"/>
      <rect x="8" y="10" width="82" height="5" rx="2" fill="#2a3d5e"/>
      <rect x="13" y="17" width="72" height="58" rx="2" fill="#162340" stroke="#2a3d5e" strokeWidth="1"/>
      <rect x="17" y="22" width="14" height="8" rx="1" fill="#2563eb"/>
      <rect x="17" y="32" width="14" height="8" rx="1" fill="#2563eb"/>
      <rect x="17" y="42" width="14" height="8" rx="1" fill="#2563eb"/>
      <rect x="17" y="52" width="14" height="8" rx="1" fill="#1d4ed8"/>
      <rect x="17" y="62" width="14" height="8" rx="1" fill="#1d4ed8"/>
      <rect x="35" y="22" width="14" height="8" rx="1" fill="#2563eb"/>
      <rect x="35" y="32" width="14" height="8" rx="1" fill="#fde047" opacity=".9"/>
      <rect x="35" y="42" width="14" height="8" rx="1" fill="#2563eb"/>
      <rect x="35" y="52" width="14" height="8" rx="1" fill="#2563eb"/>
      <rect x="35" y="62" width="14" height="8" rx="1" fill="#1d4ed8"/>
      <rect x="19" y="24" width="10" height="3" rx="1" fill="#93c5fd" opacity=".7"/>
      <rect x="19" y="34" width="10" height="3" rx="1" fill="#93c5fd" opacity=".7"/>
      <rect x="19" y="44" width="10" height="3" rx="1" fill="#93c5fd" opacity=".6"/>
      <rect x="19" y="54" width="10" height="3" rx="1" fill="#93c5fd" opacity=".5"/>
      <rect x="19" y="64" width="10" height="3" rx="1" fill="#93c5fd" opacity=".5"/>
      <rect x="37" y="24" width="10" height="3" rx="1" fill="#93c5fd" opacity=".7"/>
      <rect x="37" y="34" width="10" height="3" rx="1" fill="#fef08a" opacity=".8"/>
      <rect x="37" y="44" width="10" height="3" rx="1" fill="#93c5fd" opacity=".6"/>
      <rect x="37" y="54" width="10" height="3" rx="1" fill="#93c5fd" opacity=".6"/>
      <rect x="37" y="64" width="10" height="3" rx="1" fill="#93c5fd" opacity=".5"/>
      <rect x="52" y="22" width="28" height="52" rx="1" fill="#111827" opacity=".6"/>
      <line x1="54" y1="30" x2="78" y2="30" stroke="#2a3d5e" strokeWidth="1"/>
      <line x1="54" y1="38" x2="78" y2="38" stroke="#2a3d5e" strokeWidth="1"/>
      <line x1="54" y1="46" x2="78" y2="46" stroke="#2a3d5e" strokeWidth="1"/>
      <line x1="54" y1="54" x2="78" y2="54" stroke="#2a3d5e" strokeWidth="1"/>
      <line x1="54" y1="62" x2="78" y2="62" stroke="#2a3d5e" strokeWidth="1"/>
      {/* Wall conduit */}
      <rect x="105" y="12" width="250" height="76" rx="2" fill="#192033" opacity=".5"/>
      <rect x="110" y="38" width="240" height="8" rx="3" fill="#374151"/>
      <rect x="110" y="39" width="240" height="3" rx="1" fill="#4b5563" opacity=".6"/>
      <rect x="148" y="46" width="8" height="36" rx="3" fill="#374151"/>
      <rect x="230" y="46" width="8" height="36" rx="3" fill="#374151"/>
      <rect x="312" y="46" width="8" height="36" rx="3" fill="#374151"/>
      <rect x="143" y="34" width="18" height="14" rx="2" fill="#374151"/>
      <rect x="225" y="34" width="18" height="14" rx="2" fill="#374151"/>
      <rect x="307" y="34" width="18" height="14" rx="2" fill="#374151"/>
      <rect x="143" y="78" width="18" height="12" rx="2" fill="#374151"/>
      <rect x="146" y="80" width="5" height="4" rx="1" fill="#1f2937"/>
      <rect x="153" y="80" width="5" height="4" rx="1" fill="#1f2937"/>
      <rect x="225" y="78" width="18" height="12" rx="2" fill="#374151"/>
      <rect x="228" y="80" width="5" height="4" rx="1" fill="#1f2937"/>
      <rect x="235" y="80" width="5" height="4" rx="1" fill="#1f2937"/>
      <line x1="112" y1="42" x2="348" y2="42" stroke="#fde047" strokeWidth="1" opacity=".3"/>
      <line x1="112" y1="43" x2="348" y2="43" stroke="#f87171" strokeWidth="1" opacity=".25"/>
      <line x1="112" y1="44" x2="348" y2="44" stroke="#6b7280" strokeWidth="1" opacity=".2"/>
      {/* Hanging lightbulb */}
      <line x1="280" y1="12" x2="280" y2="26" stroke="#4b5563" strokeWidth="2"/>
      <rect x="274" y="26" width="12" height="4" rx="1" fill="#374151"/>
      <ellipse cx="280" cy="34" rx="9" ry="11" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
      <ellipse cx="280" cy="32" rx="5" ry="7" fill="#fef08a" opacity=".6"/>
      <ellipse cx="280" cy="32" rx="3" ry="4" fill="#fef9c3" opacity=".8"/>
      <ellipse cx="280" cy="32" rx="20" ry="16" fill="#fde047" opacity=".06"/>
      {/* Worker */}
      <rect x="393" y="80" width="10" height="20" rx="5" fill="#1e3a5f"/>
      <rect x="407" y="80" width="10" height="20" rx="5" fill="#1e3a5f"/>
      <rect x="391" y="96" width="14" height="8" rx="3" fill="#111827"/>
      <rect x="405" y="96" width="14" height="8" rx="3" fill="#111827"/>
      <rect x="388" y="40" width="32" height="42" rx="8" fill="#1d4ed8"/>
      <rect x="388" y="52" width="32" height="4" fill="#fde047" opacity=".7"/>
      <rect x="388" y="64" width="32" height="4" fill="#fde047" opacity=".7"/>
      <circle cx="404" cy="28" r="13" fill="#f5c4a0"/>
      <ellipse cx="404" cy="20" rx="16" ry="8" fill="#fde047"/>
      <rect x="389" y="18" width="30" height="6" rx="3" fill="#fde047"/>
      <rect x="387" y="22" width="34" height="3" rx="1.5" fill="#f59e0b"/>
      <ellipse cx="404" cy="25" rx="18" ry="4" fill="#f59e0b" opacity=".5"/>
      <rect x="362" y="44" width="28" height="9" rx="4.5" fill="#f5c4a0"/>
      <rect x="336" y="47" width="26" height="4" rx="2" fill="#9ca3af"/>
      <rect x="332" y="46" width="6" height="6" rx="1" fill="#fde047"/>
      <rect x="420" y="44" width="22" height="9" rx="4.5" fill="#f5c4a0"/>
      <rect x="440" y="38" width="5" height="16" rx="2.5" fill="#f87171"/>
      <rect x="441" y="36" width="3" height="4" rx="1" fill="#9ca3af"/>
      {/* Lightning bolt bg */}
      <polygon points="490,15 480,48 490,44 478,78 502,38 490,43" fill="#fde047" opacity=".12"/>
      <defs>
        <linearGradient id="elecA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="75%" stopColor="#131929" stopOpacity="0"/>
          <stop offset="100%" stopColor="#131929" stopOpacity=".4"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="560" height="110" fill="url(#elecA)"/>
    </svg>
  )
}

// ── SVG Electrónica ───────────────────────────────────────────────────────────
export function SvgElectronica() {
  return (
    <svg width="100%" height="110" viewBox="0 0 560 110" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="560" height="110" fill="#061520"/>
      {/* PCB grid bg */}
      <line x1="0" y1="20" x2="560" y2="20" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="0" y1="40" x2="560" y2="40" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="0" y1="60" x2="560" y2="60" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="0" y1="80" x2="560" y2="80" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="80"  y1="0" x2="80"  y2="110" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="160" y1="0" x2="160" y2="110" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="240" y1="0" x2="240" y2="110" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="320" y1="0" x2="320" y2="110" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="400" y1="0" x2="400" y2="110" stroke="#0d2a1a" strokeWidth="1"/>
      <line x1="480" y1="0" x2="480" y2="110" stroke="#0d2a1a" strokeWidth="1"/>
      <rect x="0" y="90" width="560" height="20" fill="#040e12"/>
      <line x1="280" y1="90" x2="0"   y2="110" stroke="#0d2a2a" strokeWidth="1"/>
      <line x1="280" y1="90" x2="140" y2="110" stroke="#0d2a2a" strokeWidth="1"/>
      <line x1="280" y1="90" x2="280" y2="110" stroke="#0d2a2a" strokeWidth="1"/>
      <line x1="280" y1="90" x2="420" y2="110" stroke="#0d2a2a" strokeWidth="1"/>
      <line x1="280" y1="90" x2="560" y2="110" stroke="#0d2a2a" strokeWidth="1"/>
      {/* Oscilloscope */}
      <rect x="5" y="14" width="80" height="66" rx="5" fill="#0d1f2d"/>
      <rect x="10" y="20" width="48" height="34" rx="3" fill="#000d0d"/>
      <line x1="10" y1="28" x2="58" y2="28" stroke="#22d3ee" strokeWidth=".5" opacity=".2"/>
      <line x1="10" y1="37" x2="58" y2="37" stroke="#22d3ee" strokeWidth=".5" opacity=".2"/>
      <line x1="10" y1="45" x2="58" y2="45" stroke="#22d3ee" strokeWidth=".5" opacity=".2"/>
      <line x1="22" y1="20" x2="22" y2="54" stroke="#22d3ee" strokeWidth=".5" opacity=".2"/>
      <line x1="34" y1="20" x2="34" y2="54" stroke="#22d3ee" strokeWidth=".5" opacity=".2"/>
      <line x1="46" y1="20" x2="46" y2="54" stroke="#22d3ee" strokeWidth=".5" opacity=".2"/>
      <path d="M10,37 L18,37 L20,26 L24,48 L28,37 L36,37 L38,26 L42,48 L46,37 L58,37" stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity=".9"/>
      <path d="M10,37 L18,37 L20,26 L24,48 L28,37 L36,37 L38,26 L42,48 L46,37 L58,37" stroke="#22d3ee" strokeWidth="5" fill="none" opacity=".08"/>
      <circle cx="65" cy="26" r="5" fill="#1a3a3a" stroke="#22d3ee" strokeWidth=".5" opacity=".7"/>
      <circle cx="65" cy="26" r="2" fill="#22d3ee" opacity=".5"/>
      <circle cx="65" cy="38" r="5" fill="#1a3a3a" stroke="#22d3ee" strokeWidth=".5" opacity=".7"/>
      <circle cx="65" cy="38" r="2" fill="#34d399" opacity=".5"/>
      <circle cx="65" cy="50" r="5" fill="#1a3a3a" stroke="#22d3ee" strokeWidth=".5" opacity=".7"/>
      <circle cx="65" cy="50" r="2" fill="#60a5fa" opacity=".5"/>
      <circle cx="20" cy="66" r="4" fill="#1a2a2a" stroke="#374151" strokeWidth="1"/>
      <circle cx="20" cy="66" r="2" fill="#374151"/>
      <circle cx="35" cy="66" r="4" fill="#1a2a2a" stroke="#374151" strokeWidth="1"/>
      <circle cx="35" cy="66" r="2" fill="#374151"/>
      <path d="M20 70 Q30 80 40 88" stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity=".4"/>
      <path d="M35 70 Q42 80 50 88" stroke="#34d399" strokeWidth="1.5" fill="none" opacity=".4"/>
      {/* PCB board */}
      <rect x="100" y="18" width="250" height="66" rx="4" fill="#0a2010"/>
      <rect x="100" y="18" width="250" height="66" rx="4" fill="none" stroke="#1a4020" strokeWidth="1"/>
      <path d="M110,40 H160 V30 H200 V50 H250 V35 H340" stroke="#22d3ee" strokeWidth="1" fill="none" opacity=".35"/>
      <path d="M110,60 H140 V70 H180 V55 H240 V65 H345" stroke="#34d399" strokeWidth="1" fill="none" opacity=".3"/>
      <path d="M150,78 V40 H170" stroke="#22d3ee" strokeWidth="1" fill="none" opacity=".25"/>
      <path d="M300,78 V45 H280" stroke="#34d399" strokeWidth="1" fill="none" opacity=".25"/>
      <circle cx="160" cy="40" r="2" fill="#22d3ee" opacity=".5"/>
      <circle cx="200" cy="30" r="2" fill="#22d3ee" opacity=".5"/>
      <circle cx="250" cy="50" r="2" fill="#22d3ee" opacity=".5"/>
      <circle cx="140" cy="60" r="2" fill="#34d399" opacity=".5"/>
      <circle cx="240" cy="65" r="2" fill="#34d399" opacity=".5"/>
      {/* Large IC */}
      <rect x="155" y="35" width="36" height="24" rx="2" fill="#0d1a0d" stroke="#22d3ee" strokeWidth=".5" opacity=".8"/>
      <rect x="160" y="38" width="26" height="18" rx="1" fill="#111811"/>
      <rect x="159" y="33" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="164" y="33" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="169" y="33" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="174" y="33" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="179" y="33" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="159" y="58" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="164" y="58" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="169" y="58" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="174" y="58" width="3" height="3" rx=".5" fill="#4b5563"/>
      <rect x="179" y="58" width="3" height="3" rx=".5" fill="#4b5563"/>
      <circle cx="158" cy="47" r="2" fill="#1a2a1a"/>
      <rect x="155" y="35" width="36" height="24" rx="2" fill="#22d3ee" opacity=".04"/>
      {/* Capacitors */}
      <rect x="210" y="40" width="8" height="16" rx="2" fill="#1a3a3a" stroke="#22d3ee" strokeWidth=".5"/>
      <rect x="210" y="40" width="8" height="5" rx="1" fill="#22d3ee" opacity=".3"/>
      <rect x="222" y="42" width="8" height="14" rx="2" fill="#1a3030" stroke="#22d3ee" strokeWidth=".5"/>
      {/* Resistors */}
      <rect x="238" y="38" width="16" height="6" rx="2" fill="#7c3a0a"/>
      <line x1="234" y1="41" x2="238" y2="41" stroke="#9ca3af" strokeWidth="1"/>
      <line x1="254" y1="41" x2="258" y2="41" stroke="#9ca3af" strokeWidth="1"/>
      <line x1="241" y1="38" x2="241" y2="44" stroke="#fde68a" strokeWidth="1"/>
      <line x1="246" y1="38" x2="246" y2="44" stroke="#f87171" strokeWidth="1"/>
      <line x1="251" y1="38" x2="251" y2="44" stroke="#fde68a" strokeWidth="1"/>
      <rect x="238" y="52" width="16" height="6" rx="2" fill="#1a3a1a"/>
      <line x1="234" y1="55" x2="238" y2="55" stroke="#9ca3af" strokeWidth="1"/>
      <line x1="254" y1="55" x2="258" y2="55" stroke="#9ca3af" strokeWidth="1"/>
      {/* Small IC 2 */}
      <rect x="270" y="38" width="28" height="18" rx="2" fill="#0d1a0d" stroke="#34d399" strokeWidth=".5" opacity=".7"/>
      <rect x="273" y="41" width="22" height="12" rx="1" fill="#111811"/>
      <rect x="272" y="36" width="3" height="3" rx=".5" fill="#374151"/>
      <rect x="277" y="36" width="3" height="3" rx=".5" fill="#374151"/>
      <rect x="282" y="36" width="3" height="3" rx=".5" fill="#374151"/>
      <rect x="287" y="36" width="3" height="3" rx=".5" fill="#374151"/>
      <rect x="272" y="56" width="3" height="3" rx=".5" fill="#374151"/>
      <rect x="277" y="56" width="3" height="3" rx=".5" fill="#374151"/>
      <rect x="282" y="56" width="3" height="3" rx=".5" fill="#374151"/>
      <circle cx="272" cy="47" r="1.5" fill="#1a2a1a"/>
      {/* LEDs */}
      <circle cx="310" cy="42" r="4" fill="#0d2a1a" stroke="#34d399" strokeWidth="1"/>
      <circle cx="310" cy="42" r="2" fill="#34d399" opacity=".7"/>
      <ellipse cx="310" cy="42" rx="8" ry="6" fill="#34d399" opacity=".08"/>
      <circle cx="325" cy="42" r="4" fill="#2a0d0d" stroke="#f87171" strokeWidth="1"/>
      <circle cx="325" cy="42" r="2" fill="#f87171" opacity=".7"/>
      {/* Through-hole */}
      <rect x="115" y="50" width="6" height="22" rx="1" fill="#1a3a3a" stroke="#22d3ee" strokeWidth=".5"/>
      <rect x="113" y="56" width="10" height="10" rx="1" fill="#0a1f14" stroke="#22d3ee" strokeWidth=".5"/>
      <rect x="125" y="52" width="6" height="20" rx="1" fill="#1a3a2a" stroke="#34d399" strokeWidth=".5"/>
      {/* Worker */}
      <rect x="393" y="80" width="10" height="22" rx="5" fill="#1a2a3a"/>
      <rect x="407" y="80" width="10" height="22" rx="5" fill="#1a2a3a"/>
      <rect x="391" y="96" width="14" height="8" rx="3" fill="#111827"/>
      <rect x="405" y="96" width="14" height="8" rx="3" fill="#111827"/>
      <rect x="388" y="40" width="32" height="42" rx="8" fill="#1a2a3a"/>
      <rect x="395" y="42" width="18" height="36" rx="4" fill="#243040" opacity=".7"/>
      <rect x="390" y="58" width="12" height="10" rx="2" fill="#111827" opacity=".5"/>
      <path d="M392,61 H400 V63 H398 V67 H394 V63 H392Z" stroke="#22d3ee" strokeWidth=".5" fill="none" opacity=".6"/>
      <circle cx="404" cy="28" r="13" fill="#d4956a"/>
      <ellipse cx="404" cy="18" rx="13" ry="7" fill="#2c1a0a"/>
      <rect x="391" y="18" width="26" height="6" rx="3" fill="#1a1208"/>
      <rect x="396" y="27" width="7" height="5" rx="2" fill="#1a3a3a" stroke="#22d3ee" strokeWidth=".5" opacity=".8"/>
      <rect x="405" y="27" width="7" height="5" rx="2" fill="#1a3a3a" stroke="#22d3ee" strokeWidth=".5" opacity=".8"/>
      <line x1="403" y1="29" x2="405" y2="29" stroke="#22d3ee" strokeWidth=".5" opacity=".7"/>
      <rect x="360" y="46" width="30" height="9" rx="4.5" fill="#d4956a"/>
      {/* Soldering iron */}
      <rect x="335" y="48" width="26" height="5" rx="2.5" fill="#6b7280"/>
      <polygon points="335,48.5 328,52 335,53.5" fill="#9ca3af"/>
      <ellipse cx="328" cy="51" rx="4" ry="3" fill="#fde68a" opacity=".4"/>
      <path d="M328,47 Q326,43 328,40 Q330,37 328,34" stroke="#6b7280" strokeWidth="1" fill="none" opacity=".3" strokeLinecap="round"/>
      <rect x="420" y="46" width="22" height="9" rx="4.5" fill="#d4956a"/>
      {/* PCB in hand */}
      <rect x="440" y="40" width="26" height="18" rx="2" fill="#0a2010" stroke="#34d399" strokeWidth=".5" opacity=".8"/>
      <line x1="444" y1="46" x2="462" y2="46" stroke="#22d3ee" strokeWidth=".5" opacity=".5"/>
      <line x1="444" y1="52" x2="462" y2="52" stroke="#34d399" strokeWidth=".5" opacity=".4"/>
      <rect x="449" y="43" width="8" height="10" rx="1" fill="#0d1a0d" stroke="#22d3ee" strokeWidth=".3"/>
      <defs>
        <linearGradient id="elecB" x1="0" y1="0" x2="1" y2="0">
          <stop offset="75%" stopColor="#061520" stopOpacity="0"/>
          <stop offset="100%" stopColor="#061520" stopOpacity=".35"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="560" height="110" fill="url(#elecB)"/>
    </svg>
  )
}

// ── SVG Industria Alimentaria ─────────────────────────────────────────────────
export function SvgIndustriaAlimentaria() {
  return (
    <svg width="100%" height="220" viewBox="0 0 560 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="220" fill="#1a0a00"/>
      <ellipse cx="280" cy="0" rx="200" ry="120" fill="#7c3a10" opacity=".3"/>
      <rect x="0" y="170" width="560" height="50" fill="#0f0600"/>
      <rect x="60" y="140" width="380" height="12" rx="6" fill="#3d2208"/>
      <rect x="60" y="148" width="380" height="6" rx="3" fill="#2a1500"/>
      {[72,104,136,168,200,232,264,296,328,360,392,428].map(cx => (
        <circle key={cx} cx={cx} cy="152" r="8" fill="#4b2e0a" stroke="#6b4020" strokeWidth="1"/>
      ))}
      <rect x="88" y="118" width="28" height="24" rx="4" fill="#e05c00"/>
      <rect x="88" y="118" width="28" height="6" rx="3" fill="#f08030"/>
      <ellipse cx="102" cy="118" rx="14" ry="4" fill="#f5a050"/>
      <rect x="142" y="118" width="28" height="24" rx="4" fill="#e05c00"/>
      <rect x="142" y="118" width="28" height="6" rx="3" fill="#f08030"/>
      <ellipse cx="156" cy="118" rx="14" ry="4" fill="#f5a050"/>
      <rect x="196" y="118" width="28" height="24" rx="4" fill="#c0400a"/>
      <rect x="196" y="118" width="28" height="6" rx="3" fill="#e07020"/>
      <rect x="280" y="110" width="40" height="32" rx="4" fill="#8b5e2a"/>
      <rect x="280" y="110" width="40" height="8" rx="4" fill="#a07040"/>
      <line x1="300" y1="118" x2="300" y2="142" stroke="#6b4020" strokeWidth="1.5"/>
      <line x1="280" y1="126" x2="320" y2="126" stroke="#6b4020" strokeWidth="1.5"/>
      <rect x="30" y="55" width="50" height="80" rx="8" fill="#2a1500"/>
      <rect x="34" y="60" width="42" height="55" rx="6" fill="#1a0d00"/>
      <ellipse cx="55" cy="60" rx="21" ry="8" fill="#3d2208"/>
      <line x1="55" y1="68" x2="55" y2="100" stroke="#6b4020" strokeWidth="3"/>
      <path d="M40 85 Q55 75 70 85" stroke="#8b6030" strokeWidth="2" fill="none"/>
      <path d="M40 92 Q55 82 70 92" stroke="#8b6030" strokeWidth="2" fill="none"/>
      <path d="M48 55 Q44 40 48 28" stroke="#fde68a" strokeWidth="1.5" fill="none" opacity=".3" strokeDasharray="3,3"/>
      <path d="M55 52 Q51 37 55 24" stroke="#fde68a" strokeWidth="1.5" fill="none" opacity=".25" strokeDasharray="3,3"/>
      <path d="M62 55 Q58 40 62 28" stroke="#fde68a" strokeWidth="1.5" fill="none" opacity=".3" strokeDasharray="3,3"/>
      <rect x="470" y="60" width="60" height="90" rx="6" fill="#2a1500"/>
      <rect x="476" y="68" width="48" height="30" rx="3" fill="#0d0800"/>
      <circle cx="490" cy="112" r="7" fill="#ef4444" opacity=".8"/>
      <circle cx="510" cy="112" r="7" fill="#22c55e" opacity=".8"/>
      <rect x="480" y="124" width="40" height="5" rx="2.5" fill="#3d2208"/>
      <rect x="380" y="68" width="32" height="50" rx="8" fill="#ffffff" opacity=".9"/>
      <rect x="385" y="80" width="22" height="36" rx="4" fill="#f0f0f0"/>
      <rect x="387" y="78" width="4" height="14" rx="2" fill="#f0f0f0"/>
      <rect x="395" y="78" width="4" height="14" rx="2" fill="#f0f0f0"/>
      <circle cx="396" cy="58" r="14" fill="#d4956a"/>
      <ellipse cx="396" cy="50" rx="14" ry="8" fill="#ffffff" opacity=".8"/>
      <rect x="382" y="50" width="28" height="6" rx="3" fill="#e0e0e0"/>
      <rect x="345" y="82" width="38" height="8" rx="4" fill="#d4956a"/>
      <rect x="415" y="78" width="8" height="24" rx="4" fill="#d4956a"/>
      <ellipse cx="346" cy="86" rx="8" ry="6" fill="#ffffff" opacity=".7"/>
      <rect x="450" y="20" width="36" height="20" rx="4" fill="#22c55e" opacity=".6"/>
      <text x="468" y="34" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="700">HACCP</text>
      <polygon points="520,10 540,44 500,44" fill="#f97316" opacity=".08"/>
      <polygon points="18,10 38,44 0,44" fill="#f97316" opacity=".06"/>
    </svg>
  )
}

// ── SVG Cocina y Repostería ───────────────────────────────────────────────────
export function SvgCocinaReposteria() {
  return (
    <svg width="100%" height="220" viewBox="0 0 560 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="220" fill="#1a0800"/>
      <ellipse cx="280" cy="0" rx="220" ry="130" fill="#7c3a00" opacity=".35"/>
      <rect x="0" y="155" width="560" height="65" fill="#2a1500"/>
      <rect x="0" y="152" width="560" height="8" rx="3" fill="#8b5e2a"/>
      <rect x="0" y="148" width="560" height="10" rx="2" fill="#f5f0ea"/>
      <line x1="0" y1="152" x2="560" y2="152" stroke="#e8e0d4" strokeWidth="1" opacity=".5"/>
      <rect x="190" y="60" width="180" height="92" rx="8" fill="#2a1a0a"/>
      <rect x="196" y="66" width="168" height="70" rx="6" fill="#1a0d00"/>
      <rect x="210" y="74" width="140" height="50" rx="5" fill="#0f0800"/>
      <rect x="214" y="78" width="132" height="42" rx="3" fill="#1a1000" stroke="#3d2208" strokeWidth="1"/>
      <ellipse cx="280" cy="110" rx="40" ry="14" fill="#8b4513" opacity=".7"/>
      <ellipse cx="280" cy="104" rx="36" ry="11" fill="#a0522d" opacity=".8"/>
      <ellipse cx="280" cy="99" rx="50" ry="20" fill="#f97316" opacity=".08"/>
      <circle cx="215" cy="152" r="6" fill="#6b4020"/>
      <circle cx="237" cy="152" r="6" fill="#6b4020"/>
      <circle cx="323" cy="152" r="6" fill="#6b4020"/>
      <circle cx="345" cy="152" r="6" fill="#6b4020"/>
      <ellipse cx="110" cy="148" rx="36" ry="10" fill="#8b5e2a"/>
      <rect x="74" y="108" width="72" height="40" rx="6" fill="#e8a060"/>
      <rect x="74" y="108" width="72" height="12" rx="6" fill="#f0b878"/>
      <path d="M80 108 Q84 96 88 108" fill="#fff8f0"/>
      <path d="M96 108 Q100 94 104 108" fill="#fff8f0"/>
      <path d="M112 108 Q116 96 120 108" fill="#fff8f0"/>
      <path d="M128 108 Q132 94 136 108" fill="#fff8f0"/>
      <rect x="96" y="96" width="4" height="14" rx="2" fill="#f87171"/>
      <ellipse cx="98" cy="95" rx="2" ry="3" fill="#fde68a" opacity=".9"/>
      <rect x="116" y="96" width="4" height="14" rx="2" fill="#60a5fa"/>
      <ellipse cx="118" cy="95" rx="2" ry="3" fill="#fde68a" opacity=".9"/>
      <path d="M420 135 Q440 110 460 130 Q470 148 450 148 Q430 148 420 135Z" fill="#d4a060"/>
      <path d="M422 132 Q440 112 458 128" stroke="#b08040" strokeWidth="2" fill="none"/>
      <rect x="390" y="148" width="80" height="8" rx="4" fill="#8b6030"/>
      <rect x="384" y="144" width="10" height="16" rx="4" fill="#6b4020"/>
      <rect x="476" y="144" width="10" height="16" rx="4" fill="#6b4020"/>
      <rect x="440" y="44" width="34" height="52" rx="8" fill="#ffffff"/>
      <circle cx="457" cy="62" r="2" fill="#e0e0e0"/>
      <circle cx="457" cy="72" r="2" fill="#e0e0e0"/>
      <circle cx="457" cy="82" r="2" fill="#e0e0e0"/>
      <circle cx="457" cy="44" r="14" fill="#d4956a"/>
      <rect x="443" y="22" width="28" height="24" rx="4" fill="#ffffff"/>
      <rect x="438" y="28" width="38" height="8" rx="4" fill="#ffffff"/>
      <ellipse cx="457" cy="28" rx="19" ry="6" fill="#f5f5f5"/>
      <rect x="400" y="70" width="44" height="8" rx="4" fill="#d4956a"/>
      <rect x="392" y="62" width="6" height="24" rx="3" fill="#8b6030"/>
      <rect x="389" y="58" width="12" height="5" rx="2" fill="#9ca3af"/>
      <path d="M230 66 Q226 50 230 36" stroke="#fde68a" strokeWidth="1.5" fill="none" opacity=".2" strokeDasharray="3,3"/>
      <polygon points="530,8 552,46 508,46" fill="#f97316" opacity=".08"/>
      <polygon points="20,160 40,194 0,194" fill="#f97316" opacity=".06"/>
    </svg>
  )
}

// ── SVG Construcciones Metálicas ──────────────────────────────────────────────
export function SvgConstruccionesMetalicas() {
  return (
    <svg width="100%" height="220" viewBox="0 0 560 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="220" fill="#0a0f1a"/>
      <rect x="0" y="0" width="560" height="30" fill="#060c14"/>
      <rect x="0" y="0" width="560" height="8" fill="#0f1824"/>
      <line x1="120" y1="8" x2="120" y2="30" stroke="#1e3a5c" strokeWidth="3"/>
      <line x1="280" y1="8" x2="280" y2="30" stroke="#1e3a5c" strokeWidth="3"/>
      <line x1="440" y1="8" x2="440" y2="30" stroke="#1e3a5c" strokeWidth="3"/>
      <line x1="120" y1="30" x2="120" y2="80" stroke="#374151" strokeWidth="2" strokeDasharray="4,3"/>
      <rect x="110" y="78" width="20" height="14" rx="3" fill="#374151"/>
      <rect x="80" y="105" width="360" height="22" rx="4" fill="#374151"/>
      <rect x="80" y="107" width="360" height="6" rx="3" fill="#4b5563"/>
      <rect x="100" y="95" width="8" height="42" rx="2" fill="#4b5563"/>
      <rect x="100" y="93" width="28" height="6" rx="2" fill="#374151"/>
      <rect x="100" y="131" width="28" height="6" rx="2" fill="#374151"/>
      <rect x="200" y="95" width="8" height="42" rx="2" fill="#4b5563"/>
      <rect x="200" y="93" width="28" height="6" rx="2" fill="#374151"/>
      <rect x="200" y="131" width="28" height="6" rx="2" fill="#374151"/>
      <rect x="340" y="95" width="8" height="42" rx="2" fill="#4b5563"/>
      <rect x="340" y="93" width="28" height="6" rx="2" fill="#374151"/>
      <rect x="340" y="131" width="28" height="6" rx="2" fill="#374151"/>
      <ellipse cx="260" cy="107" rx="30" ry="18" fill="#fbbf24" opacity=".12"/>
      <ellipse cx="260" cy="107" rx="14" ry="9" fill="#fde68a" opacity=".2"/>
      <path d="M180 105 Q196 98 212 105 Q228 98 244 105 Q260 98 276 105 Q292 98 308 105 Q324 98 340 105" stroke="#f59e0b" strokeWidth="3" fill="none" opacity=".8"/>
      <line x1="260" y1="102" x2="238" y2="78" stroke="#fbbf24" strokeWidth="1.5" opacity=".7"/>
      <line x1="262" y1="100" x2="284" y2="74" stroke="#fbbf24" strokeWidth="1.5" opacity=".6"/>
      <line x1="258" y1="103" x2="234" y2="88" stroke="#f59e0b" strokeWidth="1" opacity=".5"/>
      <line x1="264" y1="101" x2="290" y2="86" stroke="#fbbf24" strokeWidth="1" opacity=".5"/>
      <line x1="257" y1="104" x2="244" y2="68" stroke="#fbbf24" strokeWidth="1" opacity=".4"/>
      <circle cx="236" cy="76" r="3" fill="#fbbf24" opacity=".6"/>
      <circle cx="286" cy="72" r="2.5" fill="#fbbf24" opacity=".5"/>
      <circle cx="232" cy="86" r="2" fill="#f59e0b" opacity=".5"/>
      <circle cx="292" cy="84" r="2" fill="#fbbf24" opacity=".5"/>
      <rect x="230" y="52" width="32" height="52" rx="6" fill="#1e3a6e"/>
      <rect x="234" y="68" width="24" height="34" rx="4" fill="#2d4f7c"/>
      <circle cx="246" cy="42" r="13" fill="#d4956a"/>
      <rect x="232" y="26" width="28" height="24" rx="6" fill="#1e293b"/>
      <rect x="236" y="34" width="20" height="10" rx="2" fill="#fbbf24" opacity=".15"/>
      <rect x="238" y="36" width="16" height="6" rx="2" fill="#0d1f3f"/>
      <rect x="196" y="72" width="38" height="9" rx="4" fill="#d4956a"/>
      <rect x="172" y="66" width="28" height="6" rx="3" fill="#6b7280"/>
      <ellipse cx="172" cy="69" rx="6" ry="5" fill="#9ca3af"/>
      <rect x="234" y="103" width="11" height="24" rx="5" fill="#1e293b"/>
      <rect x="249" y="103" width="11" height="24" rx="5" fill="#1e293b"/>
      <rect x="232" y="124" width="15" height="8" rx="3" fill="#111827"/>
      <rect x="247" y="124" width="15" height="8" rx="3" fill="#111827"/>
      <rect x="430" y="100" width="80" height="6" rx="2" fill="#374151"/>
      <rect x="430" y="107" width="80" height="6" rx="2" fill="#4b5563"/>
      <rect x="430" y="114" width="80" height="6" rx="2" fill="#374151"/>
      <rect x="430" y="121" width="80" height="6" rx="2" fill="#4b5563"/>
      <rect x="430" y="128" width="80" height="6" rx="2" fill="#374151"/>
      <rect x="56" y="105" width="26" height="8" rx="3" fill="#6b7280"/>
      <ellipse cx="56" cy="109" rx="6" ry="5" fill="#374151"/>
      <line x1="46" y1="109" x2="28" y2="92" stroke="#60a5fa" strokeWidth="1" opacity=".5"/>
      <line x1="44" y1="110" x2="24" y2="96" stroke="#60a5fa" strokeWidth="1" opacity=".4"/>
      <circle cx="26" cy="90" r="2" fill="#60a5fa" opacity=".5"/>
      <rect x="0" y="165" width="560" height="55" fill="#060c14"/>
      <line x1="0" y1="170" x2="560" y2="170" stroke="#0f1824" strokeWidth="2"/>
      <polygon points="520,180 545,215 495,215" fill="#60a5fa" opacity=".06"/>
      <polygon points="30,175 50,210 10,210" fill="#60a5fa" opacity=".05"/>
    </svg>
  )
}

// ── SVG EPT General ───────────────────────────────────────────────────────────
export function SvgEptGeneral() {
  return (
    <svg width="100%" height="220" viewBox="0 0 560 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="220" fill="#0a1a10"/>
      <ellipse cx="280" cy="110" rx="220" ry="100" fill="#043941" opacity=".5"/>
      <line x1="280" y1="20" x2="280" y2="200" stroke="rgba(2,212,126,.15)" strokeWidth="1"/>
      <line x1="60" y1="110" x2="500" y2="110" stroke="rgba(2,212,126,.15)" strokeWidth="1"/>
      <circle cx="280" cy="110" r="28" fill="#043941" stroke="#02d47e" strokeWidth="1.5"/>
      <polygon points="280,92 294,100 294,116 280,124 266,116 266,100" fill="#02d47e" opacity=".8"/>
      <polygon points="280,96 290,102 290,114 280,120 270,114 270,102" fill="#043941"/>
      <text x="280" y="114" textAnchor="middle" fontSize="8" fill="#02d47e" fontFamily="sans-serif" fontWeight="700">EPT</text>
      <circle cx="150" cy="60" r="28" fill="rgba(59,130,246,.1)" stroke="#3b82f6" strokeWidth="1"/>
      <rect x="134" y="56" width="32" height="8" rx="4" fill="#3b82f6" opacity=".7"/>
      <ellipse cx="134" cy="60" rx="6" ry="5" fill="#3b82f6" opacity=".7"/>
      <ellipse cx="166" cy="60" rx="6" ry="5" fill="#3b82f6" opacity=".7"/>
      <text x="150" y="96" textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="sans-serif" opacity=".7">Mecánica</text>
      <circle cx="410" cy="60" r="28" fill="rgba(234,179,8,.1)" stroke="#eab308" strokeWidth="1"/>
      <polygon points="418,42 406,66 414,66 402,84 418,60 410,60" fill="#fbbf24" opacity=".8"/>
      <text x="410" y="96" textAnchor="middle" fontSize="8" fill="#fbbf24" fontFamily="sans-serif" opacity=".7">Electricidad</text>
      <circle cx="150" cy="158" r="28" fill="rgba(184,151,90,.1)" stroke="#b8975a" strokeWidth="1"/>
      <rect x="132" y="150" width="36" height="16" rx="3" fill="#b8975a" opacity=".6"/>
      <line x1="140" y1="150" x2="138" y2="166" stroke="#8b6030" strokeWidth="1.5" opacity=".7"/>
      <line x1="150" y1="149" x2="148" y2="166" stroke="#8b6030" strokeWidth="1.5" opacity=".6"/>
      <line x1="160" y1="150" x2="158" y2="166" stroke="#8b6030" strokeWidth="1.5" opacity=".7"/>
      <text x="150" y="192" textAnchor="middle" fontSize="8" fill="#d4aa70" fontFamily="sans-serif" opacity=".7">Ebanistería</text>
      <circle cx="410" cy="158" r="28" fill="rgba(236,72,153,.1)" stroke="#ec4899" strokeWidth="1"/>
      <line x1="398" y1="148" x2="418" y2="168" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" opacity=".7"/>
      <line x1="422" y1="148" x2="402" y2="168" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" opacity=".7"/>
      <circle cx="396" cy="146" r="5" fill="none" stroke="#ec4899" strokeWidth="2" opacity=".7"/>
      <circle cx="424" cy="146" r="5" fill="none" stroke="#ec4899" strokeWidth="2" opacity=".7"/>
      <text x="410" y="192" textAnchor="middle" fontSize="8" fill="#f472b6" fontFamily="sans-serif" opacity=".7">Confección</text>
      <line x1="252" y1="88" x2="178" y2="76" stroke="rgba(2,212,126,.2)" strokeWidth="1" strokeDasharray="3,4"/>
      <line x1="308" y1="88" x2="382" y2="76" stroke="rgba(2,212,126,.2)" strokeWidth="1" strokeDasharray="3,4"/>
      <line x1="252" y1="132" x2="178" y2="144" stroke="rgba(2,212,126,.2)" strokeWidth="1" strokeDasharray="3,4"/>
      <line x1="308" y1="132" x2="382" y2="144" stroke="rgba(2,212,126,.2)" strokeWidth="1" strokeDasharray="3,4"/>
      <polygon points="520,8 544,46 496,46" fill="#02d47e" opacity=".05"/>
      <polygon points="30,8 50,44 10,44" fill="#02d47e" opacity=".04" transform="rotate(8 30 26)"/>
    </svg>
  )
}

// ── SVG Industria del Vestido ─────────────────────────────────────────────────
export function SvgIndustriaVestido() {
  return (
    <svg width="100%" height="220" viewBox="0 0 560 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="220" fill="#1a0a1a"/>
      <ellipse cx="280" cy="20" rx="180" ry="100" fill="#5a1a6a" opacity=".25"/>
      <rect x="100" y="130" width="340" height="14" rx="4" fill="#3d1a4a"/>
      <rect x="100" y="128" width="340" height="6" rx="3" fill="#5a2a6a"/>
      <path d="M100 128 Q160 110 200 118 Q240 126 280 114 Q320 102 360 116 Q400 130 440 124 L440 128 Q400 134 360 120 Q320 106 280 118 Q240 130 200 122 Q160 114 100 132Z" fill="#ec4899" opacity=".6"/>
      <path d="M150 115 Q180 105 200 112 L200 128 Q180 121 150 128Z" fill="#a855f7" opacity=".5"/>
      <path d="M310 108 Q340 100 370 108 L370 122 Q340 114 310 120Z" fill="#ec4899" opacity=".4"/>
      <rect x="28" y="85" width="70" height="46" rx="6" fill="#2a0a2a"/>
      <rect x="34" y="90" width="58" height="34" rx="4" fill="#1a041a"/>
      <rect x="52" y="78" width="6" height="22" rx="3" fill="#3d1a4a"/>
      <rect x="50" y="76" width="16" height="6" rx="3" fill="#5a2a6a"/>
      <line x1="55" y1="100" x2="55" y2="108" stroke="#9ca3af" strokeWidth="2"/>
      <line x1="55" y1="106" x2="58" y2="110" stroke="#9ca3af" strokeWidth="1.5"/>
      <rect x="74" y="72" width="12" height="16" rx="5" fill="#ec4899" opacity=".7"/>
      <rect x="72" y="74" width="16" height="4" rx="2" fill="#f472b6" opacity=".6"/>
      <path d="M28 118 Q55 112 80 118" stroke="#ec4899" strokeWidth="3" fill="none" opacity=".5"/>
      <path d="M28 122 Q55 116 80 122" stroke="#f472b6" strokeWidth="1" fill="none" strokeDasharray="3,2" opacity=".4"/>
      <ellipse cx="440" cy="52" rx="16" ry="12" fill="#6b2a7a"/>
      <path d="M424 52 Q420 70 416 105 L464 105 Q460 70 456 52Z" fill="#7a3a8a"/>
      <path d="M432 52 Q440 62 448 52" fill="#5a1a6a" stroke="#8b4a9a" strokeWidth="1"/>
      <line x1="428" y1="70" x2="440" y2="80" stroke="#5a1a6a" strokeWidth="1"/>
      <line x1="452" y1="70" x2="440" y2="80" stroke="#5a1a6a" strokeWidth="1"/>
      <rect x="437" y="104" width="6" height="34" rx="3" fill="#4b2a5a"/>
      <ellipse cx="440" cy="138" rx="20" ry="5" fill="#3d1a4a"/>
      <ellipse cx="500" cy="85" rx="22" ry="44" fill="#ec4899" opacity=".3" transform="rotate(8 500 85)"/>
      <ellipse cx="500" cy="85" rx="16" ry="38" fill="#c0336a" opacity=".3" transform="rotate(8 500 85)"/>
      <ellipse cx="525" cy="90" rx="18" ry="40" fill="#a855f7" opacity=".25" transform="rotate(-5 525 90)"/>
      <line x1="340" y1="60" x2="368" y2="88" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="372" y1="60" x2="344" y2="88" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="338" cy="58" r="6" fill="none" stroke="#f472b6" strokeWidth="2"/>
      <circle cx="374" cy="58" r="6" fill="none" stroke="#f472b6" strokeWidth="2"/>
      <circle cx="216" cy="68" r="13" fill="#d4956a"/>
      <ellipse cx="216" cy="60" rx="13" ry="7" fill="#1a0a1a"/>
      <rect x="200" y="82" width="32" height="42" rx="6" fill="#ec4899" opacity=".8"/>
      <rect x="165" y="88" width="38" height="7" rx="3.5" fill="#d4956a"/>
      <rect x="156" y="82" width="14" height="5" rx="2" fill="#fbbf24" opacity=".8"/>
      <polygon points="156,82 162,82 158,88" fill="#f5f5f5"/>
      <path d="M248 100 Q270 90 292 100" stroke="#fbbf24" strokeWidth="2" fill="none" opacity=".6" strokeDasharray="4,3"/>
      <polygon points="520,8 544,50 496,50" fill="#ec4899" opacity=".07"/>
      <polygon points="26,170 46,206 6,206" fill="#ec4899" opacity=".05"/>
    </svg>
  )
}

// ── SVG Computación e Informática ─────────────────────────────────────────────
export function SvgComputacion() {
  return (
    <svg width="100%" height="220" viewBox="0 0 560 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="220" fill="#020818"/>
      {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#0f2544" strokeWidth="1" opacity=".5"/>)}
      {[70,140,210,280,350,420,490].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#0f2544" strokeWidth="1" opacity=".5"/>)}
      <text x="18" y="34" fontSize="9" fill="#22d3ee" opacity=".35" fontFamily="monospace">&lt;html&gt;</text>
      <text x="80" y="55" fontSize="9" fill="#02d47e" opacity=".3" fontFamily="monospace">const x = 42;</text>
      <text x="300" y="34" fontSize="9" fill="#a78bfa" opacity=".35" fontFamily="monospace">def loop():</text>
      <text x="430" y="55" fontSize="9" fill="#22d3ee" opacity=".3" fontFamily="monospace">SELECT *</text>
      <text x="18" y="190" fontSize="9" fill="#02d47e" opacity=".25" fontFamily="monospace">print(&quot;ok&quot;)</text>
      <text x="380" y="195" fontSize="9" fill="#a78bfa" opacity=".25" fontFamily="monospace">return true</text>
      <rect x="170" y="44" width="220" height="140" rx="10" fill="#0f1a2e" stroke="#1e3a6e" strokeWidth="2"/>
      <rect x="178" y="52" width="204" height="116" rx="6" fill="#080f1e"/>
      <rect x="186" y="60" width="80" height="5" rx="2" fill="#22d3ee" opacity=".7"/>
      <rect x="194" y="70" width="60" height="5" rx="2" fill="#a78bfa" opacity=".6"/>
      <rect x="202" y="80" width="100" height="5" rx="2" fill="#02d47e" opacity=".6"/>
      <rect x="202" y="90" width="80" height="5" rx="2" fill="#f59e0b" opacity=".5"/>
      <rect x="202" y="100" width="90" height="5" rx="2" fill="#22d3ee" opacity=".55"/>
      <rect x="194" y="110" width="70" height="5" rx="2" fill="#a78bfa" opacity=".5"/>
      <rect x="186" y="120" width="50" height="5" rx="2" fill="#22d3ee" opacity=".6"/>
      <rect x="240" y="130" width="3" height="10" rx="1" fill="#02d47e" opacity=".8"/>
      <rect x="182" y="60" width="2" height="80" rx="1" fill="#1e3a6e"/>
      <rect x="270" y="184" width="20" height="16" rx="3" fill="#0f1a2e"/>
      <rect x="248" y="198" width="64" height="6" rx="3" fill="#1e3a6e"/>
      <rect x="40" y="110" width="110" height="72" rx="6" fill="#0f1a2e" stroke="#1e3a6e" strokeWidth="1.5"/>
      <rect x="46" y="116" width="98" height="56" rx="4" fill="#080f1e"/>
      <rect x="52" y="122" width="50" height="4" rx="2" fill="#22d3ee" opacity=".6"/>
      <rect x="58" y="130" width="40" height="4" rx="2" fill="#02d47e" opacity=".5"/>
      <rect x="58" y="138" width="60" height="4" rx="2" fill="#a78bfa" opacity=".5"/>
      <rect x="58" y="146" width="44" height="4" rx="2" fill="#f59e0b" opacity=".45"/>
      <path d="M110 122 Q120 115 130 122" stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity=".4"/>
      <path d="M113 126 Q120 120 127 126" stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity=".5"/>
      <circle cx="120" cy="130" r="2" fill="#22d3ee" opacity=".6"/>
      <rect x="46" y="172" width="98" height="6" rx="3" fill="#1e3a6e" opacity=".6"/>
      <rect x="40" y="180" width="110" height="4" rx="2" fill="#0a1428"/>
      <rect x="408" y="88" width="90" height="120" rx="8" fill="#0f1a2e" stroke="#1e3a6e" strokeWidth="1.5"/>
      <rect x="416" y="96" width="74" height="96" rx="5" fill="#080f1e"/>
      <polyline points="422,172 434,152 446,162 458,142 470,148 482,132" fill="none" stroke="#02d47e" strokeWidth="2" strokeLinecap="round"/>
      {[[422,172],[434,152],[446,162]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="3" fill="#02d47e"/>)}
      {[[458,142],[470,148],[482,132]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="3" fill="#22d3ee"/>)}
      <line x1="422" y1="108" x2="422" y2="178" stroke="#1e3a6e" strokeWidth="1"/>
      <line x1="422" y1="178" x2="486" y2="178" stroke="#1e3a6e" strokeWidth="1"/>
      <circle cx="453" cy="196" r="5" fill="#1e3a6e"/>
      <circle cx="280" cy="32" r="14" fill="#d4956a"/>
      <rect x="264" y="46" width="32" height="36" rx="7" fill="#1d4ed8"/>
      <ellipse cx="280" cy="24" rx="14" ry="8" fill="#1a3a52"/>
      <rect x="271" y="30" width="8" height="5" rx="2" fill="none" stroke="#9ca3af" strokeWidth="1.2"/>
      <rect x="282" y="30" width="8" height="5" rx="2" fill="none" stroke="#9ca3af" strokeWidth="1.2"/>
      <line x1="279" y1="32" x2="282" y2="32" stroke="#9ca3af" strokeWidth="1"/>
      <rect x="220" y="58" width="42" height="8" rx="4" fill="#d4956a"/>
      <rect x="298" y="58" width="38" height="8" rx="4" fill="#d4956a"/>
      <circle cx="80" cy="70" r="5" fill="#22d3ee" opacity=".4"/>
      <circle cx="480" cy="70" r="5" fill="#22d3ee" opacity=".4"/>
      <circle cx="80" cy="150" r="5" fill="#a78bfa" opacity=".4"/>
      <circle cx="480" cy="150" r="5" fill="#a78bfa" opacity=".4"/>
      <line x1="85" y1="70" x2="170" y2="100" stroke="#22d3ee" strokeWidth="1" opacity=".2" strokeDasharray="4,4"/>
      <line x1="475" y1="70" x2="390" y2="100" stroke="#22d3ee" strokeWidth="1" opacity=".2" strokeDasharray="4,4"/>
      <line x1="85" y1="150" x2="170" y2="150" stroke="#a78bfa" strokeWidth="1" opacity=".2" strokeDasharray="4,4"/>
      <line x1="390" y1="150" x2="475" y2="150" stroke="#a78bfa" strokeWidth="1" opacity=".2" strokeDasharray="4,4"/>
      <polygon points="534,8 556,46 512,46" fill="#22d3ee" opacity=".06"/>
      <polygon points="14,170 34,206 -6,206" fill="#a78bfa" opacity=".05"/>
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
  'electricidad': {
    bannerBg: '#131929', labelBg: 'rgba(253,224,71,.2)', labelBorder: 'rgba(253,224,71,.35)', labelColor: '#fde047',
    tagBg: '#fffce7', tagColor: '#b45309', btnBg: '#1e2d4e', btnColor: '#fde047',
    btnSecondaryColor: '#b45309', btnSecondaryBorder: '#fde68a', sesBg: '#fffce7', sesBorder: '#fde68a',
  },
  'electronica': {
    bannerBg: '#061520', labelBg: 'rgba(34,211,238,.15)', labelBorder: 'rgba(34,211,238,.3)', labelColor: '#22d3ee',
    tagBg: '#ecfeff', tagColor: '#0369a1', btnBg: '#061520', btnColor: '#22d3ee',
    btnSecondaryColor: '#0369a1', btnSecondaryBorder: '#a5f3fc', sesBg: '#ecfeff', sesBorder: '#a5f3fc',
  },
}

// ── Banner component ──────────────────────────────────────────────────────────
function TallerBanner({ slug, nombre, accent }: { slug: string; nombre: string; accent: string }) {
  const cfg = CARD_CFG[slug]
  return (
    <div style={{ background: cfg?.bannerBg ?? '#0f1a2e', overflow: 'hidden', position: 'relative', height: 110 }}>
      {slug === 'mecanica-automotriz' && <SvgAutomotriz />}
      {slug === 'ebanisteria'         && <SvgEbanisteria />}
      {slug === 'electricidad'        && <SvgElectricidad />}
      {slug === 'electronica'         && <SvgElectronica />}
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
  descripcion?: string
  accent: string
  bienes: number
  progresoT: { porcentaje: number; completados: number; total: number }
  proximaSesion: { titulo: string; fechaFormateada: string; dias: number } | null
  onRuta: () => void
  onRepositorio: () => void
  onHub?: () => void
  animDelay?: string
}

export function TallerCardDocente({
  slug, numero, nombre, accent,
  bienes, progresoT, proximaSesion,
  onRuta, onRepositorio, onHub, animDelay = '0s',
}: TallerCardDocenteProps) {
  const cfg = CARD_CFG[slug]
  const accentLight = cfg?.labelColor ?? '#d2ffe1'

  const svgIlustracion =
    slug === 'mecanica-automotriz' ? <SvgAutomotriz /> :
    slug === 'ebanisteria'         ? <SvgEbanisteria /> :
    slug === 'electricidad'        ? <SvgElectricidad /> :
    slug === 'electronica'         ? <SvgElectronica /> :
    null

  return (
    <div
      className="animate-fade-in-up"
      style={{
        borderRadius: 16, marginBottom: 14, overflow: 'hidden',
        border: '1px solid rgba(4,57,65,.1)',
        boxShadow: '0 4px 20px rgba(4,57,65,0.12)',
        transition: 'transform .28s cubic-bezier(.22,1,.36,1)',
        animationDelay: animDelay,
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {/* ── Header oscuro — espejo del hero del hub ── */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: 120, cursor: onHub ? 'pointer' : 'default' }}
        onClick={onHub}
      >
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg,#043941 0%,#0a3560 100%)',
        }}/>
        <div className="absolute inset-0 grama-pattern opacity-20"/>

        {/* Accent blob */}
        <div className="absolute pointer-events-none" style={{
          width: 260, height: 260,
          background: `radial-gradient(circle, ${accent}22 0%, transparent 65%)`,
          right: -40, top: -70,
        }}/>

        {/* SVG ilustración */}
        {svgIlustracion && (
          <div className="absolute inset-y-0 right-0 pointer-events-none overflow-hidden"
            style={{ width: '60%', opacity: 0.38 }}>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '100%' }}>
              {svgIlustracion}
            </div>
          </div>
        )}

        {/* Contenido del header */}
        <div className="relative z-10" style={{ padding: '14px 16px 12px' }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 mb-2.5"
            style={{
              padding: '3px 10px', borderRadius: 100, fontSize: 9, fontWeight: 700,
              background: `${accent}22`, border: `1px solid ${accent}35`, color: accentLight,
            }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, display: 'inline-block' }}/>
            T{String(numero).padStart(2, '0')} · TALLER EPT
          </div>

          {/* Nombre */}
          <p style={{ fontSize: 15, fontWeight: 800, color: '#d2ffe1', letterSpacing: '-0.02em', marginBottom: 3 }}>
            {nombre}
          </p>
          <p style={{ fontSize: 10, color: 'rgba(210,255,225,0.4)', marginBottom: 10 }}>
            {TOTAL_MODULOS} módulos · {TOTAL_HORAS}h · {bienes} bienes
          </p>

          {/* Barra de progreso */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 100, overflow: 'hidden', background: 'rgba(255,255,255,0.1)' }}>
              <div style={{
                height: '100%', borderRadius: 100,
                width: `${Math.max(progresoT.porcentaje, progresoT.porcentaje > 0 ? 3 : 0)}%`,
                background: `linear-gradient(90deg,${accent},${accentLight})`,
                transition: 'width .6s ease',
              }}/>
            </div>
            <span style={{ fontSize: 9, fontWeight: 800, color: accent, flexShrink: 0 }}>
              {progresoT.porcentaje}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Acciones — fondo blanco ── */}
      <div style={{
        background: '#fff', padding: '10px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        borderTop: '1px solid rgba(4,57,65,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 7 }}>
          <button onClick={onRuta}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(90deg,#02d47e,#00c16e)', color: '#032e34',
              fontFamily: "'Manrope',sans-serif", fontSize: 11, fontWeight: 700,
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Play size={11}/>
            {progresoT.porcentaje === 0 ? 'Iniciar Ruta' : 'Seguir Ruta'}
          </button>
          <button onClick={onRepositorio}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 12px', borderRadius: 10, cursor: 'pointer',
              background: 'rgba(4,57,65,0.05)', border: '1px solid rgba(4,57,65,0.1)',
              color: '#043941', fontFamily: "'Manrope',sans-serif", fontSize: 11, fontWeight: 600,
              transition: 'background .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(4,57,65,0.09)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(4,57,65,0.05)')}
          >
            <Package size={11}/> Repositorio
          </button>
        </div>

        {/* Chip próxima sesión */}
        {proximaSesion && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 10px', borderRadius: 8, flexShrink: 0,
            background: `${accent}08`, border: `1px solid ${accent}20`,
          }}>
            <CalendarDays size={10} style={{ color: accent }}/>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: accent, lineHeight: 1 }}>{proximaSesion.dias}d</p>
              <p style={{ fontSize: 8, color: 'rgba(4,57,65,0.35)', lineHeight: 1.2 }}>próx. sesión</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
