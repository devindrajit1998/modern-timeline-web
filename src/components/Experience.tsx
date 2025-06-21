
import React from 'react';
import Timeline from './Timeline';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern React architectures with TypeScript.',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2022',
      description: 'Developed responsive web applications for various clients, collaborated with designers to implement pixel-perfect UIs, and optimized application performance.',
      technologies: ['React', 'JavaScript', 'SCSS', 'Webpack', 'REST APIs']
    },
    {
      title: 'Junior Frontend Developer',
      company: 'StartupTech',
      period: '2019 - 2020',
      description: 'Built interactive user interfaces, participated in agile development processes, and contributed to the company\'s main product development.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
            Work Experience
          </h2>
          <Timeline items={experiences} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
