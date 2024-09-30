import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') return res.sendStatus(403);
    next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };