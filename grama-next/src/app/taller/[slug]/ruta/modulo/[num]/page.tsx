// ModuloDetalle — Server Component
import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'
import { staticModuloRepository }  from '@/infrastructure/static/StaticModuloRepository'
import { ModuloDetalleClient }     from '@/presentation/features/taller/components/lxp/ModuloDetalleClient'
import { notFound }                from 'next/navigation'
import type { TallerSlug }         from '@/domain/shared/types'
import type { Metadata }           from 'next'

export async function generateStaticParams() {
  const talleres = staticTallerRepository.getAll()
  const modulos  = staticModuloRepository.getAll()
  const params: { slug: string; num: string }[] = []
  for (const t of talleres) {
    modulos.forEach(m => params.push({ slug: t.slug, num: String(m.numero) }))
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; num: string }>
}): Promise<Metadata> {
  const { slug, num } = await params
  const taller  = staticTallerRepository.getBySlug(slug as TallerSlug)
  const modulo  = staticModuloRepository.getByNumero(Number(num))
  if (!taller || !modulo) return { title: 'Módulo' }
  return { title: `M${modulo.numero} ${modulo.nombre} — ${taller.nombre}` }
}

export default async function ModuloDetallePage({
  params,
}: {
  params: Promise<{ slug: string; num: string }>
}) {
  const { slug, num } = await params
  const taller  = staticTallerRepository.getBySlug(slug as TallerSlug)
  const modulo  = staticModuloRepository.getByNumero(Number(num))
  if (!taller || !modulo) notFound()

  const allModulos = staticModuloRepository.getAll()

  return (
    <ModuloDetalleClient
      taller={taller}
      modulo={modulo}
      allModulos={allModulos}
    />
  )
}
