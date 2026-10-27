import React from 'react';
import { X, Sparkles, Tag } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onBookService?: (category: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onBookService }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#FFF9F5] rounded-3xl overflow-hidden shadow-2xl border border-[#F8E1E7] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black transition-colors shadow-md cursor-pointer"
          aria-label="Close image modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Showcase with Photography */}
        <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#1E1E24]">
          <img
            src={
              item.category === 'Bridal'
                ? '/src/assets/images/service_bridal_glam_1793132482542.jpg'
                : item.category === 'Hair' || item.category === 'Before & After'
                ? '/src/assets/images/service_balayage_silk_1793132482307.jpg'
                : item.category === 'Skin'
                ? '/src/assets/images/service_facial_radiance_1793132482015.jpg'
                : '/src/assets/images/hero_angies_salon_1793132482423.jpg'
            }
            alt={item.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium uppercase tracking-wider mb-2 self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              {item.category} Portfolio
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              {item.title}
            </h3>
            <p className="text-xs text-white/80 font-medium tracking-widest uppercase mt-1">
              Angie's Salon · Khadda Market DHA Phase 5 Karachi
            </p>
          </div>
        </div>

        {/* Details & CTA */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#9A4E65] font-semibold">
            <Tag className="w-3.5 h-3.5" />
            <span>{item.tag}</span>
            <span className="text-gray-300">·</span>
            <span className="text-[#635D61]">Master Artist Execution</span>
          </div>

          <p className="text-sm leading-relaxed text-[#4A4448]">
            {item.description}
          </p>

          <div className="pt-4 border-t border-[#F8E1E7] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#827A7F]">
              Available by appointment at Khadda Market studio
            </span>
            {onBookService && (
              <button
                onClick={() => {
                  onClose();
                  onBookService(item.category);
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] rounded-full transition-all cursor-pointer shadow-xs"
              >
                Book This Look
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
