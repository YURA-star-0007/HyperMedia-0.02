
import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Share2, Globe, User, Shield, Zap, Sparkles, 
  Instagram, Facebook, MessageSquare, MessageCircle, Smartphone, 
  Gamepad2, GraduationCap, Briefcase, Camera, Loader2, Save
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AdjustPageProps {
  onBack: () => void;
}

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-zinc-800">
    <div className="text-orange-500">{icon}</div>
    <h3 className="text-zinc-100 font-black tracking-widest text-sm uppercase">{title}</h3>
  </div>
);

const AdjustPage: React.FC<AdjustPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'social' | 'private' | 'ai' | 'path'>('social');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [socials, setSocials] = useState<Record<string, boolean>>({});
  const toggleSocial = (id: string) => setSocials(prev => ({ ...prev, [id]: !prev[id] }));

  const handleGenerateAvatar = async () => {
    setIsGenerating(true);
    setUploadProgress(0);
    
    // Simulate upload/process
    const interval = setInterval(() => {
      setUploadProgress(p => p < 100 ? p + 5 : p);
    }, 150);

    try {
      // Strictly use process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Describe a futuristic hyper-space avatar for a social media enthusiast who loves tech and gaming. Keep it under 30 words.",
      });
      
      setTimeout(() => {
        clearInterval(interval);
        setGeneratedAvatar(`https://picsum.photos/seed/${Math.random()}/500/500`);
        setIsGenerating(false);
        alert(`AI Generated Design: ${response.text}`);
      }, 3000);
    } catch (err) {
      clearInterval(interval);
      setIsGenerating(false);
      alert("AI Lab connection failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-zinc-950 flex flex-col animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20">
        <button onClick={onBack} className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-black tracking-[0.2em] text-zinc-100 uppercase">System Adjust</h2>
          <span className="text-[10px] text-orange-500 font-mono">HYPER_SPACE_MODULE_v2.4</span>
        </div>
        <button onClick={() => alert("All settings synced to Hyper Media cloud.")} className="text-orange-500 p-2 hover:bg-orange-500/10 rounded-full transition-all">
          <Save size={24} />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-zinc-900/50 p-1 mx-6 mt-6 rounded-xl border border-zinc-800">
        {[
          { id: 'social', label: 'Connect', icon: <Globe size={16} /> },
          { id: 'private', label: 'Specs', icon: <User size={16} /> },
          { id: 'ai', label: 'AI Lab', icon: <Sparkles size={16} /> },
          { id: 'path', label: 'The Path', icon: <Zap size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-orange-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto no-scrollbar p-6">
        <div className="max-w-2xl mx-auto">
          
          {/* TAB: SOCIAL */}
          {activeTab === 'social' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <SectionHeader icon={<Share2 size={18} />} title="Network Integration" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { id: 'ig', name: 'Instagram', icon: <Instagram size={24} />, color: 'hover:text-pink-500' },
                  { id: 'fb', name: 'Facebook', icon: <Facebook size={24} />, color: 'hover:text-blue-500' },
                  { id: 'tg', name: 'Telegram', icon: <Smartphone size={24} />, color: 'hover:text-sky-400' },
                  { id: 'ds', name: 'Discord', icon: <MessageSquare size={24} />, color: 'hover:text-indigo-400' },
                  { id: 'wa', name: 'WhatsApp', icon: <MessageCircle size={24} />, color: 'hover:text-emerald-500' },
                  { id: 'sc', name: 'Snapchat', icon: <Camera size={24} />, color: 'hover:text-yellow-400' },
                  { id: 'ms', name: 'Microsoft', icon: <Shield size={24} />, color: 'hover:text-blue-600' },
                  { id: 'xb', name: 'Xbox', icon: <Gamepad2 size={24} />, color: 'hover:text-green-500' },
                  { id: 'go', name: 'Google', icon: <Globe size={24} />, color: 'hover:text-red-400' },
                ].map(social => (
                  <button
                    key={social.id}
                    onClick={() => toggleSocial(social.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${socials[social.id] ? 'bg-zinc-100 border-white text-zinc-950' : 'bg-zinc-900 border-zinc-800 text-zinc-500 ' + social.color}`}
                  >
                    {social.icon}
                    <span className="text-[10px] font-black uppercase mt-3 tracking-widest">{social.name}</span>
                    {socials[social.id] && <div className="mt-2 text-[8px] bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">CONNECTED</div>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRIVATE SPECS */}
          {activeTab === 'private' && (
            <div className="space-y-10 animate-in fade-in duration-300 pb-20">
              <div>
                <SectionHeader icon={<Shield size={18} />} title="Biometric & Personal Data" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: 'Location', placeholder: 'Planet Earth, Orion Arm' },
                    { label: 'Height (cm)', placeholder: '180' },
                    { label: 'Weight (kg)', placeholder: '75' },
                    { label: 'Skin Complexion', placeholder: 'Vibrant' },
                    { label: 'Family Unit Size', placeholder: '4' },
                    { label: 'Custom Intel', placeholder: 'Secret clearance...' },
                  ].map(field => (
                    <div key={field.label} className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{field.label}</label>
                      <input 
                        type="text" 
                        placeholder={field.placeholder}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader icon={<GraduationCap size={18} />} title="Academic Module" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: 'School / College', placeholder: 'Hyper Academy' },
                    { label: 'Class / Level', placeholder: 'Senior Grade' },
                    { label: 'Roll / ID Number', placeholder: 'HZ-001' },
                  ].map(field => (
                    <div key={field.label} className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{field.label}</label>
                      <input 
                        type="text" 
                        placeholder={field.placeholder}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: AI LAB */}
          {activeTab === 'ai' && (
            <div className="space-y-8 animate-in fade-in duration-300 flex flex-col items-center">
              <SectionHeader icon={<Sparkles size={18} />} title="AI Avatar Synthesis" />
              
              <div 
                className={`w-full aspect-square max-w-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-6 cursor-pointer transition-all overflow-hidden relative ${isGenerating ? 'border-orange-500 bg-orange-500/5' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}
                onClick={() => !isGenerating && fileInputRef.current?.click()}
              >
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4 text-center p-8">
                    <Loader2 size={48} className="text-orange-500 animate-spin" />
                    <div className="space-y-1">
                      <p className="text-sm font-black text-zinc-100 uppercase tracking-widest">Synthesizing Avatar...</p>
                      <p className="text-[10px] text-zinc-500 font-mono">Processing Neural Patterns [{uploadProgress}%]</p>
                    </div>
                  </div>
                ) : generatedAvatar ? (
                  <img src={generatedAvatar} alt="Generated Avatar" className="w-full h-full object-cover animate-in zoom-in duration-500" />
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:scale-110 transition-transform">
                      <Camera size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-200">Upload Source Images</p>
                      <p className="text-xs text-zinc-500 mt-1">AI will reconstruct your digital identity</p>
                    </div>
                  </>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple />
              </div>

              {!generatedAvatar && !isGenerating && (
                <button 
                  onClick={handleGenerateAvatar}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-orange-900/20 active:scale-95 transition-all uppercase tracking-[0.2em] text-sm"
                >
                  Generate Avatar
                </button>
              )}

              {generatedAvatar && (
                <button 
                  onClick={() => setGeneratedAvatar(null)}
                  className="text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest"
                >
                  Clear and Regenerate
                </button>
              )}
            </div>
          )}

          {/* TAB: THE PATH */}
          {activeTab === 'path' && (
            <div className="space-y-10 animate-in fade-in duration-300 pb-20">
              <div>
                <SectionHeader icon={<Briefcase size={18} />} title="Core Aspirations" />
                <div className="flex flex-wrap gap-3">
                  {['eSports Pro', 'Business Mogul', 'Athlete', 'Scientist', 'Artisan', 'Influencer', 'Engineer', 'Special Ops'].map(path => (
                    <button key={path} className="px-5 py-3 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-xs font-bold hover:border-orange-500 hover:text-white transition-all">
                      {path}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader icon={<Gamepad2 size={18} />} title="The Grind (Target Fields)" />
                <div className="space-y-6">
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {['Free Fire', 'BGMI / PUBG', 'Mobile Legends', 'Minecraft BE', 'Valorant', 'Fortnite', 'Minecraft Java', 'PUBG PC', 'CS2', 'Overwatch', 'LoL'].map(game => (
                        <div key={game} className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group hover:border-zinc-700 transition-colors cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-orange-500" />
                          <span className="text-xs text-zinc-300 font-medium group-hover:text-white">{game}</span>
                        </div>
                      ))}
                   </div>
                   
                   <div className="pt-4 border-t border-zinc-900">
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Mastery / Training Focus</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {[
                           'Body Recomposition (Gym)', 'Weapon Mastery / Tactics', 
                           'Content Creation (YouTube)', 'Streaming (Twitch/Kick)', 
                           'Instagram Influence', 'Digital Art Mastery'
                         ].map(skill => (
                            <div key={skill} className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                              <span className="text-xs text-zinc-300">{skill}</span>
                              <div className="w-12 h-6 bg-zinc-800 rounded-full relative p-1 cursor-pointer">
                                <div className="w-4 h-4 bg-zinc-600 rounded-full"></div>
                              </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Progress/Status Bar */}
      <div className="h-10 bg-orange-600 flex items-center px-6 justify-between text-[10px] font-bold text-white uppercase tracking-widest">
        <span>Identity Sync Active</span>
        <span className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          Node: 0xHYPM-ADJ
        </span>
      </div>
    </div>
  );
};

export default AdjustPage;
