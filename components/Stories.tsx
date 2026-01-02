
import React from 'react';
import { MOCK_STORIES, CURRENT_USER } from '../constants';

const Stories: React.FC = () => {
  const handleStoryClick = (username: string) => {
    alert(`Watching ${username}'s story...`);
  };

  return (
    <div className="bg-transparent border-b border-zinc-800 py-4 mb-2 overflow-x-auto no-scrollbar">
      <div className="flex px-4 space-x-4">
        {/* Current User Story */}
        <div className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer" onClick={() => handleStoryClick('Your')}>
          <div className="relative">
            <div className="w-16 h-16 rounded-full p-[2px] border border-zinc-800">
               <img src={CURRENT_USER.avatar} alt="You" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-0.5 border-2 border-zinc-950">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </div>
          <span className="text-[11px] text-zinc-500">Your story</span>
        </div>

        {/* Other Stories */}
        {MOCK_STORIES.map(story => (
          <div 
            key={story.id} 
            className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer"
            onClick={() => handleStoryClick(story.user.username)}
          >
            <div className={`w-16 h-16 rounded-full p-[2px] ${!story.hasSeen ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'border border-zinc-800'}`}>
              <div className="bg-zinc-950 p-[2px] rounded-full w-full h-full">
                <img src={story.user.avatar} alt={story.user.username} className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <span className="text-[11px] truncate w-16 text-center text-zinc-300">{story.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
