import React from 'react';
import { TrendingUp, ArrowUpRight, Zap, Shield, CheckCircle2 } from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenFreeDemo: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenFreeDemo }) => {
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

  return (
    <section id="case-studies" className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
            <TrendingUp className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="font-body uppercase tracking-[0.08em] font-bold text-[#ff9d82]">
              Quantified Outcomes
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf8f5]">
            Proven Engineering ROI
          </h2>
        </div>
        <p className="font-body text-sm text-[#b3a8a2] max-w-md">
          Measurable client transformation: before-and-after benchmarks demonstrating how sub-second speeds translate into direct business revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {caseStudies.map((cs) => (
          <div
            key={cs.id}
            className="p-7 rounded-2xl card-chocolate border border-white/[0.08] hover:border-[#dd6b4d]/40 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#b3a8a2] mb-3">
                <span className="text-[#dd6b4d] font-bold">{cs.client}</span>
                <span>{cs.domain}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-[#fbf8f5] mb-4">
                {cs.client} Architecture Overhaul
              </h3>

              <div className="space-y-4 mb-6 text-xs text-[#b3a8a2] leading-relaxed">
                <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.04]">
                  <strong className="text-rose-400 block mb-1 font-mono-tabular uppercase text-[10px]">The Challenge:</strong>
                  <span>{cs.problem}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0b0b0b]/60 border border-white/[0.04]">
                  <strong className="text-emerald-400 block mb-1 font-mono-tabular uppercase text-[10px]">Our Engineered Solution:</strong>
                  <span>{cs.solution}</span>
                </div>
              </div>

              {/* Quantified Results Strip */}
              <div className="space-y-2 mb-6">
                {cs.results.map((res, rIdx) => (
                  <div key={rIdx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#1c1513] border border-white/[0.06] text-xs">
                    <span className="text-[#b3a8a2] text-[11px] truncate">{res.label}</span>
                    <span className="font-mono-tabular font-bold text-[#fbf8f5] text-sm shrink-0 ml-2">
                      {res.metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06] text-[11px] text-[#b3a8a2]">
                {cs.tech.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.04] text-[#ff9d82]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Callout Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#171211] via-[#221816] to-[#171211] border border-[#dd6b4d]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-[#fbf8f5] mb-1">
            Ready to achieve comparable speed & conversion metrics?
          </h4>
          <p className="text-xs text-[#b3a8a2]">
            Book a 30-minute discovery session with our lead architects. We will audit your current site live on the call.
          </p>
        </div>
        <button
          onClick={onOpenFreeDemo}
          className="btn-primary-orange px-6 py-3 text-xs rounded-lg uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer shrink-0"
        >
          CLAIM YOUR FREE AUDIT
        </button>
      </div>
    </section>
  );
};
