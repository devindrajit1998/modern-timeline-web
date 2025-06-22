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
  key_subjects: string[];
  grade: string;
  final_project: string;
  clubs: string;
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
    key_subjects: [] as string[],
    grade: '',
    final_project: '',
    clubs: '',
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
      const { key_subjects, ...restOfData } = educationData as any; // Cast to avoid TS errors
      
      const subjectsArray = typeof key_subjects === 'string' 
        ? key_subjects.split(',').map(s => s.trim())
        : (Array.isArray(key_subjects) ? key_subjects : []);

      const dataToSave = {
        ...restOfData,
        user_id: user?.id,
        key_subjects: subjectsArray,
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
          key_subjects: [],
          grade: '',
          final_project: '',
          clubs: '',
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

  const educationToEdit = editingEducation || { ...newEducation, id: '', description: '' };
  
  const handleFormChange = (field: string, value: string) => {
    if (editingEducation) {
      setEditingEducation({ ...editingEducation, [field]: value });
    } else {
      setNewEducation(prev => ({ ...prev, [field]: value }));
    }
  };

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
                onChange={(e) => handleFormChange('title', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Bachelor of Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
              <Input
                value={educationToEdit.institution}
                onChange={(e) => handleFormChange('institution', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="University Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
            <Input
              value={educationToEdit.period}
              onChange={(e) => handleFormChange('period', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="2017 - 2021"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Grade</label>
              <Input
                value={educationToEdit.grade || ''}
                onChange={(e) => handleFormChange('grade', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="CGPA: 8.2/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Final Project</label>
              <Input
                value={educationToEdit.final_project || ''}
                onChange={(e) => handleFormChange('final_project', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="IoT-based Smart Energy Meter"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Key Subjects (comma-separated)</label>
            <Input
              value={Array.isArray(educationToEdit.key_subjects) ? educationToEdit.key_subjects.join(', ') : ''}
              onChange={(e) => handleFormChange('key_subjects', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Power Systems, Control Systems, ML"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Clubs / Activities (use '|' to separate)</label>
            <Input
              value={educationToEdit.clubs || ''}
              onChange={(e) => handleFormChange('clubs', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Robotics | TechFest Organizer"
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
                  <TableHead className="text-gray-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {education.map((edu) => (
                  <TableRow key={edu.id}>
                    <TableCell className="text-white font-medium">{edu.title}</TableCell>
                    <TableCell className="text-gray-300">{edu.institution}</TableCell>
                    <TableCell className="text-gray-300">{edu.period}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
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
