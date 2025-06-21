
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!name.trim()) {
          toast({
            title: "Error",
            description: "Please enter your name",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        result = await signUp(email, password, name);
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive",
        });
      } else if (!isLogin) {
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6 animate-fade-in">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
              <Code2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-1">
            Portfolio Admin
          </h1>
          <p className="text-slate-400 text-sm">Manage your professional presence</p>
        </div>

        <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-700/50 shadow-2xl animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-center text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'signup'} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 mb-4">
                <TabsTrigger 
                  value="login" 
                  onClick={() => setIsLogin(true)}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all duration-300 text-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  onClick={() => setIsLogin(false)}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all duration-300 text-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-3">
                {!isLogin && (
                  <div className="space-y-1.5 animate-fade-in">
                    <Label htmlFor="name" className="text-slate-300 flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-300 h-9"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-300 flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-300 h-9"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-300 flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 pr-10 transition-all duration-300 h-9"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium py-2 rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none h-9 text-sm"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>
            </Tabs>

            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-400 hover:text-indigo-300 ml-1 font-medium transition-colors duration-300"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
