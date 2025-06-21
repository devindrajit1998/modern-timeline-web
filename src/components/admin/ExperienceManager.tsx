
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const ExperienceManager = () => {
  const { user } = useAuth();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    technologies: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchExperience();
    }
  }, [user]);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExperience(data || []);
    } catch (error: any) {
      toast.error('Failed to load experience');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExperience = async () => {
    const experienceData = editingExperience || newExperience;
    
    if (!experienceData.title || !experienceData.company) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      const technologies = experienceData.technologies
        ? (typeof experienceData.technologies === 'string' 
           ? experienceData.technologies.split(',').map(t => t.trim())
           : experienceData.technologies)
        : [];

      const dataToSave = {
        user_id: user?.id,
        title: experienceData.title,
        company: experienceData.company,
        period: experienceData.period,
        description: experienceData.description,
        technologies,
      };

      if (editingExperience) {
        const { error } = await supabase
          .from('experience')
          .update(dataToSave)
          .eq('id', editingExperience.id);

        if (error) throw error;
        toast.success('Experience updated successfully!');
        setEditingExperience(null);
      } else {
        const { error } = await supabase
          .from('experience')
          .insert(dataToSave);

        if (error) throw error;
        toast.success('Experience added successfully!');
        setNewExperience({
          title: '',
          company: '',
          period: '',
          description: '',
          technologies: '',
        });
      }

      fetchExperience();
    } catch (error: any) {
      toast.error('Failed to save experience');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Experience deleted successfully!');
      fetchExperience();
    } catch (error: any) {
      toast.error('Failed to delete experience');
    }
  };

  const experienceToEdit = editingExperience || newExperience;

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            {editingExperience ? 'Edit Experience' : 'Add New Experience'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
              <Input
                value={experienceToEdit.title}
                onChange={(e) => {
                  if (editingExperience) {
                    setEditingExperience({ ...editingExperience, title: e.target.value });
                  } else {
                    setNewExperience(prev => ({ ...prev, title: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Senior Frontend Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
              <Input
                value={experienceToEdit.company}
                onChange={(e) => {
                  if (editingExperience) {
                    setEditingExperience({ ...editingExperience, company: e.target.value });
                  } else {
                    setNewExperience(prev => ({ ...prev, company: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Company Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
            <Input
              value={experienceToEdit.period}
              onChange={(e) => {
                if (editingExperience) {
                  setEditingExperience({ ...editingExperience, period: e.target.value });
                } else {
                  setNewExperience(prev => ({ ...prev, period: e.target.value }));
                }
              }}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="2022 - Present"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <Textarea
              value={experienceToEdit.description}
              onChange={(e) => {
                if (editingExperience) {
                  setEditingExperience({ ...editingExperience, description: e.target.value });
                } else {
                  setNewExperience(prev => ({ ...prev, description: e.target.value }));
                }
              }}
              className="bg-gray-700 border-gray-600 text-white min-h-24"
              placeholder="Brief description of your role and responsibilities..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
            <Input
              value={Array.isArray(experienceToEdit.technologies) 
                ? experienceToEdit.technologies.join(', ')
                : experienceToEdit.technologies}
              onChange={(e) => {
                if (editingExperience) {
                  setEditingExperience({ ...editingExperience, technologies: e.target.value.split(',').map(t => t.trim()) });
                } else {
                  setNewExperience(prev => ({ ...prev, technologies: e.target.value }));
                }
              }}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="React, TypeScript, Node.js"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSaveExperience}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Plus size={16} className="mr-2" />
              {editingExperience ? 'Update Experience' : 'Add Experience'}
            </Button>
            {editingExperience && (
              <Button
                onClick={() => setEditingExperience(null)}
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
          <CardTitle className="text-white">Experience ({experience.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-white">Loading experience...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Company</TableHead>
                  <TableHead className="text-gray-300">Period</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experience.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell className="text-white">{exp.title}</TableCell>
                    <TableCell className="text-gray-300">{exp.company}</TableCell>
                    <TableCell className="text-gray-300">{exp.period}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingExperience(exp)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          onClick={() => handleDeleteExperience(exp.id)}
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

export default ExperienceManager;
