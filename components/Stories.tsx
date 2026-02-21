
import React from 'react';
import { Plus } from 'lucide-react';
import { MOCK_STORIES, CURRENT_USER } from '../constants';
import { motion } from 'framer-motion';

const Stories: React.FC = () => {
  const handleStoryClick = (username: string) => {
    alert(`Watching ${username}'s story...`);
  };

  return (
    <div className="py-6 overflow-x-auto no-scrollbar">
      <div className="flex px-4 items-center -space-x-4">
        
        {/* Current User Story Card */}
        <motion.div 
          whileHover={{ y: -8, rotate: 2, zIndex: 50 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-2xl cursor-pointer group transition-all duration-300 border-4 border-zinc-950 z-10"
          onClick={() => handleStoryClick('Your')}
        >
          <img 
            src={CURRENT_USER.avatar} 
            alt="You" 
            className="w-full h-full rounded-xl object-cover brightness-75 group-hover:brightness-100 transition-all" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl flex flex-col justify-end items-center pb-2">
            <span className="text-[10px] font-bold text-white truncate w-full text-center px-1">You</span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-1.5 shadow-lg group-hover:scale-110 transition-transform">
             <Plus size={16} strokeWidth={3} />
          </div>
        </motion.div>

        {/* Other Stories */}
        {MOCK_STORIES.map((story, index) => (
          <motion.div 
            key={story.id} 
            whileHover={{ y: -8, scale: 1.05, zIndex: 50 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-2xl cursor-pointer group transition-all duration-300 border-4 border-zinc-950 ${!story.hasSeen ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-zinc-950' : ''}`}
            style={{ zIndex: 5 - Math.min(index, 4) }} // Stack order
            onClick={() => handleStoryClick(story.user.username)}
          >
            <img 
              src={story.user.avatar} 
              alt={story.user.username} 
              className="w-full h-full rounded-xl object-cover" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-xl flex flex-col justify-end items-center pb-2">
              <span className="text-[10px] font-bold text-zinc-100 truncate w-full text-center px-1 drop-shadow-md">
                {story.user.username}
              </span>
            </div>
            
            {/* Live/New Indicator Dot if not seen */}
            {!story.hasSeen && (
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full border border-zinc-900 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
