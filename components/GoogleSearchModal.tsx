
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Globe, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface GoogleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleSearchModal: React.FC<GoogleSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [links, setLinks] = useState<{ title: string; uri: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [result]);

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setResult('');
    setLinks([]);

    try {
      // Strictly use process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResult(response.text || "No information found.");
      
      // Extract links from grounding metadata
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedLinks: { title: string; uri: string }[] = [];
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          extractedLinks.push({
            title: chunk.web.title || "Source",
            uri: chunk.web.uri
          });
        }
      });
      setLinks(extractedLinks);
    } catch (error) {
      console.error("Google Search error:", error);
      setResult("I encountered an error while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900/60 backdrop-blur-2xl w-full max-w-lg h-[600px] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/20 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <div className="w-2 h-2 rounded-full bg-[#4285F4]"></div>
              <div className="w-2 h-2 rounded-full bg-[#EA4335]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FBBC05]"></div>
              <div className="w-2 h-2 rounded-full bg-[#34A853]"></div>
            </div>
            <h2 className="font-bold text-lg text-white">Google Search</h2>
          </div>
          {/* Fixed: button uses onClick to trigger onClose */}
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-transparent">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#4285F4] transition-colors" size={20} />
            <input 
              autoFocus
              type="text" 
              placeholder="Ask anything from the web..." 
              className="w-full bg-black/30 border border-white/10 rounded-3xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 transition-all placeholder-zinc-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={!query.trim() || isLoading}
            className="w-full mt-4 bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-black/20"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <><Sparkles size={18} /> Search with AI</>}
          </button>
        </div>

        {/* Results Area */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-black/10 no-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-[#4285F4]/20 border-t-[#4285F4] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe size={16} className="text-[#4285F4] animate-pulse" />
                </div>
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Gathering real-time intel...</p>
            </div>
          ) : result ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl mb-6 shadow-xl backdrop-blur-md">
                <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">{result}</p>
              </div>

              {links.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 pl-2">
                    <ExternalLink size={12} /> Sources & References
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <span className="text-xs text-zinc-300 truncate font-medium group-hover:text-white">{link.title}</span>
                        <ExternalLink size={14} className="text-zinc-600 group-hover:text-[#4285F4] transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-30">
              <Globe size={48} />
              <p className="text-sm font-medium">Real-time search results will appear here</p>
            </div>
          )}
        </div>

        <div className="p-4 text-center border-t border-white/10 bg-white/5">
          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">
            Powered by Gemini x Google Search Grounding
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleSearchModal;
