import type { TallerSlug } from '@/domain/shared/types'

export interface Zona {
  id: string
  nombre: string
  descripcion: string
}

export interface Taller {
  readonly id: TallerSlug
  readonly slug: TallerSlug
  readonly nombre: string
  readonly nombreCorto: string
  readonly numero: number
  readonly descripcion: string
  readonly competencias: string[]
  readonly color: string         // HSL string para accent dinámico
  readonly icon: string          // nombre de icono Lucide
  readonly imagen: string        // URL imagen hero
  readonly zonas: Zona[]
}
