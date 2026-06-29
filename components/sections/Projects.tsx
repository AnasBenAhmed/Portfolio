'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import SectionTitle from '@/components/ui/SectionTitle'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef    = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0

    const triggers: ScrollTrigger[] = []

    rowsRef.current.forEach((row) => {
      if (!row) return

      const num    = row.querySelector<HTMLElement>('[data-number]')
      const title  = row.querySelector<HTMLElement>('[data-title]')
      const tech   = row.querySelector<HTMLElement>('[data-tech]')
      const desc   = row.querySelector<HTMLElement>('[data-desc]')
      const accent = row.querySelector<HTMLElement>('[data-accent]')

      /* hide before entering */
      gsap.set([num, title, tech], { opacity: 0 })
      gsap.set(num,   { x: -24 })
      gsap.set(title, { x: -36 })
      gsap.set(tech,  { x:  24 })

      if (isTouch && desc && accent) {
        /* remove maxHeight constraint so content isn't clipped; hide via opacity+y */
        gsap.set(desc,   { opacity: 0, y: 10, maxHeight: 'none' })
        gsap.set(accent, { scaleY: 0 })
      }

      /* one-by-one reveal as each row enters viewport */
      triggers.push(ScrollTrigger.create({
        trigger: row,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline()
          tl.to(num,   { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
          tl.to(title, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          tl.to(tech,  { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, '-=0.35')
          if (isTouch && desc && accent) {
            tl.to(accent, { scaleY: 1, duration: 0.4, ease: 'power3.out' }, '-=0.3')
            tl.to(desc,   { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
          }
        },
      }))
    })

    // Positions can be stale right after a client-side navigation — recompute
    // so any row already in view reveals instead of staying hidden.
    ScrollTrigger.refresh()

    // Only kill OUR triggers (a global kill would nuke other sections' reveals).
    return () => triggers.forEach((t) => t.kill())
  }, [])

  const getEls = (row: HTMLAnchorElement) => ({
    accent: row.querySelector<HTMLElement>('[data-accent]'),
    num:    row.querySelector<HTMLElement>('[data-number]'),
    title:  row.querySelector<HTMLElement>('[data-title]'),
    arrow:  row.querySelector<HTMLElement>('[data-arrow]'),
    desc:   row.querySelector<HTMLElement>('[data-desc]'),
    bgNum:  row.querySelector<HTMLElement>('[data-bg-num]'),
  })

  const enter = (i: number) => {
    const row = rowsRef.current[i]
    if (!row) return
    const { accent, num, title, arrow, desc, bgNum } = getEls(row)

    // Kill any in-progress tweens so fast hovers don't queue
    gsap.killTweensOf([accent, num, title, arrow, desc, bgNum])

    gsap.to(accent, { scaleY: 1,         duration: 0.35, ease: 'power3.out' })
    gsap.to(num,    { color: '#E0A82E',  duration: 0.2 })
    gsap.to(title,  { x: 14,             duration: 0.3,  ease: 'power2.out' })
    gsap.to(arrow,  { opacity: 1, x: 0,  duration: 0.25, ease: 'power2.out' })
    gsap.to(desc,   { maxHeight: 80, opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(bgNum,  { opacity: 1, x: 0,  duration: 0.4,  ease: 'power2.out' })
  }

  const leave = (i: number) => {
    const row = rowsRef.current[i]
    if (!row) return
    const { accent, num, title, arrow, desc, bgNum } = getEls(row)

    gsap.killTweensOf([accent, num, title, arrow, desc, bgNum])

    gsap.to(accent, { scaleY: 0,         duration: 0.3,  ease: 'power2.in' })
    gsap.to(num,    { color: '#666666',  duration: 0.2 })
    gsap.to(title,  { x: 0,              duration: 0.25, ease: 'power2.out' })
    gsap.to(arrow,  { opacity: 0, x: -8, duration: 0.2 })
    gsap.to(desc,   { maxHeight: 0, opacity: 0, duration: 0.2 })
    gsap.to(bgNum,  { opacity: 0, x: 20, duration: 0.25 })
  }

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-surface py-28 md:py-36">
      {/* Background watermark */}
      <div className="absolute right-6 top-20 font-bebas text-[180px] leading-none text-white/[0.02] select-none pointer-events-none md:right-16" aria-hidden>
        PROJECTS
      </div>

      <div className="absolute right-0 top-1/3 h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionTitle label="Featured Work" title="PROJECTS" />
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-6 md:px-10">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            ref={(el) => { rowsRef.current[i] = el }}
            onMouseEnter={() => enter(i)}
            onMouseLeave={() => leave(i)}
            data-project
            className="group relative block border-t border-white/[0.05] last:border-b last:border-white/[0.05]"
          >
            {/* Left crimson accent bar — only visible on hover */}
            <div
              data-accent
              className="absolute left-0 top-0 h-full w-[3px] origin-top bg-crimson"
              style={{ transform: 'scaleY(0)' }}
            />

            {/* Faint background number — only on hover */}
            <div
              data-bg-num
              className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 select-none font-bebas leading-none text-white/[0.04] opacity-0 translate-x-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
              aria-hidden
            >
              {project.number}
            </div>

            <div className="relative py-7 pl-5 md:pl-7">
              <div className="flex items-center justify-between gap-6">

                {/* Number + Title */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span
                      data-number
                      className="hidden shrink-0 font-fira text-xs text-muted md:inline"
                    >
                      {project.number}
                    </span>
                    <h3
                      data-title
                      className="font-bebas leading-none tracking-wide text-white"
                      style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3.2rem)' }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Description — expands on hover */}
                  <div data-desc className="overflow-hidden opacity-0" style={{ maxHeight: 0 }}>
                    <p className="pb-1 pt-2 font-space text-xs leading-relaxed text-white/40 md:ml-[3.75rem] md:text-sm">
                      {project.description.split('.')[0]}.
                    </p>
                  </div>
                </div>

                {/* Tech + Arrow */}
                <div className="flex shrink-0 items-center gap-5">
                  <span
                    data-tech
                    className="hidden font-space text-xs uppercase tracking-widest text-muted md:inline"
                  >
                    {project.tech}
                  </span>
                  <div
                    data-arrow
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 opacity-0 -translate-x-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
