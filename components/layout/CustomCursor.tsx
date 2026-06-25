'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' })
    }

    const onEnter = () => {
      if (isHovering.current) return
      isHovering.current = true
      gsap.to(ring, { scale: 2.2, borderColor: '#E0A82E', duration: 0.25, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const onLeave = () => {
      isHovering.current = false
      gsap.to(ring, { scale: 1, borderColor: '#E11B22', duration: 0.25, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', moveCursor)
    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-crimson"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 rounded-full border-2 border-crimson"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
