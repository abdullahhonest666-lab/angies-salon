import React from 'react';
import { Sparkles, Shield, Heart, Award, CheckCircle } from 'lucide-react';
import { STYLISTS, SALON_INFO, SALON_IMAGES } from '../data/staticContent';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
          Heritage & Artistry
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E1E24]">
          The Story of Angie's Salon
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5256] leading-relaxed">
          Crafting Karachi's most intimate, hygienic, and transformative beauty experience at Khadda Market, DHA Phase 5.
        </p>
      </div>

      {/* Main Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
            Est. 2010 · DHA Karachi
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1E24] leading-snug">
            Born from a Passion for Uncompromising Feminine Grace
          </h2>
          <p className="text-sm leading-relaxed text-[#5A5256]">
            After training across leading beauty academies in London and premier high-fashion salons in Dubai, Angie noticed a glaring void in Karachi’s salon landscape: chaotic, overcrowded spaces where clients were rushed and tools were rarely autoclaved.
          </p>
          <p className="text-sm leading-relaxed text-[#5A5256]">
            Angie’s Salon was established on Khayaban-e-Shamsheer as an antidote to commercial salon stress. Here, appointments are paced with care, every client is treated with unhurried devotion, and only the highest grade of imported European formulas touch your hair and skin.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#F8E1E7]">
              <h4 className="text-2xl font-serif font-bold text-[#9A4E65]">16+</h4>
              <p className="text-xs text-[#6B6368] mt-1">Years of master bridal & hair artistry in Karachi</p>
            </div>
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white border border-[#F8E1E7] hover:border-[#C9A9A6] transition-colors"
            >
              <h4 className="text-base font-serif font-bold text-[#D4AF37]">Google Reviews</h4>
              <p className="text-xs text-[#6B6368] mt-1">Read reviews on our Google Maps profile</p>
            </a>
          </div>
        </div>

        {/* Visual Pillars Box & Studio Photography */}
        <div className="bg-gradient-to-br from-[#FFF9F5] via-[#F8E1E7]/40 to-[#FFF9F5] rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] space-y-6">
          <div className="rounded-2xl overflow-hidden border border-[#F8E1E7] shadow-md h-52 sm:h-60 relative">
            <img
              src={SALON_IMAGES.salonExterior}
              alt="Angie's Salon exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 text-white">
              <div className="flex items-center gap-2">
                <img
                  src="/images/fav-icon.png"
                  alt="Emblem"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-xs font-semibold">Khadda Market Studio · DHA Phase 5</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A4E65]">
            <Sparkles className="w-4 h-4" />
            <span>Our Founding Pillars</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#F8E1E7]">
              <Shield className="w-5 h-5 text-[#9A4E65] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#1E1E24]">Medical Autoclave Sterilization</h3>
                <p className="text-xs text-[#6B6368] mt-0.5">
                  Every manicure and pedicure tool undergoes hospital-grade autoclave sterilization and sealed packaging.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#F8E1E7]">
              <Heart className="w-5 h-5 text-[#9A4E65] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#1E1E24]">Private & Serene Ambiance</h3>
                <p className="text-xs text-[#6B6368] mt-0.5">
                  Dedicated bridal dressing lounges, private hijab-friendly hair stations, and a quiet, peaceful sanctuary.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#F8E1E7]">
              <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#1E1E24]">Continuous Global Certification</h3>
                <p className="text-xs text-[#6B6368] mt-0.5">
                  Our stylists participate annually in international styling masterclasses across Milan, Dubai, and Istanbul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Master Stylists */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
            The Artists Behind The Magic
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1E1E24]">
            Meet Our Master Specialists
          </h2>
          <p className="text-xs text-[#6B6368]">
            Passionate artisans devoted to crafting hair dimension, flawless complexions, and signature nails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLISTS.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-white rounded-3xl p-6 border border-[#F8E1E7] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Monogram Graphic Portrait */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9A4E65] to-[#C9A9A6] flex items-center justify-center text-white text-xl font-serif font-bold mb-5 shadow-xs">
                  {stylist.name.charAt(0)}
                </div>

                <div className="space-y-1 mb-3">
                  <h3 className="text-base font-serif font-bold text-[#1E1E24]">
                    {stylist.name}
                  </h3>
                  <p className="text-xs text-[#9A4E65] font-semibold">{stylist.role}</p>
                  <p className="text-[11px] text-[#8C827D]">{stylist.experience}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8E1E7] mb-4">
                  <span className="text-[10px] text-[#8C827D] uppercase tracking-wider block font-medium">
                    Specialty
                  </span>
                  <p className="text-xs font-semibold text-[#1E1E24] mt-0.5">
                    {stylist.specialty}
                  </p>
                </div>

                <p className="text-xs text-[#5E565B] leading-relaxed">
                  {stylist.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F8E1E7]">
                <button
                  onClick={() => onNavigate('book')}
                  className="w-full py-2 text-xs font-semibold uppercase tracking-wider text-[#9A4E65] hover:bg-[#F8E1E7] rounded-full transition-colors cursor-pointer border border-[#F8E1E7]"
                >
                  Book with {stylist.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hygiene & Ambiance Banner */}
      <div className="bg-[#1E1E24] text-white rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              Clean Beauty Commitment
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Surgical Sanitation, Pure Serenity
            </h3>
            <p className="text-xs leading-relaxed text-[#B5ABA5]">
              We take pride in setting the hygiene benchmark in DHA Karachi. From single-use disposable towels and pedicure liners to autoclave pouches, your wellness and safety remain sacred.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('book')}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] rounded-full transition-colors cursor-pointer shadow-xs"
              >
                Schedule Your Sanctuary Visit
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "All nail clippers, nippers, and e-file drill bits sterilized at 250°F",
              "Disinfected shampoo basins between every individual wash",
              "Complimentary chilled infused water and organic green teas",
              "High-speed salon Wi-Fi and mobile charging stations at every vanity",
              "Valet parking assistance available on Khayaban-e-Shamsheer",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-[#E5DFDA]">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
