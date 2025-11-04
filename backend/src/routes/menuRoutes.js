import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getMenus,
  getMenu,
  createMenuHandler,
  updateMenuHandler,
  deleteMenuHandler,
} from '../controllers/menuController.js';

const router = Router();

router.use(authenticate);
router.get('/', getMenus);
router.post('/', createMenuHandler);
router.get('/:menuId', getMenu);
router.put('/:menuId', updateMenuHandler);
router.delete('/:menuId', deleteMenuHandler);

export default router;
