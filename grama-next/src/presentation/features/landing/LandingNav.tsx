'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { GramaLogo } from '@/presentation/shared/ui/GramaLogo'

const NAV_LINKS = [
  { label: 'Nosotros',        href: '#nosotros' },
  { label: 'Talleres',        href: '#talleres' },
  { label: '¿Para quién es?', href: '#comunidad' },
  { label: 'Contacto',        href: '#contacto' },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <GramaLogo size="md" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: 'var(--color-grama-oscuro)' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="transition-opacity hover:opacity-60">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-grama-oscuro)' }}
          >
            Ingresar
          </Link>
          <Link
            href="/registro"
            className="btn-glow px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
          >
            Solicitar acceso →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl transition-colors"
          style={{ color: 'var(--color-grama-oscuro)' }}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-6 py-4 space-y-3"
          style={{ background: '#ffffff', borderColor: 'var(--color-border)' }}
        >
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm font-semibold py-2"
              style={{ color: 'var(--color-grama-oscuro)' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--color-border)' }}>
            <Link href="/login" className="text-sm font-semibold py-2" style={{ color: 'var(--color-grama-oscuro)' }}>
              Ingresar
            </Link>
            <Link
              href="/registro"
              className="btn-glow w-full text-center px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
            >
              Solicitar acceso →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
