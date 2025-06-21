
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  technologies: string[];
  featured: boolean;
}

const ProjectsManager = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image_url: '',
    demo_url: '',
    github_url: '',
    technologies: '',
    featured: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    const projectData = editingProject || newProject;
    
    if (!projectData.title || !projectData.description) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      const technologies = projectData.technologies
        ? (typeof projectData.technologies === 'string' 
           ? projectData.technologies.split(',').map(t => t.trim())
           : projectData.technologies)
        : [];

      const dataToSave = {
        user_id: user?.id,
        title: projectData.title,
        description: projectData.description,
        image_url: projectData.image_url,
        demo_url: projectData.demo_url,
        github_url: projectData.github_url,
        technologies,
        featured: projectData.featured,
        updated_at: new Date().toISOString(),
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(dataToSave)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated successfully!');
        setEditingProject(null);
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(dataToSave);

        if (error) throw error;
        toast.success('Project added successfully!');
        setNewProject({
          title: '',
          description: '',
          image_url: '',
          demo_url: '',
          github_url: '',
          technologies: '',
          featured: false,
        });
      }

      fetchProjects();
    } catch (error: any) {
      toast.error('Failed to save project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error: any) {
      toast.error('Failed to delete project');
    }
  };

  const projectToEdit = editingProject || newProject;

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <Input
                value={projectToEdit.title}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({ ...editingProject, title: e.target.value });
                  } else {
                    setNewProject(prev => ({ ...prev, title: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
              <Input
                value={projectToEdit.image_url}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({ ...editingProject, image_url: e.target.value });
                  } else {
                    setNewProject(prev => ({ ...prev, image_url: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
              <Input
                value={projectToEdit.demo_url}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({ ...editingProject, demo_url: e.target.value });
                  } else {
                    setNewProject(prev => ({ ...prev, demo_url: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <Input
                value={projectToEdit.github_url}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({ ...editingProject, github_url: e.target.value });
                  } else {
                    setNewProject(prev => ({ ...prev, github_url: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <Textarea
              value={projectToEdit.description}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, description: e.target.value });
                } else {
                  setNewProject(prev => ({ ...prev, description: e.target.value }));
                }
              }}
              className="bg-gray-700 border-gray-600 text-white min-h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
            <Input
              value={Array.isArray(projectToEdit.technologies) 
                ? projectToEdit.technologies.join(', ')
                : projectToEdit.technologies}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(t => t.trim()) });
                } else {
                  setNewProject(prev => ({ ...prev, technologies: e.target.value }));
                }
              }}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="React, TypeScript, Node.js"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={projectToEdit.featured}
              onCheckedChange={(checked) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, featured: !!checked });
                } else {
                  setNewProject(prev => ({ ...prev, featured: !!checked }));
                }
              }}
            />
            <label htmlFor="featured" className="text-gray-300">Featured Project</label>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSaveProject}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Plus size={16} className="mr-2" />
              {editingProject ? 'Update Project' : 'Add Project'}
            </Button>
            {editingProject && (
              <Button
                onClick={() => setEditingProject(null)}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-white">Loading projects...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Technologies</TableHead>
                  <TableHead className="text-gray-300">Featured</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="text-white">{project.title}</TableCell>
                    <TableCell className="text-gray-300">
                      {project.technologies?.slice(0, 3).join(', ')}
                      {project.technologies?.length > 3 && '...'}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {project.featured ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingProject(project)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          onClick={() => handleDeleteProject(project.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsManager;
