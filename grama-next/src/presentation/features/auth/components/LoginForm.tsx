'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/presentation/providers/AuthProvider'

export function LoginForm() {
  const { signIn } = useAuth()
  const router = useRouter()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = await signIn(email.trim().toLowerCase(), password)
    setLoading(false)

    if (err) { setError(err); return }
    router.push('/hub')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-grama-oscuro)' }}>
          Correo electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="tu@grama.pe"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{
            border:      '1.5px solid var(--color-border)',
            background:  'var(--color-background)',
            color:       'var(--color-grama-oscuro)',
          }}
          onFocus={e  => (e.target.style.borderColor = 'var(--color-grama-verde)')}
          onBlur={e   => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-grama-oscuro)' }}>
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
            style={{
              border:     '1.5px solid var(--color-border)',
              background: 'var(--color-background)',
              color:      'var(--color-grama-oscuro)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-grama-verde)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
          />
          <button
            type="button"
            onClick={() => setShowPass(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-center py-2 px-3 rounded-lg" style={{ background: '#fee2e2', color: '#dc2626' }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-glow w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
      >
        {loading && <Loader2 size={15} className="animate-spin" />}
        {loading ? 'Ingresando...' : 'Ingresar →'}
      </button>
    </form>
  )
}
