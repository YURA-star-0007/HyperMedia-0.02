
import React from 'react';
import { Heart, MessageCircle, PlusSquare } from 'lucide-react';

const Header: React.FC = () => {
  const handleAddPost = () => alert("Create Post: Select from computer or drag and drop photos here.");
  const handleActivity = () => alert("Activity: 3 people liked your photos. 1 person followed you.");
  const handleMessages = () => alert("Direct Messages: Opening your inbox...");

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 h-14 px-4 flex items-center justify-between text-zinc-100">
      <div className="flex items-center">
        <h1 className="text-xl font-bold tracking-tight italic cursor-pointer" style={{ fontFamily: 'serif' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          InstaGemini
        </h1>
      </div>
      <div className="flex items-center space-x-5">
        <button onClick={handleAddPost} className="hover:text-zinc-400 transition-colors">
          <PlusSquare size={24} strokeWidth={2} />
        </button>
        <button onClick={handleActivity} className="hover:text-zinc-400 transition-colors">
          <Heart size={24} strokeWidth={2} />
        </button>
        <button onClick={handleMessages} className="relative hover:text-zinc-400 transition-colors">
          <MessageCircle size={24} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
