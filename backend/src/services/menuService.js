import { query } from '../config/database.js';

const mapMenu = (row) =>
  row
    ? {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        description: row.description,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    : null;

export const listMenusByUser = async (userId) => {
  const { rows } = await query(
    'SELECT * FROM menus WHERE user_id = $1 ORDER BY updated_at DESC',
    [userId]
  );
  return rows.map(mapMenu);
};

export const createMenu = async (userId, payload) => {
  const { title, description } = payload;
  const { rows } = await query(
    `INSERT INTO menus (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, description]
  );
  return mapMenu(rows[0]);
};

export const updateMenu = async (menuId, userId, payload) => {
  const fields = [];
  const values = [menuId, userId];

  if (payload.title !== undefined) {
    fields.push(`title = $${fields.length + 3}`);
    values.push(payload.title);
  }

  if (payload.description !== undefined) {
    fields.push(`description = $${fields.length + 3}`);
    values.push(payload.description);
  }

  if (!fields.length) {
    return listMenuById(menuId, userId);
  }

  const { rows } = await query(
    `UPDATE menus
     SET ${fields.join(', ')}, updated_at = NOW()
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    values
  );
  return mapMenu(rows[0]);
};

export const listMenuById = async (menuId, userId) => {
  const { rows } = await query(
    'SELECT * FROM menus WHERE id = $1 AND user_id = $2 LIMIT 1',
    [menuId, userId]
  );
  return mapMenu(rows[0]);
};

export const deleteMenu = async (menuId, userId) => {
  await query('DELETE FROM menus WHERE id = $1 AND user_id = $2', [
    menuId,
    userId,
  ]);
};
