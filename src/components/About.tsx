
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <div className="w-48 h-48 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-1">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                  <img 
                    src="/api/placeholder/190/190" 
                    alt="Profile" 
                    className="w-44 h-44 rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                I'm a passionate frontend developer with 5+ years of experience creating 
                beautiful, functional, and user-centered digital experiences. I love 
                bringing ideas to life through clean, efficient code.
              </p>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                My expertise spans modern JavaScript frameworks, responsive design, 
                and performance optimization. I'm always eager to learn new technologies 
                and tackle challenging problems.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="text-2xl font-bold text-indigo-400">50+</div>
                  <div className="text-xs text-slate-400">Projects Completed</div>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="text-2xl font-bold text-violet-400">5+</div>
                  <div className="text-xs text-slate-400">Years Experience</div>
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
