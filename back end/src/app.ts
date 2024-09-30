import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import vacationRoutes from './routes/vacationRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', vacationRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));