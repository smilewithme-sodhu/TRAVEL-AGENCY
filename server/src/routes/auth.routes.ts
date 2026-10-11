import express from 'express';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { BinaryPlacementEngine } from '../modules/network/BinaryPlacementEngine';

export const authRouter = express.Router();

// ── Auth Rate Limiter (30 req / 15 min per IP) ─────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts. Please wait a few minutes and try again.' },
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

// ── Password reset ─────────────────────────────────────────────────────────
// Token is a JWT signed with JWT_SECRET + the user's current passwordHash, so it
// becomes invalid automatically once the password changes (single use).
import { sendMail } from '../utils/mailer';

const resetSecret = (passwordHash: string) => JWT_SECRET + passwordHash;

authRouter.post('/forgot-password', authLimiter, async (req, res) => {
  const genericOk = { success: true, message: 'If that email is registered, a reset link has been sent.' };
  try {
    const email = String(req.body?.email || req.body?.identifier || '').trim();
    if (!email) { res.status(400).json({ success: false, error: 'Email is required.' }); return; }

    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.isActive) {
      const token = jwt.sign({ uid: user.id, purpose: 'pwd-reset' }, resetSecret(user.passwordHash), { expiresIn: '30m' });
      const base = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')[0].trim().replace(/\/$/, '');
      const link = `${base}/reset-password?uid=${user.id}&token=${token}`;
      try {
        await sendMail(
          user.email,
          'Reset your Gumnu JUM password',
          `<p>Hi ${user.name},</p><p>Click the link below to reset your password. It expires in 30 minutes.</p>` +
          `<p><a href="${link}">Reset Password</a></p><p>If you didn't request this, ignore this email.</p>`
        );
      } catch (mailErr) {
        console.error('[forgot-password] Email send failed:', mailErr);
      }
    }
    res.json(genericOk); // never reveal whether the email exists
  } catch (err) {
    console.error('[forgot-password] Error:', err);
    res.status(500).json({ success: false, error: 'Could not process request.' });
  }
});

authRouter.post('/reset-password', authLimiter, async (req, res) => {
  try {
    const { uid, token, password } = req.body || {};
    if (!uid || !token || typeof password !== 'string' || password.length < 6) {
      res.status(400).json({ success: false, error: 'Valid link and a password of at least 6 characters are required.' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: String(uid) } });
    if (!user) { res.status(400).json({ success: false, error: 'Invalid or expired link.' }); return; }
    try {
      const payload: any = jwt.verify(String(token), resetSecret(user.passwordHash));
      if (payload.purpose !== 'pwd-reset' || payload.uid !== user.id) throw new Error('bad token');
    } catch {
      res.status(400).json({ success: false, error: 'Invalid or expired link.' });
      return;
    }
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(password, 10) } });
    res.json({ success: true, message: 'Password updated. You can now sign in.' });
  } catch (err) {
    console.error('[reset-password] Error:', err);
    res.status(500).json({ success: false, error: 'Could not reset password.' });
  }
});


