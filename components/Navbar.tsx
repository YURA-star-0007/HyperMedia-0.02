
import React from 'react';
import { Home, Search, Clapperboard, ShoppingBag, User } from 'lucide-react';
import { CURRENT_USER, GeminiLogo } from '../constants';

interface NavbarProps {
  onGeminiToggle: () => void;
  isGeminiOpen: boolean;
  userAvatar?: string;
  onHomeClick: () => void;
  onProfileClick: () => void;
  isActive: 'feed' | 'profile' | 'edit';
}

const Navbar: React.FC<NavbarProps> = ({ 
  onGeminiToggle, 
  isGeminiOpen, 
  userAvatar, 
  onHomeClick, 
  onProfileClick,
  isActive 
}) => {
  const handleSearch = () => alert("Search functionality coming soon! For now, just browse the feed.");
  const handleReels = () => alert("Switching to Reels view...");
  const handleShop = () => alert("Shop: Discover items you might like.");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800 h-14 flex items-center justify-around px-2 text-zinc-100">
      <button 
        onClick={() => { onHomeClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`p-2 transition-transform active:scale-90 ${isActive === 'feed' ? 'text-white' : 'text-zinc-500 hover:text-zinc-100'}`}
      >
        <Home size={24} strokeWidth={isActive === 'feed' ? 3 : 2} />
      </button>
      
      <button 
        onClick={onGeminiToggle}
        className={`p-2 transition-all active:scale-90 rounded-full ${isGeminiOpen ? 'bg-zinc-800 scale-110 shadow-lg shadow-blue-900/20' : ''}`}
      >
        <GeminiLogo className="w-6 h-6" />
      </button>

      <button onClick={handleSearch} className="p-2 transition-transform active:scale-90 text-zinc-500 hover:text-zinc-100">
        <Search size={24} />
      </button>
      <button onClick={handleReels} className="p-2 transition-transform active:scale-90 text-zinc-500 hover:text-zinc-100">
        <Clapperboard size={24} />
      </button>
      <button onClick={handleShop} className="p-2 transition-transform active:scale-90 text-zinc-500 hover:text-zinc-100">
        <ShoppingBag size={24} />
      </button>
      <button 
        onClick={onProfileClick} 
        className={`p-0.5 transition-all active:scale-90 rounded-full border-2 ${isActive === 'profile' || isActive === 'edit' ? 'border-white' : 'border-transparent'}`}
      >
        {userAvatar ? (
          <img src={userAvatar} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
            <User size={14} />
          </div>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
