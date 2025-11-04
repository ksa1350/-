import pkg from 'pg';
import env from './env.js';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseUrl.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : false,
});

pool.on('error', (error) => {
  console.error('Unexpected database error', error);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();
export default pool;
