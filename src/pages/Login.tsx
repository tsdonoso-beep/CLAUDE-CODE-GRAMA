// src/pages/Login.tsx
import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { GramaLogo } from '@/components/GramaLogo'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { talleresConfig } from '@/data/talleresConfig'

type Tab = 'login' | 'register'

const INPUT_STYLE = {
  base: 'w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all',
  colors: { borderColor: '#e3f8fb', color: 'var(--grama-oscuro)', background: '#fafffe' },
  focus: '#02d47e',
  blur: '#e3f8fb',
}

function GramaInput({
  id, type = 'text', value, onChange, placeholder, required, autoComplete,
}: {
  id: string; type?: string; value: string; onChange: (v: string) => void
  placeholder?: string; required?: boolean; autoComplete?: string
}) {
  return (
    <input
      id={id} type={type} autoComplete={autoComplete}
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} required={required}
      className={INPUT_STYLE.base}
      style={INPUT_STYLE.colors}
      onFocus={e => (e.target.style.borderColor = INPUT_STYLE.focus)}
      onBlur={e => (e.target.style.borderColor = INPUT_STYLE.blur)}
    />
  )
}

// Credenciales de desarrollo — activas cuando Supabase no está configurado
const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'
const DEV_USERS: Array<{ email: string; password: string; role: 'admin' | 'docente'; taller_slug?: string; taller_slugs?: string[] }> = [
  { email: 'admin@grama.pe',           password: 'grama2025', role: 'admin' },
  { email: 'docente@grama.pe',         password: 'grama2026', role: 'docente' },
  { email: 't.donoso@inroprin.com',    password: 'grama2026', role: 'admin' },
  { email: 'camila.gr@inroprin.com',   password: 'grama2026', role: 'admin' },
  { email: 'automotriz@grama.pe',      password: 'grama2026', role: 'docente', taller_slug: 'mecanica-automotriz', taller_slugs: ['mecanica-automotriz'] },
  { email: 'generalept@grama.pe', password: 'grama2026', role: 'docente', taller_slug: 'taller-general-ept', taller_slugs: ['taller-general-ept'] },
  { email: 'dostalleres@grama.pe',     password: 'grama2026', role: 'docente', taller_slug: 'mecanica-automotriz', taller_slugs: ['mecanica-automotriz', 'electricidad'] },
]

// ── Tab: Ingresar ──────────────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { refreshDevProfile } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Bypass de desarrollo cuando Supabase no está configurado
    if (DEV_MODE) {
      const validDev = DEV_USERS.find(u => u.email === email && u.password === password)
      if (validDev) {
        sessionStorage.setItem('grama-auth', 'true')
        sessionStorage.setItem('grama-dev-email', validDev.email)
        sessionStorage.setItem('grama-dev-role', validDev.role)
        if (validDev.taller_slug) {
          sessionStorage.setItem('grama-dev-taller', validDev.taller_slug)
        } else {
          sessionStorage.removeItem('grama-dev-taller')
        }
        if (validDev.taller_slugs) {
          sessionStorage.setItem('grama-dev-tallers', JSON.stringify(validDev.taller_slugs))
        } else {
          sessionStorage.removeItem('grama-dev-tallers')
        }
        refreshDevProfile()
        onSuccess()
        return
      }
      setError('Modo dev — usa docente@grama.pe/grama2026 o t.donoso@inroprin.com/grama2026')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
      setLoading(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: '#fee2e2', color: '#ef4444' }}>
          <AlertCircle size={16} className="shrink-0" />{error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
          Correo electrónico
        </label>
        <GramaInput id="email" type="email" autoComplete="email" value={email} onChange={setEmail} placeholder="docente@colegio.pe" required />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password" type={showPass ? 'text' : 'password'} autoComplete="current-password"
            value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••" required
            className={`${INPUT_STYLE.base} pr-12`}
            style={INPUT_STYLE.colors}
            onFocus={e => (e.target.style.borderColor = INPUT_STYLE.focus)}
            onBlur={e => (e.target.style.borderColor = INPUT_STYLE.blur)}
          />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: '#045f6c' }} tabIndex={-1}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="text-right">
        <button type="button" className="text-xs font-medium" style={{ color: '#045f6c' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
          onMouseLeave={e => (e.currentTarget.style.color = '#045f6c')}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-70"
        style={{ background: 'var(--grama-menta)' }}
        onMouseEnter={e => !loading && ((e.target as HTMLButtonElement).style.background = '#00c16e')}
        onMouseLeave={e => !loading && ((e.target as HTMLButtonElement).style.background = '#02d47e')}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  )
}

// ── Tab: Regístrate ────────────────────────────────────────────────────────
function RegisterForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [ieId, setIeId] = useState<number | ''>('')
  const [tallerSlug, setTallerSlug] = useState<string>('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Talleres disponibles para la IE seleccionada
  const talleresDeIE = useMemo(() => {
    if (!ieId) return []
    const ie = INSTITUCIONES_EDUCATIVAS.find(ie => ie.id === ieId)
    return (ie?.talleres ?? [])
      .map(slug => talleresConfig.find(t => t.slug === slug))
      .filter(Boolean) as typeof talleresConfig
  }, [ieId])

  // Auto-seleccionar si solo hay 1 taller
  useEffect(() => {
    if (talleresDeIE.length === 1) setTallerSlug(talleresDeIE[0].slug)
    else setTallerSlug('')
  }, [talleresDeIE])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !ieId || !tallerSlug) {
      setError('Completa todos los campos, incluyendo el taller asignado.')
      return
    }
    setError('')
    setLoading(true)

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre_completo: nombre.trim(),
          ie_id: String(ieId),
          taller_slug: tallerSlug,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Upsert directo al perfil para garantizar que taller_slug quede guardado
    // (complementa al trigger de Supabase si existe)
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        nombre_completo: nombre.trim(),
        ie_id: Number(ieId),
        taller_slug: tallerSlug,
        role: 'docente',
      }, { onConflict: 'id' })
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="flex justify-center">
          <CheckCircle size={48} style={{ color: 'var(--grama-menta)' }} />
        </div>
        <h3 className="font-bold text-lg" style={{ color: 'var(--grama-oscuro)' }}>¡Registro exitoso!</h3>
        <p className="text-sm" style={{ color: '#045f6c' }}>
          Revisa tu correo para confirmar tu cuenta y luego inicia sesión.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: '#fee2e2', color: '#ef4444' }}>
          <AlertCircle size={16} className="shrink-0" />{error}
        </div>
      )}

      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
          Nombre completo
        </label>
        <GramaInput id="nombre" value={nombre} onChange={setNombre} placeholder="Prof. Ana García" required />
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
          Correo electrónico
        </label>
        <GramaInput id="reg-email" type="email" autoComplete="email" value={email} onChange={setEmail} placeholder="docente@colegio.pe" required />
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-sm font-semibold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
          Contraseña
        </label>
        <div className="relative">
          <input
            id="reg-password" type={showPass ? 'text' : 'password'} autoComplete="new-password"
            value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Mín. 8 caracteres" required minLength={8}
            className={`${INPUT_STYLE.base} pr-12`} style={INPUT_STYLE.colors}
            onFocus={e => (e.target.style.borderColor = INPUT_STYLE.focus)}
            onBlur={e => (e.target.style.borderColor = INPUT_STYLE.blur)}
          />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: '#045f6c' }} tabIndex={-1}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="ie" className="block text-sm font-semibold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
          Institución Educativa
        </label>
        <select
          id="ie" required value={ieId}
          onChange={e => setIeId(e.target.value === '' ? '' : Number(e.target.value))}
          className={INPUT_STYLE.base} style={{ ...INPUT_STYLE.colors, cursor: 'pointer' }}
          onFocus={e => (e.target.style.borderColor = INPUT_STYLE.focus)}
          onBlur={e => (e.target.style.borderColor = INPUT_STYLE.blur)}>
          <option value="">Selecciona tu IE</option>
          {INSTITUCIONES_EDUCATIVAS.map(ie => (
            <option key={ie.id} value={ie.id}>
              {ie.nombre} · {ie.distrito}
            </option>
          ))}
        </select>
      </div>

      {/* Taller asignado — aparece cuando se selecciona una IE */}
      {talleresDeIE.length > 0 && (
        <div>
          <label htmlFor="taller" className="block text-sm font-semibold mb-2" style={{ color: 'var(--grama-oscuro)' }}>
            Taller asignado
          </label>
          {talleresDeIE.length === 1 ? (
            <div
              className="w-full px-4 py-3 rounded-xl border-2 text-sm font-semibold flex items-center gap-2"
              style={{ borderColor: 'var(--grama-menta)', color: 'var(--grama-oscuro)', background: '#f0fdf9' }}
            >
              <CheckCircle size={15} style={{ color: 'var(--grama-menta)' }} />
              {talleresDeIE[0].nombre}
            </div>
          ) : (
            <select
              id="taller" required value={tallerSlug}
              onChange={e => setTallerSlug(e.target.value)}
              className={INPUT_STYLE.base} style={{ ...INPUT_STYLE.colors, cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = INPUT_STYLE.focus)}
              onBlur={e => (e.target.style.borderColor = INPUT_STYLE.blur)}
            >
              <option value="">Selecciona tu taller</option>
              {talleresDeIE.map(t => (
                <option key={t.slug} value={t.slug}>{t.nombre}</option>
              ))}
            </select>
          )}
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-70"
        style={{ background: 'var(--grama-menta)' }}
        onMouseEnter={e => !loading && ((e.target as HTMLButtonElement).style.background = '#00c16e')}
        onMouseLeave={e => !loading && ((e.target as HTMLButtonElement).style.background = '#02d47e')}>
        {loading ? 'Registrando...' : 'Crear cuenta'}
      </button>
    </form>
  )
}

// ── Componente principal ────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('login')

  const tabBase = 'flex-1 py-2.5 text-sm font-bold transition-all rounded-lg'

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--grama-oscuro)' }}>

      {/* ── Botón volver al landing ── */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-70"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Volver al inicio
      </button>

      {/* ── Lado izquierdo (desktop) ── */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 px-16 py-12 grama-pattern relative overflow-hidden" style={{ background: '#052e35' }}>
        <div className="absolute inset-0 pointer-events-none">
          {/* Orb ambiente */}
          <div className="absolute" style={{ width: 420, height: 420, background: 'radial-gradient(circle, rgba(2,212,126,0.10) 0%, transparent 65%)', right: -80, top: -80 }} />
          <div className="absolute" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(4,95,108,0.18) 0%, transparent 65%)', left: -60, bottom: -60 }} />
          {/* Tangrams fijos */}
          <svg viewBox="0 0 160 160" className="absolute w-64 h-64 -bottom-10 -left-10" style={{ transform: 'rotate(-15deg)' }} xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,160 80,80 0,0"     fill="#02d47e" fillOpacity={0.12} />
            <polygon points="160,0 80,80 160,160" fill="#02d47e" fillOpacity={0.08} />
            <polygon points="0,160 80,160 80,80"  fill="#02d47e" fillOpacity={0.14} />
            <rect x="70" y="30" width="40" height="40" transform="rotate(45 90 50)" fill="#02d47e" fillOpacity={0.10} />
          </svg>
          <svg viewBox="0 0 160 160" className="absolute w-48 h-48 -top-6 -right-6" style={{ transform: 'rotate(20deg)' }} xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,160 80,80 0,0"     fill="#02d47e" fillOpacity={0.10} />
            <polygon points="160,0 80,80 160,160" fill="#02d47e" fillOpacity={0.07} />
            <polygon points="80,80 120,80 120,120" fill="#02d47e" fillOpacity={0.09} />
          </svg>
          {/* Piezas flotantes */}
          <svg viewBox="0 0 80 80" className="absolute float-a" style={{ width:64, height:64, top:'12%', left:'6%', animationDuration:'15s' }}>
            <polygon points="0,80 40,0 80,80" fill="#02d47e" fillOpacity={0.22} />
          </svg>
          <svg viewBox="0 0 60 60" className="absolute float-b" style={{ width:46, height:46, top:'52%', left:'8%', animationDuration:'19s' }}>
            <polygon points="30,0 60,60 0,60" fill="#02d47e" fillOpacity={0.18} />
          </svg>
          <svg viewBox="0 0 50 50" className="absolute float-c" style={{ width:38, height:38, top:'22%', right:'14%', animationDuration:'12s' }}>
            <rect x="3" y="3" width="44" height="44" transform="rotate(15 25 25)" fill="#02d47e" fillOpacity={0.16} />
          </svg>
          <svg viewBox="0 0 60 60" className="absolute float-d" style={{ width:44, height:44, bottom:'20%', right:'10%', animationDuration:'10s' }}>
            <polygon points="30,0 60,60 0,60" fill="#02d47e" fillOpacity={0.20} />
          </svg>
          <svg viewBox="0 0 80 40" className="absolute float-a" style={{ width:58, height:30, bottom:'38%', left:'18%', animationDuration:'17s' }}>
            <polygon points="20,0 80,0 60,40 0,40" fill="#02d47e" fillOpacity={0.14} />
          </svg>
        </div>
        <div className="relative z-10 text-center max-w-sm">
          <div className="flex justify-center mb-8"><GramaLogo variant="light" size="lg" /></div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Plataforma de Capacitación Docente</h2>
          <p className="text-sm font-medium" style={{ color: 'var(--grama-menta)' }}>Talleres EPT · Programa MSE-SFT · MINEDU Perú</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[{ value: '9', label: 'Talleres EPT' }, { value: '150h', label: 'de capacitación' }, { value: '7', label: 'módulos' }].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: 'var(--grama-menta)' }}>{s.value}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lado derecho: formulario ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="lg:hidden mb-8 text-center">
          <GramaLogo variant="light" size="md" className="mx-auto mb-3" />
          <p className="text-xs font-medium" style={{ color: 'var(--grama-menta)' }}>Plataforma de Capacitación Docente</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            {/* Tabs */}
            <div className="p-2 flex gap-1" style={{ background: '#f0faf5' }}>
              <button
                onClick={() => setTab('login')}
                className={tabBase}
                style={tab === 'login'
                  ? { background: '#ffffff', color: 'var(--grama-oscuro)', boxShadow: 'var(--sh-brand-sm)' }
                  : { color: '#045f6c' }}>
                Ingresar
              </button>
              <button
                onClick={() => setTab('register')}
                className={tabBase}
                style={tab === 'register'
                  ? { background: '#ffffff', color: 'var(--grama-oscuro)', boxShadow: 'var(--sh-brand-sm)' }
                  : { color: '#045f6c' }}>
                Regístrate
              </button>
            </div>

            {/* Formulario */}
            <div className="p-8" style={{ background: '#ffffff' }}>
              {tab === 'login' ? (
                <>
                  <h1 className="text-2xl font-extrabold mb-1" style={{ color: 'var(--grama-oscuro)' }}>Iniciar sesión</h1>
                  <p className="text-sm mb-8" style={{ color: '#045f6c' }}>Ingresa tus credenciales para acceder</p>
                  <LoginForm onSuccess={() => navigate('/perfil')} />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-extrabold mb-1" style={{ color: 'var(--grama-oscuro)' }}>Crear cuenta</h1>
                  <p className="text-sm mb-6" style={{ color: '#045f6c' }}>Regístrate con los datos de tu taller</p>
                  <RegisterForm />
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 text-center text-xs" style={{ background: '#f0faf5', color: '#045f6c' }}>
              ¿Problemas para acceder? Contacta a tu coordinador UGEL
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
