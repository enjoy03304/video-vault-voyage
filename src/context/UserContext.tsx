
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Video } from '@/types';

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  likedVideos: Video[];
  myListVideos: Video[];
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleLike: (video: Video) => void;
  toggleMyList: (video: Video) => void;
  isVideoLiked: (videoId: string) => boolean;
  isVideoInMyList: (videoId: string) => boolean;
}

// Mock user data for demo
const mockUser: User = {
  id: "user1",
  username: "demo_user",
  avatar: "https://i.pravatar.cc/150?img=68"
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [myListVideos, setMyListVideos] = useState<Video[]>([]);

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('viewvoyage-user');
    const storedLikedVideos = localStorage.getItem('viewvoyage-liked');
    const storedMyListVideos = localStorage.getItem('viewvoyage-mylist');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    if (storedLikedVideos) {
      setLikedVideos(JSON.parse(storedLikedVideos));
    }
    
    if (storedMyListVideos) {
      setMyListVideos(JSON.parse(storedMyListVideos));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('viewvoyage-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('viewvoyage-user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('viewvoyage-liked', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem('viewvoyage-mylist', JSON.stringify(myListVideos));
  }, [myListVideos]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would validate credentials against a backend
    if (username && password) {
      setCurrentUser(mockUser);
      return true;
    }
    return false;
  };

  const signup = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would create a new user in the backend
    if (username && password) {
      const newUser = { ...mockUser, username };
      setCurrentUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleLike = (video: Video) => {
    if (isVideoLiked(video.id)) {
      setLikedVideos(likedVideos.filter(v => v.id !== video.id));
    } else {
      setLikedVideos([...likedVideos, video]);
    }
  };

  const toggleMyList = (video: Video) => {
    if (isVideoInMyList(video.id)) {
      setMyListVideos(myListVideos.filter(v => v.id !== video.id));
    } else {
      setMyListVideos([...myListVideos, video]);
    }
  };

  const isVideoLiked = (videoId: string): boolean => {
    return likedVideos.some(video => video.id === videoId);
  };

  const isVideoInMyList = (videoId: string): boolean => {
    return myListVideos.some(video => video.id === videoId);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        likedVideos,
        myListVideos,
        login,
        signup,
        logout,
        toggleLike,
        toggleMyList,
        isVideoLiked,
        isVideoInMyList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
