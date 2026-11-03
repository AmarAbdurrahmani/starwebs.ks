export interface FAQItem {
  id: string;
  category: 'pricing' | 'timeline' | 'tech' | 'ecommerce' | 'legal' | 'support';
  question: string;
  answer: string;
  keyPoints?: string[];
  recommendedAction?: {
    label: string;
    type: 'whatsapp' | 'demo' | 'services';
  };
}

export interface FAQCategory {
  id: 'all' | 'pricing' | 'timeline' | 'tech' | 'ecommerce' | 'legal' | 'support';
  label: string;
  count?: number;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  { id: 'all', label: 'Të Gjitha Pyetjet' },
  { id: 'pricing', label: 'Çmimet & Pagesat' },
  { id: 'timeline', label: 'Afatet & Dorëzimi' },
  { id: 'tech', label: 'Teknologjia & Shpejtësia' },
  { id: 'ecommerce', label: 'E-Commerce & Dyqanet' },
  { id: 'legal', label: 'ARBK & Ligjshmëria' },
  { id: 'support', label: 'Mirëmbajtja & Garancia' }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'pricing-structure',
    category: 'pricing',
    question: 'Sa kushton zhvillimi i një uebfaqeje ose aplikacioni në starwebs.ks?',
    answer: 'Çmimet tona janë të personalizuara dhe të bazuara në modulet specifike të kërkuara. Për faqe prezantuese luksoze biznesi me performancë të lartë, çmimet zakonisht sillen rreth €2,500 – €4,500. Për dyqane e-commerce me pagesa të integruara ose aplikacione web të avancuara me backend dhe panel administrativ, çmimet fillojnë nga €5,000+. Çdo preventiv është fiks (fixed-price), pa kosto të fshehura.',
    keyPoints: [
      'Preventiv fiks dhe transparent para fillimit të punës',
      'Pagesë me faza (milestones): 40% paradhënie, 30% pas miratimit të dizajnit, 30% pas lansimit zyrtar',
      'Përfshin dizajn unik UI/UX, inxhinieri kodi dhe konfigurim në serverë globalë (CDN)'
    ],
    recommendedAction: {
      label: 'Llogarit Preventivin Tënd',
      type: 'services'
    }
  },
  {
    id: 'pricing-calculator',
    category: 'pricing',
    question: 'A mund të marr një preventiv të përafërt para se të kontaktoj agjencinë?',
    answer: 'Po! Në ballinën e starwebs.ks kemi integruar një Llogaritës Interaktiv të Preventivit. Aty mund të zgjidhni llojin e projektit, numrin e faqeve, veçoritë shtesë (CMS, pagesa, animacione) dhe shpejtësinë e dorëzimit për të parë menjëherë një vlerësim real financiar.',
    keyPoints: [
      'Llogaritje në kohë reale sipas specifikave tuaja',
      'Mundësi për ta dërguar preventivin e llogaritur direkt te stafi ynë'
    ],
    recommendedAction: {
      label: 'Hap Llogaritësin e Shërbimeve',
      type: 'services'
    }
  },
  {
    id: 'timeline-duration',
    category: 'timeline',
    question: 'Sa kohë zgjat zhvillimi i një projekti nga fillimi deri në lansim?',
    answer: 'Koha standarde e dorëzimit është midis 2 deri në 6 javë, në varësi të shkallës së projektit. Një faqe e strukturuar me 5-10 nën-faqe zakonisht kompletohet brenda 3 javësh, ndërsa platformat e-commerce dhe sistemet e ndërlikuara zgjasin 4-6 javë. Ne ofrojmë gjithashtu shërbimin tonë "Ekspres" për biznese që kanë nevojë për lansim të menjëhershëm.',
    keyPoints: [
      'Projekte standarde: 2 – 4 javë',
      'Platforma të avancuara & E-Commerce: 4 – 6 javë',
      'Opsion i dorëzimit të përshpejtuar (Expedited Sprint)'
    ],
    recommendedAction: {
      label: 'Kontakto për Afat të Përshpejtuar',
      type: 'whatsapp'
    }
  },
  {
    id: 'timeline-process',
    category: 'timeline',
    question: 'Cilat janë hapat e procesit të punës me starwebs.ks?',
    answer: 'Procesi ynë inxhinierik përbëhet nga 4 faza kryesore: 1) Zbulimi dhe Arkitektura (analiza e kërkesave dhe struktura), 2) Dizajni UI/UX & Prototipi (prototip interaktiv në stilin obsidian të errët), 3) Zhvillimi i Pastër i Kodit (React 19, TypeScript, shpejtësi sub-second), dhe 4) Testimi, Optimizimi SEO & Lansimi Zyrtar në serverë me siguri të lartë.',
    keyPoints: [
      'Komunikim i vazhdueshëm përmes kanalit të dedikuar në WhatsApp/Slack',
      'Shikim i prototipit interaktiv para se të shkruhet kodi',
      'Testim rigoroz në mbi 15 pajisje mobile dhe desktop'
    ]
  },
  {
    id: 'tech-stack',
    category: 'tech',
    question: 'Çfarë teknologjish përdorni dhe përse nuk përdorni shabllone të gatshme (Wordpress templates)?',
    answer: 'Ne nuk përdorim kurrë tema të gatshme apo shabllone të rënduara Wordpress që ngadalësojnë faqen dhe janë të cenueshme nga sulmet kibernetike. Ne ndërtojmë nga themeli me React 19, Next.js, TypeScript dhe Tailwind CSS. Kjo garanton që faqja juaj të hapet nën 0.5 sekonda, të ketë vlerësim maksimal 99-100 në Google Core Web Vitals dhe të ofrojë përvojë fluide si të një aplikacioni nativ në celular.',
    keyPoints: [
      'Zero shabllone të rënduara apo plugins të tepërt',
      'Shpejtësi hapjeje nën 600 milisekonda në celular',
      'Përputhshmëri 100% me standardet më të larta të Google Lighthouse',
      'Kodi i pastër në pronësi të plotë të klientit'
    ]
  },
  {
    id: 'tech-seo-mobile',
    category: 'tech',
    question: 'A është faqja e optimizuar për motorët e kërkimit (SEO) dhe për telefona celularë?',
    answer: 'Po, çdo projekt ndërtohet sipas parimit Mobile-First. Çdo buton, tipografi dhe element është projektuar posaçërisht për përdorim të rehatshëm me gisht të madh (thumb-zone) pa asnjë lëvizje të papritur të ekranit (CLS = 0.00). Gjithashtu integrojmë të dhëna të strukturuara Schema.org (JSON-LD), OpenGraph cards për rrjete sociale dhe metadata të avancuara për renditje maksimale në Google.',
    keyPoints: [
      'Strukturë e plotë Schema.org për njohje të biznesit lokal',
      'Optimizim i imazheve në formatet më moderne WebP/AVIF',
      'Performancë e garantuar në rrjetet mobile 4G/5G'
    ]
  },
  {
    id: 'ecommerce-gateways',
    category: 'ecommerce',
    question: 'Si funksionojnë pagesat online dhe menaxhimi i produkteve në dyqanet tuaja?',
    answer: 'Ne ndërtojmë dyqane Headless E-Commerce të lidhura me platforma të fuqishme si Shopify Plus, Stripe ose gateways vendore të pagesave. Klientët tuaj mund të blejnë me 1-klik përmes Apple Pay, Google Pay ose kartelave bankare me siguri maksimale. Ju përfitoni një panel administrues tejet të lehtë për menaxhimin e porosive, stokut dhe zbritjeve.',
    keyPoints: [
      'Arkitekturë e ndarë (Headless) për shpejtësi ekstreme blerjeje',
      'Mbështetje për shumë valuta (EUR, USD, CHF)',
      'Sinkronizim automatik me stoqet dhe njoftime në WhatsApp/Email'
    ]
  },
  {
    id: 'legal-arbk',
    category: 'legal',
    question: 'A është starwebs.ks biznes i regjistruar zyrtarisht në Republikën e Kosovës?',
    answer: 'Po! starwebs.ks operon si subjekt juridik i regjistruar rregullisht në Agjencinë për Regjistrimin e Bizneseve të Kosovës (ARBK) pranë Ministrisë së Industrisë, Ndërmarrësisë dhe Tregtisë (MINT). Çdo bashkëpunim rregullohet me kontratë zyrtare ligjore B2B dhe shoqërohet me faturim të rregullt fiskal sipas ligjeve të Kosovës.',
    keyPoints: [
      'Biznes me numër unik identifikues në ARBK',
      'Kontratë ligjore e detajuar me afate dhe garanci të përcaktuara qartë',
      'Partner zyrtar dhe punëdhënës aktiv në platformën Superpuna (superpuna.rks-gov.net)'
    ]
  },
  {
    id: 'legal-ownership',
    category: 'legal',
    question: 'Kush e ka pronësinë e kodit dhe të drejtave autoriale pas përfundimit?',
    answer: 'Pas përfundimit të projektit dhe likuidimit të pagesës, pronësia e plotë intelektuale dhe e kodit burimor (source code) ju kalon ekskluzivisht juve. Ne ju dorëzojmë repository-n në GitHub, konfigurimet e hosting-ut dhe të gjitha asetet grafike.',
    keyPoints: [
      '100% pronësi e juaja mbi kodin burimor',
      'Pa asnjë tarifë të fshehur abonimi mujor të detyrueshëm'
    ]
  },
  {
    id: 'support-warranty',
    category: 'support',
    question: 'A ofroni mbështetje teknike dhe garanci pas lansimit të faqes?',
    answer: 'Çdo projekt i dorëzuar nga starwebs.ks përfshin 30 ditë garanci dhe mirëmbajtje teknike pa pagesë shtesë, ku korrigjohet çdo parregullsi dhe ofrohet asistencë teknike. Përveç kësaj, ofrojmë plane mujore mirëmbajtjeje për monitorim 24/7 të serverëve, përditësime sigurie dhe mbështetje me prioritet.',
    keyPoints: [
      '30 ditë mbështetje falas pas çdo lansimi',
      'Përgjigje brenda 4 orëve për çdo kërkesë emergjente',
      'Përditësime të rregullta të sigurisë dhe kopje rezervë (backups)'
    ],
    recommendedAction: {
      label: 'Bisedo për Mirëmbajtjen',
      type: 'whatsapp'
    }
  },
  {
    id: 'free-demo',
    category: 'support',
    question: 'Si funksionon oferta "Get a Free Demo"?',
    answer: 'Për klientët seriozë që dëshirojnë të shohin nivelin tonë të dizajnit para se të marrin një vendim, inxhinierët tanë krijojnë një koncept-prototip falas brenda 24-48 orëve bazuar në markën dhe industrinë tuaj. Nuk kërkohet asnjë kartelë apo pagesë paraprake.',
    keyPoints: [
      'Prototip interaktiv i personalizuar për biznesin tuaj',
      'Dorëzim brenda 24-48 orëve',
      'Zero detyrim financiar nëse vendosni të mos vazhdoni'
    ],
    recommendedAction: {
      label: 'Kërko Demo Falas Tani',
      type: 'demo'
    }
  }
];
