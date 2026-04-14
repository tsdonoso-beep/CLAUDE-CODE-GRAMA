// Hub / Dashboard — Server Component
// Datos estáticos de talleres en servidor; progreso en cliente
import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'
import { HubClient } from '@/presentation/features/auth/components/HubClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mis Talleres' }

export default function HubPage() {
  const talleres = staticTallerRepository.getAll()
  return <HubClient talleres={talleres} />
}
