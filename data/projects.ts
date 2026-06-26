export interface Project {
  slug: string
  number: string
  title: string
  tech: string
  techList: string[]
  description: string
  longDescription: string
  features: string[]
  accentColor: string
  github?: string
  domain?: string
  screenshots?: { desktop?: string; mobile?: string }
}

export const projects: Project[] = [
  {
    slug: 'portfolio',
    number: '01',
    title: 'PERSONAL PORTFOLIO WEBSITE',
    tech: 'Next.js · React · Node.js',
    techList: ['Next.js', 'React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'EmailJS'],
    description: 'Designed and engineered from scratch — a fully animated portfolio combining GSAP scroll choreography, a custom cursor, Lenis smooth scroll, and a contact form, all under a precise crimson-to-gold brand system.',
    longDescription: 'This portfolio is itself the project — every detail designed and engineered from scratch. GSAP ScrollTrigger drives scroll-based reveals across every section. Lenis provides physics-based smooth scrolling. A custom corner-bracket cursor shifts shape and color on every interaction. A session-gated preloader reveals the ABA identity on first visit. Page transitions wipe between routes with a crimson curtain. The hero features mouse-tracked parallax orbs with SVG grain texture. The goal: prove, not just claim, that design and engineering coexist at a high level.',
    features: [
      'Custom corner-bracket cursor — state-aware color and shape animations',
      'Session-gated preloader with ABA letter reveal and progress bar',
      'Page transition — crimson curtain wipe on every route change',
      'GSAP ScrollTrigger scroll-driven reveals on every section',
      'Lenis physics-based smooth scroll with GSAP ticker integration',
      'Hero parallax orbs — mouse-tracked gradient blobs with SVG grain',
      'Project detail pages with 3D tilt effect and mockup frames',
      'Working contact form via EmailJS — no backend required',
      'Fully responsive with touch-optimized mobile interactions',
      'Dark-only design — crimson / gold / near-black brand system',
    ],
    accentColor: '#E11B22',
    github: 'https://github.com/AnasBenAhmed/Portfolio',
    domain: 'https://annas.host',
    screenshots: {
      desktop: '/screenshots/portfolio-desktop.jpg',
      mobile: '/screenshots/portfolio-mobile.jpg',
    },
  },
  {
    slug: 'ecommerce',
    number: '02',
    title: 'E-COMMERCE STORE',
    tech: 'Vue.js · Nuxt',
    techList: ['Vue.js', 'Nuxt', 'JavaScript', 'Pinia', 'CSS3'],
    description: 'Built a full-featured online store with product listings, cart, and checkout flow. Implemented a clean, responsive UI and handled product data, state management, and a smooth end-to-end shopping experience.',
    longDescription: 'A fully functional e-commerce store built with Vue.js and Nuxt. Product catalog with filtering and search, a Pinia-powered shopping cart with persistence, and a multi-step checkout flow — all wrapped in a clean, conversion-focused UI. State management is handled globally with Pinia, and the UI is fully responsive from mobile to desktop.',
    features: [
      'Product catalog with search and category filtering',
      'Shopping cart with Pinia state management',
      'Multi-step checkout flow',
      'Persistent cart across sessions',
      'Responsive UI optimized for mobile and desktop',
      'Clean, conversion-focused design',
    ],
    accentColor: '#E0A82E',
  },
  {
    slug: 'currency-converter',
    number: '03',
    title: 'CURRENCY CONVERTER',
    tech: 'Android · iOS',
    techList: ['Android', 'iOS', 'Kotlin', 'Swift', 'REST API'],
    description: 'Developed a cross-platform mobile app delivering real-time exchange rates through a clean, intuitive interface. Integrated live currency data with a fast, user-friendly design optimized for quick conversions.',
    longDescription: 'A native mobile app for both Android (Kotlin) and iOS (Swift) delivering real-time currency exchange rates. Integrated with a live currency API for up-to-date rates across 150+ currencies. The UI is designed for speed — a single screen with a clean input, instant conversion output, and a favorites list for commonly used pairs.',
    features: [
      'Real-time rates via live currency API',
      '150+ supported currencies',
      'Favorites list for quick access to common pairs',
      'Offline mode with last-cached rates',
      'Native Android (Kotlin) and iOS (Swift) builds',
      'Single-screen UI optimized for speed',
    ],
    accentColor: '#E11B22',
  },
  {
    slug: 'chess',
    number: '04',
    title: 'CHESS WITH AI',
    tech: 'C++',
    techList: ['C++', 'SFML', 'Minimax', 'Alpha-Beta Pruning'],
    description: 'Developed a fully playable chess engine with an AI opponent using move-search algorithms. Implemented complete game logic, legal move validation, and adjustable difficulty levels.',
    longDescription: 'A fully playable chess engine written in C++ with an AI opponent powered by Minimax with Alpha-Beta pruning. All game logic is implemented from scratch: piece movement, legal move validation, check/checkmate/stalemate detection, castling, en passant, and pawn promotion. SFML handles rendering. Difficulty is tunable via search depth.',
    features: [
      'Complete chess rules: castling, en passant, promotion',
      'Check, checkmate, and stalemate detection',
      'AI opponent using Minimax + Alpha-Beta pruning',
      'Adjustable difficulty via search depth',
      'SFML-powered 2D graphics',
      'Move history and undo support',
    ],
    accentColor: '#E0A82E',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}
