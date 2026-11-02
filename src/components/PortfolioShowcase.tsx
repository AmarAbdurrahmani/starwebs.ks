import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { PortfolioProject } from '../types';
import { 
  Monitor, 
  Smartphone, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2, 
  Quote, 
  ArrowUpRight,
  Sparkles,
  Layers,
  Play
} from 'lucide-react';

interface PortfolioShowcaseProps {
  onOpenFreeDemoForProject?: (projectTitle: string) => void;
  onViewLiveDemo: (project: PortfolioProject) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onOpenFreeDemoForProject,
  onViewLiveDemo
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string>(PORTFOLIO_PROJECTS[0].id);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  const categories = ['All', 'Web App', 'E-Commerce', 'Corporate'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  const activeProject = PORTFOLIO_PROJECTS.find(p => p.id === activeProjectId) || PORTFOLIO_PROJECTS[0];

  return (
    <section id="portfolio" className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
            <Layers className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="font-body uppercase tracking-[0.08em] font-bold text-[#ff9d82]">
              Selected Client Work
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf8f5]">
            Engineered for Modern Business Impact
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#171211] border border-white/[0.08] rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#dd6b4d] text-white shadow-sm'
                  : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Showcase Layout: Left Projects Selector, Right Interactive Device Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Project Selector Cards with "View Live Demo" */}
        <div className="lg:col-span-5 space-y-4">
          {filteredProjects.map((project) => {
            const isSelected = activeProject.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'card-chocolate border-[#dd6b4d] shadow-[0_0_24px_rgba(221,107,77,0.22)]'
                    : 'bg-[#171211]/50 border-white/[0.06] hover:border-white/20 hover:bg-[#171211]/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular text-[#b3a8a2] mb-2">
                  <span className="text-[#dd6b4d] font-bold">{project.category}</span>
                  <span>{project.year} · {project.client}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#fbf8f5] mb-1">
                  {project.title}
                </h3>
                <p className="font-body text-xs text-[#ff9d82] mb-2 font-medium">
                  {project.tagline}
                </p>
                <p className="font-body text-xs text-[#b3a8a2] line-clamp-2 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#0b0b0b]/80 border border-white/[0.04] text-center font-mono-tabular mb-4">
                  {project.keyOutcomes.map((ko, idx) => (
                    <div key={idx}>
                      <span className="block text-[9px] uppercase text-[#b3a8a2] truncate">{ko.label}</span>
                      <span className="text-xs font-bold text-[#fbf8f5]">{ko.metric}</span>
                    </div>
                  ))}
                </div>

                {/* View Live Demo Interactive Button */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewLiveDemo(project);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#ff9d82] hover:text-white transition-colors cursor-pointer group"
                  >
                    <Play className="w-3.5 h-3.5 text-[#dd6b4d] fill-[#dd6b4d]" />
                    <span>View Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <span className="text-[11px] text-[#b3a8a2]">
                    {isSelected ? 'Active View' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Confirmed Interactive Device Frame Switcher (Desktop 🖥️ vs Mobile 📱) */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="p-6 sm:p-8 rounded-2xl card-chocolate-elevated border border-white/[0.12] relative shadow-2xl">
            {/* Top Toolbar: Switcher Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-white/[0.08] gap-4">
              <div>
                <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#dd6b4d] font-bold block mb-0.5">
                  Live Viewport Simulation
                </span>
                <h4 className="font-display text-xl font-bold text-[#fbf8f5]">
                  {activeProject.title}
                </h4>
              </div>

              {/* The Confirmed Device Toggle (Desktop vs Mobile) + Live Demo Trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewLiveDemo(activeProject)}
                  className="px-3 py-1.5 rounded-lg bg-[#dd6b4d]/20 border border-[#dd6b4d]/40 text-[#ff9d82] hover:bg-[#dd6b4d] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>View Live Demo</span>
                </button>

                <div className="flex items-center gap-1 p-1 bg-[#0b0b0b] rounded-lg border border-white/[0.1]">
                  <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      deviceMode === 'desktop'
                        ? 'bg-[#dd6b4d] text-white shadow-md'
                        : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      deviceMode === 'mobile'
                        ? 'bg-[#dd6b4d] text-white shadow-md'
                        : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Frame View */}
            {deviceMode === 'desktop' ? (
              /* Desktop Browser Mockup Frame */
              <div className="rounded-xl overflow-hidden border border-white/[0.15] bg-[#0b0b0b] shadow-2xl animate-in fade-in duration-200">
                {/* Browser Top Bar with 3 Dots and Address Bar */}
                <div className="px-4 py-2.5 bg-[#171211] border-b border-white/[0.08] flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex-1 max-w-sm mx-auto px-3 py-1 rounded bg-[#0b0b0b] border border-white/[0.06] text-[11px] font-mono-tabular text-[#b3a8a2] truncate text-center">
                    {activeProject.desktopMockup.browserUrl}
                  </div>
                </div>

                {/* Simulated Screen Content */}
                <div className="p-6 bg-gradient-to-b from-[#140e0d] to-[#0b0b0b] min-h-[320px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#b3a8a2] mb-3">
                      <span className="px-2 py-0.5 rounded bg-[#dd6b4d]/20 text-[#ff9d82] font-semibold border border-[#dd6b4d]/30">
                        {activeProject.desktopMockup.uiTheme}
                      </span>
                      <span className="font-mono-tabular text-emerald-400 font-bold">100 Core Web Vitals</span>
                    </div>

                    <h5 className="font-display text-xl sm:text-2xl font-extrabold text-[#fbf8f5] mb-2 leading-tight">
                      {activeProject.desktopMockup.heading}
                    </h5>
                    <p className="font-body text-xs text-[#b3a8a2] mb-6 max-w-lg">
                      {activeProject.desktopMockup.subheading}
                    </p>

                    {/* Stats Trio inside mockup */}
                    <div className="grid grid-cols-3 gap-3 mb-6 font-mono-tabular">
                      {activeProject.desktopMockup.stats.map((st, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-lg bg-[#1c1513] border border-white/[0.08]">
                          <span className="block text-[10px] text-[#b3a8a2] uppercase">{st.label}</span>
                          <span className="text-sm font-bold text-[#fbf8f5]">{st.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature Badges & Action */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#b3a8a2]">
                      {activeProject.desktopMockup.features.map((feat, fIdx) => (
                        <span key={fIdx} className="flex items-center gap-1.5 text-[#fbf8f5]">
                          <CheckCircle2 className="w-3 h-3 text-[#dd6b4d]" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onViewLiveDemo(activeProject)}
                      className="text-xs font-mono-tabular text-[#ff9d82] hover:text-white font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      Open Full Interactive Sandbox →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Mobile Smartphone Mockup Frame */
              <div className="max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-[4px] border-[#251e1c] bg-[#0b0b0b] shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-in fade-in duration-200">
                {/* Mobile Camera Island */}
                <div className="pt-3 pb-2 bg-[#140e0d] flex justify-center">
                  <div className="w-20 h-4 rounded-full bg-black flex items-center justify-end px-2">
                    <span className="w-2 h-2 rounded-full bg-[#251e1c]" />
                  </div>
                </div>

                {/* Mobile Screen Body */}
                <div className="p-5 bg-gradient-to-b from-[#140e0d] to-[#0b0b0b] min-h-[360px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#b3a8a2] mb-3">
                      <span className="font-bold text-[#fbf8f5]">STARWEBS APP</span>
                      <span className="font-mono-tabular text-emerald-400 font-bold">5G · 60fps</span>
                    </div>

                    <h5 className="font-display text-lg font-bold text-[#fbf8f5] mb-2">
                      {activeProject.mobileMockup.heading}
                    </h5>

                    <div className="p-3 rounded-xl bg-[#1c1513] border border-[#dd6b4d]/30 mb-4">
                      <span className="block text-[10px] uppercase font-mono-tabular text-[#ff9d82] mb-1">
                        Thumb-Optimized Highlight
                      </span>
                      <p className="text-xs text-[#fbf8f5] leading-relaxed">
                        {activeProject.mobileMockup.screenHighlight}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 font-mono-tabular">
                      {activeProject.mobileMockup.quickStats.map((qs, qIdx) => (
                        <div key={qIdx} className="p-2.5 rounded-lg bg-[#0b0b0b] border border-white/[0.08] text-center">
                          <span className="block text-[9px] text-[#b3a8a2] uppercase">{qs.label}</span>
                          <span className="text-xs font-bold text-[#fbf8f5]">{qs.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onViewLiveDemo(activeProject)}
                    className="btn-primary-orange w-full py-2.5 text-xs rounded-lg uppercase tracking-wider font-bold cursor-pointer"
                  >
                    {activeProject.mobileMockup.actionLabel}
                  </button>
                </div>
              </div>
            )}

            {/* Testimonial Quote under device mockup */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-start gap-3">
              <Quote className="w-5 h-5 text-[#dd6b4d] shrink-0 mt-0.5 opacity-80" />
              <div>
                <p className="font-body text-xs italic text-[#b3a8a2] leading-relaxed mb-2">
                  "{activeProject.testimonial.quote}"
                </p>
                <span className="font-display text-xs font-bold text-[#fbf8f5] block">
                  {activeProject.testimonial.author}
                </span>
                <span className="text-[11px] text-[#ff9d82]">
                  {activeProject.testimonial.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
