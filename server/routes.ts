import { Router, Request, Response } from 'express';
import { db } from './db.js';
import { ADMIN_CREDENTIALS, generateToken, requireAdminAuth, AuthenticatedRequest } from './auth.js';
import { AppointmentStatus } from '../src/types.js';

const router = Router();

// ==================== SERVICES ====================
router.get('/services', (_req: Request, res: Response) => {
  try {
    const services = db.getServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

router.get('/services/:id', (req: Request, res: Response) => {
  try {
    const service = db.getServiceById(req.params.id);
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// ==================== APPOINTMENTS ====================
router.get('/appointments', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const appointments = db.getAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

router.post('/appointments', (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      serviceName,
      servicePricePKR,
      stylist,
      date,
      timeSlot,
      notes,
    } = req.body;

    if (!customerName || !customerPhone || !serviceId || !date || !timeSlot) {
      res.status(400).json({
        error: 'Missing required booking fields (name, phone, service, date, time slot)',
      });
      return;
    }

    // Verify service or fetch from db
    const service = db.getServiceById(serviceId);
    const resolvedServiceName = serviceName || service?.name || 'Custom Salon Treatment';
    const resolvedPrice = servicePricePKR || service?.pricePKR || 0;

    const appointment = db.createAppointment({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: (customerEmail || '').trim(),
      serviceId,
      serviceName: resolvedServiceName,
      servicePricePKR: resolvedPrice,
      stylist: stylist || 'Any Available Specialist',
      date,
      timeSlot,
      notes: (notes || '').trim(),
    });

    res.status(201).json({
      success: true,
      appointment,
      message: 'Appointment successfully reserved at Angie\'s Salon DHA Phase 5',
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

router.patch('/appointments/:id/status', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses: AppointmentStatus[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      return;
    }

    const updated = db.updateAppointmentStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    res.json({ success: true, appointment: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
});

router.delete('/appointments/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const deleted = db.deleteAppointment(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// ==================== AUTHENTICATION ====================
router.post('/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = generateToken({
        id: ADMIN_CREDENTIALS.id,
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role,
      });

      res.json({
        success: true,
        token,
        user: {
          id: ADMIN_CREDENTIALS.id,
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role,
        },
      });
      return;
    }

    res.status(401).json({ error: 'Invalid credentials. Please check your email or password.' });
  } catch (error) {
    res.status(500).json({ error: 'Login authentication error' });
  }
});

router.get('/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});

// ==================== ADMIN STATS ====================
router.get('/stats', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const stats = db.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// ==================== CONTACT MESSAGES ====================
router.post('/contact', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !message || (!email && !phone)) {
      res.status(400).json({ error: 'Please provide your name, message, and email or phone number.' });
      return;
    }

    const newMessage = db.createContactMessage({
      name: name.trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Angie\'s Salon. We will respond promptly!',
      contact: newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/contact', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const messages = db.getContactMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
});

router.patch('/contact/:id/read', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = db.markMessageRead(req.params.id);
    res.json({ success: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark message read' });
  }
});

export default router;
