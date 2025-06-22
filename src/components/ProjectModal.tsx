import React from 'react';
import { X, ExternalLink, Github, FileText, Star, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Button } from './ui/button';

interface Project {
  id: string;
  title: string;
  summary?: string | null;
  description: string;
  image_url?: string | null;
  technologies?: string[] | null;
  key_features?: string[] | null;
  demo_url?: string | null;
  github_url?: string | null;
  featured?: boolean | null;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
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

const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div>
    <h3 className="flex items-center text-lg md:text-xl font-semibold text-gray-200 mb-4">
      <span className="mr-3 text-emerald-400">{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gray-800/50 border border-gray-700/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between p-4 md:p-6 border-b border-gray-700/50 bg-gray-800/80 backdrop-blur-lg z-10">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-100">{project.title}</h2>
                {project.summary && <p className="text-sm text-gray-400 mt-1">{project.summary}</p>}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 flex-shrink-0"
                aria-label="Close modal"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="p-4 md:p-6 space-y-8">
              {project.image_url && (
                <div className="rounded-lg overflow-hidden border border-gray-700/50">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              )}

              {project.description && (
                <Section title="About This Project" icon={<FileText size={22} />}>
                  <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed text-sm md:text-base">
                    {project.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </Section>
              )}

              {project.key_features && project.key_features.length > 0 && (
                <Section title="Key Features" icon={<Star size={22} />}>
                  <ul className="space-y-2 pl-2">
                    {project.key_features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-emerald-400 mr-3 mt-1">&#10003;</span>
                        <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <Section title="Technologies Used" icon={<Code size={22} />}>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => {
                       const icon = techIconMap[tech.toLowerCase()];
                       return (
                         <div key={tech} className="flex items-center bg-gray-700/50 text-gray-300 text-sm px-3 py-1.5 rounded-md">
                           {icon && <span className="mr-2 text-emerald-400 text-base">{icon}</span>}
                           {tech}
                         </div>
                       );
                    })}
                  </div>
                </Section>
              )}

              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-700/50 mt-8">
                {project.demo_url && (
                  <Button asChild className="group bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.github_url && (
                  <Button asChild variant="outline" className="group bg-transparent text-gray-300 border-gray-600 hover:bg-gray-700/50 hover:text-white hover:border-gray-500 font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
