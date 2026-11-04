import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Layers,
  Palette,
  Building2,
  PhoneCall,
  Monitor
} from 'lucide-react';
import { PersonalizedDemoData } from '../types';

interface FreeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetQuoteData?: any;
  onGenerateDemo?: (data: PersonalizedDemoData) => void;
}

export const FreeDemoModal: React.FC<FreeDemoModalProps> = ({
  isOpen,
  onClose,
  presetQuoteData,
  onGenerateDemo
}) => {
  // Required Fields per User Request:
  // 1. Emri i Biznesit
  // 2. Industria
  // 3. Stili / Ngjyrat
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('Gastronomi / Restorant');
  const [customIndustry, setCustomIndustry] = useState('');
  const [styleColor, setStyleColor] = useState('Obsidian Dark & Burnt Orange');
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [validationError, setValidationError] = useState('');

  const [demoRef] = useState(() => 'SW-REF-' + Math.floor(100000 + Math.random() * 900000));

  if (!isOpen) return null;

  const industryPresets = [
    'Gastronomi / Restorant',
    'E-Commerce / Modë',
    'Klinikë / Shëndetësi',
    'Teknologji / SaaS',
    'Ndërtim / Real Estate',
    'Shërbime Profesionale'
  ];

  const stylePresets = [
    { id: 'Obsidian Dark & Burnt Orange', label: 'Obsidian Dark & Burnt Orange', tag: 'Stili Zyrtar Starwebs' },
    { id: 'Emerald & Jade Glow', label: 'Emerald & Jade Glow', tag: 'Shëndetësi & Eko' },
    { id: 'Luxury Gold & Jet Black', label: 'Luxury Gold & Jet Black', tag: 'Premium & Elegancë' },
    { id: 'Cyber Cyan & Slate', label: 'Cyber Cyan & Slate', tag: 'Teknologji & FinTech' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBusinessName = businessName.trim();
    if (!finalBusinessName) {
      setValidationError('Ju lutem shënoni Emrin e Biznesit tuaj.');
      return;
    }

    setValidationError('');

    const finalIndustry = industry === 'Tjetër' ? (customIndustry.trim() || 'Shërbime Biznesi') : industry;

    const generatedData: PersonalizedDemoData = {
      businessName: finalBusinessName,
      industry: finalIndustry,
      styleColor,
      phoneOrEmail: contactInfo.trim(),
      generatedBy: 'form',
      refNumber: demoRef
    };

    if (onGenerateDemo) {
      onGenerateDemo(generatedData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[94vh] overflow-y-auto rounded-3xl card-chocolate-elevated border border-white/[0.15] p-5 sm:p-8 bg-[#140e0d] shadow-[0_24px_70px_rgba(0,0,0,0.95)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer z-10"
          title="Mbyll dritaren"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
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
              STARWEBS.KS • Gjeneruesi i Demove Interaktive
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5]">
            Merr një Demo Falas me Porosi
          </h3>
          <p className="text-xs text-[#b3a8a2] mt-1.5 leading-relaxed">
            Plotësoni të dhënat e biznesit tuaj më poshtë. Faqja do të gjenerojë menjëherë një <strong className="text-white">Modal Preview interaktiv</strong> me uebfaqen tuaj të personalizuar dhe shpejtësi nën 800ms.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Emri i Biznesit */}
          <div>
            <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2] mb-1.5 flex items-center gap-1.5 font-bold">
              <Building2 className="w-3.5 h-3.5 text-[#dd6b4d]" />
              <span>1. Emri i Biznesit / Kompanisë *</span>
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="p.sh. Restorant Tiffany, Morina Atelier, Dental Clinic..."
              className="w-full px-4 py-3 rounded-xl bg-[#090605] border border-white/[0.12] text-sm text-[#fbf8f5] placeholder:text-neutral-500 focus:outline-none focus:border-[#dd6b4d] transition-all font-medium"
            />
          </div>

          {/* 2. Industria */}
          <div>
            <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2] mb-1.5 flex items-center gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5 text-[#dd6b4d]" />
              <span>2. Industria / Fusha e Veprimtarisë *</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {industryPresets.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => {
                    setIndustry(ind);
                    setCustomIndustry('');
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                    industry === ind
                      ? 'bg-[#221512] border-[#dd6b4d] text-white shadow-sm font-semibold'
                      : 'bg-[#090605] border-white/[0.08] text-[#b3a8a2] hover:border-white/20'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Stili & Ngjyrat */}
          <div>
            <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2] mb-1.5 flex items-center gap-1.5 font-bold">
              <Palette className="w-3.5 h-3.5 text-[#dd6b4d]" />
              <span>3. Stili Vizual & Ngjyrat e Preferuara *</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stylePresets.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStyleColor(st.id)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                    styleColor === st.id
                      ? 'bg-[#221512] border-[#dd6b4d] text-white font-semibold shadow-sm'
                      : 'bg-[#090605] border-white/[0.08] text-[#b3a8a2] hover:border-white/20'
                  }`}
                >
                  <span className="block text-xs font-medium text-white">{st.label}</span>
                  <span className="text-[10px] text-[#ff9d82] font-mono-tabular">{st.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Contact Field */}
          <div>
            <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#b3a8a2] mb-1.5 flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-400" />
              <span>Numri i Telefonit / WhatsApp ose Email (Opsionale)</span>
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="p.sh. +383 48 881 191 ose info@biznesi.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#090605] border border-white/[0.1] text-xs text-[#fbf8f5] placeholder:text-neutral-500 focus:outline-none focus:border-[#dd6b4d] transition-all"
            />
          </div>

          {validationError && (
            <p className="text-xs text-rose-400 font-semibold">{validationError}</p>
          )}

          {/* Submit Action Bar */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <span className="text-[11px] text-[#b3a8a2] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pa asnjë obligim financiar · 100% Pa pagesë</span>
            </span>

            <button
              type="submit"
              className="btn-primary-orange btn-glow-hover px-6 py-3 text-xs rounded-xl uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold shadow-lg"
            >
              <Monitor className="w-4 h-4" />
              <span>GJENERO & SHIKO DEMO-N TANI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
