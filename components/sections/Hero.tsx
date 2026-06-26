'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const LINE1 = 'ANAS'
const LINE2_WHITE = 'BEN'
const LINE2_GRADIENT = 'AHMED'

const CRIMSON = [225, 27, 34]
const GOLD    = [224, 168, 46]

function gradientSlice(i: number, total: number): React.CSSProperties {
  const t0 = i / total
  const t1 = (i + 1) / total
  const c0 = CRIMSON.map((c, k) => Math.round(c + (GOLD[k] - c) * t0))
  const c1 = CRIMSON.map((c, k) => Math.round(c + (GOLD[k] - c) * t1))
  return {
    background: `linear-gradient(90deg, rgb(${c0}), rgb(${c1}))`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }
}

export default function Hero() {
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const line1Refs = useRef<(HTMLSpanElement | null)[]>([])
  const line2WhiteRefs = useRef<(HTMLSpanElement | null)[]>([])
  const line2GradRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    /* ── Mouse parallax on orbs ─────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2
      const my = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(orb1Ref.current, { x: mx * 35, y: my * 25, duration: 2.5, ease: 'power2.out' })
      gsap.to(orb2Ref.current, { x: -mx * 25, y: -my * 20, duration: 3, ease: 'power2.out' })
      gsap.to(orb3Ref.current, { x: mx * 15, y: -my * 30, duration: 2, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMouseMove)

    /* ── Entrance animation ──────────────────────────────────── */
    const l1 = line1Refs.current.filter(Boolean) as HTMLSpanElement[]
    const l2w = line2WhiteRefs.current.filter(Boolean) as HTMLSpanElement[]
    const l2g = line2GradRefs.current.filter(Boolean) as HTMLSpanElement[]

    gsap.set([...l1, ...l2w, ...l2g], { yPercent: 110 })
    gsap.set([lineRef.current, taglineRef.current, ctaRef.current, scrollRef.current, badgeRef.current], { opacity: 0 })
    gsap.set(badgeRef.current, { y: 10 })
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(taglineRef.current, { y: 16 })
    gsap.set(ctaRef.current, { y: 20 })

    const tl = gsap.timeline({ delay: 0.2 })

    // Line 1: ANAS — letters rise
    tl.to(l1, { yPercent: 0, duration: 1, stagger: 0.06, ease: 'power4.out' })

    // Line 2: BEN AHMED — letters rise, slightly overlapping
    tl.to([...l2w, ...l2g], { yPercent: 0, duration: 1, stagger: 0.05, ease: 'power4.out' }, '-=0.7')

    // Line, tagline, CTA use absolute positions — independent of name timing
    tl.to(badgeRef.current,   { opacity: 1, y: 0,      duration: 0.45, ease: 'power2.out' }, 0.3)
    tl.to(lineRef.current,    { scaleX: 1, opacity: 1, duration: 0.6, ease: 'expo.inOut'  }, 0.5)
    tl.to(taglineRef.current, { opacity: 1, y: 0,      duration: 0.5, ease: 'power2.out'  }, 0.7)
    tl.to(ctaRef.current,     { opacity: 1, y: 0,      duration: 0.5, ease: 'power2.out'  }, 0.9)
    tl.to(scrollRef.current,  { opacity: 1,             duration: 0.4                      }, 1.1)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      tl.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden bg-bg"
    >
      {/* ── Animated gradient orbs ─────────────────────────────── */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute"
        style={{
          top: '-20%', left: '-15%',
          width: '65vw', height: '65vw',
          background: 'radial-gradient(circle at 40% 40%, rgba(225,27,34,0.22) 0%, transparent 65%)',
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute"
        style={{
          bottom: '-20%', right: '-15%',
          width: '55vw', height: '55vw',
          background: 'radial-gradient(circle at 60% 60%, rgba(224,168,46,0.18) 0%, transparent 65%)',
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />
      <div
        ref={orb3Ref}
        className="pointer-events-none absolute"
        style={{
          top: '30%', right: '10%',
          width: '30vw', height: '30vw',
          background: 'radial-gradient(circle, rgba(225,27,34,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />

      {/* ── Subtle grid ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
        }}
      />

      {/* ── Grain texture ──────────────────────────────────────── */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="relative z-10 w-full select-none px-6 text-center md:px-10">

        {/* Available for work badge */}
        <div ref={badgeRef} className="mb-7 flex items-center justify-center gap-2.5">
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-fira text-[9px] uppercase tracking-[0.4em] text-white/35">
            Available for work
          </span>
        </div>

        {/* Name line 1: ANAS — gradient */}
        <div aria-hidden className="overflow-visible leading-none">
          <p
            className="inline-block font-bebas leading-[0.85] tracking-[0.03em]"
            style={{ fontSize: 'clamp(5.5rem, 18vw, 18rem)' }}
          >
            {LINE1.split('').map((char, i) => (
              <span key={i} className="letter-wrap">
                <span ref={(el) => { line1Refs.current[i] = el }} className="inline-block" style={gradientSlice(i, LINE1.length)}>
                  {char}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* Name line 2: BEN AHMED — white */}
        <div aria-hidden className="overflow-visible leading-none mt-1 md:-mt-4 lg:-mt-6">
          <p
            className="inline-block font-bebas leading-[0.85] tracking-[0.03em] text-white"
            style={{ fontSize: 'clamp(5.5rem, 18vw, 18rem)' }}
          >
            {LINE2_WHITE.split('').map((char, i) => (
              <span key={`w${i}`} className="letter-wrap">
                <span ref={(el) => { line2WhiteRefs.current[i] = el }} className="inline-block">
                  {char}
                </span>
              </span>
            ))}
            <span className="letter-wrap">
              <span ref={(el) => { line2WhiteRefs.current[LINE2_WHITE.length] = el }} className="inline-block">
                &nbsp;
              </span>
            </span>
            {LINE2_GRADIENT.split('').map((char, i) => (
              <span key={`g${i}`} className="letter-wrap">
                <span ref={(el) => { line2GradRefs.current[i] = el }} className="inline-block">
                  {char}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center mt-6 md:mt-8">
          <div
            ref={lineRef}
            style={{
              width: 'min(520px, 75vw)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, #E11B22 30%, #E0A82E 70%, transparent 100%)',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-5 font-space text-[10px] font-light uppercase tracking-[0.45em] text-white/40 md:text-xs"
        >
          Graphic Designer&nbsp;&nbsp;·&nbsp;&nbsp;Full Stack Web Developer&nbsp;&nbsp;·&nbsp;&nbsp;Software Engineer
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative overflow-hidden border border-crimson px-9 py-3.5 font-space text-[11px] uppercase tracking-[0.25em] text-crimson transition-colors duration-300 hover:text-white"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-crimson transition-transform duration-350 group-hover:scale-x-100" />
            <span className="relative">View Work</span>
          </a>
          <a
            href="#contact"
            className="border border-white/12 px-9 py-3.5 font-space text-[11px] uppercase tracking-[0.25em] text-white/40 transition-all duration-300 hover:border-white/35 hover:text-white/80"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="font-fira text-[9px] uppercase tracking-[0.4em] text-white/20">
          Scroll
        </span>
        <div className="relative h-14 w-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-crimson to-gold"
            style={{ height: '100%', animation: 'scroll-indicator 2.2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
