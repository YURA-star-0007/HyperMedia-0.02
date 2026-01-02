
import React from 'react';
import { UserProfile } from '../types';
import { Settings, Grid, Heart, Lock, Share2 } from 'lucide-react';

interface ProfilePageProps {
  profile: UserProfile;
  onEdit: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onEdit }) => {
  return (
    <div className="w-full max-w-2xl mx-auto pt-6 px-4 pb-20">
      {/* Header / Background Image Area */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 mb-16">
        {profile.backgroundImage ? (
          <img src={profile.backgroundImage} alt="Background" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <span className="text-zinc-600 text-sm">No background image set</span>
          </div>
        )}
        
        {/* Avatar - Centered and overlapping */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-zinc-950 bg-zinc-900 overflow-hidden shadow-xl">
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

      {/* Profile Info */}
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">@{profile.username}</h2>
          <p className="text-zinc-400 text-sm">{profile.nickname}</p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center items-center space-x-8 py-2">
          <div className="text-center">
            <span className="block font-bold text-white text-lg">{profile.followingCount}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Following</span>
          </div>
          <div className="text-center">
            <span className="block font-bold text-white text-lg">{profile.followerCount}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Followers</span>
          </div>
          <div className="text-center">
            <span className="block font-bold text-white text-lg">{profile.postCount}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Posts</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-2">
          <button 
            onClick={onEdit}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-8 rounded-md transition-colors border border-zinc-700"
          >
            Edit profile
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-md border border-zinc-700">
            <Share2 size={20} />
          </button>
        </div>

        {/* Bio & Social */}
        <div className="max-w-xs mx-auto">
          <p className="text-zinc-300 text-sm whitespace-pre-wrap">
            {profile.bio || "No bio yet."}
          </p>
          {profile.socialLinks && (
            <p className="text-blue-400 text-sm mt-2 font-medium">
              {profile.socialLinks}
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-t border-zinc-800">
        <div className="flex justify-around py-3">
          <button className="text-zinc-100 border-b-2 border-zinc-100 pb-1 px-4">
            <Grid size={22} />
          </button>
          <button className="text-zinc-500 hover:text-zinc-300 transition-colors px-4">
            <Lock size={22} />
          </button>
          <button className="text-zinc-500 hover:text-zinc-300 transition-colors px-4">
            <Heart size={22} />
          </button>
        </div>
        
        {/* Empty Posts State */}
        <div className="py-20 flex flex-col items-center justify-center text-zinc-600">
          <Grid size={48} strokeWidth={1} className="mb-4 opacity-20" />
          <p className="text-sm font-medium">Your posts will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
