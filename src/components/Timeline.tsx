
import React from 'react';

interface TimelineItem {
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-green-400 to-teal-500 animate-glow"></div>
      
      <div className="space-y-16">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <div 
              key={index} 
              className={`relative animate-fade-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-8 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full border-4 border-gray-950 z-10 animate-glow hover:scale-125 transition-transform duration-300"></div>
              
              {/* Content Container */}
              <div className={`flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                {/* Content Card */}
                <div className={`
                  ml-20 md:ml-0 
                  ${isLeft 
                    ? 'md:w-[calc(50%-3rem)] md:mr-12' 
                    : 'md:w-[calc(50%-3rem)] md:ml-12'
                  }
                  bg-gray-800/40 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 hover:bg-gray-800/60 hover:border-emerald-400/40 transition-all duration-500 hover-lift group
                `}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">{item.title}</h3>
                    <span className="text-emerald-400 font-semibold text-sm bg-emerald-500/10 px-3 py-1 rounded-full">{item.period}</span>
                  </div>
                  
                  {(item.company || item.institution) && (
                    <h4 className="text-sm text-green-400 mb-6 font-medium">
                      {item.company || item.institution}
                    </h4>
                  )}
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">{item.description}</p>
                  
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-xs hover:bg-emerald-500/30 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
