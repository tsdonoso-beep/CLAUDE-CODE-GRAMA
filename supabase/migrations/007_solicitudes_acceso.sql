-- ============================================================
-- GRAMA · Solicitudes de Acceso
-- Captura formularios de registro externo para aprobación manual
-- ============================================================

create table if not exists public.solicitudes_acceso (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null,
  email         text not null,
  institucion   text,
  ie_id         integer,           -- FK lógico a ieData.ts (opcional)
  taller_slug   text,              -- taller de interés
  mensaje       text,              -- mensaje libre del solicitante
  estado        text not null default 'pendiente'
                check (estado in ('pendiente', 'aprobado', 'rechazado')),
  notas_admin   text,              -- notas internas del admin
  created_at    timestamptz default now(),
  reviewed_at   timestamptz,
  reviewed_by   text              -- email del admin que procesó
);

-- ── Índices ───────────────────────────────────────────────────
create index if not exists solicitudes_estado_idx
  on public.solicitudes_acceso (estado, created_at desc);

create index if not exists solicitudes_email_idx
  on public.solicitudes_acceso (email);

-- ── RLS ───────────────────────────────────────────────────────
alter table public.solicitudes_acceso enable row level security;

-- Solo admins pueden leer y modificar solicitudes
create policy "Admins gestionan solicitudes" on public.solicitudes_acceso
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- INSERT sin auth (formulario público — la row se crea anónimamente)
create policy "Inserción pública de solicitudes" on public.solicitudes_acceso
  for insert with check (true);
