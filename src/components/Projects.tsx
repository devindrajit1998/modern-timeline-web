import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectModal from './ProjectModal';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Eye, Github } from 'lucide-react';
import {
  SiReact,
  SiRedux,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiFigma,
  SiNextdotjs,
  SiVite,
} from 'react-icons/si';

interface Project {
  id: string;
  title: string;
  summary?: string;
  description: string;
  image_url?: string | null;
  technologies?: string[] | null;
  key_features?: string[] | null;
  demo_url?: string | null;
  github_url?: string | null;
  featured?: boolean | null;
}

const techIconMap: { [key: string]: React.ReactNode } = {
  react: <SiReact />,
  redux: <SiRedux />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  html: <SiHtml5 />,
  css: <SiCss3 />,
  scss: <SiSass />,
  tailwindcss: <SiTailwindcss />,
  'node.js': <SiNodedotjs />,
  supabase: <SiSupabase />,
  postgresql: <SiPostgresql />,
  figma: <SiFigma />,
  'next.js': <SiNextdotjs />,
  vite: <SiVite />,
};

const ProjectCard = ({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) => {
  const featuredPill = project.featured ? (
    <div className="absolute top-4 right-4 bg-emerald-400/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/50">
      Featured
    </div>
  ) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col h-full bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-emerald-400/50 transition-colors duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image_url || '/placeholder.svg'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300" />
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        {featuredPill}
        <h3 className="text-xl font-bold text-gray-100 mb-1">{project.title}</h3>
        
        <p className="text-sm text-gray-400 mb-4 h-10">{project.summary || ''}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => {
              const icon = techIconMap[tech.toLowerCase()];
              return (
                <div key={tech} className="flex items-center bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-md">
                  {icon && <span className="mr-1.5 text-emerald-400">{icon}</span>}
                  {tech}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <Button 
            onClick={() => onSelect(project)} 
            className="group bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            View Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <div className="flex items-center gap-4">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Eye className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div className="text-center py-10">Loading projects...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading projects.</div>;

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-fade-up">
          My Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={handleSelectProject} />
          ))}
        </div>
      </div>
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;
