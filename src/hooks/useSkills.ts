
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) {
        console.error('Error fetching skills:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};
