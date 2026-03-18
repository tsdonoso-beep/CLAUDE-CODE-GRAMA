// src/pages/BienDetalle.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, FileText, Video, Shield, Package,
  Tag, Hash, MapPin, Layers
} from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'

type TabId = 'manual-uso' | 'manual-mant' | 'manual-ped' | 'video'

export default function BienDetalle() {
  const { id } = useParams<{ id: string }>()
  const { taller, bienes, slug } = useTaller()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabId>('manual-uso')

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
    { id: 'manual-uso', label: 'Manual de uso', icon: FileText },
    { id: 'manual-mant', label: 'Mantenimiento', icon: FileText },
    { id: 'manual-ped', label: 'Manual pedagógico', icon: FileText },
    { id: 'video', label: 'Video operatividad', icon: Video },
  ]

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

          {/* Recursos (tabs) */}
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
              ) : (
                <>
                  <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: '#e3f8fb' }}
                  >
                    <FileText size={28} style={{ color: '#045f6c' }} />
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#043941' }}>
                    {tabs.find(t => t.id === activeTab)?.label}
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

          {/* EPP requerido */}
          <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#fecaca' }}>
            <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: '#fecaca', background: '#fff5f5' }}>
              <Shield size={16} style={{ color: '#ef4444' }} />
              <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>
                EPP requerido para este equipo
              </h2>
            </div>
            <div className="p-6" style={{ background: '#ffffff' }}>
              <div className="flex flex-wrap gap-2">
                {getEPPForTipo(bien.tipo).map(epp => (
                  <span
                    key={epp}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: '#fee2e2', color: '#ef4444' }}
                  >
                    {epp}
                  </span>
                ))}
              </div>
            </div>
          </section>
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

          {/* Bienes relacionados */}
          {bienesRelacionados.length > 0 && (
            <div className="p-5 rounded-2xl border-2" style={{ borderColor: '#e3f8fb', background: '#ffffff' }}>
              <h3 className="text-sm font-extrabold mb-4" style={{ color: '#043941' }}>
                Bienes relacionados
              </h3>
              <div className="space-y-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {bienesRelacionados.map((b: any) => (
                  <button
                    key={b.n}
                    onClick={() => navigate(`/taller/${slug}/repositorio/bien/${b.n}`)}
                    className="w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm"
                    style={{ borderColor: '#e3f8fb' }}
                  >
                    <Package size={14} style={{ color: '#02d47e' }} />
                    <span className="text-xs font-semibold line-clamp-2" style={{ color: '#043941' }}>
                      {b.nombre}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getEPPForTipo(tipo: string): string[] {
  const base = ['Lentes de policarbonato', 'Calzado de seguridad']
  if (tipo === 'EQUIPOS') {
    return [...base, 'Orejeras', 'Guardapolvo', 'Mascarilla antipolvo']
  }
  return [...base, 'Guantes apropiados']
}
