import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';

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

  // Close mobile drawer on Escape key or screen resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-neutral-950/85 backdrop-blur-md border-b border-white/10 transition-all print:hidden">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        {/* Zone 1: Official Circular Emblem + Brand Wordmark */}
        <div className="flex items-center shrink-0">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('overview');
            }}
            className="group flex items-center gap-2 sm:gap-2.5 transition-transform hover:scale-[1.01]"
            title="STARWEBS.KS Official Agency"
          >
            {/* Official Circular Emblem with Luxury Obsidian Glow */}
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#dd6b4d]/40 shadow-[0_0_10px_rgba(221,107,77,0.3)] shrink-0 bg-[#140e0d] p-0.5 transition-transform duration-300 group-hover:border-[#dd6b4d] group-hover:shadow-[0_0_14px_rgba(221,107,77,0.5)]">
              <img
                src="/assets/aistudio/logo_e0adced0.png"
                alt="STARWEBS.KS Official Logo"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-[#fbf8f5] group-hover:text-[#ff9d82] transition-colors whitespace-nowrap">
                STARWEBS<span className="text-[#dd6b4d]">.KS</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] shadow-[0_0_6px_#dd6b4d] shrink-0" />
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider text-[#b3a8a2]">
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
          <button
            onClick={() => handleNavClick('faq')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#fbf8f5] relative py-1 cursor-pointer ${
              activeSection === 'faq' ? 'text-[#fbf8f5] font-bold' : ''
            }`}
          >
            FAQ
            {activeSection === 'faq' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dd6b4d] shadow-[0_0_6px_#dd6b4d]" />
            )}
          </button>
        </nav>

        {/* Zone 3: CTA & Mobile Hamburger Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* WhatsApp Direct Line (Desktop/Tablet) */}
          <a
            href="https://wa.me/38348881191"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/70 hover:border-emerald-500/60 transition-all text-xs font-semibold whitespace-nowrap shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono-tabular">+383 48 881 191</span>
          </a>

          {/* Action Button (Responsive CTA) */}
          <button
            onClick={onOpenFreeDemo}
            className="btn-primary-orange btn-glow-hover px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs rounded-lg uppercase tracking-wider font-bold whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span className="hidden sm:inline">GET A </span>
            <span>FREE DEMO</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 text-[#fbf8f5] hover:text-[#dd6b4d] hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff9d82]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Glassmorphism Menu */}
      {mobileMenuOpen && (
        <>
          {/* Dimmed backdrop to close mobile drawer on tap-outside */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[52px] bg-black/60 backdrop-blur-sm -z-10 lg:hidden animate-in fade-in duration-200"
            aria-hidden="true"
          />

          <div className="lg:hidden w-full bg-neutral-950/95 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <nav className="flex flex-col space-y-1.5">
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
              {/* Primary Action in Mobile Menu */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFreeDemo();
                }}
                className="btn-primary-orange w-full py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>GET A FREE DEMO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Direct WhatsApp Contact */}
              <a
                href="https://wa.me/38348881191"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold font-mono-tabular"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +383 48 881 191</span>
              </a>

              {/* Official Agency Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#b3a8a2]/70 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dd6b4d]" />
                <span>Agjenci e Regjistruar në ARBK • Kosovë</span>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
