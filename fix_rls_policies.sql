-- Fix RLS Policies for CV functionality
-- Run this in your Supabase SQL Editor

-- 1. Add cv_url column if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cv_url TEXT;

-- 2. Create documents storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-documents', 'portfolio-documents', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Drop existing storage policies to avoid conflicts
DROP POLICY IF EXISTS "Public can view documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;

-- 4. Create storage policies for documents
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

-- 5. Ensure profiles table has proper RLS policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- 6. Verify policies are working
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('profiles', 'storage.objects')
ORDER BY tablename, policyname; 