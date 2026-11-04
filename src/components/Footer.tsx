import React from 'react';
import { ArrowUpRight, MessageCircle, Instagram, Linkedin, Mail, PhoneCall } from 'lucide-react';

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

            <a
              href="https://www.linkedin.com/company/starwebs-ks/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#fbf8f5] hover:border-[#0a66c2]/50 hover:text-[#70b5f9] transition-colors text-xs font-semibold group"
              title="STARWEBS.KS LinkedIn Company Profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2] group-hover:scale-110 transition-transform" />
              <span>LinkedIn: starwebs-ks</span>
            </a>

            <a
              href="https://www.pinterest.com/starwebsks/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#fbf8f5] hover:border-[#E60023]/50 hover:text-[#ff8a93] transition-colors text-xs font-semibold group"
              title="STARWEBS.KS Official Pinterest Profile"
            >
              <svg 
                className="w-3.5 h-3.5 text-[#E60023] group-hover:scale-110 transition-transform fill-current" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
              <span>Pinterest: starwebsks</span>
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
            <li>
              <button
                onClick={() => onNavigate('faq')}
                className="hover:text-[#ff9d82] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#fbf8f5] font-medium"
              >
                <span>Pyetjet e Shpeshta (FAQ)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d]" />
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
          <button
            onClick={() => onNavigate('faq')}
            className="text-[#ff9d82] hover:underline cursor-pointer"
          >
            Pyetjet e Shpeshta (FAQ)
          </button>
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
          <a
            href="https://www.pinterest.com/starwebsks/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff9d82] hover:underline"
          >
            Pinterest
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
