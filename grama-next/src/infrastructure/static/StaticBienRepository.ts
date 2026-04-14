/**
 * Repositorio estático de bienes.
 * Lee talleres-bienes.json en servidor — zero JS al cliente.
 * El JSON original se copia a src/infrastructure/static/data/
 */
import type { IBienRepository } from '@/domain/taller/repositories/ITallerRepository'
import type { Bien, BienesporTaller } from '@/domain/taller/entities/Bien'
import type { TallerSlug, ZonaId } from '@/domain/shared/types'

// Importación tipo JSON (Next.js resuelve en build time)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rawData = require('./data/talleres-bienes.json') as Record<string, BienesporTaller>

class StaticBienRepositoryImpl implements IBienRepository {
  getByTaller(slug: TallerSlug): BienesporTaller | null {
    return rawData[slug] ?? null
  }

  getByZona(slug: TallerSlug, zona: ZonaId | string): Bien[] {
    const taller = rawData[slug]
    if (!taller) return []
    return taller.bienes.filter(b => b.zona === zona)
  }

  getByN(slug: TallerSlug, n: number): Bien | null {
    const taller = rawData[slug]
    if (!taller) return null
    return taller.bienes.find(b => b.n === n) ?? null
  }

  getZonas(slug: TallerSlug): string[] {
    const taller = rawData[slug]
    if (!taller) return []
    return [...new Set(taller.bienes.map(b => b.zona))].filter(Boolean)
  }
}

export const staticBienRepository: IBienRepository = new StaticBienRepositoryImpl()
