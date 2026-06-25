'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import SectionTitle from '@/components/ui/SectionTitle'

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

type FormState = 'idle' | 'sending' | 'success' | 'error'

interface FloatingLabelProps {
  id: string
  label: string
  type?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  multiline?: boolean
  rows?: number
  required?: boolean
}

function FloatingLabel({ id, label, type = 'text', name, value, onChange, multiline, rows = 5, required }: FloatingLabelProps) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full resize-none bg-surface-2 px-4 pb-3 pt-6 font-space text-sm text-white outline-none transition-all duration-300 border-b-2 ${
            focused ? 'border-crimson' : 'border-white/10'
          }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-surface-2 px-4 pb-3 pt-6 font-space text-sm text-white outline-none transition-all duration-300 border-b-2 ${
            focused ? 'border-crimson' : 'border-white/10'
          }`}
        />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 font-space text-xs uppercase tracking-widest transition-all duration-200 ${
          active ? 'top-2 text-[10px] text-crimson' : 'top-4 text-muted'
        }`}
      >
        {label}
      </label>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-crimson to-gold transition-all duration-300 ${
          focused ? 'w-full' : 'w-0'
        }`}
      />
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({ from_name: '', from_email: '', message: '' })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const children = sectionRef.current?.querySelectorAll('[data-reveal]')
    if (children) {
      gsap.fromTo(
        Array.from(children),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (formState === 'sending') return

    setFormState('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      setFormState('success')
      setFields({ from_name: '', from_email: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-bg py-28 md:py-36"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson via-gold to-transparent opacity-50" />

      {/* Decorative bg text */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center font-bebas text-[20vw] leading-none text-white/[0.015] select-none pointer-events-none">
        CONTACT
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left: title + text + (desktop only) links */}
          <div>
            <div data-reveal>
              <SectionTitle label="Let's Talk" title="GET IN TOUCH" />
            </div>

            <p data-reveal className="font-space text-base leading-relaxed text-white/60">
              Got a project in mind, or just want to say hi? I'm open to new work,
              collaborations, and opportunities. Drop a message and I'll get back to you.
            </p>

            {/* Links — desktop only, stays in left column */}
            <div data-reveal className="mt-10 hidden space-y-5 lg:block">
              <a
                href="mailto:anasbenahmed@gmail.com"
                className="group flex items-center gap-4 transition-colors duration-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-crimson/40 text-crimson transition-all duration-300 group-hover:bg-crimson group-hover:border-crimson group-hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 4-10 9L2 4" />
                  </svg>
                </div>
                <span className="font-space text-sm text-white/70 transition-colors duration-200 group-hover:text-white">
                  anasbenahmed@gmail.com
                </span>
              </a>

              <a
                href="https://github.com/AnasBenAhmed"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 transition-colors duration-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:text-bg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <span className="font-space text-sm text-white/70 transition-colors duration-200 group-hover:text-white">
                  github.com/AnasBenAhmed
                </span>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div data-reveal>
            {formState === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 border border-white/5 bg-surface p-12 text-center">
                <div className="h-12 w-12 rounded-full border-2 border-gold flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E0A82E" strokeWidth="2">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </div>
                <h3 className="font-bebas text-3xl tracking-wide text-white">Message Sent!</h3>
                <p className="font-space text-sm text-muted">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-4 border border-white/20 px-6 py-2 font-space text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="subject" value="New message from portfolio" />
                <FloatingLabel
                  id="from_name"
                  name="from_name"
                  label="Your Name"
                  value={fields.from_name}
                  onChange={handleChange}
                  required
                />
                <FloatingLabel
                  id="from_email"
                  name="from_email"
                  label="Email Address"
                  type="email"
                  value={fields.from_email}
                  onChange={handleChange}
                  required
                />
                <FloatingLabel
                  id="message"
                  name="message"
                  label="Your Message"
                  value={fields.message}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  required
                />

                {formState === 'error' && (
                  <p className="font-space text-xs text-crimson">
                    Something went wrong. Please try emailing me directly at anasbenahmed@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="group relative w-full overflow-hidden border border-crimson py-4 font-space text-sm uppercase tracking-widest text-crimson transition-colors duration-300 hover:text-white disabled:opacity-60"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-crimson transition-transform duration-400 group-hover:scale-x-100" />
                  <span className="relative flex items-center justify-center gap-3">
                    {formState === 'sending' ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Links — mobile only, after the form */}
          <div className="space-y-5 lg:hidden">
            <a
              href="mailto:anasbenahmed@gmail.com"
              className="group flex items-center gap-4 transition-colors duration-200"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-crimson/40 text-crimson transition-all duration-300 group-hover:bg-crimson group-hover:border-crimson group-hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 4-10 9L2 4" />
                </svg>
              </div>
              <span className="font-space text-sm text-white/70 transition-colors duration-200 group-hover:text-white">
                anasbenahmed@gmail.com
              </span>
            </a>

            <a
              href="https://github.com/AnasBenAhmed"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 transition-colors duration-200"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:text-bg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <span className="font-space text-sm text-white/70 transition-colors duration-200 group-hover:text-white">
                github.com/AnasBenAhmed
              </span>
            </a>

            <a
              href="https://annas.host"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 transition-colors duration-200"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white/50 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/50 group-hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="font-space text-sm text-white/70 transition-colors duration-200 group-hover:text-white">
                annas.host
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
