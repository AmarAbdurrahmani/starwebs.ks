# Plani i Zbatimit: Përmirësimi i Dritares së Demos (Live Preview Modal) me Ndërrues Ngjyrash në Kohë Reale, Baner Urgjence dhe WhatsApp me Referencë Unike

Ky plan përshkruan arkitekturën dhe hapat teknikë për ta bërë dritaren e demonstrimit interaktiv të **starwebs.ks** një mjet të fuqishëm konvertimi, sipas preferencave të konfirmuara nga përdoruesi.

---

## 1. Përmbledhje e Veçorive të Reja

1. **Ndërruesi i Paletave në Kohë Reale (Live Palette Switcher)**:
   - Klienti mund të zgjedhë mes 5 paletave luksoze:
     - **Obsidian Amber** (Ngjyra zyrtare e Starwebs: `#dd6b4d`, thekse të ngrohta të qelibarit)
     - **Emerald Jade** (E gjelbër smeraldi: `#10b981`, rritje e freski)
     - **Luxury Gold** (Ar luksoz: `#eab308`, elegancë ekzekutive)
     - **Cyber Cyan** (Blu teknologjike / neon cyan: `#06b6d4`, arkitekturë moderne)
     - **Ruby Velvet** (E kuqe rubini / rose: `#f43f5e`, energji e lartë dhe ekskluzivitet)
   - Ndryshimi i paletës përditëson në çast (pa rifreskuar faqen):
     - Dritën specular të dritares (top gradient border)
     - Mockup-in interaktiv (butonat e thirrjes për veprim brenda simulatorit Desktop/Mobile)
     - Thekset e metrikave (PageSpeed 100/100, latencën, badge-t)
     - Mesazhin e gatshëm të WhatsApp-it me emrin e stilit të zgjedhur

2. **Kutia e Urgjencës dhe Konvertimit (Live Conversion Banner)**:
   - **Koha e kufizuar:** Numërim mbrapsht i gjallë 48-orësh (`47:59:44`) me orë, minuta dhe sekonda në font tabular.
   - **Oferta ekskluzive:** 
     - **15% Zbritje** në zhvillimin e uebfaqes për këtë arkitekturë.
     - **Auditim falas i shpejtësisë** dhe konfigurim i plotë i CDN-së globale.
   - **Treguesi i disponueshmërisë:** *"E rezervuar vetëm për këtë kod demoje · Vetëm 2 vende të lira për këtë javë"*.
   - Efekt pulsimi me dritë të butë që tërheq vëmendjen pa prishur dizajnin minimalist obsidian.

3. **Optimizimi i Butonit dhe Mesazhit të WhatsApp**:
   - Lidhja e butonit `"E dua këtë uebfaqe - Kontakto në WhatsApp"` gjeneron automatikisht tekstin me referencën unike:
     > *"Përshëndetje Starwebs, pashë demo-n e gjeneruar me kodin SW-REF-... për biznesin tim '[Emri i Biznesit]' ([Industria], stili [Stili i Zgjedhur]) dhe dua ta diskutojmë për biznesin tim dhe të përfitoj ofertën me 15% zbritje!"*
   - Përfshirja e një butoni shtesë për kopjimin e shpejtë të kodit të referencës me një klikim.

---

## 2. Skedarët që do të Përditësohen

- `/src/components/PersonalizedDemoPreviewModal.tsx`:
  - Shtohet gjendja lokale `selectedPalette` me 5 opsionet e konfirmuara.
  - Shtohet komponenti i ndërruesit të paletave me swatch interaktivë në krye të dritares.
  - Shtohet `LiveCountdownTimer` 48-orësh që numëron sekondat në kohë reale.
  - Shtohet baneri i urgjencës me theksimin e 15% zbritjes dhe auditimit falas.
  - Përditësohet formati i linkut të WhatsApp-it për të përfshirë kodin e saktë të referencës (`refNumber`) dhe stilin e përzgjedhur.

---

## 3. Hapat e Verifikimit

1. Ekzekutimi i `lint_applet` (`tsc --noEmit`) për të siguruar pastërtinë e kodeve TypeScript.
2. Ekzekutimi i `compile_applet` (`npm run build`) për të konfirmuar ndërtimin e suksesshëm të aplikacionit.
3. Testimi vizual: Verifikimi i ndërrimit të ngjyrave në kohë reale, i numërimit mbrapsht të banerit, dhe i hapjes së WhatsApp me mesazhin e përgatitur.
