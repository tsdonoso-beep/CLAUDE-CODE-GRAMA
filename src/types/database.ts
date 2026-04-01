// src/types/database.ts
// Tipos TypeScript para las tablas de Supabase

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          nombre_completo: string
          role: 'docente' | 'admin'
          ie_id: number | null
          taller_slug: string | null
          taller_slugs: string[] | null
          created_at: string
          last_seen_at: string
        }
        Insert: {
          id: string
          email: string
          nombre_completo: string
          role?: 'docente' | 'admin'
          ie_id?: number | null
          taller_slug?: string | null
          taller_slugs?: string[] | null
          created_at?: string
          last_seen_at?: string
        }
        Update: {
          nombre_completo?: string
          role?: 'docente' | 'admin'
          ie_id?: number | null
          taller_slug?: string | null
          taller_slugs?: string[] | null
          last_seen_at?: string
        }
      }
      progreso_contenidos: {
        Row: {
          usuario_id: string
          contenido_id: string
          estado: 'completado' | 'en_progreso'
          updated_at: string
        }
        Insert: {
          usuario_id: string
          contenido_id: string
          estado: 'completado' | 'en_progreso'
          updated_at?: string
        }
        Update: {
          estado?: 'completado' | 'en_progreso'
          updated_at?: string
        }
      }
      quiz_resultados: {
        Row: {
          id: string
          usuario_id: string
          contenido_id: string
          intento: number
          puntaje: number
          aprobado: boolean
          respuestas: Record<string, number>
          created_at: string
        }
        Insert: {
          usuario_id: string
          contenido_id: string
          intento: number
          puntaje: number
          aprobado: boolean
          respuestas: Record<string, number>
        }
      }
      // ── Analytics ──────────────────────────────────────────────────────────
      eventos_sesion: {
        Row: {
          id: string
          usuario_id: string
          taller_slug: string | null
          created_at: string
        }
        Insert: {
          usuario_id: string
          taller_slug?: string | null
          created_at?: string
        }
      }
      eventos_navegacion: {
        Row: {
          id: string
          usuario_id: string
          pagina: string           // 'taller_hub' | 'repositorio' | 'ruta_aprendizaje' | 'modulo' | 'perfil'
          taller_slug: string | null
          referrer: string | null  // página anterior ('perfil', 'ruta_aprendizaje', 'directo')
          created_at: string
        }
        Insert: {
          usuario_id: string
          pagina: string
          taller_slug?: string | null
          referrer?: string | null
          created_at?: string
        }
      }
      eventos_contenido: {
        Row: {
          id: string
          usuario_id: string
          bien_id: string
          bien_nombre: string
          tipo_evento: string      // 'apertura_manual' | 'reproduccion_video' | 'descarga' | 'apertura_ficha'
          tipo_contenido: string   // 'manual' | 'video' | 'descargable' | 'ficha'
          taller_slug: string | null
          created_at: string
        }
        Insert: {
          usuario_id: string
          bien_id: string
          bien_nombre: string
          tipo_evento: string
          tipo_contenido: string
          taller_slug?: string | null
          created_at?: string
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Tipos derivados útiles
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProgresoContenido = Database['public']['Tables']['progreso_contenidos']['Row']
export type QuizResultado = Database['public']['Tables']['quiz_resultados']['Row']
