'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

const STATS = [
  { value: 4,   suffix: '',  label: 'Featured Projects' },
  { value: 3,   suffix: '+', label: 'Platforms' },
  { value: 5,   suffix: '+', label: 'Years Learning' },
  { value: 100, suffix: '%', label: 'Design Passion' },
]

export default function About() {
  const sectionRef   = useRef<HTMLElement>(null)
  const statRefs     = useRef<(HTMLSpanElement | null)[]>([])
  const statRowRef   = useRef<HTMLDivElement>(null)
  const textColRef   = useRef<HTMLDivElement>(null)
  const codeColRef   = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const triggered    = useRef(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* ── Big statement clip reveal ─── */
    gsap.fromTo(
      statementRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: statementRef.current, start: 'top 82%' },
      }
    )

    /* ── Text + code stagger ─── */
    gsap.fromTo(
      Array.from(textColRef.current?.children ?? []),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: textColRef.current, start: 'top 78%' },
      }
    )
    gsap.fromTo(
      codeColRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: codeColRef.current, start: 'top 78%' },
      }
    )

    /* ── Stats strip reveal + counters ─── */
    gsap.fromTo(
      Array.from(statRowRef.current?.children ?? []),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: statRowRef.current,
          start: 'top 85%',
          onEnter: () => {
            if (triggered.current) return
            triggered.current = true
            STATS.forEach((stat, i) => {
              const el = statRefs.current[i]
              if (!el) return
              const c = { n: 0 }
              gsap.to(c, {
                n: stat.value, duration: 1.8, ease: 'power2.out', delay: i * 0.12,
                onUpdate() { el.textContent = `${Math.round(c.n)}${stat.suffix}` },
              })
            })
          },
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-bg py-28 md:py-36"
    >
      {/* Decorative background word */}
      <div
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-bebas leading-none text-white/[0.025]"
        style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
        aria-hidden
      >
        ABOUT
      </div>

      {/* Left accent */}
      <div className="absolute left-0 top-1/3 h-48 w-px bg-gradient-to-b from-transparent via-crimson/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Header */}
        <SectionTitle label="Who I Am" title="ABOUT ME" />

        {/* Bold statement */}
        <p
          ref={statementRef}
          className="mb-14 max-w-4xl font-bebas text-3xl leading-tight tracking-wide text-white/90 md:text-4xl lg:text-5xl"
        >
          Multidisciplinary developer and designer building for{' '}
          <span className="gradient-text">web, mobile, and desktop.</span>
        </p>

        {/* Two-column: text left, code right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left — paragraphs */}
          <div ref={textColRef} className="space-y-5">
            <p className="font-space text-base leading-[1.9] text-white/60">
              I create responsive websites, native{' '}
              <span className="text-white font-medium">Android &amp; iOS</span> apps,
              and Windows applications in{' '}
              <span className="text-white font-medium">C++ and C#</span>. My graphic
              design background means I ship products that are as polished visually
              as they are solid technically.
            </p>
            <p className="font-space text-base leading-[1.9] text-white/60">
              Fast learner, independent problem-solver, focused on{' '}
              <span className="text-crimson font-medium">clean, user-friendly results</span>.
              I care about every pixel and every function.
            </p>

            {/* Inline tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Next.js', 'React', 'Vue / Nuxt', 'Android', 'iOS', 'C++', 'C#', 'Photoshop', 'Illustrator'].map((tag) => (
                <span
                  key={tag}
                  className="border border-white/8 px-3 py-1 font-fira text-[10px] uppercase tracking-widest text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — code block */}
          <div ref={codeColRef} className="overflow-x-auto border border-white/[0.06] bg-surface-2">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-2 font-fira text-[10px] text-muted">profile.js</span>
            </div>
            <pre className="overflow-x-auto p-5 font-fira text-[11px] md:text-xs leading-7">
              <code>
                <span className="text-[#C792EA]">const </span>
                <span className="text-[#82AAFF]">anas</span>
                <span className="text-white/50"> = {'{'}</span>{'\n'}
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
                <span className="text-white/50">{'}'}</span>
              </code>
            </pre>
          </div>

        </div>

        {/* Stats strip */}
        <div
          ref={statRowRef}
          className="mt-16 grid grid-cols-2 divide-x divide-white/5 border border-white/5 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center py-8 text-center">
              <span className="font-bebas text-5xl leading-none gradient-text md:text-6xl">
                <span ref={(el) => { statRefs.current[i] = el }}>0{stat.suffix}</span>
              </span>
              <span className="mt-2 font-space text-[10px] uppercase tracking-[0.3em] text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
