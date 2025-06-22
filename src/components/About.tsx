import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useExperience } from '@/hooks/useExperience';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Download, Briefcase, Code } from 'lucide-react';

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
  <div className="text-center p-6 md:p-8 bg-gray-800/30 rounded-2xl border border-emerald-500/20 hover-lift transition-all duration-300 hover:border-emerald-400/40 backdrop-blur-sm">
    <div className="flex items-center justify-center mb-3">
      {icon}
    </div>
    <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{value}</div>
    <div className="text-gray-400 font-medium">{label}</div>
  </div>
);

const About = () => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: experiences, isLoading: expLoading, error: expError } = useExperience();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();

  const isLoading = profileLoading || expLoading || projectsLoading;

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
              About Me
            </h2>
            <div className="flex justify-center">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (profileError || expError || projectsError) {
    console.error('Error loading about section data:', { profileError, expError, projectsError });
    // You might want to render a more user-friendly error message here
  }

  const getYearFromPeriod = (period: string | null): number => {
    if (!period) return new Date().getFullYear();
    const yearStr = period.split(' ')[0];
    const year = parseInt(yearStr, 10);
    return isNaN(year) ? new Date().getFullYear() : year;
  };

  const yearsOfExperience = experiences?.length
    ? new Date().getFullYear() - getYearFromPeriod(experiences[experiences.length - 1]?.period)
    : 0;

  return (
    <section id="about" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Profile Image */}
            <div className="animate-slide-in-left">
              <div className="relative group w-80 h-80 mx-auto md:mx-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 p-1 hover-lift backdrop-blur-sm border border-emerald-500/20">
                <div className="w-full h-full rounded-3xl bg-gray-800/50 flex items-center justify-center backdrop-blur-sm">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-[310px] h-[310px] rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-[310px] h-[310px] rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-400/10 flex items-center justify-center">
                      <span className="text-6xl font-bold text-emerald-400">
                        {profile?.name?.charAt(0) || 'I'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="space-y-4">
                {profile?.bio ? (
                  profile.bio.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-lg  text-gray-300 leading-relaxed font-light">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                    Dynamic bio content is not available. Please update your profile.
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8">
                <StatCard 
                  icon={<Briefcase className="w-8 h-8 text-green-400" />} 
                  value={`${yearsOfExperience}+`}
                  label="Years Experience" 
                />
                <StatCard 
                  icon={<Code className="w-8 h-8 text-green-400" />} 
                  value={projects?.length || 0}
                  label="Projects Completed" 
                />
              </div>

              {/* {profile?.cv_url && (
                <div className="mt-8">
                  <Button 
                    asChild 
                    className="group bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <a href={profile.cv_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      Download CV
                    </a>
                  </Button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
