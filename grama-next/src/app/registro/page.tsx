import type { Metadata } from 'next'
import { GramaLogo } from '@/presentation/shared/ui/GramaLogo'
import { RegistroForm } from '@/presentation/features/auth/components/RegistroForm'

export const metadata: Metadata = { title: 'Solicitar Acceso — GRAMA LXP' }

export default function RegistroPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <GramaLogo size="md" />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <p className="overline-label mb-1" style={{ color: 'var(--color-grama-verde)' }}>
            ACCESO GRAMA LXP
          </p>
          <h1 className="font-extrabold text-2xl" style={{ color: 'var(--color-grama-oscuro)' }}>
            Solicitar acceso
          </h1>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
            Completa el formulario y validaremos tu ingreso a la plataforma.
          </p>
        </div>

        <RegistroForm />
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-center" style={{ color: 'var(--color-muted-foreground)' }}>
        GRAMA LXP · Plataforma de formación docente EPT · MINEDU-TSF
      </p>
    </div>
  )
}
