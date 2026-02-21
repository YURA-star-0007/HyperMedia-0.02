
import React from 'react';
import { Sparkles, Cpu, Settings2, Trophy } from 'lucide-react';

interface HubPageProps {
  onNavigate: (view: 'profile' | 'system' | 'adjust' | 'league') => void;
}

const HubPage: React.FC<HubPageProps> = ({ onNavigate }) => {
  const buttons = [
    { id: 'profile', name: 'Hyper Media', icon: <Sparkles size={40} className="text-orange-400" />, color: 'from-orange-500/20 to-amber-500/10' },
    { id: 'system', name: 'SYSTEM Z', icon: <Cpu size={40} className="text-blue-400" />, color: 'from-blue-500/20 to-cyan-500/10' },
    { id: 'adjust', name: 'ADJUST', icon: <Settings2 size={40} className="text-emerald-400" />, color: 'from-emerald-500/20 to-teal-500/10' },
    { id: 'league', name: 'LEGUE', icon: <Trophy size={40} className="text-purple-400" />, color: 'from-purple-500/20 to-pink-500/10' },
  ];

  return (
    <div className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <h1 className="text-center text-zinc-500 font-black tracking-widest text-xs uppercase mb-12 opacity-50">
          Hyper Space Terminal v1.0
        </h1>
        
        <div className="grid grid-cols-2 gap-8 sm:gap-12">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => onNavigate(btn.id as any)}
              className="flex flex-col items-center group transition-transform active:scale-90"
            >
              <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-zinc-800 bg-gradient-to-br ${btn.color} flex items-center justify-center mb-4 transition-all group-hover:border-zinc-500 group-hover:scale-110 shadow-2xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {btn.icon}
              </div>
              <span className="text-zinc-100 font-black tracking-widest text-sm sm:text-base group-hover:text-white transition-colors">
                {btn.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-zinc-700 font-mono">
        CONNECTED TO HYPER_CLOUD_CORE // ACCESS_LEVEL: ALPHA
      </div>
    </div>
  );
};

export default HubPage;
