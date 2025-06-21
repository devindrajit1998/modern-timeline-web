
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="animate-slide-in-left">
              <div className="w-80 h-80 mx-auto md:mx-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 p-1 hover-lift backdrop-blur-sm border border-emerald-500/20">
                <div className="w-full h-full rounded-3xl bg-gray-800/50 flex items-center justify-center backdrop-blur-sm">
                  <img 
                    src="/api/placeholder/300/300" 
                    alt="Profile" 
                    className="w-[310px] h-[310px] rounded-3xl object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-8 animate-slide-in-right">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  I'm a passionate frontend developer with 5+ years of experience creating 
                  beautiful, functional, and user-centered digital experiences. I love 
                  bringing ideas to life through clean, efficient code and stunning animations.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  My expertise spans modern JavaScript frameworks, responsive design, 
                  and performance optimization. I'm always eager to learn new technologies 
                  and tackle challenging problems with creative solutions.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="text-center p-8 bg-gray-800/30 rounded-2xl border border-emerald-500/20 hover-lift transition-all duration-300 hover:border-emerald-400/40 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-emerald-400 mb-3">50+</div>
                  <div className="text-gray-400 font-medium">Projects Completed</div>
                </div>
                <div className="text-center p-8 bg-gray-800/30 rounded-2xl border border-green-500/20 hover-lift transition-all duration-300 hover:border-green-400/40 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-green-400 mb-3">5+</div>
                  <div className="text-gray-400 font-medium">Years Experience</div>
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
