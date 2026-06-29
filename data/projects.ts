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
    slug: 'ripple',
    number: '02',
    title: 'RIPPLE — VIDEO & AUDIO DOWNLOADER',
    tech: 'Python · FastAPI · Next.js',
    techList: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'ffmpeg'],
    description: 'A no-login video and audio downloader for YouTube, Instagram, TikTok, and Twitch — built from scratch with a custom Python extraction engine and a clean, queue-based web UI. No yt-dlp, no third-party download libraries.',
    longDescription: 'Ripple is a media downloader built entirely from scratch — no yt-dlp, no shortcuts. The Python backend talks directly to each platform\'s own web endpoints to resolve stream URLs: YouTube via its InnerTube player API, Instagram via its web GraphQL, TikTok by parsing the page\'s embedded data, and Twitch via GraphQL plus the usher HLS playlists. FastAPI streams everything straight to the browser with live progress, muxing and audio extraction on the fly with ffmpeg — nothing is written to disk on the server. A local CDN proxy and parallel fragment downloads keep speeds high. The Next.js frontend is a minimal, fast queue: paste a URL, pick a format, download.',
    features: [
      'Custom extraction engine — no yt-dlp or third-party download libraries',
      'Four platforms: YouTube (+ Shorts), Instagram (reels / posts / carousels), TikTok, Twitch (clips + VODs)',
      'No login or accounts — pulls public content straight from each platform',
      'MP4 up to 1080p, plus M4A (fast stream-copy) and MP3 audio',
      'Fast downloads — local CDN proxy beats throttling, parallel HLS fragments',
      'FastAPI streaming responses with real-time progress — no disk buffering',
      'Clean queue-based Next.js UI — paste URL, pick format, download',
    ],
    accentColor: '#E11B22',
    github: 'https://github.com/AnasBenAhmed/Ripple',
    screenshots: {
      desktop: '/screenshots/ripple-desktop.png',
      mobile: '/screenshots/ripple-mobile.png',
    },
  },
  {
    slug: 'ecommerce',
    number: '03',

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
    number: '04',
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
    slug: 'iris',
    number: '05',
    title: 'IRIS — AI IMAGE GENERATOR',
    tech: 'C# · WPF · .NET',
    techList: ['C#', 'WPF', '.NET', 'Hugging Face API', 'SDXL'],
    description: 'A native Windows AI image generator built in C# and WPF — type a prompt, get a real Stable Diffusion XL image. Powered by the Hugging Face Inference API with a clean settings panel for API key management.',
    longDescription: 'Iris is a native Windows desktop application for AI image generation, built entirely in C# with WPF. Under the hood it calls the Hugging Face Inference API running Stable Diffusion XL — the same model behind Fooocus — so every image is genuinely AI-generated from scratch, not fetched or searched. The UI is minimal and dark: a prompt field, style presets, a generate button, and a live image output panel. A settings page handles API key storage via Windows Credential Manager. Generated images are saved to a local gallery with export support.',
    features: [
      'Real AI image generation via Hugging Face Inference API (SDXL)',
      'Settings panel — API key input stored securely in Windows Credential Manager',
      'Style presets — photorealistic, cinematic, anime, concept art',
      'Prompt history — revisit and re-run previous generations',
      'Local gallery — browse, save, and export generated images',
      'Negative prompt support for fine-tuned results',
      'Generation progress indicator with cancel support',
      'Dark, minimal WPF UI — native Windows, no Electron',
    ],
    accentColor: '#E0A82E',
  },
  {
    slug: 'chess',
    number: '06',

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
  {
    slug: 'cipher',
    number: '07',
    title: 'CIPHER — ENCRYPTED MESSENGER',
    tech: 'WebRTC · libsodium',
    techList: ['WebRTC', 'libsodium', 'End-to-End Encryption', 'P2P'],
    description: 'A private, end-to-end encrypted messenger with peer-to-peer delivery — no central server holding your messages. Inspired by Signal and Session, built privacy-first.',
    longDescription: 'Cipher is a secure messaging app built around privacy and end-to-end encryption. Messages are encrypted on the sender\'s device and only decryptable by the recipient, and delivery is peer-to-peer where possible — so no central server ever stores plaintext or message history. The goal is a clean, modern chat experience with the security guarantees of Signal and the serverless, metadata-resistant approach of Session.',
    features: [
      'End-to-end encryption — only sender and recipient can read messages',
      'Peer-to-peer delivery — no central server storing messages',
      'No phone number or email required to sign up',
      'Forward secrecy — keys rotate so past messages stay safe',
      'Encrypted media and file sharing',
      'Clean, modern chat UI',
    ],
    accentColor: '#E11B22',
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
