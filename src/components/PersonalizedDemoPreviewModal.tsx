import React, { useState } from 'react';
import { 
  X, 
  Monitor, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Gauge,
  Layers,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalizedDemoData } from '../types';

interface PersonalizedDemoPreviewModalProps {
  demoData: PersonalizedDemoData | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultationForm?: () => void;
}

export const PersonalizedDemoPreviewModal: React.FC<PersonalizedDemoPreviewModalProps> = ({
  demoData,
  isOpen,
  onClose,
  onOpenConsultationForm
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'specs' | 'features'>('preview');
  const [simulatedActionNotice, setSimulatedActionNotice] = useState<string | null>(null);

  if (!isOpen || !demoData) return null;

  const { businessName, industry, styleColor, refNumber, generatedBy } = demoData;

  // Derive theme colors based on style choice
  const getThemeAccents = () => {
    const s = (styleColor || '').toLowerCase();
    if (s.includes('emerald') || s.includes('gjelb') || s.includes('green')) {
      return {
        primary: '#10b981',
        primaryHover: '#059669',
        border: 'border-emerald-500/40',
        bgPill: 'bg-emerald-950/60 text-emerald-300',
        badge: 'from-emerald-600 to-teal-700',
        glow: 'rgba(16, 185, 129, 0.45)',
        accentText: 'text-emerald-400'
      };
    }
    if (s.includes('gold') || s.includes('art') || s.includes('yellow')) {
      return {
        primary: '#eab308',
        primaryHover: '#ca8a04',
        border: 'border-amber-500/40',
        bgPill: 'bg-amber-950/60 text-amber-300',
        badge: 'from-amber-600 to-yellow-700',
        glow: 'rgba(234, 179, 8, 0.45)',
        accentText: 'text-amber-400'
      };
    }
    if (s.includes('cyan') || s.includes('kalt') || s.includes('blue')) {
      return {
        primary: '#06b6d4',
        primaryHover: '#0891b2',
        border: 'border-cyan-500/40',
        bgPill: 'bg-cyan-950/60 text-cyan-300',
        badge: 'from-cyan-600 to-blue-700',
        glow: 'rgba(6, 182, 212, 0.45)',
        accentText: 'text-cyan-400'
      };
    }
    // Default: Signature Burnt Orange / Obsidian Amber
    return {
      primary: '#dd6b4d',
      primaryHover: '#c85e42',
      border: 'border-[#dd6b4d]/40',
      bgPill: 'bg-[#dd6b4d]/20 text-[#ff9d82]',
      badge: 'from-[#dd6b4d] to-[#c85e42]',
      glow: 'rgba(221, 107, 77, 0.45)',
      accentText: 'text-[#ff9d82]'
    };
  };

  const theme = getThemeAccents();

  // Industry-specific sample mockup content
  const getIndustryContent = () => {
    const ind = (industry || '').toLowerCase();
    if (ind.includes('restor') || ind.includes('gastro') || ind.includes('kafe') || ind.includes('food')) {
      return {
        tagline: 'Përjetoni gastronominë moderne me rezervime online në kohë reale',
        heroSub: 'Meny digjitale interaktive me porosi të shpejta në tavolinë dhe rezervime me konfirmim në çast.',
        cta: 'Rezervo Tavolinën Tani',
        features: ['Meny Interaktive QR me Video', 'Sistem Rezervimesh me SMS/WhatsApp', 'Pagesa me Kartelë & Porosi me 1-Kliko'],
        metrics: [
          { label: 'Koha e ngarkimit të menysë', value: '0.38s' },
          { label: 'Rritja e rezervimeve', value: '+42%' },
          { label: 'Vlerësimi në Google', value: '4.9 ★' }
        ]
      };
    }
    if (ind.includes('dyqan') || ind.includes('commerce') || ind.includes('mode') || ind.includes('shitje') || ind.includes('dyqan')) {
      return {
        tagline: 'Koleksioni ekskluziv digjital me arkitekturë headless e-commerce',
        heroSub: 'Katalog i sinkronizuar në kohë reale, checkout sub-sekondar dhe konvertim i lartë në celularë.',
        cta: 'Eksploro Koleksionin',
        features: ['Blerje me 1-Kliko (Apple Pay & Stripe)', 'Filtrim i menjëhershëm i produkteve pa rifreskuar', 'Sinkronizim me magazinën'],
        metrics: [
          { label: 'Shpejtësia e Arkëtimit', value: '0.45s' },
          { label: 'Konvertimi në Celularë', value: '+35%' },
          { label: 'Rikthimi i Karrocave', value: '94%' }
        ]
      };
    }
    if (ind.includes('shendet') || ind.includes('klinik') || ind.includes('dent') || ind.includes('mjek')) {
      return {
        tagline: 'Kujdesi shëndetësor modern me caktim të menjëhershëm të termineve',
        heroSub: 'Portali elitar i pacientëve me termine online, orare transparente dhe besueshmëri maksimale.',
        cta: 'Cakto Terminin Online',
        features: ['Kalendar me Orar të Drejtpërdrejtë', 'Kujtesa me WhatsApp & SMS', 'Kartelë Digjitale e Shërbimeve'],
        metrics: [
          { label: 'Caktim Termini', value: '3 Hapa' },
          { label: 'Zvogëlimi i Pritjes', value: '-60%' },
          { label: 'Përshtatje Celular', value: '100%' }
        ]
      };
    }
    // Default Professional / Tech / Corporate
    return {
      tagline: `Zgjidhje inxhinierike dhe arkitekturë moderne ueb për ${businessName}`,
      heroSub: 'Uebfaqe me porosi e dizajnuar për rritjen e besueshmërisë, shpejtësi absolute dhe konvertim klientësh.',
      cta: 'Kërko Ofertën e Plotë',
      features: ['Arkitekturë me React 19 & TypeScript', '100/100 Core Web Vitals në Google', 'Paneli i Administrimit me Porosi'],
      metrics: [
        { label: 'Koha e Hapjes', value: '0.42s' },
        { label: 'Rezultati SEO', value: '100/100' },
        { label: 'Performanca Mobile', value: '99/100' }
      ]
    };
  };

  const indContent = getIndustryContent();
  const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'biznesi';

  // Construct structured WhatsApp URL
  const whatsAppText = `Përshëndetje starwebs.ks!
E dua këtë uebfaqe të personalizuar të gjeneruar për biznesin tim:
• Emri i Biznesit: ${businessName}
• Industria: ${industry}
• Stili & Ngjyrat: ${styleColor}
• Referenca e Demos: ${refNumber}

Dua të fillojmë zhvillimin me këtë arkitekturë e shpejtësi!`;

  const whatsAppUrl = `https://wa.me/38348881191?text=${encodeURIComponent(whatsAppText)}`;

  const handleSimulateAction = (actionName: string) => {
    setSimulatedActionNotice(`Veprimi u krye me sukses: "${actionName}" (Latencë 14ms)`);
    setTimeout(() => {
      setSimulatedActionNotice(null);
    }, 2400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl print:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl card-chocolate-elevated border border-white/[0.15] p-5 sm:p-8 bg-[#120c0b] shadow-[0_24px_70px_rgba(0,0,0,0.98)]"
        >
          {/* Top Specular Line with dynamic theme color */}
          <div 
            className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)`
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer z-10"
            title="Mbyll demonstrimin"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Top Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-5 border-b border-white/[0.08] gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
                <span className={`font-mono-tabular text-xs font-bold uppercase tracking-wider ${theme.accentText}`}>
                  DEMO E PERSONALIZUAR · {generatedBy === 'voice' ? 'GJENERUAR ME ZË (VOICE AI)' : generatedBy === 'text' || generatedBy === 'ai' ? 'GJENERUAR ME STARWEBS AI' : 'GJENERUAR PËRMES FORMULARIT'}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] font-mono-tabular text-neutral-400">
                  Ref: {refNumber}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5] flex items-center gap-2.5">
                <span>{businessName}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-neutral-300 font-sans font-normal">
                  {industry}
                </span>
              </h2>
            </div>

            {/* Device Switcher (Desktop vs Mobile) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-[#090605] rounded-xl border border-white/10">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    deviceView === 'desktop'
                      ? 'text-white shadow-md'
                      : 'text-[#b3a8a2] hover:text-white'
                  }`}
                  style={{
                    backgroundColor: deviceView === 'desktop' ? theme.primary : 'transparent'
                  }}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    deviceView === 'mobile'
                      ? 'text-white shadow-md'
                      : 'text-[#b3a8a2] hover:text-white'
                  }`}
                  style={{
                    backgroundColor: deviceView === 'mobile' ? theme.primary : 'transparent'
                  }}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              {onOpenConsultationForm && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultationForm();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 text-[#b3a8a2] hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ndrysho të dhënat</span>
                </button>
              )}
            </div>
          </div>

          {/* Toast / Notification when user clicks interactive simulation buttons */}
          {simulatedActionNotice && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono-tabular"
            >
              {simulatedActionNotice}
            </motion.div>
          )}

          {/* SIMULATED BROWSER / DEVICE CONTAINER */}
          <div className="mb-6 rounded-2xl bg-[#090605] border border-white/10 overflow-hidden shadow-2xl">
            {/* Desktop Mock Browser Header */}
            {deviceView === 'desktop' && (
              <div className="px-4 py-2.5 bg-[#17100e] border-b border-white/[0.08] flex items-center justify-between text-xs font-mono-tabular text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <div className="ml-3 px-3 py-1 rounded-md bg-black/40 border border-white/10 text-neutral-300 text-[11px] flex items-center gap-1.5">
                    <span className="text-emerald-400">https://</span>
                    <span className="font-bold text-[#fbf8f5]">{slug}.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Google PageSpeed: 100/100 · 0.42s LCP</span>
                </div>
              </div>
            )}

            {/* Simulated Website Content Area */}
            <div className={`relative transition-all duration-300 ${deviceView === 'mobile' ? 'max-w-sm mx-auto my-4 rounded-3xl border-4 border-neutral-800 shadow-2xl overflow-hidden' : ''}`}>
              {/* Mobile Notch Bar */}
              {deviceView === 'mobile' && (
                <div className="px-4 py-2 bg-neutral-900 border-b border-white/10 flex items-center justify-between text-[10px] text-neutral-400 font-mono-tabular">
                  <span>9:41</span>
                  <div className="w-16 h-3.5 rounded-full bg-black mx-auto" />
                  <span className="text-emerald-400 font-bold">5G 100%</span>
                </div>
              )}

              {/* Simulated Website Nav */}
              <div className="px-5 py-3.5 bg-[#120c0b]/90 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {businessName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-display font-extrabold text-sm text-[#fbf8f5] tracking-tight">
                    {businessName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSimulateAction('Rezervim / Blerje')}
                    className="px-3 py-1 rounded-lg text-white font-bold text-xs transition-transform hover:scale-105 cursor-pointer shadow-md"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {indContent.cta.split(' ')[0]}
                  </button>
                </div>
              </div>

              {/* Simulated Hero Section */}
              <div className="p-6 sm:p-10 text-center relative overflow-hidden bg-gradient-to-b from-[#19100e] via-[#100a09] to-[#090605]">
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${theme.glow} 0%, transparent 70%)`
                  }}
                />

                <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono-tabular ${theme.bgPill}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Arkitekturë e Veçantë · {industry}</span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#fbf8f5] leading-tight">
                    {indContent.tagline}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#b3a8a2] leading-relaxed max-w-lg mx-auto">
                    {indContent.heroSub}
                  </p>

                  {/* Simulated Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => handleSimulateAction(indContent.cta)}
                      className="px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <span>{indContent.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSimulateAction('Eksploro Menynë / Shërbimet')}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-neutral-300 transition-colors cursor-pointer"
                    >
                      Mëso më Shumë
                    </button>
                  </div>
                </div>

                {/* Simulated Feature Pills */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  {indContent.features.map((feat, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2.5 text-xs text-[#fbf8f5]"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Quantified Metrics Bar */}
                <div className="mt-4 grid grid-cols-3 gap-3 text-center font-mono-tabular">
                  {indContent.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="block text-base sm:text-xl font-extrabold text-[#fbf8f5]">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-[#b3a8a2] block mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CALL TO ACTION: "E DUA KËTË UEBFAQE - KONTAKTO NË WHATSAPP" */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-[#171211] to-[#1e1310] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Gati për Zhvillim & Publikim
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#fbf8f5] font-display font-bold">
                Ju pëlqen kjo pamje dhe arkitekturë për <span className="underline decoration-emerald-400">{businessName}</span>?
              </p>
              <p className="text-xs text-[#b3a8a2]">
                Klikoni butonin për të dërguar këtë demo te kryeinxhinieri ynë në WhatsApp dhe fillojmë menjëherë.
              </p>
            </div>

            {/* MANDATORY CONVERSION BUTTON */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>E dua këtë uebfaqe - Kontakto në WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
