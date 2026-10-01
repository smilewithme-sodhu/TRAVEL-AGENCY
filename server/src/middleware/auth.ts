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

import { Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const decoded = getDecodedToken(req);
  if (!decoded) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }
  if (decoded.role !== 'ADMIN') {
    res.status(403).json({ error: 'Forbidden: Admin access required' });
    return;
  }

  // Attach user to req object if needed later
  (req as any).user = decoded;

  next();
};
