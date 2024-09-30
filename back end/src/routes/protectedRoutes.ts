import { Router } from 'express';
import { addVacation, editVacation, deleteVacation } from '../controllers/vacationController';
import { authenticateToken, authorizeAdmin } from '../middlewares/verifyToken';

const router = Router();

router.post('/vacations', authenticateToken, authorizeAdmin, addVacation);
router.put('/vacations/:id', authenticateToken, authorizeAdmin, editVacation);
router.delete('/vacations/:id', authenticateToken, authorizeAdmin, deleteVacation);

export default router;
