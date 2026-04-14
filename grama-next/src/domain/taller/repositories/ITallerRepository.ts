import type { Taller } from '../entities/Taller'
import type { Bien, BienesporTaller } from '../entities/Bien'
import type { TallerSlug, ZonaId } from '@/domain/shared/types'

export interface ITallerRepository {
  getAll(): Taller[]
  getBySlug(slug: TallerSlug): Taller | null
}

export interface IBienRepository {
  getByTaller(slug: TallerSlug): BienesporTaller | null
  getByZona(slug: TallerSlug, zona: ZonaId | string): Bien[]
  getByN(slug: TallerSlug, n: number): Bien | null
  getZonas(slug: TallerSlug): string[]
}
