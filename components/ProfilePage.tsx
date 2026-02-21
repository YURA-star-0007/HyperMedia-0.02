
import React from 'react';
import { UserProfile } from '../types';
import { Settings, Grid, Heart, Lock, Share2, Zap } from 'lucide-react';

interface ProfilePageProps {
  profile: UserProfile;
  onEdit: () => void;
  onPortalClick: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onEdit, onPortalClick }) => {
  return (
    <div className="w-full max-w-2xl mx-auto pt-6 px-4 pb-20 relative">
      {/* Header / Background Image Area */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 mb-12 shadow-lg">
        {profile.backgroundImage ? (
          <img src={profile.backgroundImage} alt="Background" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <span className="text-zinc-600 text-sm">No background image set</span>
          </div>
        )}
        
        {/* Avatar - Left and Overlapping */}
        <div className="absolute -bottom-10 left-4">
          <div className="w-24 h-24 rounded-full border-4 border-zinc-950 bg-zinc-900 overflow-hidden shadow-2xl">
            {profile.avatar && !profile.avatar.includes('new_user') ? (
              <img src={profile.avatar} alt={profile.username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500">
                <Settings size={32} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info & Stats */}
      <div className="px-4 relative">
        
        {/* Layout Row: Spacer for Avatar | Stats | Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start mb-6">
           
           {/* Spacer to push content right of avatar */}
           <div className="w-28 flex-shrink-0 h-0 sm:h-auto hidden sm:block"></div>

           <div className="flex flex-grow items-center justify-between mt-1 sm:mt-0">
              
              {/* Stats - Right of Profile Picture */}
              <div className="flex items-center space-x-6 sm:space-x-8 pl-4 sm:pl-0 pt-0 sm:pt-1">
                <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="block font-bold text-white text-lg">{profile.postCount}</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Posts</span>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="block font-bold text-white text-lg">{profile.followerCount}</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Followers</span>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="block font-bold text-white text-lg">{profile.followingCount}</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Following</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button 
                  onClick={onEdit}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors"
                >
                  Edit profile
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-1.5 rounded-lg border border-zinc-700 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
           </div>
        </div>

        {/* Bio Section Area - Portal will be positioned relative to this container */}
        <div className="space-y-1 mt-2 relative">
          <h2 className="text-xl font-bold text-white leading-none">@{profile.username}</h2>
          <p className="text-zinc-400 text-sm">{profile.nickname}</p>
          
          <div className="pt-3 max-w-[60%] sm:max-w-lg">
            <p className="text-zinc-200 text-sm whitespace-pre-wrap leading-relaxed">
              {profile.bio || "No bio yet."}
            </p>
            {profile.socialLinks && (
              <p className="text-blue-400 text-sm mt-1.5 font-medium hover:underline cursor-pointer flex items-center gap-1">
                🔗 {profile.socialLinks}
              </p>
            )}
          </div>

          {/* Alive Portal Button - Positioned absolutely to the right of the bio as requested */}
          <div className="absolute top-2 right-0 sm:right-4 z-20">
            <div className="portal-container relative group">
              <button 
                onClick={onPortalClick}
                className="portal-button w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white transition-all active:scale-90 relative"
                aria-label="HYPER PORTAL 1"
              >
                {/* Visual layers to match the swirling fire ring image */}
                <div className="portal-inner-glow pointer-events-none"></div>
                <div className="portal-sparkles pointer-events-none"></div>
                
                <Zap size={32} className="relative z-10 drop-shadow-[0_0_15px_#fbbf24]" fill="#fbbf24" stroke="#f97316" />
                
                {/* Glossy overlay */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 rounded-t-full pointer-events-none"></div>
              </button>

              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                HYPER PORTAL 1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-10 border-t border-zinc-800">
        <div className="flex justify-around py-0.5">
          <button className="flex-1 py-3 flex justify-center text-zinc-100 border-b border-zinc-100 transition-all">
            <Grid size={22} />
          </button>
          <button className="flex-1 py-3 flex justify-center text-zinc-500 hover:text-zinc-300 transition-all">
            <Lock size={22} />
          </button>
          <button className="flex-1 py-3 flex justify-center text-zinc-500 hover:text-zinc-300 transition-all">
            <Heart size={22} />
          </button>
        </div>
        
        {/* Empty Posts State */}
        <div className="py-20 flex flex-col items-center justify-center text-zinc-600">
          <div className="w-16 h-16 rounded-full border-2 border-zinc-800 flex items-center justify-center mb-4">
             <Grid size={32} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-bold text-zinc-100 mb-1">Share Photos</h3>
          <p className="text-sm font-medium mb-4">When you share photos, they will appear on your profile.</p>
          <button className="text-blue-500 font-semibold text-sm hover:text-blue-400">Share your first photo</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
