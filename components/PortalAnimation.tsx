
import React, { useEffect, useState } from 'react';

interface PortalAnimationProps {
  onEnterHub: () => void;
}

const PortalAnimation: React.FC<PortalAnimationProps> = ({ onEnterHub }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content (text + button) after 3 seconds
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] warp-container flex flex-col items-center justify-center">
      {/* Background Warp Rings */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="warp-ring" 
            style={{ 
              width: `${(i + 1) * 100}px`, 
              height: `${(i + 1) * 100}px`,
            }}
          />
        ))}
      </div>

      {/* Center Glow */}
      <div className="absolute w-40 h-40 bg-orange-500 rounded-full blur-[100px] opacity-50 animate-pulse"></div>

      {/* Content Overlay */}
      {showContent && (
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700 text-center px-6">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-10 tracking-tight leading-tight">
            WELCOME TO <br />
            <span className="text-orange-500 underline decoration-white/20 underline-offset-8">HYPER SPACE</span> HUB
          </h1>
          
          <button 
            onClick={onEnterHub}
            className="group relative bg-white text-black text-xl sm:text-2xl font-black py-6 px-12 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            ENTER HUB
            <div className="absolute inset-0 rounded-2xl border-4 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PortalAnimation;
