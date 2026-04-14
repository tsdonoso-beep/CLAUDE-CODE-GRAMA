import type { ModuloId, TipoContenido, EstadoModulo } from '@/domain/shared/types'

export type FaseLXP =
  | 'diagnostico'
  | 'orientacion'
  | 'apropiacion'
  | 'aplicacion'
  | 'proyecto'
  | 'acompanamiento'

export type ModalidadContenido = 'asincrono' | 'sincrono' | 'presencial'

export interface PreguntaQuiz {
  id: string
  enunciado: string
  opciones: string[]
  correcta: number
  explicacion: string
}

export interface Contenido {
  readonly id: string
  readonly tipo: TipoContenido
  readonly modalidad: ModalidadContenido
  readonly titulo: string
  readonly descripcion: string
  readonly duracionMin: number
  readonly paginas?: number
  readonly urlVideo?: string
  readonly urlPDF?: string
  readonly urlInteractivo?: string
  readonly urlVivo?: string
  readonly urlActividad?: string
  readonly fechaSesion?: string
  readonly bancoPreguntas?: PreguntaQuiz[]
  readonly puntajeMinimo?: number
  readonly bloqueaSiguiente?: boolean
  readonly esActividad?: boolean
  readonly recursosRepositorio?: string[]
  readonly manualId?: string
  readonly descargableId?: string
}

export interface SubSeccion {
  readonly id: string
  readonly numero: number
  readonly titulo: string
  readonly descripcion: string
  readonly colorAccent?: string
  readonly phaseBadge?: string
  readonly contenidos: Contenido[]
}

export interface Modulo {
  readonly numero: number
  readonly id: ModuloId
  readonly nombre: string
  readonly descripcion: string
  readonly fase: FaseLXP
  readonly horasTotal: number
  readonly horasAsincrono: number
  readonly horasPresencial: number
  readonly subSecciones: SubSeccion[]
}

// Value Object para estado de módulo
export interface EstadoModuloVO {
  readonly moduloId: ModuloId
  readonly estado: EstadoModulo
  readonly porcentaje: number
  readonly completados: number
  readonly total: number
}
