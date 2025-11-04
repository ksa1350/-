import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS
    ? Number(process.env.BCRYPT_SALT_ROUNDS)
    : 10,
  clientOrigin: process.env.CLIENT_ORIGIN,
};

if (!env.databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

if (!env.jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

export default env;
