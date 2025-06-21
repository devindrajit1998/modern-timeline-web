
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, Briefcase, GraduationCap, Code, FolderOpen, Code2 } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Portfolio Dashboard
                </h1>
                <p className="text-slate-400 text-sm">Manage your professional content</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
              <div className="text-slate-300 text-sm">
                <span className="text-slate-500">Welcome,</span>
                <span className="ml-1 font-medium text-indigo-400">{user?.email}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-slate-800/50 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto h-8 text-sm"
              >
                <LogOut size={14} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Card className="bg-slate-900/30 backdrop-blur-xl border-slate-700/50 shadow-2xl animate-scale-in">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              {/* Mobile Tab Navigation */}
              <div className="lg:hidden p-4 pb-0">
                <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 bg-slate-800/50 p-1.5 h-auto">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex flex-col items-center gap-1 py-2 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all duration-300 text-xs rounded-md"
                      >
                        <IconComponent size={14} />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Desktop Tab Navigation */}
              <div className="hidden lg:block p-4 pb-0">
                <TabsList className="grid grid-cols-5 bg-slate-800/50 p-1.5">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex items-center gap-2 py-2.5 px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all duration-300 text-sm rounded-md"
                      >
                        <IconComponent size={16} />
                        {tab.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="p-4 pt-0">
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
