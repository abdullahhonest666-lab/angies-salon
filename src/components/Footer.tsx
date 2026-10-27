import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Sparkles, Star, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/staticContent';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1A1819] text-[#EFE9E4] pt-16 pb-10 border-t border-[#332D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#332D30]">
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="bg-[#FFF9F5] p-2.5 rounded-2xl inline-block shadow-xs">
              <img
                src="/images/logo.png"
                alt="Angie's Salon"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-xs leading-relaxed text-[#B5ABA5]">
              Karachi’s refined sanctuary for haute couture bridal hair, customized color balayage, and clinical skincare aesthetics in DHA Phase 5.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white">4.8 Rating</span>
              <span className="text-xs text-[#998F8A]">· 229+ Google Reviews</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] mb-4">
              Explore Salon
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C5BDB8]">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hair Styling & Balayage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Clinical Hydra-Facials & Peels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Royal Barat & Nikkah Bridal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Russian Gel Manicure & Pedicure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Before & After Portfolio
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Days */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] mb-4 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Salon Hours</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BDB8]">
              {SALON_INFO.hours.map((h, i) => (
                <li key={i} className="flex justify-between border-b border-[#2C2729] pb-1.5">
                  <span className="text-[#998F8A]">{h.days}</span>
                  <span className="font-medium text-white">{h.time}</span>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-[#A69B96] italic">
                * Prior booking recommended for bridal trials and balayage.
              </li>
            </ul>
          </div>

          {/* Contact & Location in DHA Karachi */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>DHA Karachi Studio</span>
            </h4>
            <address className="not-italic space-y-3 text-xs text-[#C5BDB8]">
              <p className="leading-relaxed">
                Khadda Market, Khayaban-e-Shamsheer, DHA Phase 5, Karachi, Pakistan
              </p>
              <div className="space-y-1 pt-1">
                <a
                  href={`tel:${SALON_INFO.phonePrimary}`}
                  className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A9A6]" />
                  <span>{SALON_INFO.phonePrimary}</span>
                </a>
                <a
                  href={`tel:${SALON_INFO.phoneLandline}`}
                  className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors text-[11px] text-[#998F8A]"
                >
                  <Phone className="w-3 h-3 text-[#C9A9A6]" />
                  <span>Landline: {SALON_INFO.phoneLandline}</span>
                </a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://instagram.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-[#272325] hover:bg-[#9A4E65] text-white transition-colors"
                  aria-label="Instagram profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://facebook.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-[#272325] hover:bg-[#9A4E65] text-white transition-colors"
                  aria-label="Facebook page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Credits & Anti-Slop Quiet Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C827D] gap-4">
          <p>
            © {new Date().getFullYear()} Angie's Salon. All rights reserved. Khadda Market, DHA Phase 5, Karachi.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Staff Portal Login
            </button>
            <span className="flex items-center gap-1 text-[11px]">
              Crafted with <Heart className="w-3 h-3 text-[#C9A9A6] fill-current" /> for Karachi Beauty
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
