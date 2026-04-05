// src/components/layout/AppShell.tsx
import { Outlet, useLocation } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell() {
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: '#e3f8fb' }}>
      {/* Backdrop — mobile only */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar wrapper — overlay on mobile, inline on md+ */}
      <div
        className={[
          'fixed inset-y-0 left-0 z-50 md:static md:z-auto',
          'transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
      >
        <Sidebar
          collapsed={collapsed}
          onCollapse={() => setCollapsed(c => !c)}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setMobileOpen(o => !o)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto" style={{ background: '#f0faf5' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
