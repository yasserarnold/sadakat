import { Person } from '@/data/persons';

const STORAGE_KEY = 'custom_persons';
const AUTH_KEY = 'admin_authenticated';
const ADMIN_PASSWORD = 'ahmed123'; // Change this to your desired password

export const personStorage = {
  // Get all custom persons from localStorage
  getCustomPersons(): Person[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Add a new person
  addPerson(person: Omit<Person, 'id'>): Person {
    const persons = this.getCustomPersons();
    const id = person.name.
    toLowerCase().
    replace(/\s+/g, '-').
    replace(/[^\w\u0600-\u06FF-]/g, '');

    const newPerson: Person = {
      ...person,
      id
    };

    persons.push(newPerson);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
    return newPerson;
  },

  // Update an existing person
  updatePerson(id: string, updates: Partial<Person>): boolean {
    const persons = this.getCustomPersons();
    const index = persons.findIndex((p) => p.id === id);

    if (index === -1) return false;

    // Keep the original ID, merge other updates
    persons[index] = { ...persons[index], ...updates, id };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
    return true;
  },

  // Delete a person
  deletePerson(id: string): boolean {
    const persons = this.getCustomPersons();
    const filtered = persons.filter((p) => p.id !== id);

    if (filtered.length === persons.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Check if person ID exists
  personExists(id: string): boolean {
    return this.getCustomPersons().some((p) => p.id === id);
  },

  // Auth functions
  authenticate(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }
};