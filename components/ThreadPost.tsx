
import React, { useState } from 'react';
import { ThreadPost as ThreadPostType } from '../types';
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal } from 'lucide-react';

interface ThreadPostProps {
  post: ThreadPostType;
}

const ThreadPost: React.FC<ThreadPostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <article className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 p-4 max-w-[470px] mx-auto hover:bg-zinc-900/50 transition-colors cursor-pointer">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 pt-1">
          <div className="w-9 h-9 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
            <img src={post.user.avatar} alt={post.user.username} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="font-semibold text-sm text-zinc-100 truncate">{post.user.username}</span>
              <span className="text-zinc-500 text-xs mt-0.5">• {post.timestamp}</span>
            </div>
            <button className="text-zinc-500 hover:text-zinc-300">
              <MoreHorizontal size={16} />
            </button>
          </div>
          
          <p className="text-sm text-zinc-200 whitespace-pre-wrap mb-3 leading-relaxed">
            {post.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleLike(); }}
              className={`group flex items-center gap-1.5 text-xs transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}
            >
              <div className={`p-1.5 rounded-full group-hover:bg-red-500/10 transition-colors`}>
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
              </div>
              <span>{likesCount > 0 && likesCount}</span>
            </button>

            <button className="group flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300">
              <div className="p-1.5 rounded-full group-hover:bg-zinc-800 transition-colors">
                <MessageCircle size={18} />
              </div>
              <span>{post.replies > 0 && post.replies}</span>
            </button>

            <button className="group flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300">
              <div className="p-1.5 rounded-full group-hover:bg-zinc-800 transition-colors">
                <Repeat2 size={18} />
              </div>
            </button>

            <button className="group flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300">
              <div className="p-1.5 rounded-full group-hover:bg-zinc-800 transition-colors">
                <Send size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadPost;
