---
name: Obsidian Architectural Glass
colors:
  surface: '#181212'
  surface-dim: '#181212'
  surface-bright: '#403737'
  surface-container-lowest: '#130d0d'
  surface-container-low: '#211a1a'
  surface-container: '#251e1e'
  surface-container-high: '#302828'
  surface-container-highest: '#3b3333'
  on-surface: '#eddfdf'
  on-surface-variant: '#dbc1ba'
  inverse-surface: '#eddfdf'
  inverse-on-surface: '#362e2e'
  outline: '#a38c85'
  outline-variant: '#55433e'
  surface-tint: '#ffb59f'
  primary: '#ffb59f'
  on-primary: '#5b1a05'
  primary-container: '#d5775b'
  on-primary-container: '#521401'
  inverse-primary: '#97472e'
  secondary: '#d2c4b9'
  on-secondary: '#372f28'
  secondary-container: '#51473f'
  on-secondary-container: '#c3b6ac'
  tertiary: '#ffb59a'
  on-tertiary: '#53220e'
  tertiary-container: '#c67f65'
  on-tertiary-container: '#4a1b08'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59f'
  on-primary-fixed: '#3a0a00'
  on-primary-fixed-variant: '#793019'
  secondary-fixed: '#eee0d5'
  secondary-fixed-dim: '#d2c4b9'
  on-secondary-fixed: '#211a14'
  on-secondary-fixed-variant: '#4e453d'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#6e3722'
  background: '#181212'
  on-background: '#eddfdf'
  surface-variant: '#3b3333'
typography:
  display-hero:
    fontFamily: Syne
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 54px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Syne
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1.25rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an architectural, atmospheric digital experience tailored for an elite digital engineering studio. Combining structural rigor with deep atmospheric luxury, the design language merges ultra-dark espresso tones with ethereal, tactile frosted layers. 

### Aesthetic Pillars
- **Dark-Mode Glassmorphism:** Controlled depth using multi-layered, ultra-fine frosted surfaces, specular light catches, and diffused radial illumination rather than opaque planes.
- **Architectural Precision:** Structural discipline driven by avant-garde geometric display typography paired with razor-sharp, readable data-centric layouts.
- **Warm Obsidian Tones:** Moving away from sterile slate/black palettes into rich, organic espresso depths accented by subtle, smoldering terracotta ambient glows.
- **Atmospheric Weight:** Tactile, deliberate interactions that communicate high engineering fidelity, bespoke craftsmanship, and technological superiority.

## Colors

The palette leverages a deep, non-polar espresso foundation offset by warm mineral tones and a controlled terracotta illumination.

### Core Swatches
- **Primary (`#C86D51`):** Muted Terracotta. Reserved for high-value conversion elements, focused interactive states, and active directional vectors.
- **Secondary (`#E3D5CA`):** Warm Sand / Soft Taupe. Applied to surface tinting, luminous edge reflections, and secondary interactive accents.
- **Tertiary (`#D48B70`):** Luminous Amber-Terracotta. Used for ambient glow projections, active indicator lights, and radiant focal points.
- **Neutral (`#100A0A`):** Deep Obsidian Espresso. Serves as the primary canvas background. Layered surfaces use `#180F0E` for elevated tonal backdrops.

### Surface & Glass Variables
- **Base Canvas:** `#100A0A`
- **Elevated Canvas:** `#180F0E`
- **Glass Fill (Default):** `rgba(227, 213, 202, 0.05)`
- **Glass Fill (Hover/Elevated):** `rgba(227, 213, 202, 0.08)`
- **Glass Border (Subtle):** `rgba(255, 255, 255, 0.08)`
- **Glass Border (Specular Highlight):** `rgba(255, 255, 255, 0.20)`
- **Ambient Glow:** `rgba(200, 109, 81, 0.25)`

### Typography Color Tiers
- **Text High-Contrast:** `#F9F6F0` (Crisp Off-White for headlines and vital data)
- **Text Medium-Contrast:** `#A89F91` (Muted Warm Sand for body prose, meta tags, and labels)
- **Text Low-Contrast:** `rgba(168, 159, 145, 0.50)` (Placeholders, inactive elements, micro-captions)

## Typography

The typography pairing contrasts architectural, wide-profile geometric display titles with clean, highly engineered grotesque body typography.

- **Display & Headings (Syne):** Heavy optical presence, sculptural letterforms, and tight tracking (-0.02em to -0.04em). Used exclusively for brand statements, high-impact project titles, and major metrics.
- **Body & Functional Labels (Plus Jakarta Sans):** Highly legible across low-opacity backgrounds and frosted containers. Generous x-height prevents blur degradation over visual noise. Labels and technical metadata feature wide letter spacing (`0.08em` to `0.1em`) with uppercase transforms to evoke engineering blueprints.

## Layout & Spacing

The layout is built on an adaptive 12-column fluid grid system bounded by maximum canvas widths of 1440px to preserve line-length legibility.

### Responsive Breakpoints & Grids
- **Mobile (< 768px):** 4-column layout. Margin: `1.25rem` (`margin-sm`). Gutter: `1rem` (`gutter-sm`). Cards and data units stack vertically.
- **Tablet (768px - 1024px):** 8-column layout. Margin: `2rem` (`margin`). Gutter: `1.5rem` (`gutter`).
- **Desktop (> 1024px):** 12-column layout. Margin: `4rem` (`margin-lg`). Gutter: `2rem` (`gutter-lg`). Complex asymmetric offsets and modular split-screen technical breakdowns are encouraged.

### Vertical Cadence
Spacing between discrete glass modules relies on `space-xl` (40px) or double-scale steps (80px), creating quiet voids that let deep canvas tones and ambient light sources breathe.

## Elevation & Depth

Depth is established through translucent physical layering, variable refraction, and directional ambient illumination rather than standard drop shadows.

### Glassmorphic Hierarchy
- **Level 0 (Canvas):** Pure `#100A0A` base layer, accented with fixed radial gradients of Terracotta (`rgba(200, 109, 81, 0.12)`) blurred at 120px to simulate rear light projection.
- **Level 1 (Structural Panels & Ambient Cards):**
  - Fill: `rgba(227, 213, 202, 0.04)`
  - Backdrop Blur: `16px`
  - Border: 1px continuous hairline `rgba(255, 255, 255, 0.08)`
  - Shadow: `0 8px 32px 0 rgba(0, 0, 0, 0.40)`
- **Level 2 (Interactive Modules, Modals, Overlays):**
  - Fill: `rgba(227, 213, 202, 0.08)`
  - Backdrop Blur: `24px`
  - Border: 1px linear gradient stroke from `rgba(255, 255, 255, 0.20)` at top-left to `rgba(255, 255, 255, 0.05)` at bottom-right.
  - Shadow: `0 20px 48px rgba(0, 0, 0, 0.60)`, combined with a localized inner shadow `inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)`.
- **Level 3 (Focused & Glow States):**
  - Inherits Level 2 properties, augmented by an exterior glow: `0 0 24px rgba(200, 109, 81, 0.25)`.

## Shapes

The interface balances sharp architectural lines with soft curvature (`roundedness: 2`). Standard modules and containers utilize 0.5rem (8px) corner radii, large showcase cards utilize 1rem (16px), and interactive system tags or dynamic indicators transition into full capsule/pill formats.

- **Micro Controls & Badges:** Full pill geometry (`9999px`) for metric tags, pills, and system badges.
- **Form Controls & Inputs:** 0.5rem (`8px`) for structured, architectural input framing.
- **Panels & Cards:** 1rem (`16px`) for structural glass boundaries, framing technical content seamlessly without aggressive rounding.

## Components

### Buttons
- **Primary CTA:** Solid Terracotta `#C86D51` base with crisp `#F9F6F0` text, subtle radial top-highlight, and an ambient hover glow (`0 0 20px rgba(200, 109, 81, 0.4)`). Radius: 0.5rem. Typography: `label-md`.
- **Secondary (Glass Action):** Background `rgba(227, 213, 202, 0.06)`, backdrop filter `blur(12px)`, 1px border `rgba(255, 255, 255, 0.12)`. On hover, border brightness shifts to `rgba(255, 255, 255, 0.25)` and background to `rgba(227, 213, 202, 0.10)`.

### Cards & Glass Panels
- Built with a 1px composite border (top/left edge catch light). Internal padding: `space-lg` to `space-xl`.
- Interactive cards incorporate a dynamic cursor-following radial gradient overlay: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(200, 109, 81, 0.12), transparent 70%)`.

### Metric Badges & Sleek Tech Pills
- Pill-shaped (`roundedness: 3`) micro-containers.
- Fill: `rgba(24, 15, 14, 0.70)` with backdrop blur `12px` and a hairline border `rgba(255, 255, 255, 0.10)`.
- Internal structure: A 6px glowing LED indicator (`#C86D51` with box-shadow pulse) positioned left of `label-sm` uppercase text in `#E3D5CA`.

### Form Fields & Inputs
- Fill: `rgba(16, 10, 10, 0.60)` inset backdrop with 1px border `rgba(255, 255, 255, 0.08)`.
- Focus state: Border transitions to `#C86D51` with an outer focus ring `0 0 0 1px #C86D51` and ambient flare `0 0 16px rgba(200, 109, 81, 0.20)`. Typography uses `body-md` in `#F9F6F0`.

### Checkboxes & Radios
- Custom glass squares (radii: 4px) and circles for radios. Hairline border `rgba(255, 255, 255, 0.20)`.
- Checked state: Filled with `#C86D51`, displaying a razor-sharp `#F9F6F0` glyph accompanied by a subtle ambient back-glow.

### Lists & Technical Tables
- Borderless rows separated strictly by 1px hairline dividers (`rgba(255, 255, 255, 0.05)`).
- Row hover triggers a subtle glass shift: `rgba(227, 213, 202, 0.03)` with smooth 200ms transition timing.