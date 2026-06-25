'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'

const CODE_LINES = [
  { key: 'const', name: 'anas', rest: ' = {' },
  { indent: true, key: 'roles', value: '["Designer", "Developer", "Engineer"]' },
  { indent: true, key: 'code', value: '["JavaScript", "TypeScript", "C++", "C#"]' },
  { indent: true, key: 'building', value: '["web", "mobile", "desktop"]' },
  { indent: true, key: 'design', value: '["Photoshop", "Illustrator", "Figma"]' },
  { indent: true, key: 'mindset', value: '"pixel-perfect by design, solid by engineering"' },
  { close: '}' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    // Photo parallax
    gsap.to(photoRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // Photo reveal
    gsap.fromTo(
      photoRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    )

    // Text reveal — stagger children
    const textChildren = textRef.current?.children
    if (textChildren) {
      gsap.fromTo(
        Array.from(textChildren),
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-bg py-28 md:py-36"
    >
      {/* Decorative crimson line left */}
      <div className="absolute left-0 top-1/4 h-48 w-px bg-gradient-to-b from-transparent via-crimson to-transparent opacity-40" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">

          {/* Photo column */}
          <div ref={photoRef} className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute -inset-4 rounded-full border border-crimson/20" />
              {/* Gold accent arc */}
              <div
                className="absolute -inset-2 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: '#E0A82E',
                  borderRightColor: '#E0A82E',
                  transform: 'rotate(-30deg)',
                }}
              />
              {/* Photo container */}
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-crimson md:h-80 md:w-80">
                <Image
                  src="/anas.jpg"
                  alt="Anas Ben Ahmed"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-crimson/10" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 border border-gold/40 bg-surface px-4 py-2">
                <p className="font-fira text-xs text-gold">available_for_work</p>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div ref={textRef}>
            <SectionTitle label="Who I Am" title="ABOUT ME" />

            <p className="font-space text-base leading-relaxed text-white/70">
              Multidisciplinary <span className="text-white font-medium">developer and designer</span> building
              for web, mobile, and desktop. I create responsive websites, native{' '}
              <span className="text-white font-medium">Android &amp; iOS</span> apps, and Windows
              applications in <span className="text-white font-medium">C++ and C#</span>.
            </p>

            <p className="mt-4 font-space text-base leading-relaxed text-white/70">
              My graphic design background means I ship products that are as polished visually
              as they are solid technically. Fast learner, independent problem-solver, focused
              on <span className="text-crimson font-medium">clean, user-friendly results</span>.
            </p>

            {/* Code block */}
            <div className="mt-8 overflow-x-auto rounded-sm border border-white/5 bg-surface-2">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 font-fira text-xs text-muted">profile.js</span>
              </div>
              <pre className="overflow-x-auto p-5 font-fira text-xs md:text-sm leading-7">
                <code>
                  <span className="text-[#C792EA]">const </span>
                  <span className="text-[#82AAFF]">anas</span>
                  <span className="text-white"> = {'{'}</span>{'\n'}
                  {'  '}<span className="text-[#F07178]">roles</span>
                  <span className="text-white">:    </span>
                  <span className="text-[#C3E88D]">["Designer", "Developer", "Engineer"]</span>
                  <span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#F07178]">code</span>
                  <span className="text-white">:     </span>
                  <span className="text-[#C3E88D]">["JavaScript", "TypeScript", "C++", "C#"]</span>
                  <span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#F07178]">building</span>
                  <span className="text-white">: </span>
                  <span className="text-[#C3E88D]">["web", "mobile", "desktop"]</span>
                  <span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#F07178]">design</span>
                  <span className="text-white">:   </span>
                  <span className="text-[#C3E88D]">["Photoshop", "Illustrator", "Figma"]</span>
                  <span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#F07178]">mindset</span>
                  <span className="text-white">: </span>
                  <span className="text-[#C3E88D]">"pixel-perfect &amp; solid by engineering"</span>
                  <span className="text-white">,</span>{'\n'}
                  <span className="text-white">{'}'}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
