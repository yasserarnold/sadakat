import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, LogOut } from 'lucide-react';
import { personStorage } from '@/lib/personStorage';
import { getAllPersons, Person } from '@/data/persons';
import PersonForm from '@/components/admin/PersonForm';
import PersonList from '@/components/admin/PersonList';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [allPersons, setAllPersons] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsAuthenticated(personStorage.isAuthenticated());
    if (personStorage.isAuthenticated()) {
      loadPersons();
    }
  }, []);

  const loadPersons = () => {
    setAllPersons(getAllPersons());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (personStorage.authenticate(password)) {
      setIsAuthenticated(true);
      loadPersons();
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحباً بك في لوحة التحكم'
      });
    } else {
      toast({
        title: 'خطأ في كلمة المرور',
        description: 'يرجى التحقق من كلمة المرور والمحاولة مرة أخرى',
        variant: 'destructive'
      });
    }
    setPassword('');
  };

  const handleLogout = () => {
    personStorage.logout();
    setIsAuthenticated(false);
    toast({
      title: 'تم تسجيل الخروج',
      description: 'نراك قريباً'
    });
  };

  const handleAddPerson = (person: Omit<Person, 'id'>) => {
    try {
      personStorage.addPerson(person);
      loadPersons();
      toast({
        title: 'تم إضافة الشخص بنجاح',
        description: `تم إضافة ${person.name}`
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إضافة الشخص',
        variant: 'destructive'
      });
    }
  };

  const handleUpdatePerson = (person: Omit<Person, 'id'>) => {
    if (!editingPerson) return;

    try {
      personStorage.updatePerson(editingPerson.id, person);
      loadPersons();
      setEditingPerson(null);
      toast({
        title: 'تم تحديث الشخص بنجاح',
        description: `تم تحديث ${person.name}`
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تحديث الشخص',
        variant: 'destructive'
      });
    }
  };

  const handleDeletePerson = (id: string) => {
    try {
      personStorage.deletePerson(id);
      loadPersons();
      toast({
        title: 'تم حذف الشخص',
        description: 'تم حذف الشخص بنجاح'
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء حذف الشخص',
        variant: 'destructive'
      });
    }
  };

  const customPersonIds = new Set(personStorage.getCustomPersons().map((p) => p.id));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">لوحة تحكم المدير</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  required
                  dir="rtl" />

                <p className="text-sm text-slate-500">
                  كلمة المرور الافتراضية: admin123
                </p>
              </div>
              <Button type="submit" className="w-full">
                تسجيل الدخول
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50" dir="rtl">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              لوحة تحكم المدير
            </h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-8">
          <PersonForm
            person={editingPerson || undefined}
            onSubmit={editingPerson ? handleUpdatePerson : handleAddPerson}
            onCancel={editingPerson ? () => setEditingPerson(null) : undefined} />


          <PersonList
            persons={allPersons}
            customPersonIds={customPersonIds}
            onEdit={setEditingPerson}
            onDelete={handleDeletePerson} />

        </div>
      </main>
    </div>);

};

export default AdminPage;