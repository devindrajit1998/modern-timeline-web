
import React from 'react';
import Timeline from './Timeline';

const Education = () => {
  const education = [
    {
      title: 'Master of Computer Science',
      institution: 'University of Technology',
      period: '2017 - 2019',
      description: 'Specialized in web technologies and software engineering. Completed thesis on modern JavaScript frameworks and their impact on web development.',
    },
    {
      title: 'Bachelor of Computer Science',
      institution: 'State University',
      period: '2013 - 2017',
      description: 'Foundation in computer science principles, algorithms, and programming. Participated in various coding competitions and hackathons.',
    },
    {
      title: 'Web Development Certification',
      institution: 'TechCert Institute',
      period: '2018',
      description: 'Intensive program covering modern web development technologies including React, Node.js, and database management.',
    }
  ];

  return (
    <section id="education" className="py-16 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Education
          </h2>
          <Timeline items={education} />
        </div>
      </div>
    </section>
  );
};

export default Education;
