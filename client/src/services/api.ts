import { Service, Appointment, AppointmentStatus, AdminUser, ContactMessage } from '../types';

export const api = {
  // Services
  async getServices(): Promise<Service[]> {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  async getServiceById(id: string): Promise<Service> {
    const res = await fetch(`/api/services/${id}`);
    if (!res.ok) throw new Error('Failed to fetch service');
    return res.json();
  },

  // Appointments
  async createAppointment(data: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    serviceId: string;
    serviceName: string;
    servicePricePKR: number;
    stylist: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }): Promise<{ success: boolean; appointment: Appointment; message: string }> {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to reserve appointment');
    return result;
  },

  async getAppointments(token: string): Promise<Appointment[]> {
    const res = await fetch('/api/appointments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Unauthorized or failed to load appointments');
    return res.json();
  },

  async updateAppointmentStatus(
    id: string,
    status: AppointmentStatus,
    token: string
  ): Promise<{ success: boolean; appointment: Appointment }> {
    const res = await fetch(`/api/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update status');
    return result;
  },

  async deleteAppointment(id: string, token: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete appointment');
    return result;
  },

  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Invalid credentials');
    return result;
  },

  async verifyAuth(token: string): Promise<{ user: AdminUser }> {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Session expired');
    return res.json();
  },

  // Stats
  async getStats(token: string) {
    const res = await fetch('/api/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to load stats');
    return res.json();
  },

  // Contact
  async sendContact(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to send message');
    return result;
  },

  async getContactMessages(token: string): Promise<ContactMessage[]> {
    const res = await fetch('/api/contact', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch contact messages');
    return res.json();
  },

  async markMessageRead(id: string, token: string) {
    const res = await fetch(`/api/contact/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
