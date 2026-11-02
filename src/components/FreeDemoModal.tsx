import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Printer, Sparkles, Send, ShieldCheck } from 'lucide-react';

interface FreeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetQuoteData?: {
    projectTypeLabel?: string;
    pageCountTier?: string;
    designLevel?: string;
    timelineSpeed?: string;
    estimatedWeeks?: string;
    investmentRange?: string;
    includedModules?: string[];
  } | null;
}

export const FreeDemoModal: React.FC<FreeDemoModalProps> = ({
  isOpen,
  onClose,
  presetQuoteData
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedObjective, setSelectedObjective] = useState<string>('New High-Performance Website');
  const [targetDevice, setTargetDevice] = useState<string>('Desktop & Mobile First');
  const [budgetTier, setBudgetTier] = useState<string>('€5,000 – €10,000');
  const [targetTimeline, setTargetTimeline] = useState<string>('Within 4-8 weeks');

  // Contact Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyOrUrl, setCompanyOrUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const handleNextStep = () => {
    setValidationError('');
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !email.includes('@')) {
      setValidationError('Please provide a valid full name and business email address.');
      return;
    }
    setValidationError('');
    setIsCompleted(true);
  };

  const demoRef = 'DEMO-SW-' + Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl card-chocolate-elevated border border-white/[0.15] p-6 sm:p-8 bg-[#171211] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Modal Header & Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] animate-pulse" />
                <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] uppercase tracking-wider">
                  Free Interactive Demo & Architectural Consultation
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fbf8f5]">
                {currentStep === 1 && 'What are your primary website goals?'}
                {currentStep === 2 && 'Timeline & Budget Expectations'}
                {currentStep === 3 && 'Where should we send your custom demo?'}
              </h3>
              <p className="text-xs text-[#b3a8a2] mt-1">
                Step {currentStep} of 3 · Custom interactive prototype prepared by an engineer.
              </p>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-[#0b0b0b] rounded-full mt-4 overflow-hidden border border-white/[0.06]">
                <div
                  className="h-full bg-[#dd6b4d] transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Goals & Focus */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-2.5">
                  <span className="block text-xs font-mono-tabular uppercase text-[#b3a8a2]">
                    Select Project Typology:
                  </span>
                  {[
                    { title: 'New High-Performance Website', desc: 'Bespoke corporate / portfolio build from scratch with sub-second speeds' },
                    { title: 'Full Website Redesign & Modernization', desc: 'Migrate from sluggish CMS to modern React/Next.js architecture' },
                    { title: 'High-Conversion E-Commerce Store', desc: 'Custom headless storefront with 1-click checkout & lightning cart' },
                    { title: 'Web Application & Client Portal', desc: 'Complex authenticated platform with interactive dashboards & APIs' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedObjective(item.title)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        selectedObjective === item.title
                          ? 'bg-[#221816] border-[#dd6b4d] shadow-[0_0_16px_rgba(221,107,77,0.2)] text-[#fbf8f5]'
                          : 'bg-[#0b0b0b]/60 border-white/[0.08] text-[#b3a8a2] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-display text-sm font-bold block mb-0.5 text-[#fbf8f5]">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[#b3a8a2]">{item.desc}</span>
                      </div>
                      {selectedObjective === item.title && (
                        <CheckCircle2 className="w-5 h-5 text-[#dd6b4d] shrink-0 ml-3" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={handleNextStep}
                    className="btn-primary-orange px-6 py-2.5 text-xs rounded-lg uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold"
                  >
                    <span>NEXT STEP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget & Timeframe */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <span className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5">
                    Anticipated Investment Tier:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { tier: '€3,000 – €5,000', detail: 'Rapid Sprint / Landing Page' },
                      { tier: '€5,000 – €10,000', detail: 'Flagship Multi-Page Site' },
                      { tier: '€10,000 – €20,000', detail: 'Custom E-Commerce / Web App' },
                      { tier: '€20,000+', detail: 'Enterprise Spatial Architecture' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBudgetTier(item.tier)}
                        className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          budgetTier === item.tier
                            ? 'bg-[#221816] border-[#dd6b4d] shadow-[0_0_16px_rgba(221,107,77,0.2)] text-[#fbf8f5]'
                            : 'bg-[#0b0b0b]/60 border-white/[0.08] text-[#b3a8a2] hover:border-white/20'
                        }`}
                      >
                        <span className="font-mono-tabular text-sm font-bold block text-[#fbf8f5] mb-0.5">
                          {item.tier}
                        </span>
                        <span className="text-[11px] text-[#b3a8a2]">{item.detail}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-2.5">
                    Desired Delivery Window:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {['Urgent (2-4 wks)', 'Within 4-8 weeks', 'Flexible Planning'].map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() => setTargetTimeline(time)}
                        className={`py-2.5 px-2 rounded-lg border text-center text-xs font-medium cursor-pointer transition-all ${
                          targetTimeline === time
                            ? 'bg-[#dd6b4d] text-white border-[#dd6b4d] font-bold'
                            : 'bg-[#0b0b0b]/60 border-white/[0.08] text-[#b3a8a2] hover:border-white/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset calculator summary if launched from calculator */}
                {presetQuoteData && (
                  <div className="p-3.5 rounded-xl bg-[#0b0b0b] border border-white/[0.08] text-xs">
                    <span className="text-[10px] uppercase font-mono-tabular text-[#dd6b4d] font-bold block mb-1">
                      Attached Calculator Estimate:
                    </span>
                    <div className="flex justify-between text-[#b3a8a2]">
                      <span>Scope: {presetQuoteData.projectTypeLabel}</span>
                      <span className="font-mono-tabular text-[#fbf8f5] font-bold">{presetQuoteData.investmentRange}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn-secondary-dark px-4 py-2 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="btn-primary-orange px-6 py-2.5 text-xs rounded-lg uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold"
                  >
                    <span>NEXT STEP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Delivery */}
            {currentStep === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                    Company Name or Existing Website URL
                  </label>
                  <input
                    type="text"
                    value={companyOrUrl}
                    onChange={(e) => setCompanyOrUrl(e.target.value)}
                    placeholder="e.g. Acme Studio or https://acme.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular uppercase text-[#b3a8a2] mb-1">
                    Specific Feature Requests or Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need 3D product view, Stripe payment processing, and bilingual English/German support..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] resize-none"
                  />
                </div>

                {validationError && (
                  <span className="text-xs text-rose-400 block">{validationError}</span>
                )}

                <div className="flex justify-between pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-secondary-dark px-4 py-2 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-orange px-6 py-2.5 text-xs rounded-lg uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold"
                  >
                    <Send className="w-4 h-4" />
                    <span>SUBMIT DEMO REQUEST</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation State View */
          <div className="text-center py-6 space-y-6 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-full bg-[#dd6b4d]/20 border border-[#dd6b4d] flex items-center justify-center mx-auto text-[#dd6b4d] shadow-[0_0_24px_rgba(221,107,77,0.3)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] block mb-1">
                DEMO SLIP GENERATED · REF: {demoRef}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#fbf8f5] mb-2">
                Your Free Demo Session is Reserved
              </h3>
              <p className="text-xs text-[#b3a8a2] max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-[#fbf8f5]">{fullName}</strong>. We have prioritized your demo request for <strong className="text-[#fbf8f5]">{selectedObjective}</strong>. Our senior engineer is preparing an interactive sandbox preview for <strong className="text-[#fbf8f5]">{email}</strong>.
              </p>
            </div>

            {/* Spec Receipt */}
            <div className="p-4 rounded-xl bg-[#0b0b0b] border border-white/[0.08] text-left font-mono-tabular text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-white/[0.08] pb-1.5 text-[11px] text-[#b3a8a2]">
                <span>STARWEBS.KS DEMO VOUCHER</span>
                <span className="text-[#dd6b4d] font-bold">{demoRef}</span>
              </div>
              <div className="flex justify-between text-[#b3a8a2]">
                <span>Target Project:</span>
                <span className="text-[#fbf8f5] font-semibold">{selectedObjective}</span>
              </div>
              <div className="flex justify-between text-[#b3a8a2]">
                <span>Budget Tier:</span>
                <span className="text-[#ff9d82]">{budgetTier}</span>
              </div>
              <div className="flex justify-between text-[#b3a8a2]">
                <span>SLA Response:</span>
                <span className="text-emerald-400 font-bold">&lt; 4 Hours Guarantee</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="btn-secondary-dark px-4 py-2 text-xs rounded-lg flex items-center gap-2 cursor-pointer font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Demo Slip</span>
              </button>

              <button
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentStep(1);
                  onClose();
                }}
                className="btn-primary-orange px-6 py-2 text-xs rounded-lg uppercase tracking-wider font-bold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
