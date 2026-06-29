import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Noor Imran | Portfolio',
  description: 'Business Informatics, SEO & Content Editing Portfolio of Noor Imran',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
