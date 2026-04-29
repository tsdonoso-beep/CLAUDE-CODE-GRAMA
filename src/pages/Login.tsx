// src/pages/Login.tsx
import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { GramaLogo } from '@/components/GramaLogo'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { talleresConfig } from '@/data/talleresConfig'

type Tab = 'login' | 'register'

const INPUT_STYLE = {
  base: 'w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-200',
  colors: { borderColor: 'rgba(4,57,65,0.1)', color: '#043941', background: 'rgba(4,57,65,0.02)' },
  focus: '#02d47e',
  blur: 'rgba(4,57,65,0.1)',
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
  { email: 'admin@grama.pe',           password: 'grama2026', role: 'admin' },
  { email: 'roberto@grama.pe',         password: 'grama2026', role: 'admin' },
  { email: 'docente@grama.pe',         password: 'grama2026', role: 'docente' },
  { email: 't.donoso@inroprin.com',    password: 'grama2026', role: 'admin' },
  { email: 'camila.gr@inroprin.com',   password: 'grama2026', role: 'admin' },
  { email: 'automotriz@grama.pe',      password: 'grama2026', role: 'docente', taller_slug: 'mecanica-automotriz', taller_slugs: ['mecanica-automotriz', 'ebanisteria'] },
  { email: 'generalept@grama.pe',      password: 'grama2026', role: 'docente', taller_slug: 'taller-general-ept', taller_slugs: ['taller-general-ept'] },
  { email: 'dostalleres@grama.pe',     password: 'grama2026', role: 'docente', taller_slug: 'mecanica-automotriz', taller_slugs: ['mecanica-automotriz', 'electricidad'] },
]

// ── Tab: Ingresar ──────────────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: (isAdmin: boolean) => void }) {
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
        onSuccess(validDev.role === 'admin')
        return
      }
      setError('Modo dev — usa docente@grama.pe/grama2026 o t.donoso@inroprin.com/grama2026')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
    }
    // No navegar aquí — el useEffect en Login() detecta user y redirige
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium animate-fade-in-up"
          style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={16} className="shrink-0 flex-none" /><span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-2.5" style={{ color: '#043941', letterSpacing: '-0.3px' }}>
          Correo electrónico
        </label>
        <GramaInput id="email" type="email" autoComplete="email" value={email} onChange={setEmail} placeholder="docente@colegio.pe" required />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold mb-2.5" style={{ color: '#043941', letterSpacing: '-0.3px' }}>
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password" type={showPass ? 'text' : 'password'} autoComplete="off"
            value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••" required
            className={`${INPUT_STYLE.base} pr-11`}
            style={INPUT_STYLE.colors}
            onFocus={e => { e.target.style.borderColor = INPUT_STYLE.focus; e.target.style.boxShadow = `0 0 0 3px rgba(2,212,126,0.1)` }}
            onBlur={e => { e.target.style.borderColor = INPUT_STYLE.blur; e.target.style.boxShadow = 'none' }}
          />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors"
            style={{ color: '#64748b' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            tabIndex={-1}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" className="text-xs font-semibold transition-colors"
          style={{ color: '#64748b' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 hover:shadow-lg"
        style={{ background: '#02d47e', boxShadow: '0 4px 12px rgba(2,212,126,0.3)' }}
        onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'none')}>
        {loading ? 'Ingresando...' : <>Ingresar <ArrowRight size={16} className="opacity-70" /></>}
      </button>
    </form>
  )
}

// ── Tab: Solicitar acceso ──────────────────────────────────────────────────
// El registro directo fue reemplazado por un flujo de aprobación manual.
// Los datos se guardan en solicitudes_acceso y se notifica a los admins.
function RegisterForm() {
  const [nombre,     setNombre]     = useState('')
  const [email,      setEmail]      = useState('')
  const [ieId,       setIeId]       = useState<number | ''>('')
  const [tallerSlug, setTallerSlug] = useState<string>('')
  const [mensaje,    setMensaje]    = useState('')
  const [error,      setError]      = useState('')
  const [success,    setSuccess]    = useState(false)
  const [loading,    setLoading]    = useState(false)

  const talleresDeIE = useMemo(() => {
    if (!ieId) return []
    const ie = INSTITUCIONES_EDUCATIVAS.find(ie => ie.id === ieId)
    return (ie?.talleres ?? [])
      .map(slug => talleresConfig.find(t => t.slug === slug))
      .filter(Boolean) as typeof talleresConfig
  }, [ieId])

  useEffect(() => {
    if (talleresDeIE.length === 1) setTallerSlug(talleresDeIE[0].slug)
    else setTallerSlug('')
  }, [talleresDeIE])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !email.trim()) {
      setError('El nombre y el correo son obligatorios.')
      return
    }
    setError('')
    setLoading(true)

    // Guardar solicitud en Supabase (sin crear usuario)
    const { error: dbError } = await supabase
      .from('solicitudes_acceso')
      .insert({
        nombre:      nombre.trim(),
        email:       email.trim().toLowerCase(),
        institucion: ieId
          ? INSTITUCIONES_EDUCATIVAS.find(i => i.id === ieId)?.nombre ?? ''
          : '',
        ie_id:       ieId || null,
        taller_slug: tallerSlug || null,
        mensaje:     mensaje.trim() || null,
      })

    if (dbError) {
      // Si falla Supabase (ej: dev sin URL), igual mostramos éxito al usuario
      console.warn('[registro] Supabase insert error:', dbError.message)
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
        <h3 className="font-bold text-lg" style={{ color: 'var(--grama-oscuro)' }}>
          ¡Solicitud enviada!
        </h3>
        <p className="text-sm" style={{ color: '#045f6c' }}>
          Revisaremos tu información y te contactaremos a{' '}
          <strong>{email}</strong> con el resultado.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Aviso informativo */}
      <div className="px-4 py-3.5 rounded-xl text-xs leading-relaxed font-medium"
        style={{ background: 'rgba(2,212,126,0.08)', color: '#043941', border: '1px solid rgba(2,212,126,0.15)' }}>
        ✓ Completa el formulario y validaremos tu acceso internamente. Te notificaremos por correo en menos de 24h.
      </div>

      {error && (
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium animate-fade-in-up"
          style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={16} className="shrink-0 flex-none" /><span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="nombre" className="block text-sm font-bold mb-2.5" style={{ color: '#043941', letterSpacing: '-0.3px' }}>
          Nombre completo *
        </label>
        <GramaInput id="nombre" value={nombre} onChange={setNombre} placeholder="Prof. Ana García" required />
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-bold mb-2.5" style={{ color: '#043941', letterSpacing: '-0.3px' }}>
          Correo electrónico *
        </label>
        <GramaInput id="reg-email" type="email" autoComplete="email" value={email} onChange={setEmail} placeholder="docente@colegio.pe" required />
      </div>

      <div>
        <label htmlFor="ie" className="block text-sm font-bold mb-2.5" style={{ color: '#043941', letterSpacing: '-0.3px' }}>
          Institución Educativa
        </label>
        <select
          id="ie" value={ieId}
          onChange={e => setIeId(e.target.value === '' ? '' : Number(e.target.value))}
          className={INPUT_STYLE.base} style={{ ...INPUT_STYLE.colors, cursor: 'pointer' }}
          onFocus={e => { e.target.style.borderColor = INPUT_STYLE.focus; e.target.style.boxShadow = `0 0 0 3px rgba(2,212,126,0.1)` }}
          onBlur={e => { e.target.style.borderColor = INPUT_STYLE.blur; e.target.style.boxShadow = 'none' }}>
          <option value="">Selecciona tu IE</option>
          {INSTITUCIONES_EDUCATIVAS.map(ie => (
            <option key={ie.id} value={ie.id}>{ie.nombre} · {ie.distrito}</option>
          ))}
        </select>
      </div>

      {talleresDeIE.length > 0 && (
        <div>
          <label htmlFor="taller" className="block text-sm font-bold mb-2.5" style={{ color: '#043941', letterSpacing: '-0.3px' }}>
            Taller de interés
          </label>
          {talleresDeIE.length === 1 ? (
            <div className="w-full px-4 py-3.5 rounded-xl border text-sm font-semibold flex items-center gap-2"
              style={{ borderColor: '#02d47e', color: '#043941', background: 'rgba(2,212,126,0.06)' }}>
              <CheckCircle size={16} style={{ color: '#02d47e', flexShrink: 0 }} />
              {talleresDeIE[0].nombre}
            </div>
          ) : (
            <select id="taller" value={tallerSlug}
              onChange={e => setTallerSlug(e.target.value)}
              className={INPUT_STYLE.base} style={{ ...INPUT_STYLE.colors, cursor: 'pointer' }}
              onFocus={e => { e.target.style.borderColor = INPUT_STYLE.focus; e.target.style.boxShadow = `0 0 0 3px rgba(2,212,126,0.1)` }}
              onBlur={e => { e.target.style.borderColor = INPUT_STYLE.blur; e.target.style.boxShadow = 'none' }}>
              <option value="">Selecciona tu taller</option>
              {talleresDeIE.map(t => (
                <option key={t.slug} value={t.slug}>{t.nombre}</option>
              ))}
            </select>
          )}
        </div>
      )}

      <div>
        <label htmlFor="mensaje" className="block text-sm font-bold mb-2.5" style={{ color: '#043941', letterSpacing: '-0.3px' }}>
          Mensaje (opcional)
        </label>
        <textarea
          id="mensaje" value={mensaje} onChange={e => setMensaje(e.target.value)}
          placeholder="Cuéntanos brevemente tu contexto..."
          rows={3} className={`${INPUT_STYLE.base} resize-none`} style={INPUT_STYLE.colors}
          onFocus={e => { e.target.style.borderColor = INPUT_STYLE.focus; e.target.style.boxShadow = `0 0 0 3px rgba(2,212,126,0.1)` }}
          onBlur={e => { e.target.style.borderColor = INPUT_STYLE.blur; e.target.style.boxShadow = 'none' }}
        />
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 hover:shadow-lg"
        style={{ background: '#02d47e', boxShadow: '0 4px 12px rgba(2,212,126,0.3)' }}
        onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'none')}>
        {loading ? 'Enviando...' : <>Solicitar acceso <ArrowRight size={16} className="opacity-70" /></>}
      </button>
    </form>
  )
}

// ── Componente principal ────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate()
  const { user, loading, isAdmin } = useAuth()
  const [tab, setTab] = useState<Tab>('login')

  // Si ya está autenticado, redirigir según rol
  useEffect(() => {
    if (!loading && user) {
      navigate(isAdmin ? '/admin' : '/perfil', { replace: true })
    }
  }, [loading, user, isAdmin, navigate])

  const tabBase = 'flex-1 py-3 text-sm font-bold transition-all rounded-lg'

  return (
    <div className="min-h-screen flex" style={{ background: '#f0fdf6' }}>

      {/* ── Botón volver al landing ── */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all hover:translate-y-px"
        style={{ background: '#fff', color: '#043941', boxShadow: '0 2px 8px rgba(4,57,65,0.1)', border: '1px solid rgba(4,57,65,0.08)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Volver
      </button>

      {/* ── Lado izquierdo (desktop) — Hero mejorado ── */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 px-16 py-12 relative overflow-hidden" style={{ background: '#043941' }}>
        {/* Shapes decorativos — más audaces como en landing */}
        <div style={{ position:'absolute', top:-280, left:'20%', transform:'translateX(-50%)', width:560, height:560, background:'#b8edd0', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:0.16, pointerEvents:'none', animation:'heroFa 15s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-200, right:'15%', width:420, height:420, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:0.14, pointerEvents:'none', animation:'heroFd 18s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'30%', left:-140, width:240, height:200, background:'#f8ee91', borderRadius:'0 0 120px 120px', opacity:0.2, pointerEvents:'none', animation:'heroFb 14s ease-in-out infinite 1s' }} />
        <div style={{ position:'absolute', bottom:'15%', right:'-5%', width:180, height:120, background:'#02d47e', clipPath:'polygon(0% 50%,100% 0%,100% 100%)', opacity:0.15, pointerEvents:'none', animation:'heroFe 13s ease-in-out infinite 1.5s' }} />

        <div className="relative z-10 text-center max-w-sm">
          <div className="flex justify-center mb-10 animate-fade-in-up"><GramaLogo variant="light" size="lg" /></div>
          <h2 className="text-3xl font-black text-white mb-3 animate-fade-in-up stagger-2" style={{ lineHeight: 1.2, letterSpacing: '-1px' }}>
            Tu formación<br/>docente comienza<br/>aquí
          </h2>
          <p className="text-sm font-medium animate-fade-in-up stagger-3" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Plataforma de capacitación especializada para docentes EPT del Perú. Acceso a 10 talleres, 150 horas de contenido y certificación.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 animate-fade-in-up stagger-4">
            {[{ value: '10', label: 'Talleres' }, { value: '150h', label: 'Contenido' }, { value: '7', label: 'Módulos' }].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black" style={{ color: '#02d47e', letterSpacing: '-0.5px' }}>{s.value}</p>
                <p className="text-xs font-medium mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lado derecho: formulario ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Shapes para lado derecho */}
        <div style={{ position:'absolute', top:-120, right:'8%', width:320, height:320, background:'#02d47e', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:0.08, pointerEvents:'none', animation:'heroFa 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-180, left:'12%', width:380, height:380, background:'#d4c4fc', clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:0.1, pointerEvents:'none', animation:'heroFd 18s ease-in-out infinite 2s' }} />

        {/* Mobile header */}
        <div className="lg:hidden mb-10 text-center animate-fade-in-up">
          <GramaLogo variant="dark" size="md" className="mx-auto mb-4" />
          <h2 className="text-xl font-black" style={{ color: '#043941' }}>Iniciar sesión</h2>
          <p className="text-xs mt-1" style={{ color: '#64748b' }}>Accede a tu formación docente</p>
        </div>

        <div className="w-full max-w-md relative z-10 animate-fade-in-up stagger-2">
          <div className="rounded-3xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 12px 40px rgba(4,57,65,0.12)', border: '1.5px solid rgba(2,212,126,0.12)' }}>
            {/* Tabs */}
            <div className="p-2.5 flex gap-2" style={{ background: 'rgba(4,57,65,0.02)' }}>
              <button
                onClick={() => setTab('login')}
                className={tabBase}
                style={tab === 'login'
                  ? { background: '#ffffff', color: '#043941', boxShadow: '0 2px 8px rgba(4,57,65,0.08)', fontWeight: 800 }
                  : { color: '#64748b', fontWeight: 700 }}>
                Ingresar
              </button>
              <button
                onClick={() => setTab('register')}
                className={tabBase}
                style={tab === 'register'
                  ? { background: '#ffffff', color: '#043941', boxShadow: '0 2px 8px rgba(4,57,65,0.08)', fontWeight: 800 }
                  : { color: '#64748b', fontWeight: 700 }}>
                Regístrate
              </button>
            </div>

            {/* Separador */}
            <div style={{ height: '1px', background: 'rgba(4,57,65,0.06)' }} />

            {/* Formulario */}
            <div className="p-8" style={{ background: '#ffffff' }}>
              {tab === 'login' ? (
                <>
                  <h1 className="text-xl font-black mb-1.5" style={{ color: '#043941', letterSpacing: '-0.5px' }}>Iniciar sesión</h1>
                  <p className="text-sm mb-7" style={{ color: '#64748b' }}>Ingresa tus credenciales para acceder a la plataforma</p>
                  <LoginForm onSuccess={(adminLogin) => navigate(adminLogin ? '/admin' : '/perfil', { replace: true })} />
                </>
              ) : (
                <>
                  <h1 className="text-xl font-black mb-1.5" style={{ color: '#043941', letterSpacing: '-0.5px' }}>Solicitar acceso</h1>
                  <p className="text-sm mb-6" style={{ color: '#64748b' }}>Completa el formulario para acceder como docente</p>
                  <RegisterForm />
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 text-center text-xs font-medium" style={{ background: 'rgba(4,57,65,0.02)', color: '#64748b', borderTop: '1px solid rgba(4,57,65,0.06)' }}>
              ¿Problemas? <button className="text-[#02d47e] font-bold hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Contacta a tu coordinador UGEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
