
export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  timestamp: Date;
  likes: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadDate: Date;
  duration: number; // in seconds
  views: number;
  likes: number;
  user: User;
  comments: Comment[];
}
