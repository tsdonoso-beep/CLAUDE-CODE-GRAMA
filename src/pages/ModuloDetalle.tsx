// src/pages/ModuloDetalle.tsx
import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { trackContenido } from '@/lib/tracker'
import { toast } from 'sonner'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import {
  Clock, ChevronLeft, ChevronDown, ChevronRight,
  FileText, Video, Zap, Download, Activity,
  ExternalLink, Lock, ClipboardList, School, CheckCircle2
} from 'lucide-react'
import { modulosLXP } from '@/data/modulosLXP'
import { manualesRuta } from '@/data/manualesRuta'
import { useProgress } from '@/contexts/ProgressContext'
import { ContenidoBadge } from '@/components/lxp/ContenidoBadge'
import { QuizBlock } from '@/components/lxp/QuizBlock'
import { ConocenosForm } from '@/components/lxp/ConocenosForm'
import { ManualViewerModal } from '@/components/lxp/ManualViewerModal'
import { EPPSelectorModal } from '@/components/lxp/EPPSelectorModal'
import { MapaHabilidadesModal } from '@/components/lxp/MapaHabilidadesModal'
import { TablaProgresionModal } from '@/components/lxp/TablaProgresionModal'
import { DescargableViewerModal } from '@/components/lxp/DescargableViewerModal'
import { VideoPlayerModal } from '@/components/lxp/VideoPlayerModal'
import { descargablesLXP } from '@/data/descargablesLXP'
import { useTaller } from '@/hooks/useTaller'
import { getTallerBySlug } from '@/data/talleresConfig'
import jsPDF from 'jspdf'

const CONTENT_ICON: Record<string, React.ElementType> = {
  PDF: FileText,
  VIDEO: Video,
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
  const { markContenidoCompleted, markContenidoInProgress, getEstadoModuloLXP, getContenidoEstado } = useProgress()
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
  const [videoAbierto, setVideoAbierto] = useState<{ titulo: string; descripcion?: string; duracionMin?: number; urlVideo: string; contenidoId: string } | null>(null)
  const [showTourSimulator, setShowTourSimulator] = useState(false)

  const closeGradeModal = useCallback(() => setShowGradeModal(false), [])
  const closeTourSimulator = useCallback(() => {
    setShowTourSimulator(false)
    markContenidoCompleted('m0-s2-c2')
  }, [markContenidoCompleted])
  useEscapeKey(showGradeModal ? closeGradeModal : showTourSimulator ? closeTourSimulator : () => {})

  const manualActivo = manualAbierto ? manualesRuta.find(m => m.id === manualAbierto.manualId) ?? null : null
  const descargableActivo = descargableAbierto ? descargablesLXP.find(d => d.id === descargableAbierto.descargableId) ?? null : null
  const taller = getTallerBySlug(slug ?? '')

  const moduloNum = parseInt(num ?? '0', 10)
  const modulo = modulosLXP.find(m => m.numero === moduloNum)
  const estado = getEstadoModuloLXP(modulo?.id ?? '')
  const prevModulo = modulosLXP.find(m => m.numero === moduloNum - 1)

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
    } else if (contenido.tipo === 'INTERACTIVO') {
      if (contenido.id === 'm0-s2-c2' && slug === 'mecanica-automotriz') {
        setShowTourSimulator(true)
      } else if (contenido.id === 'm1-s2-c2') {
        // Catálogo Interactivo de Bienes → Repositorio del taller
        markContenidoCompleted(contenido.id)
        navigate(`/taller/${slug}/repositorio`)
      } else if (contenido.id === 'm1-s3-c2') {
        setShowEPPSelector(true)
      } else if (contenido.id === 'm2-s4-c1') {
        // Explorador Zona Investigación → Repositorio pre-filtrado
        markContenidoCompleted(contenido.id)
        navigate(`/taller/${slug}/repositorio?zona=${encodeURIComponent('ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO')}`)
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
      if (contenido.urlActividad) {
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
    <div>
      {/* ── Hero ── */}
      <div className="px-8 py-10 grama-pattern" style={{ background: '#043941' }}>
        <button
          onClick={() => navigate(`/taller/${slug}/ruta`)}
          className="flex items-center gap-1.5 text-xs font-semibold mb-4 transition-colors"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
        >
          <ChevronLeft size={13} />
          Ruta de Aprendizaje
        </button>
        <div className="flex items-start gap-4">
          <span className="text-4xl">{modulo.icon}</span>
          <div>
            <p className="overline-label font-semibold mb-1" style={{ color: 'var(--grama-menta)' }}>
              M{modulo.numero} · {modulo.fase.charAt(0).toUpperCase() + modulo.fase.slice(1)}
            </p>
            <h1 className="t-h1 font-extrabold text-white mb-2">
              {modulo.nombre}
            </h1>
            <p className="text-sm max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {modulo.descripcion}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-5">
          <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <Clock size={14} />
            {modulo.horasTotal}h totales
          </div>
          {modulo.horasAsincrono > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: '#e3f8fb', color: '#045f6c' }}>
              {modulo.horasAsincrono}h Asíncrono
            </span>
          )}
          {modulo.horasSincrono > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: '#fdf8da', color: '#ca8a04' }}>
              {modulo.horasSincrono}h Sincrónico
            </span>
          )}
          {modulo.horasPresencial > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: '#d2ffe1', color: '#00c16e' }}>
              {modulo.horasPresencial}h Presencial
            </span>
          )}
          {modulo.requiereAprobacion && (
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: '#fef3c7', color: '#ca8a04' }}>
              ⚠ Evaluación obligatoria ({modulo.puntajeMinimoAcceso}%)
            </span>
          )}
        </div>
      </div>

      {/* ── Sub-secciones (accordion) ── */}
      <div className="p-6 max-w-4xl">
        <div className="space-y-3">
          {modulo.sesiones.map((ses, idx) => {
            const isOpen = expandedSubs.has(ses.id) || expandedSubs.has(String(idx))
            const modalidadBadge =
              ses.esEvaluacion   ? { label: 'EVALUACIÓN', color: '#ca8a04', bg: 'rgba(245,158,11,0.1)' } :
              ses.modalidad === 'sincrono'   ? { label: 'EN VIVO',    color: '#02d47e', bg: 'rgba(2,212,126,0.1)' } :
              ses.modalidad === 'presencial' ? { label: 'PRESENCIAL', color: '#b45309', bg: 'rgba(245,158,11,0.1)' } :
                                               { label: 'AUTÓNOMO',  color: '#045f6c', bg: 'rgba(4,95,108,0.08)' }
            return (
              <div
                key={ses.id}
                className="rounded-2xl border overflow-hidden transition-all"
                style={{ borderColor: isOpen ? '#02d47e' : '#e3f8fb' }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggleSub(ses.id)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4"
                  style={{ background: '#ffffff' }}
                >
                  <div
                    className="h-2 w-2 rounded-full shrink-0 mt-1.5"
                    style={{ background: isOpen ? '#02d47e' : '#94a3b8' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md"
                        style={{ background: modalidadBadge.bg, color: modalidadBadge.color }}>
                        {ses.id}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--grama-oscuro)' }}>
                        {ses.nombre}
                      </span>
                      <span className="overline-label font-semibold" style={{ color: modalidadBadge.color }}>
                        · {modalidadBadge.label}
                      </span>
                    </div>
                    {ses.descripcion && !isOpen && (
                      <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#045f6c' }}>
                        {ses.descripcion}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs" style={{ color: '#045f6c' }}>
                      {ses.contenidos.length} contenidos · {ses.duracionHoras}h
                    </span>
                    {isOpen
                      ? <ChevronDown size={16} style={{ color: '#045f6c' }} />
                      : <ChevronRight size={16} style={{ color: '#045f6c' }} />
                    }
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t px-6 py-5 space-y-4" style={{ borderColor: '#f1f5f9', background: '#ffffff' }}>
                    {ses.descripcion && (
                      <p className="text-sm" style={{ color: '#045f6c' }}>
                        {ses.descripcion}
                      </p>
                    )}
                    {/* Agenda de momentos para sesiones sincrónicas */}
                    {ses.momentos && ses.momentos.length > 0 && (
                      <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#e3f8fb' }}>
                        <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#f0fdf9' }}>
                          <span className="overline-label font-extrabold" style={{ color: 'var(--grama-menta)' }}>Agenda de sesión</span>
                        </div>
                        <div className="divide-y" style={{ borderColor: '#f1f5f9' }}>
                          {ses.momentos.map((m, mi) => (
                            <div key={mi} className="flex items-center gap-3 px-4 py-2 text-xs"
                              style={{ background: m.isBreak ? '#fafff8' : m.isActividad ? '#f0fdf9' : '#ffffff' }}>
                              {m.horaInicio && <span className="tabular-nums font-mono shrink-0" style={{ color: '#94a3b8' }}>{m.horaInicio}</span>}
                              <span className="tabular-nums font-semibold shrink-0 w-10" style={{ color: '#045f6c' }}>{m.duracionMin}min</span>
                              <span className="flex-1 font-medium" style={{ color: m.isBreak ? '#94a3b8' : m.isActividad ? '#02d47e' : '#043941',
                                fontStyle: m.isBreak ? 'italic' : 'normal' }}>{m.momento}</span>
                              {m.materiales && <span className="shrink-0 text-[10px]" style={{ color: '#94a3b8' }}>{m.materiales}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(() => {
                      // Separar diagnósticos (quiz con bancoPreguntas sin bloqueo) del resto
                      const diagnosticos = ses.contenidos.filter(
                        c => c.tipo === 'QUIZ' && !!c.bancoPreguntas && !c.bloqueaSiguiente
                      )
                      const resto = ses.contenidos.filter(
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
                                  <QuizBlock
                                    contenidoId={contenido.id}
                                    titulo={contenido.titulo}
                                    preguntas={contenido.bancoPreguntas!}
                                    puntajeMinimo={contenido.puntajeMinimo ?? 80}
                                    bloqueaSiguiente={contenido.bloqueaSiguiente ?? false}
                                    onAprobado={() => {
                                      markContenidoCompleted(contenido.id)
                                      toast.success('¡Quiz aprobado!', { description: 'Tu progreso ha sido guardado.' })
                                    }}
                                  />
                                ) : (() => {
                                  const estado = getContenidoEstado(contenido.id)
                                  return (
                                  <div
                                    className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm"
                                    style={{
                                      borderColor: estado.completed ? '#02d47e' : '#e3f8fb',
                                      background: estado.completed ? '#f0fdf9' : '#fafffe',
                                    }}
                                  >
                                    <div
                                      className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                                      style={{ background: estado.completed ? 'rgba(2,212,126,0.12)' : '#f1f5f9' }}
                                    >
                                      {estado.completed
                                        ? <CheckCircle2 size={16} style={{ color: 'var(--grama-menta)' }} />
                                        : <ContentIcon size={16} style={{ color: '#64748b' }} />
                                      }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <ContenidoBadge tipo={contenido.tipo} size="sm" />
                                        <h4 className="text-sm font-bold" style={{ color: 'var(--grama-oscuro)' }}>
                                          {contenido.titulo}
                                        </h4>
                                        {estado.completed && (
                                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                            style={{ background: 'rgba(2,212,126,0.15)', color: 'var(--grama-menta)' }}>
                                            ✓ Completado
                                          </span>
                                        )}
                                        {estado.inProgress && !estado.completed && (
                                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                                            style={{ background: 'rgba(245,158,11,0.12)', color: '#b45309' }}>
                                            En progreso
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs mb-2" style={{ color: '#045f6c' }}>
                                        {contenido.descripcion}
                                      </p>
                                      <div className="flex flex-wrap gap-3 text-xs" style={{ color: '#94a3b8' }}>
                                        {contenido.duracionMin && (
                                          <span className="flex items-center gap-1">
                                            <Clock size={11} />
                                            {contenido.duracionMin >= 60
                                              ? `${Math.floor(contenido.duracionMin / 60)}h${contenido.duracionMin % 60 > 0 ? ` ${contenido.duracionMin % 60}min` : ''}`
                                              : `${contenido.duracionMin} min`}
                                          </span>
                                        )}
                                        {contenido.paginas && <span>{contenido.paginas} páginas</span>}
                                        {contenido.preguntas && <span>{contenido.preguntas} preguntas</span>}
                                        {contenido.puntajeMinimo && (
                                          <span className="font-semibold" style={{ color: '#ca8a04' }}>
                                            Mínimo {contenido.puntajeMinimo}%
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleOpenContent(contenido)}
                                      className="inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold shrink-0 transition-all hover:opacity-90"
                                      style={{
                                        background: estado.completed ? 'rgba(2,212,126,0.15)' : contenido.tipo === 'ACTIVIDAD_PRACTICA' ? '#f59e0b' : '#043941',
                                        color: estado.completed ? '#02d47e' : '#ffffff',
                                        width: '108px',
                                      }}
                                    >
                                      {estado.completed ? (
                                        <>Revisar <CheckCircle2 size={11} /></>
                                      ) : contenido.tipo === 'DESCARGABLE' ? (
                                        <>Descargar <Download size={11} /></>
                                      ) : contenido.tipo === 'EN_VIVO' ? (
                                        <>Ver enlace <ExternalLink size={11} /></>
                                      ) : contenido.tipo === 'ACTIVIDAD_PRACTICA' ? (
                                        <>Ver actividad <ChevronRight size={11} /></>
                                      ) : contenido.tipo === 'PDF' ? (
                                        <>Ver PDF <ChevronRight size={11} /></>
                                      ) : contenido.tipo === 'VIDEO' ? (
                                        <>Ver video <ChevronRight size={11} /></>
                                      ) : (
                                        <>Abrir <ChevronRight size={11} /></>
                                      )}
                                    </button>
                                  </div>
                                  )
                                })()}
                              </div>
                            )
                          })}

                          {/* Bloque colapsable de diagnósticos */}
                          {diagnosticos.length > 0 && (
                            <div
                              className="rounded-xl overflow-hidden border"
                              style={{ borderColor: '#c8f0e8' }}
                            >
                              {/* Header del grupo */}
                              <button
                                onClick={() => setDiagnosticosOpen(o => !o)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                                style={{ background: diagnosticosOpen ? '#e8faf4' : '#f0fdf9' }}
                              >
                                <div
                                  className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                                  style={{ background: '#d2ffe1' }}
                                >
                                  <ClipboardList size={15} style={{ color: '#00c16e' }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold" style={{ color: 'var(--grama-oscuro)' }}>
                                    Diagnósticos de entrada
                                  </p>
                                  <p className="text-xs" style={{ color: '#045f6c' }}>
                                    {diagnosticos.length} evaluaciones · {totalDiagPreg} preguntas · ~{totalDiagMin} min · Sin nota mínima
                                  </p>
                                </div>
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                                  style={{ background: '#d2ffe1', color: '#00c16e' }}
                                >
                                  Solo calibración
                                </span>
                                {diagnosticosOpen
                                  ? <ChevronDown size={15} style={{ color: '#045f6c' }} />
                                  : <ChevronRight size={15} style={{ color: '#045f6c' }} />
                                }
                              </button>

                              {/* Quizzes desplegados */}
                              {diagnosticosOpen && (
                                <div
                                  className="border-t p-4 space-y-4"
                                  style={{ borderColor: '#c8f0e8', background: '#fafffd' }}
                                >
                                  <p className="text-xs italic" style={{ color: '#045f6c' }}>
                                    Estas evaluaciones no tienen nota mínima. Solo sirven para que el programa se adapte a tu punto de partida.
                                  </p>
                                  {diagnosticos.map(contenido => (
                                    <QuizBlock
                                      key={contenido.id}
                                      contenidoId={contenido.id}
                                      titulo={contenido.titulo}
                                      preguntas={contenido.bancoPreguntas!}
                                      puntajeMinimo={0}
                                      bloqueaSiguiente={false}
                                    />
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

        {/* Navegación entre módulos */}
        <div className="flex justify-between mt-8 gap-4">
          {prevModulo ? (
            <button
              onClick={() => navigate(`/taller/${slug}/ruta/modulo/${prevModulo.numero}`)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all"
              style={{ borderColor: '#e3f8fb', color: 'var(--grama-oscuro)', background: '#ffffff' }}
            >
              <ChevronLeft size={15} />
              {prevModulo.icon} M{prevModulo.numero}
            </button>
          ) : <div />}
          {nextModulo && (
            <button
              onClick={() => navigate(`/taller/${slug}/ruta/modulo/${nextModulo.numero}`)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#02d47e' }}
            >
              M{nextModulo.numero} {nextModulo.icon}
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>

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
