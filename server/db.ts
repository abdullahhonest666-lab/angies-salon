import fs from 'fs';
import path from 'path';
import { Service, Appointment, AppointmentStatus, ContactMessage } from '../src/types.js';
import { INITIAL_SERVICES } from './seedData.js';

interface DatabaseSchema {
  services: Service[];
  appointments: Appointment[];
  contactMessages: ContactMessage[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder and file exist
function initializeDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.services) && Array.isArray(parsed.appointments)) {
        return parsed;
      }
    } catch (e) {
      console.warn('Error reading db.json, re-initializing with seed data...', e);
    }
  }

  // Initial seed data with realistic sample appointments
  const initialData: DatabaseSchema = {
    services: INITIAL_SERVICES,
    appointments: [
      {
        id: 'AS-2026-8901',
        customerName: 'Samira Khan',
        customerPhone: '+92 300 2489123',
        customerEmail: 'samira.k@gmail.com',
        serviceId: 'bridal-1',
        serviceName: 'Barat / Reception Royal Bridal Makeup',
        servicePricePKR: 55000,
        stylist: 'Angie (Creative Director)',
        date: '2026-11-05',
        timeSlot: '02:00 PM',
        notes: 'Barat event at Beach Luxury Hotel. Need dupatta draping and heavy matha patti setting.',
        status: 'Confirmed',
        createdAt: '2026-10-25T10:15:00Z',
      },
      {
        id: 'AS-2026-8902',
        customerName: 'Anoushay Alvi',
        customerPhone: '+92 321 8290145',
        customerEmail: 'anoushay@hotmail.com',
        serviceId: 'hair-2',
        serviceName: 'Luxe Balayage & Tonal Gloss',
        servicePricePKR: 18500,
        stylist: 'Zara Malik',
        date: '2026-10-30',
        timeSlot: '11:30 AM',
        notes: 'Warm honey blonde dimension, allergic to ammonia.',
        status: 'Confirmed',
        createdAt: '2026-10-26T14:30:00Z',
      },
      {
        id: 'AS-2026-8903',
        customerName: 'Hafsa Farooqi',
        customerPhone: '+92 333 4109281',
        customerEmail: 'hafsa.farooqi@yahoo.com',
        serviceId: 'skin-1',
        serviceName: 'Hydra-Glow Medical Grade Facial',
        servicePricePKR: 12500,
        stylist: 'Sara Qureshi',
        date: '2026-10-28',
        timeSlot: '04:00 PM',
        notes: 'First time visiting after seeing Instagram recommendations in DHA.',
        status: 'Pending',
        createdAt: '2026-10-27T09:00:00Z',
      },
      {
        id: 'AS-2026-8904',
        customerName: 'Kiran Bilal',
        customerPhone: '+92 301 9283746',
        customerEmail: 'kiran.b@outlook.com',
        serviceId: 'nail-1',
        serviceName: 'Royal Rose Petal Manicure & Pedicure',
        servicePricePKR: 6000,
        stylist: 'Hina Rizvi',
        date: '2026-10-26',
        timeSlot: '01:00 PM',
        notes: '',
        status: 'Completed',
        createdAt: '2026-10-24T16:20:00Z',
      },
    ],
    contactMessages: [
      {
        id: 'msg-1',
        name: 'Natasha Rizwan',
        email: 'natasha.r@gmail.com',
        phone: '+92 302 9182736',
        subject: 'Bridal Booking for December 2026',
        message: 'Hi Angie, I am inquiring for my sister’s 3-day wedding in late December. Do you offer packages for bridal and 4 bridesmaids?',
        createdAt: '2026-10-26T18:45:00Z',
        read: false,
      },
    ],
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

let dbCache: DatabaseSchema = initializeDatabase();

function persistDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbCache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist database:', err);
  }
}

// Check MongoDB configuration notice
if (process.env.MONGODB_URI) {
  console.log('MongoDB connection URI detected. In production, connect via Mongoose client to:', process.env.MONGODB_URI);
}

export const db = {
  // Services
  getServices(): Service[] {
    return dbCache.services;
  },

  getServiceById(id: string): Service | undefined {
    return dbCache.services.find(s => s.id === id);
  },

  // Appointments
  getAppointments(): Appointment[] {
    // Return latest first
    return [...dbCache.appointments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...data,
      id: `AS-2026-${randomCode}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    dbCache.appointments.unshift(newAppointment);
    persistDatabase();
    return newAppointment;
  },

  updateAppointmentStatus(id: string, status: AppointmentStatus): Appointment | null {
    const appointment = dbCache.appointments.find(a => a.id === id);
    if (!appointment) return null;
    appointment.status = status;
    persistDatabase();
    return appointment;
  },

  deleteAppointment(id: string): boolean {
    const initialLength = dbCache.appointments.length;
    dbCache.appointments = dbCache.appointments.filter(a => a.id !== id);
    if (dbCache.appointments.length !== initialLength) {
      persistDatabase();
      return true;
    }
    return false;
  },

  // Contact Messages
  getContactMessages(): ContactMessage[] {
    return [...dbCache.contactMessages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const newMessage: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    dbCache.contactMessages.unshift(newMessage);
    persistDatabase();
    return newMessage;
  },

  markMessageRead(id: string): boolean {
    const msg = dbCache.contactMessages.find(m => m.id === id);
    if (msg) {
      msg.read = true;
      persistDatabase();
      return true;
    }
    return false;
  },

  // Stats for Admin Dashboard
  getStats() {
    const appointments = dbCache.appointments;
    const total = appointments.length;
    const pending = appointments.filter(a => a.status === 'Pending').length;
    const confirmed = appointments.filter(a => a.status === 'Confirmed').length;
    const completed = appointments.filter(a => a.status === 'Completed').length;
    const cancelled = appointments.filter(a => a.status === 'Cancelled').length;
    
    // Revenue from completed or confirmed appointments
    const estimatedRevenuePKR = appointments
      .filter(a => a.status === 'Completed' || a.status === 'Confirmed')
      .reduce((sum, a) => sum + (a.servicePricePKR || 0), 0);

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      estimatedRevenuePKR,
      unreadMessages: dbCache.contactMessages.filter(m => !m.read).length,
    };
  },
};
