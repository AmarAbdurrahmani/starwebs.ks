import React, { useState, useEffect } from 'react';
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
  Send,
  Clock,
  Timer,
  Copy,
  Check,
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalizedDemoData } from '../types';

interface PersonalizedDemoPreviewModalProps {
  demoData: PersonalizedDemoData | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultationForm?: () => void;
}

interface PalettePreset {
  id: 'obsidian' | 'emerald' | 'gold' | 'cyan' | 'ruby';
  name: string;
  tagline: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  border: string;
  bgPill: string;
  badge: string;
  glow: string;
  accentText: string;
  swatchGradient: string;
}

const PALETTES: PalettePreset[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Amber',
    tagline: 'Stili Zyrtar Starwebs',
    primary: '#dd6b4d',
    primaryHover: '#c85e42',
    secondary: '#ff9d82',
    border: 'border-[#dd6b4d]/40',
    bgPill: 'bg-[#dd6b4d]/20 text-[#ff9d82]',
    badge: 'from-[#dd6b4d] to-[#c85e42]',
    glow: 'rgba(221, 107, 77, 0.45)',
    accentText: 'text-[#ff9d82]',
    swatchGradient: 'from-[#dd6b4d] to-[#ff9d82]'
  },
  {
    id: 'emerald',
    name: 'Emerald Jade',
    tagline: 'Rritje, Shëndetësi & Eko',
    primary: '#10b981',
    primaryHover: '#059669',
    secondary: '#34d399',
    border: 'border-emerald-500/40',
    bgPill: 'bg-emerald-950/60 text-emerald-300',
    badge: 'from-emerald-600 to-teal-700',
    glow: 'rgba(16, 185, 129, 0.45)',
    accentText: 'text-emerald-400',
    swatchGradient: 'from-emerald-500 to-teal-400'
  },
  {
    id: 'gold',
    name: 'Luxury Gold',
    tagline: 'Ar Ekzekutiv & Prestizh',
    primary: '#eab308',
    primaryHover: '#ca8a04',
    secondary: '#fde047',
    border: 'border-amber-500/40',
    bgPill: 'bg-amber-950/60 text-amber-300',
    badge: 'from-amber-600 to-yellow-700',
    glow: 'rgba(234, 179, 8, 0.45)',
    accentText: 'text-amber-400',
    swatchGradient: 'from-amber-400 to-yellow-300'
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    tagline: 'FinTech, SaaS & Teknologji',
    primary: '#06b6d4',
    primaryHover: '#0891b2',
    secondary: '#38bdf8',
    border: 'border-cyan-500/40',
    bgPill: 'bg-cyan-950/60 text-cyan-300',
    badge: 'from-cyan-600 to-blue-700',
    glow: 'rgba(6, 182, 212, 0.45)',
    accentText: 'text-cyan-400',
    swatchGradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'ruby',
    name: 'Ruby Velvet',
    tagline: 'Rose & Rubin me Energji',
    primary: '#f43f5e',
    primaryHover: '#e11d48',
    secondary: '#fb7185',
    border: 'border-rose-500/40',
    bgPill: 'bg-rose-950/60 text-rose-300',
    badge: 'from-rose-600 to-red-700',
    glow: 'rgba(244, 63, 94, 0.45)',
    accentText: 'text-rose-400',
    swatchGradient: 'from-rose-500 to-red-400'
  }
];

export const PersonalizedDemoPreviewModal: React.FC<PersonalizedDemoPreviewModalProps> = ({
  demoData,
  isOpen,
  onClose,
  onOpenConsultationForm
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [simulatedActionNotice, setSimulatedActionNotice] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Derive initial palette from preset style
  const getInitialPaletteId = (): PalettePreset['id'] => {
    if (!demoData?.styleColor) return 'obsidian';
    const s = demoData.styleColor.toLowerCase();
    if (s.includes('emerald') || s.includes('gjelb') || s.includes('green') || s.includes('jade')) return 'emerald';
    if (s.includes('gold') || s.includes('art') || s.includes('yellow')) return 'gold';
    if (s.includes('cyan') || s.includes('kalt') || s.includes('blue') || s.includes('slate')) return 'cyan';
    if (s.includes('ruby') || s.includes('velvet') || s.includes('rose') || s.includes('red') || s.includes('kuqe')) return 'ruby';
    return 'obsidian';
  };

  const [selectedPaletteId, setSelectedPaletteId] = useState<PalettePreset['id']>(getInitialPaletteId);

  // Sync palette if demoData prop changes
  useEffect(() => {
    if (demoData?.styleColor) {
      setSelectedPaletteId(getInitialPaletteId());
    }
  }, [demoData]);

  // Live 48-Hour Countdown Timer (Counts down in real-time)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 47,
    minutes: 58,
    seconds: 32
  });

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 47, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !demoData) return null;

  const { businessName, industry, refNumber, generatedBy } = demoData;
  const currentPalette = PALETTES.find((p) => p.id === selectedPaletteId) || PALETTES[0];

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
    if (ind.includes('dyqan') || ind.includes('commerce') || ind.includes('mode') || ind.includes('shitje')) {
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

  // Construct automated message for WhatsApp with user's unique reference code and chosen style
  const whatsAppText = `Përshëndetje Starwebs, pashë demo-n e gjeneruar me kodin ${refNumber} për biznesin tim "${businessName}" (${industry}, stili ${currentPalette.name}) dhe dua ta diskutojmë për biznesin tim dhe të përfitoj ofertën me 15% zbritje!`;
  const whatsAppUrl = `https://wa.me/38348881191?text=${encodeURIComponent(whatsAppText)}`;

  const handleSimulateAction = (actionName: string) => {
    setSimulatedActionNotice(`Veprimi u krye me sukses: "${actionName}" (Latencë 12ms)`);
    setTimeout(() => {
      setSimulatedActionNotice(null);
    }, 2400);
  };

  const handleCopyRefCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refNumber);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/90 backdrop-blur-2xl print:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[96vh] overflow-y-auto rounded-3xl card-chocolate-elevated border border-white/[0.15] p-4 sm:p-7 bg-[#120c0b] shadow-[0_24px_70px_rgba(0,0,0,0.98)]"
        >
          {/* Top Specular Line with dynamic theme color */}
          <div 
            className="absolute top-0 left-0 right-0 h-[2.5px] opacity-90 transition-all duration-300"
            style={{
              background: `linear-gradient(to right, transparent, ${currentPalette.primary}, transparent)`
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer z-20"
            title="Mbyll demonstrimin"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Top Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 mb-4 border-b border-white/[0.08] gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse transition-colors duration-300" style={{ backgroundColor: currentPalette.primary }} />
                <span className={`font-mono-tabular text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${currentPalette.accentText}`}>
                  DEMO E PERSONALIZUAR · {generatedBy === 'voice' ? 'GJENERUAR ME ZË (VOICE AI)' : generatedBy === 'text' || generatedBy === 'ai' ? 'GJENERUAR ME STARWEBS AI' : 'GJENERUAR PËRMES FORMULARIT'}
                </span>
                <span className="text-white/20">|</span>
                <button
                  onClick={handleCopyRefCode}
                  className="px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-mono-tabular text-neutral-300 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Kliko për të kopjuar kodin e referencës"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Kodi: {refNumber}</span>
                </button>
              </div>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#fbf8f5] flex items-center gap-2.5">
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
                    backgroundColor: deviceView === 'desktop' ? currentPalette.primary : 'transparent'
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
                    backgroundColor: deviceView === 'mobile' ? currentPalette.primary : 'transparent'
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
                  <span>Ndrysho</span>
                </button>
              )}
            </div>
          </div>

          {/* 1. INTERACTIVE REAL-TIME COLOR PALETTE & STYLE SWITCHER */}
          <div className="mb-4 p-3 rounded-2xl bg-[#090605] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors duration-300"
                style={{ 
                  backgroundColor: `${currentPalette.primary}20`,
                  borderColor: `${currentPalette.primary}60`,
                  color: currentPalette.primary 
                }}
              >
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono-tabular text-[11px] font-bold uppercase tracking-wider text-[#fbf8f5] block">
                  Ndrysho Stilin në Kohë Reale:
                </span>
                <span className="text-[10px] text-[#b3a8a2]">
                  zgjedhur: <strong className={currentPalette.accentText}>{currentPalette.name}</strong> ({currentPalette.tagline})
                </span>
              </div>
            </div>

            {/* Palette Swatches */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {PALETTES.map((pal) => {
                const isSelected = pal.id === selectedPaletteId;
                return (
                  <button
                    key={pal.id}
                    onClick={() => setSelectedPaletteId(pal.id)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.1] text-white shadow-md'
                        : 'bg-black/40 text-[#b3a8a2] border-white/[0.06] hover:border-white/20 hover:text-white'
                    }`}
                    style={{
                      borderColor: isSelected ? pal.primary : undefined,
                      boxShadow: isSelected ? `0 0 14px ${pal.glow}` : undefined
                    }}
                    title={`Aktivizo paletën ${pal.name}`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: pal.primary }} 
                    />
                    <span className="text-[11px] whitespace-nowrap">{pal.name}</span>
                  </button>
                );
              })}
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
          <div className="mb-5 rounded-2xl bg-[#090605] border border-white/10 overflow-hidden shadow-2xl">
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
            <div className={`relative transition-all duration-300 ${deviceView === 'mobile' ? 'max-w-sm mx-auto my-3 rounded-3xl border-4 border-neutral-800 shadow-2xl overflow-hidden' : ''}`}>
              {/* Mobile Notch Bar */}
              {deviceView === 'mobile' && (
                <div className="px-4 py-2 bg-neutral-900 border-b border-white/10 flex items-center justify-between text-[10px] text-neutral-400 font-mono-tabular">
                  <span>9:41</span>
                  <div className="w-16 h-3.5 rounded-full bg-black mx-auto" />
                  <span className="text-emerald-400 font-bold">5G 100%</span>
                </div>
              )}

              {/* Simulated Website Nav */}
              <div className="px-4 sm:px-6 py-3.5 bg-black/80 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: currentPalette.primary }}
                  />
                  <span className="font-display font-extrabold tracking-tight text-sm text-[#fbf8f5] uppercase">
                    {businessName}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-400">
                  <span className="hover:text-white cursor-pointer transition-colors" onClick={() => handleSimulateAction('Hapja e faqeve të shërbimeve')}>Shërbimet</span>
                  <span className="hover:text-white cursor-pointer transition-colors" onClick={() => handleSimulateAction('Shikimi i portfolio')}>Galeria</span>
                  <span className="hover:text-white cursor-pointer transition-colors" onClick={() => handleSimulateAction('Leximi i rreth nesh')}>Rreth Nesh</span>
                </div>

                <button
                  onClick={() => handleSimulateAction(indContent.cta)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  style={{
                    backgroundColor: currentPalette.primary
                  }}
                >
                  {indContent.cta}
                </button>
              </div>

              {/* Simulated Hero Section */}
              <div className="p-5 sm:p-8 bg-gradient-to-b from-[#140e0d] to-black relative overflow-hidden">
                <div 
                  className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none filter blur-[80px] opacity-25 transition-all duration-300"
                  style={{ backgroundColor: currentPalette.primary }}
                />

                <div className="max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-neutral-300 mb-3">
                    <Zap className="w-3.5 h-3.5" style={{ color: currentPalette.primary }} />
                    <span>Arkitekturë Ultra-Fast React 19 & Tailwind v4</span>
                  </div>

                  <h1 className="font-display text-xl sm:text-3xl font-extrabold text-[#fbf8f5] leading-tight mb-2.5">
                    {indContent.tagline}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#b3a8a2] leading-relaxed mb-5">
                    {indContent.heroSub}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => handleSimulateAction(`CTA Kryesore: "${indContent.cta}"`)}
                      className="px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
                      style={{
                        backgroundColor: currentPalette.primary,
                        boxShadow: `0 0 20px ${currentPalette.glow}`
                      }}
                    >
                      <span>{indContent.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleSimulateAction('Testimi i Shpejtësisë së Ngarkimit')}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300 hover:text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer hover:bg-white/[0.1] transition-colors"
                    >
                      <Gauge className="w-3.5 h-3.5" />
                      <span>Testo Shpejtësinë</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Features Grid */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {indContent.features.map((feat, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2.5 text-xs text-[#fbf8f5]"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentPalette.primary }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Quantified Metrics Bar */}
                <div className="mt-4 grid grid-cols-3 gap-2.5 text-center font-mono-tabular">
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

          {/* 2. LIVE CONVERSION URGENCY BANNER (48h countdown, -15% & free speed audit) */}
          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-[#1c1210] via-[#140e0d] to-[#1a100e] border border-amber-500/30 shadow-lg relative overflow-hidden">
            {/* Subtle amber radial accent */}
            <div className="absolute top-0 right-0 w-64 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono-tabular text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Timer className="w-3 h-3 text-amber-400 animate-spin" />
                    <span>Ofertë Ekskluzive me Kohë të Kufizuar</span>
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono-tabular">
                    Rezervuar për kodin: <strong className="text-white">{refNumber}</strong>
                  </span>
                </div>

                <h3 className="font-display text-sm sm:text-base font-extrabold text-[#fbf8f5] flex items-center gap-2">
                  <span>Përfitoni 15% Zbritje & Auditim Falas të Shpejtësisë</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>

                <p className="text-xs text-[#b3a8a2] leading-relaxed max-w-2xl">
                  Nëse kontaktoni brenda periudhës 48-orëshe të kësaj demoje, ekipi inxhinierik i Starwebs zbaton menjëherë zbritjen prej 15% dhe përfshin falas konfigurimin e plotë të CDN globale dhe testin Google Lighthouse 100/100.
                </p>
              </div>

              {/* Real-Time Live Clock Display */}
              <div className="flex items-center gap-2 self-start lg:self-center shrink-0 p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono-tabular shadow-inner">
                <Clock className="w-4 h-4 text-amber-400" />
                <div className="flex items-center gap-1 text-center">
                  <div className="px-1.5 py-1 rounded bg-neutral-900 border border-white/10">
                    <span className="text-xs sm:text-sm font-extrabold text-amber-300">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-[8px] text-neutral-400 block leading-none">ORË</span>
                  </div>
                  <span className="text-amber-400 font-bold">:</span>
                  <div className="px-1.5 py-1 rounded bg-neutral-900 border border-white/10">
                    <span className="text-xs sm:text-sm font-extrabold text-amber-300">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-[8px] text-neutral-400 block leading-none">MIN</span>
                  </div>
                  <span className="text-amber-400 font-bold">:</span>
                  <div className="px-1.5 py-1 rounded bg-neutral-900 border border-white/10">
                    <span className="text-xs sm:text-sm font-extrabold text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="text-[8px] text-neutral-400 block leading-none">SEK</span>
                  </div>
                </div>
                <div className="pl-2 border-l border-white/10 text-[10px] text-neutral-400 hidden sm:block">
                  <span className="text-emerald-400 font-bold block">● 2 Vende të Lira</span>
                  <span>këtë javë</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MAIN CALL TO ACTION: OPTIMIZED WHATSAPP CONVERSION BUTTON */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-[#171211] to-[#1e1310] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Gati për Fillim & Diskutim
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#fbf8f5] font-display font-bold">
                Dëshironi këtë uebfaqe për <span className="underline decoration-emerald-400">{businessName}</span> me stilin <span className={currentPalette.accentText}>{currentPalette.name}</span>?
              </p>
              <p className="text-xs text-[#b3a8a2]">
                Klikoni butonin për të dërguar automatikisht kodin e referencës <strong className="text-neutral-200">{refNumber}</strong> në WhatsApp për të nisur bisedën direkt me ne.
              </p>
            </div>

            {/* ACTION BUTTONS: Direct WhatsApp + Quick Copy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <button
                onClick={handleCopyRefCode}
                className="px-3.5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Kopjo kodin e referencës"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Kodi u kopjua!' : 'Kopjo Kodin'}</span>
              </button>

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
