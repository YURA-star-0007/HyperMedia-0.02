
import React from 'react';
import { MessageCircle, Search, Mic } from 'lucide-react';
import { GeminiLogo } from '../constants';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentFeed: 'posts' | 'threads';
  onSwitchFeed: (feed: 'posts' | 'threads') => void;
  onVoiceClick: () => void;
  onGeminiClick: () => void;
  onMessagesClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentFeed, onSwitchFeed, onVoiceClick, onGeminiClick, onMessagesClick }) => {
  const handleSearch = () => alert("Search functionality coming soon! Try the voice search.");

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 h-14 px-4 flex items-center justify-between text-zinc-100">
      
      {/* Feed Toggle Centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex bg-zinc-900/50 rounded-lg p-0.5 border border-zinc-800/50">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onSwitchFeed('posts')}
          className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${currentFeed === 'posts' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Feed
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onSwitchFeed('threads')}
          className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${currentFeed === 'threads' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Threads
        </motion.button>
      </div>

      <div className="flex items-center">
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold tracking-tight italic cursor-pointer hidden sm:block" 
          style={{ fontFamily: 'serif' }} 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Hyper Media
        </motion.h1>
      </div>

      <div className="flex items-center space-x-4">
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={onGeminiClick}
          className="hover:bg-zinc-800 transition-colors p-1.5 rounded-full"
        >
          <GeminiLogo className="w-6 h-6" />
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={onVoiceClick} 
          className="hover:text-zinc-400 transition-colors bg-zinc-800/50 p-1.5 rounded-full"
        >
            <Mic size={20} />
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={handleSearch} 
          className="hover:text-zinc-400 transition-colors hidden sm:block"
        >
            <Search size={24} strokeWidth={2} />
        </motion.button>
        {/* Messages Button */}
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={onMessagesClick} 
          className="relative hover:text-zinc-400 transition-colors"
        >
          <MessageCircle size={24} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
