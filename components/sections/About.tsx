'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

const STATS = [
  { value: 4, suffix: '', label: 'Featured Projects' },
  { value: 3, suffix: '+', label: 'Platforms' },
  { value: 5, suffix: '+', label: 'Years Learning' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statValRefs = useRef<(HTMLSpanElement | null)[]>([])
  const triggered = useRef(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* ── Parallax on the decorative visual ─── */
    gsap.to(visualRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8,
      },
    })

    /* ── Reveal visual from left ─── */
    gsap.fromTo(
      visualRef.current,
      { x: -70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      }
    )

    /* ── Reveal text from right ─── */
    const textChildren = textRef.current ? Array.from(textRef.current.children) : []
    gsap.fromTo(
      textChildren,
      { x: 70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      }
    )

    /* ── Counter animations ─── */
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 65%',
      onEnter: () => {
        if (triggered.current) return
        triggered.current = true
        STATS.forEach((stat, i) => {
          const el = statValRefs.current[i]
          if (!el) return
          const counter = { n: 0 }
          gsap.to(counter, {
            n: stat.value,
            duration: 1.6,
            ease: 'power2.out',
            delay: i * 0.15,
            onUpdate() { el.textContent = `${Math.round(counter.n)}${stat.suffix}` },
          })
        })
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-bg py-28 md:py-36"
    >
      {/* Left accent line */}
      <div className="absolute left-0 top-1/4 h-56 w-px bg-gradient-to-b from-transparent via-crimson/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── LEFT — decorative visual ─────────────────────── */}
          <div ref={visualRef} className="flex justify-center lg:justify-end">
            <div className="relative flex flex-col items-center gap-10">

              {/* Monogram block */}
              <div className="relative">
                {/* Animated ring 1 */}
                <div
                  className="absolute inset-[-20px] rounded-full border border-crimson/15"
                  style={{ animation: 'spin-slow 12s linear infinite' }}
                />
                {/* Animated ring 2 — counter-rotate */}
                <div
                  className="absolute inset-[-40px] rounded-full border border-gold/10"
                  style={{ animation: 'spin-slow 18s linear infinite reverse' }}
                />
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full border border-crimson/30 animate-pulse-ring" />

                {/* Monogram */}
                <div className="relative z-10 flex h-44 w-44 items-center justify-center border border-white/5 bg-surface">
                  <span className="font-bebas text-8xl tracking-wider gradient-text select-none">
                    ABN
                  </span>
                </div>

                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-crimson" />
                <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-crimson" />
                <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-gold" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-gold" />
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-0">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-stretch">
                    <div className="flex flex-col items-center px-7 text-center">
                      <span className="font-bebas text-5xl leading-none gradient-text">
                        <span ref={(el) => { statValRefs.current[i] = el }}>0{stat.suffix}</span>
                      </span>
                      <span className="mt-1 font-space text-[10px] uppercase tracking-widest text-muted">
                        {stat.label}
                      </span>
                    </div>
                    {i < STATS.length - 1 && (
                      <div className="w-px self-stretch bg-white/5" />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── RIGHT — text ─────────────────────────────────── */}
          <div ref={textRef}>
            <SectionTitle label="Who I Am" title="ABOUT ME" />

            <p className="font-space text-base leading-[1.85] text-white/65">
              Multidisciplinary <span className="text-white font-medium">developer and designer</span> building
              for web, mobile, and desktop. I create responsive websites, native{' '}
              <span className="text-white font-medium">Android &amp; iOS</span> apps, and Windows
              applications in <span className="text-white font-medium">C++ and C#</span>.
            </p>

            <p className="mt-5 font-space text-base leading-[1.85] text-white/65">
              My graphic design background means I ship products that are as polished visually
              as they are solid technically. Fast learner, independent problem-solver, focused on{' '}
              <span className="text-crimson font-medium">clean, user-friendly results</span>.
            </p>

            {/* Code block */}
            <div className="mt-9 overflow-x-auto border border-white/[0.06] bg-surface-2">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-2 font-fira text-[10px] text-muted">profile.js</span>
              </div>
              <pre className="overflow-x-auto p-5 font-fira text-[11px] md:text-xs leading-7 text-white/80">
                <code>
                  <span className="text-[#C792EA]">const </span>
                  <span className="text-[#82AAFF]">anas</span>
                  <span className="text-white/60"> = {'{'}</span>{'\n'}
                  {'  '}<span className="text-[#F07178]">roles</span>
                  <span className="text-white/40">:</span>
                  <span className="text-[#C3E88D]"> ["Designer", "Developer", "Engineer"]</span>{',\n'}
                  {'  '}<span className="text-[#F07178]">code</span>
                  <span className="text-white/40">:</span>
                  <span className="text-[#C3E88D]"> ["JS", "TS", "C++", "C#"]</span>{',\n'}
                  {'  '}<span className="text-[#F07178]">building</span>
                  <span className="text-white/40">:</span>
                  <span className="text-[#C3E88D]"> ["web", "mobile", "desktop"]</span>{',\n'}
                  {'  '}<span className="text-[#F07178]">mindset</span>
                  <span className="text-white/40">:</span>
                  <span className="text-[#C3E88D]"> "pixel-perfect × solid engineering"</span>{',\n'}
                  <span className="text-white/60">{'}'}</span>
                </code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
