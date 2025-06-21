
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
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
      
      {items.map((item, index) => (
        <div key={index} className="relative mb-12 ml-16">
          {/* Timeline Dot */}
          <div className="absolute -left-9 top-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-900"></div>
          
          {/* Content Card */}
          <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <span className="text-blue-400 font-semibold">{item.period}</span>
            </div>
            
            {(item.company || item.institution) && (
              <h4 className="text-lg text-purple-400 mb-3">
                {item.company || item.institution}
              </h4>
            )}
            
            <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>
            
            {item.technologies && (
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
