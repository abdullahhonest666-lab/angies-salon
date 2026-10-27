import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Enable CORS for frontend requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json());

// API Routes
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({
    status: 'online',
    salon: "Angie's Salon DHA Phase 5 Karachi",
    version: '1.0.0',
    endpoints: {
      services: 'GET /api/services',
      appointments: 'POST /api/appointments, GET /api/appointments (Admin)',
      auth: 'POST /api/auth/login',
      stats: 'GET /api/stats (Admin)',
      contact: 'POST /api/contact',
    },
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌸 Angie's Salon standalone API backend running at http://localhost:${PORT}`);
});

export default app;
