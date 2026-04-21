-- ============================================================
-- GRAMA · Admin puede crear y editar cualquier perfil
-- ============================================================

-- Columna taller_slugs (multi-taller) si no existe
alter table public.profiles
  add column if not exists taller_slugs text[];

-- Admin puede UPDATE cualquier perfil (ej: cambiar role, ie_id, talleres)
create policy if not exists "Admins actualizan cualquier perfil"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin puede INSERT perfiles de forma manual (por si el trigger no alcanza)
create policy if not exists "Admins insertan perfiles"
  on public.profiles for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
