import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

// ── Config ────────────────────────────────────────────────────
const ADMIN_EMAILS = ['camila.gr@inroprin.com', 't.donoso@inroprin.com']
const FROM_EMAIL   = 'GRAMA LXP <notificaciones@grama.pe>'

const DEV_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

// ── Supabase service-role client (server-side only) ───────────
function getSupabase() {
  if (DEV_MODE) return null
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

// ── Resend client ─────────────────────────────────────────────
function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

// ── Email HTML template ───────────────────────────────────────
function buildEmailHtml(data: {
  nombre:     string
  email:      string
  institucion: string
  taller:     string
  mensaje:    string
  fecha:      string
}): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nueva solicitud de acceso — GRAMA LXP</title>
</head>
<body style="margin:0;padding:0;background:#f0faf5;font-family:'Manrope',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0faf5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(4,57,65,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#043941,#045f6c);padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:22px;font-weight:900;color:#02d47e;letter-spacing:-0.5px;">GRAMA</span>
                    <span style="font-size:13px;color:rgba(255,255,255,0.6);margin-left:8px;">LXP · EPT</span>
                  </td>
                  <td align="right">
                    <span style="background:#02d47e20;color:#02d47e;font-size:11px;font-weight:700;
                                 padding:4px 12px;border-radius:20px;border:1px solid #02d47e40;">
                      NUEVA SOLICITUD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 36px 8px;">
              <h1 style="margin:0;font-size:20px;font-weight:800;color:#043941;">
                Solicitud de acceso recibida
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">
                ${data.fecha} — Pendiente de revisión
              </p>
            </td>
          </tr>

          <!-- Data table -->
          <tr>
            <td style="padding:20px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid #e5f7ec;border-radius:12px;overflow:hidden;">
                ${[
                  ['Nombre', data.nombre],
                  ['Email',  data.email],
                  ['Institución / IE', data.institucion || '—'],
                  ['Taller de interés', data.taller   || '—'],
                ].map(([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? '#f8fffe' : '#ffffff'};">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;
                              color:#6b7280;width:38%;border-bottom:1px solid #e5f7ec;">
                    ${label}
                  </td>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;
                              color:#043941;border-bottom:1px solid #e5f7ec;">
                    ${value}
                  </td>
                </tr>`).join('')}
                ${data.mensaje ? `
                <tr style="background:#f8fffe;">
                  <td colspan="2" style="padding:12px 16px;">
                    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#6b7280;">
                      Mensaje del solicitante
                    </p>
                    <p style="margin:0;font-size:13px;color:#043941;line-height:1.6;
                               background:#ffffff;padding:10px 14px;border-radius:8px;
                               border:1px solid #e5f7ec;">
                      ${data.mensaje}
                    </p>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:4px 36px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f0faf5;border-radius:12px;padding:16px 20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#043941;">
                      ¿Qué hacer?
                    </p>
                    <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">
                      Si apruebas el acceso, crea el usuario en Supabase o añádelo a los usuarios DEV
                      y notifícale al correo <strong style="color:#043941;">${data.email}</strong>.
                      Si no apruebas, simplemente ignora este correo.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fffe;padding:16px 36px;border-top:1px solid #e5f7ec;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
                GRAMA LXP · Sistema de notificación automática · No responder a este correo
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ── POST /api/registro ────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, institucion, taller, mensaje } = body as Record<string, string>

    // Validación básica
    if (!nombre?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Nombre y email son requeridos.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
    }

    const fecha = new Intl.DateTimeFormat('es-PE', {
      dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Lima',
    }).format(new Date())

    // 1️⃣ Guardar en Supabase
    const supabase = getSupabase()
    if (supabase) {
      const { error: dbError } = await supabase
        .from('solicitudes_acceso')
        .insert({ nombre, email, institucion, taller_slug: taller, mensaje })

      if (dbError) {
        console.error('[registro] Supabase insert error:', dbError.message)
        // No cortamos el flujo — continuamos con el email aunque falle la DB en dev
      }
    } else {
      // DEV_MODE: log en consola
      console.log('[DEV registro] Nueva solicitud:', { nombre, email, institucion, taller, mensaje })
    }

    // 2️⃣ Enviar email a los admins
    const resend = getResend()
    if (resend) {
      const html = buildEmailHtml({ nombre, email, institucion: institucion || '—', taller: taller || '—', mensaje: mensaje || '', fecha })
      const { error: emailError } = await resend.emails.send({
        from:    FROM_EMAIL,
        to:      ADMIN_EMAILS,
        subject: `[GRAMA] Nueva solicitud de acceso — ${nombre}`,
        html,
      })
      if (emailError) {
        console.error('[registro] Resend error:', emailError)
      }
    } else {
      // Sin RESEND_API_KEY — modo desarrollo
      console.log('[DEV registro] Email que se enviaría a:', ADMIN_EMAILS)
      console.log('[DEV registro] Asunto: Nueva solicitud —', nombre)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[registro] Unexpected error:', err)
    return NextResponse.json({ error: 'Error interno. Intenta de nuevo.' }, { status: 500 })
  }
}
