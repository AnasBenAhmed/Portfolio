'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'
import type { ISourceOptions } from '@tsparticles/engine'

const ParticlesWrapper = dynamic(() => import('@/components/ui/ParticlesWrapper'), { ssr: false })

const TERMINAL_LINES = [
  '> initializing system...',
  '> loading: Anas Ben Ahmed',
  '> roles: Designer · Developer · Engineer',
  '> status: ready_',
]

const PARTICLE_OPTIONS: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 55, density: { enable: true } },
    color: { value: ['#E11B22', '#E0A82E', '#ffffff'] },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.04, max: 0.2 },
      animation: { enable: true, speed: 0.4, sync: false },
    },
    size: { value: { min: 1, max: 2.5 } },
    move: {
      enable: true,
      speed: 0.35,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    links: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.035,
      width: 1,
    },
  },
  detectRetina: true,
}

export default function Hero() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cursorRef = useRef<HTMLSpanElement>(null)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.set([gradientRef.current, contentRef.current], { opacity: 0 })
    gsap.set([nameRef.current, subtitleRef.current, ctaRef.current, scrollRef.current], {
      opacity: 0,
      y: 40,
    })

    TERMINAL_LINES.forEach((line, i) => {
      const el = lineRefs.current[i]
      if (!el) return
      const chars = { n: 0 }
      tl.to(
        chars,
        {
          n: line.length,
          duration: line.length * 0.032,
          ease: 'none',
          onUpdate() {
            el.textContent = line.slice(0, Math.round(chars.n))
          },
        },
        i === 0 ? '+=0.5' : '+=0.35'
      )
    })

    tl.to(cursorRef.current, { opacity: 0, duration: 0 }, '+=0.4')
    tl.to(terminalRef.current, { x: 8, duration: 0.04, yoyo: true, repeat: 7, ease: 'none' }, '+=0.15')
    tl.to(terminalRef.current, { opacity: 0, y: -24, duration: 0.35, ease: 'power2.in' })
    tl.to(
      gradientRef.current,
      { opacity: 1, duration: 0.7, ease: 'power2.out', onComplete: () => setShowParticles(true) },
      '-=0.1'
    )
    tl.to(contentRef.current, { opacity: 1, duration: 0 })
    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.1')
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35')
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.25')
    tl.to(scrollRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15')

    return () => { tl.kill() }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden bg-bg"
    >
      {/* Gradient background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 20% 40%, rgba(225,27,34,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 70%, rgba(224,168,46,0.12) 0%, transparent 55%), #0D0D0D',
        }}
      />

      {/* Particles */}
      {showParticles && (
        <div className="absolute inset-0 z-10">
          <ParticlesWrapper id="hero-particles" options={PARTICLE_OPTIONS} />
        </div>
      )}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[11] opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Terminal */}
      <div
        ref={terminalRef}
        className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 lg:px-32"
      >
        <div className="font-fira text-base md:text-xl lg:text-2xl leading-relaxed space-y-3">
          {TERMINAL_LINES.map((_, i) => (
            <div key={i} className="flex items-center text-terminal">
              <span ref={(el) => { lineRefs.current[i] = el }} className="whitespace-pre" />
              {i === TERMINAL_LINES.length - 1 && (
                <span ref={cursorRef} className="ml-0.5 inline-block h-5 w-2 bg-terminal animate-blink" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div ref={contentRef} className="relative z-30 w-full px-6 text-center md:px-10 opacity-0">
        <div className="overflow-hidden">
          <h1
            ref={nameRef}
            className="font-bebas leading-none tracking-wider text-white"
            style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
          >
            ANAS
            <br />
            <span className="gradient-text">BEN AHMED</span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="mt-4 font-space text-sm font-light uppercase tracking-[0.35em] text-white/60 md:text-base"
        >
          Graphic Designer&nbsp;&nbsp;·&nbsp;&nbsp;Developer&nbsp;&nbsp;·&nbsp;&nbsp;Engineer
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative overflow-hidden border border-crimson px-8 py-3 font-space text-sm uppercase tracking-widest text-crimson transition-colors duration-300 hover:text-white"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-crimson transition-transform duration-300 group-hover:scale-x-100" />
            <span className="relative">View Work</span>
          </a>
          <a
            href="#contact"
            className="border border-white/20 px-8 py-3 font-space text-sm uppercase tracking-widest text-white/70 transition-all duration-300 hover:border-white/50 hover:text-white"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span className="font-fira text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <div className="relative h-12 w-px overflow-hidden bg-white/10">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-crimson to-gold"
            style={{ height: '100%', animation: 'scroll-indicator 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
