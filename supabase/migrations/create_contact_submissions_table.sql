-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_submissions
CREATE POLICY "Allow public insert for contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin to view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin to delete contact submissions"
  ON public.contact_submissions FOR DELETE
  USING (auth.role() = 'authenticated'); 