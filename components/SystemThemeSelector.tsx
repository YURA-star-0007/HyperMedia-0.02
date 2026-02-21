
import React, { useState } from 'react';
import { SystemColor, MainTheme, SystemThemeConfig } from '../types';
import { Check, Sun, Moon, Palette } from 'lucide-react';

interface SystemThemeSelectorProps {
  onConfirm: (config: SystemThemeConfig) => void;
  onBack: () => void;
}

const SystemThemeSelector: React.FC<SystemThemeSelectorProps> = ({ onConfirm, onBack }) => {
  const [selectedColor, setSelectedColor] = useState<SystemColor>('Z BLUE');
  const [selectedMain, setSelectedMain] = useState<MainTheme>('Night');

  const colors: { name: SystemColor; class: string }[] = [
    { name: 'Z BLUE', class: 'bg-[#00f2ff]' },
    { name: 'Z RED', class: 'bg-[#ff003c]' },
    { name: 'Z YELLOW', class: 'bg-[#ffdd00]' },
    { name: 'Z PURPLE', class: 'bg-[#bd00ff]' },
    { name: 'Classic Blue', class: 'bg-blue-600' },
    { name: 'Classic Pink', class: 'bg-pink-500' },
    { name: 'Classic Aurora', class: 'aurora-bg' },
  ];

  const handleConfirm = () => {
    onConfirm({ color: selectedColor, mode: selectedMain });
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center p-6 font-system">
      <div className="w-full max-w-xl space-y-12 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-zinc-500 font-bold tracking-[0.3em] text-xs uppercase opacity-70">Initialize Module</h2>
          <h1 className="text-3xl font-black text-white tracking-widest">SYSTEM PREFERENCES</h1>
        </div>

        {/* Color Choice */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Palette className="text-zinc-500" size={18} />
            <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Select Chroma Profile</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${selectedColor === c.name ? 'border-white bg-white/5 ring-1 ring-white shadow-lg' : 'border-zinc-800 bg-zinc-900/50 grayscale hover:grayscale-0 hover:border-zinc-500'}`}
              >
                <div className={`w-10 h-10 rounded-full shadow-inner ${c.class} ${selectedColor === c.name ? 'animate-pulse' : ''}`}></div>
                <span className="text-[10px] font-bold text-center leading-tight">{c.name}</span>
                {selectedColor === c.name && <Check size={12} className="absolute top-2 right-2 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main Theme Choice */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Sun className="text-zinc-500" size={18} />
            <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Select Main Ambience</h3>
          </div>
          <div className="flex gap-4">
            {[
              { id: 'Day', icon: <Sun size={24} />, label: 'Day Phase' },
              { id: 'Night', icon: <Moon size={24} />, label: 'Night Phase' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedMain(t.id as any)}
                className={`flex-1 flex items-center justify-center gap-4 py-6 rounded-2xl border transition-all ${selectedMain === t.id ? 'border-white bg-white/5 text-white' : 'border-zinc-800 bg-zinc-900/50 text-zinc-600 hover:text-zinc-400'}`}
              >
                {t.icon}
                <span className="font-black text-sm tracking-widest">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6">
          <button
            onClick={handleConfirm}
            className="w-full bg-white text-black font-black py-5 rounded-2xl tracking-[0.4em] uppercase text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            Confirm & Initialize
          </button>
          <button
            onClick={onBack}
            className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors"
          >
            Abort Protocol
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemThemeSelector;
