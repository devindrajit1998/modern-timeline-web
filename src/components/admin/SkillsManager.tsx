
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

const SkillsManager = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', category: '', proficiency: 50 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSkills();
    }
  }, [user]);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user?.id)
        .order('category', { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error: any) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name || !newSkill.category) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('skills')
        .insert({
          user_id: user?.id,
          name: newSkill.name,
          category: newSkill.category,
          proficiency: newSkill.proficiency,
        });

      if (error) throw error;

      toast.success('Skill added successfully!');
      setNewSkill({ name: '', category: '', proficiency: 50 });
      fetchSkills();
    } catch (error: any) {
      toast.error('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Skill deleted successfully!');
      fetchSkills();
    } catch (error: any) {
      toast.error('Failed to delete skill');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                type="number"
                placeholder="Proficiency (1-100)"
                min="1"
                max="100"
                value={newSkill.proficiency}
                onChange={(e) => setNewSkill(prev => ({ ...prev, proficiency: parseInt(e.target.value) || 50 }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button
              onClick={handleAddSkill}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Plus size={16} className="mr-2" />
              Add Skill
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Skills ({skills.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-white">Loading skills...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Proficiency</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell className="text-white">{skill.name}</TableCell>
                    <TableCell className="text-gray-300">{skill.category}</TableCell>
                    <TableCell className="text-gray-300">{skill.proficiency}%</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteSkill(skill.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 size={16} />
                      </Button>
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

export default SkillsManager;
