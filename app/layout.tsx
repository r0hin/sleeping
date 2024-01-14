import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scholar Snooze',
  description: 'The easiest way for students to rent a bed for their dorms or apartments or houses!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛏️</text></svg>' />
      </head>
      <body className={inter.className}>
        <Header/>
        <main className="p-8 max-w-4xl ml-auto mr-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
