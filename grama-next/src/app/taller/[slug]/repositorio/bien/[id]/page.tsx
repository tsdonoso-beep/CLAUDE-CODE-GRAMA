// BienDetalle — Server Component
import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'
import { staticBienRepository }   from '@/infrastructure/static/StaticBienRepository'
import { BienDetalleClient }      from '@/presentation/features/repositorio/components/BienDetalleClient'
import { notFound }               from 'next/navigation'
import type { TallerSlug }        from '@/domain/shared/types'
import type { Metadata }          from 'next'

export async function generateStaticParams() {
  const talleres = staticTallerRepository.getAll()
  const params: { slug: string; id: string }[] = []
  for (const t of talleres) {
    const data = staticBienRepository.getByTaller(t.slug)
    data?.bienes.forEach(b => params.push({ slug: t.slug, id: String(b.n) }))
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; id: string }> }): Promise<Metadata> {
  const { slug, id } = await params
  const bien = staticBienRepository.getByN(slug as TallerSlug, Number(id))
  return { title: bien?.nombre ?? 'Bien' }
}

export default async function BienDetallePage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params
  const taller = staticTallerRepository.getBySlug(slug as TallerSlug)
  const bien   = staticBienRepository.getByN(slug as TallerSlug, Number(id))
  if (!taller || !bien) notFound()

  // Bienes relacionados (misma zona, top 4)
  const relacionados = staticBienRepository
    .getByZona(slug as TallerSlug, bien.zona)
    .filter(b => b.n !== bien.n)
    .slice(0, 4)

  return (
    <BienDetalleClient
      taller={taller}
      bien={bien}
      relacionados={relacionados}
    />
  )
}
