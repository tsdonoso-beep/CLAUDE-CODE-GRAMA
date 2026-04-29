// src/lib/supabase.ts
// Re-exporta el cliente único generado por Lovable Cloud
// IMPORTANTE: No crear otro createClient — causa "Multiple GoTrueClient instances"
export { supabase } from '@/integrations/supabase/client'
