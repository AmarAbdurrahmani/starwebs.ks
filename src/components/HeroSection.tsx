import React, { useState } from 'react';
import { ArrowRight, Gauge, Zap, Smartphone, ShieldCheck, CheckCircle2, MessageCircle, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onOpenFreeDemo: () => void;
  onExploreServices: () => void;
  onOpenPortfolio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFreeDemo,
  onExploreServices,
  onOpenPortfolio
}) => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<'starwebs' | 'generic'>('starwebs');

  return (
    <section id="overview" className="relative pt-12 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
      {/* Subtle atmospheric burnt orange glow in background */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[420px] rounded-full pointer-events-none opacity-30 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(221, 107, 77, 0.42) 0%, rgba(200, 109, 81, 0.12) 60%, transparent 80%)'
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
        {/* Left Column: Bold Impactful Typography & Value Proposition with Staggered Motion */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Header Badges with WhatsApp and Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2.5 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/50 border border-white/10 backdrop-blur-md shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] shadow-[0_0_8px_#dd6b4d] animate-pulse" />
              <span className="font-body text-[11px] font-bold tracking-[0.08em] uppercase text-[#ff9d82]">
                Digital Engineering & Web Agency
              </span>
            </div>

            {/* Official Instagram Badge */}
            <a
              href="https://instagram.com/starwebs.ks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-white/10 text-xs text-[#b3a8a2] hover:text-[#fbf8f5] hover:border-[#dd6b4d]/40 transition-colors backdrop-blur-md"
            >
              <Instagram className="w-3.5 h-3.5 text-[#dd6b4d]" />
              <span className="text-[11px] font-mono-tabular">@starwebs.ks</span>
            </a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-[62px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#fbf8f5] mb-6 text-balance"
          >
            Crafting High-Performance, Modern & Mobile-Friendly Websites for Ambitious Businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-base lg:text-lg leading-relaxed text-[#b3a8a2] max-w-2xl mb-8"
          >
            At <strong className="text-[#fbf8f5] font-semibold">starwebs.ks</strong>, we replace slow, bloated templates with bespoke web engineering. From headless e-commerce stores to lightning-fast web applications, we build digital flagship products engineered for speed, conversion, and clean design.
          </motion.p>

          {/* CTAs Row including Prominent WhatsApp Button with scale-105 hover and glowing border */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="flex flex-wrap items-center gap-3.5 mb-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenFreeDemo}
              className="btn-primary-orange btn-glow-hover px-7 py-3.5 text-xs font-bold rounded-lg tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>GET A FREE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Prominent WhatsApp Button in Hero */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/80 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +383 48 881 191</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenPortfolio}
              className="btn-secondary-dark px-5 py-3.5 text-xs font-semibold rounded-lg tracking-wider uppercase cursor-pointer"
            >
              SHIKO PORTOFOLIN
            </motion.button>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs text-[#b3a8a2]"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#dd6b4d]" />
              <span>&lt;800ms Average Load Speed</span>
            </div>
            <span className="text-white/20 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#dd6b4d]" />
              <span>100% Mobile-First Responsive</span>
            </div>
            <span className="text-white/20 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#dd6b4d]" />
              <span>Clean Scalable TypeScript Code</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Performance & Engineering Benchmark Engine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="p-6 rounded-2xl card-chocolate border border-white/[0.12] relative overflow-hidden shadow-2xl">
            {/* Top Specular catch light */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#dd6b4d]/40 to-transparent" />

            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#dd6b4d]" />
                <span className="font-display text-sm font-bold text-[#fbf8f5]">
                  Core Web Vitals Engine
                </span>
              </div>
              <span className="text-[11px] font-mono-tabular text-[#dd6b4d] font-semibold bg-[#dd6b4d]/10 px-2 py-0.5 rounded border border-[#dd6b4d]/20">
                AUDITED IN PRODUCTION
              </span>
            </div>

            {/* Benchmark Toggle */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0b0b0b] rounded-lg border border-white/[0.08] mb-5">
              <button
                onClick={() => setSelectedBenchmark('starwebs')}
                className={`py-2 text-xs font-semibold rounded transition-all cursor-pointer ${
                  selectedBenchmark === 'starwebs'
                    ? 'bg-[#dd6b4d] text-white shadow-md'
                    : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                }`}
              >
                starwebs.ks Architecture
              </button>
              <button
                onClick={() => setSelectedBenchmark('generic')}
                className={`py-2 text-xs font-semibold rounded transition-all cursor-pointer ${
                  selectedBenchmark === 'generic'
                    ? 'bg-[#221816] text-[#ff9d82] border border-[#dd6b4d]/30'
                    : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                }`}
              >
                Typical WordPress / Templates
              </button>
            </div>

            {/* Performance Dial & Scores */}
            {selectedBenchmark === 'starwebs' ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-[#0b0b0b]/80 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono-tabular text-emerald-400 font-bold block mb-0.5">
                      Lighthouse Performance Index
                    </span>
                    <span className="font-display text-3xl font-extrabold text-[#fbf8f5] font-mono-tabular">
                      100 / 100
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center font-mono-tabular text-emerald-400 font-bold text-sm shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    99+
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center font-mono-tabular text-xs">
                  <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.06]">
                    <span className="block text-[10px] text-[#b3a8a2] uppercase">LCP (Speed)</span>
                    <span className="text-sm font-bold text-emerald-400">0.58s</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.06]">
                    <span className="block text-[10px] text-[#b3a8a2] uppercase">CLS (Stability)</span>
                    <span className="text-sm font-bold text-emerald-400">0.00</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.06]">
                    <span className="block text-[10px] text-[#b3a8a2] uppercase">INP (Response)</span>
                    <span className="text-sm font-bold text-emerald-400">18ms</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#1c1513] border border-[#dd6b4d]/20 text-xs text-[#b3a8a2] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#fbf8f5]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d]" />
                    <span>Edge server-side rendering + zero unnecessary JS bloat</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#fbf8f5]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d]" />
                    <span>AVIF next-gen responsive image optimization</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-[#0b0b0b]/80 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono-tabular text-amber-400 font-bold block mb-0.5">
                      Average Bloated Template Score
                    </span>
                    <span className="font-display text-3xl font-extrabold text-[#fbf8f5] font-mono-tabular">
                      52 / 100
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center font-mono-tabular text-amber-400 font-bold text-sm">
                    52
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center font-mono-tabular text-xs">
                  <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.06]">
                    <span className="block text-[10px] text-[#b3a8a2] uppercase">LCP (Speed)</span>
                    <span className="text-sm font-bold text-rose-400">3.4s</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.06]">
                    <span className="block text-[10px] text-[#b3a8a2] uppercase">CLS (Stability)</span>
                    <span className="text-sm font-bold text-amber-400">0.24</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.06]">
                    <span className="block text-[10px] text-[#b3a8a2] uppercase">INP (Response)</span>
                    <span className="text-sm font-bold text-amber-400">180ms</span>
                  </div>
                </div>

                <p className="text-xs text-[#b3a8a2] p-2 leading-relaxed">
                  Every 1-second delay reduces conversions by 7%. Our custom development eliminates unused CSS, 50+ plugins, and sluggish database calls.
                </p>
              </div>
            )}

            {/* Quick Consultation CTA from Widget */}
            <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-[#b3a8a2]">Want sub-second speed for your site?</span>
              <button
                onClick={onOpenFreeDemo}
                className="text-[#dd6b4d] hover:text-[#ff9d82] font-semibold cursor-pointer underline underline-offset-2 flex items-center gap-1"
              >
                <span>Request Speed Audit</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
