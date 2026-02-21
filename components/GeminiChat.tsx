import React, { useState, useRef, useEffect } from 'react';
import { GeminiLogo } from '../constants';
import { Send, X, Loader2, Sparkles, Wand2, Image as ImageIcon, MessageSquare, Mic, ArrowLeft } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '../types';

interface GeminiChatProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceStart: () => void;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ isOpen, onClose, onVoiceStart }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm your Hyper Media AI assistant. How can I help you today? ✨", timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await getGeminiResponse(currentInput, [], history);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: response, 
        timestamp: new Date() 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm feeling a bit disconnected. Please try again!", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900/60 backdrop-blur-2xl w-full max-w-lg h-[600px] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/20 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <GeminiLogo className="w-8 h-8" />
            <h2 className="font-bold text-lg text-white">Hyper Assistant</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-black/10 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-3xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' : 'bg-white/5 text-zinc-200 rounded-tl-none border border-white/5'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/5 px-5 py-3 rounded-3xl flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/5 border-t border-white/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={onVoiceStart}
              className="p-3 bg-white/5 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <Mic size={24} />
            </button>
            
            <div className="flex-grow relative">
              <input 
                type="text" 
                placeholder="Ask about a photo or caption..." 
                className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${input.trim() ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-600 grayscale opacity-50'}`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
           {['✨ Caption ideas', '📸 Photo tips', '🎨 Filter suggestions', '💬 DM help'].map(action => (
             <button 
                key={action} 
                onClick={() => setInput(action.replace(/[^a-zA-Z ]/g, "").trim())}
                className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
             >
               {action}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;