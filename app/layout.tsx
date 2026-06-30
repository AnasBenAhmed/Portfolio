import type { Metadata } from 'next'
import { Bebas_Neue, Space_Grotesk, Fira_Code } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/layout/CustomCursor'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Preloader from '@/components/ui/Preloader'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://annas.host'),
  title: 'Anas Ben Ahmed — Designer & Developer',
  description:
    'Multidisciplinary developer and designer building for web, mobile, and desktop. Portfolio of Anas Ben Ahmed.',
  keywords: ['designer', 'developer', 'Next.js', 'React', 'portfolio', 'Tunisia'],
  authors: [{ name: 'Anas Ben Ahmed', url: 'https://annas.host' }],
  openGraph: {
    title: 'Anas Ben Ahmed — Designer & Developer',
    description: 'Graphic Designer · Web & Mobile Developer · Software Engineer',
    url: 'https://annas.host',
    siteName: 'Anas Ben Ahmed',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Anas Ben Ahmed — Full-Stack Developer & Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anas Ben Ahmed — Designer & Developer',
    description: 'Graphic Designer · Web & Mobile Developer · Software Engineer',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}
    >
      <body className="bg-bg text-white antialiased">
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
