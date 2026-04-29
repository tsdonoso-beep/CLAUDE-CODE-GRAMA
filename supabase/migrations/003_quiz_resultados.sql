-- ============================================================
-- GRAMA · Migración 003 — Tabla quiz_resultados
-- Almacena cada intento de quiz con respuestas y puntaje.
-- ============================================================

-- ── TABLA: quiz_resultados ────────────────────────────────────
create table if not exists public.quiz_resultados (
  id           uuid        default gen_random_uuid() primary key,
  usuario_id   uuid        references public.profiles(id) on delete cascade not null,
  contenido_id text        not null,      -- ej: "m1-s1-c5"
  intento      integer     not null,      -- 1, 2, 3…
  puntaje      integer     not null,      -- 0–100
  aprobado     boolean     not null,
  respuestas   jsonb       not null,      -- { "preguntaId": opcionIndex, … }
  created_at   timestamptz default now()
);

-- Índice para consultas por usuario
create index if not exists quiz_resultados_usuario_idx
  on public.quiz_resultados (usuario_id, contenido_id);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
alter table public.quiz_resultados enable row level security;

-- Docentes: solo leen/insertan sus propios resultados
create policy "Quiz propio legible" on public.quiz_resultados
  for select using (auth.uid() = usuario_id);

create policy "Quiz propio insertable" on public.quiz_resultados
  for insert with check (auth.uid() = usuario_id);

-- Admins: leen todo
create policy "Admins leen todos los quiz" on public.quiz_resultados
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ── VISTA AMIGABLE PARA CSV ───────────────────────────────────
-- Expande quiz_resultados con datos del docente (igual que vista_progreso_docentes)
create or replace view public.vista_quiz_resultados
  with (security_invoker = true)
as
select
  p.nombre_completo                           as "Docente",
  p.email                                     as "Correo",
  coalesce(p.taller_slug, '—')               as "Taller",
  qr.contenido_id                             as "Quiz ID",
  'Módulo ' || substring(qr.contenido_id from 2 for 1) as "Módulo",
  qr.intento                                  as "Intento N°",
  qr.puntaje                                  as "Puntaje (%)",
  case qr.aprobado
    when true  then 'Aprobado ✓'
    else            'Reprobado ✗'
  end                                         as "Resultado",
  qr.respuestas                               as "Respuestas (JSON)",
  to_char(
    qr.created_at at time zone 'America/Lima',
    'DD/MM/YYYY HH24:MI'
  )                                           as "Fecha (Lima)"
from public.quiz_resultados qr
join public.profiles         p  on p.id = qr.usuario_id
order by p.nombre_completo, qr.contenido_id, qr.intento;
