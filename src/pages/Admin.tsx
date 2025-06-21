
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, Briefcase, GraduationCap, Code, FolderOpen, Sparkles } from 'lucide-react';
import ProfileManager from '@/components/admin/ProfileManager';
import SkillsManager from '@/components/admin/SkillsManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import EducationManager from '@/components/admin/EducationManager';
import ExperienceManager from '@/components/admin/ExperienceManager';

const Admin = () => {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSignOut = async () => {
    await signOut();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Portfolio Dashboard
                </h1>
                <p className="text-gray-400 text-sm">Manage your professional content</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
              <div className="text-gray-300 text-sm">
                <span className="text-gray-500">Welcome,</span>
                <span className="ml-1 font-medium text-purple-400">{user?.email}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-gray-800/50 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50 shadow-2xl animate-scale-in">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Mobile Tab Navigation */}
              <div className="lg:hidden p-6 pb-0">
                <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-700/50 p-2 h-auto">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 text-xs"
                      >
                        <IconComponent size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Desktop Tab Navigation */}
              <div className="hidden lg:block p-6 pb-0">
                <TabsList className="grid grid-cols-5 bg-gray-700/50 p-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
                      >
                        <IconComponent size={18} />
                        {tab.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="p-6 pt-0">
                <TabsContent value="profile" className="mt-0 animate-fade-in">
                  <ProfileManager />
                </TabsContent>

                <TabsContent value="skills" className="mt-0 animate-fade-in">
                  <SkillsManager />
                </TabsContent>

                <TabsContent value="projects" className="mt-0 animate-fade-in">
                  <ProjectsManager />
                </TabsContent>

                <TabsContent value="education" className="mt-0 animate-fade-in">
                  <EducationManager />
                </TabsContent>

                <TabsContent value="experience" className="mt-0 animate-fade-in">
                  <ExperienceManager />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
