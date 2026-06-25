import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 bg-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson via-gold to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-xl tracking-widest text-crimson">ABN</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="font-space text-sm text-muted">Anas Ben Ahmed</span>
          </div>

          <p className="font-space text-xs text-muted text-center">
            Designed &amp; built by{' '}
            <span className="text-white">Anas Ben Ahmed</span>
            {' '}· {year}
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="https://github.com/AnasBenAhmed"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space text-xs uppercase tracking-widest text-muted transition-colors duration-200 hover:text-gold"
            >
              GitHub
            </Link>
            <span className="h-px w-4 bg-white/20" />
            <Link
              href="mailto:anasbenahmed@gmail.com"
              className="font-space text-xs uppercase tracking-widest text-muted transition-colors duration-200 hover:text-gold"
            >
              Email
            </Link>
            <span className="h-px w-4 bg-white/20" />
            <Link
              href="https://annas.host"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space text-xs uppercase tracking-widest text-muted transition-colors duration-200 hover:text-gold"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
