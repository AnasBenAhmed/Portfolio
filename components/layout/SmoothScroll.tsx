'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const pendingHashRef = useRef<string | null>(null)
  const pathnameRef = useRef(pathname)

  // Keep ref in sync with React router — used inside the click closure
  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Capture phase fires BEFORE React/Next.js processes Link clicks, so
    // e.preventDefault() here stops Next.js from navigating to /#hash URLs.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      let hash: string | null = null
      if (href.startsWith('#')) {
        hash = href
      } else if (href.startsWith('/#')) {
        hash = href.slice(1) // '#section'
      }

      if (!hash) return

      if (pathnameRef.current !== '/') {
        // Cross-page: take over navigation — go to home, scroll on arrival
        e.preventDefault()
        pendingHashRef.current = hash
        router.push('/')
        return
      }

      // On home: scroll directly, block any browser/Next.js navigation
      const target = document.querySelector(hash) as HTMLElement | null
      if (!target) return
      e.preventDefault()
      lenisRef.current?.scrollTo(target, { duration: 1.3 })
    }

    const onScrollTop = () => lenisRef.current?.scrollTo(0, { duration: 1.3 })

    document.addEventListener('click', onAnchorClick, { capture: true })
    window.addEventListener('lenis-scroll-top', onScrollTop)

    return () => {
      document.removeEventListener('click', onAnchorClick, { capture: true })
      window.removeEventListener('lenis-scroll-top', onScrollTop)
      lenis.destroy()
      gsap.ticker.remove(tick)
      lenisRef.current = null
    }
  }, [router])

  // On route change: scroll to pending hash (cross-page nav) or to top
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const hash = pendingHashRef.current || window.location.hash
      pendingHashRef.current = null

      if (hash) {
        const target = document.querySelector(hash) as HTMLElement | null
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target, { immediate: true })
        }
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true })
        } else {
          window.scrollTo(0, 0)
        }
      }
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return <>{children}</>
}
