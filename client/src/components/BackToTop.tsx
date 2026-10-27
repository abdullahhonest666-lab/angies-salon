import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-[#9A4E65] hover:text-[#853E54] shadow-md hover:shadow-lg border border-[#F8E1E7] transition-all duration-200 active:scale-90 cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
