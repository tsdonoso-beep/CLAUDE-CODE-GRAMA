// TallerHub — Server Component
import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'
import { staticBienRepository }   from '@/infrastructure/static/StaticBienRepository'
import { TallerHubClient }        from '@/presentation/features/taller/components/hub/TallerHubClient'
import { notFound }               from 'next/navigation'
import type { TallerSlug }        from '@/domain/shared/types'

export async function generateStaticParams() {
  return staticTallerRepository.getAll().map(t => ({ slug: t.slug }))
}

export default async function TallerHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const taller = staticTallerRepository.getBySlug(slug as TallerSlug)
  if (!taller) notFound()

  const bienesData = staticBienRepository.getByTaller(slug as TallerSlug)
  const zonas      = staticBienRepository.getZonas(slug as TallerSlug)

  return (
    <TallerHubClient
      taller={taller}
      totalBienes={bienesData?.totalBienes ?? 0}
      zonas={zonas}
    />
  )
}
