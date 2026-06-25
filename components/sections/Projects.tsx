'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import SectionTitle from '@/components/ui/SectionTitle'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Stagger reveal rows on scroll
    rowsRef.current.forEach((row, i) => {
      if (!row) return
      gsap.fromTo(
        row,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
        }
      )
    })
  }, [])

  const handleMouseEnter = (index: number) => {
    const row = rowsRef.current[index]
    if (!row) return
    const number = row.querySelector('[data-number]')
    const title = row.querySelector('[data-title]')
    const arrow = row.querySelector('[data-arrow]')
    const line = row.querySelector('[data-line]')

    gsap.to(row, { backgroundColor: 'rgba(225,27,34,0.04)', duration: 0.3 })
    gsap.to(number, { color: '#E0A82E', duration: 0.3 })
    gsap.to(title, { x: 12, duration: 0.35, ease: 'power2.out' })
    gsap.to(arrow, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' })
    gsap.to(line, { scaleX: 1, duration: 0.5, ease: 'power3.out' })
  }

  const handleMouseLeave = (index: number) => {
    const row = rowsRef.current[index]
    if (!row) return
    const number = row.querySelector('[data-number]')
    const title = row.querySelector('[data-title]')
    const arrow = row.querySelector('[data-arrow]')
    const line = row.querySelector('[data-line]')

    gsap.to(row, { backgroundColor: 'transparent', duration: 0.3 })
    gsap.to(number, { color: '#888888', duration: 0.3 })
    gsap.to(title, { x: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(arrow, { opacity: 0, x: -10, duration: 0.25 })
    gsap.to(line, { scaleX: 0, duration: 0.4 })
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-bg py-28 md:py-36"
    >
      {/* Decorative right accent */}
      <div className="absolute right-0 top-1/3 h-64 w-px bg-gradient-to-b from-transparent via-gold to-transparent opacity-30" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionTitle label="Featured Work" title="PROJECTS" />
      </div>

      {/* Project rows — full width */}
      <div className="mt-4">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            ref={(el) => { rowsRef.current[i] = el }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            data-project
            className="group relative block border-t border-white/5 px-6 py-7 transition-none md:px-10 last:border-b"
          >
            {/* Hover fill line */}
            <div
              data-line
              className="absolute bottom-0 left-0 h-px origin-left bg-gradient-to-r from-crimson to-gold"
              style={{ width: '100%', transform: 'scaleX(0)' }}
            />

            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
              {/* Left: number + title */}
              <div className="flex items-center gap-6 md:gap-10 min-w-0">
                <span
                  data-number
                  className="hidden shrink-0 font-fira text-sm text-muted transition-colors duration-300 md:inline"
                >
                  {project.number}
                </span>
                <h3
                  data-title
                  className="font-bebas text-4xl leading-none tracking-wide text-white transition-none sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  {project.title}
                </h3>
              </div>

              {/* Right: tech + arrow */}
              <div className="flex shrink-0 items-center gap-6">
                <span className="hidden font-space text-xs uppercase tracking-widest text-muted md:inline">
                  {project.tech}
                </span>
                <div
                  data-arrow
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 opacity-0 -translate-x-3"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile tech tag */}
            <div className="mx-auto mt-1.5 max-w-7xl md:hidden">
              <span className="ml-0 font-space text-xs uppercase tracking-widest text-muted">
                {project.tech}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
