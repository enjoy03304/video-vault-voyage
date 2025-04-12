
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useVideos } from '@/context/VideoContext';
import { useUser } from '@/context/UserContext';
import VideoPlayer from '@/components/VideoPlayer';
import CommentSection from '@/components/CommentSection';
import VideoGrid from '@/components/VideoGrid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Video, Comment } from '@/types';

const VideoPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { videos, getVideoById } = useVideos();
  const { currentUser } = useUser();
  const video = getVideoById(videoId || '');
  
  if (!video) {
    return <Navigate to="/" />;
  }
  
  // Get recommended videos (excluding the current one)
  const recommendedVideos = videos
    .filter(v => v.id !== video.id)
    .slice(0, 4);
  
  // Format views
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    } else {
      return views.toString();
    }
  };
  
  // Add a comment
  const handleAddComment = (text: string) => {
    if (!currentUser) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text,
      user: currentUser,
      timestamp: new Date(),
      likes: 0
    };
    
    // Update the video with the new comment
    video.comments = [newComment, ...video.comments];
  };
  
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Video player */}
          <VideoPlayer video={video} />
          
          {/* Video info */}
          <div className="mt-4">
            <h1 className="text-xl font-bold">{video.title}</h1>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <span>{formatViews(video.views)} views</span>
              <span className="mx-2">•</span>
              <span>{formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true })}</span>
            </div>
            
            {/* Uploader info */}
            <div className="flex items-center mt-4 py-4 border-t border-b border-gray-700">
              <Avatar className="h-12 w-12 border border-voyager-secondary/20">
                <AvatarImage src={video.user.avatar} alt={video.user.username} />
                <AvatarFallback className="bg-voyager-secondary text-white">
                  {video.user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h3 className="font-medium">{video.user.username}</h3>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-4 bg-voyager-card p-4 rounded-lg">
              <p className="text-sm whitespace-pre-line">{video.description}</p>
            </div>
            
            {/* Comments */}
            <CommentSection video={video} onAddComment={handleAddComment} />
          </div>
        </div>
        
        {/* Recommended videos */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-medium mb-4">Recommended</h2>
          <div className="space-y-3">
            {recommendedVideos.map(video => (
              <div key={video.id} className="flex">
                <a
                  href={`/video/${video.id}`}
                  className="flex gap-2 hover:bg-voyager-card rounded-lg p-1 transition-colors"
                >
                  <div className="flex-shrink-0 w-40 h-24 relative">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs rounded">
                      {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{video.user.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatViews(video.views)} views
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
