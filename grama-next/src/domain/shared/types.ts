// ── Tipos compartidos entre dominios ─────────────────────────────────────────

export type Role = 'docente' | 'admin'

export type TallerSlug =
  | 'mecanica-automotriz'
  | 'industria-vestido'
  | 'cocina-reposteria'
  | 'ebanisteria'
  | 'computacion-informatica'
  | 'electronica'
  | 'industria-alimentaria'
  | 'electricidad'
  | 'construcciones-metalicas'
  | 'taller-general-ept'

export type ModuloId = 'M0' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'B1'

export type ZonaId =
  | 'ZONA DE INNOVACIÓN'
  | 'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO'
  | 'DEPÓSITO / ALMACÉN / SEGURIDAD'

export type TipoContenido =
  | 'VIDEO'
  | 'PDF'
  | 'INTERACTIVO'
  | 'QUIZ'
  | 'EN_VIVO'
  | 'DESCARGABLE'
  | 'ACTIVIDAD_PRACTICA'

export type EstadoModulo = 'bloqueado' | 'disponible' | 'en_curso' | 'completado'

export type EstadoContenido = 'no_iniciado' | 'en_progreso' | 'completado'
