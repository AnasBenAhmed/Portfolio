'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import ABALogo from '@/components/ui/ABALogo'

const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-1"
            onClick={(e) => {
              setMenuOpen(false)
              if (pathname === '/') {
                e.preventDefault()
                window.dispatchEvent(new CustomEvent('lenis-scroll-top'))
              }
            }}
          >
            <ABALogo className="h-7 w-auto text-crimson transition-colors duration-300 group-hover:text-gold" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={handleNavClick}
                  className="group relative font-space text-sm font-medium tracking-widest text-white/70 uppercase transition-colors duration-200 hover:text-white"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-crimson to-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                onClick={handleNavClick}
                className="rounded-none border border-crimson px-5 py-2 font-space text-sm font-medium uppercase tracking-widest text-crimson transition-all duration-300 hover:bg-crimson hover:text-white"
              >
                Hire Me
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col items-end gap-1.5 p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'w-0 opacity-0' : 'w-4'
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={handleNavClick}
                className="font-bebas text-5xl tracking-widest text-white/80 transition-colors duration-200 hover:text-crimson"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              onClick={handleNavClick}
              className="mt-4 border border-crimson px-8 py-3 font-bebas text-3xl tracking-widest text-crimson hover:bg-crimson hover:text-white transition-all duration-300"
            >
              Hire Me
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
