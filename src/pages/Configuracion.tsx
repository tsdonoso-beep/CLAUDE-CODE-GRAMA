// src/pages/Configuracion.tsx
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

type EditingField = 'nombre' | null

export default function Configuracion() {
  const { profile, user, signOut } = useAuth()

  const ie = INSTITUCIONES_EDUCATIVAS.find(i => String(i.id) === String(profile?.ie_id))

  const displayName  = profile?.nombre_completo || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Docente'
  const displayEmail = profile?.email ?? user?.email ?? ''

  const [editing, setEditing]       = useState<EditingField>(null)
  const [nombreDraft, setNombreDraft] = useState(displayName)
  const [saving, setSaving]          = useState(false)

  const codigoDocente = profile?.id
    ? `DOC-${new Date().getFullYear()}-${profile.id.replace(/-/g, '').slice(0, 4).toUpperCase()}`
    : '—'

  async function saveNombre() {
    if (!profile?.id) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ nombre_completo: nombreDraft } as never)
      .eq('id', profile.id)
    setSaving(false)
    if (error) {
      toast.error('No se pudo guardar el cambio')
    } else {
      toast.success('Nombre actualizado')
      setEditing(null)
    }
  }

  function cancelNombre() {
    setNombreDraft(displayName)
    setEditing(null)
  }

  /* ── estilos inline reutilizables ── */
  const card: React.CSSProperties = {
    background: '#fff',
    borderRadius: 18,
    border: '1px solid rgba(4,57,65,0.08)',
    boxShadow: '0 2px 12px rgba(4,57,65,0.05)',
    padding: '22px 28px',
    marginBottom: 14,
  }

  const row: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '13px 0',
    borderBottom: '1px solid rgba(4,57,65,0.06)',
    gap: 16,
    minHeight: 48,
  }

  const rowLast: React.CSSProperties = { ...row, borderBottom: 'none' }

  const label: React.CSSProperties = {
    fontSize: 13,
    color: 'rgba(4,57,65,0.45)',
    fontWeight: 600,
    minWidth: 140,
    flexShrink: 0,
  }

  const value: React.CSSProperties = {
    fontSize: 14,
    color: 'var(--grama-oscuro)',
    fontWeight: 600,
    textAlign: 'right',
  }

  return (
    <div style={{ maxWidth: 580, fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Datos personales ── */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--grama-oscuro)', margin: '0 0 2px' }}>
          Datos personales
        </h2>
        <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 14px' }}>
          Información visible en tu perfil docente
        </p>

        {/* Nombre completo */}
        <div style={row}>
          <span style={label}>Nombre completo</span>
          {editing === 'nombre' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
              <input
                autoFocus
                value={nombreDraft}
                onChange={e => setNombreDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') saveNombre(); if (e.key === 'Escape') cancelNombre() }}
                style={{
                  border: '1.5px solid var(--grama-menta)',
                  borderRadius: 10,
                  padding: '6px 12px',
                  fontSize: 13,
                  fontWeight: 600,
                  outline: 'none',
                  color: 'var(--grama-oscuro)',
                  background: '#f8fffe',
                  width: 210,
                  fontFamily: 'inherit',
                }}
              />
              <button
                disabled={saving}
                onClick={saveNombre}
                style={{
                  background: 'var(--grama-menta)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#043941',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.6 : 1,
                  fontFamily: 'inherit',
                }}
              >
                {saving ? '…' : 'Guardar'}
              </button>
              <button
                onClick={cancelNombre}
                style={{
                  background: 'rgba(4,57,65,0.06)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 10px',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'rgba(4,57,65,0.45)',
                  fontFamily: 'inherit',
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={value}>{displayName}</span>
              <button
                onClick={() => { setNombreDraft(displayName); setEditing('nombre') }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--grama-menta)',
                  padding: 0,
                  fontFamily: 'inherit',
                }}
              >
                editar
              </button>
            </div>
          )}
        </div>

        {/* Correo electrónico */}
        <div style={row}>
          <span style={label}>Correo electrónico</span>
          <span style={{ ...value, color: '#94a3b8' }}>{displayEmail}</span>
        </div>

        {/* Código docente */}
        <div style={ie ? row : rowLast}>
          <span style={label}>Código docente</span>
          <span style={{ ...value, letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
            {codigoDocente}
          </span>
        </div>

        {/* UGEL */}
        {ie && (
          <div style={row}>
            <span style={label}>UGEL</span>
            <span style={{ ...value, color: 'var(--grama-menta)' }}>
              {ie.provincia}
            </span>
          </div>
        )}

        {/* I.E. */}
        {ie && (
          <div style={rowLast}>
            <span style={label}>I.E.</span>
            <span style={{ ...value, maxWidth: 280, textAlign: 'right', lineHeight: 1.3 }}>
              I.E. {ie.nombre}
            </span>
          </div>
        )}

        {!ie && (
          <div style={rowLast}>
            <span style={label}>I.E.</span>
            <span style={{ ...value, color: '#94a3b8' }}>Sin IE asignada</span>
          </div>
        )}
      </div>

      {/* ── Cerrar sesión ── */}
      <div style={{
        background: '#fff',
        borderRadius: 18,
        border: '1px solid rgba(239,68,68,0.12)',
        boxShadow: '0 2px 12px rgba(4,57,65,0.05)',
        overflow: 'hidden',
      }}>
        <button
          onClick={() => signOut()}
          style={{
            width: '100%',
            padding: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 700,
            color: '#ef4444',
            borderRadius: 18,
            transition: 'background .18s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
