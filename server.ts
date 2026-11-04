import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get dynamically initialized Gemini AI Client
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

const STARWEBS_SYSTEM_PROMPT = `You are the Starwebs Lead AI Assistant for starwebs.ks, an elite web development and digital engineering agency based in Prishtina, Kosovo.

AGENCY PROFILE & TRUTHS:
- Name: starwebs.ks (STARWEBS SH.P.K., officially registered in ARBK, Republic of Kosovo).
- Specialization: Custom high-performance web development, headless e-commerce (Shopify/Stripe), mobile-first optimization (<800ms load times, 100/100 Core Web Vitals), and luxury Obsidian Dark UI/UX.
- Direct Contact: WhatsApp / Phone: +383 48 881 191 | Instagram: @starwebs.ks (https://instagram.com/starwebs.ks).
- Fixed Pricing Tiers:
  * Mobile-First Redesign & Speed Optimization: Starting from €2,900
  * Custom Web Application / Management Platform: Starting from €3,800
  * Headless E-Commerce Flagship: Starting from €5,200
  * Enterprise Scale Architecture: Starting from €8,500+
- Production Timelines:
  * High-Converting Landing Sprint: 2 to 4 weeks
  * Custom Web Platform / App: 4 to 8 weeks
  * Headless E-Commerce: 6 to 8 weeks
  * Weekly milestones with live interactive prototype previews at each stage.
- Free Demo Offer:
  * Free Core Web Vitals and speed audit of current website.
  * Architectural blueprint and customized interactive mockup within 48 hours without any financial obligation.
- Legal & Trust:
  * Registered in ARBK with full tax compliance.
  * Formal service contracts, Mutual NDAs, and 100% full client intellectual property ownership of the source code.

DIRECTIVES:
- Answer the user's specific question directly, intelligently, and thoroughly.
- Never give generic or repetitive responses. Address the exact topic requested (pricing, timeline, tech stack, demo, ARBK trust, or e-commerce).
- Match the language of the user: if the user asks in Albanian, reply in fluent, professional, articulate Albanian. If in English, reply in English.
- Be courteous, consultative, authoritative, and concise.`;

// Intelligent Domain-Knowledge Reasoning Engine
function generateDomainKnowledgeAnswer(query: string, language: 'sq' | 'en', isVoice: boolean): string {
  const q = query.toLowerCase();

  // 1. Pricing / Çmimet / Kosto
  if (q.includes('çmim') || q.includes('cmim') || q.includes('kushton') || q.includes('price') || q.includes('cost') || q.includes('pagu') || q.includes('buxhet')) {
    if (isVoice) {
      return language === 'en'
        ? "Our bespoke web development starts at €2,900 for mobile-first optimizations, €3,800 for custom web applications, and €5,200 for headless e-commerce stores. All projects include sub-second load speeds and a dedicated warranty."
        : "Çmimet tona nisin nga €2,900 për optimizime mobile-first, €3,800 për aplikacione ueb me porosi, dhe €5,200 për dyqane headless e-commerce. Çdo projekt përfshin shpejtësi nën 800 milisekonda dhe garanci të plotë.";
    }
    return language === 'en'
      ? "Here is our transparent pricing structure for starwebs.ks:\n\n• Mobile-First Overhaul & Speed: From €2,900 (Sub-second load times, thumb UX, SEO architecture)\n• Custom Web Application: From €3,800 (React 19, TypeScript, API integrations, custom dashboard)\n• Headless E-Commerce: From €5,200 (Stripe/Shopify headless, high conversion, sub-second checkout)\n• Enterprise Architecture: From €8,500+ (Multi-tenant, bespoke workflows)\n\nPayments are milestone-based (typically 50% upon kick-off and 50% upon final sign-off). You can also click 'GET A FREE DEMO' to receive a fixed architectural quote."
      : "Struktura e çmimeve tek starwebs.ks është transparente dhe e bazuar në vlerë fikse:\n\n• Optimizim & Redizajn Mobile-First: Nga €2,900 (Shpejtësi <800ms, UX për celularë, SEO e avancuar)\n• Aplikacion Ueb me Porosi: Nga €3,800 (React 19, TypeScript, panele administrimi, API)\n• Headless E-Commerce: Nga €5,200 (Integrim me Stripe/Shopify, shpejtësi maksimale konvertimi)\n• Sisteme Enterprise: Nga €8,500+ (Arkitekturë e shkallëzueshme me porosi)\n\nPagesat ndahen në etapa sipas kontratës zyrtare. Mund të klikoni 'GET A FREE DEMO' për një ofertë të detajuar për projektin tuaj.";
  }

  // 2. Timeline / Kohëzgjatja / Afatet / Sa kohë / Delivery
  if (q.includes('afat') || q.includes('zgjat') || q.includes('kohe') || q.includes('kohë') || q.includes('timeline') || q.includes('duration') || q.includes('jav') || q.includes('deliver') || q.includes('shpejt')) {
    if (isVoice) {
      return language === 'en'
        ? "Landing sprints take 2 to 4 weeks, while custom web applications and e-commerce platforms take 4 to 8 weeks. We deliver interactive milestones every single week."
        : "Për landing faqe afati është 2 deri në 4 javë, ndërsa për aplikacione me porosi dhe dyqane e-commerce është 4 deri në 8 javë. Ne dorëzojmë prototipa live çdo javë gjatë zhvillimit.";
    }
    return language === 'en'
      ? "Our engineering sprints are organized into rapid weekly production cycles:\n\n• High-Converting Landing Sprints: 2 to 4 weeks from kickoff to production deployment.\n• Custom Web Applications & Portals: 4 to 8 weeks, including UI/UX design, database architecture, and QA testing.\n• Headless E-Commerce Flagships: 6 to 8 weeks, including payment gateways and catalog indexing.\n\nYou review and test functional live previews at the end of every week."
      : "Afatet tona të zhvillimit janë të strukturuara me sprinte javore:\n\n• Landing faqe me konvertim të lartë: 2 deri në 4 javë nga fillimi deri në publikim.\n• Aplikacione ueb me porosi: 4 deri në 8 javë (dizajni UI/UX, databaza, logjika inxhinierike dhe testimi).\n• Dyqane Headless E-Commerce: 6 deri në 8 javë (pagesat me karta, sinkronizimi i produkteve).\n\nNë çdo fundjave ju keni qasje në një prototip funksional live për të parë progresin.";
  }

  // 3. Free Demo / Prototip / Si funksionon demoja
  if (q.includes('demo') || q.includes('audit') || q.includes('prove') || q.includes('provë') || q.includes('konsult')) {
    if (isVoice) {
      return language === 'en'
        ? "Our free demo includes a complete speed audit and a bespoke interactive UI mockup within 48 hours without any financial obligation. Simply tap 'GET A FREE DEMO' in the menu."
        : "Demoja jonë falas përfshin auditimin e shpejtësisë dhe një prototip fillestar UI brenda 48 orëve, pa asnjë obligim financiar. Mund të klikoni 'GET A FREE DEMO' për ta nisur menjëherë.";
    }
    return language === 'en'
      ? "What is included in the Starwebs Free Demo & Architectural Audit?\n\n1. Core Web Vitals Audit: We analyze your current website's LCP, CLS, and mobile performance bottlenecks.\n2. Bespoke Interactive Mockup: Our senior designers craft a tailored prototype tailored to your brand in luxury Obsidian Dark.\n3. Architectural Blueprint: Fixed timeline, tech stack recommendation, and exact investment roadmap.\n\nAll delivered within 48 hours with zero financial commitment. Click 'GET A FREE DEMO' to get started."
      : "Çfarë përfshin Demoja Falas dhe Auditimi Teknik nga starwebs.ks?\n\n1. Auditimi i Shpejtësisë: Analizojmë performancën aktuale, ngarkimin në celularë dhe Core Web Vitals.\n2. Prototip Interaktiv me Porosi: Përgatisim një draft dizajni modern me stilin tonë Obsidian Dark brenda 48 orëve.\n3. Plani Teknik & Çmimi Fiks: Blueprint i plotë i zhvillimit pa asnjë obligim financiar.\n\nMund të klikoni butonin 'GET A FREE DEMO' në krye të faqes ose të na shkruani drejtpërdrejt.";
  }

  // 4. Performance / Speed / Pse më të shpejtë / Core Web Vitals
  if (q.includes('shpejt') || q.includes('speed') || q.includes('load') || q.includes('lcp') || q.includes('core web') || q.includes('performanc') || q.includes('wordpress')) {
    if (isVoice) {
      return language === 'en'
        ? "We engineer websites with React 19 and modern headless code instead of bloated templates. Every site achieves sub-800 millisecond load speeds and 100/100 Core Web Vitals scores."
        : "Ne përdorim React 19 dhe kod të pastër pa shabllone të rënda me plug-in. Çdo uebfaqe ngarkohet nën 800 milisekonda dhe arrin rezultate maksimale 100/100 në Google.";
    }
    return language === 'en'
      ? "Why are starwebs.ks websites substantially faster?\n\n• Zero Template Bloat: We never use WordPress themes loaded with 50 unoptimized plugins.\n• Modern React 19 & TypeScript: Clean, statically typed components and pre-rendered edge markup.\n• Sub-Second LCP (<800ms): Guaranteed to pass all Google Core Web Vitals with 98-100 scores.\n• Mobile-First Thumb UX: Engineered specifically for smartphones where over 80% of traffic originates."
      : "Pse uebfaqet e ndërtuara nga starwebs.ks janë dukshëm më të shpejta?\n\n• Pa shabllone të rënda: Nuk përdorim WordPress me dhjetëra plug-in që ngadalësojnë faqen.\n• React 19 & TypeScript: Kod i pastër, modern dhe i optimizuar për shfletuesit modernë.\n• Shpejtësi <800ms: Arrijmë 98 deri 100 pikë në Google Core Web Vitals dhe Google PageSpeed.\n• Optimizim 100% për Celularë: Navigim i përshtatur për përdorim me gisht të madh (thumb UX).";
  }

  // 5. Trust / ARBK / Legal / Kontrata / Siguria
  if (q.includes('arbk') || q.includes('ligj') || q.includes('kontrat') || q.includes('besueshm') || q.includes('fatur') || q.includes('legal') || q.includes('trust') || q.includes('zyr')) {
    if (isVoice) {
      return language === 'en'
        ? "STARWEBS SH.P.K. is a registered business in ARBK, Republic of Kosovo. We provide official commercial contracts, mutual NDAs, and full client IP code ownership."
        : "STARWEBS SH.P.K. është biznes i regjistruar zyrtarisht në ARBK në Republikën e Kosovës. Punojmë me kontrata zyrtare, faturim fiskal dhe marrëveshje konfidencialiteti NDA.";
    }
    return language === 'en'
      ? "Official Legal & Business Verification:\n\n• Registered Legal Entity: STARWEBS SH.P.K. registered with ARBK (Kosovo Business Registration Agency).\n• Official Contracts: Comprehensive commercial agreements detailing SLAs, deliverables, and fixed pricing.\n• Full Code Ownership: You own 100% of the proprietary source code upon project completion.\n• Confidentiality: Non-Disclosure Agreements (NDA) are standard procedure for all client projects."
      : "Verifikimi Zyrtar & Ligjor i Agjencisë:\n\n• Subjekt i Regjistruar: STARWEBS SH.P.K. është e regjistruar zyrtarisht në ARBK (Republika e Kosovës).\n• Kontratë Zyrtare: Çdo bashkëpunim shoqërohet me kontratë të rregullt, afate fikse dhe faturim fiskal.\n• Pronësi 100% e Kodit: Kodi burimor dhe e gjithë pasuria intelektuale mbetet në pronësi të plotë të klientit.\n• Konfidencialitet (NDA): Nënshtrojmë marrëveshje për mbrojtjen e të dhënave dhe ideve tuaja të biznesit.";
  }

  // 6. Services & Tech Stack / Çfarë shërbimesh ofroni
  if (q.includes('sherbim') || q.includes('shërbim') || q.includes('services') || q.includes('bejn') || q.includes('bëni') || q.includes('ofroni') || q.includes('teknologji') || q.includes('stack')) {
    if (isVoice) {
      return language === 'en'
        ? "We build custom web applications, high-converting e-commerce stores, and high-performance mobile-first websites using React 19, TypeScript, and modern headless architecture."
        : "Ne ofrojmë zhvillim aplikacionesh ueb me porosi, dyqane headless e-commerce, optimizim të lartë të shpejtësisë dhe dizajn modern Obsidian Dark me React 19 dhe TypeScript.";
    }
    return language === 'en'
      ? "Our 4 Core Digital Engineering Services:\n\n1. Custom Web Applications: Bespoke dashboards, portals, and SaaS tools built on React 19 & TypeScript.\n2. Headless E-Commerce: High-speed storefronts with Stripe/Shopify, designed to maximize conversion rates.\n3. Mobile-First Speed Optimization: Transforming slow websites into sub-second powerhouses.\n4. Luxury Dark UI/UX Engineering: Modern obsidian aesthetic, smooth micro-interactions, and responsive layout."
      : "4 Shërbimet Kryesore Tek starwebs.ks:\n\n1. Aplikacione Ueb me Porosi: Platforma administrative, portale biznesi dhe zgjidhje me React 19 e TypeScript.\n2. Headless E-Commerce: Dyqane ultra të shpejta online me integrim pagesash me kartela (Stripe/PayPal/Banka).\n3. Optimizim i Shpejtësisë: Përmirësim i faqeve ekzistuese në kohë ngarkimi nën 1 sekondë.\n4. Dizajn Ekskluziv UI/UX: Stil modern Obsidian Dark me animacione të rrjedhshme dhe përshtatje perfekte në çdo pajisje.";
  }

  // 7. General / Default Conversational Response
  if (isVoice) {
    return language === 'en'
      ? "Welcome to starwebs.ks! We build ultra-fast, mobile-first websites and custom web applications. How can we help you today with pricing, timelines, or a free demo?"
      : "Mirësevini në starwebs.ks! Ne ndërtojmë uebfaqe moderne me shpejtësi të lartë dhe aplikacione me porosi. Si mund t'ju ndihmoj me çmimet, afatet apo rezervimin e një demoje falas?";
  }
  return language === 'en'
    ? "Welcome to starwebs.ks! We engineer high-performance web applications, headless e-commerce storefronts, and mobile-first experiences with sub-second speeds.\n\nHow can we assist you today?\n• Ask about our transparent pricing tiers (starting at €2,900)\n• Inquire about project timelines (2 to 8 weeks)\n• Learn how to request a free 48-hour interactive demo\n• Ask about our ARBK legal registration and guarantees"
    : "Mirësevini në starwebs.ks! Ne jemi agjenci inxhinierike e specializuar në uebfaqe ultra të shpejta, e-commerce dhe platforma me porosi.\n\nSi mund t'ju ndihmoj sot?\n• Pyetni për çmimet tona fikse (duke filluar nga €2,900)\n• Pyetni për afatet e zhvillimit (2 deri në 8 javë)\n• Mësoni si të merrni një Demo Falas brenda 48 orëve\n• Pyetni për regjistrimin në ARBK, kontratat dhe garancitë teknike";
}

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getAiClient();
    if (ai) {
      try {
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          history.slice(-6).forEach((h: { role?: string; sender?: string; text?: string; parts?: any[] }) => {
            const role = (h.role === 'user' || h.sender === 'user') ? 'user' : 'model';
            const textContent = h.text || (h.parts && h.parts[0]?.text) || '';
            if (textContent) {
              contents.push({ role, parts: [{ text: textContent }] });
            }
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: STARWEBS_SYSTEM_PROMPT,
            temperature: 0.7,
            maxOutputTokens: 500
          }
        });

        const reply = response.text ? response.text.trim() : '';
        if (reply) {
          res.json({ reply });
          return;
        }
      } catch (geminiErr: any) {
        console.warn('Gemini chat generateContent error, activating domain knowledge engine:', geminiErr?.message || geminiErr);
      }
    }

    // Dynamic, context-specific smart response
    const language = /[a-zA-Z]/.test(message) && (message.toLowerCase().includes('what') || message.toLowerCase().includes('how') || message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) ? 'en' : 'sq';
    const smartReply = generateDomainKnowledgeAnswer(message, language, false);
    res.json({ reply: smartReply });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    const smartReply = generateDomainKnowledgeAnswer(req.body?.message || '', 'sq', false);
    res.json({ reply: smartReply });
  }
});

// Specialized Voice Conversations API endpoint
const VOICE_SYSTEM_INSTRUCTION = `You are the Starwebs Live Voice AI Assistant for starwebs.ks in Prishtina, Kosovo.
Answer the user's specific inquiry directly in 2 to 3 natural, spoken sentences.
Never output markdown bullets, bolding, URLs, or brackets.
Match the user's language (Albanian or English). If Albanian, speak in natural, professional Albanian.
Key facts: Pricing starts at €2,900 for mobile-first, €3,800 for custom apps, €5,200 for e-commerce. Timelines are 2-4 weeks for landing sprints and 4-8 weeks for flagships. ARBK registered, WhatsApp +383 48 881 191.`;

app.post('/api/voice-chat', async (req, res) => {
  try {
    const { message, language = 'sq', history = [] } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getAiClient();
    if (ai) {
      try {
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          history.slice(-4).forEach((h: { role?: string; sender?: string; text?: string; parts?: any[] }) => {
            const role = (h.role === 'user' || h.sender === 'user') ? 'user' : 'model';
            const textContent = h.text || (h.parts && h.parts[0]?.text) || '';
            if (textContent) {
              contents.push({ role, parts: [{ text: textContent }] });
            }
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: VOICE_SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 200
          }
        });

        const replyText = (response.text || '').replace(/[\*\_#`]/g, '').trim();
        if (replyText) {
          res.json({ reply: replyText });
          return;
        }
      } catch (geminiVoiceErr: any) {
        console.warn('Gemini voice API error, activating domain knowledge engine:', geminiVoiceErr?.message || geminiVoiceErr);
      }
    }

    const lang = (language === 'en' || language === 'sq') ? language : 'sq';
    const smartVoiceReply = generateDomainKnowledgeAnswer(message, lang, true);
    res.json({ reply: smartVoiceReply });
  } catch (error: any) {
    console.error('Voice chat endpoint error:', error);
    const smartVoiceReply = generateDomainKnowledgeAnswer(req.body?.message || '', req.body?.language || 'sq', true);
    res.json({ reply: smartVoiceReply });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
