-- ============================================================
-- GRAMA · Consultas de Docentes
-- Los docentes envían consultas desde su perfil; admins responden
-- ============================================================

create table if not exists public.consultas_docentes (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete cascade not null,
  nombre        text,                     -- nombre docente (denormalizado para admin)
  taller_slug   text,
  modulo        text not null,            -- 'ruta' | 'sesiones_vivo' | 'repositorio'
  mensaje       text not null,
  estado        text not null default 'pendiente'
                check (estado in ('pendiente', 'respondida')),
  respuesta     text,
  created_at    timestamptz default now(),
  responded_at  timestamptz,
  responded_by  text                      -- email del admin que respondió
);

create index if not exists consultas_user_idx   on public.consultas_docentes (user_id, created_at desc);
create index if not exists consultas_estado_idx on public.consultas_docentes (estado, created_at desc);

-- ── RLS ───────────────────────────────────────────────────────────────────────
alter table public.consultas_docentes enable row level security;

-- Docente: insertar sus propias
create policy "Docente inserta consulta" on public.consultas_docentes
  for insert with check (auth.uid() = user_id);

-- Docente: leer solo las suyas
create policy "Docente lee sus consultas" on public.consultas_docentes
  for select using (auth.uid() = user_id);

-- Admin: leer todas
create policy "Admin lee todas las consultas" on public.consultas_docentes
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Admin: responder (UPDATE estado + respuesta)
create policy "Admin responde consultas" on public.consultas_docentes
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
