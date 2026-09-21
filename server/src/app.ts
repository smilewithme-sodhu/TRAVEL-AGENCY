import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { quotesRouter } from './routes/quotes.routes';
import { bookingsRouter } from './routes/bookings.routes';
import { packagesRouter } from './routes/packages.routes';

dotenv.config();

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL || ''] 
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || /^https?:\/\/localhost:\d+$/.test(origin) || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
import { adminBookingsRouter } from './routes/bookings.routes';
import { authRouter } from './routes/auth.routes';
import { adminRouter } from './routes/admin.routes';
import { networkRouter } from './routes/network.routes';
import { walletRouter } from './routes/wallet.routes';
import { memberRouter } from './routes/member.routes';
import { rewardsRouter } from './routes/rewards.routes';
import { requireAdmin } from './middleware/auth';

app.use('/api/auth', authRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/packages', packagesRouter);
app.use('/api/admin/bookings', requireAdmin, adminBookingsRouter);
app.use('/api/admin', requireAdmin, adminRouter);
app.use('/api/network', networkRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/member', memberRouter);
app.use('/api/rewards', rewardsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Wanderlust API is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

export { app };



