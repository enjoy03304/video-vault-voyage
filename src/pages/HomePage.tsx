
import React from 'react';
import VideoGrid from '@/components/VideoGrid';
import { useVideos } from '@/context/VideoContext';

const HomePage = () => {
  const { filteredVideos, searchQuery } = useVideos();
  
  return (
    <div>
      {searchQuery ? (
        <VideoGrid 
          videos={filteredVideos} 
          title={`Search results for "${searchQuery}"`} 
          emptyMessage={`No videos found for "${searchQuery}"`}
        />
      ) : (
        <VideoGrid videos={filteredVideos} title="Discover Videos" />
      )}
    </div>
  );
};

export default HomePage;
