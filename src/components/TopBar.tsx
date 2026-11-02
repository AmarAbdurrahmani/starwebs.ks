import React from 'react';
import { ArrowRight, MessageCircle, Instagram } from 'lucide-react';

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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-neutral-950/70 backdrop-blur-md border-b border-white/10 transition-all print:hidden">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6 px-6 lg:px-12 py-3.5">
        {/* Zone 1: Single text element wordmark + Instagram link */}
        <div className="flex items-center gap-4">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('overview');
            }}
            className="font-display text-xl lg:text-2xl font-extrabold tracking-tight text-[#fbf8f5] hover:text-[#ff9d82] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>STARWEBS.KS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] shadow-[0_0_8px_#dd6b4d]" />
          </a>

          {/* Official Instagram Link in header */}
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

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#b3a8a2]">
          <button
            onClick={() => onNavigate('overview')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#fbf8f5] relative py-1 cursor-pointer ${
              activeSection === 'overview' ? 'text-[#fbf8f5] font-bold' : ''
            }`}
          >
            Overview
            {activeSection === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dd6b4d]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('services')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#fbf8f5] relative py-1 cursor-pointer ${
              activeSection === 'services' ? 'text-[#fbf8f5] font-bold' : ''
            }`}
          >
            Services
            {activeSection === 'services' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dd6b4d]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('portfolio')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#fbf8f5] relative py-1 cursor-pointer ${
              activeSection === 'portfolio' ? 'text-[#fbf8f5] font-bold' : ''
            }`}
          >
            Portfolio
            {activeSection === 'portfolio' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dd6b4d]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('case-studies')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#fbf8f5] relative py-1 cursor-pointer ${
              activeSection === 'case-studies' ? 'text-[#fbf8f5] font-bold' : ''
            }`}
          >
            Case Studies
            {activeSection === 'case-studies' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dd6b4d]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#fbf8f5] relative py-1 cursor-pointer ${
              activeSection === 'contact' ? 'text-[#fbf8f5] font-bold' : ''
            }`}
          >
            Contact
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dd6b4d]" />
            )}
          </button>
        </nav>

        {/* Zone 3: Prominent WhatsApp Button & GET A FREE DEMO */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Prominent WhatsApp CTA button in Header */}
          <a
            href="https://wa.me/38348881191"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/70 hover:border-emerald-500/60 transition-all text-xs font-semibold whitespace-nowrap shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono-tabular">+383 48 881 191</span>
          </a>

          <button
            onClick={onOpenFreeDemo}
            className="btn-primary-orange btn-glow-hover px-4 sm:px-5 py-2.5 text-xs rounded-lg uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span>GET A FREE DEMO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
