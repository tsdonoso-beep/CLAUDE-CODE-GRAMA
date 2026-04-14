import type { TallerSlug, ModuloId } from '@/domain/shared/types'
import type { Modulo, SubSeccion, Contenido } from '@/domain/modulo/entities/Modulo'
import { modulosLXP, type ModuloLXP, type SubSeccionLXP, type ContenidoLXP } from './data/modulosLXP'

// ── Adapter: raw LXP data → domain entities ──────────────────────────────────

function adaptContenido(c: ContenidoLXP): Contenido {
  return {
    id:                  c.id,
    tipo:                c.tipo as Contenido['tipo'],
    modalidad:           c.modalidad,
    titulo:              c.titulo,
    descripcion:         c.descripcion,
    duracionMin:         c.duracionMin ?? 0,
    paginas:             c.paginas,
    urlVideo:            c.urlVideo,
    urlPDF:              c.urlPDF,
    urlInteractivo:      c.urlInteractivo,
    urlVivo:             c.urlVivo,
    urlActividad:        c.urlActividad,
    fechaSesion:         c.fechaSesion,
    bancoPreguntas:      c.bancoPreguntas?.map(q => ({
      id:         q.id,
      enunciado:  q.enunciado,
      opciones:   q.opciones,
      correcta:   q.correcta,
      explicacion: q.explicacion ?? '',
    })),
    puntajeMinimo:       c.puntajeMinimo,
    bloqueaSiguiente:    c.bloqueaSiguiente,
    esActividad:         c.esActividad,
    recursosRepositorio: c.recursosRepositorio,
    manualId:            c.manualId,
    descargableId:       c.descargableId,
  }
}

function adaptSubSeccion(s: SubSeccionLXP): SubSeccion {
  return {
    id:          s.id,
    numero:      parseFloat(s.numero),
    titulo:      s.titulo,
    descripcion: s.descripcion ?? '',
    colorAccent: s.colorAccent,
    phaseBadge:  s.phaseBadge,
    contenidos:  s.contenidos.map(adaptContenido),
  }
}

function adaptModulo(m: ModuloLXP): Modulo {
  return {
    numero:          m.numero,
    id:              m.id as ModuloId,
    nombre:          m.nombre,
    descripcion:     m.descripcion,
    fase:            m.fase,
    horasTotal:      m.horasTotal,
    horasAsincrono:  m.horasAsincrono,
    horasPresencial: m.horasPresencial,
    subSecciones:    m.subSecciones.map(adaptSubSeccion),
  }
}

// ── The modulos data is shared across all talleres ────────────────────────────
const MODULOS: Modulo[] = modulosLXP.map(adaptModulo)

// ── Repository ────────────────────────────────────────────────────────────────

class StaticModuloRepositoryImpl {
  /** All 7 modules (M0–M6), same curriculum for all talleres */
  getAll(_tallerSlug?: TallerSlug): Modulo[] {
    return MODULOS
  }

  /** Get a single module by number (0–6) */
  getByNumero(numero: number): Modulo | undefined {
    return MODULOS.find(m => m.numero === numero)
  }

  /** Get a module by id ("m0"–"m6") */
  getById(id: ModuloId): Modulo | undefined {
    return MODULOS.find(m => m.id === id)
  }

  /** Total content count for a module */
  getTotalContenidos(numero: number): number {
    const mod = this.getByNumero(numero)
    if (!mod) return 0
    return mod.subSecciones.reduce((sum, s) => sum + s.contenidos.length, 0)
  }
}

export const staticModuloRepository = new StaticModuloRepositoryImpl()
