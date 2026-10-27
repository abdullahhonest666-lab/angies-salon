import { Stylist, Review, GalleryItem } from '../types';

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
  rating: 4.8,
  totalReviews: 229,
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

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ayesha Siddiqui',
    location: 'DHA Phase 6, Karachi',
    rating: 5,
    date: 'March 2026',
    service: 'Barat Royal Bridal Makeup',
    comment: 'Angie made my wedding day unforgettable! The makeup stayed radiant and dewy through 8 hours of photography and tears. The ambiance in Khadda Market is calm, private, and so luxurious. Highly recommend!',
  },
  {
    id: 'rev-2',
    author: 'Mahnoor Farooq',
    location: 'Clifton Block 4, Karachi',
    rating: 5,
    date: 'February 2026',
    service: 'Luxe Balayage & Blowdry',
    comment: 'Zara is an absolute magician with color. My dark brown hair was lifted to the softest honey caramel without any damage. Angie’s Salon is easily the cleanest, most professional salon in DHA.',
  },
  {
    id: 'rev-3',
    author: 'Dr. Fatima Tariq',
    location: 'DHA Phase 5, Karachi',
    rating: 5,
    date: 'January 2026',
    service: 'Hydra-Glow Medical Grade Facial',
    comment: 'As a medical professional, I am extremely particular about hygiene and sterilization. Angie’s Salon blew me away with their sanitized tools and medical-grade gentle techniques. My skin has never looked so clear.',
  },
  {
    id: 'rev-4',
    author: 'Rabia Jahangir',
    location: 'DHA Phase 8, Karachi',
    rating: 5,
    date: 'December 2025',
    service: 'Royal Rose Petal Manicure & Pedicure',
    comment: 'Pure pampering! The rose petal foot soak and massage melted away all my work stress. Clean towels, lovely staff, and warm jasmine green tea served throughout.',
  },
  {
    id: 'rev-5',
    author: 'Natasha Khan',
    location: 'PECHS, Karachi',
    rating: 5,
    date: 'November 2025',
    service: 'Brazilian Keratin Silk Therapy',
    comment: 'Karachi humidity used to destroy my hair within 10 minutes of stepping outside. After Angie’s keratin treatment, my hair is silky, straight, and completely frizz-free even in monsoon season!',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Imperial Barat Bridal Glow',
    category: 'Bridal',
    description: 'Airbrushed radiant complexion with soft burgundy smokey eye and traditional jewelry setting.',
    tag: 'Signature Bridal',
  },
  {
    id: 'gal-2',
    title: 'Sun-Kissed Toffee Balayage',
    category: 'Hair',
    description: 'Hand-painted dimensional balayage with high-contrast curtain bangs and silk blowout.',
    tag: 'Master Color',
  },
  {
    id: 'gal-3',
    title: 'Hydra-Facial Dewy Finish',
    category: 'Skin',
    description: 'Immediate porcelain glow after 75-minute vortex suction and peptide infusion.',
    tag: 'Clinical Glow',
  },
  {
    id: 'gal-4',
    title: 'Russian Nude Gloss Nails',
    category: 'Nails',
    description: 'Ultra-clean e-file cuticle prep with milky blush gel polish and micro-chrome tips.',
    tag: 'Nail Couture',
  },
  {
    id: 'gal-5',
    title: 'Nikkah Pastel Radiance',
    category: 'Bridal',
    description: 'Romantic blush tones, highlighted cheekbones, and soft waves draped with bridal dupatta.',
    tag: 'Nikkah Glam',
  },
  {
    id: 'gal-6',
    title: 'Brazilian Keratin Transformation',
    category: 'Before & After',
    description: 'From frizzy coarse curls to mirror-flat, humidity-resistant silk strands.',
    tag: 'Keratin Care',
  },
  {
    id: 'gal-7',
    title: 'Smokey Velvet Reception Look',
    category: 'Bridal',
    description: 'Charcoal sculpted liner, nude matte lips, and voluminous Hollywood waves.',
    tag: 'Reception Style',
  },
  {
    id: 'gal-8',
    title: 'Micro-Steamed Caviar Revival',
    category: 'Hair',
    description: 'Restorative scalp and strand rejuvenation treatment for chemically treated hair.',
    tag: 'Hair Spa',
  },
  {
    id: 'gal-9',
    title: 'Mehndi Festive Sunset Glam',
    category: 'Bridal',
    description: 'Warm terracotta eyeshadow with golden shimmer and textured floral braids.',
    tag: 'Mehndi Glow',
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
