
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Upload, LogOut, User as UserIcon, Heart, ListPlus } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useVideos } from '@/context/VideoContext';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useUser();
  const { setSearchQuery } = useVideos();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-voyager-dark border-b border-voyager-secondary/20">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-4">
          <span className="text-xl font-bold text-voyager-DEFAULT">
            View<span className="text-white">Voyage</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 hidden md:flex mx-4">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              className="pl-10 bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={handleKeyPress}
            />
          </div>
        </form>

        {/* Navigation */}
        <nav className="flex items-center gap-2 ml-auto">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex hover:bg-voyager-secondary/20" 
                onClick={() => navigate('/upload')}
              >
                <Upload className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="hidden sm:flex hover:bg-voyager-secondary/20" 
                onClick={() => navigate('/liked')}
              >
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex hover:bg-voyager-secondary/20" 
                onClick={() => navigate('/my-list')}
              >
                <ListPlus className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-voyager-secondary/20">
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.username} />
                      <AvatarFallback className="bg-voyager-secondary text-white">
                        {currentUser?.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/profile')}>
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/my-list')}>
                    <ListPlus className="h-4 w-4" />
                    My List
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/liked')}>
                    <Heart className="h-4 w-4" />
                    Liked Videos
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => logout()}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth/signin')}>
                Sign In
              </Button>
              <Button 
                className="bg-voyager-DEFAULT hover:bg-voyager-hover text-white" 
                onClick={() => navigate('/auth/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
      
      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              className="pl-10 bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={handleKeyPress}
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
