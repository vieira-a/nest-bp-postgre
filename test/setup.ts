import dotenv from 'dotenv';
import fs from 'fs';

const testEnvFile = `.env.test`;
const envFile = `.env`;

if (!fs.existsSync(envFile)) {
  throw new Error('.env file not found');
}

dotenv.config({ path: envFile });
dotenv.config({ path: testEnvFile, override: true });
