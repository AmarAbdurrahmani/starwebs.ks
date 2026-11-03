import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Instagram, Linkedin, Menu, X, ShieldCheck } from 'lucide-react';

interface TopBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenFreeDemo: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeSection,
  onNavigate,
  onOpenFreeDemo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-white/10 transition-all print:hidden">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 lg:px-12 py-3">
        {/* Zone 1: Official Circular Emblem + Brand Wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('overview');
            }}
            className="group flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.02]"
            title="STARWEBS.KS Official Agency"
          >
            {/* Official Circular Emblem with Luxury Glow */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#dd6b4d]/40 shadow-[0_0_12px_rgba(221,107,77,0.35)] shrink-0 bg-[#140e0d] p-0.5 transition-transform duration-300 group-hover:border-[#dd6b4d] group-hover:shadow-[0_0_16px_rgba(221,107,77,0.6)]">
              <img
                src="/assets/aistudio/logo_e0adced0.png"
                alt="STARWEBS.KS Official Logo"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-[#fbf8f5] group-hover:text-[#ff9d82] transition-colors whitespace-nowrap">
                STARWEBS<span className="text-[#dd6b4d]">.KS</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] shadow-[0_0_8px_#dd6b4d]" />
            </div>
          </a>

          {/* Official Instagram Link in header (visible from lg up) */}
          <a
            href="https://instagram.com/starwebs.ks"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow starwebs.ks on Instagram"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#b3a8a2] hover:text-[#fbf8f5] hover:border-[#dd6b4d]/40 transition-colors backdrop-blur-md"
          >
            <Instagram className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="text-[11px] font-mono-tabular">@starwebs.ks</span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#b3a8a2]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#fbf8f5] relative py-1 cursor-pointer ${
                activeSection === item.id ? 'text-[#fbf8f5] font-bold' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dd6b4d] shadow-[0_0_6px_#dd6b4d]" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: CTA & Mobile Hamburger Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Prominent WhatsApp CTA button in Header (hidden on small mobile) */}
          <a
            href="https://wa.me/38348881191"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/70 hover:border-emerald-500/60 transition-all text-xs font-semibold whitespace-nowrap shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono-tabular">+383 48 881 191</span>
          </a>

          {/* Desktop LinkedIn Profile Link */}
          <a
            href="https://www.linkedin.com/company/starwebs-ks/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#b3a8a2] hover:text-[#70b5f9] hover:border-[#0a66c2]/50 transition-colors"
            title="STARWEBS.KS LinkedIn"
            aria-label="STARWEBS.KS LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>

          {/* Desktop/Tablet Demo Button */}
          <button
            onClick={onOpenFreeDemo}
            className="btn-primary-orange btn-glow-hover px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs rounded-lg uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span>GET A FREE DEMO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-[#fbf8f5] hover:text-[#dd6b4d] hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff9d82]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Glassmorphism Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-neutral-950/95 backdrop-blur-2xl border-b border-white/10 px-5 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#dd6b4d]/15 text-[#ff9d82] border-l-2 border-[#dd6b4d]'
                    : 'text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d]" />}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('faq')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-between ${
                activeSection === 'faq'
                  ? 'bg-[#dd6b4d]/15 text-[#ff9d82] border-l-2 border-[#dd6b4d]'
                  : 'text-[#ff9d82] hover:text-[#fbf8f5] hover:bg-white/5'
              }`}
            >
              <span>Pyetjet e Shpeshta (FAQ)</span>
              {activeSection === 'faq' && <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d]" />}
            </button>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold font-mono-tabular"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +383 48 881 191</span>
            </a>

            <a
              href="https://instagram.com/starwebs.ks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#fbf8f5] text-xs font-semibold"
            >
              <Instagram className="w-4 h-4 text-[#dd6b4d]" />
              <span>Instagram: @starwebs.ks</span>
            </a>

            <a
              href="https://www.linkedin.com/company/starwebs-ks/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#fbf8f5] text-xs font-semibold hover:border-[#0a66c2]/40 hover:text-[#70b5f9] transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#0a66c2]" />
              <span>LinkedIn: starwebs-ks</span>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#b3a8a2]/70 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dd6b4d]" />
              <span>Agjenci e Regjistruar në ARBK • Kosovë</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
