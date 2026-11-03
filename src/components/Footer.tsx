import React from 'react';
import { ArrowUpRight, MessageCircle, Instagram, Mail, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenFreeDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenFreeDemo }) => {
  return (
    <footer className="w-full bg-[#0b0b0b] border-t border-white/[0.08] text-[#b3a8a2] py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mb-14">
        {/* Brand & Mission & Social */}
        <div className="md:col-span-5 space-y-4">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('overview');
            }}
            className="font-display text-2xl font-extrabold tracking-tight text-[#fbf8f5] inline-flex items-center gap-2.5 group"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#dd6b4d]/40 shadow-[0_0_10px_rgba(221,107,77,0.3)] shrink-0 bg-[#140e0d] p-0.5 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/aistudio/logo_e0adced0.png"
                alt="STARWEBS.KS Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span>STARWEBS<span className="text-[#dd6b4d]">.KS</span></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d]" />
          </a>
          <p className="font-body text-xs text-[#b3a8a2] max-w-sm leading-relaxed">
            High-performance web development and digital engineering agency. We build bespoke web applications, high-converting headless e-commerce storefronts, and mobile-first platforms with luxury dark obsidian design.
          </p>

          {/* Contact & Social Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950 hover:border-emerald-500/70 transition-colors text-xs font-semibold font-mono-tabular"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +383 48 881 191</span>
            </a>

            <a
              href="https://instagram.com/starwebs.ks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#fbf8f5] hover:border-[#dd6b4d]/40 transition-colors text-xs font-semibold"
            >
              <Instagram className="w-3.5 h-3.5 text-[#dd6b4d]" />
              <span>Instagram: @starwebs.ks</span>
            </a>
          </div>
        </div>

        {/* Navigation Mirror */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <span className="font-mono-tabular font-bold uppercase tracking-wider text-[#dd6b4d] block mb-1">
            Agency Navigation
          </span>
          <ul className="space-y-2.5">
            <li>
              <button
                onClick={() => onNavigate('overview')}
                className="hover:text-[#fbf8f5] transition-colors cursor-pointer text-left"
              >
                Overview & Speed Engine
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="hover:text-[#fbf8f5] transition-colors cursor-pointer text-left"
              >
                Services & Quote Calculator
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('portfolio')}
                className="hover:text-[#fbf8f5] transition-colors cursor-pointer text-left"
              >
                Portfolio & Live Mockups
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('case-studies')}
                className="hover:text-[#fbf8f5] transition-colors cursor-pointer text-left"
              >
                Quantified Case Studies
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('trust')}
                className="hover:text-[#fbf8f5] transition-colors cursor-pointer text-left text-[#ff9d82]"
              >
                Besueshmëria & ARBK
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-[#fbf8f5] transition-colors cursor-pointer text-left"
              >
                Contact & Custom Quote
              </button>
            </li>
          </ul>
        </div>

        {/* Call to Action Column */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-mono-tabular font-bold uppercase tracking-wider text-[#dd6b4d] block mb-1">
            Elevate Your Business
          </span>
          <p className="text-xs text-[#b3a8a2] leading-relaxed">
            Ready to upgrade your web presence with sub-second speeds and custom conversion architecture?
          </p>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={onOpenFreeDemo}
              className="btn-primary-orange btn-glow-hover w-full py-3 text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold shadow-lg"
            >
              <span>GET A FREE DEMO</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#171211] border border-emerald-500/30 text-emerald-300 hover:bg-[#1f1715] hover:border-emerald-500/60 transition-colors text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact Us: +383 48 881 191</span>
            </a>
          </div>
        </div>
      </div>

      {/* Official Kosovo Enterprise Trust Bar (ARBK & Superpuna) */}
      <div className="max-w-[1440px] mx-auto mb-8 p-4 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tabular">
        <div className="flex items-center gap-2.5 text-[#fbf8f5]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">Biznes i Regjistruar në ARBK</span>
          <span className="text-white/20 hidden sm:inline">·</span>
          <span className="text-[#b3a8a2] hidden sm:inline">Republika e Kosovës</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#b3a8a2]">Punësimi i Rinisë:</span>
          <a
            href="https://superpuna.rks-gov.net/job-seeker/employer/starwebs-ks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dd6b4d]/20 border border-[#dd6b4d]/40 text-[#ff9d82] hover:bg-[#dd6b4d] hover:text-white transition-all font-semibold"
          >
            <span>Profili në Superpuna</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Legal & Standards */}
      <div className="max-w-[1440px] mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#b3a8a2] gap-4 font-mono-tabular">
        <p>© {new Date().getFullYear()} starwebs.ks Digital Engineering Agency. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-3">
          <span>Biznes i Regjistruar në ARBK</span>
          <span>·</span>
          <a 
            href="https://superpuna.rks-gov.net/job-seeker/employer/starwebs-ks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#ff9d82] hover:underline"
          >
            Profili në Superpuna
          </a>
          <span>·</span>
          <span>WhatsApp: +383 48 881 191</span>
        </div>
      </div>

      {/* Signature Bar: Designed & Engineered by amarabdurrahmani.com & shend.dev */}
      <div className="max-w-[1440px] mx-auto pt-6 mt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono-tabular tracking-wide gap-3">
        <p className="text-center sm:text-left">
          Designed & Engineered by{' '}
          <a
            href="https://amarabdurrahmani.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-[#ff9d82] transition-colors underline decoration-white/20 underline-offset-4 font-medium"
          >
            amarabdurrahmani.com
          </a>{' '}
          &{' '}
          <a
            href="https://shend.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-[#ff9d82] transition-colors underline decoration-white/20 underline-offset-4 font-medium"
          >
            shend.dev
          </a>
        </p>
        <span className="text-[11px] text-neutral-600 hidden sm:inline">
          Prishtinë, Republic of Kosovo · High-Performance Web Architecture
        </span>
      </div>
    </footer>
  );
};
