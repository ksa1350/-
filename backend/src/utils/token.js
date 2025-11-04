import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const generateAccessToken = (user) =>
  jwt.sign(
    {
      email: user.email,
      name: user.name,
    },
    env.jwtSecret,
    {
      subject: String(user.id),
      expiresIn: env.jwtExpiresIn,
    }
  );
