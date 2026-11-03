# Minimalist Architecture: Dedicated FAQ View & Clean Landing Page

Architectural blueprint for refining **starwebs.ks** into an ultra-minimalist, high-performance landing page while establishing a dedicated, full-page Obsidian Dark FAQ view (`#faq`) accessible via an elegant link in the footer.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Choices from Phase 1 Clarification:**
> - **View Presentation**: Dedicated full-page view with top return button and synchronized browser URL hash (`#faq`).
> - **Footer Navigation Label**: `Pyetjet e Shpeshta (FAQ)` located under the agency navigation directory.
> - **State & URL Synchronization**: Seamless dual-mode routing supporting direct hash navigation (`#faq`, `#overview`, etc.) and browser back/forward buttons without third-party router overhead.

***

### 1. Overview & Core Concept

- **What It Does**: Strips any lingering informational clutter and redundant text walls from the main landing page, ensuring generous whitespace and obsidian luxury aesthetic focused on services and portfolio. Moves in-depth client questions into a dedicated `FAQView` component equipped with categorised accordions, live question search, and direct contact hooks (WhatsApp and Free Demo).
- **Target Audience**: Ambitious enterprise clients, founders, and e-commerce directors seeking clarity on development processes, pricing tiers, SLAs, and technical standards without cluttering their initial landing visual journey.
- **Key Value**: Preserves elite landing page conversions and mobile scroll fluidity while giving inquisitive prospects an organized, comprehensive resource for answers.

***

### 2. User Experience & Visual Design

- **Landing Page Minimalism**:
  - The landing page flows cleanly: *Hero & Speed Engine → High Impact Stats → Services Grid & Quote Calculator → Portfolio Showcase & Live Frames → Tech Stack → Case Studies → ARBK Trust Verification → Contact*.
  - Whitespace padding remains generous (`py-20 sm:py-28 lg:py-36`) with subtle ambient neon glows (`#dd6b4d` burnt copper and vivid cyan).
- **Dedicated FAQ View Experience (`#faq`)**:
  - **Header & Navigation Bar**: Top navigation bar persists seamlessly. Includes an immediate prominent "← Kthehu në Ballinë" (Return to Home) button with breadcrumb navigation.
  - **Hero Header**: Atmospheric title *"Pyetjet e Shpeshta & Standardet e Zhvillimit"* with an interactive live search bar to quickly filter answers by keyword (e.g. *çmimi, afati, e-commerce, kodi, siguria*).
  - **Categorized Luxury Accordions**:
    1. *Çmimet & Preventivi* (Pricing, transparent fixed quotes, deposit structures).
    2. *Afatet & Metodologjia* (Timelines from 2 to 6 weeks, expedited sprints, agile milestones).
    3. *Arkitektura Teknike & Shpejtësia* (React 19, Next.js, sub-second load times, headless Shopify).
    4. *ARBK, Kontratat & Ligjshmëria* (Official business registration, B2B contracts, invoices in Kosovo).
    5. *Mirëmbajtja & Garancia* (Post-launch support, Core Web Vitals guarantees).
  - **Direct Escalation Banner**: Bottom card allowing users to jump directly to WhatsApp (`+383 48 881 191`) or open the Free Demo booking modal if their question requires custom scoping.
- **Footer Link**:
  - Integrated into the `Agency Navigation` column as a dedicated button: `Pyetjet e Shpeshta (FAQ)`.
  - Hover transition with burnt copper accent glow (`#ff9d82`) matching the obsidian luxury palette.

***

### 3. Key Product Decisions & Trade-Offs

- **View Routing Strategy (URL Hash vs. External Router Library)**:
  - *Chosen Approach*: Lightweight hash-based view controller (`window.location.hash === '#faq'` paired with React state `currentView: 'home' | 'faq'`).
  - *Why*: Eliminates the need to install heavy external router dependencies (keeping Vite bundle size under 150kB for 99+ mobile speed score) while still supporting bookmarkable URLs, direct link sharing, and native browser back-button navigation.
- **FAQ Data Architecture**:
  - *Chosen Approach*: Modular data file `src/data/faqData.ts` exporting strongly-typed question/answer items grouped by category tags.
  - *Why*: Keeps components pure and maintainable, easily editable by agency founders without touching rendering logic.

***

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│            State: currentView ('home' | 'faq'), hash listener          │
└───────────────┬────────────────────────────────────────┬───────────────┘
                │                                        │
     [currentView === 'home']                 [currentView === 'faq']
                │                                        │
                ▼                                        ▼
┌───────────────────────────────┐        ┌───────────────────────────────┐
│     Main Landing Experience   │        │           FAQView             │
│  - HeroSection                │        │  - Breadcrumb & Back Button   │
│  - HighImpactStatsBar         │        │  - Search / Category Filter   │
│  - ServicesSection            │        │  - Luxury Accordion Cards     │
│  - PortfolioShowcase          │        │  - WhatsApp & Demo Escalation │
│  - TechStackGrid              │        └───────────────────────────────┘
│  - CaseStudiesSection         │                        ▲
│  - TrustVerificationSection   │                        │
│  - ContactSection             │                        │
│  - Footer (with FAQ link) ────┼────────────────────────┘
└───────────────────────────────┘
```

- **Interactive State Transitions**:
  - Clicking `Pyetjet e Shpeshta (FAQ)` in the footer sets `currentView('faq')`, updates `window.location.hash = '#faq'`, and scrolls smoothly to top.
  - Clicking "Kthehu në Ballinë" or selecting any section in the top navigation returns to `home` and scrolls to the selected anchor.
  - Native `window.addEventListener('hashchange', ...)` ensures back/forward browser gestures work naturally.
