
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="w-64 h-64 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <img 
                    src="/api/placeholder/250/250" 
                    alt="Profile" 
                    className="w-60 h-60 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate frontend developer with 5+ years of experience creating 
                beautiful, functional, and user-centered digital experiences. I love 
                bringing ideas to life through clean, efficient code.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My expertise spans modern JavaScript frameworks, responsive design, 
                and performance optimization. I'm always eager to learn new technologies 
                and tackle challenging problems.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400">50+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-400">5+</div>
                  <div className="text-gray-300">Years Experience</div>
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
