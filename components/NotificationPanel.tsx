
import React from 'react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { X, UserPlus, Users, Heart, MessageSquare } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 flex flex-col items-center pt-16 sm:pt-20 px-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-top-[100%] duration-[600ms] ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5 sticky top-0 z-10">
          <h2 className="text-lg font-bold text-white pl-2">Notifications</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh] no-scrollbar p-2">
          {MOCK_NOTIFICATIONS.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">No new notifications</div>
          ) : (
            MOCK_NOTIFICATIONS.map(notif => (
              <div key={notif.id} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-3xl transition-colors cursor-pointer group">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                   <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-lg">
                     <img src={notif.user.avatar} alt={notif.user.username} className="w-full h-full object-cover" />
                   </div>
                   {/* Icon badge */}
                   <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-900 border border-white/10 shadow-md">
                     {notif.type === 'follow' && <UserPlus size={10} className="text-blue-500" />}
                     {notif.type === 'close_friend_req' && <Users size={10} className="text-green-500" />}
                     {notif.type === 'post' && <Heart size={10} className="text-red-500" />}
                     {notif.type === 'thread' && <MessageSquare size={10} className="text-purple-500" />}
                   </div>
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <p className="text-sm text-zinc-200 leading-snug">
                    <span className="font-bold mr-1">{notif.user.username}</span>
                    {notif.type === 'follow' && 'started following you.'}
                    {notif.type === 'close_friend_req' && 'sent a Close Friend request.'}
                    {notif.content}
                    <span className="text-zinc-500 ml-2 text-xs">{notif.timestamp}</span>
                  </p>
                </div>

                {/* Actions / Preview */}
                <div className="flex-shrink-0">
                  {notif.type === 'follow' && (
                    <button className="bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                      Follow
                    </button>
                  )}
                  {notif.type === 'close_friend_req' && (
                    <div className="flex gap-1">
                       <button className="bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-lg shadow-blue-900/20">
                         Accept
                       </button>
                       <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all">
                         Decline
                       </button>
                    </div>
                  )}
                  {notif.previewImage && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-md">
                      <img src={notif.previewImage} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-white/5 text-center bg-white/5">
             <p className="text-xs text-zinc-500 font-medium">Swipe up to close</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
