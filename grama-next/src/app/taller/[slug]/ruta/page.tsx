import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'
import { staticModuloRepository }  from '@/infrastructure/static/StaticModuloRepository'
import { notFound } from 'next/navigation'
import type { TallerSlug } from '@/domain/shared/types'
import type { Metadata } from 'next'
import { RutaClient } from '@/presentation/features/taller/components/lxp/RutaClient'

export async function generateStaticParams() {
  return staticTallerRepository.getAll().map(t => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const taller = staticTallerRepository.getBySlug(slug as TallerSlug)
  return { title: taller ? `Ruta de Aprendizaje — ${taller.nombre}` : 'Ruta' }
}

export default async function RutaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const taller  = staticTallerRepository.getBySlug(slug as TallerSlug)
  if (!taller) notFound()

  const modulos = staticModuloRepository.getAll()

  return <RutaClient taller={taller} modulos={modulos} />
}
