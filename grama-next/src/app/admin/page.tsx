import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Panel de Admin' }

export default function AdminPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 hero-gradient grama-pattern">
      <p className="overline-label" style={{ color: 'var(--color-grama-mint)' }}>ADMINISTRACIÓN</p>
      <h1 className="font-extrabold mt-2" style={{ fontSize: 'var(--text-h1)', color: '#ffffff' }}>
        Panel de Admin
      </h1>
      <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Dashboard administrativo — En desarrollo.
      </p>
    </div>
  )
}
