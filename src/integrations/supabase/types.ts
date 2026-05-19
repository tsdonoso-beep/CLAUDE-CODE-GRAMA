// src/integrations/supabase/types.ts
// En Lovable Cloud este archivo es auto-generado con los tipos exactos del schema.
// Esta versión es compatible para desarrollo local.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: string | null
          taller_slug: string | null
          taller_slugs: string[] | null
          ie_id: string | null
          display_name: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          role?: string | null
          taller_slug?: string | null
          taller_slugs?: string[] | null
          ie_id?: string | null
          display_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: string | null
          taller_slug?: string | null
          taller_slugs?: string[] | null
          ie_id?: string | null
          display_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      progreso_contenidos: {
        Row: {
          id: string
          user_id: string
          taller_slug: string
          contenido_id: string
          tipo: string
          completado: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          taller_slug: string
          contenido_id: string
          tipo: string
          completado?: boolean
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          taller_slug?: string
          contenido_id?: string
          tipo?: string
          completado?: boolean
          created_at?: string | null
        }
      }
      quiz_resultados: {
        Row: {
          id: string
          user_id: string
          taller_slug: string
          modulo_id: string
          score: number
          total: number
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          taller_slug: string
          modulo_id: string
          score: number
          total: number
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          taller_slug?: string
          modulo_id?: string
          score?: number
          total?: number
          created_at?: string | null
        }
      }
      eventos_contenido: {
        Row: {
          id: string
          user_id: string
          taller_slug: string
          contenido_id: string
          tipo: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          taller_slug: string
          contenido_id: string
          tipo: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          taller_slug?: string
          contenido_id?: string
          tipo?: string
          created_at?: string | null
        }
      }
      eventos_navegacion: {
        Row: {
          id: string
          user_id: string
          path: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          path: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          path?: string
          created_at?: string | null
        }
      }
      eventos_sesion: {
        Row: {
          id: string
          user_id: string
          tipo: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          tipo: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          tipo?: string
          created_at?: string | null
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: Record<string, never>
  }
}
