import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Komanda — indi',
  description: 'Code Academy attendance — manager view',
}

export const viewport: Viewport = {
  themeColor: '#ebe5d8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
