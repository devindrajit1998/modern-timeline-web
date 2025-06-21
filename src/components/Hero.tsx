
import React from 'react';
import { ArrowDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-violet-900/10"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">I am </span>
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Indrajit
            </span>
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-6 h-12 flex items-center justify-center">
            <span className="text-white mr-2">A </span>
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-medium">
              <Typewriter
                options={{
                  strings: [
                    'Frontend Developer',
                    'React.js Developer', 
                    'HTML Developer'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 75,
                }}
              />
            </span>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-6 max-w-2xl mx-auto">
            Crafting beautiful, interactive web experiences with modern technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={scrollToAbout}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg text-white text-sm font-medium hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-indigo-500/20"
            >
              View My Work
            </button>
            <button className="px-5 py-2.5 border border-slate-600 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-white transition-all duration-300">
              Download CV
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-white transition-colors duration-300 animate-bounce"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
