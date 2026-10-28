import { Stylist, GalleryItem } from '../types';
import bridalPortrait from '../../imges/1 (1).jpg';
import styledHair from '../../imges/1 (2).jpg';
import bridalCloseup from '../../imges/1 (3).jpg';
import bridalLook from '../../imges/1 (4).jpg';
import floralHair from '../../imges/1 (5).jpg';
import salonExterior from '../../imges/1 (6).jpg';
import salonPortrait from '../../imges/1 (7).jpg';
import salonVisit from '../../imges/1 (8).jpg';
import bridalStyling from '../../imges/1 (9).jpg';
import styledUpdo from '../../imges/1 (10).jpg';
import weddingParty from '../../imges/1 (11).jpg';
import makeupSession from '../../imges/1 (12).jpg';
import salonEvent from '../../imges/1 (13).jpg';

export const SALON_IMAGES = {
  bridalPortrait,
  styledHair,
  bridalCloseup,
  bridalLook,
  floralHair,
  salonExterior,
  salonPortrait,
  salonVisit,
  bridalStyling,
  styledUpdo,
  weddingParty,
  makeupSession,
  salonEvent,
};

export const SALON_INFO = {
  name: "Angie's Salon",
  tagline: "Karachi's Premier Sanctuary for High-Fashion Hair, Bridal Artistry & Skin Rejuvenation",
  address: "Khadda Market, Khayaban-e-Shamsheer, DHA Phase 5, Karachi",
  city: "Karachi, Pakistan",
  phonePrimary: "+92 308 9569291",
  phoneLandline: "021-35851771",
  whatsapp: "+92 308 9569291",
  whatsappRaw: "923089569291",
  email: "appointments@angiesalon.com",
  instagram: "@angiesalondha",
  facebook: "Angie's Salon DHA Karachi",
  googleMapsUrl: "https://www.google.com/maps/place/Angie's+Salon+and+institute/@24.8144609,67.0508242,17z/data=!4m17!1m10!3m9!1s0x3eb33c52fc9215ff:0xd1a477d4a08f757f!2sAngie's+Salon+and+institute!8m2!3d24.8144609!4d67.0508242!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11c1mp8b_x!3m5!1s0x3eb33c52fc9215ff:0xd1a477d4a08f757f!8m2!3d24.8144609!4d67.0508242!16s%2Fg%2F11c1mp8b_x?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D",
  lookupUrl: 'https://www.lookup.pk/company/122964-Angie-Salon',
  hours: [
    { days: "Monday – Saturday", time: "10:30 AM – 8:30 PM" },
    { days: "Sunday", time: "12:00 PM – 7:00 PM" },
  ],
};

export const STYLISTS: Stylist[] = [
  {
    id: 'stylist-angie',
    name: 'Angie (Creative Director)',
    role: 'Founder & Master Bridal Artist',
    experience: '16+ Years Experience',
    specialty: 'Royal Bridal Transformations & High-Fashion Hair Sculpting',
    bio: 'Trained in London and Dubai, Angie founded the salon in DHA Karachi with an uncompromised vision of Parisian luxury and surgical hygiene standards.',
  },
  {
    id: 'stylist-zara',
    name: 'Zara Malik',
    role: 'Senior Balayage & Color Specialist',
    experience: '9+ Years Experience',
    specialty: 'Dimension Balayage, Blonde Corrections & Keratin Glazes',
    bio: 'A certified master colorist specializing in seamless Asian hair transitions, cool ash tones, and glossy caramel sweeps without bleach burnout.',
  },
  {
    id: 'stylist-sara',
    name: 'Sara Qureshi',
    role: 'Aesthetician & Clinical Skin Specialist',
    experience: '8+ Years Experience',
    specialty: 'Hydra-Facials, 24K Gold Therapy & Micro-Needling',
    bio: 'Internationally licensed aesthetician dedicated to holistic clinical facials that restore barrier health and undeniable glass-skin dewiness.',
  },
  {
    id: 'stylist-hina',
    name: 'Hina Rizvi',
    role: 'Nail Artist & Brow Sculptor',
    experience: '6+ Years Experience',
    specialty: 'Russian Dry Manicures, Polygel Art & Brow Architecture',
    bio: 'Known for surgical precision and flawless cuticle work that keeps Karachi influencers returning week after week.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Bridal Portrait',
    category: 'Bridal',
    description: 'A bridal makeup look with traditional jewelry and a softly draped dupatta.',
    tag: 'Bridal Artistry',
    image: SALON_IMAGES.bridalPortrait,
  },
  {
    id: 'gal-2',
    title: 'Soft, Styled Waves',
    category: 'Hair',
    description: 'Glossy, softly curled hair styled for a special occasion.',
    tag: 'Hair Styling',
    image: SALON_IMAGES.styledHair,
  },
  {
    id: 'gal-3',
    title: 'Bridal Makeup Detail',
    category: 'Bridal',
    description: 'A close-up look at bridal makeup and traditional adornments.',
    tag: 'Bridal Artistry',
    image: SALON_IMAGES.bridalCloseup,
  },
  {
    id: 'gal-4',
    title: 'Wedding Day Look',
    category: 'Bridal',
    description: 'A complete occasion look finished with detailed traditional embellishments.',
    tag: 'Bridal Artistry',
    image: SALON_IMAGES.bridalLook,
  },
  {
    id: 'gal-5',
    title: 'Floral Hair Styling',
    category: 'Bridal',
    description: 'Long hair styled with fresh flowers for a festive occasion.',
    tag: 'Occasion Styling',
    image: SALON_IMAGES.floralHair,
  },
  {
    id: 'gal-6',
    title: 'Salon Exterior',
    category: 'Salon',
    description: 'A view of the salon from the street.',
    tag: 'Visit Us',
    image: SALON_IMAGES.salonExterior,
  },
  {
    id: 'gal-7',
    title: 'Salon Portrait',
    category: 'Salon',
    description: 'A portrait from inside the salon.',
    tag: 'Salon Moments',
    image: SALON_IMAGES.salonPortrait,
  },
  {
    id: 'gal-8',
    title: 'A Visit to the Salon',
    category: 'Salon',
    description: 'A client and stylist sharing a moment during a salon visit.',
    tag: 'Salon Moments',
    image: SALON_IMAGES.salonVisit,
  },
  {
    id: 'gal-9',
    title: 'Bridal Styling Session',
    category: 'Bridal',
    description: 'A stylist prepares a bride for her special day.',
    tag: 'Bridal Artistry',
    image: SALON_IMAGES.bridalStyling,
  },
  {
    id: 'gal-10',
    title: 'Classic Updo',
    category: 'Hair',
    description: 'A polished updo finished with decorative hair accessories.',
    tag: 'Hair Styling',
    image: SALON_IMAGES.styledUpdo,
  },
  {
    id: 'gal-11',
    title: 'Wedding Party',
    category: 'Salon',
    description: 'A group portrait from a wedding celebration.',
    tag: 'Salon Moments',
    image: SALON_IMAGES.weddingParty,
  },
  {
    id: 'gal-12',
    title: 'Makeup Session',
    category: 'Bridal',
    description: 'A makeup artist works with a client at the salon.',
    tag: 'Bridal Artistry',
    image: SALON_IMAGES.makeupSession,
  },
  {
    id: 'gal-13',
    title: 'Salon Event',
    category: 'Salon',
    description: 'A moment from an event with the salon community.',
    tag: 'Salon Moments',
    image: SALON_IMAGES.salonEvent,
  },
];

export const FAQS = [
  {
    q: "How far in advance should I book my bridal appointment?",
    a: "We recommend booking bridal appointments at least 4 to 8 weeks in advance, especially during Karachi peak wedding season (November through March). We also offer preliminary bridal consultations and dupatta setting trials.",
  },
  {
    q: "Where exactly is Angie's Salon located in DHA?",
    a: "We are conveniently located at Khadda Market on Khayaban-e-Shamsheer in DHA Phase 5, Karachi, with dedicated valet assistance during peak hours.",
  },
  {
    q: "Are the hair products and skin formulas ammonia-free?",
    a: "Yes, 100%. We exclusively use imported European and Italian organic lines, formaldehyde-free keratin complexes, and medical-grade hypoallergenic skincare formulas.",
  },
  {
    q: "Can I confirm my appointment over WhatsApp?",
    a: "Yes! When you reserve through our online booking wizard, you receive an instant confirmation reference code and a direct WhatsApp link to connect with our front-desk concierge.",
  },
];
