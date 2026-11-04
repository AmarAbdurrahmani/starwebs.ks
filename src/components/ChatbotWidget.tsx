import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  RotateCcw, 
  PhoneCall, 
  ExternalLink,
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Radio, 
  AlertCircle,
  Square
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

interface ChatbotWidgetProps {
  onOpenDemo: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onOpenDemo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'voice'>('text');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Voice AI States
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isVoiceThinking, setIsVoiceThinking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [voiceLanguage, setVoiceLanguage] = useState<'sq' | 'en'>('sq');
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [micError, setMicError] = useState<string | null>(null);

  // Audio & Speech References
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Përshëndetje! Jam **Starwebs AI Assistant**. Mund t'ju ndihmoj me çmimet e faqeve, afatet e dorëzimit, dyqanet e-commerce apo rezervimin e një demoje falas për **starwebs.ks**.",
      timestamp: 'Tani'
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [voiceMessages, setVoiceMessages] = useState<ChatMessage[]>([
    {
      id: 'voice-welcome',
      sender: 'ai',
      text: "Përshëndetje! Jam Asistenti me Zë. Prekni butonin e mikrofonit për të dhënë leje dhe flisni lirshëm me zë.",
      timestamp: 'Tani'
    }
  ]);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopListening();
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, voiceMessages, isOpen, activeTab]);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        stopListening();
        if (synthRef.current) synthRef.current.cancel();
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

  // Text Chat Handler
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
        throw new Error('Chat service unavailable');
      }

      const data = await response.json();
      const aiReply = data.reply || "Faleminderit që kontaktuat starwebs.ks! Mund të na shkruani direkt në WhatsApp në +383 48 881 191.";

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions: [
            { label: 'Hap Formularin e Demos →', action: onOpenDemo },
            { 
              label: 'Bisedo në WhatsApp 💬', 
              action: () => window.open('https://wa.me/38348881191', '_blank', 'noopener,noreferrer') 
            }
          ]
        }
      ]);
    } catch (error) {
      console.warn('Chat request failed, providing high-fidelity fallback:', error);
      let fallbackText = "Faleminderit për pyetjen! Tek starwebs.ks ndërtojmë uebfaqe me shpejtësi nën 800ms dhe arkitekturë moderne React 19.";
      if (textToSend.toLowerCase().includes('çmim') || textToSend.toLowerCase().includes('kushton')) {
        fallbackText = "Çmimet tona nisin nga €2,900 për optimizime mobile-first, €3,800 për aplikacione ueb me porosi, dhe €5,200 për dyqane headless e-commerce me pagesa automatike.";
      } else if (textToSend.toLowerCase().includes('afat') || textToSend.toLowerCase().includes('zgjat')) {
        fallbackText = "Projektet tona dorëzohen mes 2 deri në 4 javë për landing faqe me konvertim të lartë, dhe 4 deri në 8 javë për platforma të plota me porosi.";
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

  // Stop audio synthesis speech
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Voice AI Speech Synthesis
  const speakVoiceReply = (text: string) => {
    if (isMuted || !synthRef.current) return;
    synthRef.current.cancel();

    const cleanText = text.replace(/[\*\_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;

    const voices = synthRef.current.getVoices();
    if (voiceLanguage === 'sq') {
      const sqVoice = voices.find(v => v.lang.startsWith('sq') || v.lang.startsWith('it'));
      if (sqVoice) utterance.voice = sqVoice;
      utterance.lang = sqVoice ? sqVoice.lang : 'it-IT';
    } else {
      const enVoice = voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  // Send query to voice backend
  const handleSendVoiceQuery = async (queryText: string) => {
    const textToSend = queryText.trim();
    if (!textToSend || isVoiceThinking) return;

    const userMessage: ChatMessage = {
      id: 'voice-user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setVoiceMessages((prev) => [...prev, userMessage]);
    setVoiceTranscript('');
    setIsVoiceThinking(true);
    stopListening();

    try {
      const res = await fetch('/api/voice-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: voiceLanguage,
          history: voiceMessages.map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text }))
        })
      });

      const data = await res.json();
      const reply = data.reply || (voiceLanguage === 'en'
        ? "We build bespoke high-performance websites. Would you like a free demo or WhatsApp consultation?"
        : "Ne ndërtojmë uebfaqe me porosi dhe shpejtësi të lartë. Dëshironi një demo falas apo konsultim në WhatsApp?");

      const aiMessage: ChatMessage = {
        id: 'voice-ai-' + Date.now(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [{ label: 'GET A FREE DEMO →', action: onOpenDemo }]
      };

      setVoiceMessages((prev) => [...prev, aiMessage]);
      speakVoiceReply(reply);
    } catch (err) {
      console.warn('Voice chat API error:', err);
      const fallback = voiceLanguage === 'en'
        ? "Welcome to starwebs.ks! Our engineering team is ready to assist you on WhatsApp (+383 48 881 191)."
        : "Mirësevini në starwebs.ks! Ekipi ynë inxhinierik është gati t'ju ndihmojë në WhatsApp (+383 48 881 191).";

      setVoiceMessages((prev) => [
        ...prev,
        {
          id: 'voice-ai-' + Date.now(),
          sender: 'ai',
          text: fallback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      speakVoiceReply(fallback);
    } finally {
      setIsVoiceThinking(false);
    }
  };

  // Helper to start real audio level analyser
  const setupAudioAnalyser = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(1, avg / 80));
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (e) {
      console.warn('AudioContext analyser setup error:', e);
    }
  };

  // Robust Web Speech Recognition + getUserMedia Permission
  const startListening = async () => {
    setMicError(null);
    stopSpeaking();

    // 1. Explicitly request microphone permission via getUserMedia
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        setupAudioAnalyser(stream);
      }
    } catch (permErr: any) {
      console.warn('Microphone permission denied or unavailable:', permErr);
      setMicError(
        permErr.name === 'NotAllowedError' || permErr.name === 'PermissionDeniedError'
          ? "Leja për mikrofon u refuzua. Ju lutem aktivizoni qasjen në cilësimet e shfletuesit."
          : "Nuk u gjet mikrofon aktiv në pajisjen tuaj."
      );
      setIsListening(false);
      return;
    }

    // 2. Instantiate and start SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicError("Shfletuesi juaj nuk mbështet Speech Recognition. Mund të përdorni skedën me tekst ose pyetjet e shpejta.");
      setIsListening(false);
      return;
    }

    try {
      // Abort previous instance if any
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = voiceLanguage === 'sq' ? 'sq-AL' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setMicError(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setVoiceTranscript(currentTranscript);
        if (event.results[0].isFinal && currentTranscript.trim()) {
          handleSendVoiceQuery(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error === 'not-allowed') {
          setMicError("Leja për mikrofon u refuzua. Ju lutem lejoni qasjen te shfletuesi.");
        } else if (event.error === 'no-speech') {
          // Normal timeout if user was silent
          setMicError("Nuk u dëgjua zë. Prekni përsëri mikrofonin dhe flisni.");
        }
        stopListening();
      };

      recognition.onend = () => {
        stopListening();
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Failed to start speech recognition:', err);
      setMicError("Ndodhi një gabim gjatë nisjes së mikrofonit. Provoni përsëri.");
      stopListening();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setAudioLevel(0);

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
      audioContextRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleMute = () => {
    if (!isMuted) {
      stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Full-Page Backdrop Blur Overlay */}
      {isOpen && (
        <div 
          onClick={() => {
            setIsOpen(false);
            stopListening();
            stopSpeaking();
          }}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer print:hidden"
          title="Kliko për të mbyllur bisedën"
          aria-label="Close Assistant Overlay"
        />
      )}

      {/* SINGLE UNIFIED FLOATING TRIGGER BUTTON (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 print:hidden chatbot-widget">
          <button
            onClick={() => setIsOpen(true)}
            className="h-12 sm:h-14 px-4 sm:px-5 rounded-full bg-[#140e0d] border border-[#dd6b4d]/40 text-[#fbf8f5] shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(221,107,77,0.35)] hover:border-[#dd6b4d] hover:shadow-[0_0_35px_rgba(221,107,77,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-3 relative group"
            title="Hap Starwebs AI Assistant (Tekst & Zë)"
            aria-label="Open AI Assistant"
          >
            {/* Pulsating status dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dd6b4d] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dd6b4d]" />
            </span>

            {/* Icons cluster */}
            <div className="flex items-center gap-1.5 text-[#ff9d82]">
              <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-white/30 text-xs">/</span>
              <Mic className="w-4 h-4 text-[#dd6b4d] group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold font-display text-[#fbf8f5] leading-tight">
                AI Assistant
              </span>
              <span className="text-[10px] text-[#ff9d82] font-mono-tabular leading-none">
                Tekst & Zë
              </span>
            </div>

            {/* Audio wave indicator */}
            <div className="hidden sm:flex items-center gap-0.5 pl-1" aria-hidden="true">
              <span className="w-0.5 h-3 bg-[#dd6b4d] rounded-full animate-pulse" />
              <span className="w-0.5 h-4 bg-[#ff9d82] rounded-full animate-pulse [animation-delay:0.2s]" />
              <span className="w-0.5 h-2.5 bg-[#dd6b4d] rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          </button>
        </div>
      )}

      {/* EXPANDED GLASSMORPHIC CHAT & VOICE WINDOW */}
      {isOpen && (
        <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 print:hidden chatbot-widget">
          <div className="w-[calc(100vw-1.5rem)] sm:w-[410px] h-[560px] max-h-[86vh] rounded-3xl bg-[#0f0a09]/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(221,107,77,0.3)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Specular top border */}
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#dd6b4d] to-transparent" />

            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-[#140e0d] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-[#dd6b4d]/40 shrink-0 bg-[#0d0908] p-0.5 shadow-inner">
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
                    {activeTab === 'voice' ? 'Voice AI (Bisedoni me Zë)' : 'Bisedë me Tekst & Çmime'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setMessages(initialMessages);
                    setVoiceMessages([voiceMessages[0]]);
                    setMicError(null);
                    stopSpeaking();
                    stopListening();
                  }}
                  title="Rifillo bisedën"
                  className="p-1.5 rounded-lg text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    stopListening();
                    stopSpeaking();
                  }}
                  title="Mbyll Assistant-in"
                  className="p-1.5 rounded-lg text-[#b3a8a2] hover:text-[#fbf8f5] hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs: [💬 Tekst] vs [🎙️ Voice AI] */}
            <div className="px-3 pt-2 pb-1.5 bg-[#140e0d]/90 border-b border-white/[0.06]">
              <div className="flex items-center p-0.5 rounded-xl bg-black/50 border border-white/10">
                <button
                  onClick={() => {
                    setActiveTab('text');
                    stopListening();
                    stopSpeaking();
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'text'
                      ? 'bg-[#221411] text-[#ff9d82] border border-[#dd6b4d]/40 shadow-sm'
                      : 'text-[#b3a8a2] hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Bisedë me Tekst</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('voice');
                    stopSpeaking();
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'voice'
                      ? 'bg-gradient-to-r from-[#dd6b4d] to-[#e87756] text-white font-bold shadow-[0_0_15px_rgba(221,107,77,0.4)]'
                      : 'text-[#b3a8a2] hover:text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice AI (Me Zë)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>
              </div>
            </div>

            {/* Quick WhatsApp Link */}
            <a
              href="https://wa.me/38348881191"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-300 hover:bg-emerald-950/60 transition-colors"
            >
              <div className="flex items-center gap-1.5 font-medium font-mono-tabular">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +383 48 881 191</span>
              </div>
              <span className="font-semibold underline flex items-center gap-0.5">
                Bisedo Direkt <ExternalLink className="w-3 h-3" />
              </span>
            </a>

            {/* MODE 1: TEXT CHAT */}
            {activeTab === 'text' && (
              <>
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

                {/* Quick Prompts */}
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

                {/* Input Form with direct switch to voice */}
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
                    type="button"
                    onClick={() => {
                      setActiveTab('voice');
                      startListening();
                    }}
                    title="Bisedo me Zë"
                    className="p-2 rounded-xl bg-[#221512] border border-[#dd6b4d]/30 text-[#ff9d82] hover:bg-[#dd6b4d] hover:text-white transition-colors cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="p-2 rounded-xl bg-[#dd6b4d] text-white hover:bg-[#e57c61] disabled:opacity-50 transition-colors cursor-pointer"
                    title="Dërgo mesazhin"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

            {/* MODE 2: INTEGRATED VOICE AI */}
            {activeTab === 'voice' && (
              <div className="flex-1 flex flex-col bg-[#0b0b0b]/80 overflow-hidden">
                {/* Voice Control Top Bar */}
                <div className="pt-3 pb-3 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#1c1210]/60 to-transparent border-b border-white/[0.06]">
                  <div className="w-full flex items-center justify-between mb-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#b3a8a2] font-mono-tabular">Gjuha:</span>
                      <button
                        onClick={() => setVoiceLanguage('sq')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-tabular cursor-pointer ${
                          voiceLanguage === 'sq' ? 'bg-[#dd6b4d] text-white' : 'text-[#b3a8a2] hover:text-white'
                        }`}
                      >
                        SHQIP
                      </button>
                      <button
                        onClick={() => setVoiceLanguage('en')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-tabular cursor-pointer ${
                          voiceLanguage === 'en' ? 'bg-[#dd6b4d] text-white' : 'text-[#b3a8a2] hover:text-white'
                        }`}
                      >
                        EN
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSpeaking && (
                        <button
                          onClick={stopSpeaking}
                          className="px-2 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:bg-red-900 transition-colors"
                          title="Ndalo zërin e asistentit"
                        >
                          <Square className="w-2.5 h-2.5 fill-current" />
                          <span>Ndalo zërin</span>
                        </button>
                      )}
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#b3a8a2] hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                        title={isMuted ? 'Aktivizo zërin' : 'Hesht zërin'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Pulsing Interactive Mic Orb */}
                  <div className="relative my-2 flex items-center justify-center">
                    {/* Concentric glowing rings */}
                    <div 
                      className={`absolute w-28 h-28 rounded-full border transition-all duration-300 ${
                        isListening
                          ? 'border-emerald-500/50 scale-110 animate-ping'
                          : isSpeaking
                          ? 'border-[#dd6b4d]/50 scale-105 animate-pulse'
                          : 'border-white/10 scale-95'
                      }`} 
                    />
                    <div 
                      className={`absolute w-24 h-24 rounded-full transition-all duration-300 ${
                        isListening
                          ? 'bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                          : isSpeaking
                          ? 'bg-[#dd6b4d]/20 shadow-[0_0_30px_rgba(221,107,77,0.4)]'
                          : 'bg-white/[0.02]'
                      }`}
                    />

                    {/* Main Circular Mic Button */}
                    <button
                      onClick={toggleListening}
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl ${
                        isListening
                          ? 'bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.8)] scale-105'
                          : isSpeaking
                          ? 'bg-[#dd6b4d] text-white shadow-[0_0_25px_rgba(221,107,77,0.8)]'
                          : 'bg-gradient-to-tr from-[#1a100e] to-[#2b1713] border border-[#dd6b4d]/40 text-[#ff9d82] hover:scale-105 hover:border-[#dd6b4d]'
                      }`}
                      title={isListening ? 'Ndalo dëgjimin' : 'Prekni për të folur me mikrofon'}
                    >
                      {isListening ? (
                        <MicOff className="w-7 h-7 animate-pulse" />
                      ) : (
                        <Mic className="w-7 h-7" />
                      )}
                    </button>
                  </div>

                  {/* Frequency bars visualizer */}
                  <div className="flex items-center gap-1 mt-2" aria-hidden="true">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isListening
                            ? 'bg-emerald-400'
                            : isSpeaking
                            ? 'bg-[#dd6b4d]'
                            : 'bg-white/10'
                        }`}
                        style={{
                          height: isListening 
                            ? `${6 + Math.max(4, audioLevel * 24 * ((i % 3) + 1))}px` 
                            : isSpeaking 
                            ? `${8 + ((i % 2) * 12)}px` 
                            : '6px'
                        }}
                      />
                    ))}
                  </div>

                  {/* Status Text Indicator */}
                  <div className="mt-2 text-center px-4">
                    {micError ? (
                      <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                        <span>{micError}</span>
                      </div>
                    ) : isListening ? (
                      <p className="text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>{voiceTranscript ? `"${voiceTranscript}"` : 'Po dëgjoj, flisni tani...'}</span>
                      </p>
                    ) : isSpeaking ? (
                      <p className="text-[#ff9d82] text-xs font-semibold flex items-center justify-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                        <span>Asistenti po përgjigjet me zë...</span>
                      </p>
                    ) : isVoiceThinking ? (
                      <p className="text-[#dd6b4d] text-xs font-semibold flex items-center justify-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 animate-spin" />
                        <span>Duke menduar me Gemini...</span>
                      </p>
                    ) : (
                      <p className="text-[#b3a8a2] text-xs">
                        Prekni mikrofonin më lart dhe flisni lirshëm
                      </p>
                    )}
                  </div>
                </div>

                {/* Voice Turn Transcript Log */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-black/40">
                  {voiceMessages.map((vMsg) => (
                    <div
                      key={vMsg.id}
                      className={`flex flex-col ${vMsg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] px-3.5 py-2 rounded-2xl leading-relaxed ${
                          vMsg.sender === 'user'
                            ? 'bg-[#dd6b4d] text-white rounded-br-none shadow-sm'
                            : 'bg-neutral-900/90 border border-white/[0.08] text-[#fbf8f5] rounded-bl-none'
                        }`}
                      >
                        <p>{vMsg.text}</p>
                        {vMsg.quickActions && (
                          <div className="mt-2 pt-1.5 border-t border-white/10 flex flex-wrap gap-1.5">
                            {vMsg.quickActions.map((act, idx) => (
                              <button
                                key={idx}
                                onClick={act.action}
                                className="px-2 py-0.5 rounded bg-[#dd6b4d] text-white font-bold text-[10px] cursor-pointer"
                              >
                                {act.label}
                              </button>
                            ))}
                          </div>
                        )}
                        <span className="block text-[8px] mt-1 text-right opacity-60 font-mono-tabular">
                          {vMsg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Voice Inquiry Chips */}
                <div className="px-3 py-2 bg-[#140e0d] border-t border-white/[0.08] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {[
                    'Sa kushton një uebfaqe?',
                    'Sa zgjat zhvillimi?',
                    'Dua një Demo Falas',
                    'WhatsApp (+383 48 881 191)'
                  ].map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSendVoiceQuery(chip)}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-[#dd6b4d]/20 border border-white/[0.08] hover:border-[#dd6b4d]/40 text-[10px] text-[#fbf8f5] whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#dd6b4d]" />
                      <span>{chip}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
