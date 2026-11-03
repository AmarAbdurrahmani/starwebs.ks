import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { HighImpactStatsBar } from './components/HighImpactStatsBar';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { TechStackGrid } from './components/TechStackGrid';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TrustVerificationSection } from './components/TrustVerificationSection';
import { ContactSection } from './components/ContactSection';
import { FreeDemoModal } from './components/FreeDemoModal';
import { LiveDemoModal } from './components/LiveDemoModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';
import { PortfolioProject } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isFreeDemoOpen, setIsFreeDemoOpen] = useState<boolean>(false);
  const [passedQuoteData, setPassedQuoteData] = useState<any>(null);
  const [activeLiveDemoProject, setActiveLiveDemoProject] = useState<PortfolioProject | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFreeDemoDefault = () => {
    setPassedQuoteData(null);
    setIsFreeDemoOpen(true);
  };

  const handleOpenFreeDemoWithQuote = (quoteData: any) => {
    setPassedQuoteData(quoteData);
    setIsFreeDemoOpen(true);
  };

  const handleOpenLiveDemo = (project: PortfolioProject) => {
    setActiveLiveDemoProject(project);
  };

  return (
    <div className="min-h-screen bg-black text-[#fbf8f5] selection:bg-[#dd6b4d]/40 selection:text-white relative bg-grid-pattern overflow-x-hidden">
      {/* Ambient neon radial glows (Burnt Orange & Vivid Cyan) */}
      <div className="fixed inset-0 pointer-events-none z-0 radial-glow-copper opacity-75" />
      <div className="fixed inset-0 pointer-events-none z-0 radial-glow-cyan opacity-50" />

      {/* 1. Navigation Bar with STARWEBS.KS Wordmark, WhatsApp & Instagram Links, and GET A FREE DEMO */}
      <TopBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenFreeDemo={handleOpenFreeDemoDefault}
      />

      <main className="relative pt-16 sm:pt-20 print:hidden">
        {/* 2. Hero Section with Prominent WhatsApp Contact (+383 48 881 191) & Speed Engine */}
        <HeroSection
          onOpenFreeDemo={handleOpenFreeDemoDefault}
          onExploreServices={() => handleNavigate('services')}
          onOpenPortfolio={() => handleNavigate('portfolio')}
        />

        {/* 3. High-Impact Agency Stats Bar (100% Mobile, Ultra-Fast, Custom UI/UX, 24/7 Support) */}
        <HighImpactStatsBar />

        {/* 4. Services Grid & Live Interactive Quote & Timeline Calculator */}
        <ServicesSection
          onOpenFreeDemoWithQuote={handleOpenFreeDemoWithQuote}
        />

        {/* 5. Portfolio & Recent Work: Interactive Desktop & Mobile Frame Switcher + Live Demo Buttons */}
        <PortfolioShowcase
          onOpenFreeDemoForProject={() => handleNavigate('contact')}
          onViewLiveDemo={handleOpenLiveDemo}
        />

        {/* 6. Interactive Tech Stack Grid (React 19, Next.js, Tailwind v4, Supabase, TypeScript, Node.js) */}
        <TechStackGrid />

        {/* 7. Quantified Case Studies & Business Conversion Proof */}
        <CaseStudiesSection
          onOpenFreeDemo={handleOpenFreeDemoDefault}
        />

        {/* 8. Official Trust & Kosovo Verification Section (ARBK & Superpuna) */}
        <TrustVerificationSection />

        {/* 9. Contact / Commission Section with Prominent WhatsApp Card (+383 48 881 191) & Instagram */}
        <ContactSection />
      </main>

      {/* Modern Luxury Obsidian Footer with WhatsApp & Instagram Links */}
      <div className="print:hidden">
        <Footer
          onNavigate={handleNavigate}
          onOpenFreeDemo={handleOpenFreeDemoDefault}
        />
      </div>

      {/* Confirmed Multi-Step Free Demo & Consultation Modal */}
      <FreeDemoModal
        isOpen={isFreeDemoOpen}
        onClose={() => setIsFreeDemoOpen(false)}
        presetQuoteData={passedQuoteData}
      />

      {/* Interactive Live Website Mockup Preview Modal */}
      <LiveDemoModal
        project={activeLiveDemoProject}
        isOpen={!!activeLiveDemoProject}
        onClose={() => setActiveLiveDemoProject(null)}
        onOpenDemoRequest={handleOpenFreeDemoDefault}
      />

      {/* Floating Interactive AI Chatbot Widget (Starwebs AI Assistant) */}
      <ChatbotWidget
        onOpenDemo={handleOpenFreeDemoDefault}
      />
    </div>
  );
}
