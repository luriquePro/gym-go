import { NODE_ENV } from '@/shared/enum/env.enum';

export interface IEnv {
  NODE_ENV: NODE_ENV;
  PORT: number;
  HOST: string;
  DB_URI: string;
  DB_NAME: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_ROUNDS: number;
  RATE_LIMIT_MAX: number;
  RATE_LIMIT_TIME_WINDOW: number;
  CORS_ORIGINS: string[];
  CORS_CREDENTIALS: boolean;
}
