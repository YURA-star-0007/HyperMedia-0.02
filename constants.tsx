
import React from 'react';
import { Post, Story, User } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'design_enthusiast',
  avatar: 'https://picsum.photos/seed/me/150/150',
};

export const MOCK_STORIES: Story[] = [
  { id: 's1', user: { id: 'u1', username: 'adventure_seeker', avatar: 'https://picsum.photos/seed/u1/150/150' }, hasSeen: false },
  { id: 's2', user: { id: 'u2', username: 'chef_mario', avatar: 'https://picsum.photos/seed/u2/150/150' }, hasSeen: false },
  { id: 's3', user: { id: 'u3', username: 'tech_guru', avatar: 'https://picsum.photos/seed/u3/150/150' }, hasSeen: true },
  { id: 's4', user: { id: 'u4', username: 'travel_bug', avatar: 'https://picsum.photos/seed/u4/150/150' }, hasSeen: false },
  { id: 's5', user: { id: 'u5', username: 'art_gallery', avatar: 'https://picsum.photos/seed/u5/150/150' }, hasSeen: false },
  { id: 's6', user: { id: 'u6', username: 'fitness_pro', avatar: 'https://picsum.photos/seed/u6/150/150' }, hasSeen: true },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: { id: 'u1', username: 'adventure_seeker', avatar: 'https://picsum.photos/seed/u1/150/150', isVerified: true },
    image: 'https://picsum.photos/seed/nature1/1080/1080',
    likes: 1240,
    caption: 'Lost in the beauty of the wild. Nature never fails to amaze me! 🌲✨ #adventure #naturelover',
    comments: [
      { id: 'c1', username: 'travel_bug', text: 'Wow, this looks incredible!', timestamp: '2h' },
      { id: 'c2', username: 'nature_pics', text: 'Where is this? 😍', timestamp: '1h' }
    ],
    location: 'Banff National Park',
    timestamp: '2h',
    isLiked: false
  },
  {
    id: 'p2',
    user: { id: 'u2', username: 'chef_mario', avatar: 'https://picsum.photos/seed/u2/150/150' },
    image: 'https://picsum.photos/seed/food1/1080/1350',
    likes: 850,
    caption: 'Homemade sourdough looking crispy! 🥖 What are you baking today? #baking #foodie',
    comments: [],
    location: 'The Kitchen Studio',
    timestamp: '5h',
    isLiked: true
  },
  {
    id: 'p3',
    user: { id: 'u7', username: 'urban_explorer', avatar: 'https://picsum.photos/seed/u7/150/150' },
    image: 'https://picsum.photos/seed/city1/1080/1080',
    likes: 3100,
    caption: 'Neon nights in Tokyo. 🏮🏙️',
    comments: [],
    timestamp: '1d',
    isLiked: false
  }
];

export const GeminiLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C12 2 12 7 7 12C12 17 12 22 12 22C12 22 12 17 17 12C12 7 12 2 12 2Z" fill="url(#gemini-grad)" />
    <defs>
      <linearGradient id="gemini-grad" x1="7" y1="12" x2="17" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E82EE" />
        <stop offset="1" stopColor="#B378E7" />
      </linearGradient>
    </defs>
  </svg>
);
