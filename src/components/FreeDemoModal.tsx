import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Award, 
  FileCheck2,
  Lock,
  PhoneCall
} from 'lucide-react';

interface FreeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetQuoteData?: {
    projectTypeLabel?: string;
    pageCountTier?: string;
    designLevel?: string;
    timelineSpeed?: string;
    estimatedWeeks?: string;
    investmentRange?: string;
    includedModules?: string[];
  } | null;
}

export const FreeDemoModal: React.FC<FreeDemoModalProps> = ({
  isOpen,
  onClose,
  presetQuoteData
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedObjective, setSelectedObjective] = useState<string>('New High-Performance Website');
  const [targetDevice, setTargetDevice] = useState<string>('Desktop & Mobile First');
  const [budgetTier, setBudgetTier] = useState<string>('€5,000 – €10,000');
  const [targetTimeline, setTargetTimeline] = useState<string>('Within 4-8 weeks');

  // Contact Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyOrUrl, setCompanyOrUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Stable Unique Reference & Timestamp
  const [demoRef] = useState(() => 'SW-REF-' + Math.floor(100000 + Math.random() * 900000));
  const [issuedDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  });

  if (!isOpen) return null;

  const handleNextStep = () => {
    setValidationError('');
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !email.includes('@')) {
      setValidationError('Ju lutem jepni emrin e plotë dhe një email të vlefshëm biznesi.');
      return;
    }
    setValidationError('');
    setIsCompleted(true);
  };

  const handleResetAndClose = () => {
    setIsCompleted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 ${isCompleted ? 'print-page-exact' : ''}`}>
      <div className={`relative w-full ${isCompleted ? 'max-w-3xl print-voucher-card' : 'max-w-2xl'} max-h-[94vh] overflow-y-auto rounded-3xl card-chocolate-elevated border border-white/[0.15] p-5 sm:p-8 bg-[#140e0d] shadow-[0_24px_70px_rgba(0,0,0,0.95)]`}>
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer print:hidden z-10"
          title="Mbyll dritaren"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Modal Header & Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[#dd6b4d]/50 shrink-0 bg-[#0d0908] shadow-[0_0_8px_rgba(221,107,77,0.4)]">
                  <img
                    src="/assets/aistudio/logo_e0adced0.png"
                    alt="STARWEBS.KS Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] uppercase tracking-wider">
                  STARWEBS.KS • Rezervim Demo Falas & Arkitekturë
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#fbf8f5]">
                {currentStep === 1 && 'Cilat janë qëllimet kryesore të projektit tuaj?'}
                {currentStep === 2 && 'Afati Kohor & Pritshmëritë e Buxhetit'}
                {currentStep === 3 && 'Ku dëshironi t\'jua dërgojmë prototipin live?'}
              </h3>
              <p className="text-xs text-[#b3a8a2] mt-1">
                Hapi {currentStep} nga 3 · Prototip interaktiv i përgatitur posaçërisht nga inxhinierët tanë.
              </p>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-[#0b0b0b] rounded-full mt-4 overflow-hidden border border-white/[0.06]">
                <div
                  className="h-full bg-[#dd6b4d] transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Goals & Focus */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2]">
                  Zgjidhni fokusin kryesor të uebfaqes tuaj:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'New High-Performance Website', label: 'Uebfaqe e Re me Performancë të Lartë', desc: 'Arkitekturë moderne pa shabllone të ngadalta' },
                    { id: 'Headless E-Commerce Store', label: 'Dyqan E-Commerce Headless', desc: 'Pagesa me 1-klik, filtrim sub-sekond dhe Shopify API' },
                    { id: 'Mobile-First Website Redesign', label: 'Rindërtim i Plotë për Celular', desc: 'Optimizim ergonomik për gishtat dhe CLS zero' },
                    { id: 'Custom Web Application / Portal', label: 'Aplikacion Uebi / Portal Klienti', desc: 'Autentikim, baza të dhënash dhe telemetri' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedObjective(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedObjective === opt.id
                          ? 'bg-[#221816] border-[#dd6b4d] shadow-[0_0_20px_rgba(221,107,77,0.25)]'
                          : 'bg-[#0b0b0b] border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      <span className="font-display text-sm font-bold text-[#fbf8f5] block mb-1">
                        {opt.label}
                      </span>
                      <span className="text-xs text-[#b3a8a2] block">
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2] mb-2">
                    Prioriteti i Pajisjeve:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Desktop & Mobile First', 'Pure Mobile Focus', 'Desktop Focused'].map((dev) => (
                      <button
                        key={dev}
                        type="button"
                        onClick={() => setTargetDevice(dev)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                          targetDevice === dev
                            ? 'bg-[#dd6b4d]/20 border-[#dd6b4d] text-[#ff9d82]'
                            : 'bg-[#0b0b0b] border-white/[0.08] text-[#b3a8a2]'
                        }`}
                      >
                        {dev}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary-orange px-6 py-2.5 text-xs rounded-xl uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold shadow-md"
                  >
                    <span>Vazhdo te Hapi 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Timeline & Budget Expectations */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2] mb-2">
                    Përzgjidhni afatin e synuar të dorëzimit:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'Express (2-3 weeks)', label: 'Ekspres (2 – 3 Javë)', badge: 'Prioritet i Lartë' },
                      { id: 'Standard (4-6 weeks)', label: 'Standard (4 – 6 Javë)', badge: 'E Rekomanduar' },
                      { id: 'Comprehensive (6-10 weeks)', label: 'I Plotë (6 – 10 Javë)', badge: 'Për Projekte Komplekse' }
                    ].map((time) => (
                      <button
                        key={time.id}
                        type="button"
                        onClick={() => setTargetTimeline(time.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          targetTimeline === time.id
                            ? 'bg-[#221816] border-[#dd6b4d] text-[#fbf8f5]'
                            : 'bg-[#0b0b0b] border-white/[0.08] text-[#b3a8a2]'
                        }`}
                      >
                        <span className="block text-xs font-bold text-[#fbf8f5] mb-1">{time.label}</span>
                        <span className="text-[10px] text-[#ff9d82] font-mono-tabular">{time.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2] mb-2">
                    Përzgjidhni diapazonin e buxhetit:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: '€2,500 – €5,000', label: '€2,500 – €5,000', note: 'Startups & Redizajn Celulari' },
                      { id: '€5,000 – €10,000', label: '€5,000 – €10,000', note: 'E-Commerce & Dyqane Headless' },
                      { id: '€10,000 – €20,000', label: '€10,000 – €20,000', note: 'Aplikacione Uebi & Sisteme të Përshtatura' },
                      { id: '€20,000+', label: '€20,000+', note: 'Zgjidhje Ndërmarrjesh (Enterprise)' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudgetTier(b.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          budgetTier === b.id
                            ? 'bg-[#221816] border-[#dd6b4d] text-[#fbf8f5]'
                            : 'bg-[#0b0b0b] border-white/[0.08] text-[#b3a8a2]'
                        }`}
                      >
                        <span className="block font-mono-tabular text-sm font-bold text-[#fbf8f5]">{b.label}</span>
                        <span className="text-[11px] text-[#b3a8a2]">{b.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="btn-secondary-dark px-4 py-2 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kthehu</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary-orange px-6 py-2.5 text-xs rounded-xl uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold shadow-md"
                  >
                    <span>Vazhdo te Detajet</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Direct Dispatch */}
            {currentStep === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                      Emri dhe Mbiemri *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="p.sh. Alban Morina"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                      Email Zyrtar i Punës *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="p.sh. alban@biznesi.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                    Emri i Kompanisë ose Uebfaqja Aktuale
                  </label>
                  <input
                    type="text"
                    value={companyOrUrl}
                    onChange={(e) => setCompanyOrUrl(e.target.value)}
                    placeholder="p.sh. Morina Atelier ose https://morina.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                    Kërkesa të Veçanta apo Shënime (Opsionale)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="p.sh. Kërkojmë pamje 3D për produkte, pagesa me Stripe dhe Apple Pay..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] resize-none"
                  />
                </div>

                {validationError && (
                  <span className="text-xs text-rose-400 block">{validationError}</span>
                )}

                <div className="flex justify-between pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-secondary-dark px-4 py-2 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kthehu</span>
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-orange btn-glow-hover px-6 py-2.5 text-xs rounded-xl uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>GJENERO VAUÇERIN & REZERVO</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* ============================================================ */
          /* LUXURY OFFICIAL 1-PAGE DEMO VOUCHER / SLIP (OBSIDIAN DARK)   */
          /* ============================================================ */
          <div className="py-2 text-[#fbf8f5] animate-in fade-in duration-200">
            {/* The Official Certificate / Voucher Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1c1412] via-[#140e0d] to-[#0d0908] border border-[#dd6b4d]/40 shadow-2xl relative overflow-hidden">
              {/* Top Luxury Catch-Light Beam */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dd6b4d] to-transparent" />

              {/* Watermark / Background Texture Accents */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#dd6b4d]/5 blur-3xl pointer-events-none" />

              {/* Voucher Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-white/10 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#dd6b4d]/50 bg-[#0d0908] p-0.5 shadow-[0_0_14px_rgba(221,107,77,0.4)] shrink-0">
                    <img
                      src="/assets/aistudio/logo_e0adced0.png"
                      alt="STARWEBS.KS Official Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-extrabold tracking-tight text-lg sm:text-xl text-[#fbf8f5]">
                        STARWEBS<span className="text-[#dd6b4d]">.KS</span>
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d]" />
                    </div>
                    <span className="text-[10px] uppercase font-mono-tabular tracking-widest text-[#ff9d82] block font-semibold">
                      Digital Flagship Engineering Studio
                    </span>
                  </div>
                </div>

                {/* Voucher Registration Number */}
                <div className="text-left sm:text-right font-mono-tabular">
                  <span className="text-[9px] uppercase tracking-wider text-[#b3a8a2] block">
                    Official Voucher Serial
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#dd6b4d] tracking-wider block">
                    {demoRef}
                  </span>
                  <span className="text-[10px] text-[#b3a8a2]">
                    Issued: {issuedDate}
                  </span>
                </div>
              </div>

              {/* Status Ribbon Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 px-4 rounded-xl bg-[#0b0b0b]/90 border border-white/[0.08] text-xs font-mono-tabular mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-emerald-400 uppercase tracking-wider">
                    Status: Reserved & Engineering Scheduled
                  </span>
                </div>
                <div className="text-[#ff9d82] font-semibold text-[11px]">
                  SLA: Sub-4h Dedicated Solutions Architect Review
                </div>
              </div>

              {/* Client & Architecture Specification Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs font-mono-tabular">
                {/* Client Profile Box */}
                <div className="p-4 rounded-xl bg-[#0b0b0b]/70 border border-white/[0.08] space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#ff9d82] font-bold block border-b border-white/[0.06] pb-1">
                    Klienti & Përfaqësuesi Zyrtar
                  </span>
                  <div className="flex justify-between">
                    <span className="text-[#b3a8a2]">Emri i Plotë:</span>
                    <span className="font-bold text-[#fbf8f5]">{fullName || 'Përfaqësues i Autorizuar'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b3a8a2]">Biznesi / URL:</span>
                    <span className="font-semibold text-[#fbf8f5] truncate max-w-[160px]">{companyOrUrl || 'Biznes Konfidencial'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b3a8a2]">Email Zyrtar:</span>
                    <span className="text-[#ff9d82] truncate max-w-[160px]">{email}</span>
                  </div>
                </div>

                {/* Project Architecture Box */}
                <div className="p-4 rounded-xl bg-[#0b0b0b]/70 border border-white/[0.08] space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#ff9d82] font-bold block border-b border-white/[0.06] pb-1">
                    Specifikimet e Arkitekturës
                  </span>
                  <div className="flex justify-between">
                    <span className="text-[#b3a8a2]">Objektivi:</span>
                    <span className="font-bold text-[#fbf8f5] truncate max-w-[160px]">{selectedObjective}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b3a8a2]">Diapazoni i Buxhetit:</span>
                    <span className="font-bold text-emerald-400">{budgetTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b3a8a2]">Pritshmëria e Kohës:</span>
                    <span className="text-[#fbf8f5]">{targetTimeline}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees & Deliverables Strip */}
              <div className="p-3.5 rounded-xl bg-[#171211] border border-white/[0.08] mb-5 text-[11px] font-mono-tabular">
                <span className="text-[10px] uppercase text-[#b3a8a2] block mb-1.5 font-bold">
                  Paketa e Përfshirë në Konsultimin & Demon Falas:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[#fbf8f5]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d] shrink-0" />
                    <span>Auditimi i Shpejtësisë (100 Core Vitals)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d] shrink-0" />
                    <span>Prototip Interaktiv Sandbox</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d] shrink-0" />
                    <span>Preventiv me Çmim Fiks & Pa Kosto të Fshehura</span>
                  </div>
                </div>
              </div>

              {/* Official Security Stamp & Authenticity Seal Block */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* SVG Official Verification Seal */}
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full border-2 border-dashed border-[#dd6b4d] p-1 flex items-center justify-center bg-[#0b0b0b] shadow-[0_0_15px_rgba(221,107,77,0.3)]">
                    <div className="w-full h-full rounded-full border border-[#dd6b4d]/60 flex flex-col items-center justify-center text-center">
                      <Award className="w-4 h-4 text-[#dd6b4d]" />
                      <span className="text-[7px] font-mono-tabular font-extrabold text-[#ff9d82] uppercase leading-none mt-0.5">
                        VERIFIED
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-display text-xs font-bold text-[#fbf8f5] block">
                      Vula Zyrtare e Sigurisë · starwebs.ks
                    </span>
                    <span className="text-[10px] font-mono-tabular text-[#b3a8a2] block">
                      Digital Authentication Hash: SHA256-SW-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Direct Executive Contact Info */}
                <div className="text-left sm:text-right text-[11px] font-mono-tabular text-[#b3a8a2]">
                  <span className="block text-[#fbf8f5] font-semibold">
                    Kanal i Drejtpërdrejtë me Inxhinierin:
                  </span>
                  <span className="text-emerald-400 font-bold block">
                    WhatsApp: +383 48 881 191
                  </span>
                  <span>Prishtinë, Kosovë · studio@starwebs.ks</span>
                </div>
              </div>
            </div>

            {/* Action Buttons (Strictly Hidden When Printing) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 print:hidden">
              <button
                onClick={() => window.print()}
                className="btn-primary-orange btn-glow-hover px-6 py-2.5 text-xs rounded-xl flex items-center gap-2 cursor-pointer font-bold shadow-xl"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT DEMO SLIP (PDF / FLETË A4)</span>
              </button>

              <a
                href="https://wa.me/38348881191"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-dark px-4 py-2.5 text-xs rounded-xl flex items-center gap-2 cursor-pointer font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dërgo në WhatsApp</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="px-4 py-2.5 text-xs rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#b3a8a2] hover:text-[#fbf8f5] transition-colors cursor-pointer"
              >
                Mbyll Dritaren
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
