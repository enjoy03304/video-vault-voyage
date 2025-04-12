
import React from 'react';
import { Navigate } from 'react-router-dom';
import VideoGrid from '@/components/VideoGrid';
import { useUser } from '@/context/UserContext';

const MyListPage = () => {
  const { isAuthenticated, myListVideos } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }
  
  return (
    <VideoGrid 
      videos={myListVideos} 
      title="My List" 
      emptyMessage="Your list is empty. Add videos to watch later."
    />
  );
};

export default MyListPage;
