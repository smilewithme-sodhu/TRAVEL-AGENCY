import express from 'express';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { BinaryPlacementEngine } from '../modules/network/BinaryPlacementEngine';

export const authRouter = express.Router();

// ── Strict Auth Rate Limiter (5 req / 15 min per IP) ───────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts. Please wait 15 minutes and try again.' },
});

const placementEngine = new BinaryPlacementEngine();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('[STARTUP FATAL] JWT_SECRET environment variable is not set. Refusing to start.');
}

import { register, loginMember, loginAdmin } from '../controllers/auth.controller';

authRouter.post('/register', authLimiter, register);
authRouter.post('/login/member', authLimiter, loginMember);
authRouter.post('/login/admin', authLimiter, loginAdmin);


