
import React from 'react';
import { ArrowDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-green-900/10"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-in-left">
            <span className="text-white">I am </span>
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent animate-glow">
              Indrajit
            </span>
          </h1>
          <div className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 h-16 flex items-center justify-center animate-slide-in-right">
            <span className="text-white mr-3">A </span>
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent font-semibold">
              <Typewriter
                options={{
                  strings: [
                    'Frontend Developer',
                    'React.js Developer', 
                    'HTML Developer'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 50,
                }}
              />
            </span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-up">
            Crafting beautiful, interactive web experiences with modern technologies and seamless animations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <button 
              onClick={scrollToAbout}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30 hover-lift animate-glow"
            >
              View My Work
            </button>
            <button className="px-8 py-3 border-2 border-emerald-500/50 rounded-xl text-emerald-300 font-medium hover:bg-emerald-900/30 hover:border-emerald-400 transition-all duration-300 hover-lift">
              Download CV
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-emerald-400 hover:text-emerald-300 transition-all duration-300 animate-bounce"
      >
        <ArrowDown size={24} className="animate-float" />
      </button>
    </section>
  );
};

export default Hero;
