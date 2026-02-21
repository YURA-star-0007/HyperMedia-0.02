export interface User {
  id: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
}

export interface UserProfile extends User {
  email: string;
  realName: string;
  mobile: string;
  nickname: string;
  backgroundImage?: string;
  bio?: string;
  socialLinks?: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export interface Story {
  id: string;
  user: User;
  hasSeen: boolean;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  likes: number;
  caption: string;
  comments: Comment[];
  location?: string;
  timestamp: string;
  isLiked: boolean;
}

export interface ThreadPost {
  id: string;
  user: User;
  content: string;
  likes: number;
  replies: number;
  timestamp: string;
  isLiked: boolean;
  visibility: 'public' | 'followers';
}

export interface Notification {
  id: string;
  type: 'follow' | 'close_friend_req' | 'story' | 'post' | 'thread';
  user: User;
  content?: string;
  timestamp: string;
  previewImage?: string;
  isRead: boolean;
}

export type MessageEffect = 'none' | 'flame' | 'gift' | 'love' | 'congrats';

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  effect: MessageEffect;
  isRevealed?: boolean; 
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: 'Amazon' | 'Flipkart' | 'AliExpress';
  rating: number;
  reviews: number;
  brand: string;
  category: string;
}

export interface YouTubeVideo {
  id: string;
  embedId: string;
  title: string;
  channel: string;
  views: string;
  uploaded: string;
  thumbnail: string;
  avatar: string;
}

export interface Reel {
  id: string;
  user: User;
  videoUrl: string;
  likes: number;
  comments: number;
  caption: string;
  musicTrack: string;
  isLiked: boolean;
}

export interface Note {
  id: string;
  user: User;
  text: string;
  song?: {
    title: string;
    artist: string;
  };
  visibility: 'friends' | 'close_friends';
  createdAt: number; 
}

export interface ChatPreview {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageSenderId: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  hasUnreadMedia: boolean;
  messageFrequency: number;
  isSeen: boolean;
}

export type ChatTheme = 'default' | 'ocean' | 'lava' | 'forest' | 'candy';

export type SystemColor = 'Z BLUE' | 'Z RED' | 'Z YELLOW' | 'Z PURPLE' | 'Classic Blue' | 'Classic Pink' | 'Classic Aurora';
export type MainTheme = 'Day' | 'Night';

export interface SystemThemeConfig {
  color: SystemColor;
  mode: MainTheme;
}

export interface SystemActivity {
  id: string;
  user: User;
  type: 'quest' | 'achievement' | 'clan' | 'record' | 'meetup';
  content: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  claimable: boolean;
  reward: string;
}

export interface Clan {
  id: string;
  name: string;
  members: number;
  description: string;
  joined: boolean;
}

export type View = 'feed' | 'profile' | 'edit' | 'marketplace' | 'browser' | 'reels' | 'messages' | 'hub' | 'portal-warp' | 'adjust' | 'system-theme-select' | 'system-z' | 'zmusic' | 'connect-account';
