
import React, { useState } from 'react';
import { Comment, Video, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  video: Video;
  onAddComment: (text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ video, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const { currentUser, isAuthenticated } = useUser();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment on videos",
        variant: "destructive"
      });
      return;
    }
    
    if (commentText.trim() === '') {
      return;
    }
    
    onAddComment(commentText);
    setCommentText('');
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">{video.comments.length} Comments</h3>
      
      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="flex items-start gap-4 mb-6">
        <Avatar className="h-10 w-10 border border-voyager-secondary/20">
          <AvatarImage 
            src={currentUser?.avatar || "https://i.pravatar.cc/150?img=0"} 
            alt={currentUser?.username || "Guest"} 
          />
          <AvatarFallback className="bg-voyager-secondary text-white">
            {currentUser?.username?.substring(0, 2).toUpperCase() || "G"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[80px] bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
          />
          <div className="flex justify-end mt-2">
            <Button 
              type="submit" 
              disabled={!isAuthenticated || commentText.trim() === ''} 
              className="bg-voyager-DEFAULT hover:bg-voyager-hover"
            >
              Comment
            </Button>
          </div>
        </div>
      </form>
      
      <Separator className="my-4" />
      
      {/* Comments list */}
      <div className="space-y-4">
        {video.comments.length > 0 ? (
          video.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10 border border-voyager-secondary/20">
                <AvatarImage src={comment.user.avatar} alt={comment.user.username} />
                <AvatarFallback className="bg-voyager-secondary text-white">
                  {comment.user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium text-sm">{comment.user.username}</h4>
                  <span className="text-xs text-muted-foreground ml-2">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
