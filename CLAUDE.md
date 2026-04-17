# GRAMA LXP — Talleres Especializados TSF-MINEDU

## Stack
React 18 + TypeScript + Vite + Tailwind 3.4 + React Router 6 + Sonner toasts

## Repo & Branch
- Branch activa: `claude/analyze-md-generate-FnRSP`
- Siempre push a esa rama, nunca a main

## Estructura clave
```
src/
  data/
    modulosLXP.ts        ← curriculum (módulos, sesiones, contenidos)
    quizBanks.ts         ← bancos de quiz genéricos (todos los talleres)
    descargablesLXP.ts   ← documentos descargables
    talleresConfig.ts    ← slugs de talleres (ej: "mecanica-automotriz")
  pages/
    ModuloDetalle.tsx    ← página principal de contenido LXP
    Perfil.tsx
  components/lxp/
    interactivos/        ← modales interactivos por taller
    QuizBlock.tsx
    DescargableViewerModal.tsx
```

## Convenciones
- Modales: `fixed inset-0 z-50`, `backdropFilter: blur(4px)`, `useEscapeKey(onClose)`
- Colores: header `#043941`, accent `#02d47e`, texto oscuro `var(--grama-oscuro)`
- Props de modal: `onClose: () => void` + `onComplete: () => void` (llama `markContenidoCompleted(id)`)
- Quiz banco: `PreguntaQuiz[]` con campos `id, enunciado, opciones[], correcta, explicacion`
- Taller automotriz slug: `"mecanica-automotriz"`

## Pendientes automotriz

### 1. Quiz banks — `src/data/quizBancosMeca.ts`
Crear Record<string, PreguntaQuiz[]> con estos IDs y cantidades:
- `m0-s03-c5` → 8q (Google Workspace)
- `m0-s04-c4` → 6q (IA generativa: GPT/Claude/Gemini)
- `m0-s05-c5` → 6q (Gamma, Teachy, Polypad, Meshy)
- `m0-s06-c5` → 6q (Miró, Mural, Figma)
- `m0-ra1-c1` → 15q (Evaluación M0 general)
- `m1-s11-c3` → 10q (Metrado de equipos automotriz)
- `m1-s12-c2` → 10q (Instalación y softwares)
- `m1-s13-c3` → 8q (Seguridad EPP — bloqueante, mín 80%)
- `m1-s14-c2` → 8q (Garantías y do's/don'ts)
- `m1-ra2-c1` → 20q (Evaluación M1 — mín 80%)
- `m2-ra2-c1` → 20q (Evaluación M2 Zona Investigación)
- `m3-ra3-c1` → 20q (Evaluación M3 Zona Almacén)
- `m5-s51-c4` → 8q (Competencia docente 1)
- `m5-s53-c4` → 8q (Competencia docente 2)
- `m5-s55-c4` → 8q (Competencia docente 3)
- `m5-s57-c4` → 8q (Competencia docente 4)

Luego importar en ModuloDetalle.tsx e inyectar con:
```ts
const banco = slug === 'mecanica-automotriz' ? quizBancosMeca[contenido.id] : undefined
// pasar como bancoPreguntas al renderizar
```

### 2. Descargables automotriz M1 — `src/data/descargablesMeca.ts`
4 documentos tipo `DescargableLXP`:
- `desc-m1-meca-metrado` → Ficha de Metrado de Equipos
- `desc-m1-meca-instalacion` → Guía de Instalación de Equipos
- `desc-m1-meca-seguridad` → Protocolo de Seguridad del Taller
- `desc-m1-meca-garantias` → Guía de Garantías y Mantenimiento

Luego en `modulosLXP.ts` agregar `descargableId` a:
- `m1-s11-c4` → `desc-m1-meca-metrado`
- `m1-s12-c3` → `desc-m1-meca-instalacion`
- `m1-s13-c4` → `desc-m1-meca-seguridad`
- `m1-s14-c3` → `desc-m1-meca-garantias`
