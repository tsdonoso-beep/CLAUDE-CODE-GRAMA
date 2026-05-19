# INTERACTIVOS CLAUDE — Taller Mecánica Automotriz

Archivo de referencia para implementación por etapas. Ejecutar en orden.

---

## ETAPA 1 — `src/data/quizBancosMeca.ts` (crear)

Tipo: `Record<string, PreguntaQuiz[]>` importando `PreguntaQuiz` desde `./modulosLXP`

### Bancos M0 (herramientas digitales)
| ID | Preguntas | Tema |
|----|-----------|------|
| `m0-s03-c5` | 8 | Google Workspace: Docs, Sheets, Calendar, Tasks aplicados al taller automotriz |
| `m0-s04-c4` | 6 | IA generativa: diseño de prompts con GPT, Claude, Gemini para docentes |
| `m0-s05-c5` | 6 | Herramientas IA creativas: Gamma, Teachy, Polypad, Meshy |
| `m0-s06-c5` | 6 | Ideación colaborativa: Miró, Mural, Figma |
| `m0-ra1-c1` | 15 | Evaluación M0 general (síntesis de las 4 sesiones) — puntajeMinimo: 70 |

### Bancos M1 (taller automotriz)
| ID | Preguntas | Tema | Notas |
|----|-----------|------|-------|
| `m1-s11-c3` | 10 | Metrado de equipos: clasificación por zona (Investigación/Innovación/Almacén), ficha técnica, código bien MINEDU | |
| `m1-s12-c2` | 10 | Instalación de equipos y softwares de diagnóstico automotriz (LAUNCH, OBD-II, drivers) | |
| `m1-s13-c3` | 8 | Seguridad EPP: guantes, lentes, overol, elevadores, fluidos, emergencias | **bloqueaSiguiente: true, puntajeMinimo: 80** |
| `m1-s14-c2` | 8 | Garantías: do's/don'ts, qué anula la garantía, cómo reportar fallas en garantía | |
| `m1-ra2-c1` | 20 | Evaluación M1 global (arquitectura, metrado, instalación, seguridad, garantías) — puntajeMinimo: 80 | |

### Bancos M2/M3 (zonas del taller)
| ID | Preguntas | Tema |
|----|-----------|------|
| `m2-ra2-c1` | 20 | Evaluación M2 Zona Investigación: scanner OBD, multímetro, osciloscopio, interpretación de códigos de falla |
| `m3-ra3-c1` | 20 | Evaluación M3 Zona Almacén: PEPS, 5S, herramientas, consumibles automotrices, calibración |

### Bancos M5 (competencias docentes)
| ID | Preguntas | Tema |
|----|-----------|------|
| `m5-s51-c4` | 8 | Competencia 1: planificación por competencias en el taller automotriz |
| `m5-s53-c4` | 8 | Competencia 2: metodologías activas (ABP, ABPr) en el taller automotriz |
| `m5-s55-c4` | 8 | Competencia 3: evaluación por competencias (rúbricas, listas de cotejo) |
| `m5-s57-c4` | 8 | Competencia 4: gestión pedagógica del taller automotriz |

### Criterios pedagógicos para TODAS las preguntas
- Distribución Bloom: 25% Recordar/Comprender · 40% Aplicar · 35% Analizar/Evaluar
- Contexto: siempre situado en el taller de mecánica automotriz (no abstracto)
- Cada pregunta: 4 opciones, `correcta` es índice 0-based, incluir `explicacion`
- Evitar preguntas de trivia — priorizar escenarios de decisión real del docente

---

## ETAPA 2 — `src/data/descargablesMeca.ts` (crear)

Tipo: `DescargableLXP[]` importando `DescargableLXP` desde `./descargablesLXP`

| ID | Tipo | Formato | Páginas | Descripción |
|----|------|---------|---------|-------------|
| `desc-m1-meca-metrado` | `FICHA_PLASTIFICABLE` | A4 | 4 | Ficha de metrado por equipo: datos técnicos, zona asignada, estado operativo, campos automotrices (voltaje, capacidad de carga, protocolos OBD compatibles) |
| `desc-m1-meca-instalacion` | `PLANTILLA` | A4 | 6 | Checklist de instalación: pre-instalación, pasos del elevador, sistema neumático, software de diagnóstico, prueba funcional, firma de entrega |
| `desc-m1-meca-seguridad` | `FICHA_PLASTIFICABLE` | A4 | 8 | Protocolo de seguridad: EPP por operación, riesgos del taller automotriz, emergencias, compromiso del estudiante con firma |
| `desc-m1-meca-garantias` | `BITACORA` | A4 | 6 | Registro de garantías: cobertura, do's/don'ts (campos check), registro de intervenciones en garantía |

Exportar también: `export const descargablesMeca: DescargableLXP[] = [...]`

---

## ETAPA 3 — `src/data/modulosLXP.ts` (modificar)

Agregar `descargableId` a exactamente 4 contenidos existentes:

```
m1-s11-c4  →  descargableId: 'desc-m1-meca-metrado'
m1-s12-c3  →  descargableId: 'desc-m1-meca-instalacion'
m1-s13-c4  →  descargableId: 'desc-m1-meca-seguridad'
m1-s14-c3  →  descargableId: 'desc-m1-meca-garantias'
```

---

## ETAPA 4 — `src/pages/ModuloDetalle.tsx` (modificar)

### A. Imports (añadir)
```ts
import { quizBancosMeca } from '@/data/quizBancosMeca'
import { descargablesMeca } from '@/data/descargablesMeca'
```

### B. Ampliar lookup de descargables (~línea 79)
```ts
const todosDescargables = slug === 'mecanica-automotriz'
  ? [...descargablesLXP, ...descargablesMeca]
  : descargablesLXP
const descargableActivo = descargableAbierto
  ? todosDescargables.find(d => d.id === descargableAbierto.descargableId) ?? null
  : null
```

### C. Inyectar banco de preguntas (~línea 383, antes del filter de diagnosticos/resto)
```ts
const contenidosConBanco = ses.contenidos.map(c =>
  slug === 'mecanica-automotriz' && c.tipo === 'QUIZ' && !c.bancoPreguntas && quizBancosMeca[c.id]
    ? { ...c, bancoPreguntas: quizBancosMeca[c.id] }
    : c
)
// Usar contenidosConBanco en lugar de ses.contenidos en los .filter() de diagnosticos y resto
```

---

## Verificación final

```bash
npx tsc --noEmit
```

Navegar a `/taller/mecanica-automotriz/ruta/modulo/1`:
- M1-S11 quiz `m1-s11-c3` → renderiza QuizBlock con 10 preguntas
- M1-S13 quiz `m1-s13-c3` → badge "Mínimo 80%" + bloquea siguiente contenido
- M1-S11 descargable `m1-s11-c4` → abre DescargableViewerModal (no PDF fallback)

Navegar a cualquier otro taller → comportamiento sin cambios (guard `slug === 'mecanica-automotriz'`)
