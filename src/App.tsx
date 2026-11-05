import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { HighImpactStatsBar } from './components/HighImpactStatsBar';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { TechStackGrid } from './components/TechStackGrid';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TrustVerificationSection } from './components/TrustVerificationSection';
import { ContactSection } from './components/ContactSection';
import { FAQView } from './components/FAQView';
import { FreeDemoModal } from './components/FreeDemoModal';
import { LiveDemoModal } from './components/LiveDemoModal';
import { PersonalizedDemoPreviewModal } from './components/PersonalizedDemoPreviewModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';
import { PortfolioProject, PersonalizedDemoData } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'faq'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#faq') {
      return 'faq';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isFreeDemoOpen, setIsFreeDemoOpen] = useState<boolean>(false);
  const [passedQuoteData, setPassedQuoteData] = useState<any>(null);
  const [activeLiveDemoProject, setActiveLiveDemoProject] = useState<PortfolioProject | null>(null);
  const [personalizedDemoData, setPersonalizedDemoData] = useState<PersonalizedDemoData | null>(null);
  const [isPersonalizedDemoOpen, setIsPersonalizedDemoOpen] = useState<boolean>(false);

  // Sync hash routing on popstate / hashchange (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#faq') {
        setCurrentView('faq');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
        const targetId = hash.replace('#', '') || 'overview';
        setActiveSection(targetId);
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'faq') {
      setCurrentView('faq');
      window.location.hash = '#faq';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to landing page section
    if (currentView === 'faq') {
      setCurrentView('home');
      window.location.hash = '#' + sectionId;
      setActiveSection(sectionId);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      setActiveSection(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.location.hash = '#overview';
    setActiveSection('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleGenerateDemoFromForm = (data: PersonalizedDemoData) => {
    setIsFreeDemoOpen(false);
    setPersonalizedDemoData(data);
    setIsPersonalizedDemoOpen(true);
  };

  const handleTriggerDemoFromAI = (data: PersonalizedDemoData) => {
    setPersonalizedDemoData(data);
    setIsPersonalizedDemoOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-[#fbf8f5] selection:bg-[#dd6b4d]/40 selection:text-white relative bg-grid-pattern overflow-x-hidden">
      {/* Ambient neon radial glows (Burnt Orange & Vivid Cyan) */}
      <div className="fixed inset-0 pointer-events-none z-0 radial-glow-copper opacity-75" />
      <div className="fixed inset-0 pointer-events-none z-0 radial-glow-cyan opacity-50" />

      {/* 1. Navigation Bar with STARWEBS.KS Wordmark, WhatsApp & Instagram Links, and GET A FREE DEMO */}
      <TopBar
        activeSection={currentView === 'faq' ? 'faq' : activeSection}
        onNavigate={handleNavigate}
        onOpenFreeDemo={handleOpenFreeDemoDefault}
      />

      {/* View Switcher: Dedicated FAQ View vs Pristine Minimalist Landing Page */}
      {currentView === 'faq' ? (
        <FAQView
          onBackToHome={handleBackToHome}
          onOpenFreeDemo={handleOpenFreeDemoDefault}
          onNavigateToSection={handleNavigate}
        />
      ) : (
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
      )}

      {/* Modern Luxury Obsidian Footer with WhatsApp, Instagram & FAQ Links */}
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
        onGenerateDemo={handleGenerateDemoFromForm}
      />

      {/* Interactive Live Website Mockup Preview Modal */}
      <LiveDemoModal
        project={activeLiveDemoProject}
        isOpen={!!activeLiveDemoProject}
        onClose={() => setActiveLiveDemoProject(null)}
        onOpenDemoRequest={handleOpenFreeDemoDefault}
      />

      {/* Interactive Personalized Demo Preview Modal (Generated via Form or Voice AI) */}
      <PersonalizedDemoPreviewModal
        demoData={personalizedDemoData}
        isOpen={isPersonalizedDemoOpen}
        onClose={() => setIsPersonalizedDemoOpen(false)}
        onOpenConsultationForm={() => {
          setIsPersonalizedDemoOpen(false);
          setIsFreeDemoOpen(true);
        }}
      />

      {/* Single Unified Floating Interactive AI Assistant (Text & Voice AI) */}
      <ChatbotWidget
        onOpenDemo={handleOpenFreeDemoDefault}
        onTriggerPersonalizedDemo={handleTriggerDemoFromAI}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
