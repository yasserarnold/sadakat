import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 rounded-full p-3 shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
          aria-label="العودة إلى الأعلى"
        >
          <ChevronUp className="h-5 w-5" />
          <span className="mr-1">الي الاعلي</span>
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;