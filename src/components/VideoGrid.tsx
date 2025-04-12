
import React from 'react';
import { Video } from '@/types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  title?: string;
  emptyMessage?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  title = "Videos", 
  emptyMessage = "No videos found" 
}) => {
  return (
    <div className="container py-6">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
