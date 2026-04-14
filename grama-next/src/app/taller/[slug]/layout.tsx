import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'
import { AppShell } from '@/presentation/shared/layout/AppShell'
import { notFound } from 'next/navigation'
import type { TallerSlug } from '@/domain/shared/types'

// Pre-renderiza las 10 páginas de taller en build time
export async function generateStaticParams() {
  return staticTallerRepository.getAll().map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const taller = staticTallerRepository.getBySlug(slug as TallerSlug)
  if (!taller) return { title: 'Taller no encontrado' }
  return {
    title: taller.nombre,
    description: taller.descripcion,
  }
}

export default async function TallerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const taller = staticTallerRepository.getBySlug(slug as TallerSlug)
  if (!taller) notFound()

  return (
    <AppShell taller={taller}>
      {children}
    </AppShell>
  )
}
