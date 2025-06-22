
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Edit, Upload, X, Image } from 'lucide-react';
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
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/project-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      // Update project with new image URL
      if (editingProject) {
        setEditingProject({ ...editingProject, image_url: publicUrl });
      } else {
        setNewProject(prev => ({ ...prev, image_url: publicUrl }));
      }
      
      // Clear selected file and preview
      setSelectedFile(null);
      setPreviewUrl(null);
      
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    if (editingProject) {
      setEditingProject({ ...editingProject, image_url: '' });
    } else {
      setNewProject(prev => ({ ...prev, image_url: '' }));
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

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
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Image</label>
              
              {/* Current Image Display */}
              {projectToEdit.image_url && !selectedFile && (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <img
                      src={projectToEdit.image_url}
                      alt="Project"
                      className="w-32 h-20 rounded-lg object-cover border-2 border-gray-600"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              )}
              
              {/* File Upload */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="project-image-upload"
                  />
                  <label
                    htmlFor="project-image-upload"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    <Upload size={16} />
                    <span>Choose Image</span>
                  </label>
                  
                  {selectedFile && (
                    <Button
                      onClick={handleImageUpload}
                      disabled={uploading}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  )}
                </div>
                
                {/* Preview */}
                {previewUrl && (
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-20 rounded-lg object-cover border-2 border-gray-600"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                
                {!projectToEdit.image_url && !selectedFile && (
                  <div className="w-32 h-20 rounded-lg bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                    <Image size={24} className="text-gray-400" />
                  </div>
                )}
              </div>
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
