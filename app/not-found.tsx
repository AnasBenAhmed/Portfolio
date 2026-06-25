'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function NotFound() {
  const numRef  = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.set([numRef.current, textRef.current, linkRef.current], { opacity: 0, y: 30 })
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({ delay: 0.15 })
    tl.to(numRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    tl.to(lineRef.current, { scaleX: 1, duration: 0.5, ease: 'expo.inOut' }, '-=0.3')
    tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    tl.to(linkRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="font-fira text-[10px] uppercase tracking-[0.4em] text-crimson">
        404 — Not Found
      </p>

      <h1
        ref={numRef}
        className="mt-2 font-bebas leading-none text-white"
        style={{ fontSize: 'clamp(7rem, 22vw, 18rem)' }}
      >
        LOST.
      </h1>

      <div
        ref={lineRef}
        className="mt-1 mb-7"
        style={{
          width: 'min(200px, 50vw)',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #E11B22 40%, #E0A82E 70%, transparent)',
        }}
      />

      <p
        ref={textRef}
        className="font-space text-sm text-white/35"
      >
        This page doesn&apos;t exist.
      </p>

      <Link
        ref={linkRef}
        href="/"
        className="mt-10 border border-crimson px-9 py-3.5 font-space text-[11px] uppercase tracking-[0.25em] text-crimson transition-colors duration-300 hover:bg-crimson hover:text-white"
      >
        Back Home
      </Link>
    </div>
  )
}
