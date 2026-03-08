ALTER TABLE public.husky_knowledge ADD COLUMN language text NOT NULL DEFAULT 'en';
ALTER TABLE public.husky_knowledge ADD COLUMN keywords text;