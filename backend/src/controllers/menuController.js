import {
  listMenusByUser,
  createMenu,
  updateMenu,
  listMenuById,
  deleteMenu,
} from '../services/menuService.js';

export const getMenus = async (req, res, next) => {
  try {
    const menus = await listMenusByUser(req.user.id);
    return res.json({ status: 'success', data: { menus } });
  } catch (error) {
    return next(error);
  }
};

export const getMenu = async (req, res, next) => {
  try {
    const menu = await listMenuById(Number(req.params.menuId), req.user.id);
    if (!menu) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu not found',
      });
    }
    return res.json({ status: 'success', data: { menu } });
  } catch (error) {
    return next(error);
  }
};

export const createMenuHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Title is required' });
    }
    const menu = await createMenu(req.user.id, { title, description });
    return res.status(201).json({ status: 'success', data: { menu } });
  } catch (error) {
    return next(error);
  }
};

export const updateMenuHandler = async (req, res, next) => {
  try {
    const menu = await updateMenu(
      Number(req.params.menuId),
      req.user.id,
      req.body
    );
    if (!menu) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu not found',
      });
    }
    return res.json({ status: 'success', data: { menu } });
  } catch (error) {
    return next(error);
  }
};

export const deleteMenuHandler = async (req, res, next) => {
  try {
    await deleteMenu(Number(req.params.menuId), req.user.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
