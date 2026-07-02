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
  /** Hide the fake browser address bar on the desktop mockup (e.g. non-web apps). */
  hideAddressBar?: boolean
  /** Hide the mobile mockup frame entirely (desktop frame takes full width). */
  hideMobile?: boolean
  /** Hide the desktop mockup frame entirely. */
  hideDesktop?: boolean
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
    slug: 'vanta',
    number: '03',
    title: 'VANTA — LUXURY FASHION STORE',
    tech: 'Nuxt · Vue · Pinia',
    techList: ['Nuxt 4', 'Vue 3', 'Pinia', 'Tailwind CSS', 'TypeScript'],
    description: 'A dark-luxe fashion storefront built from scratch — full catalog with size/colour variants, search & filtering, a persistent cart, wishlist, quick-view, and a multi-step checkout. Statically generated, fully responsive.',
    longDescription: 'VANTA is a complete e-commerce experience for a fictional luxury fashion label, built with Nuxt 4, Pinia, and Tailwind v4. A curated catalog spans six categories with size and colour variants; the shop offers live search, category filters, and sorting; and rich product pages carry an image gallery and reviews. A Pinia-powered cart and wishlist persist across visits, a quick-view modal adds to cart straight from the grid, and a multi-step checkout (information → delivery → payment → confirmation) supports promo codes. The whole site is statically generated — no backend — leaning into a near-black palette with monochrome editorial photography for a quiet, expensive feel.',
    features: [
      'Curated 16-piece catalog across 6 categories with size & colour variants',
      'Shop with live search, category filters, and sorting',
      'Pinia cart + wishlist, persisted across sessions',
      'Quick-view modal — add to cart without leaving the grid',
      'Multi-step checkout with promo codes and order confirmation',
      'Reviews & ratings, fully responsive, statically generated (Nuxt)',
    ],
    accentColor: '#E0A82E',
    github: 'https://github.com/AnasBenAhmed/VANTA',
    screenshots: {
      desktop: '/screenshots/vanta-desktop.jpg',
      mobile: '/screenshots/vanta-mobile.jpg',
    },
  },
  {
    slug: 'currency-converter',
    number: '04',
    title: 'CAMBIO — CURRENCY CONVERTER',
    tech: 'Flutter · Dart · Android & iOS',
    techList: ['Flutter', 'Dart', 'Provider', 'fl_chart', 'Yahoo Finance API'],
    description: 'A cross-platform currency converter built from a single Flutter codebase — pixel-identical on Android and iOS. 45+ currencies with a full-screen keypad, live and historical rate charts, and saved favourites.',
    longDescription: 'Cambio is a fast, tactile currency converter built with Flutter, so one Dart codebase renders identically on Android and iOS. A full-screen custom keypad drives instant conversion between 45+ world currencies — each with its own flag — and every pair resolves through live Yahoo Finance data, triangulating through USD for exotic crosses that have no direct quote (so even Tunisian Dinar to South African Rand works). Branded crimson-to-gold area charts cover 1D through 5Y of history, favourites save your most-used pairs with live mini-rates, and your last pair persists between launches. The pure logic — keypad input, number formatting, rate parsing, USD triangulation, and the favourites store — ships with a 43-test suite.',
    features: [
      'One Flutter codebase — pixel-identical Android & iOS',
      '45+ currencies with rounded flags and a searchable picker',
      'Full-screen custom keypad — comma, delete-last, clear-all, and switch',
      'Live & historical charts (1D · 7D · 1M · 1Y · 2Y · 5Y)',
      'USD triangulation — every currency pair works, even exotic crosses',
      'Favourites with live mini-rates; last pair persists between launches',
      'Crimson-to-gold branded theme; 43 automated tests',
    ],
    accentColor: '#E11B22',
    github: 'https://github.com/AnasBenAhmed/Cambio',
    screenshots: {
      desktop: '/screenshots/cambio-desktop.png',
      mobile: '/screenshots/cambio-mobile.png',
    },
  },
  {
    slug: 'iris',
    number: '05',
    title: 'IRIS — AI IMAGE GENERATOR',
    tech: 'C# · WPF · .NET',
    techList: ['C#', '.NET 8', 'WPF', 'CommunityToolkit.Mvvm', 'xUnit'],
    description: 'A native Windows AI image generator built in C# and WPF — type a prompt, get a real AI image in seconds. Keyless, no account, no billing, with style presets, a local gallery, and prompt history.',
    longDescription: 'Iris is a native Windows desktop application for AI image generation, built entirely in C# with WPF and MVVM. It generates real images through a keyless backend — no API key, no account, no billing — so it works the moment you open it. Type a prompt, pick a style preset (photorealistic, cinematic, anime, concept art, 3D), choose an aspect ratio, and generate — with seed control for reproducible results or fresh variations. Every generation is auto-saved to a local gallery with its prompt, style, and seed, and prompt history lets you re-run a past request in one click. All pure logic — the request builder, prompt composition, and the gallery/history stores — lives in a dependency-free core library, fully unit-tested.',
    features: [
      'Real AI image generation — keyless, no account, no billing',
      'Style presets — photorealistic, cinematic, anime, concept art, 3D',
      'Aspect presets — square, portrait, landscape',
      'Seed control — lock a seed to reproduce, randomize for variations',
      'Local gallery — every generation saved, browse, select, delete',
      'Prompt history — one click to re-run a recent prompt',
      'Save / export any result to disk',
      'Dark, minimal WPF UI — native Windows, no Electron',
    ],
    accentColor: '#E0A82E',
    github: 'https://github.com/AnasBenAhmed/Iris',
    screenshots: {
      desktop: '/screenshots/iris-desktop.png',
    },
    hideAddressBar: true,
    hideMobile: true,
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
