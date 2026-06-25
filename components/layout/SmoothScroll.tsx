'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

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

    // Intercept hash anchor clicks and route them through Lenis
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      let hash: string | null = null
      if (href.startsWith('#')) {
        hash = href
      } else if (href.startsWith('/#') && window.location.pathname === '/') {
        hash = href.slice(1) // strip leading /
      }

      if (!hash) return
      const target = document.querySelector(hash) as HTMLElement | null
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { duration: 1.3 })
    }

    const onScrollTop = () => lenis.scrollTo(0, { duration: 1.3 })

    document.addEventListener('click', onAnchorClick)
    window.addEventListener('lenis-scroll-top', onScrollTop)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('lenis-scroll-top', onScrollTop)
      lenis.destroy()
      gsap.ticker.remove(tick)
      lenisRef.current = null
    }
  }, [])

  // Handle scroll position on every route change
  useEffect(() => {
    // Defer one frame so the URL (including hash) is fully committed
    const id = requestAnimationFrame(() => {
      const hash = window.location.hash
      if (hash) {
        // Lenis handles the scroll to the anchor element
        const target = document.querySelector(hash) as HTMLElement | null
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target, { immediate: true })
        }
      } else {
        // No hash — go to top
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
