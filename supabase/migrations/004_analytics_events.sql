-- Migration 004: Analytics event tables
-- Tracks logins, page navigation, and content interactions (manuals, videos, downloads)

-- ── eventos_sesion ─────────────────────────────────────────────────────────────
-- One row per login / session start
create table if not exists public.eventos_sesion (
  id          uuid primary key default gen_random_uuid(),
  usuario_id  uuid not null references auth.users(id) on delete cascade,
  taller_slug text,
  created_at  timestamptz not null default now()
);

alter table public.eventos_sesion enable row level security;

-- Docentes can only insert their own rows; admins can read all
create policy "docentes insertan sus sesiones"
  on public.eventos_sesion for insert
  with check (auth.uid() = usuario_id);

create policy "admins leen sesiones"
  on public.eventos_sesion for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── eventos_navegacion ────────────────────────────────────────────────────────
-- One row per page visit (taller_hub, repositorio, ruta_aprendizaje, modulo, perfil)
create table if not exists public.eventos_navegacion (
  id          uuid primary key default gen_random_uuid(),
  usuario_id  uuid not null references auth.users(id) on delete cascade,
  pagina      text not null,   -- 'taller_hub' | 'repositorio' | 'ruta_aprendizaje' | 'modulo' | 'perfil'
  taller_slug text,
  referrer    text,            -- página de origen, ej. 'perfil', 'ruta_aprendizaje', 'directo'
  created_at  timestamptz not null default now()
);

alter table public.eventos_navegacion enable row level security;

create policy "docentes insertan su navegacion"
  on public.eventos_navegacion for insert
  with check (auth.uid() = usuario_id);

create policy "admins leen navegacion"
  on public.eventos_navegacion for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── eventos_contenido ─────────────────────────────────────────────────────────
-- One row per content interaction (manual open, video play, download, ficha open)
create table if not exists public.eventos_contenido (
  id              uuid primary key default gen_random_uuid(),
  usuario_id      uuid not null references auth.users(id) on delete cascade,
  bien_id         text not null,   -- LXP content ID, e.g. "m1-s2-c3"
  bien_nombre     text not null,   -- Human-readable name for the Admin panel
  tipo_evento     text not null,   -- 'apertura_manual' | 'reproduccion_video' | 'descarga' | 'apertura_ficha'
  tipo_contenido  text not null,   -- 'manual' | 'video' | 'descargable' | 'ficha'
  taller_slug     text,
  created_at      timestamptz not null default now()
);

alter table public.eventos_contenido enable row level security;

create policy "docentes insertan sus eventos de contenido"
  on public.eventos_contenido for insert
  with check (auth.uid() = usuario_id);

create policy "admins leen eventos de contenido"
  on public.eventos_contenido for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── Indexes ────────────────────────────────────────────────────────────────────
create index if not exists idx_eventos_sesion_usuario    on public.eventos_sesion    (usuario_id);
create index if not exists idx_eventos_sesion_created    on public.eventos_sesion    (created_at desc);

create index if not exists idx_eventos_nav_usuario       on public.eventos_navegacion (usuario_id);
create index if not exists idx_eventos_nav_pagina        on public.eventos_navegacion (pagina);
create index if not exists idx_eventos_nav_created       on public.eventos_navegacion (created_at desc);

create index if not exists idx_eventos_cont_usuario      on public.eventos_contenido  (usuario_id);
create index if not exists idx_eventos_cont_bien         on public.eventos_contenido  (bien_id);
create index if not exists idx_eventos_cont_tipo_evento  on public.eventos_contenido  (tipo_evento);
create index if not exists idx_eventos_cont_created      on public.eventos_contenido  (created_at desc);
