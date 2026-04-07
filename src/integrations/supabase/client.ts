// src/integrations/supabase/client.ts
// En Lovable Cloud este archivo es auto-generado con las credenciales reales.
// Para desarrollo local usa las variables de entorno de .env

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
