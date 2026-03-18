// src/pages/Bienvenida.tsx
import { talleresConfig } from '@/data/talleresConfig'
import { TallerCard } from '@/components/hub/TallerCard'
import logoGramaFull from '@/assets/logo-grama-full.png'

export default function Bienvenida() {
  return (
    <div
      className="min-h-screen grama-pattern"
      style={{ background: '#043941' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <img
          src={logoGramaFull}
          alt="GRAMA Proyectos Educativos"
          className="h-10 object-contain"
        />
        <p className="text-xs font-medium hidden sm:block" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Plataforma de Capacitación Docente · TSF / MSE-SFT · MINEDU
        </p>
        <button
          onClick={() => {
            sessionStorage.removeItem('grama-auth')
            window.location.href = '/login'
          }}
          className="text-xs font-semibold transition-colors"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          Cerrar sesión
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-14">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight"
          >
            Capacitación Docente
          </h1>
          <h2
            className="text-lg sm:text-xl font-light mb-4"
            style={{ color: '#02d47e' }}
          >
            Talleres EPT — Educación Para el Trabajo
          </h2>
          <p className="text-sm font-medium max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Selecciona tu taller para iniciar la ruta de capacitación de 150 horas
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
            {[
              { value: '9', label: 'Talleres EPT' },
              { value: '150h', label: 'Modalidad híbrida' },
              { value: '7', label: 'Módulos LXP' },
              { value: '🎓', label: 'Certificación MINEDU' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: '#02d47e' }}>
                  {s.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid de 9 talleres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {talleresConfig.map(taller => (
            <TallerCard key={taller.id} taller={taller} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          GRAMA Proyectos Educativos · Programa MSE-SFT MINEDU 2024
        </p>
      </footer>
    </div>
  )
}
