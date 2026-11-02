# STARWEBS.KS — Luxury 1-Page Official Demo Voucher & Print Architecture

Engineered update to the STARWEBS.KS Demo Slip / Voucher (`FreeDemoModal.tsx`), chatbot widget print suppression (`ChatbotWidget.tsx`), and global CSS print media queries (`src/index.css`) to deliver an official, luxury Obsidian Dark single-page voucher with zero page overflow and verified authenticity stamps.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed in Phase 1:

- **Confirmed Print Theme**: Luxury Obsidian Dark mode with exact color preservation (`-webkit-print-color-adjust: exact`, `print-color-adjust: exact`, `#0b0b0b` deep background, and copper `#dd6b4d` accents).
- **Confirmed Visual Elements**: Official agency demo voucher featuring a prominent security seal / verified badge (`OFFICIAL STARWEBS.KS DISPATCH`), reference barcode/hash, SLA guarantees, and an executive verification stamp.
- **Strict 1-Page Enforcement**: Complete suppression of background elements (`header`, `main`, `footer`, `chatbot`, floating widgets) during `@media print`, and fixed-height 1-page layout (`max-height: 100vh; overflow: hidden; page-break-after: avoid;`).

---

## 1. Overview & Core Concept

- **The Problem**: When triggering `window.print()` from the modal, the browser attempts to print the entire multi-section background website along with floating widgets, resulting in 10–15 broken pages with overlapping chatbot controls.
- **The Solution**:
  1. Add `print:hidden` to `ChatbotWidget`, `TopBar`, `<main>`, `Footer`, and the modal's backdrop overlay.
  2. Implement an isolated `@media print` style sheet isolating `.print-voucher-card` so that ONLY the official voucher is rendered when printing.
  3. Constrain the print container to exact single-page A4 dimensions (`max-height: 297mm`, `overflow: hidden`, `page-break-inside: avoid;`).
  4. Redesign the voucher into a luxury official agency certificate with refined typography, copper hairline borders, client and project specification breakdown, and official digital security seal.

---

## 2. User Experience & Visual Design

### A. Voucher Aesthetic & Security Details
- **Header**: `STARWEBS.KS DIGITAL FLAGSHIP VOUCHER` with official registration number (`SW-REF-xxxx`).
- **Client & Project Matrix**:
  - Client name, company, and email.
  - Target Project category (Custom Web, Headless E-Commerce, etc.).
  - Allocated budget tier and speed SLA (`< 4 Hours Direct Engineering Scoping`).
- **Official Security Seal**:
  - Circular luxury SVG stamp with `STARWEBS.KS VERIFIED ARCHITECTURE · 2025/2026`.
  - Cryptographic session hash and priority dispatch barcode line.
- **Signature & Engineering Approval**:
  - Lead solutions architect verification mark.
  - Instant contact channels: WhatsApp (+383 48 881 191) and official email.

### B. Print Geometry & 1-Page Constraint
- CSS `@media print` rules:
  - `@page { size: A4 portrait; margin: 0; }`
  - Body background set to `#0b0b0b` with `-webkit-print-color-adjust: exact`.
  - Background website elements (`header`, `main`, `footer`, `.chatbot-widget`, `.modal-backdrop`) given `display: none !important;`.
  - Voucher container scaled and centered on 1 page with `page-break-after: avoid` and `max-height: 100vh`.

---

## 3. Technical Architecture & File Modifications

### Component Structure & Print Visibility

```
┌────────────────────────────────────────────────────────┐
│                      App.tsx                           │
│  ├── TopBar (print:hidden)                             │
│  ├── main (print:hidden)                               │
│  ├── Footer (print:hidden)                             │
│  ├── ChatbotWidget (print:hidden)                      │
│  └── FreeDemoModal                                     │
│       ├── Modal Backdrop & UI Controls (print:hidden)  │
│       └── Official Demo Voucher (.print-voucher-only)  │
│            ├── Obsidian Header & Wordmark              │
│            ├── Client & Architecture Spec Grid         │
│            ├── Security Verification Stamp             │
│            └── Executive Sign-off                      │
└────────────────────────────────────────────────────────┘
```

### Planned Implementation Steps
1. **Chatbot Suppression (`src/components/ChatbotWidget.tsx`)**:
   - Add `print:hidden` to the floating widget wrapper and any dialog popups.
2. **Voucher Redesign (`src/components/FreeDemoModal.tsx`)**:
   - Create a dedicated luxury single-page certificate card with official branding, registration code, client specifications, and SVG security seal.
   - Tag with `.print-voucher-only` and `print:block` while wrapping action buttons in `print:hidden`.
3. **Print Media Styles (`src/index.css`)**:
   - Add strict `@media print` rules ensuring exact single-page containment, background color fidelity, and hiding of all extraneous UI.
4. **Verification**:
   - Execute `lint_applet` and `compile_applet`.
   - Run production build verification (`npm run build`).
