
import React, { useState, useEffect, useRef } from 'react';
// Added Star to the lucide-react import
import { ArrowLeft, Video, Camera, Phone, Info, Smile, Mic, Image as ImageIcon, Send, X, Flame, Gift, Heart, PartyPopper, Palette, Play, Edit, Plus, Music, Check, Trash2, Users, Star } from 'lucide-react';
import { MOCK_CHATS, CURRENT_USER, MOCK_NOTES } from '../constants';
import { ChatPreview, ChatMessage, ChatTheme, MessageEffect, Note } from '../types';

interface ChatListProps {
  onBack: () => void;
  onProfileNavigate?: (username: string) => void;
  onChatOpen?: (isOpen: boolean) => void;
}

const THEMES: Record<ChatTheme, string> = {
  default: 'from-blue-600 to-blue-600',
  ocean: 'from-cyan-500 to-blue-500',
  lava: 'from-orange-500 to-red-600',
  forest: 'from-emerald-500 to-teal-600',
  candy: 'from-pink-500 to-purple-600',
};

const ChatBox: React.FC<{ chat: ChatPreview; onBack: () => void; onProfileNavigate?: (username: string) => void }> = ({ chat, onBack, onProfileNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: chat.user.id, text: chat.lastMessage, timestamp: chat.timestamp, effect: 'none' },
    { id: '2', senderId: 'me', text: "Hey! How's it going?", timestamp: '1h', effect: 'none' },
  ]);
  const [input, setInput] = useState('');
  const [activeEffect, setActiveEffect] = useState<MessageEffect>('none');
  const [activeTheme, setActiveTheme] = useState<ChatTheme>('default');
  const [showThemePicker, setShowThemePicker] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = { 
      id: Date.now().toString(), 
      senderId: 'me', 
      text: input, 
      timestamp: 'now', 
      effect: activeEffect,
      isRevealed: activeEffect === 'gift' ? false : true
    };
    setMessages([...messages, newMsg]);
    setInput('');
    setActiveEffect('none');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        senderId: chat.user.id, 
        text: "That sounds awesome! Let me check and get back to you.", 
        timestamp: 'now',
        effect: 'none'
      }]);
    }, 1500);
  };

  const toggleRevealGift = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRevealed: true } : m));
  };

  return (
    <div className={`absolute inset-0 z-[70] bg-zinc-950 flex flex-col animate-in slide-in-from-right duration-300`}>
      {/* Chat Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onProfileNavigate?.(chat.user.username)}>
            <div className="relative">
              <img src={chat.user.avatar} className="w-8 h-8 rounded-full object-cover" alt={chat.user.username} />
              {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-zinc-950 rounded-full"></div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-sm leading-none">{chat.user.username}</h4>
              <p className="text-[10px] text-zinc-500">{chat.isOnline ? 'Active now' : 'Offline'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-zinc-300">
          <button className="hover:text-white transition-colors" onClick={() => setShowThemePicker(!showThemePicker)}><Palette size={20} /></button>
          <button className="hover:text-white transition-colors"><Phone size={22} /></button>
          <button className="hover:text-white transition-colors"><Video size={24} /></button>
          <button className="hover:text-white transition-colors"><Info size={24} /></button>
        </div>
      </div>

      {/* Theme Picker */}
      {showThemePicker && (
        <div className="absolute top-14 right-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-2 rounded-2xl z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          {Object.keys(THEMES).map((t) => (
            <button 
              key={t}
              onClick={() => { setActiveTheme(t as ChatTheme); setShowThemePicker(false); }}
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${THEMES[t as ChatTheme]} border-2 ${activeTheme === t ? 'border-white' : 'border-transparent'}`}
            />
          ))}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6 no-scrollbar bg-black/10">
        <div className="flex flex-col items-center py-6 space-y-2">
           <img 
            src={chat.user.avatar} 
            className="w-20 h-20 rounded-full object-cover border-4 border-white/5 shadow-2xl cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => onProfileNavigate?.(chat.user.username)}
           />
           <h3 className="text-xl font-bold">{chat.user.username}</h3>
           <p className="text-xs text-zinc-500">Hyper Z Community Member</p>
           <button onClick={() => onProfileNavigate?.(chat.user.username)} className="bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold mt-2 border border-white/10 backdrop-blur-md">View Profile</button>
        </div>

        {messages.map((m) => {
          const isMe = m.senderId === 'me';
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div 
                onClick={() => m.effect === 'gift' && !m.isRevealed && toggleRevealGift(m.id)}
                className={`max-w-[75%] px-4 py-2.5 rounded-[22px] text-sm relative group transition-all duration-300 ${
                  isMe 
                    ? `bg-gradient-to-br ${THEMES[activeTheme]} text-white rounded-br-none` 
                    : 'bg-white/5 text-zinc-100 rounded-bl-none border border-white/10'
                } ${m.effect === 'gift' && !m.isRevealed ? 'cursor-pointer hover:scale-105' : ''}`}
              >
                {/* Effect Overlays */}
                {m.effect === 'flame' && <Flame size={12} className="absolute -top-1 -right-1 text-orange-400 animate-bounce" />}
                {m.effect === 'love' && <Heart size={12} className="absolute -top-1 -right-1 text-pink-400 fill-current animate-pulse" />}
                {m.effect === 'congrats' && <PartyPopper size={12} className="absolute -top-1 -right-1 text-yellow-400" />}

                {m.effect === 'gift' && !m.isRevealed ? (
                  <div className="flex items-center gap-2">
                    <Gift size={18} className="animate-bounce" />
                    <span className="font-bold italic">Tap to open!</span>
                  </div>
                ) : (
                  <div className={`${m.effect === 'flame' ? 'text-orange-50' : ''}`}>
                    {m.text}
                  </div>
                )}
                
                {m.effect === 'congrats' && m.isRevealed && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px]">
                    <div className="w-full h-full animate-ping opacity-20 bg-yellow-400/20"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input & Effects Bar */}
      <div className="p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5">
        {/* Effects Selector */}
        <div className="flex gap-4 mb-3 px-2">
          {[
            { id: 'none', icon: <Smile size={18} /> },
            { id: 'flame', icon: <Flame size={18} className="text-orange-500" /> },
            { id: 'gift', icon: <Gift size={18} className="text-purple-400" /> },
            { id: 'love', icon: <Heart size={18} className="text-pink-500" /> },
            { id: 'congrats', icon: <PartyPopper size={18} className="text-yellow-500" /> },
          ].map(eff => (
            <button 
              key={eff.id}
              onClick={() => setActiveEffect(eff.id as any)}
              className={`p-1.5 rounded-full transition-all ${activeEffect === eff.id ? 'bg-white/10 scale-110 shadow-lg' : 'opacity-40 hover:opacity-100'}`}
            >
              {eff.icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:ring-1 focus-within:ring-white/20 transition-all">
          <button className="text-zinc-500 hover:text-white"><Camera size={20} /></button>
          <input 
            type="text" 
            placeholder={activeEffect !== 'none' ? `Send as ${activeEffect}...` : "Message..."} 
            className="flex-grow bg-transparent text-sm outline-none text-white placeholder-zinc-600 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          {input.trim() ? (
            <button onClick={handleSend} className={`font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r ${THEMES[activeTheme]}`}>Send</button>
          ) : (
            <div className="flex gap-3 text-zinc-500">
               <button className="hover:text-white"><Mic size={20} /></button>
               <button className="hover:text-white"><ImageIcon size={20} /></button>
               <button className="hover:text-white"><Smile size={20} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatList: React.FC<ChatListProps> = ({ onBack, onProfileNavigate, onChatOpen }) => {
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [myNotes, setMyNotes] = useState<{ friends?: Note; closeFriends?: Note }>({});
  
  // Note Creation State
  const [noteText, setNoteText] = useState('');
  const [selectedSong, setSelectedSong] = useState<{ title: string; artist: string } | null>(null);
  const [noteVisibility, setNoteVisibility] = useState<'friends' | 'close_friends'>('friends');

  // Friends' notes (Mock data + filter expired)
  const friendsNotes = MOCK_NOTES.filter(n => Date.now() - n.createdAt < 86400000);

  // Users we follow (In this mock, just all MOCK_CHATS)
  const following = MOCK_CHATS;

  // Notify parent of chat state changes
  useEffect(() => {
    onChatOpen?.(selectedChat !== null);
  }, [selectedChat, onChatOpen]);

  const handleCreateNote = () => {
    if (!noteText.trim() && !selectedSong) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      user: CURRENT_USER,
      text: noteText,
      song: selectedSong || undefined,
      visibility: noteVisibility,
      createdAt: Date.now()
    };

    setMyNotes(prev => ({
      ...prev,
      [noteVisibility === 'friends' ? 'friends' : 'closeFriends']: newNote
    }));

    // Reset Creation State
    setNoteText('');
    setSelectedSong(null);
    setIsNoteModalOpen(false);
  };

  const deleteNote = (visibility: 'friends' | 'close_friends') => {
    setMyNotes(prev => ({
      ...prev,
      [visibility === 'friends' ? 'friends' : 'closeFriends']: undefined
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col animate-in slide-in-from-right duration-500 ease-out overflow-hidden">
      {/* Night Sky Decor for the Bubble Map */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      {/* Render ChatBox if selected */}
      {selectedChat && (
        <ChatBox 
          chat={selectedChat} 
          onBack={() => setSelectedChat(null)} 
          onProfileNavigate={onProfileNavigate}
        />
      )}

      {/* Header */}
      {!selectedChat && (
        <div className="px-6 h-20 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400">
              <ArrowLeft size={28} />
            </button>
            <div className="flex flex-col">
              <h1 className="font-black text-xl tracking-tight leading-none">Hyper DMs</h1>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Following Cluster</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all"><Palette size={18} /></button>
            <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all"><Edit size={18} /></button>
          </div>
        </div>
      )}

      {/* Bubble Map Area with Notes Bar */}
      {!selectedChat && (
        <div className="flex-grow flex flex-col">
          {/* Notes Bar */}
          <div className="px-6 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar border-b border-white/5 bg-black/20">
             {/* Your Note Trigger */}
             <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group" onClick={() => setIsNoteModalOpen(true)}>
                <div className="relative">
                  {/* Bubble Cloud */}
                  <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-2xl border border-white/20 min-w-[60px] text-center shadow-2xl transition-all ${myNotes.friends || myNotes.closeFriends ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                     <p className="text-[10px] font-medium leading-tight max-w-[80px] line-clamp-2">
                       {myNotes.friends?.text || myNotes.closeFriends?.text || "Share thought"}
                     </p>
                     {/* Cloud Tail */}
                     <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/20"></div>
                  </div>
                  
                  <div className="w-16 h-16 rounded-full border-2 border-white/10 p-0.5 bg-zinc-900 group-hover:scale-105 transition-all">
                     <img src={CURRENT_USER.avatar} className="w-full h-full rounded-full object-cover" />
                  </div>
                  {/* Add Icon if no note */}
                  {!myNotes.friends && !myNotes.closeFriends && (
                    <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 border-2 border-zinc-950">
                      <Plus size={12} strokeWidth={3} />
                    </div>
                  )}
                  {/* Close Friend Indicator Ring if active */}
                  {myNotes.closeFriends && !myNotes.friends && (
                    <div className="absolute inset-0 rounded-full border-2 border-green-500"></div>
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Note</span>
             </div>

             {/* Friends' Notes */}
             {friendsNotes.map(note => (
               <div key={note.id} className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-pointer" onClick={() => alert(`Replied to ${note.user.username}'s note!`)}>
                  <div className="relative">
                     {/* Bubble Cloud */}
                     <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-2xl border border-white/20 min-w-[80px] text-center shadow-2xl group-hover:bg-white/20 transition-all ${note.visibility === 'close_friends' ? 'border-green-500/50' : 'border-white/20'}`}>
                        <p className="text-[10px] font-medium leading-tight max-w-[100px] line-clamp-2">{note.text}</p>
                        {note.song && (
                          <div className="mt-1 flex items-center justify-center gap-1 text-[8px] text-blue-400 font-bold overflow-hidden">
                             <Music size={8} />
                             <span className="truncate">{note.song.title}</span>
                          </div>
                        )}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/20"></div>
                     </div>

                     <div className={`w-16 h-16 rounded-full p-0.5 border-2 ${note.visibility === 'close_friends' ? 'border-green-500' : 'border-white/10'}`}>
                        <img src={note.user.avatar} className="w-full h-full rounded-full object-cover" />
                     </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{note.user.username}</span>
               </div>
             ))}
          </div>

          {/* DMs Cluster Bubbles */}
          <div className="flex-grow overflow-y-auto no-scrollbar relative p-8">
            <div className="flex flex-wrap items-center justify-center gap-12 max-w-2xl mx-auto py-12">
              {following.map((chat) => {
                const isMonochrome = chat.lastMessageSenderId === 'me' && !chat.isSeen;
                
                const sizeClasses = {
                  1: 'w-16 h-16', 2: 'w-20 h-20', 3: 'w-24 h-24', 4: 'w-28 h-28',
                  5: 'w-32 h-32', 6: 'w-36 h-36', 7: 'w-40 h-40', 8: 'w-44 h-44',
                  9: 'w-48 h-48', 10: 'w-52 h-52',
                };
                
                // @ts-ignore
                const bubbleSize = sizeClasses[chat.messageFrequency] || 'w-28 h-28';

                return (
                  <div 
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`flex flex-col items-center gap-3 transition-all cursor-pointer group animate-float`}
                    style={{ 
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  >
                    <div className="relative group">
                      {chat.unreadCount > 0 && (
                        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/40 transition-all animate-pulse"></div>
                      )}

                      <div className={`${bubbleSize} rounded-full p-1 border-2 border-white/10 overflow-hidden shadow-2xl relative transition-transform group-hover:scale-105 active:scale-95`}>
                        <img 
                          src={chat.user.avatar} 
                          alt={chat.user.username} 
                          className={`w-full h-full rounded-full object-cover transition-all duration-500 ${isMonochrome ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' : 'grayscale-0'}`} 
                        />
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>

                      {chat.isOnline && (
                        <div className="absolute top-1 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-zinc-950 shadow-lg"></div>
                      )}

                      {chat.hasUnreadMedia && (
                        <div className="absolute bottom-1 right-1 w-7 h-7 bg-blue-600 rounded-full border-2 border-zinc-950 shadow-xl flex items-center justify-center text-white">
                          <Play size={10} fill="currentColor" />
                        </div>
                      )}

                      {chat.unreadCount > 0 && (
                        <div className="absolute -top-1 -left-1 bg-red-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-zinc-950 shadow-lg">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center px-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isMonochrome ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-white'}`}>
                        {chat.user.username}
                      </span>
                      {chat.isOnline && <p className="text-[8px] text-green-500 font-bold uppercase tracking-tighter mt-0.5">Live Now</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Note Creation/Management Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-zinc-900/60 backdrop-blur-2xl w-full max-w-sm rounded-[40px] border border-white/20 shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="p-6">
                 <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setIsNoteModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors">Cancel</button>
                    <h2 className="font-black text-white uppercase tracking-widest">Share a Note</h2>
                    <button 
                      onClick={handleCreateNote} 
                      disabled={!noteText.trim() && !selectedSong}
                      className={`font-black text-blue-500 uppercase tracking-widest text-sm ${(!noteText.trim() && !selectedSong) ? 'opacity-30' : 'hover:text-blue-400'}`}
                    >
                      Share
                    </button>
                 </div>

                 {/* Note Box */}
                 <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 mb-8 relative group">
                    <textarea 
                      maxLength={60}
                      autoFocus
                      placeholder="Share a thought..." 
                      className="w-full bg-transparent resize-none outline-none text-white text-lg placeholder-zinc-500 leading-relaxed text-center h-24"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                    />
                    
                    {selectedSong && (
                      <div className="flex items-center justify-center gap-2 bg-white/10 px-3 py-1.5 rounded-full w-fit mx-auto mt-2 border border-white/10">
                        <Music size={12} className="text-blue-400" />
                        <span className="text-[10px] font-bold text-white max-w-[120px] truncate">{selectedSong.title}</span>
                        <button onClick={() => setSelectedSong(null)} className="ml-1 text-zinc-500 hover:text-white"><X size={10} /></button>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                       {noteText.length}/60
                    </div>
                 </div>

                 {/* Music Select Tool */}
                 <div className="flex justify-center mb-8">
                    <button 
                       onClick={() => {
                         const title = prompt("Search song name:");
                         if (title) setSelectedSong({ title, artist: "Various Artists" });
                       }}
                       className={`flex flex-col items-center gap-2 p-4 rounded-3xl transition-all ${selectedSong ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-zinc-500 hover:text-zinc-100'}`}
                    >
                       <Music size={24} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Add Music</span>
                    </button>
                 </div>

                 {/* Visibility Selector */}
                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">Share with:</h3>
                    <div className="grid grid-cols-2 gap-3">
                       <button 
                         onClick={() => setNoteVisibility('friends')}
                         className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${noteVisibility === 'friends' ? 'bg-white/10 border-white/40' : 'bg-transparent border-white/5 opacity-40'}`}
                       >
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center"><Users size={16} /></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Friends</span>
                       </button>
                       <button 
                         onClick={() => setNoteVisibility('close_friends')}
                         className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${noteVisibility === 'close_friends' ? 'bg-green-600/10 border-green-500/40' : 'bg-transparent border-white/5 opacity-40'}`}
                       >
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg"><Star size={16} fill="currentColor" /></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Close Friends</span>
                       </button>
                    </div>
                 </div>

                 {/* Existing Notes Management */}
                 {(myNotes.friends || myNotes.closeFriends) && (
                   <div className="mt-10 pt-6 border-t border-white/5">
                      <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 ml-2">Active Notes</h3>
                      <div className="space-y-3">
                         {myNotes.friends && (
                           <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black uppercase text-blue-400">Common Note</span>
                                 <span className="text-xs text-white truncate max-w-[150px]">{myNotes.friends.text}</span>
                              </div>
                              <button onClick={() => deleteNote('friends')} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                           </div>
                         )}
                         {myNotes.closeFriends && (
                           <div className="flex items-center justify-between p-4 bg-green-500/5 rounded-2xl border border-green-500/20">
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black uppercase text-green-500">Close Friends Note</span>
                                 <span className="text-xs text-white truncate max-w-[150px]">{myNotes.closeFriends.text}</span>
                              </div>
                              <button onClick={() => deleteNote('close_friends')} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                           </div>
                         )}
                      </div>
                   </div>
                 )}
              </div>
              <div className="h-10 bg-white/5 flex items-center justify-center">
                 <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">Notes last 24 hours</p>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      
      {!selectedChat && (
        <div className="h-16 flex items-center justify-center text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em] border-t border-white/5 bg-zinc-950">
          Hyper Network v2.0
        </div>
      )}
    </div>
  );
};

export default ChatList;
