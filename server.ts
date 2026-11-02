import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on server if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

const STARWEBS_SYSTEM_PROMPT = `You are the Starwebs AI Assistant for starwebs.ks, an elite web development and digital engineering agency based in Kosovo / Europe.
Agency details:
- Name: starwebs.ks
- Specialization: Custom high-performance web development, headless e-commerce (Shopify/Stripe), mobile-first optimization, and bespoke luxury UI/UX design.
- Contact phone & WhatsApp: +383 48 881 191
- Official Instagram: @starwebs.ks (https://instagram.com/starwebs.ks)
- Typical Timelines: 2-4 weeks for landing sprints, 4-8 weeks for custom platforms and e-commerce flagships.
- Pricing Tiers: Starting from €2,900 for mobile-first redesigns, €3,800 for custom web applications, €5,200 for headless e-commerce, up to enterprise tier.
- Key Strengths: Sub-second load times (<800ms LCP), 100/100 Core Web Vitals, 100% mobile-optimized thumb UX, strict clean TypeScript without template bloat.
- Guarantees: 24/7 dedicated support, <4hr inquiry response guarantee.
- Tone: Professional, courteous, modern, concise, helpful.
When clients ask about demos, invite them to click 'GET A FREE DEMO' or message directly on WhatsApp (+383 48 881 191). Keep responses concise (under 3-4 sentences).`;

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!aiClient) {
      // Fallback response if GEMINI_API_KEY is not yet injected
      res.json({
        reply: "Welcome to starwebs.ks! We build high-performance, mobile-first websites with <0.8s load times. You can explore our pricing calculator above, message us directly on WhatsApp at +383 48 881 191, or click 'GET A FREE DEMO'."
      });
      return;
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: STARWEBS_SYSTEM_PROMPT
      }
    });

    res.json({ reply: response.text || "Thank you for reaching out to starwebs.ks. How can we help elevate your digital presence?" });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.json({
      reply: "Thank you for contacting starwebs.ks! Our engineering team specializes in ultra-fast web development and e-commerce. You can reach us directly on WhatsApp at +383 48 881 191 or schedule a free demo."
    });
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
