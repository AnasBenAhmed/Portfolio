'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })
    gsap.set(label, { opacity: 0, scale: 0.6 })

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 })
    }

    const lerp = () => {
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      gsap.set(ring, { x: currentX, y: currentY })
      requestAnimationFrame(lerp)
    }
    const rafId = requestAnimationFrame(lerp)

    /* ── Hover handlers ─── */
    const onLinkEnter = () => {
      gsap.to(ring, { scale: 1.8, borderColor: '#E0A82E', duration: 0.25 })
      gsap.to(dot, { scale: 0.4, duration: 0.2 })
    }
    const onLinkLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: '#E11B22', duration: 0.25 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
      gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 })
    }
    const onProjectEnter = () => {
      gsap.to(ring, { scale: 3.5, borderColor: 'rgba(225,27,34,0.5)', duration: 0.35 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.5)' })
    }
    const onProjectLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: '#E11B22', duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
      gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 })
    }

    const setupListeners = () => {
      document.querySelectorAll('a:not([data-project]), button').forEach((el) => {
        el.removeEventListener('mouseenter', onLinkEnter)
        el.removeEventListener('mouseleave', onLinkLeave)
        el.addEventListener('mouseenter', onLinkEnter)
        el.addEventListener('mouseleave', onLinkLeave)
      })
      document.querySelectorAll('[data-project]').forEach((el) => {
        el.removeEventListener('mouseenter', onProjectEnter)
        el.removeEventListener('mouseleave', onProjectLeave)
        el.addEventListener('mouseenter', onProjectEnter)
        el.addEventListener('mouseleave', onProjectLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    setupListeners()

    const observer = new MutationObserver(setupListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-crimson"
        style={{ willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex h-9 w-9 items-center justify-center rounded-full border border-crimson"
        style={{ willChange: 'transform' }}
      >
        {/* VIEW label */}
        <span
          ref={labelRef}
          className="font-space text-[8px] uppercase tracking-[0.15em] text-white"
          style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        >
          VIEW
        </span>
      </div>
    </>
  )
}
