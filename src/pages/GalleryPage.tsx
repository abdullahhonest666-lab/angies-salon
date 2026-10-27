import React, { useState } from 'react';
import { Sparkles, Maximize2, Tag } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/staticContent';
import { GalleryItem } from '../types';
import { Lightbox } from '../components/Lightbox';

interface GalleryPageProps {
  onBookService: (category: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Bridal', 'Hair', 'Skin', 'Nails', 'Before & After'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
          Visual Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E1E24]">
          Artistry & Client Transformations
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5256] leading-relaxed">
          Explore our real bride looks, dimensional hair balayage, dewy hydra-facials, and pristine Russian manicures created at our Karachi studio.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                active
                  ? 'bg-[#9A4E65] text-white shadow-xs'
                  : 'bg-white text-[#5A5256] border border-[#F8E1E7] hover:bg-[#FFF9F5] hover:text-[#1E1E24]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#F8E1E7] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Photography Canvas */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F8E1E7]">
              <img
                src={
                  item.category === 'Bridal'
                    ? '/images/service_bridal_glam.jpg'
                    : item.category === 'Hair' || item.category === 'Before & After'
                    ? '/images/service_balayage_silk.jpg'
                    : item.category === 'Skin'
                    ? '/images/service_facial_radiance.jpg'
                    : '/images/hero_angies_salon.jpg'
                }
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider mb-1.5 self-start">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  {item.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                  {item.title}
                </h3>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1E1E24] text-xs font-semibold shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5 text-[#9A4E65]" />
                  Enlarge Look
                </span>
              </div>
            </div>

            {/* Caption & Tag */}
            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#9A4E65] font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {item.tag}
                </span>
                <span className="text-[#8C827D] text-[11px]">DHA Karachi Studio</span>
              </div>
              <p className="text-xs text-[#5E565B] leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onBookService={onBookService}
      />
    </div>
  );
};
