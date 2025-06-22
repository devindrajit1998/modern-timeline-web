-- Add cv_url column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cv_url TEXT;

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-documents', 'portfolio-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public can view documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;

-- Create storage policies for documents
CREATE POLICY "Public can view documents" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'portfolio-documents');

CREATE POLICY "Authenticated users can upload documents" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'portfolio-documents' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own documents" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'portfolio-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'portfolio-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Ensure profiles table has proper RLS policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = user_id); 