
import React from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  technologies?: string[];
  demo_url?: string;
  github_url?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Image */}
          {project.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Description */}
          {project.description && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">About This Project</h3>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-full text-green-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300"
              >
                <ExternalLink size={16} />
                View Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-gray-400 rounded-lg text-gray-300 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Github size={16} />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
