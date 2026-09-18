import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { BinaryPlacementEngine } from '../modules/network/BinaryPlacementEngine';

export const authRouter = express.Router();
const placementEngine = new BinaryPlacementEngine();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('[STARTUP FATAL] JWT_SECRET environment variable is not set. Refusing to start.');
}

import { register, login } from '../controllers/auth.controller';

authRouter.post('/register', register);
authRouter.post('/login', login);


