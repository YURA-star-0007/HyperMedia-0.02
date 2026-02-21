
import React from 'react';
import { Home, Clapperboard, Store, User, Youtube, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  userAvatar?: string;
  onHomeClick: () => void;
  onProfileClick: () => void;
  onBrowserClick: () => void;
  onReelsClick: () => void;
  onMessagesClick: () => void;
  isActive: 'feed' | 'profile' | 'edit' | 'marketplace' | 'browser' | 'reels' | 'messages';
}

const Navbar: React.FC<NavbarProps> = ({ 
  userAvatar, 
  onHomeClick, 
  onProfileClick,
  onBrowserClick,
  onReelsClick,
  onMessagesClick,
  isActive 
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg px-2 pointer-events-none">
      <nav className={`pointer-events-auto h-16 flex items-center justify-around px-4 rounded-full border border-white/10 shadow-2xl transition-all duration-300 ${
        isActive === 'reels' 
          ? 'bg-black/60 backdrop-blur-2xl' 
          : 'bg-zinc-900/40 backdrop-blur-xl'
      }`}>
        {/* Active Indicator Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>

        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={() => { onHomeClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`relative p-2 transition-all ${isActive === 'feed' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Home size={24} strokeWidth={isActive === 'feed' ? 2.5 : 2} />
          {isActive === 'feed' && <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></motion.div>}
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={onMessagesClick}
          className={`relative p-2 transition-all ${isActive === 'messages' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <MessageCircle size={24} strokeWidth={isActive === 'messages' ? 2.5 : 2} />
          {isActive === 'messages' && <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></motion.div>}
        </motion.button>
        
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={onReelsClick}
          className={`relative p-2 transition-all ${isActive === 'reels' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Clapperboard size={24} strokeWidth={isActive === 'reels' ? 2.5 : 2} />
          {isActive === 'reels' && <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></motion.div>}
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={onBrowserClick} 
          className={`relative p-2 transition-all ${isActive === 'browser' ? 'text-red-500' : 'text-zinc-500 hover:text-red-400'}`}
        >
          <Youtube size={26} strokeWidth={isActive === 'browser' ? 2.5 : 2} />
          {isActive === 'browser' && <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></motion.div>}
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={onProfileClick} 
          className={`p-0.5 transition-all rounded-full border-2 ${isActive === 'profile' || isActive === 'edit' ? 'border-white' : 'border-transparent hover:border-zinc-700'}`}
        >
          {userAvatar ? (
            <img src={userAvatar} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
              <User size={14} />
            </div>
          )}
        </motion.button>
      </nav>
    </div>
  );
};

export default Navbar;
