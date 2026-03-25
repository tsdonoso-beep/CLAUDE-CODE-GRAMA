// src/pages/TallerPreview.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, CheckCircle, Mail, ChevronRight } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { GramaLogo } from '@/components/GramaLogo'

// Ruta de aprendizaje estándar (igual para todos los talleres)
const MODULOS_RUTA = [
  {
    codigo: 'M0',
    titulo: 'Módulo Introductorio',
    descripcion: 'Bienvenida al programa, presentación de la plataforma, normativa de seguridad básica y encuadre pedagógico del taller.',
    horas: 20,
  },
  {
    codigo: 'M1',
    titulo: 'Seguridad y Salud Ocupacional',
    descripcion: 'Identificación de riesgos laborales, uso correcto de EPP, protocolos de emergencia y normativa de seguridad en el taller.',
    horas: 20,
  },
  {
    codigo: 'M2',
    titulo: 'Investigación Aplicada',
    descripcion: 'Metodología de indagación, identificación de necesidades del entorno, análisis de problemas técnicos y planteamiento de soluciones.',
    horas: 20,
  },
  {
    codigo: 'M3',
    titulo: 'Innovación y Diseño',
    descripcion: 'Procesos de ideación, prototipado y mejora de soluciones técnicas. Creatividad aplicada a la especialidad y pensamiento de diseño.',
    horas: 20,
  },
  {
    codigo: 'M4',
    titulo: 'Técnicas y Acabados',
    descripcion: 'Dominio de los procesos técnicos propios de la especialidad: uso de herramientas, materiales y procedimientos de calidad.',
    horas: 20,
  },
  {
    codigo: 'M5',
    titulo: 'Formación Práctica',
    descripcion: 'Consolidación de competencias mediante prácticas guiadas y trabajo colaborativo. Evaluación de desempeño técnico.',
    horas: 20,
  },
  {
    codigo: 'M6',
    titulo: 'Proyecto Integrador',
    descripcion: 'Desarrollo de un proyecto real que integra todas las competencias del programa. Presentación ante la comunidad educativa.',
    horas: 30,
  },
]

export default function TallerPreview() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const taller = talleresConfig.find(t => t.slug === slug)

  if (!taller) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0faf5' }}>
        <div className="text-center">
          <p className="text-sm font-semibold mb-4" style={{ color: '#043941' }}>Taller no encontrado</p>
          <button onClick={() => navigate('/')} className="text-sm font-bold" style={{ color: '#02d47e' }}>
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const accent = `hsl(${taller.color})`
  const totalHoras = MODULOS_RUTA.reduce((sum, m) => sum + m.horas, 0)

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b"
        style={{ background: '#ffffff', borderColor: '#e3f8fb' }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: '#045f6c' }}
        >
          <ArrowLeft size={14} />
          Volver
        </button>
        <GramaLogo variant="dark" size="sm" />
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: '#02d47e' }}
        >
          Acceder
        </button>
      </nav>

      {/* ── Hero ── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={taller.imagen}
          alt={taller.nombre}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(3,14,18,0.35) 0%, rgba(3,14,18,0.75) 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-8">
          <span
            className="inline-block text-[10px] font-black px-2.5 py-1 rounded-full tracking-[0.12em] mb-3 self-start"
            style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}50` }}
          >
            T{String(taller.numero).padStart(2, '0')} · TALLER EPT
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {taller.nombre}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <BookOpen size={13} /> 7 módulos
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <Clock size={13} /> {totalHoras}h de formación
            </span>
          </div>
        </div>
      </div>

      {/* ── Descripción ── */}
      <div className="bg-white px-6 md:px-12 py-10 border-b" style={{ borderColor: '#e3f8fb' }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-[10px] font-black uppercase tracking-[0.14em] mb-3"
            style={{ color: accent }}
          >
            Sobre este taller
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>
            {taller.descripcion}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { value: '7', label: 'Módulos' },
              { value: `${totalHoras}h`, label: 'Duración total' },
              { value: 'Híbrida', label: 'Modalidad' },
            ].map(s => (
              <div
                key={s.label}
                className="text-center py-3 rounded-xl"
                style={{ background: '#f0faf5' }}
              >
                <p className="text-lg font-extrabold" style={{ color: '#043941' }}>{s.value}</p>
                <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#64748b' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ruta de aprendizaje ── */}
      <div className="px-6 md:px-12 py-12" style={{ background: '#f8fffe' }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-[10px] font-black uppercase tracking-[0.14em] mb-2"
            style={{ color: accent }}
          >
            Programa de formación
          </p>
          <h2 className="text-sm font-extrabold mb-1" style={{ color: '#043941' }}>
            Ruta de Aprendizaje
          </h2>
          <p className="text-xs mb-8" style={{ color: '#64748b' }}>
            Estructura estándar del programa MSE-SFT · MINEDU Perú
          </p>

          <div className="relative">
            {/* Línea vertical */}
            <div
              className="absolute left-[18px] top-2 bottom-2 w-px"
              style={{ background: '#e3f8fb' }}
            />

            <div className="space-y-4">
              {MODULOS_RUTA.map((modulo, i) => (
                <div key={modulo.codigo} className="flex gap-4 relative">
                  {/* Dot */}
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2"
                    style={{
                      background: '#ffffff',
                      borderColor: i === 0 ? accent : '#e3f8fb',
                    }}
                  >
                    <span
                      className="text-[9px] font-black"
                      style={{ color: i === 0 ? accent : '#94a3b8' }}
                    >
                      {modulo.codigo}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div
                    className="flex-1 rounded-xl p-4 mb-0"
                    style={{
                      background: '#ffffff',
                      border: `1px solid ${i === 0 ? '#e3f8fb' : '#f1f5f9'}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs font-bold" style={{ color: '#043941' }}>
                        {modulo.titulo}
                      </p>
                      <span
                        className="text-[10px] font-bold shrink-0"
                        style={{ color: '#94a3b8' }}
                      >
                        {modulo.horas}h
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: '#64748b' }}>
                      {modulo.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nota al pie */}
          <div
            className="mt-6 flex items-start gap-2.5 px-4 py-3 rounded-xl text-[11px]"
            style={{ background: '#f0faf5', color: '#045f6c' }}
          >
            <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: '#02d47e' }} />
            El programa incluye materiales didácticos, equipamiento de taller y acompañamiento docente
            especializado durante toda la formación.
          </div>
        </div>
      </div>

      {/* ── CTA Contacto ── */}
      <div
        className="px-6 md:px-12 py-14"
        style={{ background: 'linear-gradient(135deg, #030e12 0%, #043941 60%, #032e34 100%)' }}
      >
        <div className="max-w-lg mx-auto text-center">
          <div
            className="inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-5 mx-auto"
            style={{ background: 'rgba(2,212,126,0.15)' }}
          >
            <Mail size={20} style={{ color: '#02d47e' }} />
          </div>
          <h2 className="text-xl font-extrabold text-white mb-2">
            ¿Tu IE tiene el taller de {taller.nombreCorto}?
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Contáctanos para registrar tu institución en el programa y que tus docentes
            accedan a toda la plataforma de capacitación.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:soporte@grama.pe"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#02d47e' }}
            >
              <Mail size={15} />
              Comunícate con nosotros
            </a>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              Ya tengo cuenta
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer mínimo ── */}
      <div
        className="px-6 py-4 flex items-center justify-between text-[11px]"
        style={{ background: '#030e12', color: 'rgba(255,255,255,0.3)' }}
      >
        <GramaLogo variant="light" size="sm" />
        <span>Programa MSE-SFT · MINEDU Perú</span>
      </div>
    </div>
  )
}
