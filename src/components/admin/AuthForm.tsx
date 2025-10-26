import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
};

const isPasswordValid = (password: string) => {
  const checks = validatePassword(password);
  return Object.values(checks).every(check => check);
};

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const { toast } = useToast();
  
  const passwordChecks = validatePassword(password);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid(password)) {
      toast({
        title: 'كلمة مرور ضعيفة',
        description: 'يرجى اتباع جميع متطلبات كلمة المرور',
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`
      }
    });

    if (error) {
      toast({
        title: 'خطأ في التسجيل',
        description: 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'تم التسجيل بنجاح',
        description: 'يمكنك الآن تسجيل الدخول'
      });
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'مرحباً بك',
        description: 'تم تسجيل الدخول بنجاح'
      });
    }

    setLoading(false);
  };

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
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">البريد الإلكتروني</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    required
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">كلمة المرور</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    required
                    dir="rtl"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    required
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">كلمة المرور</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setShowPasswordChecks(true)}
                    placeholder="أدخل كلمة المرور"
                    required
                    minLength={8}
                    dir="rtl"
                  />
                  {showPasswordChecks && (
                    <div className="space-y-1 p-3 bg-slate-50 rounded-md text-sm">
                      <p className="font-medium mb-2">متطلبات كلمة المرور:</p>
                      <div className="flex items-center gap-2">
                        {passwordChecks.length ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-slate-400" />}
                        <span className={passwordChecks.length ? 'text-green-600' : 'text-slate-500'}>8 أحرف على الأقل</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.uppercase ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-slate-400" />}
                        <span className={passwordChecks.uppercase ? 'text-green-600' : 'text-slate-500'}>حرف كبير واحد على الأقل (A-Z)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.lowercase ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-slate-400" />}
                        <span className={passwordChecks.lowercase ? 'text-green-600' : 'text-slate-500'}>حرف صغير واحد على الأقل (a-z)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.number ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-slate-400" />}
                        <span className={passwordChecks.number ? 'text-green-600' : 'text-slate-500'}>رقم واحد على الأقل (0-9)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.special ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-slate-400" />}
                        <span className={passwordChecks.special ? 'text-green-600' : 'text-slate-500'}>رمز خاص واحد على الأقل (!@#$%^&*)</span>
                      </div>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;