import { db } from '../config/db';
import { User } from '../models/User';
import { Request, Response } from 'express';
import { Vacation } from '../models/vacations';
import { Following } from '../models/Following';

export const addVacation = async (req: Request, res: Response) => {
    try {
      const { destination, description, startDate, endDate, price, image } = req.body;
  
      if (!destination || !description || !startDate || !endDate || !price || !image) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      const result = await db.query(
        'INSERT INTO vacations (destination, description, startDate, endDate, price, image) VALUES (?, ?, ?, ?, ?, ?)',
        [destination, description, startDate, endDate, price, image]
      );
  
      return res.status(201).json({ message: 'Vacation added successfully', vacationId: result.insertId });
    } catch (error) {
      console.error('Error adding vacation:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  export const editVacation = async (req: Request, res: Response) => {
    try {
      const { vacationId } = req.params;
      const { destination, description, startDate, endDate, price, image } = req.body;
  
      const [existingVacation] = await db.query('SELECT * FROM vacations WHERE vacationId = ?', [vacationId]);
      if (!existingVacation) {
        return res.status(404).json({ message: 'Vacation not found.' });
      }
  
      await db.query(
        'UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, image = ? WHERE vacationId = ?',
        [destination, description, startDate, endDate, price, image, vacationId]
      );
  
      return res.status(200).json({ message: 'Vacation updated successfully.' });
    } catch (error) {
      console.error('Error updating vacation:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  export const deleteVacation = async (req: Request, res: Response) => {
    try {
      const { vacationId } = req.params;
  
      const [existingVacation] = await db.query('SELECT * FROM vacations WHERE vacationId = ?', [vacationId]);
      if (!existingVacation) {
        return res.status(404).json({ message: 'Vacation not found.' });
      }
  
      await db.query('DELETE FROM vacations WHERE vacationId = ?', [vacationId]);
  
      return res.status(200).json({ message: 'Vacation deleted successfully.' });
    } catch (error) {
      console.error('Error deleting vacation:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

export const getVacations = async (req: Request, res: Response) => {
    const { page = 1, onlyFollowed, notStarted, activeVacations } = req.query;
    const offset = (Number(page) - 1) * 10;
  
    let query = 'SELECT * FROM vacations WHERE 1 = 1';
    const params: any[] = [];
  
    if (onlyFollowed) {
      query += ' AND vacation_code IN (SELECT vacation_code FROM following WHERE user_code = ?)';
      params.push(req.user.id);
    }
    if (notStarted) {
      query += ' AND start_date > NOW()';
    }
    if (activeVacations) {
      query += ' AND start_date <= NOW() AND end_date >= NOW()';
    }
  
    query += ' ORDER BY start_date ASC LIMIT 10 OFFSET ?';
    params.push(offset);
  
    const [vacations] = await db.query(query, params);
    res.json(vacations);
  };
  
  export const followVacation = async (req: Request, res: Response) => {
    const { vacation_code } = req.body;
    const user_code = req.user.id;
  
    await db.query('INSERT INTO following (user_code, vacation_code) VALUES (?, ?)', [user_code, vacation_code]);
    res.json({ message: 'Vacation followed' });
  };
  
  export const unfollowVacation = async (req: Request, res: Response) => {
    const { vacation_code } = req.body;
    const user_code = req.user.id;
  
    await db.query('DELETE FROM following WHERE user_code = ? AND vacation_code = ?', [user_code, vacation_code]);
    res.json({ message: 'Vacation unfollowed' });
  };