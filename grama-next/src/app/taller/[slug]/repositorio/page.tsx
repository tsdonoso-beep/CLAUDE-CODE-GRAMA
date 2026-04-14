// Repositorio — Server Component (datos en servidor)
import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'
import { staticBienRepository }   from '@/infrastructure/static/StaticBienRepository'
import { RepositorioClient }      from '@/presentation/features/repositorio/components/RepositorioClient'
import { notFound }               from 'next/navigation'
import type { TallerSlug }        from '@/domain/shared/types'
import type { Metadata }          from 'next'

export async function generateStaticParams() {
  return staticTallerRepository.getAll().map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const taller = staticTallerRepository.getBySlug(slug as TallerSlug)
  return { title: taller ? `Repositorio · ${taller.nombre}` : 'Repositorio' }
}

export default async function RepositorioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const taller     = staticTallerRepository.getBySlug(slug as TallerSlug)
  if (!taller) notFound()

  const bienesData = staticBienRepository.getByTaller(slug as TallerSlug)
  const zonas      = staticBienRepository.getZonas(slug as TallerSlug)

  return (
    <RepositorioClient
      taller={taller}
      bienes={bienesData?.bienes ?? []}
      zonas={zonas}
    />
  )
}
