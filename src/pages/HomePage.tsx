import React from 'react';
import { 
  Sparkles, Calendar, ChevronRight, ShieldCheck, Heart,
  Award, Clock, CheckCircle2, ArrowRight, Instagram, MapPin, ExternalLink
} from 'lucide-react';
import { Service } from '../types';
import { SALON_INFO, SALON_IMAGES } from '../data/staticContent';

interface HomePageProps {
  services: Service[];
  onNavigate: (tab: string, serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ services, onNavigate }) => {
  const featuredServices = services.filter((s) => s.popular).slice(0, 4);

  return (
    <div className="space-y-24 pb-16">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12">
        {/* Soft atmospheric luxury gradients & light mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F5] via-[#F8E1E7]/40 to-[#FFF9F5] -z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F8E1E7] to-[#D4AF37]/15 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
        
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A9A6_1px,transparent_1px)] [background-size:24px_24px] -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          {/* Google Business Listing */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#F8E1E7] shadow-xs text-xs font-medium text-[#7A4050] hover:text-[#9A4E65]"
            >
              <img
                src="/images/fav-icon.png"
                alt="Angie's Salon Emblem"
                className="w-5 h-5 object-contain"
              />
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-semibold text-[#1E1E24]">View Google listing & reviews</span>
              <span className="hidden sm:inline text-[#8C827D]">· DHA Phase 5 Karachi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1E1E24] tracking-tight leading-[1.15] mb-6 text-balance">
            Where Elegance Meets <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#9A4E65] bg-gradient-to-r from-[#9A4E65] via-[#B86B80] to-[#C9A9A6] bg-clip-text text-transparent">
              Artistic Perfection
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5A5256] leading-relaxed mb-10 font-sans text-balance">
            Karachi’s dedicated sanctuary for haute coiffure, ammonia-free dimensional balayage, medical hydra-facials, and regal bridal artistry at Khadda Market, Khayaban-e-Shamsheer.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => onNavigate('book')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] active:scale-95 transition-all duration-200 rounded-full shadow-md hover:shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#F8E1E7]" />
              <span>Book An Appointment</span>
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1E1E24] bg-white hover:bg-[#FFF9F5] border border-[#E8D5D5] active:scale-95 transition-all duration-200 rounded-full shadow-xs cursor-pointer"
            >
              <span>View Treatment Menu & Pricing</span>
              <ChevronRight className="w-4 h-4 text-[#9A4E65]" />
            </button>
          </div>

          {/* Hero Visual Salon Ambiance Showcase */}
          <div className="mt-12 relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[#F8E1E7] shadow-2xl group">
            <img
              src={SALON_IMAGES.bridalCloseup}
              alt="Bridal makeup and traditional jewelry at Angie's Salon"
              className="w-full h-64 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-6 sm:p-8 text-left text-white">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#D4AF37] block">
                  Studio Atmosphere
                </span>
                <p className="font-serif text-lg sm:text-2xl font-bold">
                  Khadda Market, Khayaban-e-Shamsheer, DHA Phase 5
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Private Ladies Sanctuary
              </span>
            </div>
          </div>

          {/* Quick Pillars Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-white/70 border border-[#F8E1E7] backdrop-blur-xs">
              <ShieldCheck className="w-5 h-5 text-[#9A4E65] mb-2" />
              <p className="text-xs font-semibold text-[#1E1E24]">Medical Sterilization</p>
              <p className="text-[11px] text-[#7A7277]">Autoclaved tools for every guest</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-[#F8E1E7] backdrop-blur-xs">
              <Award className="w-5 h-5 text-[#D4AF37] mb-2" />
              <p className="text-xs font-semibold text-[#1E1E24]">London & Dubai Trained</p>
              <p className="text-[11px] text-[#7A7277]">16+ years master artistry</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-[#F8E1E7] backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-[#9A4E65] mb-2" />
              <p className="text-xs font-semibold text-[#1E1E24]">Ammonia-Free Care</p>
              <p className="text-[11px] text-[#7A7277]">Gentle Italian organic glazes</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-[#F8E1E7] backdrop-blur-xs">
              <Heart className="w-5 h-5 text-[#C9A9A6] mb-2" />
              <p className="text-xs font-semibold text-[#1E1E24]">Private Bridal Suite</p>
              <p className="text-[11px] text-[#7A7277]">Personalized luxury experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED SIGNATURE SERVICES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
              Curated Treatments
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1E24] mt-2">
              Signature Salon Experiences
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9A4E65] hover:text-[#853E54] group cursor-pointer"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => {
            const getServiceImage = () => {
              if (service.id === 'hair-1') return SALON_IMAGES.styledHair;
              if (service.id === 'hair-2') return '/images/service_balayage_silk.jpg';
              if (service.id === 'hair-3') return SALON_IMAGES.styledUpdo;
              if (service.id === 'skin-1') return '/images/service_facial_radiance.jpg';
              if (service.category === 'Hair') return '/images/service_balayage_silk.jpg';
              if (service.category === 'Bridal') return '/images/service_bridal_glam.jpg';
              if (service.category === 'Skin') return '/images/service_facial_radiance.jpg';
              return '/images/hero_angies_salon.jpg';
            };

            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-[#F8E1E7] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#F8E1E7]">
                  <img
                    src={getServiceImage()}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] uppercase font-bold text-[#9A4E65] shadow-xs">
                    {service.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[#8C827D] text-[11px] mb-1.5">
                      <Clock className="w-3 h-3 text-[#C9A9A6]" />
                      <span>{service.durationMinutes} mins</span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#1E1E24] group-hover:text-[#9A4E65] transition-colors leading-snug mb-2">
                      {service.name}
                    </h3>

                    <p className="text-xs text-[#6B6368] line-clamp-2 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F8E1E7] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8C827D] uppercase tracking-wider block">
                        Starting from
                      </span>
                      <span className="text-sm font-bold text-[#1E1E24] font-mono tabular-nums">
                        PKR {service.pricePKR.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate('book', service.id)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] rounded-full transition-colors cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= STORY / WHY CHOOSE US ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FFF9F5] via-[#F8E1E7]/50 to-[#FFF9F5] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#F8E1E7]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
                The Angie's Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1E24] leading-tight">
                Crafting Personalized Beauty for Karachi's Discerning Women
              </h2>
              <p className="text-sm leading-relaxed text-[#5A5256]">
                Founded with a conviction that salon visits should be an oasis of calm rather than a rushed assembly line, Angie’s Salon offers tailored consultations, hospital-grade instrument sterilization, and an unhurried, attentive atmosphere.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9A4E65] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1E1E24]">Strict Single-Use & Autoclave Hygiene</h4>
                    <p className="text-xs text-[#6B6368]">Every file, buffer, and metal utensil is individually sanitized for each client.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9A4E65] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1E1E24]">Imported Botanical & Ammonia-Free Formulas</h4>
                    <p className="text-xs text-[#6B6368]">Protecting hair integrity and skin barrier even in Karachi’s coastal humidity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9A4E65] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1E1E24]">Transparent PKR Pricing</h4>
                    <p className="text-xs text-[#6B6368]">No surprise add-ons. Full consultation before any chemical service begins.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1E1E24] hover:bg-[#332E32] rounded-full transition-colors cursor-pointer"
                >
                  <span>Meet Our Artists & Story</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Visual Ambiance Card Showcase */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden bg-white border border-[#F8E1E7] shadow-xl relative z-1">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src="/images/service_bridal_glam.jpg"
                    alt="Signature Bridal Glam at Angie's Salon"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                        Royal Bridal Transformations
                      </span>
                      <p className="font-serif text-lg font-bold">
                        Bespoke Artistry by Angie
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 text-center">
                  <p className="font-serif italic text-base sm:text-lg text-[#1E1E24] leading-relaxed mb-3">
                    “Beauty is not about masking who you are; it is about illuminating your purest, most confident grace.”
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9A4E65]">
                    — Angie, Creative Director
                  </p>
                  <p className="text-[11px] text-[#8C827D] mt-0.5">Khadda Market, DHA Phase 5, Karachi</p>

                  <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#F8E1E7] text-center">
                    <div>
                      <span className="text-xl font-serif font-bold text-[#1E1E24]">15,000+</span>
                      <p className="text-[10px] text-[#7A7277] uppercase tracking-wider mt-0.5">Satisfied Clients</p>
                    </div>
                    <div>
                      <span className="text-xl font-serif font-bold text-[#1E1E24]">16+ Yrs</span>
                      <p className="text-[10px] text-[#7A7277] uppercase tracking-wider mt-0.5">Mastery & Care</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS & LISTING ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
            Find Us Online
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1E24] mt-2">
            Reviews & Studio Information
          </h2>
          <p className="text-xs text-[#7A7277] mt-3">
            Visit our Google Maps profile for reviews and directions, or see our business listing on Lookup.pk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs hover:shadow-md transition-shadow"
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
              <MapPin className="w-4 h-4" />
              Google Maps
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1E1E24] mt-3 group-hover:text-[#9A4E65]">
              Read Reviews & Get Directions
            </h3>
            <p className="text-xs text-[#6B6368] mt-2">
              Open Angie's Salon and institute on Google Maps.
            </p>
          </a>
          <a
            href={SALON_INFO.lookupUrl}
            target="_blank"
            rel="noreferrer"
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs hover:shadow-md transition-shadow"
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
              <ExternalLink className="w-4 h-4" />
              Lookup.pk
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1E1E24] mt-3 group-hover:text-[#9A4E65]">
              View Business Listing
            </h3>
            <p className="text-xs text-[#6B6368] mt-2">
              See Angie's Salon's business profile on Lookup.pk.
            </p>
          </a>
        </div>
      </section>

      {/* ================= INSTAGRAM / COMMUNITY SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFF9F5] border border-[#F8E1E7] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
              <Instagram className="w-4 h-4" />
              Follow Our Journey
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1E24]">
              Join the Angie's Salon Family
            </h3>
            <p className="text-xs text-[#6B6368]">
              Search <span className="font-semibold text-[#1E1E24]">“Angie’s Salon DHA”</span> on Instagram & Facebook for daily bridal looks, balayage transformations, and client moments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('gallery')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1E1E24] bg-white border border-[#E8D5D5] hover:bg-[#F8E1E7] rounded-full transition-colors cursor-pointer"
            >
              Browse Gallery
            </button>
            <button
              onClick={() => onNavigate('book')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] rounded-full transition-colors cursor-pointer shadow-xs"
            >
              Book An Experience
            </button>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA STRIP ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#9A4E65] to-[#7A364C] rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Reserve Your Salon Hour
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Ready to Treat Yourself to Unmatched Salon Luxury?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Book online in under 2 minutes. Receive instant confirmation and direct WhatsApp concierge support from our front-desk reception.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('book')}
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#9A4E65] bg-white hover:bg-[#FFF9F5] rounded-full transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                Schedule Appointment Now
              </button>
              <a
                href={`tel:${SALON_INFO.phonePrimary}`}
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/40 hover:bg-white/10 rounded-full transition-all text-center"
              >
                Call: {SALON_INFO.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
