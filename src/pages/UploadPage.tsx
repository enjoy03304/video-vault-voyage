
import React from 'react';
import { Navigate } from 'react-router-dom';
import VideoUpload from '@/components/VideoUpload';
import { useUser } from '@/context/UserContext';

const UploadPage = () => {
  const { isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }
  
  return <VideoUpload />;
};

export default UploadPage;
