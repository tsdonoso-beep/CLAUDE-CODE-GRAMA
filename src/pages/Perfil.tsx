// src/pages/Perfil.tsx
import { useNavigate } from 'react-router-dom'
import { Mail, MapPin, Building2, BookOpen, Package, Clock, ChevronRight, Shield } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { talleresConfig } from '@/data/talleresConfig'
import { getTotalBienesByTaller } from '@/data/bienesData'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { GramaLogo } from '@/components/GramaLogo'

const TOTAL_HORAS = 150
const TOTAL_MODULOS = 7

// ── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
}

export default function Perfil() {
  const navigate   = useNavigate()
  const { profile, user, isAdmin, signOut } = useAuth()

  const displayName  = profile?.nombre_completo || user?.email?.split('@')[0] || 'Docente'
  const displayEmail = profile?.email ?? user?.email ?? ''
  const tallerSlug   = profile?.taller_slug ?? null

  const ie      = INSTITUCIONES_EDUCATIVAS.find(i => i.id === profile?.ie_id)
  const taller  = tallerSlug ? talleresConfig.find(t => t.slug === tallerSlug) : null
  const accent  = taller ? `hsl(${taller.color})` : '#02d47e'
  const totalBienes = taller ? getTotalBienesByTaller(taller.slug) : 0

  const ieLabel   = ie ? `IE ${ie.nombre}` : 'Sin IE asignada'
  const ieDetalle = ie ? `${ie.distrito}, ${ie.provincia}` : '—'
  const ugelLabel = ie ? ie.region : '—'

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif", background: '#f0faf5' }}>

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b"
        style={{ background: 'rgba(4,57,65,0.97)', backdropFilter: 'blur(12px)', borderColor: 'rgba(2,212,126,0.15)' }}>
        <div className="max-w-3xl mx-auto px-5 h-12 flex items-center justify-between">
          <button onClick={() => navigate(taller ? `/taller/${taller.slug}` : '/hub')}
            className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-60"
            style={{ color: 'rgba(2,212,126,0.8)' }}>
            <ChevronRight size={13} className="rotate-180" />
            Volver
          </button>
          <GramaLogo variant="light" size="sm" />
          <button onClick={() => signOut()}
            className="text-xs font-semibold transition-opacity hover:opacity-60"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: '#043941' }}>
        <div className="absolute inset-0 grama-pattern opacity-20 pointer-events-none" />
        <div className="absolute pointer-events-none"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(2,212,126,0.12) 0%, transparent 65%)', right: -60, top: -60 }} />

        <div className="relative max-w-3xl mx-auto px-5 py-8">
          <div className="flex items-start justify-between gap-4">

            {/* Avatar + info */}
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-black shrink-0"
                style={{ background: 'linear-gradient(135deg, #02d47e, #059669)', color: '#043941' }}>
                {getInitials(displayName)}
              </div>
              <div>
                <p className="text-[10px] font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Bienvenido de vuelta
                </p>
                <h1 className="text-2xl font-extrabold text-white leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Hola, {displayName.split(' ')[0]}
                </h1>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {isAdmin ? 'Administrador GRAMA' : 'Docente EPT · Programa MSE-SFT'}{ie ? ` · ${ie.nombre}` : ''}
                </p>
              </div>
            </div>

            {/* Badges top-right */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.3)', color: '#02d47e' }}>
                  <Shield size={12} />
                  Panel de Admin
                </button>
              )}
              <div className="px-3 py-1.5 rounded-xl text-center"
                style={{ background: 'rgba(2,212,126,0.1)', border: '1px solid rgba(2,212,126,0.2)' }}>
                <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#02d47e' }}>
                  {taller || isAdmin ? 'Programa activo' : 'Sin taller asignado'}
                </p>
                <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {TOTAL_MODULOS} módulos · {TOTAL_HORAS}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-6 space-y-6">

        {/* ── Info cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { Icon: Building2, label: 'Institución', value: ieLabel, sub: ieDetalle },
            { Icon: Mail,      label: 'Correo',      value: displayEmail, sub: null },
            { Icon: MapPin,    label: 'Región',      value: ugelLabel,   sub: null },
          ].map(card => (
            <div key={card.label} className="bg-white rounded-2xl p-4 border" style={{ borderColor: '#d1fae5' }}>
              <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>
                {card.label}
              </p>
              <div className="flex items-start gap-2">
                <card.Icon size={13} style={{ color: '#02d47e', marginTop: 1, flexShrink: 0 }} />
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-snug truncate" style={{ color: '#043941' }}>{card.value}</p>
                  {card.sub && <p className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>{card.sub}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Taller asignado ────────────────────────────────────────────── */}
        {taller ? (
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: '#043941' }}>
              Tu taller asignado
            </p>
            <button
              onClick={() => navigate(`/taller/${taller.slug}`)}
              className="w-full text-left bg-white rounded-2xl border-2 p-5 transition-shadow hover:shadow-lg"
              style={{ borderColor: accent }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black px-2.5 py-1 rounded-full"
                    style={{ background: accent, color: '#fff' }}>
                    T{String(taller.numero).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>
                    Acceso completo
                  </span>
                </div>
                <ChevronRight size={14} style={{ color: '#94a3b8' }} />
              </div>
              <h2 className="text-lg font-extrabold mb-1" style={{ color: '#043941', letterSpacing: '-0.01em' }}>
                {taller.nombre}
              </h2>
              <p className="text-xs leading-relaxed mb-4" style={{ color: '#64748b' }}>
                {taller.descripcion}
              </p>
              <div className="flex gap-6">
                {[
                  { Icon: BookOpen, v: TOTAL_MODULOS, label: 'Módulos' },
                  { Icon: Clock,    v: `${TOTAL_HORAS}h`, label: 'Formación' },
                  { Icon: Package,  v: totalBienes,   label: 'Bienes' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-base font-extrabold leading-none" style={{ color: '#043941' }}>{s.v}</p>
                    <p className="text-[10px] font-medium mt-0.5" style={{ color: '#94a3b8' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </button>
          </div>
        ) : !isAdmin && (
          <div className="bg-white rounded-2xl border-2 border-dashed p-8 text-center" style={{ borderColor: '#d1fae5' }}>
            <p className="text-sm font-bold mb-1" style={{ color: '#043941' }}>Sin taller asignado</p>
            <p className="text-xs" style={{ color: '#94a3b8' }}>
              Comunícate con tu coordinador UGEL para que habiliten tu acceso.
            </p>
          </div>
        )}

        {/* ── Todos los talleres ─────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-extrabold" style={{ color: '#043941' }}>
                ¿Te interesaría capacitarte en más talleres?
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                Estos son los talleres EPT disponibles en GRAMA. Puedes revisar su sílabo y contenido general.
              </p>
            </div>
            <span className="text-xs font-bold shrink-0 ml-4" style={{ color: '#02d47e' }}>
              {talleresConfig.length} talleres
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {talleresConfig.map(t => {
              const esMio     = t.slug === tallerSlug
              const tc        = `hsl(${t.color})`
              const bienesT   = getTotalBienesByTaller(t.slug)
              return (
                <button
                  key={t.slug}
                  onClick={() => isAdmin || esMio ? navigate(`/taller/${t.slug}`) : navigate(`/taller/${t.slug}/preview`)}
                  className="text-left bg-white rounded-xl p-3.5 border transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    borderColor: esMio ? tc : '#e2f0f3',
                    borderTopColor: tc,
                    borderTopWidth: 3,
                  }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: esMio ? tc : `hsl(${t.color} / 0.12)`, color: esMio ? '#fff' : tc }}>
                      T{String(t.numero).padStart(2, '0')}
                    </span>
                    {esMio && (
                      <span className="text-[8px] font-black uppercase tracking-wide" style={{ color: tc }}>
                        Tu taller
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold leading-snug mb-1 line-clamp-2" style={{ color: '#043941' }}>
                    {t.nombre}
                  </p>
                  <p className="text-[10px] leading-snug line-clamp-2 mb-2" style={{ color: '#94a3b8' }}>
                    {t.descripcion.split('.')[0]}.
                  </p>
                  <p className="text-[9px] font-semibold" style={{ color: '#b0c4ca' }}>
                    {bienesT} bienes
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── CTA footer ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl flex items-center justify-between gap-4 p-5"
          style={{ background: '#043941' }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(2,212,126,0.15)' }}>
              <Mail size={16} style={{ color: '#02d47e' }} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">¿Quieres acceder a alguno de estos talleres?</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                El acceso lo gestiona GRAMA junto a tu coordinador de UGEL. Escríbenos y te orientamos en el proceso.
              </p>
            </div>
          </div>
          <a href="mailto:soporte@grama.pe"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-90 shrink-0"
            style={{ background: '#02d47e', color: '#043941' }}>
            Contáctanos <ChevronRight size={12} />
          </a>
        </div>

      </div>

      {/* bottom padding */}
      <div className="h-8" />
    </div>
  )
}
