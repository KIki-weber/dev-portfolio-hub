
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  color TEXT NOT NULL DEFAULT '174 72% 56%',
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone can read projects
CREATE POLICY "Projects are viewable by everyone"
ON public.projects FOR SELECT USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert projects"
ON public.projects FOR INSERT TO authenticated WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update projects"
ON public.projects FOR UPDATE TO authenticated USING (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete projects"
ON public.projects FOR DELETE TO authenticated USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
