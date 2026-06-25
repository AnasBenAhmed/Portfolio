<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=E11B22&height=140&section=header&text=ABA·&fontSize=72&fontColor=ffffff&fontAlign=50&fontAlignY=55&animation=fadeIn" width="100%" />

<img src="https://readme-typing-svg.demolab.com?font=Bebas+Neue&weight=400&size=52&duration=2800&pause=1400&color=FFFFFF&center=true&vCenter=true&width=700&height=70&lines=ANAS+BEN+AHMED" alt="Anas Ben Ahmed" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&duration=2000&pause=1200&color=E0A82E&center=true&vCenter=true&width=700&height=30&lines=Graphic+Designer+%C2%B7+Full+Stack+Developer+%C2%B7+Software+Engineer;Available+for+work" alt="Tagline" />

<br/>

[![Portfolio](https://img.shields.io/badge/annas.host-E11B22?style=for-the-badge&logoColor=white&logo=safari)](https://annas.host)&nbsp;
[![GitHub](https://img.shields.io/badge/AnasBenAhmed-0D0D0D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AnasBenAhmed)&nbsp;
[![Email](https://img.shields.io/badge/anasbenahmed%40gmail.com-E0A82E?style=for-the-badge&logo=gmail&logoColor=black)](mailto:anasbenahmed@gmail.com)

</div>

<br/>

---

<br/>

## `01` — About

> *This repository is the portfolio — not a demo, not a template. Built from scratch to prove that design and engineering can coexist at a high level.*

Every decision here is intentional: the crimson-to-gold brand system, the GSAP scroll choreography, the custom corner-bracket cursor, the Lenis smooth scroll. The goal was to build something that **shows** rather than claims.

<br/>

## `02` — Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_15-0D0D0D?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React_19-E11B22?style=flat-square&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-E0A82E?style=flat-square&logo=typescript&logoColor=black) |
| **Animation** | ![GSAP](https://img.shields.io/badge/GSAP_ScrollTrigger-0D0D0D?style=flat-square&logo=greensock&logoColor=88CE02) ![Lenis](https://img.shields.io/badge/Lenis_Smooth_Scroll-E11B22?style=flat-square&logoColor=white) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-E0A82E?style=flat-square&logo=tailwindcss&logoColor=black) |
| **Tooling** | ![EmailJS](https://img.shields.io/badge/EmailJS-0D0D0D?style=flat-square&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-E11B22?style=flat-square&logo=eslint&logoColor=white) |

</div>

<br/>

## `03` — Features

```
◆  Custom corner-bracket cursor — animates on every interaction state
◆  Preloader — ABA letter reveal with crimson→gold progress bar (session-gated)
◆  Page transition — crimson wipe on every route change
◆  GSAP ScrollTrigger — scroll-driven reveals on every section
◆  Lenis smooth scroll — buttery physics-based scrolling
◆  Hero parallax orbs — mouse-tracked gradient blobs with SVG grain texture
◆  Project detail tilt — 3D perspective tilt on mouse move
◆  Available for work badge — pulsing green dot in hero
◆  Contact form — powered by EmailJS, no backend required
◆  Custom 404 — branded LOST. page with GSAP entrance
◆  Fully responsive — touch-optimized with mobile-specific animations
◆  Dark-only — crimson / gold / near-black brand system
```

<br/>

## `04` — Run Locally

```bash
# Clone
git clone https://github.com/AnasBenAhmed/portfolio.git
cd portfolio

# Install
npm install

# Dev server → http://localhost:3000
npm run dev

# Production build
npm run build
```

<br/>

## `05` — Structure

```
portfolio/
├── app/
│   ├── layout.tsx               # Root layout — fonts, metadata, global providers
│   ├── page.tsx                 # Home — Hero, About, Projects, Skills, Contact
│   ├── not-found.tsx            # Custom 404
│   └── projects/[slug]/         # Dynamic project detail pages
├── components/
│   ├── layout/
│   │   ├── CustomCursor.tsx     # Corner-bracket animated cursor
│   │   ├── Navbar.tsx           # Fixed nav with smooth scroll intercept
│   │   ├── Footer.tsx           # LET'S BUILD SOMETHING footer
│   │   └── SmoothScroll.tsx     # Lenis + GSAP ticker integration
│   ├── sections/
│   │   ├── Hero.tsx             # Name animation, orbs, badge, CTA
│   │   ├── About.tsx            # Stats counters, bio
│   │   ├── Projects.tsx         # Hover-expand project rows
│   │   ├── Skills.tsx           # Categorized skill grid
│   │   ├── Contact.tsx          # EmailJS contact form
│   │   └── ProjectDetailClient.tsx   # Tilt effect + mockup frames
│   └── ui/
│       ├── Preloader.tsx        # Session-gated ABA reveal preloader
│       └── PageTransition.tsx   # Route-change crimson wipe
└── data/
    └── projects.ts              # All project data — single source of truth
```

<br/>

---

<div align="center">

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=E11B22&height=120&section=footer&text=Designed%20%26%20engineered%20by%20Anas%20Ben%20Ahmed%20%E2%80%94%20Tunisia&fontSize=14&fontColor=ffffff&fontAlign=50&fontAlignY=55&animation=fadeIn" width="100%" />

</div>
