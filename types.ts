
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

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}
