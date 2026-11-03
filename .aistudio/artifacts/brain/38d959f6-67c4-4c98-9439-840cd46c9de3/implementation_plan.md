# STARWEBS.KS — Trust & Verification Section & Kosovo Business Integrity Architecture

Architectural plan to integrate a dedicated **Trust & Verification** section (`TrustVerificationSection.tsx`) directly before the Contact section, and update the **Footer** (`Footer.tsx`) with verified Kosovo enterprise trust links (ARBK registration and Superpuna government platform).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed in Phase 1:

- **Confirmed Placement**: Placed directly before the Contact & Commission section (`#trust` section right above `#contact`), providing immediate institutional confidence and credibility before users submit their inquiry.
- **Confirmed Primary CTA**: `"Shiko Pozitat e Hapura në Superpuna"` linking to `https://superpuna.rks-gov.net/job-seeker/employer/starwebs-ks` with external security attributes (`target="_blank" rel="noopener noreferrer"`).
- **Confirmed Aesthetic**: Obsidian Dark with authentic glassmorphism (`bg-neutral-900/40`, `backdrop-blur-md`, `border border-white/10`), minimal government-grade badges, and smooth Framer Motion scroll entrance (`whileInView`).

---

## 1. Overview & Core Concept

- **Business Credibility & Regional Trust**:
  - Establish that **STARWEBS.KS** is an officially registered business entity in Kosovo through the **Agjencia për Regjistrimin e Bizneseve në Kosovë (ARBK)**.
  - Highlight active engagement in youth employment and developer hiring through **Superpuna** (the Republic of Kosovo Ministry of Finance & Employment initiative: `rks-gov.net`).
- **Target Audience Impact**:
  - Eliminates skepticism for domestic and international clients by verifying legal status and public government-verified employer credentials.
  - Attracts ambitious developer talent looking for high-performance React/Next.js/TypeScript engineering roles.

---

## 2. User Experience & Visual Design

### A. Seksioni "Trust & Verification" (`src/components/TrustVerificationSection.tsx`)
- **Container**: Sits in `<main>` with `id="trust"`, constrained to `max-w-[1440px]`, bordered by `border-t border-white/[0.08]`.
- **Atmospheric Glow**: Subtle copper-cyan backdrop illumination and minimal grid overlay.
- **Header**:
  - Badge: `Besueshmëria & Integriteti Zyrtar · Verified Kosovo Business`.
  - Headline: `Agjenci e Regjistruar Zyrtarisht & e Përkushtuar ndaj Talentit`.
  - Subtitle: `Transparencë e plotë institucionale, zhvillim i standardeve evropiane të inxhinierisë dhe punësim i vazhdueshëm i gjeneratës së re të programuesve.`
- **Grid Layout (2 Balanced Glassmorphic Cards)**:
  1. **ARBK Registration Card**:
     - Visual Icon: Verified Shield / Building2.
     - Headline: `Regjistruar Zyrtarisht në ARBK`.
     - Details: `Agjencia për Regjistrimin e Bizneseve të Kosovës (Ministria e Industrisë, Ndërmarrësisë dhe Tregtisë)`.
     - Badges: `Statusi: Aktiv`, `Pajtueshmëri Ligjore 100%`, `Faturim Zyrtar & Kontrata B2B`.
  2. **Superpuna Verified Employer Card**:
     - Visual Icon: Briefcase / Users / Sparkles with emerald accent.
     - Headline: `Punëdhënës i Verifikuar në Superpuna`.
     - Details: `Platforma qeveritare e Republikës së Kosovës për punësimin dhe fuqizimin e të rinjve në sektorin e teknologjisë.`.
     - Call to Action Button:
       - Label: `"Shiko Pozitat e Hapura në Superpuna"`
       - Icon: `ArrowUpRight`
       - URL: `https://superpuna.rks-gov.net/job-seeker/employer/starwebs-ks`
       - Style: `btn-primary-orange btn-glow-hover` (or sleek glass emerald accent button).

### B. Footer Updates (`src/components/Footer.tsx`)
- Add a new **Verified Kosovo Business Links** block:
  - Official ARBK verification badge with text: `Biznes i Regjistruar në ARBK`.
  - Direct Superpuna link: `Profili në Superpuna` linking to `https://superpuna.rks-gov.net/job-seeker/employer/starwebs-ks`.
- Add quick jump link to `#trust` in Agency Navigation.

---

## 3. Technical Architecture & Component Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     App.tsx (<main>)                            │
│  ├── HeroSection                                                │
│  ├── HighImpactStatsBar                                         │
│  ├── ServicesSection                                            │
│  ├── PortfolioShowcase (Bento Grid)                             │
│  ├── TechStackGrid                                              │
│  ├── CaseStudiesSection                                         │
│  ├── TrustVerificationSection (NEW: ARBK + Superpuna)           │
│  └── ContactSection                                             │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │       Footer.tsx        │
                    │ - ARBK Business Link    │
                    │ - Superpuna Direct Link │
                    │ - WhatsApp & Instagram  │
                    └─────────────────────────┘
```

### Implementation Sequence
1. Create `src/components/TrustVerificationSection.tsx` with Framer Motion scroll reveal and glassmorphic cards.
2. Update `src/components/Footer.tsx` with the new trust links.
3. Update `src/App.tsx` to mount `TrustVerificationSection` directly before `ContactSection`.
4. Verify with `lint_applet` and `compile_applet`.
