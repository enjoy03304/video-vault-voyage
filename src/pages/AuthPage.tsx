
import React, { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const { authType } = useParams<{ authType: 'signin' | 'signup' }>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup, isAuthenticated } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in"
        });
        navigate('/');
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign in",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await signup(username, password);
      if (success) {
        toast({
          title: "Welcome to ViewVoyage!",
          description: "Your account has been created successfully"
        });
        navigate('/');
      } else {
        toast({
          title: "Sign up failed",
          description: "Could not create your account",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign up",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-voyager-card shadow-lg rounded-lg p-6">
        <Tabs defaultValue={authType || 'signin'} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger 
              value="signin" 
              onClick={() => navigate('/auth/signin')}
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              onClick={() => navigate('/auth/signup')}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-username">Username</Label>
                <Input
                  id="signin-username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
                />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-voyager-DEFAULT hover:bg-voyager-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                For demo purposes, you can use any username and password
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary border-none focus:ring-1 focus:ring-voyager-DEFAULT"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-voyager-DEFAULT hover:bg-voyager-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                For demo purposes, you can use any username and password
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
