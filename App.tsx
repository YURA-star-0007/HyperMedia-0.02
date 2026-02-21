import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Post from './components/Post';
import Navbar from './components/Navbar';
import GeminiChat from './components/GeminiChat';
import SignupFlow from './components/SignupFlow';
import ProfilePage from './components/ProfilePage';
import EditProfile from './components/EditProfile';
import ThreadPost from './components/ThreadPost';
import ComposeThread from './components/ComposeThread';
import VoiceModal from './components/VoiceModal';
import NotificationPanel from './components/NotificationPanel';
import Marketplace from './components/Marketplace';
import YouTubeBrowser from './components/YouTubeBrowser';
import Reels from './components/Reels';
import ChatList from './components/ChatList';
import PortalAnimation from './components/PortalAnimation';
import HubPage from './components/HubPage';
import AdjustPage from './components/AdjustPage';
import SystemThemeSelector from './components/SystemThemeSelector';
import SystemZ from './components/SystemZ';
import ActionMenu from './components/ActionMenu';
import GoogleSearchModal from './components/GoogleSearchModal';
import ZMusic from './components/ZMusic';
import ConnectAccount from './components/ConnectAccount';
import { MOCK_POSTS, MOCK_THREADS, CURRENT_USER } from './constants';
import { UserProfile, ThreadPost as ThreadPostType, View, SystemThemeConfig } from './types';
import { Sparkles, X, Plus, Search, Play, Pause, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarUser: React.FC<{ username: string; label: string }> = ({ username, label }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => alert(`Visiting ${username}'s profile`)}>
        <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
          <img src={`https://picsum.photos/seed/${username}/50/50`} alt={username} />
        </div>
        <div>
          <p className="font-semibold text-sm text-zinc-100">{username}</p>
          <p className="text-zinc-500 text-[11px] truncate w-32">{label}</p>
        </div>
      </div>
      <button 
        onClick={() => setIsFollowing(!isFollowing)} 
        className={`text-xs font-semibold ${isFollowing ? 'text-zinc-500' : 'text-blue-500'}`}
      >
        <motion.span
          whileTap={{ scale: 0.9 }}
          className="inline-block"
        >
          {isFollowing ? 'Following' : 'Follow'}
        </motion.span>
      </button>
    </div>
  );
};

type FeedMode = 'posts' | 'threads';

const App: React.FC = () => {
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isGoogleSearchOpen, setIsGoogleSearchOpen] = useState(false);
  const [isNavbarHiddenByChat, setIsNavbarHiddenByChat] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    ...CURRENT_USER,
    email: 'design_enthusiast@gmail.com',
    realName: 'Design Enthusiast',
    mobile: '+1234567890',
    nickname: 'Creative Soul',
    backgroundImage: 'https://picsum.photos/seed/bg/800/300',
    bio: 'Capturing moments in pixels. 📸\nAI Art & Design.',
    socialLinks: 'dribbble.com/design',
    postCount: 128,
    followerCount: 4520,
    followingCount: 340
  });

  const [currentView, setCurrentView] = useState<View>('feed');
  const [feedMode, setFeedMode] = useState<FeedMode>('posts');
  const [showOnboardingTooltip, setShowOnboardingTooltip] = useState(false);
  const [hasVisitedProfileOnce, setHasVisitedProfileOnce] = useState(false);
  const [systemTheme, setSystemTheme] = useState<SystemThemeConfig | null>(null);
  
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [threads, setThreads] = useState<ThreadPostType[]>(MOCK_THREADS);
  
  // Global Music State
  const [activeTrack, setActiveTrack] = useState<{
    title: string;
    artist: string;
    cover: string;
    isPlaying: boolean;
  } | null>(null);

  // Swipe Gesture Handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum distance to trigger swipe
    if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swipe Right to Left (Next Tab or Messages)
        onSwipeLeft();
      } else {
        // Swipe Left to Right (Previous Tab or Home)
        onSwipeRight();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const tabs: View[] = ['feed', 'marketplace', 'browser', 'reels', 'profile'];
  
  const onSwipeLeft = () => {
    if (currentView === 'feed') {
      setCurrentView('messages');
    } else if (currentView !== 'messages') {
      const idx = tabs.indexOf(currentView);
      if (idx !== -1 && idx < tabs.length - 1) {
        setCurrentView(tabs[idx + 1]);
      }
    }
  };

  const onSwipeRight = () => {
    if (currentView === 'messages') {
      setCurrentView('feed');
    } else {
      const idx = tabs.indexOf(currentView);
      if (idx > 0) {
        setCurrentView(tabs[idx - 1]);
      }
    }
  };

  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  const handleProfileClick = () => {
    setCurrentView('profile');
    setIsNavbarHiddenByChat(false);
    if (!hasVisitedProfileOnce) {
      setHasVisitedProfileOnce(true);
      setShowOnboardingTooltip(true);
    }
  };

  const handlePortalTrigger = () => {
    setCurrentView('portal-warp');
  };

  const handleEnterHub = () => {
    setCurrentView('hub');
  };

  const handleHubNavigation = (target: 'profile' | 'system' | 'adjust' | 'league') => {
    if (target === 'profile') {
      setCurrentView('profile');
    } else if (target === 'adjust') {
      setCurrentView('adjust');
    } else if (target === 'system') {
      setCurrentView('system-theme-select');
    } else {
      alert(`Warping to ${target.toUpperCase()}... Access restricted in this demo.`);
    }
  };

  const handleThemeConfirmed = (config: SystemThemeConfig) => {
    setSystemTheme(config);
    setCurrentView('system-z');
  };

  const handleEditSave = (updated: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updated });
      setCurrentView('profile');
    }
  };

  const handleSwitchAccount = () => {
    if (confirm("Are you sure you want to log out?")) {
      setUserProfile(null);
      setCurrentView('feed');
      setHasVisitedProfileOnce(false);
      setShowOnboardingTooltip(false);
    }
  };
  
  const handlePostThread = (content: string, visibility: 'public' | 'followers') => {
    if (!userProfile) return;
    const newThread: ThreadPostType = {
      id: Date.now().toString(),
      user: {
        id: userProfile.id,
        username: userProfile.username,
        avatar: userProfile.avatar,
        isVerified: userProfile.isVerified
      },
      content,
      likes: 0,
      replies: 0,
      timestamp: 'Just now',
      isLiked: false,
      visibility
    };
    setThreads([newThread, ...threads]);
    setFeedMode('threads');
  };

  const handleGlobalAction = (type: string) => {
    setIsActionMenuOpen(false);
    switch (type) {
      case 'post':
        alert("Create Post: Select from device or drag and drop photos here.");
        break;
      case 'reel':
        alert("Reel Studio: Select video from device to begin editing.");
        setCurrentView('reels');
        break;
      case 'thread':
        setIsComposeOpen(true);
        break;
      case 'zmusic':
        setCurrentView('zmusic');
        break;
      case 'marketplace':
        setCurrentView('marketplace');
        break;
      case 'connect-account':
        setCurrentView('connect-account');
        break;
      case 'achievement':
        alert("Select a System Z Achievement to share on your feed...");
        break;
      case 'voice':
        alert("Voice Thread: Recording initiated...");
        setIsVoiceOpen(true);
        break;
    }
  };

  const showHeader = ['feed', 'profile', 'threads'].includes(currentView);

  return (
    <div 
      className="min-h-screen bg-transparent pb-24 sm:pb-0 flex flex-col relative text-zinc-100 overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="galaxy-bg" />

      {currentView === 'feed' && (
        <div className="blackhole-bg">
          <img 
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000" 
            alt="Blackhole" 
            className="blackhole-image"
          />
        </div>
      )}

      <div className="moon" />
      {stars.map(star => (
        <div 
          key={star.id} 
          className="star" 
          style={{ 
            left: star.left, 
            top: star.top, 
            width: star.size, 
            height: star.size, 
            // @ts-ignore
            '--duration': star.duration 
          } as React.CSSProperties} 
        />
      ))}

      {currentView === 'portal-warp' && (
        <PortalAnimation onEnterHub={handleEnterHub} />
      )}

      {currentView === 'hub' && (
        <HubPage onNavigate={handleHubNavigation} />
      )}

      {currentView === 'adjust' && (
        <AdjustPage onBack={() => setCurrentView('hub')} />
      )}

      {currentView === 'system-theme-select' && (
        <SystemThemeSelector onConfirm={handleThemeConfirmed} onBack={() => setCurrentView('hub')} />
      )}

      {currentView === 'system-z' && systemTheme && (
        <SystemZ 
          theme={systemTheme} 
          onBack={() => setCurrentView('hub')} 
          onPortalToHub={() => setCurrentView('hub')} 
        />
      )}

      {isActionMenuOpen && (
        <ActionMenu 
          onClose={() => setIsActionMenuOpen(false)} 
          onAction={handleGlobalAction} 
        />
      )}

      <GoogleSearchModal isOpen={isGoogleSearchOpen} onClose={() => setIsGoogleSearchOpen(false)} />

      {isVoiceOpen && <VoiceModal onClose={() => setIsVoiceOpen(false)} />}
      
      <NotificationPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />

      {isComposeOpen && userProfile && (
        <ComposeThread 
          user={userProfile} 
          onClose={() => setIsComposeOpen(false)} 
          onPost={handlePostThread} 
        />
      )}

      {showHeader && (
        <Header 
          currentFeed={feedMode} 
          onSwitchFeed={setFeedMode} 
          onVoiceClick={() => setIsVoiceOpen(true)}
          onGeminiClick={() => setIsGeminiOpen(true)}
          onMessagesClick={() => {
            setCurrentView('messages');
            setIsNavbarHiddenByChat(false);
          }}
        />
      )}

      <main className="flex-grow flex justify-center w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (currentView === 'feed' ? feedMode : '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full flex justify-center"
          >
            {currentView === 'feed' ? (
              <div className="w-full max-w-[935px] grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                <section className="lg:col-span-2 w-full">
                  {feedMode === 'posts' && <Stories />}
                  <div className={`space-y-4 px-0 sm:px-4 lg:px-0 ${feedMode === 'threads' ? 'pt-2' : ''}`}>
                    {feedMode === 'posts' ? (
                      MOCK_POSTS.map(post => <Post key={post.id} post={post} />)
                    ) : (
                      threads.map(thread => <ThreadPost key={thread.id} post={thread} />)
                    )}
                  </div>
                </section>

                <aside className="hidden lg:block lg:col-span-1 space-y-6 pt-4 sticky top-20 self-start">
                  <div className="flex items-center justify-between mb-4">
                     <motion.div 
                       whileTap={{ scale: 0.98 }}
                       className="flex items-center space-x-3 cursor-pointer" 
                       onClick={handleProfileClick}
                     >
                       <img src={userProfile?.avatar || "https://picsum.photos/seed/placeholder/150/150"} alt="me" className="w-14 h-14 rounded-full border border-zinc-700 object-cover bg-zinc-800" />
                       <div>
                         <p className="font-semibold text-sm text-zinc-100">{userProfile?.username || 'Guest'}</p>
                         <p className="text-zinc-500 text-sm">{userProfile?.nickname || 'Welcome!'}</p>
                       </div>
                     </motion.div>
                     <button onClick={handleSwitchAccount} className="text-blue-500 text-xs font-semibold hover:text-blue-400">Logout</button>
                  </div>
                  
                  <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-zinc-500 font-semibold text-sm">Suggestions for you</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { username: 'creative_mind', label: 'Followed by travel_bug + 2 more' },
                        { username: 'pixel_art', label: 'New to Instagram' },
                      ].map(user => <SidebarUser key={user.username} username={user.username} label={user.label} />)}
                    </div>
                  </div>

                  <footer className="text-[11px] text-zinc-600 space-y-4 px-4">
                    <p className="font-medium uppercase">&copy; 2024 HYPER MEDIA FROM GOOGLE</p>
                  </footer>
                </aside>
              </div>
            ) : currentView === 'profile' && userProfile ? (
              <ProfilePage profile={userProfile} onEdit={() => setCurrentView('edit')} onPortalClick={handlePortalTrigger} />
            ) : currentView === 'edit' && userProfile ? (
              <EditProfile profile={userProfile} onSave={handleEditSave} onBack={() => setCurrentView('profile')} />
            ) : currentView === 'marketplace' ? (
              <Marketplace onVoiceSearch={() => setIsVoiceOpen(true)} />
            ) : currentView === 'browser' ? (
              <YouTubeBrowser />
            ) : currentView === 'reels' ? (
              <Reels />
            ) : currentView === 'zmusic' ? (
              <ZMusic 
                onBack={() => setCurrentView('feed')} 
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
              />
            ) : currentView === 'connect-account' ? (
              <ConnectAccount onBack={() => setCurrentView('feed')} />
            ) : currentView === 'messages' ? (
              <ChatList 
                onBack={() => { setCurrentView('feed'); setIsNavbarHiddenByChat(false); }} 
                onChatOpen={(open) => setIsNavbarHiddenByChat(open)}
                onProfileNavigate={(username) => {
                  handleProfileClick();
                }}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentView === 'feed' && userProfile && (
        <>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsActionMenuOpen(true)} 
            className="fixed bottom-28 right-6 sm:bottom-12 sm:right-12 z-40 bg-white/10 backdrop-blur-xl text-white p-5 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all border border-white/20 hover:bg-white/20 group"
            title="Menu"
          >
            <Menu size={32} strokeWidth={2.5} />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsGoogleSearchOpen(true)} 
            className="fixed bottom-28 left-6 sm:bottom-12 sm:left-12 z-40 bg-white/10 backdrop-blur-xl text-blue-400 p-5 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all border border-white/20 hover:bg-white/20 group"
            title="Google Search"
          >
             <div className="flex gap-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Search size={24} strokeWidth={3} />
             </div>
             <div className="relative w-8 h-8 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                <Search size={32} strokeWidth={2.5} />
             </div>
          </motion.button>
        </>
      )}

      <GeminiChat isOpen={isGeminiOpen} onClose={() => setIsGeminiOpen(false)} onVoiceStart={() => setIsVoiceOpen(true)} />

      {activeTrack && currentView !== 'zmusic' && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setCurrentView('zmusic')}
          className="fixed bottom-24 left-4 right-4 z-40 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 flex items-center justify-between cursor-pointer shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <img src={activeTrack.cover} alt="Cover" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p className="text-xs font-bold text-white truncate w-32">{activeTrack.title}</p>
              <p className="text-[10px] text-zinc-500">{activeTrack.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTrack({ ...activeTrack, isPlaying: !activeTrack.isPlaying }); }}
              className="text-white p-2"
            >
              {activeTrack.isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTrack(null); }}
              className="text-zinc-500 p-2"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {!['portal-warp', 'hub', 'adjust', 'system-theme-select', 'system-z'].includes(currentView) && !isNavbarHiddenByChat && (
        <Navbar 
          userAvatar={userProfile?.avatar && !userProfile.avatar.includes('new_user') ? userProfile.avatar : undefined}
          onHomeClick={() => { setCurrentView('feed'); setFeedMode('posts'); setIsNavbarHiddenByChat(false); }}
          onProfileClick={handleProfileClick}
          onBrowserClick={() => { setCurrentView('browser'); setIsNavbarHiddenByChat(false); }}
          onReelsClick={() => { setCurrentView('reels'); setIsNavbarHiddenByChat(false); }}
          onMessagesClick={() => { setCurrentView('messages'); setIsNavbarHiddenByChat(false); }}
          isActive={currentView as any}
        />
      )}
    </div>
  );
};

export default App;