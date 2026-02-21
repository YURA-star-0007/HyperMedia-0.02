
import React, { useState, useEffect, useRef } from 'react';
import { SystemThemeConfig, SystemColor, SystemActivity, Achievement, Clan } from '../types';
import { 
  Home, Trophy, Map as MapIcon, Users, User, 
  Zap, Loader2, MessageSquare, Send, Search,
  Compass, Shield, Target, Sword, Book, Briefcase, Plus,
  Camera, Settings, ArrowLeft, Heart, Image as ImageIcon
} from 'lucide-react';

interface SystemZProps {
  theme: SystemThemeConfig;
  onBack: () => void;
  onPortalToHub: () => void;
}

type SystemTab = 'home' | 'achievements' | 'scan' | 'clan' | 'profile';

const SystemZ: React.FC<SystemZProps> = ({ theme, onBack, onPortalToHub }) => {
  const [activeTab, setActiveTab] = useState<SystemTab>('home');
  const [showGreeting, setShowGreeting] = useState(true);
  const [isBegun, setIsBegun] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({ 
    lvl: 1, hp: 100, mp: 100, str: 14, agi: 12, int: 15, 
    exp: 45, nextExp: 100, gold: 1200, title: 'Aspiring Player',
    crystals: 8, milestones: 14, hyperCoins: 500
  });

  const themeColors: Record<SystemColor, string> = {
    'Z BLUE': '#00f2ff',
    'Z RED': '#ff003c',
    'Z YELLOW': '#ffdd00',
    'Z PURPLE': '#bd00ff',
    'Classic Blue': '#2563eb',
    'Classic Pink': '#ec4899',
    'Classic Aurora': '#23a6d5',
  };

  const accentColor = themeColors[theme.color];
  const isNight = theme.mode === 'Night';

  const topics = [
    { id: 'exploring', label: 'Exploring', icon: <Target size={20} /> },
    { id: 'esports', label: 'eSports Gaming', icon: <Zap size={20} /> },
    { id: 'gym', label: 'Gym Training', icon: <Trophy size={20} /> },
    { id: 'weapons', label: 'Weapon Mastering', icon: <Sword size={20} /> },
    { id: 'studying', label: 'Studying', icon: <Book size={20} /> },
    { id: 'working', label: 'Working', icon: <Briefcase size={20} /> },
  ];

  const handleBegin = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsBegun(true);
      setShowGreeting(false);
    }, 1500);
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col font-system overflow-hidden ${isNight ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{ '--accent': accentColor } as any}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className={`absolute top-0 left-0 w-full h-full ${theme.color === 'Classic Aurora' ? 'aurora-bg' : ''}`} style={{ backgroundColor: theme.color === 'Classic Aurora' ? '' : accentColor }}></div>
      </div>

      {/* Greeting/Onboarding Phase */}
      {showGreeting && (
        <div className="absolute inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="system-window max-w-sm w-full p-8 border-2 animate-in zoom-in duration-500" style={{ borderColor: accentColor }}>
            {!isBegun && !isGenerating ? (
              <div className="text-center space-y-6">
                <h2 className="text-[10px] font-bold tracking-[0.4em] opacity-60 uppercase">System Initialized</h2>
                <div className="w-16 h-16 rounded-full border-2 border-dashed mx-auto flex items-center justify-center animate-spin-slow" style={{ borderColor: accentColor }}>
                  <Zap style={{ color: accentColor }} size={32} />
                </div>
                <p className="text-sm font-medium leading-relaxed tracking-wider">
                  Greetings, Player. Welcome to <span className="font-black">SYSTEM X</span>. 
                  Choose your focus topics to generate custom quests.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map(t => (
                    <button
                      key={t.id}
                      onClick={() => toggleTopic(t.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${selectedTopics.includes(t.id) ? 'bg-white/10' : 'opacity-40 border-transparent'}`}
                      style={{ borderColor: selectedTopics.includes(t.id) ? accentColor : 'transparent', color: selectedTopics.includes(t.id) ? accentColor : 'inherit' }}
                    >
                      {t.icon}
                      <span className="text-[8px] font-black uppercase tracking-widest">{t.label}</span>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleBegin}
                  disabled={selectedTopics.length === 0}
                  className="w-full py-3 font-black tracking-widest text-xs uppercase transition-all hover:bg-white hover:text-black disabled:opacity-20"
                  style={{ border: `1px solid ${accentColor}`, color: accentColor }}
                >
                  Let's Begin
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Loader2 className="animate-spin mx-auto" size={40} style={{ color: accentColor }} />
                <p className="text-xs font-black tracking-[0.2em] uppercase">Generating Reality Quests...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      {isBegun && (
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-900 bg-black/40 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded border flex items-center justify-center bg-black/50" style={{ borderColor: accentColor }}>
              <span className="font-black text-lg" style={{ color: accentColor }}>{stats.lvl}</span>
            </div>
            <div>
               <h2 className="text-xs font-black tracking-widest uppercase">SYSTEM_X_NODE</h2>
               <div className="flex gap-2 mt-1">
                  <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                     <div className="h-full bg-white shadow-[0_0_8px_white]" style={{ width: `${(stats.exp/stats.nextExp)*100}%` }}></div>
                  </div>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-amber-500">{stats.gold} G</span>
                <span className="text-[10px] font-black text-blue-400">{stats.hyperCoins} HC</span>
                <span className="text-[8px] opacity-40 font-mono tracking-tighter">{stats.title}</span>
             </div>
             <button onClick={onBack} className="p-2 opacity-50 hover:opacity-100"><Settings size={18} /></button>
          </div>
        </header>
      )}

      {/* Content Area */}
      <main className="flex-grow overflow-y-auto no-scrollbar relative p-4 space-y-6">
        {isBegun && activeTab === 'home' && <HomeView accentColor={accentColor} />}
        {isBegun && activeTab === 'achievements' && <AchievementView accentColor={accentColor} />}
        {isBegun && activeTab === 'scan' && <ScanView accentColor={accentColor} />}
        {isBegun && activeTab === 'clan' && <ClanView accentColor={accentColor} />}
        {isBegun && activeTab === 'profile' && <ProfileView stats={stats} accentColor={accentColor} onPortal={onPortalToHub} />}
      </main>

      {/* Bottom Nav */}
      {isBegun && (
        <nav className="h-16 border-t border-zinc-900 bg-black/80 backdrop-blur-xl flex items-center justify-around px-2 z-20 shrink-0">
          {[
            { id: 'home', icon: <Home size={22} />, label: 'HOME' },
            { id: 'achievements', icon: <Trophy size={22} />, label: 'RANK' },
            { id: 'scan', icon: <Compass size={24} />, label: 'SCAN' },
            { id: 'clan', icon: <Users size={22} />, label: 'CLAN' },
            { id: 'profile', icon: <User size={22} />, label: 'USER' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SystemTab)}
              className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${activeTab === tab.id ? 'scale-110' : 'opacity-30 grayscale hover:opacity-100 hover:grayscale-0'}`}
              style={{ color: activeTab === tab.id ? accentColor : 'inherit' }}
            >
              {tab.icon}
              <span className="text-[8px] font-black tracking-widest uppercase">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }}></div>
              )}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

// --- SUB-VIEWS ---

const HomeView: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const missions = [
    { id: 'ff1', game: 'Free Fire', title: 'BR/CS Rank Grind', task: 'Kill 25 players in Rank matches', progress: 12, total: 25, reward: '100 HC + 50 EXP' },
    { id: 'ff2', game: 'Free Fire', title: 'Daily Warrior', task: 'Play 10 matches', progress: 4, total: 10, reward: '50 HC + 20 EXP' },
    { id: 'mc1', game: 'Minecraft', title: 'Mob Hunter', task: 'Kill 10 hostile mobs', progress: 7, total: 10, reward: '30 HC + 15 EXP' },
    { id: 'mc2', game: 'Minecraft', title: 'Time Explorer', task: 'Play for 30 minutes', progress: 15, total: 30, reward: '40 HC + 20 EXP' },
  ];

  const activities: SystemActivity[] = [
    { id: '1', user: { id: 'a', username: 'ZERO_COLD', avatar: 'https://picsum.photos/seed/s1/100/100' }, type: 'quest', content: 'Completed Weekly Mission: Silent Abyss II', timestamp: '4m ago' },
    { id: '2', user: { id: 'b', username: 'FLARE_Z', avatar: 'https://picsum.photos/seed/s2/100/100' }, type: 'achievement', content: 'Claimed Title: "First of the Pack"', timestamp: '12m ago' },
    { id: '3', user: { id: 'c', username: 'NEO_RAID', avatar: 'https://picsum.photos/seed/s3/100/100' }, type: 'meetup', content: 'Met with 3 Users for Hidden Quest: "Lost Echoes"', timestamp: '45m ago' },
    { id: '4', user: { id: 'd', username: 'VOID_MASTER', avatar: 'https://picsum.photos/seed/s4/100/100' }, type: 'clan', content: 'Created new Clan: [HYPER_ELITE]', timestamp: '2h ago' },
    { id: '5', user: { id: 'e', username: 'STORM_B', avatar: 'https://picsum.photos/seed/s5/100/100' }, type: 'record', content: 'Broke highest Gym record for Strength Training', timestamp: '5h ago' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Gaming Missions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Gaming Missions</h3>
          <span className="text-[8px] text-emerald-500 font-bold">TRACKING ACTIVE</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {missions.map(mission => (
            <div key={mission.id} className="system-window p-4 border border-white/5 bg-zinc-900/40">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{mission.game}</span>
                  <h4 className="text-xs font-black text-white uppercase mt-0.5">{mission.title}</h4>
                </div>
                <span className="text-[9px] font-black text-amber-500">{mission.reward}</span>
              </div>
              <p className="text-[10px] text-zinc-400 mb-3">{mission.task}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[8px] font-bold text-zinc-500">
                  <span>PROGRESS</span>
                  <span>{mission.progress} / {mission.total}</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white shadow-[0_0_8px_white]" 
                    style={{ width: `${(mission.progress / mission.total) * 100}%`, backgroundColor: accentColor }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Recent Feed</h3>
        <span className="text-[8px] opacity-40 font-mono">Sync: ONLINE</span>
      </div>
      <div className="space-y-3">
        {activities.map(act => (
          <div key={act.id} className="system-window p-3 flex gap-3 border-l-2 group hover:bg-white/5 transition-colors" style={{ borderLeftColor: accentColor }}>
            <div className="w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-white/10">
              <img src={act.user.avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: accentColor }}>{act.user.username}</span>
                <span className="text-[8px] opacity-40">{act.timestamp}</span>
              </div>
              <p className="text-[10px] opacity-80 leading-tight truncate">{act.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AchievementView: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const achievements: Achievement[] = [
    { id: 'lvl50', title: 'Level 50 Achieved', description: 'Reach level 50 in any connected game.', unlocked: true, claimable: true, reward: '500 HC + Elite Title' },
    { id: 'lvl70', title: 'Level 70 Achieved', description: 'Reach level 70 in any connected game.', unlocked: false, claimable: false, reward: '1000 HC + Master Title' },
    { id: 'lvl90', title: 'Level 90 Achieved', description: 'Reach level 90 in any connected game.', unlocked: false, claimable: false, reward: '2000 HC + Legend Title' },
    { id: 'lvl100', title: 'Centurion Player', description: 'Reach level 100 in any connected game.', unlocked: false, claimable: false, reward: '5000 HC + God Tier Skin' },
    { id: 'a1', title: 'Special Quest: Alpha', description: 'Complete a quest within the first 24h.', unlocked: true, claimable: false, reward: '+20 STR' },
    { id: 'a2', title: '10 Day Login Streak', description: 'Show your persistence, Player.', unlocked: true, claimable: true, reward: 'Title: DETERMINED' },
    { id: 'a3', title: '30 Day Login Streak', description: 'Consistency is power.', unlocked: false, claimable: false, reward: '+5000 GOLD' },
    { id: 'a4', title: '100 Day Login Streak', description: 'The peak of dedication.', unlocked: false, claimable: false, reward: 'Exotic Skin: RADIANT' },
    { id: 'a5', title: 'Master of Forms', description: 'Connect 5+ social accounts.', unlocked: true, claimable: false, reward: 'CONNECTED Title' },
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
      <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Progression & Claims</h3>
      <div className="space-y-3">
        {achievements.map(ach => (
          <div 
            key={ach.id} 
            className={`system-window p-4 border transition-all relative ${ach.unlocked ? 'opacity-100' : 'opacity-40'}`} 
            style={{ borderColor: ach.claimable ? accentColor : 'rgba(255,255,255,0.05)' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h4 className="text-xs font-black tracking-widest uppercase">{ach.title}</h4>
                <p className="text-[9px] opacity-50 leading-tight">{ach.description}</p>
              </div>
              {ach.claimable && (
                <button className="bg-white text-black text-[9px] font-black py-1.5 px-3 rounded shadow-lg hover:scale-105 active:scale-95 transition-all">CLAIM</button>
              )}
            </div>
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden mb-2">
               <div className={`h-full ${ach.unlocked ? 'w-full' : 'w-1/4'}`} style={{ backgroundColor: accentColor }}></div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono opacity-50 uppercase">
               <span>Reward: {ach.reward}</span>
               {ach.unlocked && <Zap size={12} style={{ color: accentColor }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScanView: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in zoom-in duration-500">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">System Radar</h3>
        <span className="text-[8px] font-mono text-emerald-400">SCANNING...</span>
      </div>
      <div className="flex-grow system-window relative rounded-3xl overflow-hidden border-2" style={{ borderColor: accentColor }}>
        {/* Radar Background */}
        <div className="absolute inset-0 bg-[#000810] grid grid-cols-8 grid-rows-8 opacity-40">
          {[...Array(64)].map((_, i) => <div key={i} className="border border-white/5"></div>)}
        </div>
        
        {/* Radar Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[80%] h-[80%] border border-white/5 rounded-full"></div>
           <div className="w-[50%] h-[50%] border border-white/10 rounded-full"></div>
           <div className="w-[20%] h-[20%] border border-white/20 rounded-full animate-ping"></div>
        </div>

        {/* Scan Line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
           <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent absolute top-0 animate-scan"></div>
        </div>

        {/* Radar Blips */}
        <div className="absolute top-1/4 left-1/3 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#10b981] cursor-pointer hover:scale-150 transition-transform"></div>
        <div className="absolute top-1/2 right-1/2 w-4 h-4 rounded-full border border-white flex items-center justify-center">
           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>

        {/* Location Markers Legend */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
           <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between group cursor-pointer hover:border-white/40">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                    <Zap size={14} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase">EXP Chest Detected</span>
                    <span className="text-[8px] opacity-40">Distance: 120m</span>
                 </div>
              </div>
              <button className="text-[9px] font-black tracking-widest text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">GO</button>
           </div>

           <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between group cursor-pointer hover:border-white/40">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                    <User size={14} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase">Nearby User [3]</span>
                    <span className="text-[8px] opacity-40">Proximity: Low</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="system-window p-3 text-center border border-white/5">
           <p className="text-[8px] opacity-40 uppercase mb-1">Holo Crystals</p>
           <p className="text-sm font-black tracking-widest" style={{ color: accentColor }}>8 / 250</p>
        </div>
        <div className="system-window p-3 text-center border border-white/5">
           <p className="text-[8px] opacity-40 uppercase mb-1">Custom Gear</p>
           <p className="text-sm font-black tracking-widest text-amber-500">2 New Drops</p>
        </div>
      </div>
    </div>
  );
};

const ClanView: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [viewState, setViewState] = useState<'list' | 'chat'>('list');
  const [clanJoined, setClanJoined] = useState(false);
  const clans: Clan[] = [
    { id: 'cl1', name: 'HYPER_STRIKE', members: 42, description: 'Aggressive growth and raids.', joined: false },
    { id: 'cl2', name: 'ZENITH_X', members: 12, description: 'Solo players co-working.', joined: false },
  ];

  const handleJoin = () => {
    setClanJoined(true);
    alert("CONNECTED! Achievement Unlocked: CONNECTED (+100 EXP)");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 h-full flex flex-col">
      <div className="flex items-center justify-between px-1">
         <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">{viewState === 'chat' ? 'Clan Comms' : 'Clan Terminal'}</h3>
         {clanJoined && (
           <button 
             onClick={() => setViewState(v => v === 'list' ? 'chat' : 'list')}
             className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
           >
             <MessageSquare size={18} />
           </button>
         )}
      </div>

      {!clanJoined ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[8px] font-black uppercase opacity-40 ml-2">Direct Access</label>
              <div className="flex gap-2">
                 <input type="text" placeholder="Clan ID / Join Pin" className="flex-grow bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs rounded-xl outline-none focus:border-white transition-all" />
                 <button onClick={handleJoin} className="px-6 py-3 bg-white text-black font-black text-[10px] rounded-xl hover:scale-105 active:scale-95 transition-all">CONNECT</button>
              </div>
           </div>
           
           <div className="space-y-3">
              <label className="text-[8px] font-black uppercase opacity-40 ml-2">Recommended Clans</label>
              {clans.map(c => (
                <div key={c.id} className="system-window p-4 flex justify-between items-center group cursor-pointer border hover:border-white/20">
                   <div className="space-y-1">
                      <h4 className="text-xs font-black tracking-widest uppercase">{c.name}</h4>
                      <p className="text-[9px] opacity-40">{c.description}</p>
                   </div>
                   <div className="text-right">
                      <div className="text-[9px] font-bold opacity-30 mb-2">{c.members} MEMBERS</div>
                      <button onClick={handleJoin} className="text-[8px] font-black tracking-[0.2em] text-blue-400 group-hover:underline">REQUEST</button>
                   </div>
                </div>
              ))}
              <button className="w-full py-4 rounded-xl border border-dashed border-white/10 text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 hover:border-white/40 transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> CREATE NEW CLAN
              </button>
           </div>
        </div>
      ) : (
        viewState === 'chat' ? (
          <div className="flex-grow flex flex-col space-y-4">
            <div className="system-window flex-grow flex flex-col p-4 border-2" style={{ borderColor: accentColor }}>
               <div className="flex-grow overflow-y-auto space-y-4 no-scrollbar pb-4 pr-1">
                  <div className="flex items-start gap-2">
                     <div className="w-7 h-7 rounded-lg bg-zinc-800 shrink-0"></div>
                     <div className="bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none text-[10px] leading-relaxed max-w-[80%]">
                        <span className="font-black text-orange-400 block mb-1">RAID_COMMANDER</span>
                        Group Quest "THE ABYSSAL GATE" starts in 5 mins. Everyone ready?
                     </div>
                  </div>
                  <div className="flex items-start gap-2 flex-row-reverse">
                     <div className="w-7 h-7 rounded-lg bg-white shrink-0"></div>
                     <div className="bg-white text-black p-3 rounded-2xl rounded-tr-none text-[10px] leading-relaxed max-w-[80%]">
                        I'm fully charged. Let's claim that loot! 🔥
                     </div>
                  </div>
               </div>
               <div className="pt-3 border-t border-white/5 flex gap-3 items-center">
                  <button className="text-zinc-500 hover:text-white"><ImageIcon size={18} /></button>
                  <input type="text" placeholder="Broadcast to Clan..." className="flex-grow bg-transparent text-[10px] outline-none" />
                  <button className="p-2 bg-white/5 rounded-lg"><Send size={16} /></button>
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in">
             <div className="system-window p-5 bg-orange-600/10 border-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.1)]">
                <div className="flex justify-between items-center mb-4">
                   <h4 className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Clan exclusive Mission</h4>
                   <span className="text-[8px] font-mono text-white/40">ID: RG-99</span>
                </div>
                <h3 className="text-sm font-black mb-1">THE ABYSSAL GATE</h3>
                <p className="text-[10px] opacity-60 mb-6">Requires co-working & communication abilities between 5 members.</p>
                <div className="flex justify-between items-end">
                   <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => <div key={i} className="w-7 h-7 rounded-full border border-black bg-zinc-800"></div>)}
                      <div className="w-7 h-7 rounded-full border border-black bg-zinc-900 flex items-center justify-center text-[8px] font-bold">+2</div>
                   </div>
                   <button className="px-5 py-2 bg-orange-500 text-white font-black text-[9px] tracking-[0.2em] rounded shadow-lg shadow-orange-500/20">ENLIST</button>
                </div>
             </div>
             <div className="system-window p-4 border-l-4" style={{ borderLeftColor: accentColor }}>
                <h4 className="text-[9px] font-black uppercase opacity-40 mb-3">Clan Rankings</h4>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold"><span>1. ALPHA_SQUAD</span><span>24K EXP</span></div>
                   <div className="flex justify-between text-[10px] opacity-40"><span>2. {clans[0].name} (YOU)</span><span>18K EXP</span></div>
                </div>
             </div>
          </div>
        )
      )}
    </div>
  );
};

const ProfileView: React.FC<{ stats: any; accentColor: string; onPortal: () => void }> = ({ stats, accentColor, onPortal }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-20">
      <div className="flex flex-col items-center">
         <div className="w-28 h-28 rounded-full border-4 p-1.5 relative mb-4 shadow-2xl" style={{ borderColor: accentColor }}>
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-white/5">
               <img src="https://picsum.photos/seed/me/200/200" className="w-full h-full object-cover grayscale brightness-90" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-black border-2 border-white flex items-center justify-center font-black text-sm shadow-xl" style={{ color: accentColor }}>
              S
            </div>
         </div>
         <h2 className="text-2xl font-black tracking-[0.4em] uppercase text-center">DESIGNER_X</h2>
         <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">{stats.title}</span>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <span className="text-[10px] font-black tracking-widest text-emerald-400">STATUS: AWAKENED</span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="system-window p-4 border border-white/5 bg-black/40">
            <h4 className="text-[8px] font-black opacity-40 uppercase mb-2 tracking-[0.2em]">Milestones</h4>
            <div className="text-2xl font-black tracking-tighter" style={{ color: accentColor }}>{stats.milestones}</div>
            <p className="text-[8px] opacity-30 mt-1 uppercase">Sync level: High</p>
         </div>
         <div className="system-window p-4 border border-white/5 bg-black/40">
            <h4 className="text-[8px] font-black opacity-40 uppercase mb-2 tracking-[0.2em]">Player Tier</h4>
            <div className="text-2xl font-black tracking-tighter uppercase">Alpha</div>
            <div className="flex gap-1 mt-1">
               {[...Array(5)].map((_, i) => <div key={i} className={`w-1 h-1 rounded-full ${i < 4 ? 'bg-white shadow-[0_0_5px_white]' : 'bg-white/10'}`}></div>)}
            </div>
         </div>
      </div>

      <div className="system-window p-5 border-l-4" style={{ borderLeftColor: accentColor }}>
         <div className="flex items-center gap-3 mb-6">
            <Target size={18} style={{ color: accentColor }} />
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase">Limited Quests</h4>
         </div>
         <div className="space-y-6">
            <div className="space-y-2">
               <div className="flex justify-between items-center text-[10px]">
                  <span className="font-black uppercase tracking-wider">Hyper Sync Phase III</span>
                  <span className="font-mono text-[9px] opacity-40">T-MINUS 02:14:55</span>
               </div>
               <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-1000" style={{ backgroundColor: accentColor, width: '65%' }}></div>
               </div>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between items-center text-[10px]">
                  <span className="font-black uppercase tracking-wider opacity-30">Night Owl Strike [LOCKED]</span>
                  <span className="font-mono text-[9px] opacity-20">LVL 5 REQ</span>
               </div>
               <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-white/5 w-0"></div>
               </div>
            </div>
         </div>
      </div>

      <div className="flex flex-col items-center gap-6 pt-10">
         <div className="portal-container group relative">
           <button 
             onClick={onPortal}
             className="portal-button w-24 h-24 rounded-full flex items-center justify-center text-white transition-all active:scale-90 relative overflow-visible"
             aria-label="Warp to Hub"
           >
             <div className="portal-inner-glow"></div>
             <div className="portal-sparkles"></div>
             <Zap size={36} className="relative z-10 drop-shadow-[0_0_15px_#fbbf24]" fill="#fbbf24" stroke="#f97316" />
             
             {/* Glow Effect for Profile Portal */}
             <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
           </button>
           <div className="mt-4 flex flex-col items-center gap-1">
              <span className="text-[9px] font-black tracking-[0.4em] uppercase text-zinc-500 group-hover:text-white transition-colors">Hyper Hub</span>
              <div className="flex gap-1">
                 {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-orange-500/40"></div>)}
              </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default SystemZ;
