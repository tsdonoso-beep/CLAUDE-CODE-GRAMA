// src/pages/ModuloDetalle.tsx
import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { trackContenido } from '@/lib/tracker'
import { toast } from 'sonner'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import {
  ChevronLeft, ChevronRight,
  FileText, Video, Monitor, Zap, Download, Activity,
  ExternalLink, Lock, ClipboardList, CheckCircle2,
  Car, Scissors, ChefHat, Hammer, Cpu, UtensilsCrossed, Wrench, Package,
} from 'lucide-react'

const TALLER_ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, Package,
}
import { modulosLXP } from '@/data/modulosLXP'
import { manualesRuta } from '@/data/manualesRuta'
import { useProgress } from '@/contexts/ProgressContext'
import { ContenidoBadge } from '@/components/lxp/ContenidoBadge'
import { QuizBlock } from '@/components/lxp/QuizBlock'
import { QuizModal } from '@/components/lxp/QuizModal'
import { ConocenosForm } from '@/components/lxp/ConocenosForm'
import { ManualViewerModal } from '@/components/lxp/ManualViewerModal'
import { EPPSelectorModal } from '@/components/lxp/EPPSelectorModal'
import { MapaHabilidadesModal } from '@/components/lxp/MapaHabilidadesModal'
import { TablaProgresionModal } from '@/components/lxp/TablaProgresionModal'
import { DescargableViewerModal } from '@/components/lxp/DescargableViewerModal'
import { VideoPlayerModal } from '@/components/lxp/VideoPlayerModal'
import { SimuladorEPPMecaModal } from '@/components/lxp/interactivos/SimuladorEPPMecaModal'
import { ExploradorEquiposModal } from '@/components/lxp/interactivos/ExploradorEquiposModal'
import { SeleccionadorConsumiblesModal } from '@/components/lxp/interactivos/SeleccionadorConsumiblesModal'
import { ChecklistMantenimientoModal } from '@/components/lxp/interactivos/ChecklistMantenimientoModal'
import { ActividadExternaModal, ACTIVIDADES_EXTERNAS, type ActividadExternaConfig } from '@/components/lxp/interactivos/ActividadExternaModal'
import { EscenarioPedagogicoModal, ESCENARIO_COMP1, ESCENARIO_COMP2, ESCENARIO_COMP3, ESCENARIO_COMP4, type EscenarioConfig } from '@/components/lxp/interactivos/EscenarioPedagogicoModal'
import { ClasificadorHerramientasModal } from '@/components/lxp/interactivos/ClasificadorHerramientasModal'
import { LaboratorioPromptsModal } from '@/components/lxp/interactivos/LaboratorioPromptsModal'
import { VerificacionFuncionamientoModal } from '@/components/lxp/interactivos/VerificacionFuncionamientoModal'
import { VerificacionAlmacenModal } from '@/components/lxp/interactivos/VerificacionAlmacenModal'
import { descargablesLXP } from '@/data/descargablesLXP'
import { quizBancosMeca } from '@/data/quizBancosMeca'
import { descargablesMeca } from '@/data/descargablesMeca'
import { useTaller } from '@/hooks/useTaller'
import { getTallerBySlug } from '@/data/talleresConfig'
import jsPDF from 'jspdf'

const CONTENT_ICON: Record<string, React.ElementType> = {
  PDF: FileText,
  VIDEO: Video,
  PRESENTACION: Monitor,
  INTERACTIVO: Zap,
  QUIZ: ChevronRight,
  EN_VIVO: Video,
  DESCARGABLE: Download,
  ACTIVIDAD_PRACTICA: Activity,
}

export default function ModuloDetalle() {
  const { num } = useParams<{ num: string }>()
  const { slug } = useTaller()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { markContenidoCompleted, markContenidoInProgress, getEstadoModuloLXP, getContenidoEstado, getModuloProgreso } = useProgress()
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set(['0']))
  const [diagnosticosOpen, setDiagnosticosOpen] = useState(false)
  const [conocenosOpen, setConocenosOpen] = useState(false)
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)
  const [currentInteractiveContent, setCurrentInteractiveContent] = useState<any>(null)
  const [manualAbierto, setManualAbierto] = useState<{ manualId: string; contenidoId: string } | null>(null)
  const [showEPPSelector, setShowEPPSelector] = useState(false)
  const [showMapaHabilidades, setShowMapaHabilidades] = useState(false)
  const [showTablaProgresion, setShowTablaProgresion] = useState(false)
  const [descargableAbierto, setDescargableAbierto] = useState<{ descargableId: string; contenidoId: string } | null>(null)
  const [quizAbierto, setQuizAbierto] = useState<{ contenidoId: string; titulo: string; preguntas: any[]; puntajeMinimo: number; bloqueaSiguiente: boolean } | null>(null)
  const [videoAbierto, setVideoAbierto] = useState<{ titulo: string; descripcion?: string; duracionMin?: number; urlVideo: string; contenidoId: string } | null>(null)
  const [showTourSimulator, setShowTourSimulator]           = useState(false)
  const [showSimuladorEPP, setShowSimuladorEPP]             = useState(false)
  const [showExploradorEquipos, setShowExploradorEquipos]   = useState(false)
  const [showSelConsumibles, setShowSelConsumibles]         = useState<'investigacion' | 'almacen' | 'innovacion' | null>(null)
  const [showChecklistMant, setShowChecklistMant]           = useState<'investigacion' | 'almacen' | null>(null)
  const [actividadExterna, setActividadExterna]             = useState<ActividadExternaConfig | null>(null)
  const [escenarioPedagogico, setEscenarioPedagogico]       = useState<EscenarioConfig | null>(null)
  const [showClasificador, setShowClasificador]             = useState(false)
  const [showLaboratorio, setShowLaboratorio]               = useState(false)
  const [showVerificacion, setShowVerificacion]             = useState(false)
  const [showVerificacionAlmacen, setShowVerificacionAlmacen] = useState(false)

  const closeGradeModal = useCallback(() => setShowGradeModal(false), [])
  const closeTourSimulator = useCallback(() => {
    setShowTourSimulator(false)
    markContenidoCompleted('m0-s2-c2')
  }, [markContenidoCompleted])
  useEscapeKey(showGradeModal ? closeGradeModal : showTourSimulator ? closeTourSimulator : () => {})

  const manualActivo = manualAbierto ? manualesRuta.find(m => m.id === manualAbierto.manualId) ?? null : null
  const todosDescargables = slug === 'mecanica-automotriz'
    ? [...descargablesLXP, ...descargablesMeca]
    : descargablesLXP
  const descargableActivo = descargableAbierto
    ? todosDescargables.find(d => d.id === descargableAbierto.descargableId) ?? null
    : null
  const taller = getTallerBySlug(slug ?? '')

  const moduloNum  = parseInt(num ?? '0', 10)
  const modulo     = modulosLXP.find(m => m.numero === moduloNum)
  const estado     = getEstadoModuloLXP(modulo?.id ?? '')
  const prevModulo = modulosLXP.find(m => m.numero === moduloNum - 1)
  const tallerColor  = taller ? `hsl(${taller.color})` : '#02d47e'
  const TallerIcon: React.ElementType = taller ? (TALLER_ICON_MAP[taller.icon] ?? Package) : Package

  if (!modulo) {
    return (
      <div className="flex items-center justify-center h-96">
        <p style={{ color: '#045f6c' }}>Módulo no encontrado.</p>
      </div>
    )
  }

  if (estado === 'bloqueado') {
    const mensajeBloqueo = prevModulo?.requiereAprobacion
      ? `Aprueba el quiz del Módulo ${prevModulo.numero} (mínimo ${prevModulo.puntajeMinimoAcceso ?? 80}%) para desbloquear este módulo.`
      : prevModulo
        ? `Termina el Módulo ${prevModulo.numero} — ${prevModulo.nombre} — para continuar a este módulo.`
        : 'Completa el módulo anterior para desbloquear este contenido.'

    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Lock size={40} style={{ color: '#94a3b8' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--grama-oscuro)' }}>
          Módulo bloqueado
        </h2>
        <p className="text-sm text-center max-w-xs" style={{ color: '#045f6c' }}>
          {mensajeBloqueo}
        </p>
        <button
          onClick={() => navigate(`/taller/${slug}/ruta`)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white"
          style={{ background: '#043941' }}
        >
          <ChevronLeft size={14} />
          Volver a la ruta
        </button>
      </div>
    )
  }

  function toggleSub(subId: string) {
    setExpandedSubs(prev => {
      const next = new Set(prev)
      if (next.has(subId)) next.delete(subId)
      else next.add(subId)
      return next
    })
  }

  const nextModulo = modulosLXP.find(m => m.numero === moduloNum + 1)
  const progreso   = getModuloProgreso(slug ?? '', moduloNum)

  // Función para formatear minutos
  const fmtMin = (min: number) => {
    if (min >= 60) return `${Math.floor(min / 60)}h${min % 60 > 0 ? ` ${min % 60}m` : ''}`
    return `${min} min`
  }

  // Manejador para abrir contenidos
  const handleOpenContent = (contenido: any) => {
    // Registrar "en progreso" al abrir cualquier contenido (excepto los que ya completan directo)
    markContenidoInProgress(contenido.id)

    if (contenido.tipo === 'DESCARGABLE') {
      if (contenido.descargableId) {
        if (user?.id) trackContenido(user.id, contenido.id, contenido.titulo, 'apertura_ficha', 'descargable', slug)
        setDescargableAbierto({ descargableId: contenido.descargableId, contenidoId: contenido.id })
      } else {
        // Fallback: PDF básico para descargables sin datos ricos
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()
        const margin = 15
        doc.setFillColor(4, 57, 65)
        doc.rect(0, 0, pageWidth, 40, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.text(contenido.titulo, margin, 20)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(2, 212, 126)
        doc.text(modulo?.nombre || 'Módulo', margin, 30)
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        const lines = doc.splitTextToSize(contenido.descripcion || '', pageWidth - margin * 2)
        doc.text(lines, margin, 50)
        doc.save(`${contenido.titulo}.pdf`)
        if (user?.id) trackContenido(user.id, contenido.id, contenido.titulo, 'descarga', 'descargable', slug)
        // Descargable sin visor → completar al descargar
        markContenidoCompleted(contenido.id)
      }
    } else if (contenido.tipo === 'PRESENTACION') {
      if (contenido.urlInteractivo) {
        window.open(contenido.urlInteractivo, '_blank')
        markContenidoCompleted(contenido.id)
      } else {
        toast.info('Próximamente disponible', { description: contenido.titulo })
      }
    } else if (contenido.tipo === 'INTERACTIVO') {
      if (contenido.id === 'm0-s2-c2' && slug === 'mecanica-automotriz') {
        setShowTourSimulator(true)
      } else if (contenido.id === 'm1-s2-c2') {
        markContenidoCompleted(contenido.id)
        navigate(`/taller/${slug}/repositorio`)
      } else if (contenido.id === 'm1-s3-c2') {
        setShowEPPSelector(true)
      } else if (contenido.id === 'm1-s11-c2') {
        setShowExploradorEquipos(true)
      } else if (contenido.id === 'm1-s13-c2') {
        setShowSimuladorEPP(true)
      } else if (contenido.id === 'm2-s4-c1') {
        markContenidoCompleted(contenido.id)
        navigate(`/taller/${slug}/repositorio?zona=${encodeURIComponent('ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO')}`)
      } else if (contenido.id === 'm2-s19-c3') {
        setShowSelConsumibles('investigacion')
      } else if (contenido.id === 'm3-s26-c3') {
        setShowSelConsumibles('almacen')
      } else if (contenido.id === 'm4-s34-c3') {
        setShowSelConsumibles('innovacion')
      } else if (contenido.id === 'm2-s22-c3') {
        setShowChecklistMant('investigacion')
      } else if (contenido.id === 'm3-s29-c3') {
        setShowChecklistMant('almacen')
      } else if (contenido.id === 'm0-s02-c3') {
        setShowClasificador(true)
      } else if (contenido.id === 'm0-s04-c3') {
        setShowLaboratorio(true)
      } else if (contenido.id === 'm5-s51-c3') {
        setEscenarioPedagogico(ESCENARIO_COMP1)
      } else if (contenido.id === 'm5-s53-c3') {
        setEscenarioPedagogico(ESCENARIO_COMP2)
      } else if (contenido.id === 'm5-s55-c3') {
        setEscenarioPedagogico(ESCENARIO_COMP3)
      } else if (contenido.id === 'm5-s57-c3') {
        setEscenarioPedagogico(ESCENARIO_COMP4)
      } else if (ACTIVIDADES_EXTERNAS[contenido.id]) {
        setActividadExterna(ACTIVIDADES_EXTERNAS[contenido.id])
      } else if (contenido.id === 'm5-s2-c1') {
        setShowMapaHabilidades(true)
      } else if (contenido.id === 'm5-s3-c2') {
        setShowTablaProgresion(true)
      } else if (contenido.titulo.toLowerCase().includes('grado')) {
        setCurrentInteractiveContent(contenido)
        setShowGradeModal(true)
      } else if (contenido.urlInteractivo) {
        window.open(contenido.urlInteractivo, '_blank')
        markContenidoCompleted(contenido.id)
      } else {
        toast.info('Próximamente disponible', { description: contenido.titulo })
      }
    } else if (contenido.tipo === 'VIDEO' && contenido.urlVideo) {
      if (user?.id) trackContenido(user.id, contenido.id, contenido.titulo, 'reproduccion_video', 'video', slug)
      setVideoAbierto({
        titulo: contenido.titulo,
        descripcion: contenido.descripcion,
        duracionMin: contenido.duracionMin,
        urlVideo: contenido.urlVideo,
        contenidoId: contenido.id,
      })
    } else if (contenido.tipo === 'EN_VIVO') {
      if (contenido.urlVivo) {
        window.open(contenido.urlVivo, '_blank')
        markContenidoCompleted(contenido.id)
      } else {
        const fechaInfo = contenido.fechaSesion
          ? `Fecha programada: ${new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(contenido.fechaSesion))}`
          : 'El enlace estará disponible próximamente.'
        toast.info('Sesión sincrónica', { description: fechaInfo })
      }
    } else if (contenido.tipo === 'ACTIVIDAD_PRACTICA') {
      if (contenido.id === 'm2-s20-c3') {
        setShowVerificacion(true)
      } else if (contenido.id === 'm3-s27-c3') {
        setShowVerificacionAlmacen(true)
      } else if (contenido.urlActividad) {
        window.open(contenido.urlActividad, '_blank')
        markContenidoCompleted(contenido.id)
      } else {
        toast.warning('Actividad en preparación', { description: 'Estará disponible próximamente en este módulo.' })
      }
    } else if (contenido.tipo === 'PDF') {
      if (contenido.manualId) {
        if (user?.id) trackContenido(user.id, contenido.id, contenido.titulo, 'apertura_manual', 'manual', slug)
        setManualAbierto({ manualId: contenido.manualId, contenidoId: contenido.id })
      } else if (contenido.urlPDF) {
        if (user?.id) trackContenido(user.id, contenido.id, contenido.titulo, 'apertura_manual', 'manual', slug)
        window.open(contenido.urlPDF, '_blank')
        markContenidoCompleted(contenido.id)
      }
    } else {
      toast('Contenido en revisión', { description: contenido.titulo })
    }
  }

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    localStorage.setItem('selectedGrade', grade)
    if (currentInteractiveContent?.id) markContenidoCompleted(currentInteractiveContent.id)
    toast.success('Perfil actualizado', { description: `Grado seleccionado: ${grade}` })
    setShowGradeModal(false)
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: 'var(--grama-bg)' }}>

      {/* ── WHITE TOP BAR ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.10)' }}>
        <div style={{ padding: '14px 28px' }}>

          {/* Fila 1: icono + breadcrumb + título + stats */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 10 }}>

            {/* Izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${tallerColor}18`, border: `1.5px solid ${tallerColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TallerIcon size={20} style={{ color: tallerColor }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <button
                    onClick={() => navigate(`/taller/${slug}/ruta`)}
                    style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#043941')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    Ruta de aprendizaje
                  </button>
                  <span style={{ fontSize: 11, color: '#cbd5e1' }}>›</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: tallerColor }}>M{modulo.numero}</span>
                </div>
                <h1 style={{ fontSize: 19, fontWeight: 900, color: '#043941', margin: 0, letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {modulo.nombre}
                </h1>
              </div>
            </div>

            {/* Derecha: stats + badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
              {[
                { value: `${modulo.horasTotal}h`, label: 'totales' },
                { value: modulo.sesiones.length,  label: 'sesiones' },
                { value: modulo.sesiones.reduce((a, s) => a + s.contenidos.length, 0), label: 'contenidos' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.08em', color: '#94a3b8', margin: '3px 0 0', textTransform: 'uppercase' }}>{s.label}</p>
                </div>
              ))}
              <div style={{ width: 1, height: 28, background: 'rgba(4,57,65,0.10)' }} />
              {modulo.horasAsincrono > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: '#e3f8fb', color: '#045f6c' }}>
                  {modulo.horasAsincrono}h Asíncrono
                </span>
              )}
              {modulo.horasSincrono > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: '#fdf8da', color: '#ca8a04' }}>
                  {modulo.horasSincrono}h En vivo
                </span>
              )}
              {modulo.horasPresencial > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: '#d2ffe1', color: '#059669' }}>
                  {modulo.horasPresencial}h Presencial
                </span>
              )}
              {modulo.requiereAprobacion && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: '#fef3c7', color: '#92400e' }}>
                  ⚠ Eval. {modulo.puntajeMinimoAcceso}%
                </span>
              )}
            </div>
          </div>

          {/* Fila 2: descripción + barra de progreso */}
          {modulo.descripcion && (
            <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px', maxWidth: 700, lineHeight: 1.6 }}>
              {modulo.descripcion}
            </p>
          )}
          <div style={{ height: 4, borderRadius: 4, background: 'rgba(4,57,65,0.07)', maxWidth: 700, marginBottom: 0 }}>
            <div style={{ height: '100%', width: `${progreso.porcentaje}%`, background: tallerColor, borderRadius: 4, transition: 'width .5s ease' }} />
          </div>

        </div>
      </div>

      {/* ── GRID: contenido principal + sidebar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, padding: '20px 28px', alignItems: 'start' }}>

        {/* ── COLUMNA IZQUIERDA: sesiones ── */}
        <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {modulo.sesiones.map((ses, idx) => {
            const isOpen = expandedSubs.has(ses.id) || expandedSubs.has(String(idx))
            const modalidadBadge =
              ses.esEvaluacion             ? { label: 'EVALUACIÓN', color: '#ca8a04', bg: 'rgba(245,158,11,0.1)' } :
              ses.modalidad === 'sincrono'   ? { label: 'EN VIVO',    color: '#059669', bg: 'rgba(5,150,105,0.1)' } :
              ses.modalidad === 'presencial' ? { label: 'PRESENCIAL', color: '#b45309', bg: 'rgba(245,158,11,0.1)' } :
                                               { label: 'AUTÓNOMO',  color: '#045f6c', bg: 'rgba(4,95,108,0.08)' }
            return (
              <div
                key={ses.id}
                id={`ses-${ses.id}`}
                style={{ borderRadius: 14, border: `1px solid ${isOpen ? tallerColor + '40' : 'rgba(4,57,65,0.10)'}`, background: '#fff', overflow: 'hidden', boxShadow: isOpen ? `0 2px 12px ${tallerColor}18` : '0 1px 4px rgba(4,57,65,0.04)', transition: 'border-color .2s, box-shadow .2s' }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggleSub(ses.id)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'inherit' }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, background: isOpen ? tallerColor : 'rgba(4,57,65,0.07)', color: isOpen ? '#fff' : '#94a3b8', transition: 'background .2s, color .2s' }}>
                    S{idx + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#043941', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ses.nombre}
                    </p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                      {ses.contenidos.length} contenidos · {ses.duracionHoras}h
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: modalidadBadge.bg, color: modalidadBadge.color }}>
                      {modalidadBadge.label}
                    </span>
                    <ChevronRight size={14} style={{ color: '#94a3b8', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }} />
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid rgba(4,57,65,0.07)', padding: '14px 16px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {ses.descripcion && (
                      <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px', lineHeight: 1.6 }}>
                        {ses.descripcion}
                      </p>
                    )}
                    {(() => {
                      // Inyectar banco de preguntas para mecanica-automotriz
                      const contenidosConBanco = ses.contenidos.map(c =>
                        slug === 'mecanica-automotriz' && c.tipo === 'QUIZ' && !c.bancoPreguntas && quizBancosMeca[c.id]
                          ? { ...c, bancoPreguntas: quizBancosMeca[c.id] }
                          : c
                      )
                      // Separar diagnósticos (quiz con bancoPreguntas sin bloqueo) del resto
                      const diagnosticos = contenidosConBanco.filter(
                        c => c.tipo === 'QUIZ' && !!c.bancoPreguntas && !c.bloqueaSiguiente
                      )
                      const resto = contenidosConBanco.filter(
                        c => !(c.tipo === 'QUIZ' && !!c.bancoPreguntas && !c.bloqueaSiguiente)
                      )
                      const totalDiagMin = diagnosticos.reduce((acc, c) => acc + (c.duracionMin ?? 0), 0)
                      const totalDiagPreg = diagnosticos.reduce((acc, c) => acc + (c.preguntas ?? c.bancoPreguntas?.length ?? 0), 0)

                      return (
                        <>
                          {/* Contenidos normales */}
                          {resto.map(contenido => {
                            const ContentIcon = CONTENT_ICON[contenido.tipo] ?? FileText
                            const isQuizBloqueante = contenido.tipo === 'QUIZ' && !!contenido.bancoPreguntas && contenido.bloqueaSiguiente

                            return (
                              <div key={contenido.id}>
                                {isQuizBloqueante ? (
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, border: `1.5px solid ${tallerColor}`, borderLeft: `4px solid ${tallerColor}`, background: `${tallerColor}08` }}
                                  >
                                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${tallerColor}20` }}>
                                      <span style={{ fontSize: 18 }}>📝</span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <p style={{ fontSize: 13, fontWeight: 700, color: '#043941', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contenido.titulo}</p>
                                      <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>
                                        {contenido.bancoPreguntas!.length} preguntas · Mín. {contenido.puntajeMinimo ?? 80}% · Requerido para continuar
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => setQuizAbierto({ contenidoId: contenido.id, titulo: contenido.titulo, preguntas: contenido.bancoPreguntas!, puntajeMinimo: contenido.puntajeMinimo ?? 80, bloqueaSiguiente: true })}
                                      style={{ padding: '7px 16px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, fontFamily: 'inherit', background: tallerColor, color: '#fff', whiteSpace: 'nowrap', flexShrink: 0 }}
                                    >
                                      Iniciar
                                    </button>
                                  </div>
                                ) : (() => {
                                  const est = getContenidoEstado(contenido.id)
                                  const actionLabel = est.completed ? 'Revisar'
                                    : contenido.tipo === 'DESCARGABLE'        ? 'Descargar'
                                    : contenido.tipo === 'EN_VIVO'            ? 'Ver enlace'
                                    : contenido.tipo === 'ACTIVIDAD_PRACTICA' ? 'Ver actividad'
                                    : contenido.tipo === 'PDF'                ? 'Ver PDF'
                                    : contenido.tipo === 'VIDEO'              ? 'Ver video'
                                    : contenido.tipo === 'PRESENTACION'       ? 'Ver slides'
                                    : contenido.tipo === 'INTERACTIVO'        ? 'Abrir'
                                    : 'Abrir'
                                  return (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, border: `1px solid ${est.completed ? tallerColor + '40' : 'rgba(4,57,65,0.07)'}`, background: est.completed ? `${tallerColor}08` : '#fafcff', transition: 'border-color .16s' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: est.completed ? `${tallerColor}18` : 'rgba(4,57,65,0.07)' }}>
                                      {est.completed
                                        ? <CheckCircle2 size={16} style={{ color: tallerColor }} />
                                        : <ContentIcon size={15} style={{ color: '#64748b' }} />}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                        <ContenidoBadge tipo={contenido.tipo} size="sm" />
                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                          {contenido.titulo}
                                        </span>
                                        {est.completed && (
                                          <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 100, background: `${tallerColor}18`, color: tallerColor, flexShrink: 0 }}>
                                            ✓ Listo
                                          </span>
                                        )}
                                        {est.inProgress && !est.completed && (
                                          <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100, background: 'rgba(245,158,11,0.12)', color: '#b45309', flexShrink: 0 }}>
                                            En progreso
                                          </span>
                                        )}
                                      </div>
                                      <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#94a3b8', flexWrap: 'wrap' }}>
                                        {contenido.duracionMin && <span>⏱ {fmtMin(contenido.duracionMin)}</span>}
                                        {contenido.paginas && <span>{contenido.paginas} pág.</span>}
                                        {contenido.preguntas && <span>{contenido.preguntas} preguntas</span>}
                                        {contenido.puntajeMinimo && <span style={{ color: '#ca8a04', fontWeight: 700 }}>Mín. {contenido.puntajeMinimo}%</span>}
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleOpenContent(contenido)}
                                      style={{ padding: '7px 14px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, minWidth: 100, textAlign: 'center', background: est.completed ? 'rgba(4,57,65,0.07)' : tallerColor, color: est.completed ? '#043941' : '#fff', transition: 'opacity .16s' }}
                                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                    >
                                      {actionLabel}
                                    </button>
                                  </div>
                                  )
                                })()}
                              </div>
                            )
                          })}

                          {/* Bloque colapsable de diagnósticos */}
                          {diagnosticos.length > 0 && (
                            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(4,57,65,0.07)' }}>
                              <button
                                onClick={() => setDiagnosticosOpen(o => !o)}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: diagnosticosOpen ? 'rgba(4,57,65,0.03)' : '#fafcff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                              >
                                <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(4,57,65,0.07)' }}>
                                  <ClipboardList size={14} style={{ color: '#045f6c' }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p style={{ fontSize: 13, fontWeight: 700, color: '#043941', margin: '0 0 1px' }}>Diagnósticos de entrada</p>
                                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                                    {diagnosticos.length} evaluaciones · {totalDiagPreg} preguntas · Sin nota mínima
                                  </p>
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: 'rgba(4,57,65,0.07)', color: '#045f6c', flexShrink: 0 }}>
                                  Calibración
                                </span>
                                <ChevronRight size={14} style={{ color: '#94a3b8', transform: diagnosticosOpen ? 'rotate(90deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }} />
                              </button>

                              {diagnosticosOpen && (
                                <div style={{ borderTop: '1px solid rgba(4,57,65,0.07)', padding: '10px 14px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 4px', fontStyle: 'italic' }}>
                                    Estas evaluaciones no tienen nota mínima. Solo sirven para adaptar el programa a tu punto de partida.
                                  </p>
                                  {diagnosticos.map(contenido => (
                                    <div key={contenido.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(4,57,65,0.07)', background: '#fafcff' }}>
                                      <span style={{ fontSize: 16 }}>📝</span>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 12, fontWeight: 700, color: '#043941', margin: '0 0 1px' }}>{contenido.titulo}</p>
                                        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{contenido.bancoPreguntas!.length} preguntas · Sin nota mínima</p>
                                      </div>
                                      <button
                                        onClick={() => setQuizAbierto({ contenidoId: contenido.id, titulo: contenido.titulo, preguntas: contenido.bancoPreguntas!, puntajeMinimo: 0, bloqueaSiguiente: false })}
                                        style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 800, fontFamily: 'inherit', background: tallerColor, color: '#fff', flexShrink: 0 }}
                                      >
                                        Abrir
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        </div>{/* fin columna izquierda */}

        {/* ── SIDEBAR DERECHA ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 20 }}>

          {/* Card ① Progreso del módulo */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', padding: '18px 20px' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 14px' }}>Progreso</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                <svg width={64} height={64} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                  <circle cx={32} cy={32} r={26} fill="none" stroke="rgba(4,57,65,0.07)" strokeWidth={5} />
                  <circle cx={32} cy={32} r={26} fill="none" stroke={tallerColor} strokeWidth={5}
                    strokeDasharray={`${(progreso.porcentaje / 100) * 2 * Math.PI * 26} ${2 * Math.PI * 26}`}
                    strokeLinecap="round" style={{ transition: 'stroke-dasharray .6s ease' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#043941' }}>
                  {progreso.porcentaje}%
                </div>
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#043941', margin: '0 0 2px' }}>{progreso.completados} de {progreso.total}</p>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>contenidos completados</p>
              </div>
            </div>
          </div>

          {/* Card ② Índice de sesiones */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', padding: '16px 18px' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 10px' }}>Sesiones</p>
            {modulo.sesiones.map((ses, si) => (
              <button
                key={ses.id}
                onClick={() => {
                  setExpandedSubs(new Set([ses.id]))
                  document.getElementById(`ses-${ses.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: si < modulo.sesiones.length - 1 ? '1px solid rgba(4,57,65,0.07)' : 'none', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
              >
                <span style={{ fontSize: 10, fontWeight: 800, color: tallerColor, minWidth: 20, flexShrink: 0 }}>S{si + 1}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#043941', flex: 1, lineHeight: 1.3, textAlign: 'left' }}>
                  {ses.nombre}
                </span>
              </button>
            ))}
          </div>

          {/* Card ③ Navegación prev / next */}
          {(prevModulo || nextModulo) && (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {prevModulo && (
                <button
                  onClick={() => navigate(`/taller/${slug}/ruta/modulo/${prevModulo.numero}`)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 10, border: '1.5px solid rgba(4,57,65,0.1)', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: 'rgba(4,57,65,0.6)', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(4,57,65,0.04)'; e.currentTarget.style.color = '#043941' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'rgba(4,57,65,0.6)' }}
                >
                  <ChevronLeft size={13} style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    M{prevModulo.numero} — {prevModulo.nombre.split(' ').slice(0, 3).join(' ')}
                  </span>
                </button>
              )}
              {nextModulo && (
                <button
                  onClick={() => navigate(`/taller/${slug}/ruta/modulo/${nextModulo.numero}`)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '9px 14px', borderRadius: 10, border: 'none', background: tallerColor, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 800, color: '#fff', transition: 'opacity .16s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    M{nextModulo.numero} — {nextModulo.nombre.split(' ').slice(0, 3).join(' ')}
                  </span>
                  <ChevronRight size={13} style={{ flexShrink: 0 }} />
                </button>
              )}
            </div>
          )}

        </div>{/* fin sidebar */}

      </div>{/* fin grid */}

      {/* Modal para selección de grado */}
      {showGradeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={e => { if (e.target === e.currentTarget) setShowGradeModal(false) }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
              ¿Qué grado enseñas?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Selecciona tu grado para adaptar los ejemplos pedagógicos a tu contexto
            </p>
            <div className="space-y-2 mb-6">
              {['1°', '2°', '3°', '4°', '5°'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleGradeSelect(grade)}
                  className="w-full px-4 py-3 rounded-lg border-2 text-left font-semibold transition-all hover:bg-primary/10"
                  style={{ borderColor: selectedGrade === grade ? '#02d47e' : '#e3f8fb', color: 'var(--grama-oscuro)' }}
                >
                  {grade} grado de secundaria
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowGradeModal(false)}
              className="w-full px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-gray-100 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal visor de manuales — completa el contenido al cerrar */}
      {manualActivo && manualAbierto && (
        <ManualViewerModal
          manual={manualActivo}
          onClose={() => {
            markContenidoCompleted(manualAbierto.contenidoId)
            setManualAbierto(null)
          }}
        />
      )}

      {/* Modal de quiz */}
      {quizAbierto && (
        <QuizModal
          contenidoId={quizAbierto.contenidoId}
          titulo={quizAbierto.titulo}
          preguntas={quizAbierto.preguntas}
          puntajeMinimo={quizAbierto.puntajeMinimo}
          bloqueaSiguiente={quizAbierto.bloqueaSiguiente}
          onClose={() => setQuizAbierto(null)}
          onAprobado={() => {
            markContenidoCompleted(quizAbierto.contenidoId)
            toast.success('¡Quiz aprobado!', { description: 'Tu progreso ha sido guardado.' })
            setQuizAbierto(null)
          }}
        />
      )}

      {/* Modal visor de descargables — completa al cerrar */}
      {descargableActivo && descargableAbierto && (
        <DescargableViewerModal
          descargable={descargableActivo}
          onClose={() => {
            markContenidoCompleted(descargableAbierto.contenidoId)
            setDescargableAbierto(null)
          }}
        />
      )}

      {/* Modal selector EPP — completa m1-s3-c2 al cerrar */}
      {showEPPSelector && taller && (
        <EPPSelectorModal
          tallerSlug={slug ?? ''}
          tallerNombre={taller.nombre}
          onClose={() => {
            markContenidoCompleted('m1-s3-c2')
            setShowEPPSelector(false)
          }}
        />
      )}

      {/* Modal Mapa Habilidades — completa m5-s2-c1 al cerrar */}
      {showMapaHabilidades && taller && (
        <MapaHabilidadesModal
          tallerSlug={slug ?? ''}
          tallerNombre={taller.nombre}
          onClose={() => {
            markContenidoCompleted('m5-s2-c1')
            setShowMapaHabilidades(false)
          }}
        />
      )}

      {/* Modal Tabla Progresión — completa m5-s3-c2 al cerrar */}
      {showTablaProgresion && taller && (
        <TablaProgresionModal
          tallerSlug={slug ?? ''}
          tallerNombre={taller.nombre}
          onClose={() => {
            markContenidoCompleted('m5-s3-c2')
            setShowTablaProgresion(false)
          }}
        />
      )}

      {/* Modal Video Player */}
      {videoAbierto && (
        <VideoPlayerModal
          titulo={videoAbierto.titulo}
          descripcion={videoAbierto.descripcion}
          duracionMin={videoAbierto.duracionMin}
          urlVideo={videoAbierto.urlVideo}
          onClose={() => setVideoAbierto(null)}
          onComplete={() => {
            if (videoAbierto?.contenidoId) markContenidoCompleted(videoAbierto.contenidoId)
          }}
        />
      )}

      {/* Checklist mantenimiento — m2-s22-c3 / m3-s29-c3 */}
      {showChecklistMant && (
        <ChecklistMantenimientoModal
          zona={showChecklistMant}
          onClose={() => setShowChecklistMant(null)}
          onComplete={() => {
            const id = showChecklistMant === 'investigacion' ? 'm2-s22-c3' : 'm3-s29-c3'
            markContenidoCompleted(id)
          }}
        />
      )}

      {/* Verificación de funcionamiento electrónico — m2-s20-c3 (Zona Investigación) */}
      {showVerificacion && (
        <VerificacionFuncionamientoModal
          onClose={() => setShowVerificacion(false)}
          onComplete={() => markContenidoCompleted('m2-s20-c3')}
        />
      )}

      {/* Verificación visual herramientas — m3-s27-c3 (Zona Almacén) */}
      {showVerificacionAlmacen && (
        <VerificacionAlmacenModal
          onClose={() => setShowVerificacionAlmacen(false)}
          onComplete={() => markContenidoCompleted('m3-s27-c3')}
        />
      )}

      {/* Laboratorio de prompts — m0-s04-c3 */}
      {showLaboratorio && (
        <LaboratorioPromptsModal
          onClose={() => setShowLaboratorio(false)}
          onComplete={() => markContenidoCompleted('m0-s04-c3')}
        />
      )}

      {/* Clasificador de herramientas — m0-s02-c3 */}
      {showClasificador && (
        <ClasificadorHerramientasModal
          onClose={() => setShowClasificador(false)}
          onComplete={() => markContenidoCompleted('m0-s02-c3')}
        />
      )}

      {/* Escenario pedagógico — m5-s51-c3 y siguientes */}
      {escenarioPedagogico && (
        <EscenarioPedagogicoModal
          config={escenarioPedagogico}
          onClose={() => setEscenarioPedagogico(null)}
          onComplete={() => markContenidoCompleted(escenarioPedagogico.contenidoId)}
        />
      )}

      {/* Actividad externa — m0-s03-c4 / m0-s05-c4 / m0-s06-c4 */}
      {actividadExterna && (
        <ActividadExternaModal
          config={actividadExterna}
          onClose={() => setActividadExterna(null)}
          onComplete={() => markContenidoCompleted(actividadExterna.contenidoId)}
        />
      )}

      {/* Simulador EPP — m1-s13-c2 */}
      {showSimuladorEPP && (
        <SimuladorEPPMecaModal
          onClose={() => setShowSimuladorEPP(false)}
          onComplete={() => markContenidoCompleted('m1-s13-c2')}
        />
      )}

      {/* Explorador de Equipos — m1-s11-c2 */}
      {showExploradorEquipos && (
        <ExploradorEquiposModal
          onClose={() => setShowExploradorEquipos(false)}
          onComplete={() => markContenidoCompleted('m1-s11-c2')}
        />
      )}

      {/* Seleccionador de Consumibles — m2-s19-c3 / m3-s26-c3 / m4-s34-c3 */}
      {showSelConsumibles && (
        <SeleccionadorConsumiblesModal
          zona={showSelConsumibles}
          onClose={() => setShowSelConsumibles(null)}
          onComplete={() => {
            const ids: Record<string, string> = {
              investigacion: 'm2-s19-c3',
              almacen:       'm3-s26-c3',
              innovacion:    'm4-s34-c3',
            }
            markContenidoCompleted(ids[showSelConsumibles])
          }}
        />
      )}

      {/* Modal Tour 3D — Simulador Taller Automotriz */}
      {showTourSimulator && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black">
          <div
            className="flex items-center justify-between px-4 py-2 shrink-0"
            style={{ background: '#043941', borderBottom: '1px solid rgba(2,212,126,0.25)' }}
          >
            <span className="text-sm font-bold text-white">
              🚗 Tour 3D — Taller de Mecánica Automotriz
            </span>
            <button
              onClick={closeTourSimulator}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--grama-menta)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >
              ✕ Cerrar
            </button>
          </div>
          <iframe
            src="/tour-3d-automotriz-v2.html"
            title="Tour 3D Taller Automotriz"
            className="flex-1 w-full border-0"
            allow="fullscreen"
          />
        </div>
      )}
    </div>
  )
}
