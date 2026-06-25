'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef     = useRef<HTMLDivElement>(null)
  const bracketRef = useRef<HTMLDivElement>(null)
  const pathname   = usePathname()

  // Reset cursor state on every route change
  useEffect(() => {
    const dot     = dotRef.current
    const bracket = bracketRef.current
    if (!dot || !bracket) return
    gsap.to(bracket, { rotation: 45, scale: 1, color: '#E11B22', duration: 0.4, ease: 'power2.inOut' })
    gsap.to(dot,     { backgroundColor: '#E11B22', duration: 0.4 })
  }, [pathname])

  useEffect(() => {
    const dot     = dotRef.current
    const bracket = bracketRef.current
    if (!dot || !bracket) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    gsap.set(dot,     { xPercent: -50, yPercent: -50 })
    gsap.set(bracket, { xPercent: -50, yPercent: -50, rotation: 45 })

    let cx = 0, cy = 0, tx = 0, ty = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      gsap.set(dot, { x: e.clientX, y: e.clientY })
    }

    const lerp = () => {
      cx += (tx - cx) * 0.1
      cy += (ty - cy) * 0.1
      gsap.set(bracket, { x: cx, y: cy })
      requestAnimationFrame(lerp)
    }
    const rafId = requestAnimationFrame(lerp)

    const kill = () => {
      gsap.killTweensOf(bracket)
      gsap.killTweensOf(dot)
    }

    const onLinkEnter = () => {
      kill()
      gsap.to(bracket, { rotation: 0, scale: 0.7, color: '#E0A82E', duration: 0.3, ease: 'power2.out' })
      gsap.to(dot,     { backgroundColor: '#E0A82E', duration: 0.3 })
    }
    const onLinkLeave = () => {
      kill()
      gsap.to(bracket, { rotation: 45, scale: 1, color: '#E11B22', duration: 0.45, ease: 'power2.inOut' })
      gsap.to(dot,     { backgroundColor: '#E11B22', duration: 0.45 })
    }
    const onProjectEnter = () => {
      kill()
      gsap.to(bracket, { rotation: 0, scale: 1.6, color: 'rgba(225,27,34,0.45)', duration: 0.4, ease: 'power2.out' })
      gsap.to(dot,     { backgroundColor: 'rgba(225,27,34,0.45)', duration: 0.4 })
    }
    const onProjectLeave = () => {
      kill()
      gsap.to(bracket, { rotation: 45, scale: 1, color: '#E11B22', duration: 0.45, ease: 'power2.inOut' })
      gsap.to(dot,     { backgroundColor: '#E11B22', duration: 0.45 })
    }

    const setup = () => {
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
    setup()

    const observer = new MutationObserver(setup)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Tiny dot — instant follow */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[5px] w-[5px] rounded-full bg-crimson [@media(pointer:coarse)]:hidden"
        style={{ willChange: 'transform' }}
      />

      {/* Corner-bracket diamond — lerp follow */}
      <div
        ref={bracketRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 text-crimson [@media(pointer:coarse)]:hidden"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-0 left-0 h-[10px] w-[10px] border-l border-t border-current" />
        <div className="absolute top-0 right-0 h-[10px] w-[10px] border-r border-t border-current" />
        <div className="absolute bottom-0 left-0 h-[10px] w-[10px] border-b border-l border-current" />
        <div className="absolute bottom-0 right-0 h-[10px] w-[10px] border-b border-r border-current" />
      </div>
    </>
  )
}
