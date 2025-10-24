import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { Person } from '@/data/persons';

interface PersonFormProps {
  person?: Person;
  onSubmit: (person: Omit<Person, 'id'>) => void;
  onCancel?: () => void;
}

const PersonForm = ({ person, onSubmit, onCancel }: PersonFormProps) => {
  const [name, setName] = useState(person?.name || '');
  const [imageUrl, setImageUrl] = useState(person?.image || '');
  const [fallback, setFallback] = useState(person?.fallback || '');
  const [prayerAudio, setPrayerAudio] = useState(person?.prayerAudio || '');
  const [useUpload, setUseUpload] = useState(false);

  // Sync form state with person prop changes
  useEffect(() => {
    if (person) {
      setName(person.name);
      setImageUrl(person.image);
      setFallback(person.fallback);
      setPrayerAudio(person.prayerAudio || '');
    } else {
      setName('');
      setImageUrl('');
      setFallback('');
      setPrayerAudio('');
    }
  }, [person]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      image: imageUrl || 'https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png',
      fallback: fallback || name.charAt(0),
      prayerAudio: prayerAudio || undefined
    });

    if (!person) {
      setName('');
      setImageUrl('');
      setFallback('');
      setPrayerAudio('');
    }
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle>{person ? 'تعديل الشخص' : 'إضافة شخص جديد'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل الاسم بالعربية"
              required
              dir="rtl" />

          </div>

          <div className="space-y-2">
            <Label htmlFor="fallback">الحرف المختصر *</Label>
            <Input
              id="fallback"
              value={fallback}
              onChange={(e) => setFallback(e.target.value)}
              placeholder="الحرف الأول من الاسم"
              maxLength={2}
              required
              dir="rtl" />

          </div>

          <div className="space-y-2">
            <Label>الصورة</Label>
            <div className="flex gap-2 mb-2">
              <Button
                type="button"
                variant={!useUpload ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUseUpload(false)}>

                <LinkIcon className="h-4 w-4 ml-2" />
                رابط الصورة
              </Button>
              <Button
                type="button"
                variant={useUpload ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUseUpload(true)}>

                <Upload className="h-4 w-4 ml-2" />
                رفع صورة
              </Button>
            </div>

            {useUpload ?
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              dir="rtl" /> :


            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              dir="rtl" />

            }
          </div>

          <div className="space-y-2">
            <Label htmlFor="prayer">رابط الدعاء الصوتي (اختياري)</Label>
            <Input
              id="prayer"
              value={prayerAudio}
              onChange={(e) => setPrayerAudio(e.target.value)}
              placeholder="/audio/doaa.mp3"
              dir="rtl" />

          </div>

          {imageUrl &&
          <div className="space-y-2">
              <Label>معاينة الصورة</Label>
              <img
              src={imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg" />

            </div>
          }

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {person ? 'حفظ التعديلات' : 'إضافة'}
            </Button>
            {onCancel &&
            <Button type="button" variant="outline" onClick={onCancel}>
                إلغاء
              </Button>
            }
          </div>
        </form>
      </CardContent>
    </Card>);

};

export default PersonForm;