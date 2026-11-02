import React, { useState } from 'react';
import { AGENCY_SERVICES, CALCULATOR_OPTIONS, calculateQuoteEstimate } from '../data/agencyData';
import { AgencyService, QuoteConfig } from '../types';
import { 
  Code2, 
  ShoppingBag, 
  Smartphone, 
  Layout, 
  CheckCircle2, 
  Calculator, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Clock,
  Layers
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenFreeDemoWithQuote: (quoteData: any) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenFreeDemoWithQuote
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(AGENCY_SERVICES[0].id);

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
    <section id="services" className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
            <Sparkles className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="font-body uppercase tracking-[0.08em] font-bold text-[#ff9d82]">
              Engineered Capabilities
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf8f5]">
            Comprehensive Web & Digital Solutions
          </h2>
        </div>
        <p className="font-body text-sm text-[#b3a8a2] max-w-md">
          Four specialized engineering disciplines tailored to elevate modern brands, drive organic search velocity, and accelerate customer conversion.
        </p>
      </div>

      {/* 4 Interactive Obsidian Cards with Glowing Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {AGENCY_SERVICES.map((srv) => {
          const isActive = activeServiceId === srv.id;
          return (
            <div
              key={srv.id}
              onClick={() => handleSelectService(srv)}
              className={`p-7 rounded-2xl cursor-pointer transition-all duration-300 relative group flex flex-col justify-between ${
                isActive
                  ? 'card-chocolate border-[#dd6b4d] shadow-[0_0_28px_rgba(221,107,77,0.22)]'
                  : 'card-chocolate border-white/[0.08] hover:border-[#dd6b4d]/40'
              }`}
            >
              <div>
                {/* Header with Icon and Code */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#221816] border border-white/10 flex items-center justify-center">
                    {renderIcon(srv.icon)}
                  </div>
                  <span className="font-mono-tabular text-xs font-semibold text-[#dd6b4d]">
                    {srv.code}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#fbf8f5] mb-2 group-hover:text-[#ff9d82] transition-colors">
                  {srv.title}
                </h3>
                <p className="font-body text-xs text-[#dd6b4d] font-medium mb-3">
                  {srv.subtitle}
                </p>
                <p className="font-body text-xs text-[#b3a8a2] leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 mb-6">
                  {srv.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#b3a8a2]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Metric Strip */}
                <div className="p-3 rounded-lg bg-[#0b0b0b]/80 border border-white/[0.05] flex items-center justify-between font-mono-tabular text-xs mb-4">
                  <span className="text-[#b3a8a2] text-[11px]">{srv.metrics.label}</span>
                  <span className="text-emerald-400 font-bold">{srv.metrics.value}</span>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06] text-[11px] text-[#b3a8a2]">
                  {srv.technologies.slice(0, 3).map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white/[0.04] text-[#fbf8f5]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmed Interactive Feature: Website Cost & Timeline Quote Calculator */}
      <div className="p-8 lg:p-10 rounded-2xl card-chocolate-elevated border border-white/[0.12] relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#dd6b4d]/50 to-transparent" />

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
          <span className="text-xs text-[#b3a8a2] lg:max-w-xs text-left lg:text-right">
            Transparent investment modeling with zero hidden markups. Based on custom design tokens and production-grade TypeScript.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Project Type Selector */}
            <div>
              <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5">
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
                          ? 'bg-[#221816] border-[#dd6b4d] shadow-[0_0_16px_rgba(221,107,77,0.25)] text-[#fbf8f5]'
                          : 'bg-[#0b0b0b]/60 border-white/[0.08] text-[#b3a8a2] hover:border-white/20'
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
              <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5">
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
                          : 'bg-[#0b0b0b]/60 border-white/[0.08] text-[#b3a8a2] hover:border-white/20'
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Included Features Checkboxes */}
            <div>
              <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5">
                3. Technical Add-Ons & Capabilities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CALCULATOR_OPTIONS.availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => handleToggleFeature(feat.id)}
                      className={`text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#1e1514] border-[#dd6b4d]/80 text-[#fbf8f5]'
                          : 'bg-[#0b0b0b]/40 border-white/[0.06] text-[#b3a8a2] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                            isChecked ? 'bg-[#dd6b4d] border-[#dd6b4d]' : 'border-white/20'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span>{feat.label}</span>
                      </div>
                      <span className="font-mono-tabular text-[11px] text-[#ff9d82]">
                        +€{feat.priceAdd}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Timeline Speed Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b0b0b]/70 border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-[#dd6b4d]" />
                <span className="text-[#fbf8f5] font-semibold">Expedited Fast-Track Delivery:</span>
                <span className="text-[#b3a8a2]">Prioritize engineering sprint</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimelineSpeed('standard')}
                  className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${
                    timelineSpeed === 'standard'
                      ? 'bg-[#dd6b4d] text-white'
                      : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setTimelineSpeed('expedited')}
                  className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${
                    timelineSpeed === 'expedited'
                      ? 'bg-[#dd6b4d] text-white'
                      : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                  }`}
                >
                  Expedited (-30% Time)
                </button>
              </div>
            </div>
          </div>

          {/* Calculator Output Right Column */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0b0b0b] border border-white/[0.1] space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="font-mono-tabular text-xs uppercase font-bold text-[#dd6b4d]">
                Live Estimate Summary
              </span>
              <span className="text-[11px] text-emerald-400 font-mono-tabular font-semibold">
                Guaranteed {currentEstimate.guaranteedSpeedScore}+ Speed
              </span>
            </div>

            {/* Big Numbers */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#171211] border border-white/[0.08]">
                <span className="block text-[11px] uppercase font-mono-tabular text-[#b3a8a2] mb-1">
                  Estimated Investment Range
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#fbf8f5] font-mono-tabular">
                  {currentEstimate.investmentRange}
                </span>
                <span className="block text-[11px] text-[#ff9d82] mt-1">
                  Fixed-scope agreement with milestone deliveries
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#171211] border border-white/[0.08]">
                <span className="block text-[11px] uppercase font-mono-tabular text-[#b3a8a2] mb-1">
                  Estimated Timeline
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#fbf8f5] font-mono-tabular">
                  {currentEstimate.estimatedWeeks}
                </span>
                <span className="block text-[11px] text-[#b3a8a2] mt-1">
                  Includes full design, code, QA & SEO launch
                </span>
              </div>
            </div>

            {/* Included Modules Checklist */}
            <div className="space-y-2">
              <span className="block text-[11px] uppercase font-mono-tabular text-[#b3a8a2]">
                Modules Included In This Scope:
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {currentEstimate.includedModules.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#fbf8f5]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleLaunchQuote}
              className="btn-primary-orange w-full py-3.5 text-xs rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>LOCK IN THIS ESTIMATE & DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[11px] text-[#b3a8a2]">
              No obligation · Receive an architectural breakdown & custom demo link within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
