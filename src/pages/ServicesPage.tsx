import React, { useState } from 'react';
import { Search, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServicesPageProps {
  services: Service[];
  onBookService: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ services, onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Hair', 'Skin', 'Nails', 'Bridal', 'Waxing & Threading'];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
          A La Carte Menu & Luxury Rituals
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E1E24]">
          Salon Services & Transparent PKR Pricing
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5256] leading-relaxed">
          Every service includes a personalized consultation, imported organic botanicals, and hospital-grade instrument sterilization at our Khadda Market DHA Phase 5 studio.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-6">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search treatments (e.g. balayage, hydra-facial, bridal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#F8E1E7] rounded-full text-xs text-[#1E1E24] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#C9A9A6] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs (Segmented interactive buttons) */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#F8E1E7] p-8">
          <p className="text-sm font-semibold text-[#1E1E24]">No services found</p>
          <p className="text-xs text-[#8C827D] mt-1">Try another search keyword or switch categories.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 text-xs text-[#9A4E65] border border-[#9A4E65] rounded-full hover:bg-[#F8E1E7]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F8E1E7] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[#9A4E65] font-semibold tracking-wider uppercase text-[11px]">
                    {service.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#8C827D] text-[11px]">
                    <Clock className="w-3 h-3 text-[#C9A9A6]" />
                    {service.durationMinutes} mins
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-serif font-bold text-[#1E1E24] leading-snug">
                    {service.name}
                  </h3>
                  {service.popular && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-[#D4AF37] bg-[#FFF9F5] px-2 py-0.5 rounded-full border border-[#D4AF37]/30 shrink-0">
                      <Sparkles className="w-2.5 h-2.5" />
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5E565B] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#F8E1E7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C827D] uppercase tracking-wider block">
                    Investment
                  </span>
                  <span className="text-base font-bold text-[#1E1E24] font-mono tabular-nums">
                    PKR {service.pricePKR.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onBookService(service.id)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] active:scale-95 transition-all rounded-full cursor-pointer shadow-xs"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Salon Assurance Note */}
      <div className="bg-[#FFF9F5] rounded-3xl p-8 border border-[#F8E1E7] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <div className="inline-flex p-2 rounded-full bg-[#F8E1E7] text-[#9A4E65] mb-1">
            <Check className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-[#1E1E24]">No Hidden Surcharges</h4>
          <p className="text-[11px] text-[#7A7277]">Every cost is transparently communicated during consultation.</p>
        </div>
        <div className="space-y-1">
          <div className="inline-flex p-2 rounded-full bg-[#F8E1E7] text-[#9A4E65] mb-1">
            <Check className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-[#1E1E24]">Allergies & Patch Testing</h4>
          <p className="text-[11px] text-[#7A7277]">Complimentary skin test provided 24-48 hours before chemical services.</p>
        </div>
        <div className="space-y-1">
          <div className="inline-flex p-2 rounded-full bg-[#F8E1E7] text-[#9A4E65] mb-1">
            <Check className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-[#1E1E24]">Bridal Consultation Trials</h4>
          <p className="text-[11px] text-[#7A7277]">Dedicated private appointments with Angie for bespoke wedding styling.</p>
        </div>
      </div>
    </div>
  );
};
