
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Post from './components/Post';
import Navbar from './components/Navbar';
import GeminiChat from './components/GeminiChat';
import SignupFlow from './components/SignupFlow';
import ProfilePage from './components/ProfilePage';
import EditProfile from './components/EditProfile';
import { MOCK_POSTS } from './constants';
import { UserProfile } from './types';
import { Sparkles, X } from 'lucide-react';

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
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

type View = 'feed' | 'profile' | 'edit';

const App: React.FC = () => {
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<View>('feed');
  const [showOnboardingTooltip, setShowOnboardingTooltip] = useState(false);
  const [hasVisitedProfileOnce, setHasVisitedProfileOnce] = useState(false);

  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  const handleSignupComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('feed');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
    if (!hasVisitedProfileOnce) {
      setHasVisitedProfileOnce(true);
      setShowOnboardingTooltip(true);
    }
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
  
  const handleSeeAllSuggestions = () => alert("Showing all suggested accounts...");

  return (
    <div className="min-h-screen bg-transparent pb-16 sm:pb-0 flex flex-col relative text-zinc-100 overflow-x-hidden">
      {/* Night Sky Background Elements */}
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

      {/* Auth Overlay */}
      {!userProfile && <SignupFlow onComplete={handleSignupComplete} />}

      {/* Header (Hidden in Edit View for cleaner look) */}
      {currentView !== 'edit' && <Header />}

      {/* Main Content Area */}
      <main className="flex-grow flex justify-center w-full relative z-10">
        {currentView === 'feed' ? (
          <div className="w-full max-w-[935px] grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
            {/* Feed Column */}
            <section className="lg:col-span-2 w-full">
              <Stories />
              <div className="space-y-4 px-0 sm:px-4 lg:px-0">
                {MOCK_POSTS.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Sidebar (Desktop Only) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6 pt-4 sticky top-20 self-start">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
                   <img 
                      src={userProfile?.avatar && !userProfile.avatar.includes('new_user') ? userProfile.avatar : "https://picsum.photos/seed/placeholder/150/150"} 
                      alt="me" 
                      className="w-14 h-14 rounded-full border border-zinc-700 object-cover bg-zinc-800" 
                   />
                   <div>
                     <p className="font-semibold text-sm text-zinc-100">{userProfile?.username || 'Guest'}</p>
                     <p className="text-zinc-500 text-sm">{userProfile?.nickname || 'Welcome!'}</p>
                   </div>
                 </div>
                 <button onClick={handleSwitchAccount} className="text-blue-500 text-xs font-semibold hover:text-blue-400">
                  {userProfile ? 'Logout' : 'Switch'}
                 </button>
              </div>
              
              <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-zinc-500 font-semibold text-sm">Suggestions for you</h3>
                  <button onClick={handleSeeAllSuggestions} className="text-zinc-100 text-xs font-semibold hover:text-zinc-400">See All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { username: 'creative_mind', label: 'Followed by travel_bug + 2 more' },
                    { username: 'pixel_art', label: 'New to Instagram' },
                    { username: 'foodie_explorer', label: 'Follows you' },
                  ].map(user => (
                    <SidebarUser key={user.username} username={user.username} label={user.label} />
                  ))}
                </div>
              </div>

              <footer className="text-[11px] text-zinc-600 space-y-4 px-4">
                <nav className="flex flex-wrap gap-x-2 gap-y-1 uppercase tracking-tighter">
                  {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms'].map(link => (
                    <a key={link} href="#" onClick={(e) => { e.preventDefault(); alert(`Redirecting to ${link} page...`); }} className="hover:text-zinc-400">{link}</a>
                  ))}
                </nav>
                <p className="font-medium uppercase">&copy; 2024 INSTAGEMINI FROM GOOGLE</p>
              </footer>
            </aside>
          </div>
        ) : currentView === 'profile' && userProfile ? (
          <ProfilePage profile={userProfile} onEdit={() => setCurrentView('edit')} />
        ) : currentView === 'edit' && userProfile ? (
          <EditProfile profile={userProfile} onSave={handleEditSave} onBack={() => setCurrentView('profile')} />
        ) : null}
      </main>

      {/* Onboarding Tooltip Pop-up */}
      {showOnboardingTooltip && currentView === 'profile' && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-blue-400">
            <Sparkles size={20} className="text-yellow-300" />
            <div className="text-sm">
              <p className="font-bold">Welcome!</p>
              <p className="opacity-90">Click "Edit profile" to add your flair! ✨</p>
            </div>
            <button 
              onClick={() => setShowOnboardingTooltip(false)}
              className="p-1 hover:bg-blue-700 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-600"></div>
          </div>
        </div>
      )}

      {/* Gemini AI Chat Overlay */}
      <GeminiChat 
        isOpen={isGeminiOpen} 
        onClose={() => setIsGeminiOpen(false)} 
      />

      {/* Navigation */}
      <Navbar 
        onGeminiToggle={() => setIsGeminiOpen(!isGeminiOpen)}
        isGeminiOpen={isGeminiOpen}
        userAvatar={userProfile?.avatar && !userProfile.avatar.includes('new_user') ? userProfile.avatar : undefined}
        onHomeClick={() => setCurrentView('feed')}
        onProfileClick={handleProfileClick}
        isActive={currentView}
      />
    </div>
  );
};

export default App;
