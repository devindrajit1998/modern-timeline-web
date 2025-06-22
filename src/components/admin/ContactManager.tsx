import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useContactSubmissions } from '@/hooks/useContactSubmissions';
import { format } from 'date-fns';

const ContactManager = () => {
  const queryClient = useQueryClient();
  const { data: submissions, isLoading, isError } = useContactSubmissions();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Submission deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
    } catch (error: any) {
      toast.error('Failed to delete submission');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-10"><Loader2 className="animate-spin text-emerald-400" size={48} /></div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-400">Failed to load contact submissions.</div>;
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Contact Form Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Message</TableHead>
              <TableHead className="text-white">Submitted At</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions?.map((submission) => (
              <TableRow key={submission.id} className="border-gray-700 hover:bg-gray-700/50">
                <TableCell className="text-gray-300">{submission.name}</TableCell>
                <TableCell className="text-gray-300">{submission.email}</TableCell>
                <TableCell className="text-gray-300 max-w-sm truncate">{submission.message}</TableCell>
                <TableCell className="text-gray-300">
                  {format(new Date(submission.created_at), 'PPP p')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(submission.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {submissions?.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No contact submissions yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactManager; 