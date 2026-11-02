import React, { useState } from 'react';
import { Layers, CheckCircle2, ChevronRight, Terminal, Cpu } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'E-Commerce' | 'Styling';
  role: string;
  speedAdvantage: string;
  description: string;
}

export const TechStackGrid: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('nextjs');

  const techList: TechItem[] = [
    {
      id: 'react',
      name: 'React 19',
      category: 'Frontend',
      role: 'Reactive Component Architecture',
      speedAdvantage: 'Instant client updates & sub-16ms paint cycles',
      description: 'Leveraging concurrent rendering, server actions, and optimistic UI transitions to make complex applications feel instantaneous.'
    },
    {
      id: 'nextjs',
      name: 'Next.js 15',
      category: 'Frontend',
      role: 'Full-Stack Edge Framework',
      speedAdvantage: 'Global edge SSR & automatic image optimization',
      description: 'Our primary framework for web portals and corporate platforms, delivering pre-rendered HTML to users in under 300ms from edge nodes worldwide.'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS v4',
      category: 'Styling',
      role: 'Modern Utility Styling Engine',
      speedAdvantage: 'Zero runtime overhead & tiny CSS payloads',
      description: 'Enforces strict obsidian design tokens without bloated runtime style generation, keeping critical CSS under 15KB per page.'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend',
      role: 'Strict Type Safety & Invariants',
      speedAdvantage: 'Zero production runtime type crashes',
      description: 'Guarantees clean, documented, and resilient codebases that your in-house teams can comfortably scale for years without technical debt.'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      role: 'High-Throughput Runtime',
      speedAdvantage: 'Non-blocking asynchronous I/O performance',
      description: 'Powers custom backend services, microservices, webhooks, and secure authentication flows with rapid event handling.'
    },
    {
      id: 'supabase',
      name: 'Supabase',
      category: 'Database',
      role: 'Relational Database & Real-Time Sync',
      speedAdvantage: 'Instant PostgreSQL querying & row-level security',
      description: 'Enterprise-grade PostgreSQL infrastructure providing real-time data subscriptions, vector search capabilities, and robust auth.'
    },
    {
      id: 'shopify',
      name: 'Shopify Plus / Storefront API',
      category: 'E-Commerce',
      role: 'Headless Commerce Core',
      speedAdvantage: '99.99% checkout uptime & global payment gateways',
      description: 'Coupling enterprise merchant inventory and logistics with our custom sub-second frontends for maximum conversion lift.'
    },
    {
      id: 'stripe',
      name: 'Stripe Elements',
      category: 'E-Commerce',
      role: 'Frictionless Payment Engine',
      speedAdvantage: '1-Click Apple Pay / Google Pay checkouts',
      description: 'Direct integration with modern mobile wallets, reducing checkout steps from 7 fields down to a single biometric confirmation.'
    }
  ];

  const activeItem = techList.find(t => t.id === selectedTech) || techList[0];

  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
            <Cpu className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="font-body uppercase tracking-[0.08em] font-bold text-[#ff9d82]">
              Engineering Arsenal
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf8f5]">
            Modern Tech Stack & Architecture
          </h2>
        </div>
        <p className="font-body text-sm text-[#b3a8a2] max-w-md">
          Zero legacy baggage. We exclusively build with battle-tested, high-velocity technologies built for speed and longevity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tech Badges Grid Left */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {techList.map((tech) => {
            const isSelected = selectedTech === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedTech(tech.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[108px] ${
                  isSelected
                    ? 'card-chocolate border-[#dd6b4d] shadow-[0_0_20px_rgba(221,107,77,0.25)] text-[#fbf8f5]'
                    : 'bg-[#171211]/50 border-white/[0.06] text-[#b3a8a2] hover:border-white/20 hover:bg-[#171211]'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-mono-tabular text-[#dd6b4d] font-bold block mb-1">
                    {tech.category}
                  </span>
                  <span className="font-display text-sm font-bold block text-[#fbf8f5]">
                    {tech.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-white/[0.06]">
                  <span className="truncate">{tech.role.split(' ')[0]}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#dd6b4d] shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Panel Right */}
        <div className="lg:col-span-5 p-7 rounded-2xl card-chocolate-elevated border border-white/[0.12] shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
            <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] uppercase tracking-wider">
              Architecture Analysis
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-white/[0.06] text-[#fbf8f5] font-mono-tabular">
              {activeItem.category}
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold text-[#fbf8f5] mb-1">
            {activeItem.name}
          </h3>
          <p className="font-body text-xs text-[#ff9d82] font-semibold mb-4">
            {activeItem.role}
          </p>

          <p className="font-body text-xs text-[#b3a8a2] leading-relaxed mb-6">
            {activeItem.description}
          </p>

          <div className="p-4 rounded-xl bg-[#0b0b0b] border border-[#dd6b4d]/30 mb-4">
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#dd6b4d] font-bold block mb-1">
              Direct Performance Benefit
            </span>
            <p className="text-xs font-medium text-[#fbf8f5]">
              {activeItem.speedAdvantage}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#b3a8a2]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strictly maintained and updated to latest stable LTS releases.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
