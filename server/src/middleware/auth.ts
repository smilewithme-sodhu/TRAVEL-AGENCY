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

export const requireAdmin = (req: any, res: any, next: any) => {
  const decoded = getDecodedToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'No token provided or token invalid' });
  }

  if (decoded.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  req.user = decoded; // Attach user info to request
  next();
};
