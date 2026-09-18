import { Request, Response } from 'express';
import { prisma } from '../db';
import jwt from 'jsonwebtoken';

const buildIncludeLevel = (depth: number): any => {
  if (depth === 0) return true;
  return {
    include: {
      member: {
        include: { 
          user: { select: { name: true, email: true } },
          _count: { select: { referralsGiven: true } }
        }
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { memberId: string };
    
    if (!decoded.memberId) {
      res.status(400).json({ error: 'User is not a member' });
      return;
    }

    const tree = await prisma.binaryNode.findUnique({
      where: { memberId: decoded.memberId },
      include: {
        member: { 
          include: { 
            user: { select: { name: true, email: true } },
            _count: { select: { referralsGiven: true } }
          } 
        },
        leftChild: buildIncludeLevel(4),
        rightChild: buildIncludeLevel(4)
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

export const getNetworkOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, memberId: string };

    if (!decoded.memberId) {
      res.status(400).json({ error: 'User is not a member' });
      return;
    }

    // A simplified flat fetch of members underneath this node
    // Since traversing the entire tree in SQL can be complex, we will fetch the referrals for this demo.
    const referrals = await prisma.referral.findMany({
      where: { referrerMemberId: decoded.memberId, referredMemberId: { not: null } },
      include: {
        referredMember: {
          include: { 
            user: true,
            binaryNode: true
          }
        }
      }
    });

    const activeMembers = referrals.filter(r => r.referredMember?.greenStatus === 'GREEN').length;
    const membersList = referrals.map(r => ({
      id: r.referredMember?.id,
      name: r.referredMember?.user?.name || 'Unknown',
      memberCode: r.referredMember?.referralCode,
      status: r.referredMember?.greenStatus === 'GREEN' ? 'ACTIVE' : 'REGISTERED',
      position: r.referredMember?.binaryNode?.side || 'AUTO',
      joinDate: r.referredMember?.joinedAt,
      cycle: 0
    }));

    res.json({
      success: true,
      data: {
        totalMembers: referrals.length,
        activeMembers,
        leftCount: membersList.filter(m => m.position === 'LEFT').length,
        rightCount: membersList.filter(m => m.position === 'RIGHT').length,
        members: membersList
      }
    });
  } catch (error) {
    console.error('getNetworkOverview Error:', error);
    res.status(500).json({ error: 'Failed to fetch network overview' });
  }
};
