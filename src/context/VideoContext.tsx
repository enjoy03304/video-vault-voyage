
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video } from '@/types';

interface VideoContextType {
  videos: Video[];
  searchQuery: string;
  filteredVideos: Video[];
  setSearchQuery: (query: string) => void;
  getVideoById: (id: string) => Video | undefined;
  addVideo: (video: Omit<Video, 'id' | 'comments' | 'likes' | 'views'>) => void;
}

// Mock video data
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Mountain Sunrise Timelapse",
    description: "Beautiful timelapse of sunrise over mountains captured during my hiking trip.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    uploadDate: new Date("2023-01-15"),
    duration: 180,
    views: 1542,
    likes: 124,
    user: {
      id: "user1",
      username: "naturelover",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    comments: [
      {
        id: "c1",
        text: "This view is incredible!",
        user: { id: "u2", username: "mountaineer", avatar: "https://i.pravatar.cc/150?img=12" },
        timestamp: new Date("2023-01-16"),
        likes: 5
      }
    ]
  },
  {
    id: "2",
    title: "Urban Exploration: Hidden City",
    description: "Discovered some amazing hidden spots in the city that most locals don't even know about.",
    thumbnailUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    uploadDate: new Date("2023-02-22"),
    duration: 421,
    views: 3281,
    likes: 275,
    user: {
      id: "user2",
      username: "urbanexplorer",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    comments: [
      {
        id: "c2",
        text: "I've lived here for years and never knew about these places!",
        user: { id: "u3", username: "citydweller", avatar: "https://i.pravatar.cc/150?img=25" },
        timestamp: new Date("2023-02-23"),
        likes: 12
      }
    ]
  },
  {
    id: "3",
    title: "Deep Ocean Discoveries",
    description: "Footage from our deep-sea exploration revealing fascinating marine life.",
    thumbnailUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    uploadDate: new Date("2023-03-10"),
    duration: 307,
    views: 5928,
    likes: 432,
    user: {
      id: "user3",
      username: "oceanographer",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    comments: [
      {
        id: "c3",
        text: "The bioluminescence is stunning!",
        user: { id: "u4", username: "marinebiologist", avatar: "https://i.pravatar.cc/150?img=32" },
        timestamp: new Date("2023-03-11"),
        likes: 18
      }
    ]
  },
  {
    id: "4",
    title: "Desert Stargazing Guide",
    description: "A guide to the best stargazing spots in the desert and how to capture amazing night sky photos.",
    thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    uploadDate: new Date("2023-04-05"),
    duration: 493,
    views: 2865,
    likes: 301,
    user: {
      id: "user4",
      username: "astroexplorer",
      avatar: "https://i.pravatar.cc/150?img=21"
    },
    comments: [
      {
        id: "c4",
        text: "Used your tips last weekend and got some amazing shots!",
        user: { id: "u5", username: "nightphotographer", avatar: "https://i.pravatar.cc/150?img=44" },
        timestamp: new Date("2023-04-07"),
        likes: 9
      }
    ]
  },
  {
    id: "5",
    title: "Traditional Cooking Methods",
    description: "Learning traditional cooking techniques from village elders around the world.",
    thumbnailUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    uploadDate: new Date("2023-05-18"),
    duration: 612,
    views: 4127,
    likes: 385,
    user: {
      id: "user5",
      username: "culinaryanthropologist",
      avatar: "https://i.pravatar.cc/150?img=28"
    },
    comments: [
      {
        id: "c5",
        text: "This reminds me of how my grandmother used to cook!",
        user: { id: "u6", username: "foodhistorian", avatar: "https://i.pravatar.cc/150?img=51" },
        timestamp: new Date("2023-05-20"),
        likes: 24
      }
    ]
  },
  {
    id: "6",
    title: "Wildlife Photography Tips",
    description: "Professional tips for capturing amazing wildlife photos in their natural habitat.",
    thumbnailUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    uploadDate: new Date("2023-06-09"),
    duration: 352,
    views: 3764,
    likes: 298,
    user: {
      id: "user6",
      username: "wildlifephotographer",
      avatar: "https://i.pravatar.cc/150?img=36"
    },
    comments: [
      {
        id: "c6",
        text: "Your patience is incredible! Great tips on getting the perfect shot.",
        user: { id: "u7", username: "naturephotoenthusiast", avatar: "https://i.pravatar.cc/150?img=60" },
        timestamp: new Date("2023-06-10"),
        likes: 15
      }
    ]
  }
];

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    // Load from local storage or use mock data
    const storedVideos = localStorage.getItem('viewvoyage-videos');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    } else {
      setVideos(mockVideos);
    }
  }, []);
  
  // Save videos to local storage when updated
  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('viewvoyage-videos', JSON.stringify(videos));
    }
  }, [videos]);
  
  // Filter videos based on search query
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getVideoById = (id: string): Video | undefined => {
    return videos.find(video => video.id === id);
  };
  
  const addVideo = (videoData: Omit<Video, 'id' | 'comments' | 'likes' | 'views'>) => {
    const newVideo: Video = {
      ...videoData,
      id: `video-${Date.now()}`,
      comments: [],
      likes: 0,
      views: 0
    };
    
    setVideos(prevVideos => [...prevVideos, newVideo]);
  };
  
  return (
    <VideoContext.Provider
      value={{
        videos,
        searchQuery,
        filteredVideos,
        setSearchQuery,
        getVideoById,
        addVideo
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};
