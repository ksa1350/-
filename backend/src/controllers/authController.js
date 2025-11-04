import {
  createUser,
  findUserByEmail,
  verifyUserCredentials,
} from '../services/authService.js';
import { generateAccessToken } from '../utils/token.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Missing required fields' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ status: 'error', message: 'Email already in use' });
    }

    const user = await createUser({ name, email, password });
    const token = generateAccessToken(user);

    return res.status(201).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Missing credentials' });
    }

    const user = await verifyUserCredentials({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = generateAccessToken(user);

    return res.json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const currentUser = async (req, res) => {
  return res.json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};
