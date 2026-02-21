
import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Music2, Volume2, VolumeX, StickyNote, X } from 'lucide-react';
import { MOCK_REELS } from '../constants';
import { Reel } from '../types';

interface ReelItemProps {
  reel: Reel;
  isActive: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  onOpenNote: (reel: Reel) => void;
}

const ReelItem: React.FC<ReelItemProps> = ({ reel, isActive, isMuted, toggleMute, onOpenNote }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likes, setLikes] = useState(reel.likes);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative w-full h-full snap-start bg-zinc-950 flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={toggleMute}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>

      {/* Right Side Actions */}
      <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6 z-20">
        <div className="flex flex-col items-center gap-1">
          <button onClick={handleLike} className="active:scale-90 transition-transform">
            <Heart size={32} fill={isLiked ? "#ef4444" : "transparent"} className={isLiked ? "text-red-500" : "text-white"} strokeWidth={isLiked ? 0 : 2} />
          </button>
          <span className="text-white text-xs font-semibold">{likes.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="active:scale-90 transition-transform">
            <MessageCircle size={30} className="text-white" />
          </button>
          <span className="text-white text-xs font-semibold">{reel.comments.toLocaleString()}</span>
        </div>

        {/* Note Button */}
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => onOpenNote(reel)} className="active:scale-90 transition-transform bg-black/20 p-1 rounded-full backdrop-blur-sm">
            <StickyNote size={28} className="text-white" />
          </button>
        </div>

        <button className="active:scale-90 transition-transform">
          <Send size={28} className="text-white" />
        </button>

        <button className="active:scale-90 transition-transform">
          <MoreHorizontal size={28} className="text-white" />
        </button>

        <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden mt-2">
            <img src={reel.user.avatar} className="w-full h-full object-cover animate-spin-slow" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-4 right-16 z-20 text-white">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full border border-white overflow-hidden">
                <img src={reel.user.avatar} className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm shadow-black drop-shadow-md">{reel.user.username}</span>
            <button className="px-3 py-1 rounded-lg border border-white/40 bg-white/20 backdrop-blur-md text-xs font-semibold">Follow</button>
        </div>
        
        <p className="text-sm mb-3 line-clamp-2 drop-shadow-md">
            {reel.caption}
        </p>
        
        <div className="flex items-center gap-2 text-xs bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
            <Music2 size={12} />
            <div className="overflow-hidden w-32">
                 <div className="whitespace-nowrap animate-marquee">
                    {reel.musicTrack} • Original Audio
                 </div>
            </div>
        </div>
      </div>
      
      {/* Mute Indicator */}
      <div className="absolute top-4 right-4 z-30">
          <button onClick={toggleMute} className="bg-black/40 p-2 rounded-full backdrop-blur-sm">
             {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
          </button>
      </div>
    </div>
  );
};

const Reels: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [noteReel, setNoteReel] = useState<Reel | null>(null);
  const [noteText, setNoteText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const handlePostNote = () => {
    if (!noteText.trim()) return;
    alert(`Note added to ${noteReel?.user.username}'s reel! ✨\n"${noteText}"`);
    setNoteReel(null);
    setNoteText('');
  };

  return (
    <div className="relative h-[100dvh] w-full bg-black overflow-hidden">
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {MOCK_REELS.map((reel, index) => (
          <ReelItem 
              key={reel.id} 
              reel={reel} 
              isActive={index === activeIndex} 
              isMuted={isMuted} 
              toggleMute={() => setIsMuted(!isMuted)} 
              onOpenNote={(r) => setNoteReel(r)}
          />
        ))}
      </div>

      {/* Add Notes Pop-up - Updated to Glass Design */}
      {noteReel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-zinc-900/60 backdrop-blur-2xl w-full max-w-xs rounded-[32px] p-6 border border-white/10 shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-4 pl-2">
                 <h3 className="text-lg font-bold text-white">Add Notes</h3>
                 <button onClick={() => setNoteReel(null)} className="p-2 text-zinc-500 hover:text-white transition-colors">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="flex items-center gap-3 mb-6 px-2">
                 <img src={noteReel.user.avatar} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                 <span className="text-xs text-zinc-400">Noting on <span className="text-zinc-100 font-bold">@{noteReel.user.username}</span></span>
              </div>

              <textarea 
                 autoFocus
                 placeholder="Write a note..." 
                 className="w-full bg-black/20 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-6 min-h-[100px] resize-none placeholder-zinc-500"
                 value={noteText}
                 onChange={(e) => setNoteText(e.target.value)}
              />
              
              <div className="flex gap-3">
                 <button 
                    onClick={() => setNoteReel(null)} 
                    className="flex-1 py-3 font-semibold text-zinc-400 hover:bg-white/5 rounded-xl transition-all"
                 >
                    Cancel
                 </button>
                 <button 
                    onClick={handlePostNote}
                    disabled={!noteText.trim()}
                    className="flex-1 py-3 font-semibold bg-blue-600/80 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
                 >
                    Post
                 </button>
              </div>
              <p className="text-[10px] text-zinc-500 mt-6 text-center font-medium">
                This note will be visible to @{noteReel.user.username} and your followers.
              </p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Reels;
