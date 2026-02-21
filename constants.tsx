
import React from 'react';
import { Post, Story, User, ThreadPost, Notification, Product, YouTubeVideo, Reel, Note, ChatPreview } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'design_enthusiast',
  avatar: 'https://picsum.photos/seed/me/150/150',
};

export const MOCK_CHATS: ChatPreview[] = [
  { 
    id: 'c1', 
    user: { id: 'u3', username: 'tech_guru', avatar: 'https://picsum.photos/seed/u3/150/150' }, 
    lastMessage: "Did you check out the new library?", 
    lastMessageSenderId: 'u3',
    timestamp: "2m", 
    unreadCount: 2, 
    isOnline: true,
    hasUnreadMedia: true,
    messageFrequency: 8,
    isSeen: true
  },
  { 
    id: 'c2', 
    user: { id: 'u2', username: 'chef_mario', avatar: 'https://picsum.photos/seed/u2/150/150' }, 
    lastMessage: "The recipe is on my profile!", 
    lastMessageSenderId: 'me',
    timestamp: "1h", 
    unreadCount: 0, 
    isOnline: false,
    hasUnreadMedia: false,
    messageFrequency: 4,
    isSeen: false // User hasn't seen my last message -> Grayscale
  },
  { 
    id: 'c3', 
    user: { id: 'u1', username: 'adventure_seeker', avatar: 'https://picsum.photos/seed/u1/150/150' }, 
    lastMessage: "Sent a photo.", 
    lastMessageSenderId: 'u1',
    timestamp: "3h", 
    unreadCount: 0, 
    isOnline: true,
    hasUnreadMedia: true,
    messageFrequency: 6,
    isSeen: true
  },
  { 
    id: 'c4', 
    user: { id: 'u9', username: 'bestie_sarah', avatar: 'https://picsum.photos/seed/u9/150/150' }, 
    lastMessage: "See you tomorrow! 👋", 
    lastMessageSenderId: 'u9',
    timestamp: "1d", 
    unreadCount: 1, 
    isOnline: false,
    hasUnreadMedia: false,
    messageFrequency: 10,
    isSeen: true
  },
  { 
    id: 'c5', 
    user: { id: 'u8', username: 'design_daily', avatar: 'https://picsum.photos/seed/u8/150/150' }, 
    lastMessage: "Can we collab on this?", 
    lastMessageSenderId: 'me',
    timestamp: "2d", 
    unreadCount: 0, 
    isOnline: false,
    hasUnreadMedia: false,
    messageFrequency: 2,
    isSeen: true
  },
];

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

export const MOCK_THREADS: ThreadPost[] = [
  {
    id: 't1',
    user: { id: 'u3', username: 'tech_guru', avatar: 'https://picsum.photos/seed/u3/150/150' },
    content: "Just tried the new Gemini API features. The latency improvements are insane! 🚀 Anyone else building with it?",
    likes: 45,
    replies: 12,
    timestamp: '20m',
    isLiked: true,
    visibility: 'public'
  },
  {
    id: 't2',
    user: { id: 'u6', username: 'fitness_pro', avatar: 'https://picsum.photos/seed/u6/150/150' },
    content: "Rest days are just as important as training days. Don't forget to recover! 💤💪",
    likes: 128,
    replies: 5,
    timestamp: '2h',
    isLiked: false,
    visibility: 'public'
  },
  {
    id: 't3',
    user: { id: 'u4', username: 'travel_bug', avatar: 'https://picsum.photos/seed/u4/150/150' },
    content: "Packing for Japan! 🇯🇵 Send me your best sushi recommendations in Tokyo please!",
    likes: 89,
    replies: 24,
    timestamp: '4h',
    isLiked: false,
    visibility: 'public'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'follow',
    user: { id: 'u8', username: 'design_daily', avatar: 'https://picsum.photos/seed/u8/150/150' },
    timestamp: '2m',
    isRead: false
  },
  {
    id: 'n2',
    type: 'close_friend_req',
    user: { id: 'u9', username: 'bestie_sarah', avatar: 'https://picsum.photos/seed/u9/150/150' },
    timestamp: '15m',
    isRead: false
  },
  {
    id: 'n3',
    type: 'post',
    user: { id: 'u1', username: 'adventure_seeker', avatar: 'https://picsum.photos/seed/u1/150/150' },
    content: 'posted a new photo from Iceland 🧊',
    previewImage: 'https://picsum.photos/seed/iceland/100/100',
    timestamp: '1h',
    isRead: true
  },
  {
    id: 'n4',
    type: 'story',
    user: { id: 'u2', username: 'chef_mario', avatar: 'https://picsum.photos/seed/u2/150/150' },
    content: 'added to their story',
    timestamp: '3h',
    isRead: true
  },
  {
    id: 'n5',
    type: 'thread',
    user: { id: 'u3', username: 'tech_guru', avatar: 'https://picsum.photos/seed/u3/150/150' },
    content: 'posted a thread: "AI is changing everything..."',
    timestamp: '5h',
    isRead: true
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    title: 'Wireless Noise Cancelling Headphones',
    price: 249.99,
    originalPrice: 350.00,
    image: 'https://picsum.photos/seed/headphones/300/300',
    vendor: 'Amazon',
    rating: 4.5,
    reviews: 1205,
    brand: 'Sony',
    category: 'Electronics'
  },
  {
    id: 'prod2',
    title: 'Vintage Denim Jacket',
    price: 45.00,
    image: 'https://picsum.photos/seed/jacket/300/300',
    vendor: 'Flipkart',
    rating: 4.2,
    reviews: 85,
    brand: 'Levis',
    category: 'Fashion'
  },
  {
    id: 'prod3',
    title: 'Smart LED RGB Strip Lights',
    price: 12.50,
    originalPrice: 25.00,
    image: 'https://picsum.photos/seed/lights/300/300',
    vendor: 'AliExpress',
    rating: 4.8,
    reviews: 5420,
    brand: 'Govee',
    category: 'Home'
  },
  {
    id: 'prod4',
    title: 'Professional DSLR Camera Kit',
    price: 899.00,
    image: 'https://picsum.photos/seed/camera/300/300',
    vendor: 'Amazon',
    rating: 4.9,
    reviews: 320,
    brand: 'Canon',
    category: 'Electronics'
  },
  {
    id: 'prod5',
    title: 'Minimalist Desk Lamp',
    price: 35.99,
    image: 'https://picsum.photos/seed/lamp/300/300',
    vendor: 'AliExpress',
    rating: 4.3,
    reviews: 210,
    brand: 'Baseus',
    category: 'Home'
  },
  {
    id: 'prod6',
    title: 'Running Shoes - Sport Series',
    price: 65.00,
    originalPrice: 120.00,
    image: 'https://picsum.photos/seed/shoes/300/300',
    vendor: 'Flipkart',
    rating: 4.6,
    reviews: 890,
    brand: 'Nike',
    category: 'Fashion'
  }
];

export const MOCK_YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'yt1',
    embedId: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio - beats to relax/study to',
    channel: 'Lofi Girl',
    views: '65K',
    uploaded: 'LIVE',
    thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
    avatar: 'https://picsum.photos/seed/lofigirl/50/50'
  },
  {
    id: 'yt2',
    embedId: 'M7fi_ibeAkw',
    title: 'Gemini Era: What\'s Next for AI',
    channel: 'Google',
    views: '1.2M',
    uploaded: '2 weeks ago',
    thumbnail: 'https://img.youtube.com/vi/M7fi_ibeAkw/maxresdefault.jpg',
    avatar: 'https://picsum.photos/seed/google/50/50'
  },
  {
    id: 'yt3',
    embedId: 'K4TOrB7at0Y',
    title: 'Top 10 Places To Visit In 2024',
    channel: 'Travel Guide',
    views: '890K',
    uploaded: '1 month ago',
    thumbnail: 'https://img.youtube.com/vi/K4TOrB7at0Y/maxresdefault.jpg',
    avatar: 'https://picsum.photos/seed/travel/50/50'
  },
  {
    id: 'yt4',
    embedId: 't4x7s-N1aHw',
    title: 'Future of Web Development',
    channel: 'Tech Daily',
    views: '450K',
    uploaded: '3 days ago',
    thumbnail: 'https://img.youtube.com/vi/t4x7s-N1aHw/maxresdefault.jpg',
    avatar: 'https://picsum.photos/seed/tech/50/50'
  },
  {
    id: 'yt5',
    embedId: 'LXb3EKWsInQ',
    title: 'COSTA RICA IN 4K 60fps HDR (ULTRA HD)',
    channel: 'Jacob + Katie Schwarz',
    views: '120M',
    uploaded: '5 years ago',
    thumbnail: 'https://img.youtube.com/vi/LXb3EKWsInQ/maxresdefault.jpg',
    avatar: 'https://picsum.photos/seed/nature/50/50'
  },
  {
    id: 'yt6',
    embedId: 'g4Hbz2jLxvQ',
    title: 'Spider-Man: Across the Spider-Verse Trailer',
    channel: 'Sony Pictures',
    views: '45M',
    uploaded: '1 year ago',
    thumbnail: 'https://img.youtube.com/vi/g4Hbz2jLxvQ/maxresdefault.jpg',
    avatar: 'https://picsum.photos/seed/sony/50/50'
  }
];

export const MOCK_REELS: Reel[] = [
  {
    id: 'r1',
    user: { id: 'u1', username: 'nature_zen', avatar: 'https://picsum.photos/seed/u1/150/150', isVerified: true },
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 12400,
    comments: 342,
    caption: 'The sunrise hits different here 🌅 #morning #vibes',
    musicTrack: 'Morning Coffee - Lofi Beats',
    isLiked: false
  },
  {
    id: 'r2',
    user: { id: 'u2', username: 'skater_boi', avatar: 'https://picsum.photos/seed/u2/150/150' },
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    likes: 8500,
    comments: 120,
    caption: 'Finally landed this trick! 🛹🔥',
    musicTrack: 'Skate or Die - Punk Rock',
    isLiked: true
  },
  {
    id: 'r3',
    user: { id: 'u3', username: 'funny_cats', avatar: 'https://picsum.photos/seed/u3/150/150' },
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    likes: 45000,
    comments: 1200,
    caption: 'Wait for the end... 😂🐱',
    musicTrack: 'Funny Song - Kevin MacLeod',
    isLiked: false
  },
  {
    id: 'r4',
    user: { id: 'u4', username: 'travel_diaries', avatar: 'https://picsum.photos/seed/u4/150/150', isVerified: true },
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: 21000,
    comments: 560,
    caption: 'Take me back to paradise 🏝️',
    musicTrack: 'Summer Vibes - Tropical House',
    isLiked: true
  }
];

export const MOCK_NOTES: Note[] = [
  { id: 'n1', user: { id: 'u1', username: 'adventure_seeker', avatar: 'https://picsum.photos/seed/u1/150/150' }, text: "Planning my next trip! 🌍", visibility: 'friends', createdAt: Date.now() - 3600000 },
  { id: 'n2', user: { id: 'u3', username: 'tech_guru', avatar: 'https://picsum.photos/seed/u3/150/150' }, text: "Coding all night ☕️", visibility: 'friends', song: { title: "Lofi Beats", artist: "Lofi Girl" }, createdAt: Date.now() - 7200000 },
  { id: 'n3', user: { id: 'u2', username: 'chef_mario', avatar: 'https://picsum.photos/seed/u2/150/150' }, text: "New recipe dropping soon 🍕", visibility: 'close_friends', createdAt: Date.now() - 14400000 },
  { id: 'n4', user: { id: 'u4', username: 'travel_bug', avatar: 'https://picsum.photos/seed/u4/150/150' }, text: "Missing summer... ☀️", visibility: 'friends', createdAt: Date.now() - 28800000 },
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
