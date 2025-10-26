import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Person } from '@/lib/persons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PersonListProps {
  persons: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
}

const PersonList = ({ persons, onEdit, onDelete }: PersonListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة الأشخاص ({persons.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {persons.length === 0 ? (
            <p className="text-center text-slate-600 py-8">لا توجد أشخاص حالياً</p>
          ) : (
            persons.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{person.name}</h3>
                  {person.description && (
                    <p className="text-sm text-slate-600 mt-1">{person.description}</p>
                  )}
                  {(person.birth_date || person.death_date) && (
                    <p className="text-sm text-slate-500 mt-1">
                      {person.birth_date && `الميلاد: ${person.birth_date}`}
                      {person.birth_date && person.death_date && ' | '}
                      {person.death_date && `الوفاة: ${person.death_date}`}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(person)}
                    title="تعديل"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent dir="rtl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                        <AlertDialogDescription>
                          هذا الإجراء لا يمكن التراجع عنه. سيتم حذف {person.name} نهائياً.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(person.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          حذف
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonList;