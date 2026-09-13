import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { quotesRouter } from './routes/quotes.routes';
import { bookingsRouter } from './routes/bookings.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quotes', quotesRouter);
app.use('/api/bookings', bookingsRouter);

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
