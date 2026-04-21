// src/pages/BienDetalle.tsx
import { useState, useCallback, useRef, useEffect } from 'react'
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
import { getManualPDF, getVideoOperatividad, getVideoByCodigoInterno, getDriveEmbedUrl, getDriveDownloadUrl, getDriveThumbnailUrl, getVideoEmbedUrl, getVideoSourceLabel } from '@/data/manualesPDF'
import { useAuth } from '@/contexts/AuthContext'
import { trackContenido } from '@/lib/tracker'

type TabId = 'manual' | 'video'

export default function BienDetalle() {
  const { id } = useParams<{ id: string }>()
  const { taller, bienes, slug } = useTaller()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabId>('manual')
  const [showPDFModal, setShowPDFModal] = useState(false)
  const closePDFModal = useCallback(() => setShowPDFModal(false), [])
  useEscapeKey(closePDFModal)
  const trackedRef = useRef<Record<string, boolean>>({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bien = bienes.find((b: any) => String(b.n) === id)

  function trackOnce(tipo: 'manual' | 'video') {
    const key = `${id}-${tipo}`
    if (trackedRef.current[key]) return
    trackedRef.current[key] = true
    if (user?.id && slug && id) {
      trackContenido(user.id, slug, id, tipo)
    }
  }

  // Auto-track manual view on load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (bien && user?.id) trackOnce('manual')
  }, [bien?.n, user?.id])

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
  const videoUrl  = getVideoOperatividad(slug ?? '', bien.n) ?? getVideoByCodigoInterno(bien.codigoInterno)

  // Bienes relacionados (misma zona)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bienesRelacionados = bienes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b.zona === bien.zona && b.n !== bien.n)
    .slice(0, 4)

  const eppResult = getEPPForBien(bien, slug ?? '')

  return (
    <div>
      {/* ── Hero ── */}
      <div className="px-8 py-10 grama-pattern" style={{ background: '#043941' }}>
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
                    onClick={() => { setActiveTab(tab.id); if (tab.id === 'video') trackOnce('video') }}
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
                videoUrl ? (
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-full aspect-video rounded-xl overflow-hidden" style={{ background: '#043941' }}>
                      <iframe
                        src={getVideoEmbedUrl(videoUrl)}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`Video operatividad — ${bien.nombre}`}
                      />
                    </div>
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
                      style={{ background: '#f0faf5', color: '#043941' }}
                    >
                      <Video size={13} /> {getVideoSourceLabel(videoUrl)}
                    </a>
                  </div>
                ) : (
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
                )
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
                      onError={e => {
                        const img = e.currentTarget
                        img.style.display = 'none'
                        const fallback = img.nextElementSibling as HTMLElement | null
                        if (fallback?.dataset.fallback) fallback.style.display = 'flex'
                      }}
                    />
                    {/* Fallback cuando thumbnail no carga (ej: localhost) */}
                    <div
                      data-fallback="1"
                      className="absolute inset-0 flex-col items-center justify-center gap-2"
                      style={{ display: 'none', background: '#f0faf5' }}
                    >
                      <FileText size={32} style={{ color: '#045f6c' }} />
                      <span className="text-xs font-semibold" style={{ color: '#045f6c' }}>
                        Manual disponible
                      </span>
                    </div>
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

          {/* Info técnica / Sobre este manual */}
          <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: '#e3f8fb', background: '#fafffe' }}>
              <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>
                {bien.tipo === 'PEDAGOGICO' ? 'Sobre este manual' : 'Información técnica'}
              </h2>
            </div>
            <div className="p-6 space-y-4" style={{ background: '#ffffff' }}>
              {(() => { const txt = bien.tipo === 'PEDAGOGICO' ? bien.usoPedagogico : bien.descripcion; return txt?.trim() ? <p className="text-sm leading-relaxed" style={{ color: '#043941' }}>{txt}</p> : null })()}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {(bien.tipo === 'PEDAGOGICO'
                  ? [
                      { icon: MapPin,   label: 'Área de uso',        value: bien.zona.split(',')[0].trim() },
                      { icon: Package,  label: 'Copias disponibles', value: String(bien.cantidad) },
                    ]
                  : [
                      { icon: Hash,    label: 'Código entidad', value: bien.codigoEntidad },
                      { icon: Tag,     label: 'Código interno', value: bien.codigoInterno },
                      { icon: MapPin,  label: 'Zona',           value: bien.zona.split(',')[0].trim() },
                      { icon: Layers,  label: 'Tipo',           value: bien.tipo },
                    ]
                ).filter(f => f.value).map(field => (
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

          {/* Uso pedagógico — solo para no-manuales (PEDAGOGICO ya lo muestra arriba) */}
          {bien.tipo !== 'PEDAGOGICO' && (
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
          )}

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

          {/* EPP requerido */}
          {eppResult.tipo !== 'sin-epp' ? (
            <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#fecaca' }}>
              <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: '#fecaca', background: '#fff5f5' }}>
                <Shield size={15} style={{ color: '#ef4444' }} />
                <h3 className="text-sm font-extrabold" style={{ color: '#043941' }}>EPP requerido</h3>
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                  {eppResult.tipo === 'especifico' ? 'Específico' : 'Genérico'}
                </span>
              </div>
              <div className="p-4 space-y-2" style={{ background: '#ffffff' }}>
                {eppResult.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2 px-3 rounded-xl"
                    style={{ background: item.nivel === 'obligatorio' ? 'rgba(239,68,68,0.06)' : '#f0faf5' }}>
                    {item.nivel === 'obligatorio'
                      ? <AlertTriangle size={13} style={{ color: '#ef4444', flexShrink: 0 }} />
                      : <CheckCircle2 size={13} style={{ color: '#02d47e', flexShrink: 0 }} />}
                    <span className="text-xs font-semibold flex-1" style={{ color: '#043941' }}>{item.nombre}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={item.nivel === 'obligatorio'
                        ? { background: 'rgba(239,68,68,0.1)', color: '#ef4444' }
                        : { background: 'rgba(2,212,126,0.12)', color: '#02a05a' }}>
                      {item.nivel === 'obligatorio' ? 'Obligatorio' : 'Recomendado'}
                    </span>
                  </div>
                ))}
                {eppResult.noGuantes && (
                  <div className="flex items-center gap-2 mt-1 px-3 py-2 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)' }}>
                    <XCircle size={13} style={{ color: '#d97706', flexShrink: 0 }} />
                    <span className="text-xs font-semibold" style={{ color: '#92400e' }}>No usar guantes (riesgo de atrapamiento)</span>
                  </div>
                )}
                {eppResult.alertas?.map((alerta, i) => (
                  <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)' }}>
                    <AlertTriangle size={12} className="mt-0.5 shrink-0" style={{ color: '#ef4444' }} />
                    <span className="text-xs" style={{ color: '#7f1d1d' }}>{alerta}</span>
                  </div>
                ))}
                {eppResult.nota && (
                  <p className="text-[11px] pt-1 px-1" style={{ color: 'rgba(4,57,65,0.5)' }}>{eppResult.nota}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
              <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: '#e3f8fb', background: '#f0faf5' }}>
                <Shield size={15} style={{ color: '#02d47e' }} />
                <h3 className="text-sm font-extrabold" style={{ color: '#043941' }}>EPP requerido</h3>
              </div>
              <div className="p-4" style={{ background: '#ffffff' }}>
                <p className="text-xs" style={{ color: '#045f6c' }}>{eppResult.mensaje ?? 'No requiere EPP específico.'}</p>
              </div>
            </div>
          )}
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
  // Zonas reales: 'ZONA DE INNOVACIÓN' | 'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO'
  //               'DEPÓSITO / ALMACÉN / SEGURIDAD' | 'ZONA INNOVACIÓN / ALMACEN'
  // Investigación = aula/lab digital, ropa convencional, sin riesgo de maquinaria
  // Innovación/Depósito = zona de equipos y herramientas, requiere EPP
  const zona = norm(bien.zona ?? '')
  const esInvestigacion = zona.includes('investigacion') && !zona.includes('innovacion')
  const esDeposito      = zona.includes('almacen') || zona.includes('deposito')
  const esInnovacion    = zona.includes('innovacion')

  if (tipo === 'EQUIPOS') {
    if (esInnovacion) {
      return {
        tipo: 'generico',
        items: [
          { nombre: 'Lentes de policarbonato', nivel: 'obligatorio' },
          { nombre: 'Calzado de seguridad', nivel: 'obligatorio' },
        ],
        nota: 'EPP general para zona de maquinaria. Consultar manual del equipo para EPP específico.',
      }
    }
    if (esDeposito) {
      // Equipos en almacén: riesgo de golpes y caídas en manipulación/traslado
      return {
        tipo: 'generico',
        items: [
          { nombre: 'Calzado de seguridad', nivel: 'recomendado' },
          { nombre: 'Guantes de manejo', nivel: 'recomendado' },
        ],
        nota: 'EPP básico para manipulación y traslado de equipos en almacén.',
      }
    }
    if (esInvestigacion) {
      // Zona de investigación = entorno digital/administrativo, sin maquinaria de riesgo
      return {
        tipo: 'sin-epp',
        items: [],
        mensaje: 'Zona de investigación — entorno de bajo riesgo. No se requiere EPP para el uso normal de este equipo.',
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
    if (esInvestigacion) {
      // Herramientas menores en zona administrativa/digital
      return {
        tipo: 'generico',
        items: [{ nombre: 'Guantes de manejo', nivel: 'recomendado' }],
        nota: 'Precaución básica en el manejo de herramientas.',
      }
    }
    // Herramientas en Innovación o Depósito
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
