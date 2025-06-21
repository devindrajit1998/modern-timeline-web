
import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import { useProjects } from '@/hooks/useProjects';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: projects = [], isLoading, error } = useProjects();

  if (error) {
    console.error('Error loading projects:', error);
  }

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="flex justify-center">
              <div className="animate-pulse text-gray-400">Loading projects...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          {projects.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No projects found. Add some projects in the admin panel.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openModal(project)}
                >
                  <div className="relative overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-emerald-500/20 to-green-400/20 flex items-center justify-center">
                        <span className="text-emerald-400 font-bold text-lg">{project.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-3 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-full text-green-300 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies && project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-gray-400 text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Projects;
