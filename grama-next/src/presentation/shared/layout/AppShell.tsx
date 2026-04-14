'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar }  from './TopBar'
import type { Taller } from '@/domain/taller/entities/Taller'

interface AppShellProps {
  taller:   Taller
  children: React.ReactNode
}

export function AppShell({ taller, children }: AppShellProps) {
  const [collapsed,   setCollapsed]   = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-background)' }}>
      {/* Sidebar desktop */}
      <Sidebar
        taller={taller}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopBar
          taller={taller}
          onMenuClick={() => setMobileOpen(o => !o)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
