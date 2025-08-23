import './globals.css'
import LightRay from '@/components/light-ray'
import Navbar from '@/components/navbar'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Yiwei Ho',
  description:
    'Full-stack developer from Taiwan with a passion for crafting seamless user experiences and building scalable systems.',
  openGraph: {
    title: 'Yiwei Ho',
    description:
      'Full-stack developer from Taiwan with a passion for crafting seamless user experiences and building scalable systems.',
    url: 'https://1wei.dev',
    siteName: 'Yiwei Ho',
    images: [
      { url: 'https://1wei.dev/api/og?title=1wei.dev', alt: '1wei.dev' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@1weiho',
    creator: '@1weiho',
  },
  metadataBase: new URL('https://1wei.dev'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <LightRay />
        <div className="container mx-auto font-[family-name:var(--font-geist-mono)] px-6">
          <Navbar />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
