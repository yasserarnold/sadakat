import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut } from 'lucide-react';
import { getAllPersons, Person, addPerson, updatePerson, deletePerson } from '@/lib/persons';
import PersonForm from '@/components/admin/PersonForm';
import PersonList from '@/components/admin/PersonList';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import AuthForm from '@/components/admin/AuthForm';
import BackToTopButton from '@/components/BackToTopButton';

const AdminPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [allPersons, setAllPersons] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      checkAdminRole();
      loadPersons();
    } else {
      setCheckingRole(false);
      setIsAdmin(false);
    }
  }, [session]);

  const checkAdminRole = async () => {
    setCheckingRole(true);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session?.user?.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    } finally {
      setCheckingRole(false);
    }
  };

  const loadPersons = async () => {
    const data = await getAllPersons();
    setAllPersons(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'تم تسجيل الخروج',
      description: 'نراك قريباً'
    });
  };

  const handleAddPerson = async (personData: Omit<Person, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await addPerson(personData);
      await loadPersons();
      toast({
        title: 'تم إضافة الشخص بنجاح',
        description: `تم إضافة ${personData.name}`
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إضافة الشخص',
        variant: 'destructive'
      });
    }
  };

  const handleUpdatePerson = async (personData: Omit<Person, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingPerson) return;

    try {
      await updatePerson(editingPerson.id, personData);
      await loadPersons();
      setEditingPerson(null);
      toast({
        title: 'تم تحديث الشخص بنجاح',
        description: `تم تحديث ${personData.name}`
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تحديث الشخص',
        variant: 'destructive'
      });
    }
  };

  const handleDeletePerson = async (id: string) => {
    try {
      await deletePerson(id);
      await loadPersons();
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

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-xl text-slate-600">جاري التحميل...</p>
      </div>
    );
  }

  if (!session) {
    return <AuthForm />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-slate-600">غير مصرح لك بالوصول إلى هذه الصفحة</p>
          <p className="text-sm text-slate-500">يجب أن تكون مسؤولاً للوصول إلى لوحة التحكم</p>
          <Button onClick={() => window.location.href = '/'}>
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
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
        <div className="max-w-6xl mx-auto space-y-8">
          <PersonForm
            person={editingPerson || undefined}
            onSubmit={editingPerson ? handleUpdatePerson : handleAddPerson}
            onCancel={editingPerson ? () => setEditingPerson(null) : undefined}
          />

          <PersonList
            persons={allPersons}
            onEdit={setEditingPerson}
            onDelete={handleDeletePerson}
          />
        </div>
      </main>
      <BackToTopButton />
    </div>
  );
};

export default AdminPage;