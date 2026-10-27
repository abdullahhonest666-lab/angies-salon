import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../src/types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'angies-salon-dha-karachi-luxury-key-2026';

export const ADMIN_CREDENTIALS = {
  id: 'admin-1',
  email: 'admin@angiesalon.com',
  password: 'admin123',
  name: 'Angie (Director)',
  role: 'admin' as const,
};

export interface AuthenticatedRequest extends Request {
  user?: AdminUser;
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser;
    return decoded;
  } catch (err) {
    return null;
  }
}

export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);

  if (!user || user.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Admin access required' });
    return;
  }

  req.user = user;
  next();
}
