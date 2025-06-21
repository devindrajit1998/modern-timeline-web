
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
      <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-600"></div>
      
      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        
        return (
          <div key={index} className={`relative mb-8 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
            {/* Timeline Dot */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full border-2 border-gray-900 z-10"></div>
            
            {/* Content Card */}
            <div className={`bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-300 animate-fade-in ${isLeft ? 'ml-auto' : 'mr-auto'} w-[calc(50%-2rem)]`}>
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <span className="text-green-400 font-semibold text-sm">{item.period}</span>
              </div>
              
              {(item.company || item.institution) && (
                <h4 className="text-base text-emerald-400 mb-2">
                  {item.company || item.institution}
                </h4>
              )}
              
              <p className="text-gray-300 mb-3 leading-relaxed text-sm">{item.description}</p>
              
              {item.technologies && (
                <div className="flex flex-wrap gap-1">
                  {item.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-full text-green-300 text-xs"
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
  );
};

export default Timeline;
