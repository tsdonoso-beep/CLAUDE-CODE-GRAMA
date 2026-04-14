import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider }     from '@/presentation/providers/AuthProvider'
import { ProgressProvider } from '@/presentation/providers/ProgressProvider'
import { QueryProvider }    from '@/presentation/providers/QueryProvider'
import { Toaster }          from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'GRAMA LXP',
    template: '%s | GRAMA LXP',
  },
  description: 'Plataforma de formación docente EPT — Potenciamos la educación técnica del Perú',
  keywords: ['EPT', 'educación técnica', 'formación docente', 'GRAMA', 'talleres'],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AuthProvider>
            <ProgressProvider>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#043941',
                    color: '#d2ffe1',
                    border: '1px solid #1a6e7a',
                  },
                }}
              />
            </ProgressProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
