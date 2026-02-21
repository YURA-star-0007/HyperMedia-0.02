
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Music, Youtube, Gamepad2, 
  CheckCircle2, Plus, ExternalLink, ShieldCheck,
  Gamepad, Sword, Target, Zap, Sparkles, Trophy
} from 'lucide-react';

interface ConnectAccountProps {
  onBack: () => void;
}

const ConnectAccount: React.FC<ConnectAccountProps> = ({ onBack }) => {
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>(['spotify']);

  const accountTypes = [
    { 
      id: 'spotify', 
      name: 'Spotify', 
      icon: <Music className="text-emerald-500" />, 
      description: 'Sync playlists & library for Z Music',
      category: 'Media'
    },
    { 
      id: 'google', 
      name: 'Google / YouTube', 
      icon: <Youtube className="text-red-500" />, 
      description: 'Access YT Music & Google services',
      category: 'Media'
    },
    { 
      id: 'freefire', 
      name: 'Free Fire', 
      icon: <Target className="text-orange-500" />, 
      description: 'Track BR/CS Rank & Missions',
      category: 'Android Gaming'
    },
    { 
      id: 'pubg', 
      name: 'BGMI / PUBG Mobile', 
      icon: <ShieldCheck className="text-yellow-500" />, 
      description: 'Track Chicken Dinners & Rank',
      category: 'Android Gaming'
    },
    { 
      id: 'genshin', 
      name: 'Genshin Impact', 
      icon: <Sparkles className="text-blue-400" />, 
      description: 'Track Adventure Rank & Resin',
      category: 'Android Gaming'
    },
    { 
      id: 'mobilelegends', 
      name: 'Mobile Legends', 
      icon: <Sword className="text-purple-500" />, 
      description: 'Track Rank & Win Rate',
      category: 'Android Gaming'
    },
    { 
      id: 'clashofclans', 
      name: 'Clash of Clans', 
      icon: <Trophy className="text-amber-500" />, 
      description: 'Track Town Hall & War Stars',
      category: 'Android Gaming'
    },
    { 
      id: 'valorant', 
      name: 'Valorant', 
      icon: <Target className="text-red-500" />, 
      description: 'Track Competitive Rank & RR',
      category: 'PC Gaming'
    },
    { 
      id: 'league', 
      name: 'League of Legends', 
      icon: <Zap className="text-blue-500" />, 
      description: 'Track Mastery & Rank',
      category: 'PC Gaming'
    },
    { 
      id: 'cs2', 
      name: 'Counter-Strike 2', 
      icon: <ShieldCheck className="text-orange-400" />, 
      description: 'Track Premier Rating & K/D',
      category: 'PC Gaming'
    },
    { 
      id: 'minecraft', 
      name: 'Minecraft', 
      icon: <Zap className="text-green-500" />, 
      description: 'Track Mob Kills & Playtime',
      category: 'PC Gaming'
    },
    { 
      id: 'fortnite', 
      name: 'Fortnite', 
      icon: <Gamepad2 className="text-purple-400" />, 
      description: 'Track Victory Royales & Level',
      category: 'PC Gaming'
    },
    { 
      id: 'apex', 
      name: 'Apex Legends', 
      icon: <Zap className="text-red-400" />, 
      description: 'Track Kills & Rank',
      category: 'PC Gaming'
    }
  ];

  const handleConnect = (id: string) => {
    if (connectedAccounts.includes(id)) {
      setConnectedAccounts(prev => prev.filter(a => a !== id));
    } else {
      setConnectedAccounts(prev => [...prev, id]);
      alert(`Connecting to ${id}... System Z will now track your activity.`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 min-h-screen pb-32">
      <header className="flex items-center gap-4 mb-12">
        <button 
          onClick={onBack}
          className="p-3 bg-zinc-900/50 rounded-2xl text-zinc-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">CONNECT ACCOUNTS</h1>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">System Z Integration Hub</p>
        </div>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6">Media & Services</h2>
          <div className="grid grid-cols-1 gap-4">
            {accountTypes.filter(a => a.category === 'Media').map(acc => (
              <AccountCard 
                key={acc.id} 
                acc={acc} 
                isConnected={connectedAccounts.includes(acc.id)} 
                onConnect={() => handleConnect(acc.id)} 
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Android Gaming</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500">
              <Gamepad2 size={14} />
              TRACKING ACTIVE
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accountTypes.filter(a => a.category === 'Android Gaming').map(acc => (
              <AccountCard 
                key={acc.id} 
                acc={acc} 
                isConnected={connectedAccounts.includes(acc.id)} 
                onConnect={() => handleConnect(acc.id)} 
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">PC Gaming</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500">
              <Gamepad size={14} />
              SYSTEM Z SYNC
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accountTypes.filter(a => a.category === 'PC Gaming').map(acc => (
              <AccountCard 
                key={acc.id} 
                acc={acc} 
                isConnected={connectedAccounts.includes(acc.id)} 
                onConnect={() => handleConnect(acc.id)} 
              />
            ))}
          </div>
        </section>

        <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-lg font-bold text-white">Privacy & Security</h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto">
            Hyper Media only tracks activity data required for missions and achievements. We never store your passwords or private messages.
          </p>
        </div>
      </div>
    </div>
  );
};

const AccountCard = ({ acc, isConnected, onConnect }: { acc: any, isConnected: boolean, onConnect: () => void, key?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`p-5 rounded-[28px] border transition-all flex items-center justify-between ${
      isConnected 
        ? 'bg-zinc-900/60 border-emerald-500/30' 
        : 'bg-zinc-900/20 border-white/5 hover:border-white/20'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center shadow-inner">
        {acc.icon}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{acc.name}</h4>
        <p className="text-[10px] text-zinc-500 font-medium">{acc.description}</p>
      </div>
    </div>
    <button 
      onClick={onConnect}
      className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
        isConnected 
          ? 'bg-emerald-500/10 text-emerald-500' 
          : 'bg-white text-black hover:bg-zinc-200'
      }`}
    >
      {isConnected ? (
        <span className="flex items-center gap-1"><CheckCircle2 size={12} /> CONNECTED</span>
      ) : (
        'CONNECT'
      )}
    </button>
  </motion.div>
);

export default ConnectAccount;
