CREATE TABLE public.husky_knowledge (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow public read access since these are guides for all users
ALTER TABLE public.husky_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read husky_knowledge"
  ON public.husky_knowledge
  FOR SELECT
  TO anon, authenticated
  USING (true);