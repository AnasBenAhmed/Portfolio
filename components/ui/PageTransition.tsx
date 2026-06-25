'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    gsap.fromTo(
      overlay,
      { scaleX: 1, transformOrigin: 'left center' },
      {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.75,
        ease: 'power3.inOut',
        delay: 0.05,
      }
    )
  }, [pathname])

  return (
    <div className="relative">
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[60] origin-left"
        style={{ background: 'linear-gradient(135deg, #E11B22 0%, #0D0D0D 100%)' }}
      />
      {children}
    </div>
  )
}
