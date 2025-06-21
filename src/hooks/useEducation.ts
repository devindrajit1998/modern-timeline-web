
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useEducation = () => {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching education:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};
