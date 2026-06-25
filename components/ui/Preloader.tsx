'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LETTERS = [
  { char: 'A', color: '#E11B22' },
  { char: 'B', color: '#EA742A' },
  { char: 'A', color: '#E0A82E' },
]

export default function Preloader() {
  const [show, setShow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

    const letters = container.querySelectorAll<HTMLElement>('[data-pl-letter]')
    const dot = container.querySelector<HTMLElement>('[data-pl-dot]')
    const fill = container.querySelector<HTMLElement>('[data-pl-fill]')

    gsap.set(letters, { yPercent: 110 })
    gsap.set(dot, { opacity: 0, scale: 0.5 })
    gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })

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

    tl.to(letters, { yPercent: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out' }, 0)
    tl.to(dot, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 0.45)
    tl.to(fill, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.25)
    tl.to({}, { duration: 0.25 })
    tl.to(letters, { yPercent: -115, duration: 0.55, stagger: 0.06, ease: 'power3.in' })
    tl.to(dot, { opacity: 0, scale: 0.4, duration: 0.25, ease: 'power2.in' }, '<')

    return () => { tl.kill() }
  }, [show])

  if (!show) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg"
    >
      {/* Letters */}
      <div className="flex items-end gap-1">
        {LETTERS.map(({ char, color }, i) => (
          <div key={i} className="overflow-hidden leading-none">
            <span
              data-pl-letter
              className="block font-bebas leading-[0.9]"
              style={{ fontSize: 'clamp(5rem, 16vw, 11rem)', color }}
            >
              {char}
            </span>
          </div>
        ))}
        <div className="overflow-hidden leading-none pb-[0.12em]">
          <span
            data-pl-dot
            className="block font-bebas leading-none text-gold"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            ·
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="mt-10 h-px overflow-hidden"
        style={{ width: 'min(260px, 55vw)', background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          data-pl-fill
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, #E11B22, #E0A82E)' }}
        />
      </div>
    </div>
  )
}
