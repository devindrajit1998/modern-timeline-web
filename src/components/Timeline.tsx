
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
    <div className="relative">
      {/* Timeline Line - Hidden on mobile */}
      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-violet-500"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <div key={index} className={`relative flex ${
              // Mobile: simple layout, Desktop: alternating sides
              'md:justify-center'
            }`}>
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-4 w-3 h-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full border-2 border-slate-950 z-10"></div>
              
              {/* Content Card */}
              <div className={`
                ml-16 md:ml-0 
                ${isLeft 
                  ? 'md:w-[calc(50%-2rem)] md:mr-8 md:text-right' 
                  : 'md:w-[calc(50%-2rem)] md:ml-8 md:text-left md:self-end'
                }
                bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800/50 transition-all duration-300
              `}>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span className="text-indigo-400 font-medium text-sm">{item.period}</span>
                </div>
                
                {(item.company || item.institution) && (
                  <h4 className="text-sm text-violet-400 mb-3">
                    {item.company || item.institution}
                  </h4>
                )}
                
                <p className="text-slate-300 mb-4 leading-relaxed text-sm">{item.description}</p>
                
                {item.technologies && (
                  <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 rounded text-indigo-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
