import React, { useState } from 'react';
import { X, ExternalLink, Monitor, Smartphone, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { PortfolioProject } from '../types';

interface LiveDemoModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDemoRequest: () => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenDemoRequest
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'metrics'>('home');
  const [isSimulatingAction, setIsSimulatingAction] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!isOpen || !project) return null;

  const handleSimulateClick = (actionName: string) => {
    setIsSimulatingAction(true);
    setActionNotice(`Interactive Action Triggered: ${actionName} (Sub-16ms response)`);
    setTimeout(() => {
      setIsSimulatingAction(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-2xl card-chocolate-elevated border border-white/[0.15] p-5 sm:p-8 bg-[#171211] shadow-[0_24px_60px_rgba(0,0,0,0.95)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/[0.06] text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.12] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono-tabular text-xs font-bold text-[#dd6b4d] uppercase tracking-wider">
                Interactive Live Website Simulator
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#fbf8f5]">
              {project.title} — {project.client}
            </h3>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b0b0b] rounded-lg border border-white/[0.1] self-start sm:self-auto">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                deviceView === 'desktop'
                  ? 'bg-[#dd6b4d] text-white shadow-md'
                  : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                deviceView === 'mobile'
                  ? 'bg-[#dd6b4d] text-white shadow-md'
                  : 'text-[#b3a8a2] hover:text-[#fbf8f5]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Interactive Notice Banner */}
        {actionNotice && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono-tabular animate-in fade-in duration-200">
            {actionNotice}
          </div>
        )}

        {/* Browser Sandbox Simulator */}
        <div className="rounded-xl overflow-hidden border border-white/[0.12] bg-[#0b0b0b] mb-6 shadow-2xl">
          {/* Simulated Browser chrome */}
          <div className="px-4 py-2.5 bg-[#171211] border-b border-white/[0.08] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono-tabular text-[11px] text-[#b3a8a2] ml-2 truncate max-w-[240px] sm:max-w-md">
                {project.desktopMockup.browserUrl}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono-tabular text-[11px] text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              <span>100 Core Web Vitals</span>
            </div>
          </div>

          {/* Interactive Screen View */}
          <div className="p-6 bg-gradient-to-b from-[#18100f] via-[#120c0c] to-[#0b0b0b] min-h-[380px] flex flex-col justify-between">
            {/* Simulated Navigation Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs">
              <span className="font-display font-extrabold tracking-tight text-[#fbf8f5] text-base">
                {project.title.toUpperCase()}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    handleSimulateClick('Navigate Home');
                  }}
                  className={`cursor-pointer ${activeTab === 'home' ? 'text-[#dd6b4d] font-bold' : 'text-[#b3a8a2]'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => {
                    setActiveTab('features');
                    handleSimulateClick('View Features');
                  }}
                  className={`cursor-pointer ${activeTab === 'features' ? 'text-[#dd6b4d] font-bold' : 'text-[#b3a8a2]'}`}
                >
                  Capabilities
                </button>
                <button
                  onClick={() => {
                    setActiveTab('metrics');
                    handleSimulateClick('Inspect Analytics');
                  }}
                  className={`cursor-pointer ${activeTab === 'metrics' ? 'text-[#dd6b4d] font-bold' : 'text-[#b3a8a2]'}`}
                >
                  Telemetry
                </button>
              </div>
            </div>

            {/* Dynamic Screen Content */}
            <div className="py-6">
              {activeTab === 'home' && (
                <div className="space-y-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#dd6b4d]/20 text-[#ff9d82] text-[10px] font-mono-tabular border border-[#dd6b4d]/30 inline-block font-semibold">
                    {project.category} · {project.year} Production Deployment
                  </span>
                  <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbf8f5] leading-tight max-w-xl">
                    {project.desktopMockup.heading}
                  </h4>
                  <p className="font-body text-xs text-[#b3a8a2] max-w-lg leading-relaxed">
                    {project.desktopMockup.subheading}
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 font-mono-tabular">
                    {project.desktopMockup.stats.map((st, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#1c1513] border border-white/[0.08]">
                        <span className="block text-[10px] text-[#b3a8a2] uppercase">{st.label}</span>
                        <span className="text-base font-bold text-[#fbf8f5]">{st.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h5 className="font-display text-xl font-bold text-[#fbf8f5]">
                    Engineered Features & Modularity
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {project.desktopMockup.features.map((feat, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSimulateClick(feat)}
                        className="p-3.5 rounded-xl bg-[#1c1513] border border-white/[0.08] hover:border-[#dd6b4d]/50 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 text-[#fbf8f5]">
                          <CheckCircle2 className="w-4 h-4 text-[#dd6b4d]" />
                          <span>{feat}</span>
                        </div>
                        <span className="text-[10px] font-mono-tabular text-[#ff9d82]">Test Action →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h5 className="font-display text-xl font-bold text-[#fbf8f5]">
                    Client Key Performance Metrics
                  </h5>
                  <div className="grid grid-cols-3 gap-3 font-mono-tabular">
                    {project.keyOutcomes.map((ko, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#1c1513] border border-emerald-500/30 text-center">
                        <span className="block text-2xl font-bold text-emerald-400 mb-1">{ko.metric}</span>
                        <span className="text-xs text-[#b3a8a2] uppercase">{ko.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Bottom Control Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#b3a8a2]">Simulated Interactive State:</span>
                <button
                  onClick={() => handleSimulateClick('Trigger 1-Click Action')}
                  className="px-3 py-1.5 rounded bg-[#dd6b4d] text-white font-bold text-[11px] cursor-pointer hover:bg-[#e57c61]"
                >
                  Test Client Action
                </button>
              </div>
              <span className="text-[11px] font-mono-tabular text-[#ff9d82]">
                Hydrated in 0.52s · Zero CLS
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="text-xs text-[#b3a8a2]">
            Want a comparable custom digital flagship for your business?
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-dark px-4 py-2 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <span>WhatsApp: +383 48 881 191</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenDemoRequest();
              }}
              className="btn-primary-orange px-5 py-2 text-xs rounded-lg uppercase tracking-wider font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>GET FREE DEMO LIKE THIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
