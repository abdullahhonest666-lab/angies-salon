import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { BackToTop } from './components/BackToTop';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookPage } from './pages/BookPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Service } from './types';
import { api } from './services/api';
import { INITIAL_SERVICES } from './data/seedServices';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);

  // Fetch live services from backend
  useEffect(() => {
    api.getServices()
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        }
      })
      .catch((err) => {
        console.warn('Using seeded services fallback:', err);
      });
  }, []);

  const handleNavigate = (tab: string, serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForBooking(serviceId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceIdOrCategory: string) => {
    // If it's a known service id, select it; otherwise find first matching category
    const foundService = services.find(
      (s) => s.id === serviceIdOrCategory || s.category.toLowerCase().includes(serviceIdOrCategory.toLowerCase())
    );

    if (foundService) {
      setSelectedServiceForBooking(foundService.id);
    } else {
      setSelectedServiceForBooking(undefined);
    }
    setCurrentTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1E1E24] selection:bg-[#F8E1E7] selection:text-[#9A4E65]">
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        {currentTab === 'home' && (
          <HomePage services={services} onNavigate={handleNavigate} />
        )}
        {currentTab === 'services' && (
          <ServicesPage services={services} onBookService={handleBookService} />
        )}
        {currentTab === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentTab === 'gallery' && (
          <GalleryPage onBookService={handleBookService} />
        )}
        {currentTab === 'book' && (
          <BookPage
            services={services}
            initialServiceId={selectedServiceForBooking}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
        {currentTab === 'contact' && (
          <ContactPage />
        )}
        {currentTab === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Global Elements */}
      <WhatsAppWidget />
      <BackToTop />
    </div>
  );
}
