import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Person } from '@/lib/persons';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const personSchema = z.object({
  name: z.string().trim().min(1, 'الاسم مطلوب').max(100, 'الاسم يجب أن يكون أقل من 100 حرف'),
  description: z.string().trim().max(1000, 'الوصف يجب أن يكون أقل من 1000 حرف').optional(),
  birth_date: z.string().trim().max(50, 'تاريخ الميلاد يجب أن يكون أقل من 50 حرف').optional(),
  death_date: z.string().trim().max(50, 'تاريخ الوفاة يجب أن يكون أقل من 50 حرف').optional(),
  image_url: z.string().trim().max(500, 'رابط الصورة يجب أن يكون أقل من 500 حرف')
    .refine((val) => !val || val === '' || z.string().url().safeParse(val).success, {
      message: 'يرجى إدخال رابط صحيح'
    }).optional()
});

interface PersonFormProps {
  person?: Person;
  onSubmit: (person: Omit<Person, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel?: () => void;
}

const PersonForm = ({ person, onSubmit, onCancel }: PersonFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    birth_date: '',
    death_date: '',
    image_url: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name || '',
        description: person.description || '',
        birth_date: person.birth_date || '',
        death_date: person.death_date || '',
        image_url: person.image_url || ''
      });
      setImagePreview(person.image_url || '');
    } else {
      setFormData({
        name: '',
        description: '',
        birth_date: '',
        death_date: '',
        image_url: ''
      });
      setImagePreview('');
    }
  }, [person]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'خطأ',
          description: 'يرجى اختيار ملف صورة',
          variant: 'destructive'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'خطأ',
          description: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت',
          variant: 'destructive'
        });
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setUploading(true);
    
    try {
      const validatedData = personSchema.parse(formData);
      let imageUrl = validatedData.image_url || '';
      
      // Upload image if a new file was selected
      if (imageFile) {
        const { supabase } = await import('@/integrations/supabase/client');
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = fileName;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('person-images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error('فشل رفع الصورة');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('person-images')
          .getPublicUrl(uploadData.path);

        imageUrl = publicUrl;
      }
      
      onSubmit({
        name: validatedData.name,
        description: validatedData.description || '',
        birth_date: validatedData.birth_date || '',
        death_date: validatedData.death_date || '',
        image_url: imageUrl
      });
      
      toast({
        title: 'نجح',
        description: person ? 'تم تحديث البيانات بنجاح' : 'تم إضافة الشخص بنجاح'
      });
      
      if (!person) {
        setFormData({
          name: '',
          description: '',
          birth_date: '',
          death_date: '',
          image_url: ''
        });
        setImageFile(null);
        setImagePreview('');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: 'خطأ في التحقق',
          description: 'يرجى التحقق من البيانات المدخلة',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'خطأ',
          description: error instanceof Error ? error.message : 'حدث خطأ أثناء الحفظ',
          variant: 'destructive'
        });
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{person ? 'تعديل الشخص' : 'إضافة شخص جديد'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              dir="rtl"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              dir="rtl"
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birth_date">تاريخ الميلاد</Label>
              <Input
                id="birth_date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                placeholder="مثال: 1950"
                dir="rtl"
                className={errors.birth_date ? 'border-destructive' : ''}
              />
              {errors.birth_date && <p className="text-sm text-destructive">{errors.birth_date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="death_date">تاريخ الوفاة</Label>
              <Input
                id="death_date"
                value={formData.death_date}
                onChange={(e) => setFormData({ ...formData, death_date: e.target.value })}
                placeholder="مثال: 2020"
                dir="rtl"
                className={errors.death_date ? 'border-destructive' : ''}
              />
              {errors.death_date && <p className="text-sm text-destructive">{errors.death_date}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_file">صورة الشخص</Label>
            <Input
              id="image_file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              الحد الأقصى لحجم الصورة: 5 ميجابايت
            </p>
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="معاينة الصورة" 
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={uploading}>
              {uploading ? 'جاري الحفظ...' : person ? 'تحديث' : 'إضافة'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={uploading}>
                إلغاء
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonForm;