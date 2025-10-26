import { supabase } from "@/integrations/supabase/client";

export interface Person {
  id: string;
  name: string;
  description?: string;
  birth_date?: string;
  death_date?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllPersons(): Promise<Person[]> {
  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching persons:', error);
    return [];
  }

  return data || [];
}

export async function getPersonById(id: string): Promise<Person | null> {
  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching person:', error);
    return null;
  }

  return data;
}

export async function addPerson(person: Omit<Person, 'id' | 'created_at' | 'updated_at'>): Promise<Person | null> {
  const { data, error } = await supabase
    .from('persons')
    .insert([person])
    .select()
    .single();

  if (error) {
    console.error('Error adding person:', error);
    throw error;
  }

  return data;
}

export async function updatePerson(id: string, person: Partial<Person>): Promise<Person | null> {
  const { data, error } = await supabase
    .from('persons')
    .update(person)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating person:', error);
    throw error;
  }

  return data;
}

export async function deletePerson(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('persons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting person:', error);
    return false;
  }

  return true;
}