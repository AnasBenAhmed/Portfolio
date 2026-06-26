'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ABALogo from '@/components/ui/ABALogo'

export default function Preloader() {
  const [show, setShow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sessionStorage.getItem('aba-preloaded')) {
      setShow(true)
    }
  }, [])

  useEffect(() => {
    if (!show) return
    const container = containerRef.current
    if (!container) return

    document.body.style.overflow = 'hidden'

    gsap.set(logoRef.current, { yPercent: 110 })
    gsap.set(fillRef.current, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('aba-preloaded', '1')
        document.body.style.overflow = ''
        gsap.to(container, {
          yPercent: -105,
          duration: 0.85,
          ease: 'power3.inOut',
          onComplete: () => { container.style.display = 'none' },
        })
      },
    })

    tl.to(logoRef.current, { yPercent: 0, duration: 0.9, ease: 'power4.out' }, 0)
    tl.to(fillRef.current, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.25)
    tl.to({}, { duration: 0.35 })
    tl.to(logoRef.current, { yPercent: -115, duration: 0.55, ease: 'power3.in' })

    return () => { tl.kill() }
  }, [show])

  if (!show) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg"
    >
      <div className="overflow-hidden">
        <div ref={logoRef}>
          <ABALogo
            className="text-white"
            style={{ width: 'clamp(10rem, 30vw, 20rem)', height: 'auto' }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="mt-10 h-px overflow-hidden"
        style={{ width: 'min(260px, 55vw)', background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          ref={fillRef}
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, #E11B22, #E0A82E)' }}
        />
      </div>
    </div>
  )
}
