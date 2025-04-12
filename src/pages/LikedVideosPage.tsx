
import React from 'react';
import { Navigate } from 'react-router-dom';
import VideoGrid from '@/components/VideoGrid';
import { useUser } from '@/context/UserContext';

const LikedVideosPage = () => {
  const { isAuthenticated, likedVideos } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }
  
  return (
    <VideoGrid 
      videos={likedVideos} 
      title="Liked Videos" 
      emptyMessage="You haven't liked any videos yet."
    />
  );
};

export default LikedVideosPage;
