
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Globe, Lock } from 'lucide-react';

interface ComposeThreadProps {
  user: UserProfile;
  onClose: () => void;
  onPost: (content: string, visibility: 'public' | 'followers') => void;
}

const ComposeThread: React.FC<ComposeThreadProps> = ({ user, onClose, onPost }) => {
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'followers'>('public');

  const handlePost = () => {
    if (text.trim()) {
      onPost(text, visibility);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
          <button onClick={onClose} className="text-zinc-100 hover:text-zinc-400 font-medium text-sm transition-colors">Cancel</button>
          <h3 className="font-bold text-zinc-100">New Thread</h3>
          <button 
             onClick={handlePost} 
             disabled={!text.trim()}
             className={`font-bold text-sm transition-all ${text.trim() ? 'text-blue-500 hover:text-blue-400' : 'text-zinc-600 cursor-not-allowed'}`}
          >
            Post
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex gap-3 bg-transparent">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-white/10 shadow-lg">
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <div className="w-0.5 flex-grow bg-white/10 rounded-full my-1 min-h-[50px]"></div>
            <div className="w-4 h-4 rounded-full bg-white/5 border border-white/5"></div>
          </div>
          
          <div className="flex-grow pt-1">
            <span className="font-semibold text-zinc-100 block mb-1">@{user.username}</span>
            <textarea
              placeholder="Start a thread..."
              autoFocus
              className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 resize-none outline-none text-lg min-h-[140px] leading-relaxed"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <div className="mt-4 flex items-center justify-between">
              <button 
                onClick={() => setVisibility(visibility === 'public' ? 'followers' : 'public')}
                className="text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center gap-2 px-3 py-1.5 -ml-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
              >
                {visibility === 'public' ? <Globe size={14} /> : <Lock size={14} />}
                {visibility === 'public' ? 'Anyone can reply' : 'Followers can reply'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComposeThread;
