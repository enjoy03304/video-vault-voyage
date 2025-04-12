
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { VideoProvider } from "@/context/VideoContext";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import VideoPage from "@/pages/VideoPage";
import AuthPage from "@/pages/AuthPage";
import MyListPage from "@/pages/MyListPage";
import LikedVideosPage from "@/pages/LikedVideosPage";
import UploadPage from "@/pages/UploadPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <VideoProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/video/:videoId" element={<VideoPage />} />
                <Route path="/auth/:authType" element={<AuthPage />} />
                <Route path="/my-list" element={<MyListPage />} />
                <Route path="/liked" element={<LikedVideosPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </VideoProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
