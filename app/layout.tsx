import './globals.css'
import Navbar from '@/components/navbar'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'

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
      <body className="bg-[#c0c0c0] text-black min-h-screen font-sans">
        <div className="container mx-auto px-6">
          <Navbar />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
