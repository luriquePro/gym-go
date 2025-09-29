import { APP_AMBIENT, NODE_ENV } from '@/shared/enum/env.enum';
import { IEnv } from '@/shared/interface/env.interface';

export const DEFAULT_VALUES = {
  NODE_ENV: NODE_ENV.DEVELOPMENT,
  APP_AMBIENT: APP_AMBIENT.DEVELOPMENT,
  PORT: 3333,
  HOST: '0.0.0.0',
  LOGGER_IS_ENABLED: false,
  DB_URI: 'mongodb://localhost:27017/gym-go',
  DB_NAME: 'gym-go',
  REDIS_URL: 'redis://localhost:6379',
  JWT_EXPIRES_IN: '24h',
  BCRYPT_ROUNDS: 12,
  RATE_LIMIT_MAX: 100,
  RATE_LIMIT_TIME_WINDOW: 60000,
  CORS_ORIGINS: 'http://localhost:3000,http://localhost:3001',
  CORS_CREDENTIALS: true,
};

// Função para criar configurações de segurança baseadas no env
export const createSecurityConfig = (env: IEnv) => ({
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  bcrypt: {
    rounds: env.BCRYPT_ROUNDS,
  },
  rateLimit: {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_TIME_WINDOW,
  },
  cors: {
    origin: env.CORS_ORIGINS,
    credentials: env.CORS_CREDENTIALS,
  },
});
