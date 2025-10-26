-- Create storage bucket for person images
INSERT INTO storage.buckets (id, name, public)
VALUES ('person-images', 'person-images', true);

-- Create policy to allow admins to upload images
CREATE POLICY "Admins can upload person images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'person-images' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Create policy to allow admins to update images
CREATE POLICY "Admins can update person images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'person-images' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Create policy to allow admins to delete images
CREATE POLICY "Admins can delete person images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'person-images' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Create policy to allow anyone to view images
CREATE POLICY "Anyone can view person images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'person-images');