// src/components/layout/AppShell.tsx
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { Box, X, Maximize2, Minimize2 } from 'lucide-react'

function SimuladorModal({ onClose }: { onClose: () => void }) {
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="flex flex-col overflow-hidden transition-all duration-300"
        style={{
          background: '#0a2a2f',
          borderRadius: fullscreen ? 0 : 20,
          border: '1.5px solid rgba(2,212,126,0.25)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          width:  fullscreen ? '100vw' : 'min(92vw, 1200px)',
          height: fullscreen ? '100vh' : 'min(88vh, 760px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 shrink-0"
          style={{ borderBottom: '1px solid rgba(2,212,126,0.15)', background: 'rgba(2,212,126,0.05)' }}>
          <div className="h-8 w-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(2,212,126,0.15)' }}>
            <Box size={15} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white leading-none">Simulador de Ambiente</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(2,212,126,0.7)' }}>
              Tour 3D · Taller de Mecánica Automotriz
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="h-8 w-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(2,212,126,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              title={fullscreen ? 'Reducir' : 'Pantalla completa'}
            >
              {fullscreen
                ? <Minimize2 size={13} style={{ color: 'rgba(255,255,255,0.6)' }} />
                : <Maximize2 size={13} style={{ color: 'rgba(255,255,255,0.6)' }} />}
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              title="Cerrar"
            >
              <X size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
            </button>
          </div>
        </div>

        {/* iframe */}
        <div className="flex-1 relative overflow-hidden">
          <iframe
            src="/tour-3d-automotriz-v2.html"
            title="Simulador de Ambiente — Mecánica Automotriz"
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
            allow="accelerometer; gyroscope; fullscreen"
          />
        </div>
      </div>
    </div>
  )
}

export function AppShell() {
  const { slug } = useParams<{ slug: string }>()
  const [simAbierto, setSimAbierto] = useState(false)
  const esAutomotriz = slug === 'mecanica-automotriz'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#e3f8fb' }}>
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto" style={{ background: '#f0faf5' }}>
          <Outlet />
        </main>
      </div>

      {/* ── Botón flotante simulador (solo automotriz) ── */}
      {esAutomotriz && !simAbierto && (
        <button
          onClick={() => setSimAbierto(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-sm shadow-2xl transition-all duration-200 group"
          style={{
            background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)',
            border: '1.5px solid rgba(2,212,126,0.4)',
            color: '#ffffff',
            boxShadow: '0 8px 32px rgba(4,57,65,0.5), 0 0 0 0 rgba(2,212,126,0.4)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(4,57,65,0.6), 0 0 0 4px rgba(2,212,126,0.2)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(4,57,65,0.5), 0 0 0 0 rgba(2,212,126,0.4)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          {/* Pulso animado */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: '#02d47e' }} />
            <span className="relative inline-flex rounded-full h-3 w-3"
              style={{ background: '#02d47e' }} />
          </span>
          <Box size={16} style={{ color: '#02d47e' }} />
          <span>Simulador 3D</span>
        </button>
      )}

      {/* ── Modal simulador ── */}
      {simAbierto && <SimuladorModal onClose={() => setSimAbierto(false)} />}
    </div>
  )
}
