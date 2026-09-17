import { Request, Response } from 'express';
import { prisma } from '../db';
import jwt from 'jsonwebtoken';

const buildIncludeLevel = (depth: number): any => {
  if (depth === 0) return true;
  return {
    include: {
      member: {
        include: { user: { select: { name: true, email: true } } }
      },
      leftChild: buildIncludeLevel(depth - 1),
      rightChild: buildIncludeLevel(depth - 1)
    }
  };
};

export const getNetworkTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { memberId: string };
    
    if (!decoded.memberId) {
      res.status(400).json({ error: 'User is not a member' });
      return;
    }

    const tree = await prisma.binaryNode.findUnique({
      where: { memberId: decoded.memberId },
      include: {
        member: { include: { user: { select: { name: true, email: true } } } },
        leftChild: buildIncludeLevel(2),
        rightChild: buildIncludeLevel(2)
      }
    });

    if (!tree) {
      res.status(404).json({ error: 'Binary node not found' });
      return;
    }

    res.json({ success: true, data: tree });
  } catch (error) {
    console.error('getNetworkTree Error:', error);
    res.status(500).json({ error: 'Failed to fetch network tree' });
  }
};
