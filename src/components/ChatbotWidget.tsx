import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ExternalLink, 
  RotateCcw,
  Zap,
  PhoneCall
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

export const ChatbotWidget: React.FC<{ onOpenDemo: () => void }> = ({ onOpenDemo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Përshëndetje! Jam **Starwebs AI Assistant**. Mund t'ju ndihmoj me çmimet e faqeve, afatet e dorëzimit, dyqanet e-commerce apo rezervimin e një demoje falas për **starwebs.ks**.",
      timestamp: 'Tani'
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const quickPrompts = [
    'Sa kushton një uebfaqe?',
    'Sa zgjat zhvillimi i faqes?',
    'Si marr një Demo Falas?',
    'A ndërtoni dyqane E-Commerce?',
    'Bisedo në WhatsApp (+383 48 881 191)'
  ];

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Network response error');
      }

      const data = await response.json();
      const aiReply = data.reply || "Ju falënderojmë për mesazhin! Për specifikime teknike dhe oferta të menjëhershme, mund të kontaktoni drejtpërdrejt inxhinierin tonë në WhatsApp: +383 48 881 191.";

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions: textToSend.toLowerCase().includes('demo') || textToSend.toLowerCase().includes('çmim') || textToSend.toLowerCase().includes('price')
            ? [{ label: 'Merr një Demo Falas →', action: onOpenDemo }]
            : undefined
        }
      ]);
    } catch {
      // Graceful offline fallback
      let fallbackText = "Në **starwebs.ks** ndërtojmë uebfaqe dhe aplikacione moderne me React 19, Next.js dhe Tailwind CSS, të optimizuara për shpejtësi nën 800ms dhe konvertime të larta.";

      const lower = textToSend.toLowerCase();
      if (lower.includes('kushton') || lower.includes('çmim') || lower.includes('cost') || lower.includes('price')) {
        fallbackText = "Çmimet tona fillojnë nga **€2,500 – €5,000** për faqe moderne biznesi dhe arrijnë në **€5,000 – €10,000+** për dyqane të avancuara e-commerce me pagesa me 1-klik. Përdorni llogaritësin tonë të preventivit lart ose rezervoni një demo falas!";
      } else if (lower.includes('afat') || lower.includes('koha') || lower.includes('timeline') || lower.includes('zgjat')) {
        fallbackText = "Koha mesatare e dorëzimit është **2 deri në 6 javë**, në varësi të kompleksitetit të modulit. Ofroni dhe shërbimin tonë *Ekspres* me prioritet të lartë zhvillimi.";
      } else if (lower.includes('demo') || lower.includes('falas') || lower.includes('free')) {
        fallbackText = "Mund të rezervoni një **Demo Falas** me prototip interaktiv duke klikuar butonin 'GET A FREE DEMO' lart, ose duke na shkruar direkt në WhatsApp!";
      } else if (lower.includes('whatsapp') || lower.includes('kontakt') || lower.includes('numri')) {
        fallbackText = "Mund të na shkruani drejtpërdrejt në WhatsApp në **+383 48 881 191** për përgjigje të menjëhershme brenda pak minutash.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions: [{ label: 'Hap Formularin e Demos →', action: onOpenDemo }]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Full-Page Backdrop Blur Overlay (Active when chat is open) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer print:hidden"
          title="Kliko për të mbyllur bisedën"
          aria-label="Close Assistant Overlay"
        />
      )}

      {/* Floating Compact Trigger Button (When Closed) - Mobile Safe Margins */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 print:hidden chatbot-widget">
          <button
            onClick={() => setIsOpen(true)}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-neutral-900/95 backdrop-blur-xl border border-[#dd6b4d]/40 text-[#fbf8f5] shadow-[0_8px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(221,107,77,0.35)] hover:border-[#dd6b4d] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center relative group"
            title="Hap Starwebs AI Assistant"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-5 h-5 text-[#dd6b4d] group-hover:scale-110 transition-transform" />
            
            {/* Pulsating status dot in the upper corner */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dd6b4d] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dd6b4d] border-2 border-black" />
            </span>
          </button>
        </div>
      )}

      {/* Expanded Glassmorphic Chat Window (When Open) */}
      {isOpen && (
        <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 print:hidden chatbot-widget">
          <div className="w-[calc(100vw-1.5rem)] sm:w-[390px] h-[520px] max-h-[82vh] rounded-3xl bg-neutral-900/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(221,107,77,0.25)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-[#140e0d] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#dd6b4d]/40 shrink-0 bg-[#0d0908] p-0.5 shadow-inner">
                  <img
                    src="/assets/aistudio/logo_e0adced0.png"
                    alt="STARWEBS AI Assistant"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-xs sm:text-sm font-bold text-[#fbf8f5]">
                      Starwebs AI Assistant
                    </h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                  </div>
                  <span className="text-[10px] text-[#b3a8a2] block">
                    Çmimet, Afatet & Mbështetje për Demo
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages(initialMessages)}
                  title="Rifillo bisedën"
                  className="p-1.5 rounded-lg text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Mbyll Assistant-in"
                  className="p-1.5 rounded-lg text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick WhatsApp Header Bar */}
            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-300 hover:bg-emerald-950/60 transition-colors"
            >
              <div className="flex items-center gap-1.5 font-medium font-mono-tabular">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +383 48 881 191</span>
              </div>
              <span className="font-semibold underline flex items-center gap-0.5">
                Bisedo Direkt <ExternalLink className="w-3 h-3" />
              </span>
            </a>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#0b0b0b]/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-md bg-[#221816] border border-[#dd6b4d]/30 flex items-center justify-center text-[#dd6b4d] shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#dd6b4d] text-white font-medium rounded-br-none shadow-md'
                        : 'bg-neutral-900/90 border border-white/[0.08] text-[#fbf8f5] rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    {msg.quickActions && (
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.quickActions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={act.action}
                            className="px-2.5 py-1 rounded-lg bg-[#dd6b4d] text-white font-bold text-[10px] hover:bg-[#e57c61] transition-colors cursor-pointer"
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <span
                      className={`block text-[9px] mt-1 text-right font-mono-tabular ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-[#b3a8a2]'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center text-[#b3a8a2] text-xs">
                  <div className="w-6 h-6 rounded-md bg-[#221816] flex items-center justify-center text-[#dd6b4d]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-white/[0.08] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Question Chips */}
            <div className="px-3 py-2 bg-[#140e0d] border-t border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendPrompt(prompt)}
                  className="px-2.5 py-1 rounded-full bg-[#0b0b0b] border border-white/[0.08] text-[10px] text-[#b3a8a2] hover:text-[#fbf8f5] hover:border-[#dd6b4d]/50 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputText);
              }}
              className="p-3 bg-[#140e0d] border-t border-white/[0.08] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Shkruaj pyetjen tuaj për uebfaqe, çmime..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2 rounded-xl bg-[#dd6b4d] text-white hover:bg-[#e57c61] disabled:opacity-50 transition-colors cursor-pointer"
                title="Dërgo mesazhin"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
