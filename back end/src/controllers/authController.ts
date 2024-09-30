import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { db } from '../config/db';

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  
  const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser[0]) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', 
                 [first_name, last_name, email, hashedPassword]);

  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    return res.status(400).json({ message: 'Wrong information' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Wrong information' });
  }

  const token = jwt.sign({ id: user.user_code, isAdmin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
