export interface Service {
  id: string;
  name: string;
  category: 'Hair' | 'Skin' | 'Nails' | 'Bridal' | 'Waxing & Threading';
  pricePKR: number;
  durationMinutes: number;
  description: string;
  popular?: boolean;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  serviceName: string;
  servicePricePKR: number;
  stylist: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hair' | 'Bridal' | 'Skin' | 'Nails' | 'Before & After';
  description: string;
  tag: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}
