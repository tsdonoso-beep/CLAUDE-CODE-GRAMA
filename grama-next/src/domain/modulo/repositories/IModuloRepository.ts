import type { Modulo } from '../entities/Modulo'
import type { ModuloId } from '@/domain/shared/types'

export interface IModuloRepository {
  getAll(): Modulo[]
  getById(id: ModuloId): Modulo | null
  getByNumero(numero: number): Modulo | null
}
