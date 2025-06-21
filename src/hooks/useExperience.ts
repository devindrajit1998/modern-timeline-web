
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching experience:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};
