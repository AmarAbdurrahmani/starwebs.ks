# Implementation Plan: Official Logo Integration & Mobile-First Optimization

Integrate the official STARWEBS.KS agency circular emblem (`/assets/aistudio/logo_e0adced0.png`) across the digital touchpoints and implement full mobile-first optimizations for seamless responsiveness, navigation, and readability.

---

## User Review Required

> [!NOTE]
> Based on your selections:
> 1. **Header Logo**: Circular emblem with crisp STARWEBS wordmark next to it in a unified luxury glass badge.
> 2. **AI Chatbot on Mobile**: Compact bottom-right floating trigger with safe spacing above mobile edges (`bottom-4 right-4 sm:bottom-6 sm:right-6`) and full-screen backdrop blur (`backdrop-blur-md bg-black/70`) when open.

---

## Proposed Changes

### 1. Navigation Header & Mobile Menu (`src/components/TopBar.tsx`)
- **Official Brand Mark**: Embed the circular emblem (`/assets/aistudio/logo_e0adced0.png`, 36px height) with rounded luxury framing alongside the crisp `STARWEBS.KS` typography and glowing obsidian accent dot.
- **Mobile Hamburger Navigation**: 
  - Add an intuitive mobile hamburger toggle (`Menu` / `X` icon) visible on `< lg` screens.
  - Render an animated glassmorphic slide-out / drawer menu with `bg-neutral-950/95 backdrop-blur-xl border-b border-white/10`.
  - Provide direct mobile navigation buttons (Overview, Services, Portfolio, Case Studies, Contact) + "Kërko Demo Falas" CTA.

### 2. Agency Footer & Booking Voucher (`src/components/Footer.tsx` & `src/components/FreeDemoModal.tsx`)
- **Footer**: Place the official emblem next to the agency brand title in the primary brand column with quick ARBK and Superpuna trust verification links.
- **Booking Voucher Slip (`FreeDemoModal.tsx`)**: Replace generic placeholder with the official circular logo in the top voucher header and printable slip (`max-w-[70px]` high-DPI display with "STARWEBS.KS - Digital Engineering Agency" letterhead).

### 3. Responsive Spacing & Layout Harmonization
- **Hero Section (`src/components/HeroSection.tsx`)**:
  - Adjust mobile padding from `py-20` down to `pt-24 pb-12 px-4 sm:px-6` to avoid empty screen bulk.
  - Scale typography cleanly (`text-3xl sm:text-5xl lg:text-6xl`) with controlled line-height to prevent word clipping.
  - Ensure stats cards and action buttons wrap effortlessly on narrow screens (iPhone SE / 360px+).
- **Portfolio Bento Grid (`src/components/PortfolioShowcase.tsx`)**:
  - Ensure single-column stacking (`grid-cols-1 md:grid-cols-12`) on mobile with 16:9 cinematic framing and zero horizontal overflow.
  - Refine modal image inspector controls for touch devices (compact close and zoom toggles).
- **Trust & Verification Section (`src/components/TrustVerificationSection.tsx`)**:
  - Tighten container paddings (`py-12 sm:py-20 px-4 sm:px-8`) and ensure ARBK & Superpuna badge cards stack neatly in 1 column on mobile screens.

### 4. AI Chatbot Widget Mobile Isolation (`src/components/ChatbotWidget.tsx`)
- **Compact Trigger**: Position with mobile safe area padding (`bottom-4 right-4 sm:bottom-6 sm:right-6`) so it never collides with sticky elements or bottom bars.
- **Mobile Full Backdrop Overlay**: When open, render a full-screen `fixed inset-0 bg-black/70 backdrop-blur-md z-40` isolating the chat interface from background noise.
- **Responsive Chat Window Dimensions**: Ensure the chat modal fits within `w-[calc(100vw-2rem)] sm:w-[420px]` and `max-h-[82vh] sm:max-h-[640px]`, with sticky header and mobile-friendly tap targets.

---

## Verification Plan

### Automated Checks
- Run `npm run build` / TypeScript verification (`compile_applet`) to ensure type safety, zero broken imports, and clean packaging.
- Run `lint_applet` to check for syntax and lint cleanliness.

### Manual Verification
- Test navbar hamburger toggle behavior on mobile viewport widths (375px, 414px) and ensure desktop view remains uncluttered.
- Verify that `/assets/aistudio/logo_e0adced0.png` renders sharply in header, footer, and printable voucher slip.
- Verify chatbot trigger position and backdrop blur overlay activation on mobile screen preview.
- Confirm zero horizontal scroll or clipped headings across all breakpoints.
