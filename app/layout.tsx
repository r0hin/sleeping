import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
      </head>
      <body className={inter.className}>
        <Header />
        <main className="p-8 max-w-4xl ml-auto mr-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
