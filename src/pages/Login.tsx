// src/pages/Login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { GramaLogo } from '@/components/GramaLogo'

// Credenciales hardcodeadas — solo UI, sin auth real
const VALID_EMAIL = 'docente@grama.pe'
const VALID_PASSWORD = 'grama2024'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate small delay
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        sessionStorage.setItem('grama-auth', 'true')
        navigate('/')
      } else {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#043941' }}>
      {/* ── Lado izquierdo (desktop) ── */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-1/2 px-16 py-12 grama-pattern relative"
        style={{ background: '#052e35' }}
      >
        {/* Decoración geométrica Tangram */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -bottom-16 -left-16 h-64 w-64 rotate-45"
            style={{ background: 'rgba(2,212,126,0.06)', borderRadius: '12px' }}
          />
          <div
            className="absolute top-20 -right-8 h-40 w-40 rotate-12"
            style={{ background: 'rgba(2,212,126,0.05)', borderRadius: '8px' }}
          />
          <div
            className="absolute top-1/2 left-1/4 h-24 w-24 -rotate-45"
            style={{
              background: 'rgba(2,212,126,0.04)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-sm">
          <div className="flex justify-center mb-8">
            <GramaLogo variant="light" size="lg" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">
            Plataforma de Capacitación Docente
          </h2>
          <p className="text-sm font-medium" style={{ color: '#02d47e' }}>
            Talleres EPT · Programa MSE-SFT · MINEDU Perú
          </p>

          {/* Stats decorativas */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: '9', label: 'Talleres EPT' },
              { value: '150h', label: 'de capacitación' },
              { value: '7', label: 'módulos LXP' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: '#02d47e' }}>
                  {s.value}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lado derecho: formulario ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile: logo */}
        <div className="lg:hidden mb-8 text-center">
          <GramaLogo variant="light" size="md" className="mx-auto mb-3" />
          <p className="text-xs font-medium" style={{ color: '#02d47e' }}>
            Plataforma de Capacitación Docente
          </p>
        </div>

        <div className="w-full max-w-sm">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-8" style={{ background: '#ffffff' }}>
              <h1
                className="text-2xl font-extrabold mb-1"
                style={{ color: '#043941' }}
              >
                Iniciar sesión
              </h1>
              <p className="text-sm mb-8" style={{ color: '#045f6c' }}>
                Ingresa tus credenciales para acceder a la plataforma
              </p>

              {/* Error alert */}
              {error && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
                  style={{ background: '#fee2e2', color: '#ef4444' }}
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#043941' }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="docente@grama.pe"
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all"
                    style={{
                      borderColor: '#e3f8fb',
                      color: '#043941',
                      background: '#fafffe',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#02d47e')}
                    onBlur={e => (e.target.style.borderColor = '#e3f8fb')}
                    required
                  />
                </div>

                {/* Contraseña */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#043941' }}
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 text-sm outline-none transition-all"
                      style={{
                        borderColor: '#e3f8fb',
                        color: '#043941',
                        background: '#fafffe',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#02d47e')}
                      onBlur={e => (e.target.style.borderColor = '#e3f8fb')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors"
                      style={{ color: '#045f6c' }}
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Olvidé contraseña (solo visual) */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-xs font-medium transition-colors"
                    style={{ color: '#045f6c' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#045f6c')}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Botón ingresar */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-70"
                  style={{ background: '#02d47e' }}
                  onMouseEnter={e => !loading && ((e.target as HTMLButtonElement).style.background = '#00c16e')}
                  onMouseLeave={e => !loading && ((e.target as HTMLButtonElement).style.background = '#02d47e')}
                >
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
              </form>
            </div>

            {/* Footer del card */}
            <div
              className="px-8 py-4 text-center text-xs"
              style={{ background: '#f0faf5', color: '#045f6c' }}
            >
              ¿Problemas para acceder? Contacta a tu coordinador UGEL
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
