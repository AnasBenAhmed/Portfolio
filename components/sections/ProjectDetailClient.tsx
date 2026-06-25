'use client'

import { useEffect, useRef } from 'react'
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
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero reveal
    const heroChildren = heroRef.current?.children
    if (heroChildren) {
      gsap.fromTo(
        Array.from(heroChildren),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
      )
    }

    // Content reveal on scroll
    const contentChildren = contentRef.current?.children
    if (contentChildren) {
      gsap.fromTo(
        Array.from(contentChildren),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        }
      )
    }

    // Features stagger
    const featureItems = featuresRef.current?.children
    if (featureItems) {
      gsap.fromTo(
        Array.from(featureItems),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' },
        }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <div
        className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden pb-16 pt-32"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 30% 50%, ${project.accentColor}18 0%, transparent 65%), #0D0D0D`,
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

      {/* Content */}
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

            <div className="mt-10 border border-white/5 bg-surface p-6">
              <p className="font-fira text-xs uppercase tracking-widest text-muted">Status</p>
              <p className="mt-2 font-space text-sm text-white/80">
                In Development — launching soon
              </p>
            </div>
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
                  <p className="font-space text-sm text-white/70 group-hover:text-white transition-colors">{prev.title}</p>
                </div>
              </Link>
            ) : <div />}

            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center gap-4 text-right transition-colors duration-200"
              >
                <div>
                  <p className="font-fira text-[10px] uppercase tracking-widest text-muted">Next</p>
                  <p className="font-space text-sm text-white/70 group-hover:text-white transition-colors">{next.title}</p>
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
