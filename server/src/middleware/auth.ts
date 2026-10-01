import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
  userId: string;
  memberId: string | null;
  role?: string;
}

export const getDecodedToken = (req: Request): DecodedToken | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
  } catch {
    return null;
  }
};

export const requireAdmin = (req: Request, res: any, next: any) => {
  const decoded = getDecodedToken(req);
  if (!decoded || decoded.role !== 'ADMIN') {
    return res.status(403).json({ success: false, error: 'Forbidden: Admin access required' });
  }
  next();
};
