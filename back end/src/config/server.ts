import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes';
import vacationRoutes from '../routes/vacationRoutes';
import { db } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/vacations', vacationRoutes);

db();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
