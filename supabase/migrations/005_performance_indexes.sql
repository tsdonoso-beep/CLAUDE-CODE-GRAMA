-- Migration 005: Performance indexes
-- Composite indexes for the most common query patterns in the Admin analytics panel
-- and progress tracking. All use IF NOT EXISTS to be safe on re-runs.

-- ── Analytics: filtros combinados más frecuentes ───────────────────────────────

-- Admin filtra por usuario + ordena por fecha (panel de docente individual)
create index if not exists idx_sesion_usuario_fecha
  on public.eventos_sesion (usuario_id, created_at desc);

-- Admin filtra por taller + ordena por fecha (agregaciones por taller)
create index if not exists idx_sesion_taller_fecha
  on public.eventos_sesion (taller_slug, created_at desc);

-- Navegación: usuario + fecha (timeline de un docente)
create index if not exists idx_nav_usuario_fecha
  on public.eventos_navegacion (usuario_id, created_at desc);

-- Navegación: taller + página (qué secciones visita más cada taller)
create index if not exists idx_nav_taller_pagina
  on public.eventos_navegacion (taller_slug, pagina);

-- Navegación: página + referrer (análisis de flujo de navegación)
create index if not exists idx_nav_pagina_referrer
  on public.eventos_navegacion (pagina, referrer);

-- Contenido: usuario + fecha (actividad reciente de un docente)
create index if not exists idx_cont_usuario_fecha
  on public.eventos_contenido (usuario_id, created_at desc);

-- Contenido: bien_id + tipo_evento (top contenidos por interacción)
create index if not exists idx_cont_bien_evento
  on public.eventos_contenido (bien_id, tipo_evento);

-- Contenido: taller + fecha (actividad de contenido por taller)
create index if not exists idx_cont_taller_fecha
  on public.eventos_contenido (taller_slug, created_at desc);

-- ── Progreso: queries del ProgressContext ─────────────────────────────────────

-- La query principal: todos los registros de un usuario (carga inicial)
-- estado ya está indexado implícitamente por la PK, pero el filtro por usuario_id
-- con todos sus contenidos es el patrón más frecuente.
create index if not exists idx_progreso_usuario_estado
  on public.progreso_contenidos (usuario_id, estado);

-- ── Profiles: rol de admin (usado en RLS policies de analytics) ───────────────
-- Evita seq-scan en cada evaluación de policy RLS de SELECT en analytics tables
create index if not exists idx_profiles_role
  on public.profiles (role)
  where role = 'admin';
