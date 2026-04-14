import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Rutas que requieren autenticación
const PROTECTED_PATHS = ['/hub', '/taller', '/perfil', '/admin']
// Rutas que requieren rol admin
const ADMIN_PATHS = ['/admin']
// DEV_MODE: si Supabase no está configurado, dejamos pasar con cookie de sesión dev
const DEV_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))
  const isAdmin     = ADMIN_PATHS.some(p => pathname.startsWith(p))

  if (!isProtected) return NextResponse.next()

  // ── DEV_MODE: verificar cookie de sesión local ────────────────────────────
  if (DEV_MODE) {
    const devEmail = request.cookies.get('grama-dev-email')?.value
    const devRole  = request.cookies.get('grama-dev-role')?.value
    if (!devEmail) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (isAdmin && devRole !== 'admin') {
      return NextResponse.redirect(new URL('/hub', request.url))
    }
    return NextResponse.next()
  }

  // ── PROD: verificar sesión Supabase ───────────────────────────────────────
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()          { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAdmin) {
    // Verificar rol en tabla profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/hub', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
