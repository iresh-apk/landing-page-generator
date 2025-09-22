import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Landing Page Generator - Create Professional Sales Pages',
  description: 'Create stunning landing pages with our drag-and-drop editor. No coding required!',
  keywords: 'landing page, generator, drag drop, sales page, marketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}