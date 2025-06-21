
import React from 'react';
import Timeline from './Timeline';
import { useExperience } from '@/hooks/useExperience';

const Experience = () => {
  const { data: experiences = [], isLoading, error } = useExperience();

  if (error) {
    console.error('Error loading experience:', error);
  }

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
              Work Experience
            </h2>
            <div className="flex justify-center">
              <div className="animate-pulse text-gray-400">Loading experience...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
            Work Experience
          </h2>
          {experiences.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No work experience found. Add some experience in the admin panel.
            </div>
          ) : (
            <Timeline items={experiences} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
