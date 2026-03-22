// src/components/lxp/ConocenosForm.tsx
import { useState } from 'react'
import { ChevronDown, MapPin, Briefcase, Calendar, School, CheckCircle2 } from 'lucide-react'
import { PERU_GEO, getProvincias } from '@/data/peruGeografia'
import { useTaller } from '@/hooks/useTaller'

// ─── IE Data ────────────────────────────────────────────────────────────────
interface IERecord {
  nombre: string
  departamento: string
  provincia: string
  especialidades: string[]
}

const IE_DATA: IERecord[] = [
  { nombre: '16449 ELOY SOBERON FLORES',     departamento: 'CAJAMARCA',  provincia: 'SAN IGNACIO', especialidades: ['COCINA Y REPOSTERÍA'] },
  { nombre: '2026 SIMON BOLIVAR',             departamento: 'LIMA',       provincia: 'LIMA',        especialidades: ['COMPUTACIÓN E INFORMÁTICA', 'ELECTRICIDAD', 'INDUSTRIA ALIMENTARIA', 'INDUSTRIA DEL VESTIDO'] },
  { nombre: '6049 RICARDO PALMA',             departamento: 'LIMA',       provincia: 'LIMA',        especialidades: ['COMPUTACIÓN E INFORMÁTICA', 'ELECTRÓNICA', 'ELECTRICIDAD'] },
  { nombre: 'FRANCISCO IRAZOLA',              departamento: 'JUNÍN',      provincia: 'SATIPO',      especialidades: ['INDUSTRIA ALIMENTARIA', 'MECÁNICA AUTOMOTRÍZ'] },
  { nombre: 'GUILLERMO E. BILLINGHURST',      departamento: 'LIMA',       provincia: 'BARRANCA',    especialidades: ['COMPUTACIÓN E INFORMÁTICA', 'EBANISTERÍA', 'ELECTRICIDAD', 'INDUSTRIA ALIMENTARIA', 'MECÁNICA AUTOMOTRÍZ'] },
  { nombre: 'JOSE GRANDA',                    departamento: 'LIMA',       provincia: 'LIMA',        especialidades: ['MECÁNICA AUTOMOTRÍZ', 'COMPUTACIÓN E INFORMÁTICA', 'INDUSTRIA ALIMENTARIA'] },
  { nombre: 'MANUEL ANTONIO MESONES MURO',    departamento: 'SAN MARTÍN', provincia: 'EL DORADO',   especialidades: ['INDUSTRIA DEL VESTIDO', 'CONSTRUCCIONES METÁLICAS', 'EBANISTERÍA'] },
]

const TALLER_ESPECIALIDAD: Record<string, string> = {
  'mecanica-automotriz':    'MECÁNICA AUTOMOTRÍZ',
  'industria-vestido':      'INDUSTRIA DEL VESTIDO',
  'cocina-reposteria':      'COCINA Y REPOSTERÍA',
  'ebanisteria':            'EBANISTERÍA',
  'computacion-informatica':'COMPUTACIÓN E INFORMÁTICA',
  'electronica':            'ELECTRÓNICA',
  'industria-alimentaria':  'INDUSTRIA ALIMENTARIA',
  'electricidad':           'ELECTRICIDAD',
  'construcciones-metalicas':'CONSTRUCCIONES METÁLICAS',
}

// ─── Subcomponents ───────────────────────────────────────────────────────────
function FieldLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-bold mb-1.5" style={{ color: '#043941' }}>
      <Icon size={13} style={{ color: '#02d47e' }} />
      {label}
    </label>
  )
}

function StyledSelect({
  value, onChange, placeholder, options, disabled = false
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: string[]
  disabled?: boolean
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="w-full appearance-none rounded-xl border px-4 py-3 pr-9 text-sm font-medium transition-all outline-none"
        style={{
          borderColor: value ? '#02d47e' : '#d1e8eb',
          background: disabled ? '#f8fffe' : '#ffffff',
          color: value ? '#043941' : '#94a3b8',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          boxShadow: value ? '0 0 0 2px rgba(2,193,120,0.15)' : 'none',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#02d47e' }} />
    </div>
  )
}

// ─── Date Picker ─────────────────────────────────────────────────────────────
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DIAS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
const ANIOS = Array.from({ length: 70 }, (_, i) => String(2010 - i))

function DatePicker({ value, onChange }: {
  value: { dia: string; mes: string; anio: string }
  onChange: (v: { dia: string; mes: string; anio: string }) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Día */}
      <div className="relative">
        <select
          value={value.dia}
          onChange={e => onChange({ ...value, dia: e.target.value })}
          className="w-full appearance-none rounded-xl border px-3 py-3 text-sm font-medium transition-all outline-none text-center"
          style={{
            borderColor: value.dia ? '#02d47e' : '#d1e8eb',
            background: '#fff',
            color: value.dia ? '#043941' : '#94a3b8',
            boxShadow: value.dia ? '0 0 0 2px rgba(2,193,120,0.15)' : 'none',
          }}
        >
          <option value="">DD</option>
          {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#02d47e' }} />
      </div>

      {/* Mes */}
      <div className="relative">
        <select
          value={value.mes}
          onChange={e => onChange({ ...value, mes: e.target.value })}
          className="w-full appearance-none rounded-xl border px-3 py-3 text-sm font-medium transition-all outline-none text-center"
          style={{
            borderColor: value.mes ? '#02d47e' : '#d1e8eb',
            background: '#fff',
            color: value.mes ? '#043941' : '#94a3b8',
            boxShadow: value.mes ? '0 0 0 2px rgba(2,193,120,0.15)' : 'none',
          }}
        >
          <option value="">MM</option>
          {MESES.map((m, i) => <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#02d47e' }} />
      </div>

      {/* Año */}
      <div className="relative">
        <select
          value={value.anio}
          onChange={e => onChange({ ...value, anio: e.target.value })}
          className="w-full appearance-none rounded-xl border px-3 py-3 text-sm font-medium transition-all outline-none text-center"
          style={{
            borderColor: value.anio ? '#02d47e' : '#d1e8eb',
            background: '#fff',
            color: value.anio ? '#043941' : '#94a3b8',
            boxShadow: value.anio ? '0 0 0 2px rgba(2,193,120,0.15)' : 'none',
          }}
        >
          <option value="">AAAA</option>
          {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#02d47e' }} />
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function ConocenosForm() {
  const { taller } = useTaller()
  const especialidad = taller ? (TALLER_ESPECIALIDAD[taller.slug] ?? '') : ''
  const storageKey = `grama-conocenos-${taller?.slug ?? 'default'}`

  const [profesion, setProfesion] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [provincia, setProvincia] = useState('')
  const [fecha, setFecha] = useState({ dia: '', mes: '', anio: '' })
  const [ie, setIe] = useState('')
  const [enviado, setEnviado] = useState(() => !!localStorage.getItem(storageKey))

  const provincias = departamento ? getProvincias(departamento) : []

  const iesFiltradas = IE_DATA.filter(r =>
    r.departamento === departamento &&
    r.provincia === provincia &&
    (especialidad ? r.especialidades.includes(especialidad) : true)
  )

  const handleDepartamentoChange = (v: string) => {
    setDepartamento(v)
    setProvincia('')
    setIe('')
  }

  const handleProvinciaChange = (v: string) => {
    setProvincia(v)
    setIe('')
  }

  const isComplete =
    profesion.trim() !== '' &&
    departamento !== '' &&
    provincia !== '' &&
    fecha.dia !== '' && fecha.mes !== '' && fecha.anio !== ''

  const handleSubmit = () => {
    if (!isComplete) return
    localStorage.setItem(storageKey, JSON.stringify({ profesion, departamento, provincia, fecha, ie }))
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="p-6 flex flex-col items-center gap-3 text-center">
        <div className="h-14 w-14 rounded-full flex items-center justify-center" style={{ background: '#d2ffe1' }}>
          <CheckCircle2 size={28} style={{ color: '#00c16e' }} />
        </div>
        <p className="text-lg font-bold" style={{ color: '#043941' }}>¡Gracias por compartir tus datos!</p>
        <p className="text-sm" style={{ color: '#045f6c' }}>
          Tu perfil nos ayudará a personalizar mejor tu experiencia de aprendizaje.
        </p>
        <div className="mt-2 text-xs rounded-xl px-4 py-2" style={{ background: '#e8faf4', color: '#045f6c' }}>
          {departamento} · {provincia} · {fecha.dia}/{fecha.mes}/{fecha.anio}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-5">

        {/* Profesión */}
        <div>
          <FieldLabel icon={Briefcase} label="Profesión u ocupación" />
          <input
            type="text"
            value={profesion}
            onChange={e => setProfesion(e.target.value)}
            placeholder="Ej: Técnico electricista, Docente, Estudiante…"
            className="w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none transition-all"
            style={{
              borderColor: profesion ? '#02d47e' : '#d1e8eb',
              color: '#043941',
              boxShadow: profesion ? '0 0 0 2px rgba(2,193,120,0.15)' : 'none',
            }}
          />
        </div>

        {/* Ubicación */}
        <div>
          <FieldLabel icon={MapPin} label="Ubicación" />
          <div className="space-y-2">
            <StyledSelect
              value={departamento}
              onChange={handleDepartamentoChange}
              placeholder="Selecciona tu departamento / región"
              options={PERU_GEO.map(d => d.nombre)}
            />
            <StyledSelect
              value={provincia}
              onChange={handleProvinciaChange}
              placeholder={departamento ? 'Selecciona tu provincia' : 'Primero elige un departamento'}
              options={provincias}
              disabled={!departamento}
            />
          </div>
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <FieldLabel icon={Calendar} label="Fecha de nacimiento" />
          <DatePicker value={fecha} onChange={setFecha} />
          {fecha.dia && fecha.mes && fecha.anio && (
            <p className="mt-1.5 text-xs font-medium" style={{ color: '#02d47e' }}>
              {fecha.dia} de {MESES[parseInt(fecha.mes) - 1]} de {fecha.anio}
            </p>
          )}
        </div>

        {/* Institución Educativa */}
        <div>
          <FieldLabel icon={School} label="Institución Educativa (IE)" />
          {!departamento || !provincia ? (
            <div
              className="rounded-xl border px-4 py-3 text-sm"
              style={{ borderColor: '#e3f8fb', background: '#f8fffe', color: '#94a3b8' }}
            >
              Selecciona tu departamento y provincia para ver las IE disponibles
            </div>
          ) : iesFiltradas.length === 0 ? (
            <div
              className="rounded-xl border px-4 py-3 text-sm"
              style={{ borderColor: '#fde8cc', background: '#fffbf5', color: '#b45309' }}
            >
              No hay IE registrada para tu taller en esta ubicación
            </div>
          ) : (
            <StyledSelect
              value={ie}
              onChange={setIe}
              placeholder="Selecciona tu institución educativa"
              options={iesFiltradas.map(r => r.nombre)}
            />
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all"
          style={{
            background: isComplete ? 'linear-gradient(135deg, #02d47e 0%, #00c16e 100%)' : '#e2e8f0',
            color: isComplete ? '#ffffff' : '#94a3b8',
            cursor: isComplete ? 'pointer' : 'not-allowed',
            boxShadow: isComplete ? '0 4px 14px rgba(2,193,120,0.35)' : 'none',
          }}
        >
          {isComplete ? 'Guardar mis datos →' : 'Completa todos los campos para continuar'}
        </button>
    </div>
  )
}
