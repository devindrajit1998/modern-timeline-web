
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

interface Education {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
}

const EducationManager = () => {
  const { user } = useAuth();
  const [education, setEducation] = useState<Education[]>([]);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [newEducation, setNewEducation] = useState({
    title: '',
    institution: '',
    period: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEducation();
    }
  }, [user]);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEducation(data || []);
    } catch (error: any) {
      toast.error('Failed to load education');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEducation = async () => {
    const educationData = editingEducation || newEducation;
    
    if (!educationData.title || !educationData.institution) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      const dataToSave = {
        user_id: user?.id,
        title: educationData.title,
        institution: educationData.institution,
        period: educationData.period,
        description: educationData.description,
      };

      if (editingEducation) {
        const { error } = await supabase
          .from('education')
          .update(dataToSave)
          .eq('id', editingEducation.id);

        if (error) throw error;
        toast.success('Education updated successfully!');
        setEditingEducation(null);
      } else {
        const { error } = await supabase
          .from('education')
          .insert(dataToSave);

        if (error) throw error;
        toast.success('Education added successfully!');
        setNewEducation({
          title: '',
          institution: '',
          period: '',
          description: '',
        });
      }

      fetchEducation();
    } catch (error: any) {
      toast.error('Failed to save education');
    }
  };

  const handleDeleteEducation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Education deleted successfully!');
      fetchEducation();
    } catch (error: any) {
      toast.error('Failed to delete education');
    }
  };

  const educationToEdit = editingEducation || newEducation;

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            {editingEducation ? 'Edit Education' : 'Add New Education'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title/Degree *</label>
              <Input
                value={educationToEdit.title}
                onChange={(e) => {
                  if (editingEducation) {
                    setEditingEducation({ ...editingEducation, title: e.target.value });
                  } else {
                    setNewEducation(prev => ({ ...prev, title: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Bachelor of Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
              <Input
                value={educationToEdit.institution}
                onChange={(e) => {
                  if (editingEducation) {
                    setEditingEducation({ ...editingEducation, institution: e.target.value });
                  } else {
                    setNewEducation(prev => ({ ...prev, institution: e.target.value }));
                  }
                }}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="University Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
            <Input
              value={educationToEdit.period}
              onChange={(e) => {
                if (editingEducation) {
                  setEditingEducation({ ...editingEducation, period: e.target.value });
                } else {
                  setNewEducation(prev => ({ ...prev, period: e.target.value }));
                }
              }}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="2017 - 2021"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <Textarea
              value={educationToEdit.description}
              onChange={(e) => {
                if (editingEducation) {
                  setEditingEducation({ ...editingEducation, description: e.target.value });
                } else {
                  setNewEducation(prev => ({ ...prev, description: e.target.value }));
                }
              }}
              className="bg-gray-700 border-gray-600 text-white min-h-24"
              placeholder="Brief description of your education..."
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSaveEducation}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Plus size={16} className="mr-2" />
              {editingEducation ? 'Update Education' : 'Add Education'}
            </Button>
            {editingEducation && (
              <Button
                onClick={() => setEditingEducation(null)}
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
          <CardTitle className="text-white">Education ({education.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-white">Loading education...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Institution</TableHead>
                  <TableHead className="text-gray-300">Period</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {education.map((edu) => (
                  <TableRow key={edu.id}>
                    <TableCell className="text-white">{edu.title}</TableCell>
                    <TableCell className="text-gray-300">{edu.institution}</TableCell>
                    <TableCell className="text-gray-300">{edu.period}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingEducation(edu)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          onClick={() => handleDeleteEducation(edu.id)}
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

export default EducationManager;
