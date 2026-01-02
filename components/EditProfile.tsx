
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Camera, ArrowLeft, Save, Globe, User, Edit3 } from 'lucide-react';

interface EditProfileProps {
  profile: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
  onBack: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ profile, onSave, onBack }) => {
  const [avatar, setAvatar] = useState(profile.avatar);
  const [bg, setBg] = useState(profile.backgroundImage || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [social, setSocial] = useState(profile.socialLinks || '');
  const [nickname, setNickname] = useState(profile.nickname);

  const handleSave = () => {
    onSave({
      avatar,
      backgroundImage: bg,
      bio,
      socialLinks: social,
      nickname
    });
  };

  const handleImageUpload = (type: 'avatar' | 'bg') => {
    // Mock image upload
    const url = prompt(`Enter image URL for ${type}:`);
    if (url) {
      if (type === 'avatar') setAvatar(url);
      else setBg(url);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto pt-6 px-4 pb-24 text-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Edit profile</h2>
        <button 
          onClick={handleSave}
          className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
        >
          Save
        </button>
      </div>

      <div className="space-y-8">
        {/* Photo Edits */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-zinc-800 overflow-hidden border-2 border-zinc-700">
              {avatar && !avatar.includes('new_user') ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <User size={40} />
                </div>
              )}
            </div>
            <button 
              onClick={() => handleImageUpload('avatar')}
              className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full border-2 border-zinc-900 hover:bg-blue-500 transition-colors shadow-lg"
            >
              <Camera size={16} />
            </button>
          </div>
          <p className="text-xs text-zinc-500">Change profile photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Edit3 size={12} /> Nickname
            </label>
            <input 
              type="text" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Your display name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Camera size={12} /> Background Image URL
            </label>
            <input 
              type="text" 
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Edit3 size={12} /> Bio / Signature
            </label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Globe size={12} /> Social Links / Mention
            </label>
            <input 
              type="text" 
              value={social}
              onChange={(e) => setSocial(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="@username or links"
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 mt-4"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
