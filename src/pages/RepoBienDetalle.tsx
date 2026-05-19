import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { getTallerBySlug } from "@/data/talleresConfig";
import { getBienesByTaller } from "@/data/bienesData";
import {
  ChevronLeft, ChevronRight, Package, BookOpen, Tag, MapPin, Hash,
  Layers, Settings, GraduationCap, FileText, Wrench, PlayCircle,
  Download, Car, Scissors, ChefHat, Hammer, Monitor, Cpu,
  UtensilsCrossed, Zap, HardHat, Sofa,
} from "lucide-react";
import jsPDF from "jspdf";

const TALLER_ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, Package,
}

// ── Zona color ─────────────────────────────────────────────────────────────
function zonaColor(zona: string): { color: string; bg: string } {
  const z = zona?.toUpperCase() ?? ''
  if (z.includes('INVESTIGAC'))  return { color: '#04768a', bg: 'rgba(4,118,138,0.15)' }
  if (z.includes('INNOVAC'))     return { color: '#02d47e', bg: 'rgba(2,212,126,0.15)' }
  if (z.includes('ALMAC') || z.includes('DEPÓSITO')) return { color: '#045f6c', bg: 'rgba(4,95,108,0.15)' }
  if (z.includes('SEGURIDAD'))   return { color: '#dc2626', bg: 'rgba(220,38,38,0.15)' }
  return { color: 'rgba(255,255,255,0.60)', bg: 'rgba(255,255,255,0.10)' }
}

// ── Tipo bien icon ─────────────────────────────────────────────────────────
const TIPO_ICON: Record<string, React.ElementType> = {
  EQUIPOS: Package, HERRAMIENTAS: Wrench, MOBILIARIO: Sofa,
  PEDAGOGICO: BookOpen, SEGURIDAD: HardHat,
}
const TIPO_COLOR: Record<string, { color: string; bg: string; label: string }> = {
  EQUIPOS:      { color: '#02d47e', bg: 'rgba(2,212,126,0.10)',  label: 'Equipo' },
  HERRAMIENTAS: { color: '#045f6c', bg: 'rgba(4,95,108,0.10)',   label: 'Herramienta' },
  MOBILIARIO:   { color: '#04768a', bg: 'rgba(4,118,138,0.10)',  label: 'Mobiliario' },
  PEDAGOGICO:   { color: '#043941', bg: 'rgba(4,57,65,0.08)',    label: 'Pedagógico' },
  SEGURIDAD:    { color: '#dc2626', bg: 'rgba(220,38,38,0.10)',  label: 'Seguridad' },
}

// ── VideoFrame ─────────────────────────────────────────────────────────────
function VideoFrame({ nombreBien }: { nombreBien: string }) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(4,57,65,0.10)', background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(4,57,65,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <PlayCircle size={15} style={{ color: '#02d47e', flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#043941' }}>Video de Operatividad y Mantenimiento</span>
      </div>
      <div style={{ background: '#043941', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlayCircle size={28} style={{ color: 'rgba(255,255,255,0.50)' }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 13, fontWeight: 600, textAlign: 'center', padding: '0 24px', margin: 0 }}>{nombreBien}</p>
        <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: 11, margin: 0 }}>Video disponible próximamente</p>
      </div>
    </div>
  )
}

// ── PdfButtons ─────────────────────────────────────────────────────────────
function PdfButtons({ nombreBien }: { nombreBien: string }) {
  const generatePDF = (tipo: "operatividad" | "mantenimiento") => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 15

    doc.setFillColor(4, 57, 65)
    doc.rect(0, 0, pageWidth, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(tipo === 'operatividad' ? 'Manual de Operatividad' : 'Manual de Mantenimiento', margin, 20)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(2, 212, 126)
    doc.text(nombreBien, margin, 30)

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(tipo === 'operatividad' ? 'Guía de Operatividad' : 'Guía de Mantenimiento', margin, 55)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    const contenido = tipo === 'operatividad'
      ? `Este manual contiene las instrucciones y procedimientos necesarios para operar correctamente el equipo "${nombreBien}".\n\nPasos principales:\n1. Verificar el estado del equipo antes de usar\n2. Revisar todos los mecanismos de seguridad\n3. Seguir los procedimientos de operación establecidos\n4. Usar todos los equipos de protección personal (EPP)\n5. Registrar el uso en la bitácora de actividades\n\nPara más información, consulte con el instructor responsable del taller.`
      : `Este manual contiene las instrucciones para el mantenimiento preventivo y correctivo del equipo "${nombreBien}".\n\nProcedimientos:\n1. Limpieza regular del equipo\n2. Lubricación de partes móviles\n3. Inspección de componentes críticos\n4. Reemplazo de piezas desgastadas\n5. Registro de mantenimiento\n\nFrecuencia:\n- Diario: Limpieza y lubricación\n- Semanal: Inspección completa\n- Mensual: Mantenimiento preventivo profesional`

    const lines = doc.splitTextToSize(contenido, pageWidth - margin * 2)
    doc.text(lines, margin, 65)
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generado por GRAMA — ${new Date().toLocaleDateString('es-PE')}`, margin, doc.internal.pageSize.getHeight() - 10)
    doc.save(`${nombreBien}_${tipo}.pdf`)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {[
        { tipo: 'operatividad' as const, label: 'Manual de Operatividad', icon: FileText, color: '#02d47e', bg: 'rgba(2,212,126,0.10)', border: 'rgba(2,212,126,0.30)' },
        { tipo: 'mantenimiento' as const, label: 'Manual de Mantenimiento', icon: Wrench, color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.30)' },
      ].map(({ tipo, label, icon: Icon, color, bg, border }) => (
        <button
          key={tipo}
          onClick={() => generatePDF(tipo)}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, border: `1.5px solid ${border}`, background: bg, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'opacity .15s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.80')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: color + '20' }}>
            <Icon size={16} style={{ color }} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#043941', margin: '0 0 2px' }}>{label}</p>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Download size={10} /> Descargar PDF
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}

// ── Fila de spec ───────────────────────────────────────────────────────────
function SpecRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, padding: '7px 0', borderBottom: '1px solid rgba(4,57,65,0.05)' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8', flexShrink: 0 }}>
        <Icon size={13} />
        {label}
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#043941', textAlign: 'right', wordBreak: 'break-word', maxWidth: 160 }}>{value}</span>
    </div>
  )
}

// ── Info card ──────────────────────────────────────────────────────────────
function InfoCard({ title, icon: Icon, iconColor, children }: {
  title: string; icon: React.ElementType; iconColor: string; children: React.ReactNode
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 8px rgba(4,57,65,0.05)', padding: '18px 20px' }}>
      <p style={{ fontSize: 12, fontWeight: 800, color: '#043941', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} style={{ color: iconColor }} />
        {title}
      </p>
      <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}

// ── Página principal ───────────────────────────────────────────────────────
const RepoBienDetalle = () => {
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const navigate = useNavigate();

  const taller = getTallerBySlug(slug || "");
  const bienes = useMemo(() => getBienesByTaller(slug || ""), [slug]);
  const TallerIcon = taller ? (TALLER_ICON_MAP[taller.icon] ?? Package) : Package

  const { bien, prevBien, nextBien, currentIndex } = useMemo(() => {
    const idx = bienes.findIndex((b) => b.n === Number(id));
    return {
      bien:         bienes[idx]     || null,
      prevBien:     bienes[idx - 1] || null,
      nextBien:     bienes[idx + 1] || null,
      currentIndex: idx + 1,
    };
  }, [bienes, id]);

  if (!taller || !bien) {
    return (
      <div style={{ background: '#043941', padding: '16px 32px' }}>
        <button
          onClick={() => navigate(`/taller/${slug}/repositorio`)}
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          ← Repositorio
        </button>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const area    = (bien as any).area    || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subarea = (bien as any).subarea || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tipo    = (bien as any).tipo    || "";
  const zColor  = zonaColor(bien.zona ?? '')
  const tipoConf = TIPO_COLOR[tipo] ?? { color: '#475569', bg: '#f1f5f9', label: 'Bien' }
  const TipoIcon = TIPO_ICON[tipo] ?? Package

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: 'var(--grama-bg)', minHeight: '100vh' }}>

      {/* ══ HEADER — mismo estilo que Repositorio.tsx ═══════════════════════ */}
      <div style={{ background: '#043941' }}>
        <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Izquierda: icono + breadcrumb + nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(255,255,255,0.10)', border: '1.5px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TallerIcon size={20} style={{ color: '#02d47e' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <button
                  onClick={() => navigate(`/taller/${slug}/repositorio`)}
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  Repositorio de Bienes
                </button>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>›</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#02d47e' }}>
                  {bien.codigoEntidad || bien.codigoInterno || `#${bien.n}`}
                </span>
              </div>
              <h1 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 560 }}>
                {bien.nombre}
              </h1>
            </div>
          </div>

          {/* Derecha: contador + prev/next + separador + volver */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
              {currentIndex} / {bienes.length}
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                onClick={() => prevBien && navigate(`/taller/${slug}/repositorio/bien/${prevBien.n}`)}
                disabled={!prevBien}
                style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: prevBien ? 'rgba(255,255,255,0.10)' : 'transparent', border: '1px solid rgba(255,255,255,0.15)', cursor: prevBien ? 'pointer' : 'default', color: prevBien ? '#fff' : 'rgba(255,255,255,0.20)', transition: 'background .15s' }}
                onMouseEnter={e => { if (prevBien) e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                onMouseLeave={e => { if (prevBien) e.currentTarget.style.background = 'rgba(255,255,255,0.10)' }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => nextBien && navigate(`/taller/${slug}/repositorio/bien/${nextBien.n}`)}
                disabled={!nextBien}
                style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: nextBien ? 'rgba(255,255,255,0.10)' : 'transparent', border: '1px solid rgba(255,255,255,0.15)', cursor: nextBien ? 'pointer' : 'default', color: nextBien ? '#fff' : 'rgba(255,255,255,0.20)', transition: 'background .15s' }}
                onMouseEnter={e => { if (nextBien) e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                onMouseLeave={e => { if (nextBien) e.currentTarget.style.background = 'rgba(255,255,255,0.10)' }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)' }} />
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              style={{ background: 'none', color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              ← Repositorio
            </button>
          </div>
        </div>
      </div>

      {/* ══ CONTENIDO ════════════════════════════════════════════════════════ */}
      <div style={{ padding: '24px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

          {/* ── Columna principal ─────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Hero del bien */}
            <div style={{ background: '#043941', borderRadius: 16, padding: '24px 28px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.60)', padding: '3px 8px', borderRadius: 6 }}>
                  {bien.codigoEntidad || bien.codigoInterno || `EPT-${String(bien.n).padStart(3, "0")}`}
                </span>
                {bien.zona && (
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: zColor.bg, color: zColor.color }}>
                    {bien.zona.replace('ZONA DE ', '').split(',')[0].trim()}
                  </span>
                )}
                {area && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.65)' }}>
                    {area}
                  </span>
                )}
                {subarea && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.50)' }}>
                    {subarea}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 10px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                {bien.nombre}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                {bien.marca  && <span>Marca: <strong style={{ color: 'rgba(255,255,255,0.80)' }}>{bien.marca}</strong></span>}
                {bien.modelo && <span>Modelo: <strong style={{ color: 'rgba(255,255,255,0.80)' }}>{bien.modelo}</strong></span>}
                <span>Cantidad: <strong style={{ color: '#02d47e' }}>×{bien.cantidad}</strong></span>
              </div>
            </div>

            {/* Video */}
            <VideoFrame nombreBien={bien.nombre} />

            {/* PDF buttons */}
            <PdfButtons nombreBien={bien.nombre} />

            {/* Info grid 2×2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <InfoCard title="Descripción" icon={Layers} iconColor="#02d47e">
                {bien.descripcion
                  ? bien.descripcion
                  : <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Sin descripción disponible.</span>}
              </InfoCard>
              <InfoCard title="Uso Pedagógico" icon={GraduationCap} iconColor="#02d47e">
                {bien.usoPedagogico
                  ? bien.usoPedagogico
                  : <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Sin información disponible.</span>}
              </InfoCard>
              <InfoCard title="Mantenimiento" icon={Wrench} iconColor="#f59e0b">
                <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Disponible próximamente.</span>
              </InfoCard>
              <InfoCard title="Especificaciones" icon={Tag} iconColor="#045f6c">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { label: 'Marca',    value: bien.marca },
                    { label: 'Modelo',   value: bien.modelo },
                    { label: 'Cantidad', value: bien.cantidad ? `${bien.cantidad} und.` : null },
                    { label: 'Zona',     value: bien.zona },
                    { label: 'Área',     value: area || null },
                  ].filter(r => r.value).map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0', borderBottom: '1px solid rgba(4,57,65,0.05)' }}>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{row.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#043941', maxWidth: 160, textAlign: 'right', wordBreak: 'break-word' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>

          </div>

          {/* ── Sidebar derecho ───────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 20 }}>

            {/* Tipo */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', padding: '18px 20px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 12px' }}>Tipo de bien</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: tipoConf.bg, flexShrink: 0 }}>
                  <TipoIcon size={18} style={{ color: tipoConf.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#043941', margin: '0 0 2px' }}>{tipoConf.label}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Categoría del bien</p>
                </div>
              </div>
            </div>

            {/* Ficha técnica */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', padding: '18px 20px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 4px' }}>Ficha Técnica</p>
              <SpecRow icon={Hash}    label="N° Bien"   value={`#${bien.n}`} />
              <SpecRow icon={Package} label="Cantidad"  value={`${bien.cantidad} und.`} />
              <SpecRow icon={MapPin}  label="Zona"      value={bien.zona ?? '—'} />
              {area    && <SpecRow icon={Layers} label="Área"    value={area} />}
              {subarea && <SpecRow icon={Layers} label="Sub Área" value={subarea} />}
              {bien.marca  && <SpecRow icon={Tag}      label="Marca"   value={bien.marca} />}
              {bien.modelo && <SpecRow icon={Settings} label="Modelo"  value={bien.modelo} />}
            </div>

            {/* Contexto taller */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', padding: '18px 20px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 12px' }}>Contexto</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(4,57,65,0.05)' }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>Taller</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', background: '#043941', padding: '2px 8px', borderRadius: 100 }}>
                  T{String(taller.numero).padStart(2, '0')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(4,57,65,0.05)' }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>Programa</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#043941', maxWidth: 140, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={taller.nombre}>
                  {taller.nombreCorto}
                </span>
              </div>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '10px 0 0', lineHeight: 1.5 }}>
                Este bien forma parte del inventario del {taller.nombre}.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default RepoBienDetalle;
