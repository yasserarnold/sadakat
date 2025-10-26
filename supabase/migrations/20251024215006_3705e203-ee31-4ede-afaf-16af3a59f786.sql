-- Create persons table
CREATE TABLE public.persons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  birth_date TEXT,
  death_date TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.persons ENABLE ROW LEVEL SECURITY;

-- Create policy for everyone to view persons
CREATE POLICY "Anyone can view persons"
ON public.persons
FOR SELECT
USING (true);

-- Create policy for authenticated users to insert persons
CREATE POLICY "Authenticated users can insert persons"
ON public.persons
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated users to update persons
CREATE POLICY "Authenticated users can update persons"
ON public.persons
FOR UPDATE
TO authenticated
USING (true);

-- Create policy for authenticated users to delete persons
CREATE POLICY "Authenticated users can delete persons"
ON public.persons
FOR DELETE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_persons_updated_at
BEFORE UPDATE ON public.persons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();