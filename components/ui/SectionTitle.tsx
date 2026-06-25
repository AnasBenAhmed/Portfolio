'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SectionTitleProps {
  label?: string
  title: string
  className?: string
}

export default function SectionTitle({ label, title, className = '' }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <div ref={ref} className={`mb-16 ${className}`}>
      {label && (
        <p className="mb-3 font-fira text-xs uppercase tracking-[0.4em] text-crimson">
          {label}
        </p>
      )}
      <h2 className="font-bebas text-5xl md:text-7xl tracking-wide text-white">
        {title}
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-crimson to-gold" />
    </div>
  )
}
