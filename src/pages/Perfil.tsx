// src/pages/Perfil.tsx
import { useNavigate } from 'react-router-dom'
import {
  Mail, MapPin, Building2, Package, Clock,
  ChevronRight, Shield, LogOut, ArrowRight, Layers, Play,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { talleresConfig } from '@/data/talleresConfig'
import { getTotalBienesByTaller } from '@/data/bienesData'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { GramaLogo } from '@/components/GramaLogo'

const TOTAL_HORAS   = 150
const TOTAL_MODULOS = 7

const TALLER_ACCENTS: Record<string, string> = {
  'mecanica-automotriz': '#3b82f6',
  'industria-vestido':   '#ec4899',
  'cocina-reposteria':   '#f97316',
  'ebanisteria':         '#b8975a',
  'comunicaciones':      '#a78bfa',
  'computacion':         '#22d3ee',
  'agropecuaria':        '#86efac',
  'electricidad':        '#fde047',
  'construccion':        '#94a3b8',
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
}

// ── Tangram decorativo (mismo componente que Landing) ────────────────────────
function Tangram({ color = '#02d47e', opacity = 0.12, className = '', rotate = 0 }:
  { color?: string; opacity?: number; className?: string; rotate?: number }) {
  return (
    <svg viewBox="0 0 160 160" className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }} xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,160 80,80 0,0"              fill={color} fillOpacity={opacity} />
      <polygon points="160,0 80,80 160,160"           fill={color} fillOpacity={opacity * 0.7} />
      <polygon points="0,160 80,160 80,80"            fill={color} fillOpacity={opacity * 1.2} />
      <polygon points="80,80 120,80 120,120"          fill={color} fillOpacity={opacity * 0.8} />
      <polygon points="80,80 80,120 120,120"          fill={color} fillOpacity={opacity * 0.6} />
      <polygon points="120,80 160,80 160,120 120,120" fill={color} fillOpacity={opacity * 0.5} />
    </svg>
  )
}

export default function Perfil() {
  const navigate = useNavigate()
  const { profile, user, isAdmin, signOut } = useAuth()

  const displayName  = profile?.nombre_completo || user?.email?.split('@')[0] || 'Docente'
  const firstName    = displayName.split(' ')[0]
  const displayEmail = profile?.email ?? user?.email ?? ''
  const tallerSlug   = profile?.taller_slug ?? null

  const ie          = INSTITUCIONES_EDUCATIVAS.find(i => i.id === profile?.ie_id)
  const taller      = tallerSlug ? talleresConfig.find(t => t.slug === tallerSlug) : null
  const accent      = taller ? (TALLER_ACCENTS[taller.slug] ?? '#02d47e') : '#02d47e'
  const totalBienes = taller ? getTotalBienesByTaller(taller.slug) : 0

  const ieLabel  = ie ? ie.nombre : 'Sin IE asignada'
  const distrito = ie ? `${ie.distrito}, ${ie.provincia}` : '—'
  const region   = ie ? ie.region : '—'

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif", background: '#f0faf5' }}>

      {/* ══ HERO OSCURO (navbar + greeting integrados) ══════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#043941', minHeight: 320 }}>

        {/* Patrón GRAMA */}
        <div className="absolute inset-0 grama-pattern opacity-30 pointer-events-none" />

        {/* Orbs ambientales */}
        <div className="absolute pointer-events-none"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(2,212,126,0.09) 0%, transparent 60%)', right: -150, top: -180 }} />
        <div className="absolute pointer-events-none"
          style={{ width: 400, height: 400, background: `radial-gradient(circle, ${accent}0e 0%, transparent 60%)`, left: -80, bottom: -100 }} />

        {/* Tangrams de esquina — estáticos */}
        <Tangram color="#02d47e" opacity={0.08}  rotate={15}  className="absolute w-72 h-72 -top-6 -right-6" />
        <Tangram color="#02d47e" opacity={0.05}  rotate={-20} className="absolute w-52 h-52 bottom-8 -left-6" />
        <Tangram color="#ffffff" opacity={0.025} rotate={45}  className="absolute w-40 h-40 top-1/2 left-1/3" />

        {/* Piezas individuales flotando */}
        <svg viewBox="0 0 80 80" className="absolute pointer-events-none float-a"
          style={{ width: 60, height: 60, top: '18%', left: '5%', animationDuration: '14s' }}>
          <polygon points="0,80 40,0 80,80" fill="#02d47e" fillOpacity={0.25} />
        </svg>
        <svg viewBox="0 0 60 60" className="absolute pointer-events-none float-b"
          style={{ width: 44, height: 44, top: '55%', left: '10%', animationDuration: '19s' }}>
          <polygon points="30,0 60,60 0,60" fill="#02d47e" fillOpacity={0.18} />
        </svg>
        <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-d"
          style={{ width: 34, height: 34, top: '15%', right: '22%', animationDuration: '10s' }}>
          <polygon points="25,0 50,50 0,50" fill="#02d47e" fillOpacity={0.30} />
        </svg>
        <svg viewBox="0 0 80 40" className="absolute pointer-events-none float-c"
          style={{ width: 56, height: 28, top: '62%', right: '12%', animationDuration: '16s' }}>
          <polygon points="20,0 80,0 60,40 0,40" fill="#02d47e" fillOpacity={0.18} />
        </svg>
        <svg viewBox="0 0 40 40" className="absolute pointer-events-none float-a"
          style={{ width: 30, height: 30, bottom: '20%', left: '32%', animationDuration: '22s' }}>
          <polygon points="20,0 40,40 0,40" fill="#02d47e" fillOpacity={0.22} />
        </svg>

        {/* ── Navbar integrada en el hero ── */}
        <div className="relative z-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between" style={{ height: 52 }}>
            <GramaLogo variant="light" size="sm" />
            <div className="flex items-center gap-2.5">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(2,212,126,0.14)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.25)' }}
                >
                  <Shield size={12} />
                  Panel de Admin
                </button>
              )}
              {taller && (
                <button
                  onClick={() => navigate(`/taller/${taller.slug}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  Ir a mi taller <ChevronRight size={12} />
                </button>
              )}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-60 px-2 py-1.5"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                <LogOut size={12} />
                Salir
              </button>
            </div>
          </div>
        </div>

        {/* ── Greeting centrado ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-14">

          {/* Avatar con anillos */}
          <div className="relative mb-5">
            <div className="absolute rounded-full animate-pulse pointer-events-none"
              style={{ inset: -12, border: `1px solid ${accent}20`, background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`, borderRadius: '50%' }} />
            <div className="absolute rounded-full pointer-events-none"
              style={{ inset: -5, border: `1px solid ${accent}28`, borderRadius: '50%' }} />
            <div
              className="h-20 w-20 rounded-full flex items-center justify-center text-2xl font-black relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(2,212,126,0.25) 0%, rgba(4,95,108,0.4) 100%)',
                border: `2px solid ${accent}40`,
                color: '#02d47e',
                boxShadow: `0 0 40px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.1)`,
                letterSpacing: '-0.02em',
                backdropFilter: 'blur(8px)',
              }}
            >
              {getInitials(displayName)}
            </div>
            {isAdmin && (
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center z-20"
                style={{ background: '#02d47e', border: '2.5px solid #043941', boxShadow: '0 2px 10px rgba(2,212,126,0.45)' }}>
                <Shield size={13} style={{ color: '#043941' }} />
              </div>
            )}
          </div>

          <p className="text-[10px] font-semibold tracking-[0.14em] mb-2 animate-fade-in-up"
            style={{ color: 'rgba(255,255,255,0.38)' }}>
            {isAdmin ? 'ADMINISTRADOR · GRAMA' : 'DOCENTE EPT · PROGRAMA MSE-SFT'}
          </p>

          <h1 className="font-black text-white mb-2 animate-fade-in-up stagger-1"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Hola, {firstName}
          </h1>

          <p className="text-sm mb-6 animate-fade-in-up stagger-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {displayName !== firstName ? displayName : displayEmail}
          </p>

          {/* Chips de contexto */}
          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up stagger-3">
            {ie && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Building2 size={11} />
                {ie.nombre}
              </span>
            )}
            {region !== '—' && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <MapPin size={11} />
                {region}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Mail size={11} />
              {displayEmail}
            </span>
          </div>
        </div>

        {/* Fade-out al contenido claro */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #f0faf5)' }} />
      </section>

      {/* ── Contenido principal ── */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Columna principal (2/3) ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Taller asignado — card destacada */}
            {taller ? (
              <div>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.18em] mb-3"
                  style={{ color: 'rgba(4,57,65,0.4)' }}
                >
                  Tu taller asignado
                </p>
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    border: `1px solid rgba(4,57,65,0.08)`,
                    boxShadow: '0 4px 24px rgba(4,57,65,0.07)',
                  }}
                >
                  {/* Imagen como hero del card */}
                  {taller.imagen && (
                    <div className="relative h-44 overflow-hidden">
                      <img src={taller.imagen} alt={taller.nombre} className="w-full h-full object-cover" />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, rgba(4,10,20,0.1) 0%, rgba(4,10,20,0.75) 100%)' }}
                      />
                      {/* Badge número */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-[10px] font-black px-3 py-1 rounded-full"
                          style={{ background: accent, color: '#fff', boxShadow: `0 2px 8px ${accent}50` }}
                        >
                          T{String(taller.numero).padStart(2, '0')}
                        </span>
                      </div>
                      {/* Nombre del taller sobre la imagen */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2
                          className="text-xl font-extrabold text-white leading-tight"
                          style={{ letterSpacing: '-0.015em' }}
                        >
                          {taller.nombre}
                        </h2>
                      </div>
                    </div>
                  )}

                  <div className="bg-white px-5 pt-4 pb-5">
                    <p className="text-xs leading-relaxed mb-4" style={{ color: '#64748b' }}>
                      {taller.descripcion}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-5 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
                      {[
                        { Icon: Layers,  value: TOTAL_MODULOS,     label: 'Módulos' },
                        { Icon: Clock,   value: `${TOTAL_HORAS}h`, label: 'Formación' },
                        { Icon: Package, value: totalBienes,       label: 'Bienes' },
                      ].map(s => (
                        <div key={s.label} className="flex items-center gap-2">
                          <s.Icon size={14} style={{ color: accent }} />
                          <div>
                            <p className="text-sm font-extrabold leading-none" style={{ color: '#043941' }}>{s.value}</p>
                            <p className="text-[10px] font-medium mt-0.5" style={{ color: '#94a3b8' }}>{s.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => navigate(`/taller/${taller.slug}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                        style={{ background: '#043941', color: '#02d47e' }}
                      >
                        <Play size={14} />
                        Continuar aprendizaje
                      </button>
                      <button
                        onClick={() => navigate(`/taller/${taller.slug}/repositorio`)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-80"
                        style={{ background: 'rgba(4,57,65,0.06)', color: '#043941', border: '1px solid rgba(4,57,65,0.1)' }}
                      >
                        <Package size={13} />
                        Repositorio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : !isAdmin && (
              <div
                className="bg-white rounded-2xl border-2 border-dashed p-8 text-center"
                style={{ borderColor: '#d1fae5' }}
              >
                <p className="text-sm font-bold mb-1" style={{ color: '#043941' }}>Sin taller asignado</p>
                <p className="text-xs" style={{ color: '#94a3b8' }}>
                  Comunícate con tu coordinador UGEL para habilitar tu acceso.
                </p>
              </div>
            )}

            {/* Todos los talleres */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: 'rgba(4,57,65,0.4)' }}>
                  Todos los talleres EPT
                </p>
                <span className="text-[10px] font-bold" style={{ color: '#02d47e' }}>
                  {talleresConfig.length} disponibles
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {talleresConfig.map(t => {
                  const esMio  = t.slug === tallerSlug
                  const ta     = TALLER_ACCENTS[t.slug] ?? '#02d47e'
                  const bienesT = getTotalBienesByTaller(t.slug)
                  return (
                    <button
                      key={t.slug}
                      onClick={() => isAdmin || esMio
                        ? navigate(`/taller/${t.slug}`)
                        : navigate(`/taller/${t.slug}/preview`)}
                      className="text-left rounded-xl border bg-white transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden group"
                      style={{
                        borderColor: esMio ? ta : 'rgba(4,57,65,0.07)',
                        boxShadow: esMio ? `0 0 0 1px ${ta}30, 0 2px 12px ${ta}10` : undefined,
                      }}
                    >
                      {/* Barra de color superior */}
                      <div className="h-1" style={{ background: ta }} />
                      <div className="p-3.5">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-[9px] font-black px-2 py-0.5 rounded-full"
                            style={{ background: esMio ? ta : `${ta}15`, color: esMio ? '#fff' : ta }}
                          >
                            T{String(t.numero).padStart(2, '0')}
                          </span>
                          {esMio && (
                            <span
                              className="text-[8px] font-black uppercase tracking-wide"
                              style={{ color: ta }}
                            >
                              ✓ activo
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold leading-snug mb-1.5 line-clamp-2" style={{ color: '#043941' }}>
                          {t.nombre}
                        </p>
                        <p className="text-[10px]" style={{ color: '#b0c4ca' }}>
                          {bienesT} bienes · {TOTAL_MODULOS} módulos
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Sidebar (1/3) ── */}
          <div className="space-y-4">

            {/* Mi información */}
            <div
              className="rounded-2xl overflow-hidden bg-white"
              style={{ border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)' }}
            >
              <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
                <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: 'rgba(4,57,65,0.35)' }}>
                  Mi información
                </p>
              </div>
              <div className="divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
                {[
                  { Icon: Mail,      label: 'Correo',      value: displayEmail, sub: null },
                  { Icon: Building2, label: 'Institución', value: ieLabel,      sub: distrito },
                  { Icon: MapPin,    label: 'Región',      value: region,       sub: null },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 px-5 py-4">
                    <div
                      className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(4,57,65,0.05)' }}
                    >
                      <item.Icon size={14} style={{ color: '#045f6c' }} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: '#b0c4ca' }}>
                        {item.label}
                      </p>
                      <p className="text-xs font-bold leading-snug break-words" style={{ color: '#043941' }}>
                        {item.value}
                      </p>
                      {item.sub && (
                        <p className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>{item.sub}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acceso rápido (si tiene taller) */}
            {taller && (
              <div
                className="rounded-2xl overflow-hidden bg-white"
                style={{ border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)' }}
              >
                <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: 'rgba(4,57,65,0.35)' }}>
                    Acceso rápido
                  </p>
                </div>
                <div className="p-2">
                  {[
                    { label: 'Ruta de Aprendizaje', sub: `${TOTAL_MODULOS} módulos · ${TOTAL_HORAS}h`, to: `/taller/${taller.slug}/ruta`,        Icon: Layers,  color: accent },
                    { label: 'Repositorio de Recursos', sub: `${totalBienes} bienes`,                 to: `/taller/${taller.slug}/repositorio`, Icon: Package, color: '#02d47e' },
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.to)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.03)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                    >
                      <div
                        className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}12`, border: `1px solid ${item.color}20` }}
                      >
                        <item.Icon size={15} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold leading-none mb-0.5" style={{ color: '#043941' }}>{item.label}</p>
                        <p className="text-[10px]" style={{ color: '#94a3b8' }}>{item.sub}</p>
                      </div>
                      <ChevronRight size={13} style={{ color: 'rgba(4,57,65,0.2)' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)',
                border: '1px solid rgba(2,212,126,0.15)',
                boxShadow: '0 4px 20px rgba(4,57,65,0.15)',
              }}
            >
              <div
                className="absolute -top-10 -right-10 pointer-events-none"
                style={{ width: 140, height: 140, background: 'radial-gradient(circle, rgba(2,212,126,0.15) 0%, transparent 65%)' }}
              />
              <div className="relative z-10">
                <p className="text-sm font-extrabold text-white mb-1.5 leading-snug">
                  ¿Quieres acceder a otro taller?
                </p>
                <p className="text-[11px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  El acceso lo gestiona GRAMA junto a tu coordinador de UGEL.
                </p>
                <a
                  href="mailto:soporte@grama.pe"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#02d47e', color: '#043941' }}
                >
                  Contáctanos <ArrowRight size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-12" />
    </div>
  )
}
