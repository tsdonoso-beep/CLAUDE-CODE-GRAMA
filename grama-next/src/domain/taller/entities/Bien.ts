import type { ZonaId } from '@/domain/shared/types'

export type TipoBien = 'EQUIPOS' | 'HERRAMIENTAS' | 'MOBILIARIO' | 'MATERIAL PEDAGÓGICO' | 'EPP' | string

// Bien es un Value Object — identidad por codigoInterno
export interface Bien {
  readonly n: number
  readonly nombre: string
  readonly cantidad: number
  readonly zona: ZonaId | string
  readonly area: string
  readonly subarea: string
  readonly descripcion: string
  readonly usoPedagogico: string
  readonly marca?: string
  readonly modelo?: string
  readonly codigoEntidad?: string
  readonly codigoInterno?: string
  readonly tipo?: TipoBien
}

export interface BienesporTaller {
  readonly totalBienes: number
  readonly bienes: Bien[]
}
