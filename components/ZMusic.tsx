import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, Music, 
  Youtube, Search, ListMusic, Heart, Shuffle, 
  Repeat, Volume2, ExternalLink, RefreshCw,
  LayoutGrid, Library
} from 'lucide-react';

interface ZMusicProps {
  onBack?: () => void;
  activeTrack: any;
  setActiveTrack: (track: any) => void;
}

const ZMusic: React.FC<ZMusicProps> = ({ onBack, activeTrack, setActiveTrack }) => {
  const [activeTab, setActiveTab] = useState<'spotify' | 'youtube'>('spotify');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentTrack = activeTrack || {
    title: "Midnight City",
    artist: "M83",
    cover: "https://picsum.photos/seed/m83/300/300",
    duration: "4:03",
    progress: 35,
    isPlaying: false
  };

  const setIsPlaying = (playing: boolean) => {
    setActiveTrack({ ...currentTrack, isPlaying: playing });
  };

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for OAuth success message
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && event.data?.provider === 'spotify') {
        setIsAuthenticated(true);
        fetchPlaylists();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'spotify') {
      fetchPlaylists();
    }
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery && activeTab === 'spotify') {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/spotify/status');
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
      if (data.isAuthenticated) fetchPlaylists();
    } catch (e) {
      console.error("Failed to check auth status", e);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const res = await fetch('/api/spotify/playlists');
      if (res.ok) {
        const data = await res.json();
        setPlaylists(data.items || []);
      }
    } catch (e) {
      console.error("Failed to fetch playlists", e);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.tracks?.items || []);
      }
    } catch (e) {
      console.error("Search failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectSpotify = async () => {
    try {
      const res = await fetch('/api/auth/spotify/url');
      const { url } = await res.json();
      window.open(url, 'spotify_auth', 'width=600,height=800');
    } catch (e) {
      alert("Failed to initiate Spotify connection");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 min-h-[80vh] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Music className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">Z MUSIC</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Hyper Media Audio Suite</p>
          </div>
        </div>

        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setActiveTab('spotify')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'spotify' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Music size={14} /> Spotify
          </button>
          <button 
            onClick={() => setActiveTab('youtube')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'youtube' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Youtube size={14} /> YT Music
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Library & Search */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={18} />
            <input 
              type="text"
              placeholder={`Search ${activeTab === 'spotify' ? 'Spotify' : 'YouTube Music'}...`}
              className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-white/20 focus:bg-zinc-900/60 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {!isAuthenticated && activeTab === 'spotify' ? (
            <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-12 flex flex-col items-center text-center gap-6 backdrop-blur-xl">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Music size={40} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Connect your Spotify</h2>
                <p className="text-zinc-400 text-sm max-w-xs mx-auto">Sync your playlists, liked songs, and personalized daily mixes directly into Hyper Media.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConnectSpotify}
                className="bg-emerald-500 text-black font-black px-8 py-4 rounded-full flex items-center gap-3 shadow-xl shadow-emerald-500/20"
              >
                CONNECT SPOTIFY <ExternalLink size={18} />
              </motion.button>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Requires Spotify Premium for in-app playback</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Search Results</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {searchResults.map((track) => (
                      <div 
                        key={track.id}
                        onClick={() => setActiveTrack({
                          title: track.name,
                          artist: track.artists.map((a: any) => a.name).join(', '),
                          cover: track.album.images[0]?.url || "https://picsum.photos/seed/music/300/300",
                          duration: `${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`,
                          progress: 0,
                          isPlaying: true
                        })}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden">
                            <img src={track.album.images[2]?.url || track.album.images[0]?.url} alt={track.name} />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">{track.name}</h4>
                            <p className="text-xs text-zinc-500">{track.artists.map((a: any) => a.name).join(', ')}</p>
                          </div>
                        </div>
                        <Play size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Library size={20} className="text-zinc-500" /> Your Playlists
                </h3>
                <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">SEE ALL</button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(playlists.length > 0 ? playlists : []).map((playlist) => (
                  <motion.div 
                    key={playlist.id}
                    whileHover={{ y: -5 }}
                    className="bg-zinc-900/40 border border-white/5 p-3 rounded-2xl cursor-pointer group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                      <img src={playlist.images?.[0]?.url || "https://picsum.photos/seed/playlist/200/200"} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-white truncate">{playlist.name}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">{playlist.tracks?.total || 0} TRACKS</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity / Recommendations */}
              <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6">
                <h3 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest">Recently Played</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveTrack({
                        title: `Track Name ${i}`,
                        artist: "Artist Name",
                        cover: `https://picsum.photos/seed/track${i}/300/300`,
                        duration: "3:45",
                        progress: 0,
                        isPlaying: true
                      })}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden">
                          <img src={`https://picsum.photos/seed/track${i}/100/100`} alt="Track" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">Track Name {i}</h4>
                          <p className="text-xs text-zinc-500">Artist Name</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart size={16} className="text-zinc-500 hover:text-red-500" />
                        <Play size={16} className="text-white" fill="currentColor" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Now Playing Widget */}
        <div className="space-y-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-[40px] p-6 sticky top-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Now Playing</span>
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-emerald-500 animate-pulse"></div>
                <div className="w-1 h-5 bg-emerald-500 animate-pulse delay-75"></div>
                <div className="w-1 h-2 bg-emerald-500 animate-pulse delay-150"></div>
              </div>
            </div>

            <div className="aspect-square rounded-[32px] overflow-hidden mb-6 shadow-2xl relative group">
              <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl font-black text-white tracking-tight mb-1">{currentTrack.title}</h2>
              <p className="text-sm text-zinc-400 font-medium">{currentTrack.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-8">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${currentTrack.progress}%` }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-blue-500"
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-zinc-500">
                <span>1:24</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
              <button className="text-zinc-500 hover:text-white transition-colors">
                <Shuffle size={20} />
              </button>
              <div className="flex items-center gap-6">
                <button className="text-white hover:scale-110 transition-transform">
                  <SkipBack size={28} fill="currentColor" />
                </button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!currentTrack.isPlaying)}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl shadow-white/10"
                >
                  {currentTrack.isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </motion.button>
                <button className="text-white hover:scale-110 transition-transform">
                  <SkipForward size={28} fill="currentColor" />
                </button>
              </div>
              <button className="text-zinc-500 hover:text-white transition-colors">
                <Repeat size={20} />
              </button>
            </div>

            {/* Volume & Devices */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              <Volume2 size={18} className="text-zinc-500" />
              <div className="h-1 flex-grow bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-zinc-400" />
              </div>
              <button className="text-zinc-500 hover:text-emerald-500 transition-colors">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZMusic;
