import type { Docente, Progreso, ConsultaDocente } from '../entities/Docente'
import type { EstadoContenido } from '@/domain/shared/types'

export interface IDocenteRepository {
  getById(id: string): Promise<Docente | null>
  getByEmail(email: string): Promise<Docente | null>
  updateLastSeen(id: string): Promise<void>
}

export interface IProgresoRepository {
  getByUsuario(usuarioId: string): Promise<Progreso[]>
  upsert(usuarioId: string, contenidoId: string, estado: EstadoContenido): Promise<void>
  bulkUpsert(registros: Omit<Progreso, 'updatedAt'>[]): Promise<void>
}

export interface IConsultaRepository {
  getByUsuario(usuarioId: string): Promise<ConsultaDocente[]>
  create(consulta: Omit<ConsultaDocente, 'id' | 'createdAt'>): Promise<ConsultaDocente>
}
