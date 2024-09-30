import { Router } from 'express';
import { getVacations, followVacation, unfollowVacation } from '../controllers/vacationController';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/', verifyToken, getVacations);
router.post('/follow', verifyToken, followVacation);
router.post('/unfollow', verifyToken, unfollowVacation);

export default router;
