import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Komanda — indi',
  description: 'Code Academy attendance — manager view',
}

export const viewport: Viewport = {
  themeColor: '#ebe5d8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
