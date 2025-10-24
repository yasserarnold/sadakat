import { useState } from 'react';
import { Person } from '@/data/persons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle } from
'@/components/ui/alert-dialog';

interface PersonListProps {
  persons: Person[];
  customPersonIds: Set<string>;
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
}

const PersonList = ({ persons, customPersonIds, onEdit, onDelete }: PersonListProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <>
      <Card dir="rtl">
        <CardHeader>
          <CardTitle>قائمة الأشخاص</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {persons.map((person) => {
              const isCustom = customPersonIds.has(person.id);
              return (
                <div
                  key={person.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">

                  <Avatar className="h-12 w-12">
                    <AvatarImage src={person.image} alt={person.name} />
                    <AvatarFallback>{person.fallback}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-slate-500">/{person.id}</p>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/person/${person.id}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    {isCustom &&
                    <>
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(person)}>

                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(person.id)}>

                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    }
                  </div>
                </div>);

            })}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف هذا الشخص نهائياً. لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  onDelete(deleteId);
                  setDeleteId(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90">

              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>);

};

export default PersonList;