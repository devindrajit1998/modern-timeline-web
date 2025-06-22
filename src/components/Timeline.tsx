import React from 'react';
import { Building, Clock, MapPin, Users, Rocket, Wrench, GraduationCap, BookOpen, Award, FlaskConical, Calendar, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  technologies?: string[];
  company_logo_url?: string;
  location_type?: string;
  team_size?: string;
  key_subjects?: string[];
  grade?: string;
  final_project?: string;
  clubs?: string;
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
          const isExperience = !!item.company;
          const isCompleted = item.period && !item.period.toLowerCase().includes('present');
          
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
                  bg-gray-800/40 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:bg-gray-800/60 hover:border-emerald-400/40 transition-all duration-500 hover-lift group
                `}>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">{item.title}</h3>

                  {isExperience ? (
                    // New Experience Layout
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-400 space-x-4">
                        <div className="flex items-center">
                          {item.company_logo_url && <img src={item.company_logo_url} alt={`${item.company} logo`} className="w-5 h-5 mr-2 rounded-sm" />}
                          <Building size={14} className="mr-1.5 text-emerald-400" /> 
                          <span className="font-semibold text-gray-300">{item.company}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1.5 text-emerald-400" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-400 space-x-4">
                        {item.location_type && (
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1.5 text-emerald-400" />
                            <span>{item.location_type}</span>
                          </div>
                        )}
                        {item.team_size && (
                          <div className="flex items-center">
                            <Users size={14} className="mr-1.5 text-emerald-400" />
                            <span>{item.team_size}</span>
                          </div>
                        )}
                      </div>
                      
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex items-start text-sm text-gray-400">
                          <Wrench size={14} className="mr-1.5 text-emerald-400 mt-1 flex-shrink-0" />
                          <div className="flex flex-wrap gap-1.5">
                            {item.technologies.map((tech) => (
                              <span key={tech} className="bg-gray-700/50 text-emerald-300 px-2 py-0.5 rounded text-xs">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.description && (
                        <div>
                          <h4 className="flex items-center font-semibold text-gray-200 mt-3 mb-2 text-sm">
                            <Rocket size={14} className="mr-1.5 text-emerald-400" />
                            Key Contributions
                          </h4>
                          <div className="prose prose-sm prose-invert text-gray-300 leading-relaxed whitespace-pre-line">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // New Education Layout
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="flex items-center text-md font-semibold text-gray-300">
                          <Building size={16} className="mr-2 text-emerald-400 flex-shrink-0" />
                          {item.institution}
                        </h4>
                        {isCompleted && (
                          <span className="flex items-center text-xs bg-green-500/10 text-green-400 font-medium px-2 py-1 rounded-full">
                            <CheckCircle2 size={12} className="mr-1" />
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar size={14} className="mr-2 text-emerald-400" />
                        <span>{item.period}</span>
                      </div>
                      
                      {item.grade && (
                        <div className="flex items-center text-sm text-gray-400">
                          <Award size={14} className="mr-2 text-emerald-400" />
                          <span>{item.grade}</span>
                        </div>
                      )}

                      {item.key_subjects && item.key_subjects.length > 0 && (
                        <div className="flex items-start text-sm text-gray-400">
                          <BookOpen size={14} className="mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-gray-300 mr-1">Key Subjects:</span>
                            <span>{item.key_subjects.join(', ')}</span>
                          </div>
                        </div>
                      )}

                      {item.final_project && (
                        <div className="flex items-center text-sm text-gray-400">
                          <FlaskConical size={14} className="mr-2 text-emerald-400" />
                           <div>
                            <span className="font-semibold text-gray-300 mr-1">Final Project:</span>
                            <span>{item.final_project}</span>
                          </div>
                        </div>
                      )}

                      {item.clubs && (
                        <div className="flex items-center text-sm text-gray-400">
                          <Users size={14} className="mr-2 text-emerald-400" />
                           <div>
                            <span className="font-semibold text-gray-300 mr-1">Clubs:</span>
                            <span>{item.clubs.split('|').join(' | ')}</span>
                          </div>
                        </div>
                      )}
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
