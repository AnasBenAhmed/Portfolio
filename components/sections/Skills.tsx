'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

const TECH_SKILLS = [
  { name: 'Adobe Software', pct: 100 },
  { name: 'Web Development', pct: 100 },
  { name: 'UI / UX Design', pct: 98 },
  { name: 'Android & iOS Dev', pct: 99 },
  { name: 'C++ / C# Desktop', pct: 99 },
  { name: 'Databases / SQL', pct: 98 },
]

const SOFT_SKILLS = [
  ['Problem-Solving', 'Time Management'],
  ['Self-Learning', 'Effective Communication'],
  ['Logical Thinking', 'Teamwork & Collaboration'],
  ['Attention to Detail', 'Debugging & Troubleshooting'],
  ['Adaptability', 'Clean Code Practices'],
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const barFillRefs = useRef<(HTMLDivElement | null)[]>([])
  const pctRefs = useRef<(HTMLSpanElement | null)[]>([])
  const softRef = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        if (triggered.current) return
        triggered.current = true

        TECH_SKILLS.forEach((skill, i) => {
          const bar = barFillRefs.current[i]
          const pct = pctRefs.current[i]
          if (!bar || !pct) return

          gsap.to(bar, {
            width: `${skill.pct}%`,
            duration: 1.4,
            ease: 'power2.out',
            delay: i * 0.08,
          })

          const counter = { n: 0 }
          gsap.to(counter, {
            n: skill.pct,
            duration: 1.4,
            ease: 'power2.out',
            delay: i * 0.08,
            onUpdate() {
              pct.textContent = `${Math.round(counter.n)}%`
            },
          })
        })
      },
    })

    // Stagger soft skills rows
    const rows = softRef.current?.children
    if (rows) {
      gsap.fromTo(
        Array.from(rows),
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: softRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-bg py-28 md:py-36"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Decorative number */}
      <div className="absolute right-6 top-20 font-bebas text-[180px] leading-none text-white/[0.02] select-none pointer-events-none md:right-16">
        SKILL
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionTitle label="What I Do" title="SKILLS" />

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Technical skills */}
          <div>
            <p className="mb-8 font-fira text-xs uppercase tracking-[0.35em] text-crimson">
              Technical
            </p>
            <div className="space-y-7">
              {TECH_SKILLS.map((skill, i) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-space text-sm font-medium uppercase tracking-wider text-white/80">
                      {skill.name}
                    </span>
                    <span
                      ref={(el) => { pctRefs.current[i] = el }}
                      className="font-fira text-xs text-gold"
                    >
                      0%
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/5">
                    <div
                      ref={(el) => { barFillRefs.current[i] = el }}
                      className="h-full bg-gradient-to-r from-crimson to-gold"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft skills */}
          <div>
            <p className="mb-8 font-fira text-xs uppercase tracking-[0.35em] text-gold">
              Soft Skills
            </p>
            <div ref={softRef} className="space-y-0">
              {SOFT_SKILLS.map((pair, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 border-b border-white/5 py-4 last:border-none"
                >
                  {pair.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <span className="h-px w-4 shrink-0 bg-gradient-to-r from-crimson to-gold" />
                      <span className="font-space text-sm text-white/70">{skill}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
