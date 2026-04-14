import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mi Perfil' }

export default function PerfilPage() {
  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: 'var(--color-background)' }}>
      <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>PERFIL</p>
      <h1 className="font-extrabold mt-2" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
        Mi Perfil
      </h1>
      <p className="mt-4 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
        Configuración de perfil — En desarrollo.
      </p>
    </div>
  )
}
