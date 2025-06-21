
import React, { useState } from 'react';
import { Code, Database, Settings, Palette } from 'lucide-react';

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const skills = [
    { name: 'React', level: 95, category: 'Frontend', icon: Code },
    { name: 'TypeScript', level: 90, category: 'Frontend', icon: Code },
    { name: 'JavaScript', level: 95, category: 'Frontend', icon: Code },
    { name: 'Next.js', level: 85, category: 'Frontend', icon: Code },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend', icon: Code },
    { name: 'Node.js', level: 80, category: 'Backend', icon: Database },
    { name: 'Express', level: 75, category: 'Backend', icon: Database },
    { name: 'MongoDB', level: 70, category: 'Backend', icon: Database },
    { name: 'Git', level: 90, category: 'Tools', icon: Settings },
    { name: 'Docker', level: 65, category: 'Tools', icon: Settings },
    { name: 'AWS', level: 70, category: 'Tools', icon: Settings },
    { name: 'Figma', level: 85, category: 'Design', icon: Palette },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Tools', 'Design'];

  const filteredSkills = activeFilter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeFilter);

  return (
    <section id="skills" className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent size={16} className="text-green-400" />
                    <h3 className="text-sm font-semibold text-white">{skill.name}</h3>
                    <span className="text-green-400 font-bold text-xs ml-auto">{skill.level}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">{skill.category}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
