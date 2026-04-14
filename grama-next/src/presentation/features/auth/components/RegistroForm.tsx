'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, CheckCircle2, AlertCircle, ArrowLeft, User, Mail, Building2, BookOpen, MessageSquare } from 'lucide-react'

const TALLERES = [
  { slug: 'mecanica-automotriz',      label: 'Mecánica Automotriz' },
  { slug: 'ebanisteria',              label: 'Ebanistería' },
  { slug: 'industria-vestido',        label: 'Industria del Vestido' },
  { slug: 'cocina-reposteria',        label: 'Cocina y Repostería' },
  { slug: 'electronica',              label: 'Electrónica' },
  { slug: 'electricidad',             label: 'Electricidad' },
  { slug: 'computacion-informatica',  label: 'Computación e Informática' },
  { slug: 'industria-alimentaria',    label: 'Industria Alimentaria' },
  { slug: 'construcciones-metalicas', label: 'Construcciones Metálicas' },
  { slug: 'taller-general-ept',       label: 'Taller General EPT' },
]

type Estado = 'idle' | 'loading' | 'success' | 'error'

export function RegistroForm() {
  const [nombre,     setNombre]     = useState('')
  const [email,      setEmail]      = useState('')
  const [institucion, setInstitucion] = useState('')
  const [taller,     setTaller]     = useState('')
  const [mensaje,    setMensaje]    = useState('')
  const [estado,     setEstado]     = useState<Estado>('idle')
  const [errorMsg,   setErrorMsg]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !email.trim()) {
      setErrorMsg('El nombre y el correo son obligatorios.')
      return
    }
    setEstado('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/registro', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nombre, email, institucion, taller, mensaje }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        setErrorMsg(json.error || 'Error al enviar. Intenta de nuevo.')
        setEstado('error')
      } else {
        setEstado('success')
      }
    } catch {
      setErrorMsg('Sin conexión. Verifica tu red e intenta de nuevo.')
      setEstado('error')
    }
  }

  // ── Estado: enviado ───────────────────────────────────────────
  if (estado === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-5 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--color-grama-claro)' }}
        >
          <CheckCircle2 size={30} style={{ color: 'var(--color-grama-verde)' }} />
        </div>
        <div>
          <h2 className="font-extrabold text-xl mb-2" style={{ color: 'var(--color-grama-oscuro)' }}>
            ¡Solicitud enviada!
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--color-muted-foreground)' }}>
            Revisaremos tu información y te contactaremos a <strong style={{ color: 'var(--color-grama-oscuro)' }}>{email}</strong> con el resultado.
          </p>
        </div>
        <Link
          href="/login"
          className="text-sm font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-grama-verde)' }}
        >
          <ArrowLeft size={14} /> Volver al inicio de sesión
        </Link>
      </div>
    )
  }

  // ── Formulario ────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error */}
      {(estado === 'error' || errorMsg) && (
        <div
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
          style={{ background: '#fee2e2', color: '#b91c1c' }}
        >
          <AlertCircle size={15} className="flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Nombre */}
      <Field label="Nombre completo *" icon={User}>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Prof. María López"
          required
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Email */}
      <Field label="Correo electrónico *" icon={Mail}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="maria@ie.edu.pe"
          required
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Institución */}
      <Field label="Institución Educativa" icon={Building2}>
        <input
          type="text"
          value={institucion}
          onChange={e => setInstitucion(e.target.value)}
          placeholder="IE Técnica N° 000, Lima"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Taller */}
      <Field label="Taller de interés" icon={BookOpen}>
        <select
          value={taller}
          onChange={e => setTaller(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
          style={inputStyle}
        >
          <option value="">Selecciona un taller...</option>
          {TALLERES.map(t => (
            <option key={t.slug} value={t.slug}>{t.label}</option>
          ))}
        </select>
      </Field>

      {/* Mensaje */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-grama-oscuro)' }}>
          ¿Por qué te interesa GRAMA LXP?
        </label>
        <div className="relative">
          <MessageSquare
            size={14}
            className="absolute left-3 top-3 flex-shrink-0"
            style={{ color: 'var(--color-muted-foreground)' }}
          />
          <textarea
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
            placeholder="Cuéntanos brevemente tu contexto y necesidades..."
            rows={3}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none resize-none"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={estado === 'loading'}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
        style={{
          background: estado === 'loading' ? 'var(--color-grama-claro)' : 'var(--color-grama-verde)',
          color:      estado === 'loading' ? 'var(--color-grama-verde)' : '#ffffff',
          cursor:     estado === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {estado === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Enviando solicitud...
          </>
        ) : (
          <>
            <Send size={14} /> Solicitar acceso
          </>
        )}
      </button>

      <p className="text-center text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
        ¿Ya tienes acceso?{' '}
        <Link href="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-grama-verde)' }}>
          Iniciar sesión
        </Link>
      </p>
    </form>
  )
}

// ── Helpers ────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  border:     '1.5px solid var(--color-border)',
  background: '#ffffff',
  color:      'var(--color-grama-oscuro)',
}

function Field({ label, icon: Icon, children }: {
  label:    string
  icon:     React.FC<{ size?: number; className?: string; style?: React.CSSProperties }>
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-grama-oscuro)' }}>
        {label}
      </label>
      <div className="relative">
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex-shrink-0"
          style={{ color: 'var(--color-muted-foreground)' }}
        />
        {children}
      </div>
    </div>
  )
}
