import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  // Log error details for debugging (only in development)
  if (import.meta.env.DEV) {
    console.error('Error caught by boundary:', error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-destructive">عذراً، حدث خطأ</h1>
        <p className="text-lg text-muted-foreground">
          حدث خطأ غير متوقع في التطبيق. يرجى المحاولة مرة أخرى.
        </p>
        <p className="text-sm text-muted-foreground">
          إذا استمرت المشكلة، يرجى الاتصال بالدعم الفني.
        </p>
        <Button onClick={resetErrorBoundary} size="lg">
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;