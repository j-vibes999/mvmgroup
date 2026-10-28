# MVM GROUP — Website Redesign (v2.0.0)

Trilingual (Lao / English / Chinese) website redesign for MVM GROUP based on the **"Lai Kham — candlelight in a gold-lacquered sim"** design concept.

## Features

- **One-Screen App Shell**: Page-level scroll is locked (`overflow: hidden`). Subpages open in modal-like windows expanding from app tiles with dedicated URLs for SEO and sharing.
- **3D Interactive Stage**: Powered by Three.js (WebGL 2). Candlelight cursor illumination on black lacquer wall with Khor lattice pattern, extruded gold MVM emblem, and floating gold leaf dust.
- **Trilingual (lo / en / zh-Hans)**: Decap CMS YAML-based content layer with fallback to English for missing translations.
- **China-Friendly**: Self-hosted OFL fonts via Fontsource; zero dependencies on blocked Google domains.
- **Graceful Degradation**: Automatic fallback to static poster image (`stage-poster.webp`) for devices without WebGL 2 or with `prefers-reduced-motion`.

## Tech Stack

- **Framework**: [Astro 7](https://astro.build/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **3D & Animation**: [Three.js](https://threejs.org/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/)
- **Typography**: Cormorant, Marcellus, Noto Serif Lao, Noto Sans Lao, Noto Sans (via Fontsource)
- **Deployment**: Netlify (`netlify.toml`)
- **Testing**: Vitest & Playwright

## Getting Started

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:4400)
npm run dev

# Run unit tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```
