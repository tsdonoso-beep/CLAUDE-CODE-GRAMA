import { LoginForm } from '@/presentation/features/auth/components/LoginForm'
import { GramaLogo } from '@/presentation/shared/ui/GramaLogo'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ingresar' }

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 hero-gradient grama-pattern"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <GramaLogo size="lg" variant="light" />
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-xl" style={{ background: '#ffffff' }}>
          <h1 className="font-extrabold text-center mb-1" style={{ fontSize: 'var(--text-h2)', color: 'var(--color-grama-oscuro)' }}>
            Bienvenido de vuelta
          </h1>
          <p className="text-center text-sm mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
            Ingresa con tu cuenta GRAMA
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
