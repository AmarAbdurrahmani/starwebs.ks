export interface AgencyService {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  };
  technologies: string[];
  gradientAccent: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  client: string;
  category: 'E-Commerce' | 'Product Showcase' | 'Tech & Innovation' | 'Web App' | 'Corporate' | string;
  year: string;
  imageUrl?: string;
  description: string;
  keyOutcomes: {
    metric: string;
    label: string;
  }[];
  techStack: string[];
  desktopMockup: {
    browserUrl: string;
    heading: string;
    subheading: string;
    stats: { label: string; value: string }[];
    uiTheme: string;
    features: string[];
  };
  mobileMockup: {
    heading: string;
    quickStats: { label: string; value: string }[];
    actionLabel: string;
    screenHighlight: string;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface QuoteConfig {
  projectType: 'custom-web' | 'ecommerce' | 'mobile-redesign' | 'enterprise-portal';
  pageCountTier: '1-5' | '6-12' | '13-25' | 'custom';
  features: string[];
  designLevel: 'signature' | 'bespoke-luxury' | 'flagship-3d';
  timelineSpeed: 'standard' | 'expedited';
}

export interface QuoteEstimate {
  estimatedWeeks: string;
  investmentRange: string;
  monthlySavings: string;
  guaranteedSpeedScore: number;
  includedModules: string[];
}

export interface ConsultationRequest {
  clientName: string;
  email: string;
  companyName: string;
  projectType: string;
  budgetTier: string;
  timeline: string;
  message: string;
}
