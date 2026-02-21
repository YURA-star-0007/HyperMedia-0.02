
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post as PostType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [localComments, setLocalComments] = useState(post.comments);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);

  const toggleLike = () => {
    if (!isLiked) {
      setShowHeartOverlay(true);
      setTimeout(() => setShowHeartOverlay(false), 1000);
    }
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    alert(`Post by ${post.user.username} shared to your friends!`);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handlePostComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      username: 'design_enthusiast',
      text: comment,
      timestamp: '1m'
    };
    setLocalComments([newComment, ...localComments]);
    setComment('');
  };

  const handleMore = () => {
    alert("Options: Report, Unfollow, Go to post, Share to..., Copy link, Embed");
  };

  return (
    <article className="bg-white/5 backdrop-blur-xl mb-6 border border-white/10 rounded-[32px] overflow-hidden max-w-[470px] mx-auto text-zinc-100 shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px] cursor-pointer"
          >
            <div className="bg-zinc-950 rounded-full p-[2px] h-full w-full">
              <img src={post.user.avatar} alt={post.user.username} className="w-full h-full rounded-full object-cover" />
            </div>
          </motion.div>
          <div>
            <div className="flex items-center">
              <span className="font-bold text-sm hover:underline cursor-pointer">{post.user.username}</span>
              {post.user.isVerified && (
                <svg className="ml-1 text-blue-500 w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/></svg>
              )}
            </div>
            {post.location && <span className="text-xs text-zinc-400 block">{post.location}</span>}
          </div>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleMore} 
          className="text-zinc-500 hover:text-zinc-100 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <MoreHorizontal size={20} />
        </motion.button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-zinc-800/20 flex items-center justify-center relative overflow-hidden">
        <img 
          src={post.image} 
          alt="Post" 
          className="w-full h-full object-cover select-none" 
          onDoubleClick={toggleLike} 
        />
        <AnimatePresence>
          {showHeartOverlay && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute pointer-events-none text-white drop-shadow-2xl"
            >
              <Heart size={100} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Bar */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileTap={{ scale: 1.5 }}
              onClick={toggleLike} 
              className={`transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-zinc-100 hover:text-zinc-400'}`}
            >
              <Heart size={26} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 1.2 }}
              className="text-zinc-100 hover:text-zinc-400"
            >
              <MessageCircle size={26} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 1.2, rotate: -15 }}
              onClick={handleShare} 
              className="text-zinc-100 hover:text-zinc-400"
            >
              <Send size={26} />
            </motion.button>
          </div>
          <motion.button 
            whileTap={{ scale: 1.2 }}
            onClick={handleBookmark} 
            className={`transition-colors ${isBookmarked ? 'text-zinc-100 fill-current' : 'text-zinc-100 hover:text-zinc-400'}`}
          >
            <Bookmark size={26} fill={isBookmarked ? "currentColor" : "none"} />
          </motion.button>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <p className="font-bold text-sm">{likesCount.toLocaleString()} likes</p>
          <p className="text-sm leading-relaxed">
            <span className="font-bold mr-2">{post.user.username}</span>
            {post.caption}
          </p>
          {localComments.length > 0 && (
            <div className="space-y-1 mt-2">
              <AnimatePresence initial={false}>
                {localComments.slice(0, 2).map(c => (
                  <motion.p 
                    key={c.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-zinc-300"
                  >
                    <span className="font-semibold text-zinc-200 mr-2">{c.username}</span>
                    {c.text}
                  </motion.p>
                ))}
              </AnimatePresence>
              {localComments.length > 2 && (
                <button className="text-zinc-500 text-sm block hover:text-zinc-300 mt-1">
                  View all {localComments.length} comments
                </button>
              )}
            </div>
          )}
          <span className="text-[10px] text-zinc-600 uppercase tracking-wide block mt-2">{post.timestamp} ago</span>
        </div>
      </div>

      {/* Add Comment */}
      <div className="px-4 py-3 border-t border-white/5 hidden sm:flex items-center justify-between bg-white/5">
         <div className="flex items-center flex-grow">
           <motion.span 
             whileHover={{ scale: 1.2 }}
             whileTap={{ scale: 0.9 }}
             className="mr-3 cursor-pointer text-lg" 
             onClick={() => alert("Emoji picker opening...")}
           >
             😀
           </motion.span>
           <input 
              type="text" 
              placeholder="Add a comment..." 
              className="text-sm w-full outline-none bg-transparent text-zinc-100 placeholder-zinc-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
           />
         </div>
         <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handlePostComment}
            disabled={!comment.trim()}
            className={`text-sm font-semibold transition-all ${comment.trim() ? 'text-blue-500 cursor-pointer hover:text-blue-400' : 'text-zinc-600 opacity-50 cursor-default'}`}
         >
           Post
         </motion.button>
      </div>
    </article>
  );
};

export default Post;
