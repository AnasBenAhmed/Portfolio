import Link from 'next/link'

const NAV = [
  { label: 'About',    href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills',   href: '/#skills' },
  { label: 'Contact',  href: '/#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-surface">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson via-gold to-transparent" />

      {/* Background ABA watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 select-none font-bebas leading-none text-white/[0.03] translate-x-[8%] translate-y-[12%]"
        style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
      >
        ABA
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* Statement block */}
        <div className="border-b border-white/5 py-16 md:py-24">
          <p className="mb-5 font-space text-[10px] uppercase tracking-[0.35em] text-muted">
            Currently accepting projects
          </p>
          <h2
            className="font-bebas leading-[0.9] tracking-wide text-white"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 9rem)' }}
          >
            LET'S BUILD<br />
            <span className="gradient-text">SOMETHING.</span>
          </h2>
          <a
            href="mailto:anasbenahmed@gmail.com"
            className="group mt-10 inline-flex items-center gap-3 border border-crimson px-7 py-3 font-space text-sm uppercase tracking-widest text-crimson transition-all duration-300 hover:bg-crimson hover:text-white"
          >
            Get in touch
            <svg
              width="13" height="13" viewBox="0 0 16 16" fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Middle row */}
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="shrink-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-bebas text-2xl tracking-widest text-crimson">ABA</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </div>
            <p className="font-space text-xs leading-relaxed text-muted">
              Anas Ben Ahmed<br />Designer &amp; Developer
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <p className="mb-1 font-space text-[10px] uppercase tracking-[0.3em] text-white/20">Navigate</p>
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-space text-sm text-muted transition-colors duration-200 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="mb-1 font-space text-[10px] uppercase tracking-[0.3em] text-white/20">Find me</p>
            <a
              href="mailto:anasbenahmed@gmail.com"
              className="font-space text-sm text-muted transition-colors duration-200 hover:text-crimson"
            >
              anasbenahmed@gmail.com
            </a>
            <a
              href="https://github.com/AnasBenAhmed"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space text-sm text-muted transition-colors duration-200 hover:text-gold"
            >
              github.com/AnasBenAhmed
            </a>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="border-t border-white/5 py-5 flex flex-col items-center gap-1 md:flex-row md:justify-between">
          <p className="font-space text-[10px] text-white/20">
            © {year} Anas Ben Ahmed · Tunisia
          </p>
          <p className="font-space text-[10px] text-white/20">
            Designed &amp; built by hand
          </p>
        </div>

      </div>
    </footer>
  )
}
