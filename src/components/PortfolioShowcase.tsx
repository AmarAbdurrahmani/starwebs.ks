import React, { useState, useEffect } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { PortfolioProject } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Smartphone, 
  ArrowUpRight, 
  Play, 
  CheckCircle2, 
  Quote, 
  Sparkles, 
  Layers, 
  Zap,
  TrendingUp,
  ExternalLink,
  ZoomIn,
  X,
  Maximize2
} from 'lucide-react';

interface PortfolioShowcaseProps {
  onOpenFreeDemoForProject?: (projectTitle: string) => void;
  onViewLiveDemo: (project: PortfolioProject) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onOpenFreeDemoForProject,
  onViewLiveDemo
}) => {
  const [portfolioViewMode, setPortfolioViewMode] = useState<'gallery' | 'simulator'>('gallery');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string>(PORTFOLIO_PROJECTS[0].id);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedZoomProject, setSelectedZoomProject] = useState<PortfolioProject | null>(null);
  const [isMagnified, setIsMagnified] = useState<boolean>(false);

  // Close high-res modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedZoomProject) {
        setSelectedZoomProject(null);
        setIsMagnified(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedZoomProject]);

  const categories = ['All', 'E-Commerce', 'Product Showcase', 'Tech & Innovation'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  const activeProject = PORTFOLIO_PROJECTS.find(p => p.id === activeProjectId) || PORTFOLIO_PROJECTS[0];

  // Animation variants for smooth scroll reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
      {/* Ambient localized glow */}
      <div 
        className="absolute top-1/3 right-1/4 w-[600px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(221, 107, 77, 0.35) 0%, transparent 70%)'
        }}
      />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
            <Sparkles className="w-3.5 h-3.5 text-[#dd6b4d]" />
            <span className="font-body uppercase tracking-[0.1em] font-bold text-[#ff9d82]">
              Portofoli i Zgjedhur · Client Showcase
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f5]">
            Rich Interactive Digital Flagships
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#b3a8a2] mt-2 max-w-xl leading-relaxed">
            Eksploroni projektet tona të ndërtuara me arkitekturë moderne, performancë maksimale dhe përvojë përdoruesi në celular dhe desktop.
          </p>
        </div>

        {/* View Mode & Filter Controls (Anti-Clutter Layout) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Main View Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg">
            <button
              onClick={() => setPortfolioViewMode('gallery')}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                portfolioViewMode === 'gallery'
                  ? 'bg-[#dd6b4d] text-white shadow-[0_0_16px_rgba(221,107,77,0.4)]'
                  : 'text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Galeria</span>
            </button>

            <button
              onClick={() => setPortfolioViewMode('simulator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                portfolioViewMode === 'simulator'
                  ? 'bg-[#dd6b4d] text-white shadow-[0_0_16px_rgba(221,107,77,0.4)]'
                  : 'text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/5'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Simulatori i Pajisjeve</span>
            </button>
          </div>

          {/* Category Tabs when in Gallery mode */}
          {portfolioViewMode === 'gallery' && (
            <div className="flex flex-wrap items-center gap-1 p-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/15 text-[#fbf8f5]'
                        : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Portfolio Content Switcher */}
      <AnimatePresence mode="wait">
        {portfolioViewMode === 'gallery' ? (
          <>
            {/* Rich Bento Grid Layout */}
            <motion.div
              key="portfolio-gallery-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -16 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 mb-10"
            >
        {/* Project 1: A&A Streetwear Store (Featured Marquee Bento Card - col-span-8 or col-span-7) */}
        {filteredProjects.find(p => p.id === 'aa-streetwear') && (() => {
          const project = filteredProjects.find(p => p.id === 'aa-streetwear')!;
          const isSelected = activeProject.id === project.id;
          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onClick={() => setActiveProjectId(project.id)}
              className={`lg:col-span-7 group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-900/60 backdrop-blur-md border border-[#dd6b4d] shadow-[0_0_36px_rgba(221,107,77,0.28)] ring-1 ring-[#dd6b4d]/40'
                  : 'bg-neutral-900/40 backdrop-blur-md border border-white/10 hover:border-[#dd6b4d]/50 hover:bg-neutral-900/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)]'
              }`}
            >
              {/* Image Container with Zoom-on-Hover and Ultra-HD Preview */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoomProject(project);
                  setIsMagnified(false);
                }}
                className="relative aspect-[16/9] w-full overflow-hidden bg-black/80 border-b border-white/10 cursor-zoom-in"
              >
                <img
                  src={project.imageUrl || '/assets/aistudio/image_8ecb0193.png'}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Visual Glass Overlay Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono-tabular font-bold text-[#ff9d82]">
                    {project.category} · {project.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono-tabular text-emerald-400 font-bold">
                    99/100 Mobile Speed
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedZoomProject(project);
                      setIsMagnified(false);
                    }}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#ff9d82] hover:bg-black/90 hover:border-[#dd6b4d]/50 transition-all cursor-pointer flex items-center justify-center shadow-md"
                    title="Zmadho imazhin në Ultra-HD"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewLiveDemo(project);
                    }}
                    className="p-2.5 rounded-full bg-[#dd6b4d] text-white shadow-[0_0_20px_rgba(221,107,77,0.6)] hover:bg-[#e57c61] transition-transform group-hover:scale-110 cursor-pointer flex items-center justify-center"
                    title="Hap Live Simulator"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Subtle Hover Zoom Callout */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5 text-[#ff9d82]" />
                    <span>Kliko për Ultra-HD</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#b3a8a2] font-mono-tabular mb-2">
                    <span className="text-[#dd6b4d] font-bold">{project.client}</span>
                    <span>Optimized Mobile-First</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5] mb-2 group-hover:text-[#ff9d82] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#b3a8a2] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Quantitative Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0b0b0b]/80 border border-white/[0.06] font-mono-tabular text-center mb-6">
                    {project.keyOutcomes.map((ko, idx) => (
                      <div key={idx}>
                        <span className="block text-[10px] uppercase text-[#b3a8a2] truncate">{ko.label}</span>
                        <span className="text-sm sm:text-base font-extrabold text-[#fbf8f5]">{ko.metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Action Links */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-[#b3a8a2]">
                    {project.techStack.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewLiveDemo(project);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#ff9d82] hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    <span>View Live Demo</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Project 2: Elevate Luxury Audio (col-span-5) */}
        {filteredProjects.find(p => p.id === 'elevate-audio') && (() => {
          const project = filteredProjects.find(p => p.id === 'elevate-audio')!;
          const isSelected = activeProject.id === project.id;
          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onClick={() => setActiveProjectId(project.id)}
              className={`lg:col-span-5 group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-900/60 backdrop-blur-md border border-[#dd6b4d] shadow-[0_0_36px_rgba(221,107,77,0.28)] ring-1 ring-[#dd6b4d]/40'
                  : 'bg-neutral-900/40 backdrop-blur-md border border-white/10 hover:border-[#dd6b4d]/50 hover:bg-neutral-900/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)]'
              }`}
            >
              {/* Image Container with Zoom and Ultra-HD Preview */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoomProject(project);
                  setIsMagnified(false);
                }}
                className="relative aspect-[16/9] w-full overflow-hidden bg-black/80 border-b border-white/10 cursor-zoom-in"
              >
                <img
                  src={project.imageUrl || '/assets/aistudio/Gemini_Generated_Image_jpv2qcjpv2qcjpv2_ef0a29e4.jpg'}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono-tabular font-bold text-[#ff9d82]">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#dd6b4d]/25 border border-[#dd6b4d]/40 text-[10px] font-mono-tabular text-[#ff9d82] font-bold">
                    Ultra-HD
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedZoomProject(project);
                      setIsMagnified(false);
                    }}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#ff9d82] hover:bg-black/90 hover:border-[#dd6b4d]/50 transition-all cursor-pointer flex items-center justify-center shadow-md"
                    title="Zmadho imazhin në Ultra-HD"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewLiveDemo(project);
                    }}
                    className="p-2.5 rounded-full bg-[#dd6b4d] text-white shadow-[0_0_20px_rgba(221,107,77,0.6)] hover:bg-[#e57c61] transition-transform group-hover:scale-110 cursor-pointer flex items-center justify-center"
                    title="Hap Live Simulator"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Subtle Hover Zoom Callout */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5 text-[#ff9d82]" />
                    <span>Kliko për Ultra-HD</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#b3a8a2] font-mono-tabular mb-2">
                    <span className="text-[#dd6b4d] font-bold">{project.client}</span>
                    <span>Acoustic Showcase</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#fbf8f5] mb-2 group-hover:text-[#ff9d82] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs text-[#b3a8a2] leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#0b0b0b]/80 border border-white/[0.06] font-mono-tabular text-center mb-5">
                    {project.keyOutcomes.map((ko, idx) => (
                      <div key={idx}>
                        <span className="block text-[9px] uppercase text-[#b3a8a2] truncate">{ko.label}</span>
                        <span className="text-xs sm:text-sm font-bold text-[#fbf8f5]">{ko.metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-[#b3a8a2] font-mono-tabular">React 19 · WebAudio</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewLiveDemo(project);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#ff9d82] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>View Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Project 3: VisionWarp VR Experience (col-span-12) */}
        {filteredProjects.find(p => p.id === 'visionwarp-vr') && (() => {
          const project = filteredProjects.find(p => p.id === 'visionwarp-vr')!;
          const isSelected = activeProject.id === project.id;
          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onClick={() => setActiveProjectId(project.id)}
              className={`lg:col-span-12 group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-neutral-900/60 backdrop-blur-md border border-[#dd6b4d] shadow-[0_0_36px_rgba(221,107,77,0.28)] ring-1 ring-[#dd6b4d]/40'
                  : 'bg-neutral-900/40 backdrop-blur-md border border-white/10 hover:border-[#dd6b4d]/50 hover:bg-neutral-900/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Image Section */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedZoomProject(project);
                    setIsMagnified(false);
                  }}
                  className="lg:col-span-6 relative aspect-[16/9] lg:h-[350px] w-full overflow-hidden bg-black/90 border-b lg:border-b-0 lg:border-r border-white/10 cursor-zoom-in"
                >
                  <img
                    src={project.imageUrl || '/assets/aistudio/Gemini_Generated_Image_jpv2qcjpv2qcjpv2__1__b1afee03.jpg'}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono-tabular font-bold text-[#ff9d82]">
                      {project.category} · 3D Spatial
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono-tabular text-cyan-400 font-bold">
                      Ultra-HD
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedZoomProject(project);
                        setIsMagnified(false);
                      }}
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#ff9d82] hover:bg-black/90 hover:border-[#dd6b4d]/50 transition-all cursor-pointer flex items-center justify-center shadow-md"
                      title="Zmadho imazhin në Ultra-HD"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtle Hover Zoom Callout */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5 text-[#ff9d82]" />
                      <span>Kliko për Ultra-HD</span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#b3a8a2] font-mono-tabular mb-2">
                      <span className="text-[#dd6b4d] font-bold">{project.client}</span>
                      <span>120 FPS WebGL Engine</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5] mb-2 group-hover:text-[#ff9d82] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#b3a8a2] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#0b0b0b]/80 border border-white/[0.06] font-mono-tabular text-center mb-6">
                      {project.keyOutcomes.map((ko, idx) => (
                        <div key={idx}>
                          <span className="block text-[10px] uppercase text-[#b3a8a2] truncate">{ko.label}</span>
                          <span className="text-sm sm:text-base font-extrabold text-[#fbf8f5]">{ko.metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2 text-xs text-[#b3a8a2]">
                      <span className="flex items-center gap-1.5 text-[#fbf8f5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d]" />
                        <span>Interactive 3D Exploded Model</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[#fbf8f5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d]" />
                        <span>Sub-4ms Motion-to-Photon</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewLiveDemo(project);
                      }}
                      className="btn-primary-orange btn-glow-hover px-5 py-2.5 text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Shiko Live Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </motion.div>

          {/* Bottom clean prompt to launch device simulator (Zero-clutter progressive disclosure) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-[#dd6b4d] shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm sm:text-base font-bold text-[#fbf8f5]">
                  Dëshironi të testoni responsivitetin në kohë reale?
                </h4>
                <p className="text-xs text-[#b3a8a2] leading-relaxed">
                  Eksploroni pamjet interaktive Desktop dhe Mobile me shfletues të simuluar dhe matje të Core Web Vitals.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPortfolioViewMode('simulator')}
              className="btn-primary-orange btn-glow-hover px-5 py-2.5 rounded-xl text-xs font-bold text-white whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <span>HAP SIMULATORIN</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        /* Confirmed Interactive Device Viewport Simulation Station (Desktop vs Mobile) */
        <motion.div
          key="portfolio-simulator-station"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl bg-neutral-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-10 relative shadow-2xl overflow-hidden"
        >
          {/* Ambient Top Light Beam */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#dd6b4d]/60 to-transparent" />

          {/* Switcher & Project Quick Select Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#dd6b4d] font-bold">
                Live Viewport Simulation Engine
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5]">
              {activeProject.title}
            </h3>
            <p className="font-body text-xs text-[#b3a8a2] mt-1">
              Testoni responsivitetin në kohë reale: kaloni mes pamjes Desktop dhe Celular me një klikim.
            </p>
          </div>

          {/* Quick Project Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-[#0b0b0b] rounded-xl border border-white/[0.08]">
              {PORTFOLIO_PROJECTS.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectId(p.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeProject.id === p.id
                      ? 'bg-[#dd6b4d] text-white shadow-sm'
                      : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                  }`}
                >
                  {p.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Device Mode Switcher (Desktop vs Mobile) */}
            <div className="flex items-center gap-1 p-1 bg-[#0b0b0b] rounded-xl border border-white/[0.1]">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  deviceMode === 'mobile'
                    ? 'bg-[#dd6b4d] text-white shadow-md'
                    : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Live Demo Trigger */}
            <button
              onClick={() => onViewLiveDemo(activeProject)}
              className="btn-primary-orange btn-glow-hover px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Shiko Sandbox</span>
            </button>
          </div>
        </div>

        {/* Viewport Render Frame */}
        <AnimatePresence mode="wait">
          {deviceMode === 'desktop' ? (
            /* Desktop Mockup */
            <motion.div
              key="desktop-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0b0b0b] shadow-2xl"
            >
              {/* Chrome Top Bar */}
              <div className="px-4 py-3 bg-[#171211] border-b border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex-1 max-w-md mx-auto px-4 py-1.5 rounded-lg bg-[#0b0b0b] border border-white/[0.06] text-xs font-mono-tabular text-[#b3a8a2] truncate text-center">
                  {activeProject.desktopMockup.browserUrl}
                </div>
                <div className="text-[11px] font-mono-tabular text-emerald-400 font-bold hidden sm:block">
                  SSL Encrypted · 100 Vitals
                </div>
              </div>

              {/* Inside Screen Content */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#181110] via-[#120d0c] to-[#0b0b0b] min-h-[340px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#b3a8a2] mb-4">
                    <span className="px-2.5 py-1 rounded bg-[#dd6b4d]/20 text-[#ff9d82] font-semibold border border-[#dd6b4d]/30">
                      {activeProject.desktopMockup.uiTheme}
                    </span>
                    <span className="font-mono-tabular text-emerald-400 font-bold">Sub-400ms Hydration</span>
                  </div>

                  <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5] mb-2 leading-tight">
                    {activeProject.desktopMockup.heading}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#b3a8a2] mb-6 max-w-2xl leading-relaxed">
                    {activeProject.desktopMockup.subheading}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6 font-mono-tabular">
                    {activeProject.desktopMockup.stats.map((st, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-[#1c1513] border border-white/[0.08]">
                        <span className="block text-[10px] text-[#b3a8a2] uppercase">{st.label}</span>
                        <span className="text-sm sm:text-base font-bold text-[#fbf8f5]">{st.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-2 text-[#b3a8a2]">
                    {activeProject.desktopMockup.features.map((feat, fIdx) => (
                      <span key={fIdx} className="flex items-center gap-1.5 text-[#fbf8f5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dd6b4d]" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onViewLiveDemo(activeProject)}
                    className="text-xs font-mono-tabular text-[#ff9d82] hover:text-white font-bold underline underline-offset-4 cursor-pointer"
                  >
                    Open Live Interactive Simulator →
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Mobile Smartphone Mockup */
            <motion.div
              key="mobile-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="max-w-[340px] mx-auto rounded-[40px] overflow-hidden border-[6px] border-[#251e1c] bg-[#0b0b0b] shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              {/* Dynamic Island Header */}
              <div className="pt-3 pb-2 bg-[#171211] flex justify-center">
                <div className="w-24 h-4 rounded-full bg-black flex items-center justify-end px-2">
                  <span className="w-2 h-2 rounded-full bg-[#251e1c]" />
                </div>
              </div>

              {/* Phone Content */}
              <div className="p-5 bg-gradient-to-b from-[#181110] to-[#0b0b0b] min-h-[380px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#b3a8a2] mb-3 font-mono-tabular">
                    <span className="font-bold text-[#fbf8f5]">STARWEBS APP</span>
                    <span className="text-emerald-400 font-bold">5G · 60fps</span>
                  </div>

                  <h5 className="font-display text-lg font-bold text-[#fbf8f5] mb-2 leading-snug">
                    {activeProject.mobileMockup.heading}
                  </h5>

                  <div className="p-3.5 rounded-xl bg-[#1c1513] border border-[#dd6b4d]/30 mb-4">
                    <span className="block text-[10px] uppercase font-mono-tabular text-[#ff9d82] mb-1 font-bold">
                      Thumb Ergonomics Highlight
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
                  className="btn-primary-orange btn-glow-hover w-full py-3 text-xs rounded-xl uppercase tracking-wider font-bold cursor-pointer shadow-lg"
                >
                  {activeProject.mobileMockup.actionLabel}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Client Testimonial Endorsement */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-start gap-3">
          <Quote className="w-5 h-5 text-[#dd6b4d] shrink-0 mt-1 opacity-80" />
          <div>
            <p className="font-body text-xs sm:text-sm italic text-[#b3a8a2] leading-relaxed mb-2">
              "{activeProject.testimonial.quote}"
            </p>
            <div className="flex items-center gap-2">
              <span className="font-display text-xs font-bold text-[#fbf8f5]">
                {activeProject.testimonial.author}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-[11px] text-[#ff9d82] font-medium">
                {activeProject.testimonial.role}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

      {/* Interactive Ultra-HD Image Inspector Modal */}
      <AnimatePresence>
        {selectedZoomProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 print:hidden"
            onClick={() => {
              setSelectedZoomProject(null);
              setIsMagnified(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#140e0d] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
            >
              {/* Header Bar */}
              <div className="p-4 sm:p-5 bg-[#1b1311] border-b border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#251815] border border-[#dd6b4d]/40 flex items-center justify-center text-[#dd6b4d] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-base sm:text-lg font-bold text-[#fbf8f5]">
                        {selectedZoomProject.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono-tabular text-emerald-400 font-bold uppercase">
                        Ultra-HD 4K
                      </span>
                    </div>
                    <p className="text-xs text-[#b3a8a2] font-mono-tabular">
                      {selectedZoomProject.client} · {selectedZoomProject.category} ({selectedZoomProject.year})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMagnified(!isMagnified)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                    title={isMagnified ? "Përshtat në dritare" : "Zmadho 100%"}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isMagnified ? "Përshtat" : "Zmadho"}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedZoomProject(null);
                      setIsMagnified(false);
                    }}
                    className="p-2 rounded-xl bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer"
                    title="Mbyll inspektimin"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Display Surface */}
              <div className={`flex-1 p-4 sm:p-6 bg-[#0b0b0b] flex items-center justify-center overflow-auto ${isMagnified ? 'cursor-grab' : 'cursor-zoom-in'}`}>
                <div 
                  onClick={() => setIsMagnified(!isMagnified)}
                  className={`transition-all duration-300 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative ${
                    isMagnified 
                      ? 'w-[140%] max-w-none transform scale-110 sm:scale-125' 
                      : 'w-full max-h-[62vh] flex items-center justify-center'
                  }`}
                >
                  <img
                    src={selectedZoomProject.imageUrl}
                    alt={selectedZoomProject.title}
                    className="w-full h-auto max-h-[62vh] object-contain rounded-xl"
                  />
                </div>
              </div>

              {/* Footer Bar with Project Actions */}
              <div className="p-4 bg-[#171110] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-[#b3a8a2] max-w-xl truncate">
                  {selectedZoomProject.tagline}
                </p>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      const proj = selectedZoomProject;
                      setSelectedZoomProject(null);
                      setIsMagnified(false);
                      onViewLiveDemo(proj);
                    }}
                    className="btn-primary-orange btn-glow-hover px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Hap Live Simulator</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
