import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { BinaryPlacementEngine } from '../modules/network/BinaryPlacementEngine';
import { getJwtSecret } from '../utils/jwt';

export const authRouter = express.Router();
const placementEngine = new BinaryPlacementEngine();

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  referralCode: z.string().min(1, 'Referral code is mandatory'),
  placementLeg: z.enum(['LEFT', 'RIGHT']),
});

authRouter.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email or phone already exists' });
      return;
    }

    const sponsor = await prisma.member.findUnique({
      where: { referralCode: data.referralCode },
    });

    if (!sponsor) {
      res.status(400).json({ error: 'Invalid referral code. Orphan users are strictly prohibited.' });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const generatedMemberId = 'TRV' + Math.floor(10000 + Math.random() * 90000);
    const generatedReferralSlug = 'trv' + Math.floor(1000 + Math.random() * 9000);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          passwordHash,
          role: 'CUSTOMER',
        },
      });

      const member = await tx.member.create({
        data: {
          userId: user.id,
          memberId: generatedMemberId,
          referralCode: generatedReferralSlug,
        },
      });

      await tx.wallet.create({
        data: {
          memberId: member.id,
        }
      });

      await tx.referral.create({
        data: {
          referrerMemberId: sponsor.id,
          referredMemberId: member.id,
          referredUserId: user.id,
        },
      });

      const placement = await placementEngine.findSpilloverSlot(tx, sponsor.id, data.placementLeg);
      
      const newNode = await tx.binaryNode.create({
        data: {
          memberId: member.id,
          parentId: placement.parentId,
          side: placement.position,
          depth: placement.parentDepth + 1,
          path: placement.parentPath + placement.parentId + '/',
        }
      });

      if (placement.position === 'LEFT') {
        await tx.binaryNode.update({
          where: { id: placement.parentId },
          data: { leftChildId: newNode.id }
        });
      } else {
        await tx.binaryNode.update({
          where: { id: placement.parentId },
          data: { rightChildId: newNode.id }
        });
      }

      return { user, member };
    });

    const token = jwt.sign(
      { userId: result.user.id, role: result.user.role, memberId: result.member.id },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        memberId: result.member.memberId,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues[0].message });
      return;
    }
    console.error('Registration Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email: identifier, password } = req.body;
    
    if (!identifier || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
          { member: { memberId: identifier } },
          { name: identifier }
        ]
      },
      include: { member: true }
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role, 
        memberId: user.member ? user.member.id : null 
      },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        memberId: user.member ? user.member.memberId : null,
      }
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

