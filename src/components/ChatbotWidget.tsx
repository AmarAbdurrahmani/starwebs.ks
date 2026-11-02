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
      text: "👋 Hi! I'm the **Starwebs AI Assistant**. I can help you with website pricing, delivery timelines, custom e-commerce features, or booking a free live demo for **starwebs.ks**.",
      timestamp: 'Just now'
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

  const quickPrompts = [
    'How much does a website cost?',
    'What is your delivery timeline?',
    'How do I get a Free Demo?',
    'Do you build E-Commerce stores?',
    'Message on WhatsApp (+383 48 881 191)'
  ];

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    if (textToSend.includes('WhatsApp')) {
      window.open('https://wa.me/38348881191', '_blank');
      return;
    }

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Fast local rule-based response check for zero latency
    const lower = textToSend.toLowerCase();
    let localReply: string | null = null;

    if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('how much')) {
      localReply = "Our custom projects start from **€2,900** for mobile-first redesigns, **€3,800** for bespoke web applications, and **€5,200** for headless e-commerce platforms. You can configure your exact scope with our live quote calculator above, or message us on WhatsApp (+383 48 881 191)!";
    } else if (lower.includes('timeline') || lower.includes('how long') || lower.includes('weeks') || lower.includes('duration')) {
      localReply = "Typical timelines range from **2 to 4 weeks** for focused landing pages/sprints, and **4 to 8 weeks** for full-scale custom platforms and headless stores. We also provide expedited fast-track delivery (-30% time).";
    } else if (lower.includes('demo') || lower.includes('free demo') || lower.includes('consultation')) {
      localReply = "You can claim a **Free Interactive Demo** right now! Click the **GET A FREE DEMO** button at the top of the page, or tap below to open the demo voucher generator.";
    } else if (lower.includes('ecommerce') || lower.includes('e-commerce') || lower.includes('shop') || lower.includes('store')) {
      localReply = "We specialize in headless Shopify and custom Stripe architectures with sub-second product filtering, 1-click Apple/Google Pay, and +38% average conversion lift.";
    }

    if (localReply) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'ai',
            text: localReply!,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickActions: lower.includes('demo')
              ? [{ label: 'Open Free Demo Form', action: onOpenDemo }]
              : undefined
          }
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    // Call server Gemini endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await response.json();
      const replyText = data.reply || "Thank you for asking! For direct inquiries, feel free to chat with our lead engineer on WhatsApp at +383 48 881 191.";

      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: "We specialize in custom web apps, e-commerce, and sub-second performance. You can reach our engineering team directly on WhatsApp at **+383 48 881 191** or email studio@starwebs.ks.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#1c1513] border border-[#dd6b4d]/40 text-[#fbf8f5] shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(221,107,77,0.35)] hover:border-[#dd6b4d] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dd6b4d] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dd6b4d]" />
          </span>

          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#dd6b4d]" />
            <span className="font-display text-xs font-bold tracking-wide uppercase pr-1">
              Starwebs AI Assistant
            </span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-[#dd6b4d]/20 text-[#ff9d82] font-mono-tabular border border-[#dd6b4d]/30">
            Online
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl card-chocolate-elevated border border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(221,107,77,0.25)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#171211] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#221816] border border-[#dd6b4d]/40 flex items-center justify-center text-[#dd6b4d]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display text-sm font-bold text-[#fbf8f5]">
                    Starwebs AI Assistant
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                </div>
                <span className="text-[10px] text-[#b3a8a2] block">
                  Web Services, Pricing & Demo Support
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(initialMessages)}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
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
            <div className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +383 48 881 191</span>
            </div>
            <span className="font-semibold underline flex items-center gap-0.5">
              Chat Now <ExternalLink className="w-3 h-3" />
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
                  className={`p-3 rounded-xl max-w-[82%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#dd6b4d] text-white font-medium rounded-br-none shadow-md'
                      : 'bg-[#1c1513] border border-white/[0.08] text-[#fbf8f5] rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.quickActions && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                      {msg.quickActions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={act.action}
                          className="px-2.5 py-1 rounded bg-[#dd6b4d] text-white font-bold text-[10px] hover:bg-[#e57c61] transition-colors"
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
                <div className="p-2.5 rounded-xl bg-[#1c1513] border border-white/[0.08] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b4d] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 bg-[#171211] border-t border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
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
            className="p-3 bg-[#171211] border-t border-white/[0.08] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about website pricing, timeline..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#0b0b0b] border border-white/[0.1] text-xs text-[#fbf8f5] focus:outline-none focus:border-[#dd6b4d] transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2 rounded-lg bg-[#dd6b4d] text-white hover:bg-[#e57c61] disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
