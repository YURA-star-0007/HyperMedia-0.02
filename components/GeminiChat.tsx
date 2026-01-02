
import React, { useState, useRef, useEffect } from 'react';
import { GeminiLogo } from '../constants';
import { Send, X, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '../types';

interface GeminiChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm your Gemini AI assistant. ✨ Want help writing a clever caption or some photo ideas?", timestamp: new Date() }
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
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await getGeminiResponse(input, history);

    setMessages(prev => [...prev, { role: 'model', content: response, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-end sm:p-6 sm:pb-36 bg-zinc-950/60 backdrop-blur-sm transition-opacity">
      <div className="bg-zinc-900 w-full sm:w-[400px] h-[80vh] sm:h-[550px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-zinc-800 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="flex items-center space-x-2">
            <GeminiLogo className="w-6 h-6" />
            <span className="font-semibold text-zinc-100">Gemini AI</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-100">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar bg-zinc-900/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-900/20' 
                  : 'bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 px-4 py-2.5 rounded-2xl rounded-bl-none border border-zinc-700">
                <Loader2 size={16} className="animate-spin text-zinc-500" />
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-2 flex overflow-x-auto no-scrollbar space-x-2 bg-zinc-900/50">
           {[
             { icon: <Sparkles size={14} className="text-blue-400" />, label: "Caption ideas" },
             { icon: <Wand2 size={14} className="text-purple-400" />, label: "Enhance post" },
           ].map(action => (
             <button 
               key={action.label}
               onClick={() => handleQuickAction(action.label)}
               className="flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-800/50 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
             >
               {action.icon}
               <span>{action.label}</span>
             </button>
           ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900">
          <div className="flex items-center space-x-2 bg-zinc-800/50 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-900/50 transition-all border border-zinc-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Gemini anything..."
              className="flex-grow bg-transparent outline-none text-sm py-2 text-zinc-100 placeholder-zinc-500"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-1.5 rounded-full transition-colors ${
                input.trim() && !isLoading ? 'bg-blue-600 text-white' : 'text-zinc-700'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
