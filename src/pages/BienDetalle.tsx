// src/pages/BienDetalle.tsx
import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import {
  ChevronLeft, FileText, Video, Shield, Package,
  Tag, Hash, MapPin, Layers, AlertTriangle, CheckCircle2, XCircle,
  Download, X,
} from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { eppPorTaller } from '@/data/eppData'
import type { EPPItem } from '@/data/eppData'
import { getManualPDF, getDriveEmbedUrl, getDriveDownloadUrl, getDriveThumbnailUrl } from '@/data/manualesPDF'

type TabId = 'manual' | 'video'

export default function BienDetalle() {
  const { id } = useParams<{ id: string }>()
  const { taller, bienes, slug } = useTaller()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabId>('manual')
  const [showPDFModal, setShowPDFModal] = useState(false)
  const closePDFModal = useCallback(() => setShowPDFModal(false), [])
  useEscapeKey(closePDFModal)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bien = bienes.find((b: any) => String(b.n) === id)

  if (!taller || !bien) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Package size={40} style={{ color: '#e3f8fb' }} />
        <p className="font-semibold" style={{ color: '#043941' }}>Bien no encontrado</p>
        <button
          onClick={() => navigate(`/taller/${slug}/repositorio`)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white"
          style={{ background: '#043941' }}
        >
          <ChevronLeft size={14} />
          Volver al repositorio
        </button>
      </div>
    )
  }

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'manual', label: 'Manual de uso y Mantenimiento', icon: FileText },
    { id: 'video',  label: 'Video operatividad',            icon: Video   },
  ]

  // Manual PDF
  const manualUrl = getManualPDF(slug ?? '', bien.n)

  // Bienes relacionados (misma zona)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bienesRelacionados = bienes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b.zona === bien.zona && b.n !== bien.n)
    .slice(0, 4)

  return (
    <div>
      {/* ── Hero ── */}
      <div className="px-8 py-10 grama-pattern" style={{ background: '#043941' }}>
        <button
          onClick={() => navigate(`/taller/${slug}/repositorio`)}
          className="flex items-center gap-1.5 text-xs font-semibold mb-4 transition-colors"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
        >
          <ChevronLeft size={13} />
          Repositorio
        </button>
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div
            className="h-16 w-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(2,212,126,0.15)' }}
          >
            <Package size={28} style={{ color: '#02d47e' }} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white mb-1">
              {bien.nombre}
            </h1>
            <div className="flex flex-wrap gap-2">
              {bien.marca && (
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(2,212,126,0.15)', color: '#02d47e' }}>
                  {bien.marca} {bien.modelo}
                </span>
              )}
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                ×{bien.cantidad} unidades
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                {bien.tipo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recursos (tabs) — primero para que el docente los vea sin scroll */}
          <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
            <div className="border-b" style={{ borderColor: '#e3f8fb', background: '#fafffe' }}>
              <div className="flex overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-5 py-3.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all"
                    style={{
                      borderColor: activeTab === tab.id ? '#02d47e' : 'transparent',
                      color: activeTab === tab.id ? '#043941' : '#045f6c',
                      background: 'transparent',
                    }}
                  >
                    <tab.icon size={13} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-8 flex flex-col items-center justify-center" style={{ background: '#ffffff', minHeight: '200px' }}>
              {activeTab === 'video' ? (
                <>
                  <div
                    className="w-full aspect-video rounded-xl flex flex-col items-center justify-center mb-3"
                    style={{ background: '#043941' }}
                  >
                    <Video size={36} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <p className="text-sm mt-2 font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Video de operatividad
                    </p>
                  </div>
                  <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                    Próximamente — Video del proveedor en preparación
                  </p>
                </>
              ) : manualUrl ? (
                <div className="w-full flex flex-col gap-3">
                  {/* Cover card — zoom al producto */}
                  <div
                    className="w-full aspect-video rounded-xl overflow-hidden cursor-pointer relative group"
                    style={{ background: '#f8fffe' }}
                    onClick={() => setShowPDFModal(true)}
                  >
                    <img
                      src={getDriveThumbnailUrl(manualUrl, 600)}
                      alt="Imagen del producto"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 55%',
                        transform: 'scale(1.55)',
                        transformOrigin: 'center 55%',
                      }}
                      loading="lazy"
                    />
                    {/* Degradado inferior */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-16"
                      style={{ background: 'linear-gradient(to top, rgba(4,57,65,0.65), transparent)' }}
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(4,57,65,0.35)' }}
                    >
                      <span
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white"
                        style={{ background: 'rgba(2,212,126,0.9)' }}
                      >
                        <FileText size={13} />
                        Abrir manual
                      </span>
                    </div>
                    {/* Badge inferior */}
                    <p className="absolute bottom-3 left-3 text-[10px] font-semibold text-white opacity-80">
                      Pág. 1 · Vista previa
                    </p>
                  </div>

                  {/* Botón secundario */}
                  <button
                    onClick={() => setShowPDFModal(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: '#043941', color: '#02d47e' }}
                  >
                    <FileText size={14} />
                    Ver manual completo
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: '#e3f8fb' }}
                  >
                    <FileText size={28} style={{ color: '#045f6c' }} />
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#043941' }}>
                    Manual de uso <span style={{ fontWeight: 800 }}>y mantenimiento</span>
                  </p>
                  <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                    Próximamente — PDF del proveedor en preparación
                  </p>
                  <button
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold opacity-40 cursor-not-allowed"
                    style={{ background: '#e3f8fb', color: '#045f6c' }}
                    disabled
                  >
                    Descargar PDF
                  </button>
                </>
              )}
            </div>
          </section>

          {/* Info técnica */}
          <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: '#e3f8fb', background: '#fafffe' }}>
              <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>
                Información técnica
              </h2>
            </div>
            <div className="p-6 space-y-4" style={{ background: '#ffffff' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#043941' }}>
                {bien.descripcion}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Hash, label: 'Código entidad', value: bien.codigoEntidad },
                  { icon: Tag, label: 'Código interno', value: bien.codigoInterno },
                  { icon: MapPin, label: 'Zona', value: bien.zona.split(',')[0].trim() },
                  { icon: Layers, label: 'Tipo', value: bien.tipo },
                ].filter(f => f.value).map(field => (
                  <div key={field.label} className="flex items-start gap-2">
                    <field.icon size={14} className="mt-0.5 shrink-0" style={{ color: '#045f6c' }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#045f6c' }}>{field.label}</p>
                      <p className="text-sm font-medium" style={{ color: '#043941' }}>{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Uso pedagógico */}
          <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: '#e3f8fb', background: '#fafffe' }}>
              <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>
                Uso pedagógico
              </h2>
            </div>
            <div className="p-6" style={{ background: '#ffffff' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#043941' }}>
                {bien.usoPedagogico}
              </p>
            </div>
          </section>

          {/* Bienes relacionados */}
          {bienesRelacionados.length > 0 && (
            <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: '#e3f8fb', background: '#fafffe' }}>
                <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>Bienes relacionados</h2>
              </div>
              <div className="p-5" style={{ background: '#ffffff' }}>
                <div className="flex flex-wrap gap-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {bienesRelacionados.map((b: any) => (
                    <button
                      key={b.n}
                      onClick={() => navigate(`/taller/${slug}/repositorio/bien/${b.n}`)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-left transition-all hover:shadow-sm"
                      style={{ borderColor: '#d1e8eb', background: '#f0faf5' }}
                    >
                      <Package size={14} style={{ color: '#02d47e', flexShrink: 0 }} />
                      <span className="text-xs font-semibold line-clamp-1" style={{ color: '#043941' }}>
                        {b.nombre}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* EPP requerido */}
          {(() => {
            const eppResult = getEPPForBien(bien, slug ?? '')
            const borderColor = eppResult.tipo === 'sin-epp' ? '#e3f8fb' : '#fecaca'
            const bgHeader   = eppResult.tipo === 'sin-epp' ? '#f0faf5'  : '#fff5f5'
            const iconColor  = eppResult.tipo === 'sin-epp' ? '#02d47e'  : '#ef4444'
            return (
              <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor }}>
                <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor, background: bgHeader }}>
                  <Shield size={16} style={{ color: iconColor }} />
                  <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>
                    EPP requerido para este equipo
                  </h2>
                </div>
                <div className="p-6" style={{ background: '#ffffff' }}>
                  {/* Mensaje sin EPP */}
                  {eppResult.tipo === 'sin-epp' && (
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} style={{ color: '#02d47e', flexShrink: 0 }} />
                      <p className="text-sm" style={{ color: '#045f6c' }}>{eppResult.mensaje}</p>
                    </div>
                  )}

                  {/* Items EPP */}
                  {eppResult.tipo !== 'sin-epp' && eppResult.items.length > 0 && (
                    <div className="space-y-4">
                      {/* Advertencia NO guantes */}
                      {eppResult.noGuantes && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: '#fef3c7', border: '1px solid #f59e0b33' }}>
                          <XCircle size={15} style={{ color: '#d97706', flexShrink: 0, marginTop: 1 }} />
                          <p className="text-xs font-bold" style={{ color: '#92400e' }}>
                            PROHIBIDO usar guantes con este equipo (riesgo de atrapamiento)
                          </p>
                        </div>
                      )}

                      {/* Lista de EPP */}
                      <div className="space-y-2">
                        {eppResult.items.map((epp: EPPItem) => (
                          <div
                            key={epp.nombre}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                            style={{
                              background: epp.nivel === 'obligatorio' ? '#fee2e2' : '#fef9c3',
                              border: `1px solid ${epp.nivel === 'obligatorio' ? '#fecaca' : '#fde68a'}`,
                            }}
                          >
                            <Shield
                              size={13}
                              style={{ color: epp.nivel === 'obligatorio' ? '#ef4444' : '#ca8a04', flexShrink: 0 }}
                            />
                            <span
                              className="text-xs font-semibold flex-1"
                              style={{ color: epp.nivel === 'obligatorio' ? '#b91c1c' : '#854d0e' }}
                            >
                              {epp.nombre}
                            </span>
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background: epp.nivel === 'obligatorio' ? '#fca5a5' : '#fde68a',
                                color: epp.nivel === 'obligatorio' ? '#7f1d1d' : '#713f12',
                              }}
                            >
                              {epp.nivel === 'obligatorio' ? 'Obligatorio' : 'Recomendado'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Alertas */}
                      {eppResult.alertas && eppResult.alertas.length > 0 && (
                        <div className="space-y-2 pt-1">
                          {eppResult.alertas.map((alerta: string) => (
                            <div
                              key={alerta}
                              className="flex items-start gap-2.5 p-3 rounded-xl"
                              style={{ background: '#fff7ed', border: '1px solid rgba(249,115,22,0.2)' }}
                            >
                              <AlertTriangle size={14} style={{ color: '#f97316', flexShrink: 0, marginTop: 1 }} />
                              <p className="text-xs" style={{ color: '#9a3412' }}>{alerta}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Nota genérica */}
                      {eppResult.nota && (
                        <p className="text-[11px] mt-2" style={{ color: 'rgba(4,57,65,0.4)' }}>
                          {eppResult.nota}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )
          })()}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Ficha rápida */}
          <div className="p-5 rounded-2xl border-2" style={{ borderColor: '#e3f8fb', background: '#ffffff' }}>
            <h3 className="text-sm font-extrabold mb-4" style={{ color: '#043941' }}>
              Ficha de uso rápido
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg" style={{ background: '#f0faf5' }}>
                <p className="font-bold mb-1" style={{ color: '#043941' }}>Antes del uso</p>
                <p style={{ color: '#045f6c' }}>Verificar guarda de seguridad y estado del equipo. Colocarse EPP completo.</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: '#f0faf5' }}>
                <p className="font-bold mb-1" style={{ color: '#043941' }}>Durante el uso</p>
                <p style={{ color: '#045f6c' }}>Mantener atención en la zona de trabajo. No dejar a estudiantes sin supervisión.</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: '#f0faf5' }}>
                <p className="font-bold mb-1" style={{ color: '#043941' }}>Al terminar</p>
                <p style={{ color: '#045f6c' }}>Limpiar residuos, apagar el equipo y registrar en bitácora del taller.</p>
              </div>
            </div>
          </div>

          {/* Ficha de mantenimiento rápido */}
          <div className="p-5 rounded-2xl border-2" style={{ borderColor: '#e3f8fb', background: '#ffffff' }}>
            <h3 className="text-sm font-extrabold mb-4" style={{ color: '#043941' }}>
              Ficha de <span style={{ fontWeight: 800 }}>mantenimiento</span> rápido
            </h3>
            <div className="space-y-2">
              {['', '', ''].map((_, i) => (
                <div key={i} className="h-10 rounded-lg" style={{ background: '#f0faf5' }} />
              ))}
              <p className="text-[11px] pt-1" style={{ color: 'rgba(4,57,65,0.35)' }}>
                Aún por detallar el contenido de visualización rápida de mantenimiento
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal PDF ── */}
      {showPDFModal && manualUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(4,57,65,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowPDFModal(false)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#ffffff', maxHeight: '92vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b shrink-0"
              style={{ borderColor: '#e3f8fb' }}
            >
              <div className="flex items-center gap-2">
                <FileText size={15} style={{ color: '#045f6c' }} />
                <p className="text-sm font-extrabold" style={{ color: '#043941' }}>
                  Manual de uso y mantenimiento
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={getDriveDownloadUrl(manualUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ background: '#043941', color: '#02d47e' }}
                >
                  <Download size={12} />
                  Descargar
                </a>
                <button
                  onClick={() => setShowPDFModal(false)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: '#045f6c' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            {/* iframe PDF */}
            <iframe
              src={getDriveEmbedUrl(manualUrl)}
              className="w-full flex-1"
              style={{ border: 'none', minHeight: '75vh' }}
              title={`Manual — ${bien.nombre}`}
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Normaliza texto para comparación ──────────────────────────────────────
function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// ── Resultado de EPP ───────────────────────────────────────────────────────
interface EPPResult {
  tipo: 'especifico' | 'generico' | 'sin-epp'
  items: EPPItem[]
  noGuantes?: boolean
  alertas?: string[]
  mensaje?: string
  nota?: string
}

// ── Lógica principal de EPP por bien ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEPPForBien(bien: any, tallerSlug: string): EPPResult {
  const tipo = bien.tipo ?? ''

  // Sin EPP: mobiliario, material pedagógico, sin clasificar
  if (['MOBILIARIO', 'PEDAGOGICO', ''].includes(tipo)) {
    return { tipo: 'sin-epp', items: [], mensaje: 'Este bien no requiere EPP específico.' }
  }

  // Los ítems de SEGURIDAD son EPP en sí mismos
  if (tipo === 'SEGURIDAD') {
    return { tipo: 'sin-epp', items: [], mensaje: 'Este bien es equipo de protección personal (EPP).' }
  }

  // Buscar match en la tabla EPP del taller por similitud de nombre
  const rows = eppPorTaller[tallerSlug] ?? []
  const nombreBien = norm(bien.nombre)

  const match = rows.find(row => {
    const nombreEquipo = norm(row.equipo)
    // Palabras clave de 4+ caracteres del equipo en eppData
    const words = nombreEquipo.split(/[\s\/(),]+/).filter((w: string) => w.length >= 4)
    return words.length > 0 && words.some((w: string) => nombreBien.includes(w))
  })

  if (match) {
    return {
      tipo: 'especifico',
      items: match.epp,
      noGuantes: match.noGuantes,
      alertas: match.alertas,
    }
  }

  // Sin match en eppData → EPP genérico por tipo y zona
  const zona = norm(bien.zona ?? '')

  if (tipo === 'EQUIPOS') {
    if (zona.includes('innovacion')) {
      return {
        tipo: 'generico',
        items: [
          { nombre: 'Lentes de policarbonato', nivel: 'obligatorio' },
          { nombre: 'Calzado de seguridad', nivel: 'obligatorio' },
        ],
        nota: 'EPP general para zona de maquinaria. Consultar manual del equipo para EPP específico.',
      }
    }
    if (zona.includes('investigacion') || zona.includes('almacen')) {
      return {
        tipo: 'generico',
        items: [{ nombre: 'Calzado de seguridad', nivel: 'recomendado' }],
        nota: 'Zona de bajo riesgo. Verificar condiciones específicas del equipo.',
      }
    }
    if (zona.includes('acabados')) {
      return {
        tipo: 'generico',
        items: [
          { nombre: 'Guantes apropiados', nivel: 'obligatorio' },
          { nombre: 'Lentes de policarbonato', nivel: 'recomendado' },
        ],
      }
    }
    return {
      tipo: 'generico',
      items: [{ nombre: 'Calzado de seguridad', nivel: 'recomendado' }],
    }
  }

  if (tipo === 'HERRAMIENTAS') {
    return {
      tipo: 'generico',
      items: [
        { nombre: 'Guantes de cuero o nitrilo', nivel: 'obligatorio' },
        { nombre: 'Lentes de policarbonato', nivel: 'recomendado' },
      ],
    }
  }

  return { tipo: 'sin-epp', items: [], mensaje: 'No requiere EPP específico.' }
}
