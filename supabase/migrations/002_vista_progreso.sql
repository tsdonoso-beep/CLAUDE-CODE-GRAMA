-- ============================================================
-- GRAMA · Migración 002 — Vista de progreso legible para CSV
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── VISTA: vista_progreso_docentes ───────────────────────────
-- Une progreso_contenidos con profiles para exportar CSVs
-- amigables desde el Dashboard (Export CSV button).
-- Acceso:
--   · Admins  → ven todos los registros (vía policies existentes)
--   · Docentes → solo ven sus propios registros
-- ─────────────────────────────────────────────────────────────
create or replace view public.vista_progreso_docentes
  with (security_invoker = true)     -- respeta RLS de las tablas base
as
select
  -- ── Datos del docente ──────────────────────────────────────
  p.nombre_completo                           as "Docente",
  p.email                                     as "Correo",

  -- ── Institución educativa ──────────────────────────────────
  coalesce(p.ie_id::text, '—')               as "IE (código)",

  -- ── Taller asignado ───────────────────────────────────────
  coalesce(p.taller_slug, '—')               as "Taller",

  -- ── Contenido ─────────────────────────────────────────────
  pc.contenido_id                             as "Contenido ID",

  -- Módulo legible: m0 → Módulo 0, m1 → Módulo 1 …
  'Módulo ' || substring(pc.contenido_id from 2 for 1) as "Módulo",

  -- Sección: extrae "s1", "s2" … del ID (ej: m0-s1-c2)
  case
    when pc.contenido_id ~ 'm\d+-s(\d+)-'
    then 'Sección ' || (regexp_match(pc.contenido_id, 's(\d+)'))[1]
    else '—'
  end                                         as "Sección",

  -- Estado en español
  case pc.estado
    when 'completado'  then 'Completado ✓'
    when 'en_progreso' then 'En progreso …'
    else pc.estado
  end                                         as "Estado",

  -- Fecha formateada en hora Lima (UTC−5)
  to_char(
    pc.updated_at at time zone 'America/Lima',
    'DD/MM/YYYY HH24:MI'
  )                                           as "Última actividad (Lima)"

from public.progreso_contenidos pc
join public.profiles             p  on p.id = pc.usuario_id

order by p.nombre_completo, pc.contenido_id;

-- ── Comentario de uso ─────────────────────────────────────────
-- Para exportar desde el Dashboard:
--   Database → Table Editor → (cambia a "vista_progreso_docentes") → Export CSV
-- También exportable desde SQL Editor:
--   SELECT * FROM vista_progreso_docentes;
-- ─────────────────────────────────────────────────────────────
