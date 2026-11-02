import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MessageCircle, Clock, ShieldCheck, Sparkles, Instagram, PhoneCall } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectType, setProjectType] = useState('Custom Web Application');
  const [budgetTier, setBudgetTier] = useState('€5,000 – €10,000');
  const [timeline, setTimeline] = useState('Within 4-8 weeks');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!clientName.trim()) newErrors.clientName = 'Your name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid business email is required';
    if (!companyName.trim()) newErrors.companyName = 'Company name or URL is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const quoteId = 'STW-' + Math.floor(1000 + Math.random() * 9000);

  return (
    <section id="contact" className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct WhatsApp, Instagram & SLA Guarantees */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 text-xs text-[#b3a8a2]">
              <Sparkles className="w-3.5 h-3.5 text-[#dd6b4d]" />
              <span className="font-body uppercase tracking-[0.08em] font-bold text-[#ff9d82]">
                Start Your Project
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf8f5] mb-4">
              Request a Website Consultation & Custom Quote
            </h2>
            <p className="font-body text-sm text-[#b3a8a2] leading-relaxed">
              Tell us about your brand, current challenges, and project vision. Our lead engineering team will review your requirements and provide an architectural blueprint with fixed pricing within 24 hours.
            </p>
          </div>

          {/* Prominent Direct WhatsApp Callout Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-[#171211] to-[#1c1513] border border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono-tabular">
                <MessageCircle className="w-4 h-4" />
                <span>Instant Direct Channel</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-[#fbf8f5] mb-1">
                Message Us on WhatsApp
              </h3>
              <p className="text-xs text-[#b3a8a2]">
                Connect with our technical lead right away for immediate questions or project scoping:
              </p>
              <div className="font-mono-tabular text-lg font-extrabold text-emerald-300 mt-2">
                +383 48 881 191
              </div>
            </div>

            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+383 48 881 191)</span>
            </a>
          </div>

          {/* Social Media & Instagram Link Card */}
          <div className="p-4 rounded-xl card-chocolate border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#221816] border border-[#dd6b4d]/30 flex items-center justify-center text-[#dd6b4d]">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-sm font-bold text-[#fbf8f5] block">
                  Official Instagram
                </span>
                <span className="text-xs text-[#b3a8a2]">
                  Behind-the-scenes & UI releases
                </span>
              </div>
            </div>
            <a
              href="https://instagram.com/starwebs.ks"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] text-xs font-semibold text-[#ff9d82] hover:bg-[#dd6b4d] hover:text-white transition-colors"
            >
              @starwebs.ks
            </a>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[#b3a8a2]">
            <div className="p-3.5 rounded-xl bg-[#171211] border border-white/[0.06] flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#dd6b4d] shrink-0" />
              <span>&lt;4-Hour Response SLA</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#171211] border border-white/[0.06] flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#dd6b4d] shrink-0" />
              <span>Confidentiality NDA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Sleek Form with Obsidian Chocolate Background */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-2xl card-chocolate border border-white/[0.12] relative shadow-2xl">
            {/* Top specular line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#dd6b4d]/40 to-transparent" />

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] focus:ring-1 focus:ring-[#dd6b4d] transition-all"
                    />
                    {errors.clientName && (
                      <span className="text-[10px] text-rose-400 mt-1 block">{errors.clientName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1.5">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] focus:ring-1 focus:ring-[#dd6b4d] transition-all"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-rose-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1.5">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Ventures"
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] focus:ring-1 focus:ring-[#dd6b4d] transition-all"
                    />
                    {errors.companyName && (
                      <span className="text-[10px] text-rose-400 mt-1 block">{errors.companyName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1.5">
                      Project Typology
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                    >
                      <option value="Custom Web Application">Custom Web Application</option>
                      <option value="E-Commerce Headless Store">E-Commerce Headless Store</option>
                      <option value="Mobile-First Redesign">Mobile-First Redesign</option>
                      <option value="Custom UI/UX Design System">Custom UI/UX Design System</option>
                      <option value="Performance & Core Web Vitals Overhaul">Speed & Vitals Overhaul</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1.5">
                      Target Budget Range
                    </label>
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                    >
                      <option value="€3,000 – €5,000">€3,000 – €5,000 (Sprint)</option>
                      <option value="€5,000 – €10,000">€5,000 – €10,000 (Flagship)</option>
                      <option value="€10,000 – €25,000">€10,000 – €25,000 (Enterprise)</option>
                      <option value="€25,000+">€25,000+ (Multi-Platform)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1.5">
                      Target Launch Window
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                    >
                      <option value="Immediate / Fast-track">Immediate / Fast-track (2-4 wks)</option>
                      <option value="Within 4-8 weeks">Within 4 – 8 weeks</option>
                      <option value="Next Quarter">Next Quarter</option>
                      <option value="Flexible Timeline">Flexible Planning Phase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1.5">
                    Brief Overview & Key Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your current site, tech stack preferences, target audience, or primary conversion goals..."
                    className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] focus:ring-1 focus:ring-[#dd6b4d] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary-orange btn-glow-hover w-full py-4 text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl font-bold"
                >
                  <Send className="w-4 h-4" />
                  <span>REQUEST CONSULTATION & CUSTOM QUOTE</span>
                </button>

                <p className="text-center text-[11px] text-[#b3a8a2]">
                  Guaranteed privacy · Zero spam · Direct contact with an engineering lead.
                </p>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-full bg-[#dd6b4d]/20 border border-[#dd6b4d] flex items-center justify-center mx-auto text-[#dd6b4d] shadow-[0_0_24px_rgba(221,107,77,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] block mb-1">
                    INQUIRY DISPATCHED · REF: {quoteId}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fbf8f5] mb-2">
                    Consultation Request Confirmed
                  </h3>
                  <p className="text-xs text-[#b3a8a2] max-w-md mx-auto leading-relaxed">
                    Thank you <strong className="text-[#fbf8f5]">{clientName}</strong>. Our senior solutions architect has received your project request for <strong className="text-[#fbf8f5]">{companyName}</strong>. We will review your scope and email a technical proposal to <strong className="text-[#fbf8f5]">{email}</strong> within 4 hours.
                  </p>
                </div>

                {/* Submittal Slip */}
                <div className="p-5 rounded-xl bg-[#0b0b0b] border border-white/[0.08] text-left font-mono-tabular text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-white/[0.08] pb-2 text-[11px] text-[#b3a8a2]">
                    <span>SUBMISSION SUMMARY</span>
                    <span className="text-[#dd6b4d] font-bold">{quoteId}</span>
                  </div>
                  <div className="flex justify-between text-[#b3a8a2]">
                    <span>Project:</span>
                    <span className="text-[#fbf8f5] font-semibold">{projectType}</span>
                  </div>
                  <div className="flex justify-between text-[#b3a8a2]">
                    <span>Budget Scope:</span>
                    <span className="text-[#ff9d82]">{budgetTier}</span>
                  </div>
                  <div className="flex justify-between text-[#b3a8a2]">
                    <span>Timeline:</span>
                    <span className="text-[#fbf8f5]">{timeline}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary-dark px-6 py-2.5 text-xs rounded-lg uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
