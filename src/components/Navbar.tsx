import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Portfolio Gallery' },
    { id: 'contact', label: 'Contact & Map' },
    { id: 'admin', label: 'Staff Portal' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF9F5]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#F8E1E7]'
          : 'bg-[#FFF9F5]/80 backdrop-blur-xs py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Official Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="group flex items-center whitespace-nowrap shrink-0 cursor-pointer focus:outline-hidden"
            aria-label="Angie's Salon Home"
          >
            <img
              src="/images/logo.png"
              alt="Angie's Salon"
              className="h-16 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
          </button>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5A5559]">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#9A4E65] font-semibold'
                      : 'hover:text-[#1E1E24]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A9A6] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('book')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] active:scale-95 transition-all duration-200 rounded-full shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F8E1E7]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleLinkClick('book')}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#9A4E65] rounded-full cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1E1E24] hover:text-[#9A4E65] transition-colors rounded-lg focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF9F5] border-b border-[#F8E1E7] px-6 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-base font-medium py-2 transition-colors ${
                    isActive ? 'text-[#9A4E65] font-semibold' : 'text-[#4A4448]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-[#F8E1E7]">
              <button
                onClick={() => handleLinkClick('book')}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#9A4E65] hover:bg-[#853E54] rounded-xl transition-all shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
