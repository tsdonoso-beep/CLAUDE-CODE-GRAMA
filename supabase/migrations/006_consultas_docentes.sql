-- ============================================================
-- Migración 006: Consultas docentes
-- Sistema de atención al docente — preguntas y respuestas
-- ============================================================

CREATE TABLE IF NOT EXISTS public.consultas_docentes (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  taller_slug   text,
  modulo        text        NOT NULL DEFAULT 'general',
  mensaje       text        NOT NULL CHECK (char_length(mensaje) >= 10 AND char_length(mensaje) <= 500),
  estado        text        NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'respondida')),
  respuesta     text,
  respondido_por uuid       REFERENCES public.profiles(id),
  responded_at  timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS consultas_user_id_idx    ON public.consultas_docentes (user_id);
CREATE INDEX IF NOT EXISTS consultas_estado_idx     ON public.consultas_docentes (estado);
CREATE INDEX IF NOT EXISTS consultas_created_at_idx ON public.consultas_docentes (created_at DESC);

-- RLS
ALTER TABLE public.consultas_docentes ENABLE ROW LEVEL SECURITY;

-- Docente ve solo sus propias consultas
CREATE POLICY "docente_ver_sus_consultas"
  ON public.consultas_docentes FOR SELECT
  USING (auth.uid() = user_id);

-- Docente puede crear consultas
CREATE POLICY "docente_crear_consulta"
  ON public.consultas_docentes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin puede ver todas las consultas
CREATE POLICY "admin_ver_todas_consultas"
  ON public.consultas_docentes FOR SELECT
  USING (is_admin(auth.uid()));

-- Admin puede actualizar (responder) consultas
CREATE POLICY "admin_responder_consultas"
  ON public.consultas_docentes FOR UPDATE
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- ── Vista para admin ─────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.consultas_con_perfil AS
SELECT
  c.*,
  p.email          AS docente_email,
  p.role           AS docente_role
FROM public.consultas_docentes c
JOIN public.profiles p ON p.id = c.user_id;

COMMENT ON TABLE public.consultas_docentes IS
  'Consultas enviadas por docentes al equipo GRAMA desde la plataforma LXP.';
