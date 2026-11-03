import React, { useState } from 'react';
import { AGENCY_SERVICES, CALCULATOR_OPTIONS, calculateQuoteEstimate } from '../data/agencyData';
import { AgencyService, QuoteConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  ShoppingBag, 
  Smartphone, 
  Layout, 
  CheckCircle2, 
  Calculator, 
  ArrowRight, 
  Sparkles,
  ChevronDown,
  Layers,
  Sliders,
  ArrowUpRight
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenFreeDemoWithQuote: (quoteData: any) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenFreeDemoWithQuote
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'calculator'>('services');
  const [activeServiceId, setActiveServiceId] = useState<string>(AGENCY_SERVICES[0].id);
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  // Quote Calculator State
  const [projectType, setProjectType] = useState<QuoteConfig['projectType']>('custom-web');
  const [pageCountTier, setPageCountTier] = useState<QuoteConfig['pageCountTier']>('6-12');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['cms', 'seo', 'animations']);
  const [designLevel, setDesignLevel] = useState<QuoteConfig['designLevel']>('bespoke-luxury');
  const [timelineSpeed, setTimelineSpeed] = useState<QuoteConfig['timelineSpeed']>('standard');

  const currentEstimate = calculateQuoteEstimate({
    projectType,
    pageCountTier,
    features: selectedFeatures,
    designLevel,
    timelineSpeed
  });

  const toggleCardAccordion = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handleToggleFeature = (featId: string) => {
    if (selectedFeatures.includes(featId)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featId));
    } else {
      setSelectedFeatures([...selectedFeatures, featId]);
    }
  };

  const handleSelectService = (service: AgencyService) => {
    setActiveServiceId(service.id);
    if (service.id === 'ecommerce-solutions') {
      setProjectType('ecommerce');
      if (!selectedFeatures.includes('payments')) {
        setSelectedFeatures([...selectedFeatures, 'payments']);
      }
    } else if (service.id === 'mobile-optimization') {
      setProjectType('mobile-redesign');
    } else if (service.id === 'web-development') {
      setProjectType('custom-web');
    }
  };

  const handleConfigureInCalculator = (service: AgencyService, e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelectService(service);
    setActiveTab('calculator');
  };

  const handleLaunchQuote = () => {
    const selectedTypeObj = CALCULATOR_OPTIONS.projectTypes.find(p => p.id === projectType);
    onOpenFreeDemoWithQuote({
      projectTypeLabel: selectedTypeObj?.label || 'Custom Web Application',
      pageCountTier,
      designLevel,
      timelineSpeed,
      estimatedWeeks: currentEstimate.estimatedWeeks,
      investmentRange: currentEstimate.investmentRange,
      includedModules: currentEstimate.includedModules
    });
  };

  // Icon mapping
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-[#dd6b4d]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-[#dd6b4d]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#dd6b4d]" />;
      case 'Layout': return <Layout className="w-5 h-5 text-[#dd6b4d]" />;
      default: return <Code2 className="w-5 h-5 text-[#dd6b4d]" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08] relative">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/4 w-[600px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(221, 107, 77, 0.3) 0%, transparent 70%)'
        }}
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
            <Sparkles className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="font-body uppercase tracking-[0.1em] font-bold text-[#ff9d82]">
              Engineered Capabilities
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f5]">
            Comprehensive Web & Digital Solutions
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#b3a8a2] mt-2 max-w-xl leading-relaxed">
            Arkitekturë moderne digjitale e optimizuar për shpejtësi maksimale, përvojë të pakrahasueshme në celular dhe rritje të konvertimeve.
          </p>
        </div>

        {/* Interactive View Switcher Tabs (Anti-Clutter) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl self-start md:self-auto shadow-lg">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#dd6b4d] text-white shadow-[0_0_16px_rgba(221,107,77,0.4)]'
                : 'text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Shërbimet Inxhinierike</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-[#dd6b4d] text-white shadow-[0_0_16px_rgba(221,107,77,0.4)]'
                : 'text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/5'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Llogaritësi i Çmimit</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'services' ? (
          /* Services Grid with Compact Glassmorphism Cards & Interactive Accordion */
          <motion.div
            key="services-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {AGENCY_SERVICES.map((srv) => {
              const isActive = activeServiceId === srv.id;
              const isExpanded = !!expandedCards[srv.id];
              return (
                <div
                  key={srv.id}
                  onClick={() => handleSelectService(srv)}
                  className={`p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 relative group flex flex-col justify-between ${
                    isActive
                      ? 'bg-neutral-900/70 backdrop-blur-md border border-[#dd6b4d] shadow-[0_0_32px_rgba(221,107,77,0.22)] ring-1 ring-[#dd6b4d]/30'
                      : 'bg-neutral-900/40 backdrop-blur-md border border-white/10 hover:border-[#dd6b4d]/40 hover:bg-neutral-900/50'
                  }`}
                >
                  <div>
                    {/* Header with Icon and Code */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {renderIcon(srv.icon)}
                      </div>
                      <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d]">
                        {srv.code}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#fbf8f5] mb-1.5 group-hover:text-[#ff9d82] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="font-body text-xs text-[#dd6b4d] font-medium mb-3">
                      {srv.subtitle}
                    </p>
                    <p className="font-body text-xs text-[#b3a8a2] leading-relaxed mb-5">
                      {srv.description}
                    </p>

                    {/* Metric Highlight Badge */}
                    <div className="p-3 rounded-xl bg-black/50 border border-white/[0.06] flex items-center justify-between font-mono-tabular text-xs mb-4">
                      <span className="text-[#b3a8a2] text-[11px]">{srv.metrics.label}</span>
                      <span className="text-emerald-400 font-bold">{srv.metrics.value}</span>
                    </div>

                    {/* Interactive Accordion for Deliverables & Tech Specs (Uncluttered UX) */}
                    <div className="mb-4">
                      <button
                        onClick={(e) => toggleCardAccordion(srv.id, e)}
                        className="w-full flex items-center justify-between py-2 text-xs font-semibold text-[#ff9d82] hover:text-white transition-colors cursor-pointer border-t border-white/[0.06]"
                      >
                        <span>{isExpanded ? 'Fshih Modulet' : 'Shiko Modulet & Specifikat'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pt-2 space-y-3"
                          >
                            <div className="space-y-1.5">
                              {srv.deliverables.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-[#b3a8a2]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06] text-[11px] text-[#b3a8a2]">
                              {srv.technologies.map((tech, tIdx) => (
                                <span key={tIdx} className="px-2 py-0.5 rounded bg-white/[0.06] text-[#fbf8f5] font-mono-tabular">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="pt-3 border-t border-white/[0.06]">
                    <button
                      onClick={(e) => handleConfigureInCalculator(srv, e)}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-[#dd6b4d]/20 border border-white/10 hover:border-[#dd6b4d]/40 text-xs font-semibold text-[#fbf8f5] hover:text-[#ff9d82] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 text-[#dd6b4d]" />
                      <span>Llogarit Çmimin</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* Confirmed Interactive Feature: Website Cost & Timeline Quote Calculator */
          <motion.div
            key="calculator-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-10 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#dd6b4d]/60 to-transparent" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Calculator className="w-4 h-4 text-[#dd6b4d]" />
                  <span className="font-mono-tabular text-xs uppercase font-bold tracking-wider text-[#dd6b4d]">
                    Live Engineering Quote Calculator
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fbf8f5]">
                  Estimate Your Project Cost & Delivery Timeline
                </h3>
              </div>
              <span className="text-xs text-[#b3a8a2] lg:max-w-xs text-left lg:text-right leading-relaxed">
                Modelim transparent investimi pa tarifa të fshehura. Çmimi bazohet në tokena dizajni të personalizuar dhe kod TypeScript production-grade.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Left Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Project Type Selector */}
                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5 font-semibold">
                    1. Project Scope & Architecture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CALCULATOR_OPTIONS.projectTypes.map((pt) => {
                      const isSelected = projectType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          onClick={() => setProjectType(pt.id as any)}
                          className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900/80 border-[#dd6b4d] shadow-[0_0_16px_rgba(221,107,77,0.25)] text-[#fbf8f5]'
                              : 'bg-black/50 border-white/10 text-[#b3a8a2] hover:border-white/20'
                          }`}
                        >
                          <span className="block font-display text-xs font-bold mb-1">
                            {pt.label}
                          </span>
                          <span className="text-[11px] font-mono-tabular text-[#ff9d82]">
                            From {pt.baseWeeks} weeks base
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Page Count Tier */}
                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5 font-semibold">
                    2. Page & Template Volume
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CALCULATOR_OPTIONS.pageCountTiers.map((tier) => {
                      const isSelected = pageCountTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          onClick={() => setPageCountTier(tier.id as any)}
                          className={`py-2.5 px-3 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#dd6b4d] border-[#dd6b4d] text-white shadow-md'
                              : 'bg-black/50 border-white/10 text-[#b3a8a2] hover:border-white/20'
                          }`}
                        >
                          {tier.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Advanced Features Multi-select */}
                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5 font-semibold">
                    3. Specialized Modules & Integrations
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CALCULATOR_OPTIONS.availableFeatures.map((feat) => {
                      const isChecked = selectedFeatures.includes(feat.id);
                      return (
                        <button
                          key={feat.id}
                          onClick={() => handleToggleFeature(feat.id)}
                          className={`flex items-center justify-between p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-neutral-900/80 border-[#dd6b4d] text-[#fbf8f5]'
                              : 'bg-black/50 border-white/10 text-[#b3a8a2] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked ? 'bg-[#dd6b4d] border-[#dd6b4d] text-white' : 'border-white/20'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <span className="font-medium">{feat.label}</span>
                          </div>
                          <span className="text-[11px] font-mono-tabular text-[#ff9d82]">
                            +{feat.weeksAdd}w
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Design & Delivery Speed Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2 font-semibold">
                      Design Tier
                    </label>
                    <div className="flex gap-2">
                      {CALCULATOR_OPTIONS.designLevels.map((lvl) => (
                        <button
                          key={lvl.id}
                          onClick={() => setDesignLevel(lvl.id as any)}
                          className={`flex-1 py-2 px-2.5 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                            designLevel === lvl.id
                              ? 'bg-[#dd6b4d] border-[#dd6b4d] text-white'
                              : 'bg-black/50 border-white/10 text-[#b3a8a2]'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2 font-semibold">
                      Delivery Pace
                    </label>
                    <div className="flex gap-2">
                      {[
                        { id: 'standard', label: 'Standard Pace' },
                        { id: 'expedited', label: 'Expedited (Fast-Track)' }
                      ].map((spd) => (
                        <button
                          key={spd.id}
                          onClick={() => setTimelineSpeed(spd.id as any)}
                          className={`flex-1 py-2 px-2.5 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                            timelineSpeed === spd.id
                              ? 'bg-[#dd6b4d] border-[#dd6b4d] text-white'
                              : 'bg-black/50 border-white/10 text-[#b3a8a2]'
                          }`}
                        >
                          {spd.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Estimate Receipt Panel Right */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-black/60 border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] uppercase tracking-wider">
                    Calculated Architectural Estimate
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono-tabular">
                    Live Model
                  </span>
                </div>

                {/* Investment & Timeline Numbers */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10">
                    <span className="block text-[11px] uppercase font-mono-tabular text-[#b3a8a2] mb-1">
                      Estimated Investment Range
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5] font-mono-tabular">
                      {currentEstimate.investmentRange}
                    </span>
                    <span className="block text-[11px] text-[#ff9d82] mt-1 font-mono-tabular">
                      Fixed-scope agreement with milestone deliveries
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10">
                    <span className="block text-[11px] uppercase font-mono-tabular text-[#b3a8a2] mb-1">
                      Estimated Timeline
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5] font-mono-tabular">
                      {currentEstimate.estimatedWeeks}
                    </span>
                    <span className="block text-[11px] text-[#b3a8a2] mt-1 font-mono-tabular">
                      Includes full design, code, QA & SEO launch
                    </span>
                  </div>
                </div>

                {/* Included Modules Checklist */}
                <div className="space-y-2">
                  <span className="block text-[11px] uppercase font-mono-tabular text-[#b3a8a2] font-semibold">
                    Modules Included In This Scope:
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {currentEstimate.includedModules.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#fbf8f5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={handleLaunchQuote}
                  className="btn-primary-orange btn-glow-hover w-full py-3.5 text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg font-bold"
                >
                  <span>LOCK IN THIS ESTIMATE & DEMO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-[#b3a8a2]">
                  No obligation · Receive an architectural breakdown & custom demo link within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
