import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  X
} from 'lucide-react';
import { FAQ_DATA, FAQ_CATEGORIES, FAQItem, FAQCategory } from '../data/faqData';

interface FAQViewProps {
  onBackToHome: () => void;
  onOpenFreeDemo: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const FAQView: React.FC<FAQViewProps> = ({
  onBackToHome,
  onOpenFreeDemo,
  onNavigateToSection
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(FAQ_DATA[0].id);

  // Filtered FAQ items based on category and search query
  const filteredItems = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesText = 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.keyPoints?.some(kp => kp.toLowerCase().includes(query));

      return matchesCategory && matchesText;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleAction = (item: FAQItem) => {
    if (!item.recommendedAction) return;
    if (item.recommendedAction.type === 'demo') {
      onOpenFreeDemo();
    } else if (item.recommendedAction.type === 'whatsapp') {
      window.open('https://wa.me/38348881191', '_blank');
    } else if (item.recommendedAction.type === 'services') {
      onBackToHome();
      setTimeout(() => {
        onNavigateToSection('services');
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#fbf8f5] pt-24 pb-28 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto relative z-10">
      {/* Top Breadcrumb & Return Action */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-white/10 hover:border-[#dd6b4d]/50 text-xs sm:text-sm font-semibold text-[#fbf8f5] hover:text-[#ff9d82] transition-all cursor-pointer group shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#dd6b4d] group-hover:-translate-x-1 transition-transform" />
          <span>Kthehu në Ballinë (Back to Home)</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#b3a8a2]">
          <span className="cursor-pointer hover:text-white" onClick={onBackToHome}>starwebs.ks</span>
          <span>/</span>
          <span className="text-[#ff9d82] font-semibold">Pyetjet e Shpeshta (FAQ)</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-neutral-900/60 border border-white/10 backdrop-blur-md">
          <HelpCircle className="w-4 h-4 text-[#dd6b4d]" />
          <span className="font-body text-xs uppercase tracking-wider font-bold text-[#ff9d82]">
            Qendra e Informacionit & Pyetjet e Shpeshta
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f5] mb-4">
          Transparencë e Plotë mbi Çmimet, Afatet & Teknologjinë
        </h1>

        <p className="font-body text-sm sm:text-base text-[#b3a8a2] leading-relaxed max-w-2xl mx-auto">
          Zbuloni gjithçka që duhet të dini mbi bashkëpunimin me <strong className="text-white">starwebs.ks</strong>: nga preventivi i fiksuar dhe siguria ligjore në ARBK, deri te arkitektura me shpejtësi nën 800ms.
        </p>

        {/* Live Search Bar */}
        <div className="mt-8 relative max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kërko pyetje (p.sh. çmimi, afati, dyqani, ARBK, demo)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-neutral-900/70 border border-white/15 focus:border-[#dd6b4d] focus:outline-none focus:ring-1 focus:ring-[#dd6b4d] text-sm text-[#fbf8f5] placeholder-neutral-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 text-neutral-400 hover:text-white p-1"
                title="Pastro kërkimin"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {FAQ_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? FAQ_DATA.length 
            : FAQ_DATA.filter(i => i.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#dd6b4d] text-white border-[#dd6b4d] shadow-[0_0_12px_rgba(221,107,77,0.4)]'
                  : 'bg-neutral-900/50 hover:bg-neutral-800 text-[#b3a8a2] hover:text-white border-white/10'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono-tabular ${
                isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-neutral-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Accordion Questions List */}
      <div className="max-w-4xl mx-auto space-y-4 mb-16">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-neutral-900/30 border border-white/10">
            <HelpCircle className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nuk u gjet asnjë pyetje për kërkimin tuaj</h3>
            <p className="text-xs text-neutral-400 mb-6">Provo një term tjetër kërkimi ose bisedoni drejtpërdrejt me ekipin tonë.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Pastro Filtrat
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-neutral-900/70 border-[#dd6b4d]/50 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                    : 'bg-neutral-900/30 hover:bg-neutral-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Accordion Question Trigger */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1 pr-2">
                    <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#dd6b4d] font-bold block">
                      {item.category === 'pricing' && 'Çmimet & Pagesat'}
                      {item.category === 'timeline' && 'Afatet & Dorëzimi'}
                      {item.category === 'tech' && 'Teknologjia & Shpejtësia'}
                      {item.category === 'ecommerce' && 'E-Commerce'}
                      {item.category === 'legal' && 'ARBK & Ligjshmëria'}
                      {item.category === 'support' && 'Mirëmbajtja & Garancia'}
                    </span>
                    <h2 className="font-display text-base sm:text-lg font-bold text-[#fbf8f5] leading-snug">
                      {item.question}
                    </h2>
                  </div>

                  <div className={`p-2 rounded-full border transition-transform duration-300 shrink-0 mt-0.5 ${
                    isExpanded 
                      ? 'bg-[#dd6b4d]/20 border-[#dd6b4d]/40 text-[#ff9d82] rotate-180' 
                      : 'bg-white/5 border-white/10 text-neutral-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/[0.06] space-y-4">
                        <p className="font-body text-xs sm:text-sm text-[#b3a8a2] leading-relaxed">
                          {item.answer}
                        </p>

                        {/* Bulleted Key Takeaways */}
                        {item.keyPoints && item.keyPoints.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                            <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-neutral-400 font-bold block">
                              Pikat Kryesore:
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                              {item.keyPoints.map((kp, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#fbf8f5]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="leading-tight">{kp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Callout if available */}
                        {item.recommendedAction && (
                          <div className="pt-3 flex justify-start">
                            <button
                              onClick={() => handleAction(item)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#dd6b4d]/20 hover:bg-[#dd6b4d] border border-[#dd6b4d]/40 text-[#ff9d82] hover:text-white transition-all text-xs font-bold cursor-pointer"
                            >
                              <span>{item.recommendedAction.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Bottom Direct Escalation Card */}
      <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-neutral-900/90 via-[#171211] to-[#1a1311] border border-[#dd6b4d]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#dd6b4d]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono-tabular text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Përgjigje e Menjëhershme</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Keni një pyetje specifike për projektin tuaj?
            </h3>
            <p className="text-xs sm:text-sm text-[#b3a8a2] leading-relaxed">
              Ekipi ynë inxhinierik është në dispozicion për t'ju udhëzuar mbi arkitekturën teknike dhe përllogaritjen e kostos pa asnjë detyrim.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg font-mono-tabular"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +383 48 881 191</span>
            </a>

            <button
              onClick={onOpenFreeDemo}
              className="w-full sm:w-auto px-5 py-3 rounded-xl btn-primary-orange btn-glow-hover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Merr një Demo Falas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
