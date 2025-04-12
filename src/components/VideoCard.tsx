
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface VideoCardProps {
  video: Video;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
};

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const timeAgo = formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true });
  
  return (
    <Link to={`/video/${video.id}`}>
      <div className="video-card bg-voyager-card rounded-lg overflow-hidden shadow-lg hover:ring-1 hover:ring-voyager-DEFAULT">
        {/* Thumbnail */}
        <div className="relative">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full h-44 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded-md text-xs text-white">
            {formatDuration(video.duration)}
          </div>
        </div>
        
        {/* Info */}
        <div className="p-3">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 border border-voyager-secondary/20">
              <AvatarImage src={video.user.avatar} alt={video.user.username} />
              <AvatarFallback className="bg-voyager-secondary text-xs text-white">
                {video.user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-sm font-medium line-clamp-2 text-white">{video.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{video.user.username}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>{formatViews(video.views)} views</span>
                <span className="mx-1">•</span>
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
