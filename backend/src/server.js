import app from './app.js';
import env from './config/env.js';
import './config/database.js';

const start = async () => {
  try {
    app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`); // eslint-disable-line no-console
    });
  } catch (error) {
    console.error('Failed to start server', error); // eslint-disable-line no-console
    process.exit(1);
  }
};

start();
