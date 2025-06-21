
import React from 'react';
import { ArrowDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-emerald-900/20"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-white">I am </span>
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Indrajit
            </span>
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 md:mb-8 h-12 md:h-16 flex items-center justify-center">
            <span className="text-white mr-2">A </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-semibold">
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
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Crafting beautiful, interactive web experiences with modern technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button 
              onClick={scrollToAbout}
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-green-500/25 text-sm md:text-base"
            >
              View My Work
            </button>
            <button className="px-6 md:px-8 py-3 md:py-4 border border-gray-400 rounded-full text-gray-300 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm md:text-base">
              Download CV
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors duration-300 animate-bounce"
      >
        <ArrowDown size={20} className="md:hidden" />
        <ArrowDown size={24} className="hidden md:block" />
      </button>
    </section>
  );
};

export default Hero;
