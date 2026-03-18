// src/components/layout/AppShell.tsx
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#e3f8fb' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto" style={{ background: '#f0faf5' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
