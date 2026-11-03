import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, Zap, Shield, CheckCircle2, Sparkles, ChevronRight, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudiesSectionProps {
  onOpenFreeDemo: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenFreeDemo }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('fintech-migration');
  const [activeTabType, setActiveTabType] = useState<'solution' | 'problem'>('solution');

  const caseStudies = [
    {
      id: 'fintech-migration',
      client: 'Aura Capital AG',
      domain: 'Institutional FinTech Portal',
      problem: 'Legacy AngularJS portal suffered from 4.8s initial load time and erratic WebSocket disconnections, causing user friction during market volatility.',
      solution: 'Re-architected from the ground up using React 19, TypeScript, and edge-rendered Next.js with optimized WebSocket connection pools.',
      results: [
        { metric: '-89%', label: 'Latency Reduction (4.8s → 0.52s)' },
        { metric: '+185%', label: 'Active Daily Portfolios Managed' },
        { metric: '0', label: 'Reported Dropped Packets in 12 Mos' }
      ],
      tech: ['Next.js 15', 'TypeScript', 'WebSockets', 'Tailwind CSS']
    },
    {
      id: 'luxury-ecommerce',
      client: 'Vespera Horology',
      domain: 'Headless E-Commerce Flagship',
      problem: 'Standard Shopify theme was burdened with 42 third-party apps, resulting in a 34/100 mobile speed score and high cart abandonment on mobile devices.',
      solution: 'Engineered a custom headless storefront via Shopify Storefront GraphQL API with native 1-click Apple Pay / Google Pay and custom 360° product asset viewers.',
      results: [
        { metric: '+44.2%', label: 'Increase in Mobile Checkout Rate' },
        { metric: '99/100', label: 'Mobile Google PageSpeed Score' },
        { metric: '€3.8M', label: 'Processed in First 90 Days' }
      ],
      tech: ['Shopify Storefront API', 'React 19', 'Stripe', 'Edge CDN']
    },
    {
      id: 'b2b-saas',
      client: 'Nexus Systems Ltd',
      domain: 'Developer Infrastructure Console',
      problem: 'Slow administrative tables struggled to render thousands of real-time server nodes without browser freezing and excessive memory leaks.',
      solution: 'Implemented virtualized data grids with strict tabular numerals, Web Worker background calculations, and sub-16ms render cycles.',
      results: [
        { metric: '60 FPS', label: 'Sustained Virtual Table Scrolling' },
        { metric: '<400ms', label: 'Global Incident Notification Latency' },
        { metric: '99.99%', label: 'Guaranteed Engine SLA' }
      ],
      tech: ['React 19', 'Web Workers', 'Tailwind', 'GraphQL']
    }
  ];

  const activeCase = caseStudies.find(c => c.id === selectedCaseId) || caseStudies[0];

  return (
    <section id="case-studies" className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08] relative">
      {/* Subtle Ambient Radial Lighting */}
      <div 
        className="absolute top-1/2 right-1/4 w-[550px] h-[320px] rounded-full pointer-events-none opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(221, 107, 77, 0.35) 0%, transparent 70%)'
        }}
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
            <TrendingUp className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="font-body uppercase tracking-[0.1em] font-bold text-[#ff9d82]">
              Quantified Outcomes · Case Studies
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f5]">
            Proven Engineering ROI
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#b3a8a2] mt-2 max-w-xl leading-relaxed">
            Transformime të matshme biznesi: krahasime para dhe pas që dëshmojnë se si shpejtësia nën-sekondëshe dhe arkitektura e pastër rrisin shitjet.
          </p>
        </div>

        {/* Interactive Client Case Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl self-start md:self-auto shadow-lg">
          {caseStudies.map((cs) => {
            const isSelected = cs.id === activeCase.id;
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseId(cs.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#dd6b4d] text-white shadow-[0_0_16px_rgba(221,107,77,0.4)]'
                    : 'text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/5'
                }`}
              >
                {cs.client}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Executive Case Showcase (Consolidated & Uncluttered) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl bg-neutral-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Top Accent Beam */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#dd6b4d]/60 to-transparent" />

          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono-tabular">
                <span className="text-[#dd6b4d] font-bold">{activeCase.client}</span>
                <span className="text-white/20">·</span>
                <span className="text-[#b3a8a2]">{activeCase.domain}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5]">
                {activeCase.client} Architecture Overhaul
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono-tabular text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified ROI Benchmark</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Challenge vs Solution Accordion/Tab */}
            <div className="lg:col-span-7 space-y-6">
              {/* Interactive Accordion Toggles */}
              <div className="flex items-center gap-2 p-1 bg-black/60 rounded-xl border border-white/10 w-fit">
                <button
                  onClick={() => setActiveTabType('solution')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTabType === 'solution'
                      ? 'bg-[#dd6b4d] text-white shadow-sm'
                      : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                  }`}
                >
                  Zgjidhja e Inxhinieruar (Solution)
                </button>
                <button
                  onClick={() => setActiveTabType('problem')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTabType === 'problem'
                      ? 'bg-[#dd6b4d] text-white shadow-sm'
                      : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                  }`}
                >
                  Sfida Fillestare (The Challenge)
                </button>
              </div>

              {/* Dynamic Content Card */}
              <div className="p-6 rounded-2xl bg-black/50 border border-white/10 min-h-[140px] flex flex-col justify-center">
                {activeTabType === 'solution' ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2 font-mono-tabular text-xs uppercase font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Arkitektura & Zgjidhja</span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#fbf8f5] leading-relaxed">
                      {activeCase.solution}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2 font-mono-tabular text-xs uppercase font-bold text-rose-400">
                      <Zap className="w-4 h-4 text-rose-400" />
                      <span>Problemi & Kostoja e Shpejtësisë së Ngadaltë</span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#b3a8a2] leading-relaxed">
                      {activeCase.problem}
                    </p>
                  </div>
                )}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-[#b3a8a2] font-mono-tabular">Teknologjitë e Përdorura:</span>
                {activeCase.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#fbf8f5] text-xs font-mono-tabular"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Quantitative Results Grid & Direct CTA */}
            <div className="lg:col-span-5 space-y-4">
              <span className="block text-xs font-mono-tabular uppercase tracking-wider text-[#dd6b4d] font-bold">
                Rezultatet e Matshme:
              </span>

              <div className="space-y-3">
                {activeCase.results.map((res, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/50 border border-white/10 hover:border-[#dd6b4d]/30 transition-colors"
                  >
                    <span className="text-xs text-[#b3a8a2]">{res.label}</span>
                    <span className="font-mono-tabular text-lg sm:text-xl font-extrabold text-emerald-400">
                      {res.metric}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenFreeDemo}
                  className="btn-primary-orange btn-glow-hover w-full py-3 text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold shadow-lg"
                >
                  <span>KËRKO NJË ZGJIDHJE TË NGJASHME</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
