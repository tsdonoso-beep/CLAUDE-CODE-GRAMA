// src/hooks/useTaller.ts
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { talleresConfig, getTallerBySlug, type TallerConfig } from '@/data/talleresConfig'
import bienesData from '@/data/talleres-bienes.json'

interface UseTallerReturn {
  taller: TallerConfig | undefined
  slug: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bienes: any[]
  totalBienes: number
  allTalleres: TallerConfig[]
}

export function useTaller(): UseTallerReturn {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const taller = slug ? getTallerBySlug(slug) : undefined

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tallerData = slug ? (bienesData as any)[slug] : undefined
  const bienes = tallerData?.bienes ?? []
  const totalBienes = tallerData?.totalBienes ?? 0

  useEffect(() => {
    if (slug && !taller) {
      navigate('/404', { replace: true })
    }
  }, [slug, taller, navigate])

  return {
    taller,
    slug,
    bienes,
    totalBienes,
    allTalleres: talleresConfig,
  }
}
