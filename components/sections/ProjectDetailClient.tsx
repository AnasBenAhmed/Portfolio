'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  prev: Project | null
  next: Project | null
}

export default function ProjectDetailClient({ project, prev, next }: Props) {
  const heroSectionRef  = useRef<HTMLDivElement>(null)
  const tiltRef         = useRef<HTMLDivElement>(null)
  const heroRef         = useRef<HTMLDivElement>(null)
  const contentRef      = useRef<HTMLDivElement>(null)
  const featuresRef     = useRef<HTMLUListElement>(null)
  const mockupRef       = useRef<HTMLDivElement>(null)
  const desktopFrameRef = useRef<HTMLDivElement>(null)
  const mobileFrameRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* ── Hero reveal ─────────────────────────────────────── */
    const heroChildren = heroRef.current?.children
    if (heroChildren) {
      gsap.fromTo(
        Array.from(heroChildren),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
      )
    }

    /* ── Tilt effect ─────────────────────────────────────── */
    const heroSection = heroSectionRef.current
    const tiltEl = tiltRef.current
    if (heroSection && tiltEl) {
      const onMove = (e: MouseEvent) => {
        const rect = heroSection.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
        gsap.to(tiltEl, { rotateX: -y * 4, rotateY: x * 5, duration: 0.9, ease: 'power2.out' })
      }
      const onLeave = () => {
        gsap.to(tiltEl, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'power2.out' })
      }
      heroSection.addEventListener('mousemove', onMove)
      heroSection.addEventListener('mouseleave', onLeave)
      return () => {
        heroSection.removeEventListener('mousemove', onMove)
        heroSection.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* ── Mockup frames — immediate ───────────────────────── */
    const mockupChildren = mockupRef.current?.children
    if (mockupChildren) {
      gsap.fromTo(
        Array.from(mockupChildren),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.35 }
      )
    }

    /* ── Content reveal — immediate, no scroll gate ─────── */
    const contentChildren = contentRef.current?.children
    if (contentChildren) {
      gsap.fromTo(
        Array.from(contentChildren),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.55 }
      )
    }

    /* ── Features stagger ────────────────────────────────── */
    const featureItems = featuresRef.current?.children
    if (featureItems) {
      gsap.fromTo(
        Array.from(featureItems),
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' },
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  // On desktop (md+): sync mobile frame height to desktop frame height exactly.
  // On mobile: let the CSS aspect-ratio (9/16) handle it naturally.
  useEffect(() => {
    const desktop = desktopFrameRef.current
    const mobile = mobileFrameRef.current
    if (!desktop || !mobile) return
    const sync = () => {
      if (window.innerWidth >= 768) {
        mobile.style.height = `${desktop.offsetHeight}px`
      } else {
        mobile.style.height = ''
      }
    }
    const observer = new ResizeObserver(sync)
    observer.observe(desktop)
    window.addEventListener('resize', sync)
    sync()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg">

      {/* ── Hero ───────────────────────────────────────────── */}
      <div
        ref={heroSectionRef}
        className="relative flex flex-col justify-start overflow-hidden pb-12 pt-28"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 30% 50%, ${project.accentColor}18 0%, transparent 65%), #0D0D0D`,
          perspective: '1000px',
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div
          ref={tiltRef}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div ref={heroRef} className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <Link
              href="/#projects"
              className="mb-8 inline-flex items-center gap-2 font-fira text-xs uppercase tracking-widest text-muted transition-colors duration-200 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Projects
            </Link>

            <p className="font-fira text-xs uppercase tracking-[0.4em]" style={{ color: project.accentColor }}>
              {project.number} — {project.tech}
            </p>
            <h1
              className="mt-3 font-bebas leading-none tracking-wide text-white"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
            >
              {project.title}
            </h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-crimson to-gold" />
          </div>
        </div>
      </div>

      {/* ── Screenshot mockups ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-12 md:px-10">
        <div ref={mockupRef} className="flex flex-col gap-3 md:flex-row md:items-start">

          {/* Desktop frame — landscape, takes remaining width */}
          <div
            ref={desktopFrameRef}
            className="w-full overflow-hidden border border-white/[0.08] md:flex-1"
            style={{ aspectRatio: '16/9', background: `${project.accentColor}06` }}
          >
            <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.08] bg-[#0e0e0e] px-3">
              <div className="h-2 w-2 rounded-full bg-white/30" />
              <div className="h-2 w-2 rounded-full bg-white/15" />
              <div className="h-2 w-2 rounded-full bg-white/15" />
              <div className="mx-3 h-4 flex-1 rounded-sm border border-white/[0.08] bg-white/[0.03]" />
            </div>
            <div className="relative w-full" style={{ height: 'calc(100% - 2rem)' }}>
              {project.screenshots?.desktop ? (
                <Image
                  src={project.screenshots.desktop}
                  alt={`${project.title} desktop preview`}
                  fill
                  unoptimized
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 border" style={{ borderColor: `${project.accentColor}10` }} />
                    <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: `${project.accentColor}10` }} />
                    <div className="absolute bottom-0 left-1/2 top-0 w-px" style={{ background: `${project.accentColor}10` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-fira text-[9px] uppercase tracking-widest" style={{ color: `${project.accentColor}35` }}>Preview</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile frame — portrait on mobile, synced height on desktop */}
          <div
            ref={mobileFrameRef}
            className="relative w-full shrink-0 overflow-hidden border border-white/[0.08] md:w-[22%]"
            style={{ aspectRatio: '9/16', background: `${project.accentColor}04` }}
          >
            {project.screenshots?.mobile ? (
              <Image
                src={project.screenshots.mobile}
                alt={`${project.title} mobile preview`}
                fill
                unoptimized
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 22vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 border" style={{ borderColor: `${project.accentColor}10` }} />
                  <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: `${project.accentColor}10` }} />
                  <div className="absolute bottom-0 left-1/2 top-0 w-px" style={{ background: `${project.accentColor}10` }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-fira text-[9px] uppercase tracking-widest" style={{ color: `${project.accentColor}35` }}>Mobile</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div ref={contentRef} className="grid grid-cols-1 gap-16 lg:grid-cols-3">

          {/* Main description */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-fira text-xs uppercase tracking-[0.35em] text-muted">
              Overview
            </h2>
            <p className="font-space text-lg leading-relaxed text-white/80">
              {project.longDescription}
            </p>

            <h2 className="mb-6 mt-14 font-fira text-xs uppercase tracking-[0.35em] text-muted">
              Key Features
            </h2>
            <ul ref={featuresRef} className="space-y-4">
              {project.features.map((feat) => (
                <li key={feat} className="flex items-start gap-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <span className="font-space text-base text-white/70">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar: tech stack */}
          <div>
            <h2 className="mb-6 font-fira text-xs uppercase tracking-[0.35em] text-muted">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techList.map((tech) => (
                <span
                  key={tech}
                  className="border px-3 py-1.5 font-space text-xs uppercase tracking-widest"
                  style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center gap-3 border border-white/5 bg-surface p-6 transition-colors duration-200 hover:border-white/15"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-white/40">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <div>
                  <p className="font-fira text-xs uppercase tracking-widest text-muted">GitHub</p>
                  <p className="mt-0.5 font-space text-sm text-white/70 group-hover:text-white">View Source</p>
                </div>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="ml-auto shrink-0 text-white/20">
                  <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-24 border-t border-white/5 pt-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex items-center gap-4 transition-colors duration-200"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-crimson group-hover:text-crimson">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-fira text-[10px] uppercase tracking-widest text-muted">Previous</p>
                  <p className="font-space text-sm text-white/70 transition-colors group-hover:text-white">{prev.title}</p>
                </div>
              </Link>
            ) : <div />}

            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center gap-4 text-right transition-colors duration-200 self-end sm:self-auto"
              >
                <div>
                  <p className="font-fira text-[10px] uppercase tracking-widest text-muted">Next</p>
                  <p className="font-space text-sm text-white/70 transition-colors group-hover:text-white">{next.title}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-gold group-hover:text-gold">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
