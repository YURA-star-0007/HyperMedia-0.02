
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [localComments, setLocalComments] = useState(post.comments);

  const toggleLike = () => {
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
    <article className="bg-zinc-900/50 backdrop-blur-sm mb-4 border border-zinc-800 rounded-sm sm:rounded-md overflow-hidden max-w-[470px] mx-auto text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px]">
            <div className="bg-zinc-950 rounded-full p-[1px] h-full w-full">
              <img src={post.user.avatar} alt={post.user.username} className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-sm hover:underline cursor-pointer">{post.user.username}</span>
              {post.user.isVerified && (
                <svg className="ml-1 text-blue-500 w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/></svg>
              )}
            </div>
            {post.location && <span className="text-[11px] text-zinc-500 block">{post.location}</span>}
          </div>
        </div>
        <button onClick={handleMore} className="text-zinc-500 hover:text-zinc-100">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-zinc-800 flex items-center justify-center">
        <img src={post.image} alt="Post" className="w-full h-full object-cover select-none" onDoubleClick={toggleLike} />
      </div>

      {/* Action Bar */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button onClick={toggleLike} className={`transition-transform active:scale-125 ${isLiked ? 'text-red-500 fill-current' : 'text-zinc-100 hover:text-zinc-400'}`}>
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
            </button>
            <button className="text-zinc-100 hover:text-zinc-400">
              <MessageCircle size={24} />
            </button>
            <button onClick={handleShare} className="text-zinc-100 hover:text-zinc-400">
              <Send size={24} />
            </button>
          </div>
          <button onClick={handleBookmark} className={`transition-transform active:scale-125 ${isBookmarked ? 'text-zinc-100 fill-current' : 'text-zinc-100 hover:text-zinc-400'}`}>
            <Bookmark size={24} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="font-semibold text-sm">{likesCount.toLocaleString()} likes</p>
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.user.username}</span>
            {post.caption}
          </p>
          {localComments.length > 0 && (
            <div className="space-y-1">
              {localComments.slice(0, 2).map(c => (
                <p key={c.id} className="text-sm">
                  <span className="font-semibold mr-2">{c.username}</span>
                  {c.text}
                </p>
              ))}
              {localComments.length > 2 && (
                <button className="text-zinc-500 text-sm block hover:text-zinc-400">
                  View all {localComments.length} comments
                </button>
              )}
            </div>
          )}
          <span className="text-[10px] text-zinc-600 uppercase tracking-wide">{post.timestamp} ago</span>
        </div>
      </div>

      {/* Add Comment */}
      <div className="px-3 py-3 border-t border-zinc-800 hidden sm:flex items-center justify-between">
         <div className="flex items-center flex-grow">
           <span className="mr-2 cursor-pointer" onClick={() => alert("Emoji picker opening...")}>😀</span>
           <input 
              type="text" 
              placeholder="Add a comment..." 
              className="text-sm w-full outline-none bg-transparent text-zinc-100"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
           />
         </div>
         <button 
            onClick={handlePostComment}
            disabled={!comment.trim()}
            className={`text-sm font-semibold transition-opacity ${comment.trim() ? 'text-blue-500 cursor-pointer' : 'text-blue-500 opacity-30 cursor-default'}`}
         >
           Post
         </button>
      </div>
    </article>
  );
};

export default Post;
