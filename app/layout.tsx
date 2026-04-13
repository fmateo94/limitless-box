import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Limitless Box | Personal Boxing Coach — Mississauga',
  description:
    '1-on-1 boxing coaching in Mississauga. Train with a personal boxing coach for fitness, self-defence, or competition. Book your first session today.',
  keywords: [
    'boxing coach Mississauga',
    'personal boxing trainer',
    '1-on-1 boxing',
    'boxing lessons GTA',
  ],
  openGraph: {
    title: 'Limitless Box | Personal Boxing Coach',
    description: '1-on-1 boxing coaching built around your goals.',
    images: ['/LimitlessBox - Black.png'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
