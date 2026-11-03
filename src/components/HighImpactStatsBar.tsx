import React from 'react';
import { Smartphone, Zap, Palette, Headphones } from 'lucide-react';

export const HighImpactStatsBar: React.FC = () => {
  const stats = [
    {
      icon: Smartphone,
      title: '100% Mobile Optimized',
      metric: '0.00 CLS',
      description: 'Zero layout shifts, thumb-zone ergonomics & touch velocity across iOS and Android.'
    },
    {
      icon: Zap,
      title: 'Ultra-Fast Performance',
      metric: '< 0.8s LCP',
      description: 'Instant edge caching, sub-second hydration & 100/100 Lighthouse speed scores.'
    },
    {
      icon: Palette,
      title: 'Custom UI/UX',
      metric: 'Bespoke Tokens',
      description: 'No generic templates. Crafted with luxury dark obsidian design & conversion psychology.'
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      metric: '< 4h SLA',
      description: 'Direct engineer escalation via WhatsApp (+383 48 881 191) with zero ticket queues.'
    }
  ];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/40 backdrop-blur-md border border-white/10 hover:border-[#dd6b4d]/40 hover:bg-neutral-900/60 transition-all duration-300 relative group shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-[#dd6b4d] group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] bg-[#dd6b4d]/10 px-2.5 py-0.5 rounded-full border border-[#dd6b4d]/20">
                  {item.metric}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-[#fbf8f5] mb-2 group-hover:text-[#ff9d82] transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-xs text-[#b3a8a2] leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
