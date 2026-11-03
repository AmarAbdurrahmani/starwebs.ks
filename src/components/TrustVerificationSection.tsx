import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Building2, 
  Briefcase, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Award
} from 'lucide-react';

export const TrustVerificationSection: React.FC = () => {
  return (
    <section id="trust" className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08] relative">
      {/* Subtle ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/3 w-[500px] h-[300px] rounded-full pointer-events-none opacity-20 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(221, 107, 77, 0.2) 60%, transparent 80%)'
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-neutral-900/50 border border-white/10 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-body text-xs uppercase tracking-wider font-bold text-[#ff9d82]">
            Besueshmëria & Integriteti Zyrtar · Verified Business
          </span>
        </div>
        
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f5] mb-4">
          Biznes i Regjistruar Zyrtarisht & Angazhim Aktiv në Punësim
        </h2>
        
        <p className="font-body text-sm sm:text-base text-[#b3a8a2] leading-relaxed">
          Në <strong className="text-[#fbf8f5]">starwebs.ks</strong>, transparenca ligjore dhe përgjegjësia profesionale janë themeli ynë. Ne operojmë në përputhje të plotë me legjislacionin e Republikës së Kosovës dhe investojmë në zhvillimin e inxhinierëve të rinj përmes platformave zyrtare të punësimit.
        </p>
      </motion.div>

      {/* Trust Grid: ARBK Verification & Superpuna Employer Portal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Card 1: ARBK Registered Agency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-neutral-900/40 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
        >
          <div>
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold text-[#fbf8f5] block">
                    Regjistruar në ARBK
                  </span>
                  <span className="text-xs text-[#b3a8a2] font-mono-tabular">
                    Republika e Kosovës · MINT
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono-tabular text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Statusi: Aktiv</span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#b3a8a2] leading-relaxed mb-6">
              Agjencia <strong className="text-[#fbf8f5]">starwebs.ks</strong> është subjekt juridik i regjistruar rregullisht në Agjencinë për Regjistrimin e Bizneseve të Kosovës (ARBK). Çdo bashkëpunim shoqërohet me kontrata ligjore B2B dhe faturim zyrtar të rregullt.
            </p>

            {/* Checklist Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono-tabular text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2 text-[#fbf8f5]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Numër Biznesi Zyrtar</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2 text-[#fbf8f5]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kontrata Ligjore B2B</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2 text-[#fbf8f5]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Përputhshmëri Tatimore</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2 text-[#fbf8f5]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Standarde Evropiane</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#b3a8a2] font-mono-tabular">
            <span>Operim me bazë në Prishtinë, Kosovë</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Verifikuar
            </span>
          </div>
        </motion.div>

        {/* Card 2: Superpuna Verified Employer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-neutral-900/40 backdrop-blur-md border border-white/10 hover:border-[#dd6b4d]/50 transition-all duration-300 flex flex-col justify-between shadow-xl group"
        >
          <div>
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#dd6b4d]/15 border border-[#dd6b4d]/40 flex items-center justify-center text-[#dd6b4d] shadow-inner">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold text-[#fbf8f5] block">
                    Punëdhënës në Superpuna
                  </span>
                  <span className="text-xs text-[#b3a8a2] font-mono-tabular">
                    superpuna.rks-gov.net · Qeveria e Kosovës
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dd6b4d]/20 border border-[#dd6b4d]/40 text-[#ff9d82] font-mono-tabular text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>Punësim Aktiv</span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#b3a8a2] leading-relaxed mb-6">
              Jemi partnerë aktivë në platformën qeveritare <strong className="text-[#fbf8f5]">Superpuna</strong> për mbështetjen dhe punësimin e rinisë kosovare. Ofron mundësi reale karriere për zhvillues të rinj softuerikë, dizajnerë UI/UX dhe inxhinierë web në React, Next.js dhe Tailwind CSS.
            </p>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.06] mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-[#b3a8a2]">Platforma:</span>
                <span className="text-[#fbf8f5] font-semibold">Superpuna (rks-gov.net)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-[#b3a8a2]">Fusha e Punësimit:</span>
                <span className="text-[#ff9d82] font-semibold">Software & Web Development</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-[#b3a8a2]">Verifikimi i Punëdhënësit:</span>
                <span className="text-emerald-400 font-bold">starwebs-ks (Aktiv)</span>
              </div>
            </div>
          </div>

          {/* Action Button: Confirmed label "Shiko Pozitat e Hapura në Superpuna" */}
          <div className="pt-4 border-t border-white/[0.08]">
            <a
              href="https://superpuna.rks-gov.net/job-seeker/employer/starwebs-ks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-orange btn-glow-hover w-full py-3.5 text-xs font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Shiko Pozitat e Hapura në Superpuna</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
