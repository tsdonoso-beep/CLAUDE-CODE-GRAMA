import type { Role, TallerSlug, EstadoContenido } from '@/domain/shared/types'

export interface Docente {
  readonly id: string
  readonly email: string
  readonly nombreCompleto: string | null
  readonly role: Role
  readonly ieId: string | null
  readonly tallerSlug: TallerSlug | null
  readonly tallerSlugs: TallerSlug[]
  readonly createdAt: string
  readonly lastSeenAt: string | null
}

export interface Progreso {
  readonly usuarioId: string
  readonly contenidoId: string
  readonly estado: EstadoContenido
  readonly updatedAt: string
}

export interface ConsultaDocente {
  readonly id: string
  readonly userId: string
  readonly tallerSlug: TallerSlug | null
  readonly modulo: string
  readonly mensaje: string
  readonly estado: 'pendiente' | 'respondida'
  readonly respuesta?: string
  readonly respondidoPor?: string
  readonly respondedAt?: string
  readonly createdAt: string
}
