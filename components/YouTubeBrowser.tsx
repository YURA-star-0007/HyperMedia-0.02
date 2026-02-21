
import React, { useState } from 'react';
import { Search, MoreVertical, Bell, Cast, Share, RotateCw } from 'lucide-react';
import { MOCK_YOUTUBE_VIDEOS } from '../constants';

const YouTubeBrowser: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-screen pb-20 text-black font-sans flex flex-col">
      {/* Browser Chrome - ADDRESS BAR HIDDEN (only status bar/minimal actions shown) */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-zinc-100 shadow-sm">
        <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YT" className="h-5" />
        </div>
        <div className="flex items-center gap-5 text-zinc-700">
           <Cast size={22} strokeWidth={1.5} />
           <Bell size={22} strokeWidth={1.5} />
           <Search size={22} strokeWidth={1.5} />
           <div className="w-7 h-7 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-sm">D</div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="bg-white border-b border-zinc-100 py-3 px-4 flex gap-2 overflow-x-auto no-scrollbar sticky top-[53px] z-30">
        {['All', 'New to you', 'Gaming', 'Music', 'Live', 'Mixes', 'AI', 'Podcasts', 'Watched'].map((tag, i) => (
            <button key={tag} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${i===0 ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'}`}>
                {tag}
            </button>
        ))}
      </div>

      {/* Content Feed - Simulating the page at www.youtube.com */}
      <div className="bg-white flex-grow pt-2">
        {MOCK_YOUTUBE_VIDEOS.map((video) => (
             <div key={video.id} className="mb-2 border-b border-zinc-100 pb-4">
                 {/* Video Player Area */}
                 <div className="w-full aspect-video bg-black relative group" onClick={() => setPlayingId(video.id)}>
                     {playingId === video.id ? (
                         <iframe 
                            src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1`}
                            title={video.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                         />
                     ) : (
                         <div className="w-full h-full relative cursor-pointer">
                             <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
                             {/* Play Button Overlay */}
                             <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                                 <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                     <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                                 </div>
                             </div>
                             <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">12:45</span>
                         </div>
                     )}
                 </div>
                 
                 {/* Info */}
                 <div className="flex gap-3 px-3 pt-3 items-start">
                     <img src={video.avatar} className="w-9 h-9 rounded-full mt-0.5 border border-zinc-200" alt={video.channel} />
                     <div className="flex-grow">
                         <h3 className="text-[15px] font-normal text-black leading-tight line-clamp-2 mb-1">{video.title}</h3>
                         <div className="text-xs text-zinc-600 flex flex-wrap items-center gap-1">
                            <span>{video.channel}</span>
                            <span>•</span>
                            <span>{video.views} views</span>
                            <span>•</span>
                            <span>{video.uploaded}</span>
                         </div>
                     </div>
                     <button className="text-zinc-800 p-1">
                        <MoreVertical size={18} />
                     </button>
                 </div>
             </div>
        ))}
        
        <div className="p-8 text-center text-zinc-400 text-sm">
           End of results
        </div>
      </div>
    </div>
  );
};

export default YouTubeBrowser;
