
import React from 'react';
import Timeline from './Timeline';
import { useEducation } from '@/hooks/useEducation';

const Education = () => {
  const { data: education = [], isLoading, error } = useEducation();

  if (error) {
    console.error('Error loading education:', error);
  }

  if (isLoading) {
    return (
      <section id="education" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
              Education
            </h2>
            <div className="flex justify-center">
              <div className="animate-pulse text-gray-400">Loading education...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
            Education
          </h2>
          {education.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No education found. Add some education in the admin panel.
            </div>
          ) : (
            <Timeline items={education} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
