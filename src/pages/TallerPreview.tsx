// src/pages/TallerPreview.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, CheckCircle, Mail, ChevronRight, Package } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller, getTotalBienesByTaller } from '@/data/bienesData'
import { GramaLogo } from '@/components/GramaLogo'

// Ruta de aprendizaje estándar (igual para todos los talleres)
const MODULOS_RUTA = [
  {
    codigo: 'M0',
    titulo: 'Inicio y Diagnóstico',
    descripcion: 'Conoce la plataforma, tu punto de partida y el contexto del programa TSF. Explora tu taller virtualmente y comparte tus expectativas.',
    horas: 4,
    fase: 'Diagnóstico',
  },
  {
    codigo: 'M1',
    titulo: 'Conocimiento del Taller',
    descripcion: 'Marco del programa formativo, IA para docentes EPT, arquitectura del taller y seguridad operativa. Quiz obligatorio con 80% para continuar.',
    horas: 11,
    fase: 'Orientación',
  },
  {
    codigo: 'M2',
    titulo: 'Zona de Investigación',
    descripcion: 'Domina el equipamiento de la zona de investigación: computadoras, cámaras, tablets, pizarras táctiles. Metodologías de indagación con tecnología.',
    horas: 18,
    fase: 'Apropiación',
  },
  {
    codigo: 'M3',
    titulo: 'Zona de Innovación: Máquinas y Herramientas',
    descripcion: 'El módulo más denso. Domina las máquinas de corte, fabricación digital y formado. Prácticas presenciales en niveles de complejidad creciente.',
    horas: 36,
    fase: 'Aplicación',
  },
  {
    codigo: 'M4',
    titulo: 'Acabados y Almacén',
    descripcion: 'Equipamiento de la zona de acabados, gestión del almacén y mantenimiento preventivo del taller. Fichas de revisión diaria.',
    horas: 14,
    fase: 'Aplicación',
  },
  {
    codigo: 'M5',
    titulo: 'Programa Formativo en el Taller',
    descripcion: 'Cómo planificar, implementar y evaluar competencias usando el equipamiento como ancla. Las 14 habilidades EPT desde el taller equipado.',
    horas: 22,
    fase: 'Aplicación',
  },
  {
    codigo: 'M6',
    titulo: 'Proyecto Integrador',
    descripcion: 'Produce un producto real en el taller usando todos los equipos y procesos aprendidos. Sustentación colectiva y ceremonia de certificación.',
    horas: 25,
    fase: 'Proyecto',
  },
]

// Mapeo de nombres de zona largos → etiqueta corta
const ZONA_LABEL: Record<string, string> = {
  'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO': 'Zona Investigación',
  'ZONA DE INNOVACIÓN': 'Zona Innovación',
  'DEPÓSITO / ALMACÉN / SEGURIDAD': 'Almacén y Seguridad',
}

function RepositorioSection({ slug, accent }: { slug: string; accent: string }) {
  const bienes = getBienesByTaller(slug)
  const total = getTotalBienesByTaller(slug)

  // Zonas únicas con conteo
  const zonaMap = new Map<string, number>()
  bienes.forEach(b => {
    zonaMap.set(b.zona, (zonaMap.get(b.zona) ?? 0) + 1)
  })
  const zonas = Array.from(zonaMap.entries()).map(([nombre, count]) => ({
    nombre,
    label: ZONA_LABEL[nombre] ?? nombre,
    count,
  }))

  // Top equipos de Zona Innovación (máx 8)
  const equiposDestacados = bienes
    .filter(b => b.zona.includes('INNOVACI') && b.tipo === 'EQUIPOS')
    .slice(0, 8)

  if (bienes.length === 0) return null

  return (
    <div className="px-6 md:px-12 py-12 border-t" style={{ background: '#ffffff', borderColor: '#e3f8fb' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accent}18` }}
          >
            <Package size={15} style={{ color: accent }} />
          </div>
          <div>
            <p
              className="text-[10px] font-black uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              Repositorio del Taller
            </p>
          </div>
        </div>
        <h2 className="text-sm font-extrabold mb-1" style={{ color: '#043941' }}>
          Equipamiento asignado
        </h2>
        <p className="text-xs mb-6" style={{ color: '#64748b' }}>
          Cada taller cuenta con {total} bienes distribuidos en {zonas.length} zonas de trabajo.
        </p>

        {/* Zonas con conteo */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {zonas.map(z => (
            <div
              key={z.nombre}
              className="rounded-xl p-3 text-center"
              style={{ background: '#f8fffe', border: '1px solid #e3f8fb' }}
            >
              <p className="text-base font-extrabold" style={{ color: '#043941' }}>{z.count}</p>
              <p className="text-[10px] font-semibold mt-0.5 leading-tight" style={{ color: '#64748b' }}>{z.label}</p>
            </div>
          ))}
        </div>

        {/* Equipos destacados Zona Innovación */}
        {equiposDestacados.length > 0 && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-3" style={{ color: '#94a3b8' }}>
              Equipos principales · Zona Innovación
            </p>
            <div className="flex flex-wrap gap-2">
              {equiposDestacados.map((e, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                  style={{ background: `${accent}12`, color: '#043941', border: `1px solid ${accent}25` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                  {e.nombre}
                </span>
              ))}
              {bienes.filter(b => b.zona.includes('INNOVACI') && b.tipo === 'EQUIPOS').length > 8 && (
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold"
                  style={{ background: '#f1f5f9', color: '#94a3b8' }}
                >
                  +{bienes.filter(b => b.zona.includes('INNOVACI') && b.tipo === 'EQUIPOS').length - 8} más
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

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
                    <p className="text-[11px] leading-relaxed mb-2" style={{ color: '#64748b' }}>
                      {modulo.descripcion}
                    </p>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wide"
                      style={{ color: '#94a3b8' }}
                    >
                      {modulo.fase}
                    </span>
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

      {/* ── Repositorio del Taller ── */}
      <RepositorioSection slug={taller.slug} accent={accent} />

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
