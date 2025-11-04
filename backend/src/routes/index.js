import { Router } from 'express';
import authRoutes from './authRoutes.js';
import menuRoutes from './menuRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/menus', menuRoutes);

export default router;
