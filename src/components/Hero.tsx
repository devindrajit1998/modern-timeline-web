import React from 'react';
import { ArrowDown, Download } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { useProfile } from '@/hooks/useProfile';

const Hero = () => {
  const { data: profile } = useProfile();

  const scrollToAbout = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTypewriterStrings = () => {
    if (profile?.title && Array.isArray(profile.title) && profile.title.length > 0) {
      return profile.title.filter(t => t); // Filter out any empty strings
    }
    return [
      'Frontend Developer',
      'React JS Developer', 
      'HTML Developer'
    ];
  };

  const handleDownloadCV = () => {
    if (profile?.cv_url) {
      // Open CV in new tab for download
      window.open(profile.cv_url, '_blank');
    } else {
      // Fallback: you could show a toast or modal here
      console.log('No CV available');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
      {/* Clean gradient background without overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-up max-w-4xl mx-auto">
          {/* Clean name display without dark box */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 animate-slide-in-left">
            <span className="text-white block mb-2">I am</span>
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent font-extrabold tracking-tight">
              {profile?.name}
            </span>
          </h1>
          
          {/* Professional title with typewriter */}
          <div className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-8 h-20 flex items-center justify-center animate-slide-in-right">
            <span className="text-gray-400 mr-3">A </span>
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent font-semibold">
              <Typewriter
                options={{
                  strings: getTypewriterStrings(),
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 50,
                }}
              />
            </span>
          </div>
          
          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up font-light">
            Crafting beautiful, interactive web experiences with modern technologies and seamless animations
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up">
            <button 
              onClick={scrollToAbout}
              className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl text-white font-semibold text-lg hover:from-emerald-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30 hover-lift"
            >
              View My Work
            </button>
            <button 
              onClick={handleDownloadCV}
              disabled={!profile?.cv_url}
              className={`px-10 py-4 border-2 rounded-xl font-semibold text-lg transition-all duration-300 hover-lift backdrop-blur-sm flex items-center gap-2 ${
                profile?.cv_url 
                  ? 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-400' 
                  : 'border-gray-600/50 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download size={20} />
              Download CV
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-emerald-400 hover:text-emerald-300 transition-all duration-300 animate-bounce"
      >
        <ArrowDown size={28} className="animate-float" />
      </button>
    </section>
  );
};

export default Hero;
