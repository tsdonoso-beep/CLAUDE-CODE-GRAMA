// src/types/database.ts
// Re-exporta los tipos auto-generados por Lovable Cloud
export type { Database } from '@/integrations/supabase/types'
// Tipos derivados útiles
import type { Database } from '@/integrations/supabase/types'
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProgresoContenido = Database['public']['Tables']['progreso_contenidos']['Row']
export type QuizResultado = Database['public']['Tables']['quiz_resultados']['Row']
