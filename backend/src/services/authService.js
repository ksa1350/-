import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';
import env from '../config/env.js';

const userFields = ['id', 'name', 'email', 'created_at', 'updated_at'];

const mapUser = (row) =>
  row
    ? {
        id: row.id,
        name: row.name,
        email: row.email,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    : null;

export const findUserByEmail = async (email) => {
  const { rows } = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [
    email,
  ]);
  return mapUser(rows[0]);
};

export const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, env.bcryptSaltRounds);

  const { rows } = await query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING ${userFields.join(', ')}`,
    [name, email, hashedPassword]
  );

  return mapUser(rows[0]);
};

export const verifyUserCredentials = async ({ email, password }) => {
  const { rows } = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [
    email,
  ]);

  const user = rows[0];

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return null;
  }

  return mapUser(user);
};
