-- ============================================================
-- GRAMA · Plataforma EPT · Esquema inicial Supabase
-- Lovable: ejecutar este migration después de crear el proyecto
-- ============================================================

-- ── 1. TABLA PROFILES ────────────────────────────────────────
-- Extiende auth.users con datos del docente
create table if not exists public.profiles (
  id              uuid references auth.users(id) on delete cascade primary key,
  email           text not null,
  nombre_completo text not null,
  role            text not null default 'docente'
                  check (role in ('docente', 'admin')),
  ie_id           integer,        -- FK lógico a ieData.ts (INSTITUCIONES_EDUCATIVAS)
  taller_slug     text,           -- slug del taller asignado
  created_at      timestamptz default now(),
  last_seen_at    timestamptz default now()
);

-- ── 2. TABLA PROGRESO_CONTENIDOS ─────────────────────────────
-- Registra el estado de cada contenido por usuario
create table if not exists public.progreso_contenidos (
  usuario_id   uuid references public.profiles(id) on delete cascade not null,
  contenido_id text not null,     -- ID del contenido (ej: "m1-intro-video")
  estado       text not null
               check (estado in ('completado', 'en_progreso')),
  updated_at   timestamptz default now(),
  primary key (usuario_id, contenido_id)
);

-- ── 3. ROW LEVEL SECURITY ────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.progreso_contenidos enable row level security;

-- Profiles: cada usuario lee/edita su propio perfil; admins leen todos
create policy "Perfil propio legible" on public.profiles
  for select using (auth.uid() = id);

create policy "Perfil propio editable" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins leen todos los perfiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Progreso: cada usuario CRUD en sus propios registros; admins solo lectura
create policy "Progreso propio" on public.progreso_contenidos
  for all using (auth.uid() = usuario_id);

create policy "Admins leen todo el progreso" on public.progreso_contenidos
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ── 4. TRIGGER: crear perfil automáticamente al registrarse ──
create or replace function public.handle_new_user()
returns trigger
security definer set search_path = public
language plpgsql as $$
declare
  _admin_emails text[] := array['camila.gr@inroprin.com', 't.donoso@inroprin.com'];
  _role         text   := 'docente';
begin
  -- Asignar rol admin a los correos definidos
  if new.email = any(_admin_emails) then
    _role := 'admin';
  end if;

  insert into public.profiles (
    id, email, nombre_completo, role, ie_id, taller_slug
  ) values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'nombre_completo',
      split_part(new.email, '@', 1)
    ),
    _role,
    nullif(new.raw_user_meta_data->>'ie_id', '')::integer,
    nullif(new.raw_user_meta_data->>'taller_slug', '')
  );
  return new;
end;
$$;

-- Crear trigger (drop first para idempotencia)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── 5. ACTUALIZAR last_seen_at al hacer login ─────────────────
create or replace function public.handle_user_login()
returns trigger
security definer set search_path = public
language plpgsql as $$
begin
  update public.profiles
  set last_seen_at = now()
  where id = new.id;
  return new;
end;
$$;

-- ── 6. SEED: si los admins ya existen en auth, actualizar rol ──
-- Ejecutar manualmente si las cuentas admin fueron creadas antes:
-- update public.profiles
--   set role = 'admin'
--   where email in ('camila.gr@inroprin.com', 't.donoso@inroprin.com');

-- ── NOTAS PARA LOVABLE ────────────────────────────────────────
-- 1. En Supabase Dashboard > Authentication > Settings:
--    - Desactivar "Email Confirmations" para el MVP inicial
--    - Configurar Resend como proveedor SMTP cuando esté listo el onboarding
-- 2. Las env vars necesarias en el proyecto:
--    VITE_SUPABASE_URL=https://<project>.supabase.co
--    VITE_SUPABASE_ANON_KEY=<anon-key>
