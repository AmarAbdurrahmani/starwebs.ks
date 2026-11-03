import { AgencyService, PortfolioProject, QuoteConfig, QuoteEstimate } from '../types';

export const AGENCY_SERVICES: AgencyService[] = [
  {
    id: 'web-development',
    code: 'SRV-01-DEV',
    title: 'Custom Web Development',
    subtitle: 'Ultra-fast, modular web architecture & bespoke apps',
    description: 'We architect and engineer clean, highly maintainable web applications using modern React, Next.js, and TypeScript stacks. Zero template bloat, sub-second load times, and rock-solid scalability.',
    icon: 'Code2',
    deliverables: [
      'Bespoke frontend engineering & reactive state',
      'Scalable API integration & micro-services',
      'Clean TypeScript codebase with automated CI/CD',
      'Server-side rendering (SSR) & edge caching'
    ],
    metrics: {
      label: 'Performance Audit',
      value: '100 / 100'
    },
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'],
    gradientAccent: 'from-[#dd6b4d] to-[#ff9d82]'
  },
  {
    id: 'ecommerce-solutions',
    code: 'SRV-02-ECOM',
    title: 'E-Commerce Solutions',
    subtitle: 'High-conversion headless stores & checkout engines',
    description: 'Engineered for seamless transactions and maximum revenue per visit. Custom storefronts with lightning-fast product filtering, zero-friction 1-click checkouts, and international multi-currency infrastructure.',
    icon: 'ShoppingBag',
    deliverables: [
      'Custom headless Shopify / Stripe architectures',
      'Instant search, multi-attribute filtering & cart',
      'Automated inventory & ERP synchronizations',
      'Optimized conversion funnels with A/B testing setup'
    ],
    metrics: {
      label: 'Avg. Checkout Boost',
      value: '+38.4%'
    },
    technologies: ['Shopify Plus', 'Stripe', 'GraphQL', 'Next.js Commerce'],
    gradientAccent: 'from-[#dd6b4d] to-[#c86d51]'
  },
  {
    id: 'mobile-optimization',
    code: 'SRV-03-MOB',
    title: 'Mobile Optimization',
    subtitle: 'Native-feel touch UX & responsive precision',
    description: 'Every interface is engineered thumb-first. We calibrate touch targets, responsive fluid type scaling, offline service workers, and instantaneous layout shifts for flawless experiences across all smartphones and tablets.',
    icon: 'Smartphone',
    deliverables: [
      'Zero Cumulative Layout Shift (CLS < 0.01)',
      'Thumb-zone ergonomic navigation & touch gestures',
      'Progressive Web App (PWA) with offline caching',
      'Adaptive image compression & AVIF/WebP pipelines'
    ],
    metrics: {
      label: 'Mobile Core Vitals',
      value: '0.00 CLS'
    },
    technologies: ['Mobile PWA', 'Fluid Grids', 'Touch APIs', 'Edge CDN'],
    gradientAccent: 'from-[#c86d51] to-[#dd6b4d]'
  },
  {
    id: 'uiux-design',
    code: 'SRV-04-DSGN',
    title: 'Custom UI/UX Design',
    subtitle: 'Atmospheric obsidian luxury & conversion psychology',
    description: 'Distinctive, non-generic design systems crafted to position your brand far above competitors. We establish bespoke design tokens, fluid motion choreography, and high-readability typographic hierarchies.',
    icon: 'Layout',
    deliverables: [
      'Complete luxury dark/light mode design systems',
      'Interactive Figma prototypes & clickable user journeys',
      'Design token libraries tailored for engineers',
      'User journey mapping & friction point elimination'
    ],
    metrics: {
      label: 'Engagement Rate',
      value: '+62% Dwell'
    },
    technologies: ['Figma', 'Design Systems', 'Micro-Interactions', 'Prototyping'],
    gradientAccent: 'from-[#ff9d82] to-[#dd6b4d]'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'aa-streetwear',
    title: 'A&A Streetwear Store',
    tagline: 'Dark Minimalist Streetwear E-Commerce & Rapid Checkout',
    client: 'A&A Street Wear Atelier',
    category: 'E-Commerce',
    year: '2025',
    imageUrl: '/assets/aistudio/image_8ecb0193.png',
    description: 'Dyqan modë dark minimalist me optimizim për celular, sub-second product filtering dhe checkout pa fërkime. Eksperiencë luksoze e blerjeve me estetikë obsidian.',
    keyOutcomes: [
      { metric: '+48.6%', label: 'Mobile Conversion' },
      { metric: '0.42s', label: 'Filter Speed' },
      { metric: '99/100', label: 'Core Web Vitals' }
    ],
    techStack: ['Next.js 15', 'Tailwind CSS', 'Shopify Storefront API', 'Stripe Elements', 'Framer Motion'],
    desktopMockup: {
      browserUrl: 'https://aa-streetwear.store/shop/hoodies',
      heading: 'High Quality Cool Hoodies & Street Fashion',
      subheading: 'Curated drop collection featuring heavyweight french terry and oversized streetwear silhouettes',
      stats: [
        { label: 'Catalog Size', value: '140+ Items' },
        { label: 'Cart Drop-off', value: '-34%' },
        { label: 'Dispatch', value: 'Global Express' }
      ],
      uiTheme: 'Dark Obsidian Minimalist',
      features: ['1-Click Apple/Google Pay Checkout', 'Instant Size & Inventory Matrix', 'High-Res Fabric Detail Zoom']
    },
    mobileMockup: {
      heading: 'A&A Mobile Bag & Fast Checkout',
      quickStats: [
        { label: 'Active Drop', value: 'Live' },
        { label: 'Cart Status', value: 'Saved' }
      ],
      actionLabel: 'Complete Order with Apple Pay',
      screenHighlight: 'Thumb-zone rapid sizing selector with zero layout shift'
    },
    testimonial: {
      quote: 'starwebs.ks krijoi dyqanin tonë online me një estetikë të pakrahasueshme. Shpejtësia në celular rriti shitjet menjëherë pas lansimit.',
      author: 'Ardit Krasniqi',
      role: 'Creative Director & Co-Founder, A&A Streetwear'
    }
  },
  {
    id: 'elevate-audio',
    title: 'Elevate Luxury Audio',
    tagline: 'High-Contrast Audiophile & Premium Acoustics Showcase',
    client: 'Eave Acoustic Labs',
    category: 'Product Showcase',
    year: '2025',
    imageUrl: '/assets/aistudio/Gemini_Generated_Image_jpv2qcjpv2qcjpv2_ef0a29e4.jpg',
    description: 'Faqe prezantuese luksoze për dëgjuese & pajisje premium audio me kontrast të lartë UI/UX, pamje editoriale dhe arkitekturë akustike interaktive.',
    keyOutcomes: [
      { metric: '+74%', label: 'Avg Dwell Time' },
      { metric: '0.52s', label: 'First Contentful Paint' },
      { metric: '2.4x', label: 'VIP Inquiries' }
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'WebAudio API'],
    desktopMockup: {
      browserUrl: 'https://eave-audio.luxury/collections/m1-monitors',
      heading: 'Elevate Your Audio Indulgence',
      subheading: 'Immerse yourself in precision planar magnetic sound, handcrafted magnesium driver housings and bespoke leather craftsmanship',
      stats: [
        { label: 'Frequency Resp.', value: '5Hz - 50kHz' },
        { label: 'Distortion', value: '<0.05% THD' },
        { label: 'Finish', value: 'Matte Obsidian' }
      ],
      uiTheme: 'High-Contrast Editorial Luxury',
      features: ['Interactive Acoustic Frequency Graph', 'Bespoke Consultation Booking', 'Spatial Audio Preview Mode']
    },
    mobileMockup: {
      heading: 'Eave Mobile Listening Suite',
      quickStats: [
        { label: 'Acoustics', value: 'Reference' },
        { label: 'Driver', value: 'Planar 50mm' }
      ],
      actionLabel: 'Reserve VIP Studio Audition',
      screenHighlight: 'Fluid editorial typography with high contrast mobile legibility'
    },
    testimonial: {
      quote: 'Dizajni i starwebs.ks përcjell saktësisht cilësinë e produktit tonë. Çdo vizitor përjeton menjëherë ndjesinë e një marke të nivelit botëror.',
      author: 'Valon Berisha',
      role: 'Head of Product Engineering, Eave Acoustics'
    }
  },
  {
    id: 'visionwarp-vr',
    title: 'VisionWarp VR Experience',
    tagline: 'Spatial Computing & Virtual Reality Hardware Portal',
    client: 'VisionWarp Systems',
    category: 'Tech & Innovation',
    year: '2025',
    imageUrl: '/assets/aistudio/Gemini_Generated_Image_jpv2qcjpv2qcjpv2__1__b1afee03.jpg',
    description: 'Portal teknologjik me renderime 3D për pajisje të realitetit virtual, telemetri të performancës në kohë reale dhe modul për rezervime hardware.',
    keyOutcomes: [
      { metric: '120 FPS', label: 'Interactive 3D Render' },
      { metric: '<380ms', label: 'Edge Page Hydration' },
      { metric: '18.5k+', label: 'Global Pre-Orders' }
    ],
    techStack: ['Next.js', 'Three.js / WebGL', 'Tailwind CSS', 'TypeScript', 'Edge Workers'],
    desktopMockup: {
      browserUrl: 'https://visionwarp.io/headsets/quantum-pro',
      heading: 'Experience the Future of Virtual Reality',
      subheading: 'Micro-OLED 4K dual optical displays with dynamic foveated rendering and zero sub-millimeter motion latency',
      stats: [
        { label: 'Resolution', value: '4K Per Eye' },
        { label: 'Refresh Rate', value: '120Hz Low-Persistence' },
        { label: 'Tracking', value: 'Inside-Out 6DoF' }
      ],
      uiTheme: 'Spatial Computing Obsidian',
      features: ['Real-time 3D Hardware Exploded View', 'Interactive Optical Clarity Demo', 'Enterprise SDK Documentation']
    },
    mobileMockup: {
      heading: 'VisionWarp Mobile Experience',
      quickStats: [
        { label: 'Latency', value: '4ms MTP' },
        { label: 'FOV', value: '115° Ultrawide' }
      ],
      actionLabel: 'Pre-Order VisionWarp Quantum',
      screenHighlight: 'Ultra-smooth 60fps mobile hardware carousel with tactile haptics'
    },
    testimonial: {
      quote: 'Inxhinieria e starwebs.ks tejkaloi pritjet tona. Portali arriti të mbajë mbi 100k vizitorë njëkohësisht gjatë njoftimit zyrtar pa asnjë ngadalësim.',
      author: 'Dr. Kastriot Rama',
      role: 'Chief Scientist, VisionWarp'
    }
  },
  {
    id: 'aura-capital',
    title: 'Aura Capital Portal',
    tagline: 'Private Wealth & Asset Orchestration Platform',
    client: 'Aura Wealth Partners (Zurich)',
    category: 'Web App',
    year: '2025',
    description: 'A bespoke institutional financial platform engineered for high-net-worth portfolio managers. Combines real-time algorithmic asset telemetry with an ultra-clean dark obsidian interface.',
    keyOutcomes: [
      { metric: '0.52s', label: 'Average LCP Time' },
      { metric: '+185%', label: 'Daily Active Users' },
      { metric: '$4.2B', label: 'Capital Monitored' }
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Real-time WebSocket'],
    desktopMockup: {
      browserUrl: 'https://aura.capital/dashboard/portfolio',
      heading: 'Institutional Portfolio & Liquidity Monitor',
      subheading: 'Real-time multi-currency yield curve with sub-millisecond execution',
      stats: [
        { label: 'Total AUM', value: '$4,280,000,000' },
        { label: 'Alpha Yield', value: '+14.8%' },
        { label: 'Active Vaults', value: '42' }
      ],
      uiTheme: 'Obsidian & Copper FinTech',
      features: ['Sub-second asset valuation', 'Biometric SSO compliance', 'Custom report exporter']
    },
    mobileMockup: {
      heading: 'Aura Mobile Portal',
      quickStats: [
        { label: 'Portfolio Val', value: '$4.28B' },
        { label: '24h Yield', value: '+1.42%' }
      ],
      actionLabel: 'Execute Rebalance',
      screenHighlight: 'Instant thumb biometric trade confirmation'
    },
    testimonial: {
      quote: 'starwebs.ks engineered our portal in 6 weeks with unmatched aesthetic precision. Our clients immediately praised the speed and fluidity.',
      author: 'Marcus von Berg',
      role: 'Chief Technology Officer, Aura Capital'
    }
  },
  {
    id: 'vespera-luxury',
    title: 'Vespera Atelier',
    tagline: 'Luxury Horology & Bespoke Timepiece E-Commerce',
    client: 'Vespera Horology (Geneva)',
    category: 'E-Commerce',
    year: '2025',
    description: 'A headless luxury shopping destination designed for limited-edition mechanical timepieces. Incorporates high-resolution 360-degree interactive product zooms and instant multi-currency checkout.',
    keyOutcomes: [
      { metric: '+44.2%', label: 'Checkout Conversion' },
      { metric: '99/100', label: 'Mobile Speed Score' },
      { metric: '1.2s', label: 'Full Page Hydration' }
    ],
    techStack: ['Shopify Storefront API', 'React 19', 'Tailwind', 'Stripe Elements'],
    desktopMockup: {
      browserUrl: 'https://vespera-atelier.com/timepieces/chronograph-01',
      heading: 'Limited Chronograph No. 01 — Obsidian Edition',
      subheading: 'Grade 5 Titanium case with anti-reflective sapphire crystal face',
      stats: [
        { label: 'Reserve Edition', value: '50 Pieces' },
        { label: 'Price Index', value: '€18,500' },
        { label: 'Availability', value: 'Immediate Vault Dispatch' }
      ],
      uiTheme: 'E-Commerce Dark Luxury',
      features: ['360° Sapphire crystal viewer', '1-Click Apple/Google Pay', 'Global insured courier integration']
    },
    mobileMockup: {
      heading: 'Vespera Mobile Boutique',
      quickStats: [
        { label: 'Piece 12/50', value: 'Reserved' },
        { label: 'Price', value: '€18,500' }
      ],
      actionLabel: 'Secure Timepiece with Apple Pay',
      screenHighlight: 'Seamless bottom-sheet checkout with zero redirects'
    },
    testimonial: {
      quote: 'Our bounce rate dropped by 52% on day one. starwebs.ks made our e-commerce store feel like walking into a private high-end boutique.',
      author: 'Elena Rossi',
      role: 'Head of Global Retail, Vespera Horology'
    }
  },
  {
    id: 'nexus-cloud',
    title: 'Nexus Infrastructure Engine',
    tagline: 'High-Throughput Distributed API Platform',
    client: 'Nexus Systems Ltd (London)',
    category: 'Web App',
    year: '2024',
    description: 'Developer portal and control console orchestrating multi-region serverless cloud nodes. Designed with a tabular-first layout for instant telemetry reading and cluster scaling.',
    keyOutcomes: [
      { metric: '<400ms', label: 'Global Edge Latency' },
      { metric: '99.99%', label: 'Uptime Reliability' },
      { metric: '10M+', label: 'Daily API Calls' }
    ],
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL API'],
    desktopMockup: {
      browserUrl: 'https://console.nexus-cloud.io/clusters/eu-west-1',
      heading: 'Cluster Telemetry: EU-West-01 (Frankfurt)',
      subheading: 'Active edge instances routing 12,450 req/sec across 14 zones',
      stats: [
        { label: 'Throughput', value: '12.4k req/s' },
        { label: 'P99 Latency', value: '14.2 ms' },
        { label: 'Cluster Health', value: 'Optimal 100%' }
      ],
      uiTheme: 'Developer Console Obsidian',
      features: ['Live latency graphs', 'Instant token provisioning', 'Zero-downtime canary rollback']
    },
    mobileMockup: {
      heading: 'Nexus Incident & Monitor App',
      quickStats: [
        { label: 'Active Nodes', value: '1,420' },
        { label: 'Errors', value: '0.000%' }
      ],
      actionLabel: 'Scale Up Capacity',
      screenHighlight: 'Live telemetry cards optimized for one-hand emergency monitoring'
    },
    testimonial: {
      quote: 'The level of engineering rigor starwebs.ks brought to our developer dashboard was extraordinary. Fast, clean, and completely reliable.',
      author: 'David Chen',
      role: 'VP of Engineering, Nexus Cloud'
    }
  },
  {
    id: 'solstice-spatial',
    title: 'Solstice Architecture & Villas',
    tagline: 'Architectural Real Estate Showcase & Booking',
    client: 'Solstice Group (Vienna & Milan)',
    category: 'Corporate',
    year: '2025',
    description: 'An architectural showcase and private client reservation portal for luxury residences. Featuring fluid photo galleries, floor-plan overlays, and client reservation management.',
    keyOutcomes: [
      { metric: '+210%', label: 'Private Inbound Inquiries' },
      { metric: '100%', label: 'Mobile Responsive Audit' },
      { metric: '3.8 min', label: 'Average Session Time' }
    ],
    techStack: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Headless CMS'],
    desktopMockup: {
      browserUrl: 'https://solstice-residences.com/estates/villa-monolith',
      heading: 'Villa Monolith — Dolomite Alpine Retreat',
      subheading: 'Frameless glass curtain walls with sustainable geothermal heating',
      stats: [
        { label: 'Interior Area', value: '840 m²' },
        { label: 'Elevation', value: '1,650 m' },
        { label: 'Status', value: 'Private Acquisition' }
      ],
      uiTheme: 'Architectural Editorial',
      features: ['Interactive architectural floorplan', 'Private booking calendar', '3D sun-path shadow analysis']
    },
    mobileMockup: {
      heading: 'Solstice Mobile Showcase',
      quickStats: [
        { label: 'Bedrooms', value: '6 Suites' },
        { label: 'Private Spa', value: 'Included' }
      ],
      actionLabel: 'Request Private Viewing',
      screenHighlight: 'Full-bleed photography cards with smooth swipe gestures'
    },
    testimonial: {
      quote: 'The aesthetic reflects our ultra-luxury properties perfectly. Our international buyers love how fast and intuitive the viewing booking is.',
      author: 'Sophia Laurent',
      role: 'Managing Partner, Solstice Residences'
    }
  }
];

export const CALCULATOR_OPTIONS = {
  projectTypes: [
    { id: 'custom-web', label: 'Custom Web Application', baseWeeks: 4, basePrice: 3800 },
    { id: 'ecommerce', label: 'E-Commerce / Headless Store', baseWeeks: 6, basePrice: 5200 },
    { id: 'mobile-redesign', label: 'Mobile-First Website Redesign', baseWeeks: 3, basePrice: 2900 },
    { id: 'enterprise-portal', label: 'Enterprise Client Portal', baseWeeks: 8, basePrice: 7800 }
  ],
  pageCountTiers: [
    { id: '1-5', label: '1 – 5 Key Pages', multiplier: 1.0, weeksAdd: 0 },
    { id: '6-12', label: '6 – 12 Pages', multiplier: 1.35, weeksAdd: 1 },
    { id: '13-25', label: '13 – 25 Pages', multiplier: 1.7, weeksAdd: 2 },
    { id: 'custom', label: '25+ Complex Pages', multiplier: 2.2, weeksAdd: 4 }
  ],
  availableFeatures: [
    { id: 'cms', label: 'Headless CMS Integration', priceAdd: 800, weeksAdd: 1 },
    { id: 'auth', label: 'User Accounts & Auth', priceAdd: 1200, weeksAdd: 1 },
    { id: 'payments', label: 'Stripe / Multi-Currency Checkout', priceAdd: 1400, weeksAdd: 1 },
    { id: 'seo', label: 'Advanced Technical SEO & Schema', priceAdd: 600, weeksAdd: 0 },
    { id: 'animations', label: 'Custom Spatial Motion & Micro-Interactions', priceAdd: 900, weeksAdd: 1 },
    { id: 'analytics', label: 'Privacy-First Analytics & Event Tracking', priceAdd: 500, weeksAdd: 0 }
  ],
  designLevels: [
    { id: 'signature', label: 'Signature Clean Modern', multiplier: 1.0 },
    { id: 'bespoke-luxury', label: 'Bespoke Obsidian Luxury (Custom Tokens)', multiplier: 1.25 },
    { id: 'flagship-3d', label: 'Flagship 3D & Spatial Interactive', multiplier: 1.55 }
  ]
};

export function calculateQuoteEstimate(config: QuoteConfig): QuoteEstimate {
  const pType = CALCULATOR_OPTIONS.projectTypes.find(p => p.id === config.projectType) || CALCULATOR_OPTIONS.projectTypes[0];
  const pTier = CALCULATOR_OPTIONS.pageCountTiers.find(p => p.id === config.pageCountTier) || CALCULATOR_OPTIONS.pageCountTiers[0];
  const dLevel = CALCULATOR_OPTIONS.designLevels.find(d => d.id === config.designLevel) || CALCULATOR_OPTIONS.designLevels[0];

  let rawPrice = pType.basePrice * pTier.multiplier * dLevel.multiplier;
  let totalWeeks = pType.baseWeeks + pTier.weeksAdd;

  const includedModules: string[] = [pType.label];

  config.features.forEach(featId => {
    const feat = CALCULATOR_OPTIONS.availableFeatures.find(f => f.id === featId);
    if (feat) {
      rawPrice += feat.priceAdd;
      totalWeeks += feat.weeksAdd;
      includedModules.push(feat.label);
    }
  });

  if (config.timelineSpeed === 'expedited') {
    rawPrice *= 1.2;
    totalWeeks = Math.max(2, Math.round(totalWeeks * 0.7));
  }

  const minPrice = Math.round(rawPrice * 0.95);
  const maxPrice = Math.round(rawPrice * 1.15);

  return {
    estimatedWeeks: `${totalWeeks} – ${totalWeeks + 1} Weeks`,
    investmentRange: `€${minPrice.toLocaleString()} – €${maxPrice.toLocaleString()}`,
    monthlySavings: `~€${Math.round(rawPrice * 0.28).toLocaleString()} in dev speed & conversions`,
    guaranteedSpeedScore: 98,
    includedModules
  };
}
