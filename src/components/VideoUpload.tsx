
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVideos } from '@/context/VideoContext';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const VideoUpload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const { addVideo } = useVideos();
  const { currentUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file",
        variant: "destructive"
      });
      return;
    }
    
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }
    
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };
  
  const clearVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };
  
  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !videoFile) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    // Simulating upload and processing
    setTimeout(() => {
      try {
        // In a real app, we would upload files to a server and get URLs back
        const videoUrl = videoPreview || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
        const thumbnailUrl = thumbnailPreview || "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
        
        addVideo({
          title,
          description,
          videoUrl,
          thumbnailUrl,
          uploadDate: new Date(),
          duration: 120, // This would be determined by the server in a real app
          user: currentUser || {
            id: "guest",
            username: "guest",
            avatar: "https://i.pravatar.cc/150?img=0"
          }
        });
        
        toast({
          title: "Upload successful",
          description: "Your video has been uploaded successfully"
        });
        
        navigate('/');
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your video",
          variant: "destructive"
        });
      } finally {
        setUploading(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video upload */}
        <div>
          <Label htmlFor="video">Video File</Label>
          <div className={`mt-2 border-2 border-dashed rounded-lg ${videoPreview ? 'border-voyager-secondary' : 'border-gray-600'} p-4 text-center`}>
            {videoPreview ? (
              <div className="relative">
                <video 
                  src={videoPreview}
                  controls
                  className="max-h-64 mx-auto"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 border-0"
                  onClick={clearVideo}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div 
                className="py-8 cursor-pointer flex flex-col items-center justify-center"
                onClick={() => videoInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-voyager-DEFAULT mb-2" />
                <p className="text-muted-foreground">Click to browse for a video</p>
                <p className="text-sm text-muted-foreground mt-1">MP4, WebM, or MOV</p>
              </div>
            )}
            <input
              type="file"
              id="video"
              ref={videoInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>
        </div>
        
        {/* Thumbnail upload */}
        <div>
          <Label htmlFor="thumbnail">Thumbnail Image (optional)</Label>
          <div className={`mt-2 border-2 border-dashed rounded-lg ${thumbnailPreview ? 'border-voyager-secondary' : 'border-gray-600'} p-4 text-center`}>
            {thumbnailPreview ? (
              <div className="relative">
                <img 
                  src={thumbnailPreview}
                  alt="Video thumbnail"
                  className="max-h-64 mx-auto object-contain"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 border-0"
                  onClick={clearThumbnail}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div 
                className="py-8 cursor-pointer flex flex-col items-center justify-center"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                <ImageIcon className="h-12 w-12 text-voyager-secondary mb-2" />
                <p className="text-muted-foreground">Click to browse for a thumbnail</p>
                <p className="text-sm text-muted-foreground mt-1">JPG, PNG, or WebP</p>
              </div>
            )}
            <input
              type="file"
              id="thumbnail"
              ref={thumbnailInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </div>
        </div>
        
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            className="bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
          />
        </div>
        
        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            className="min-h-[120px] bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
          />
        </div>
        
        {/* Submit button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-voyager-DEFAULT hover:bg-voyager-hover"
            disabled={!videoFile || !title || !description || uploading}
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;
