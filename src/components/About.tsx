
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="w-64 h-64 mx-auto md:mx-0 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-400 p-1 hover-lift animate-glow">
                <div className="w-full h-full rounded-3xl bg-gray-900 flex items-center justify-center">
                  <img 
                    src="/api/placeholder/250/250" 
                    alt="Profile" 
                    className="w-60 h-60 rounded-3xl object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6 animate-slide-in-right">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                I'm a passionate frontend developer with 5+ years of experience creating 
                beautiful, functional, and user-centered digital experiences. I love 
                bringing ideas to life through clean, efficient code and stunning animations.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                My expertise spans modern JavaScript frameworks, responsive design, 
                and performance optimization. I'm always eager to learn new technologies 
                and tackle challenging problems with creative solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-emerald-500/20 hover-lift transition-all duration-300 hover:border-emerald-400/40">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">50+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-green-500/20 hover-lift transition-all duration-300 hover:border-green-400/40">
                  <div className="text-3xl font-bold text-green-400 mb-2">5+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
