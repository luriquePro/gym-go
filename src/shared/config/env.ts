import { config } from 'dotenv';

import { APP_AMBIENT, NODE_ENV } from './../enum/env.enum';
import { z } from 'zod';
import { ENV_VALIDATIONS } from './../enum/env.enum';
import { DEFAULT_VALUES } from './constants';
import { AppError } from '../errors/AppError';

config({ path: '.env', override: true, quiet: true });

const envSchema = z
  .object({
    // Environment
    NODE_ENV: z
      .enum(
        Object.values(NODE_ENV),
        'NODE_ENV deve ser um dos seguintes valores: ' +
          Object.values(NODE_ENV).join(', '),
      )
      .default(DEFAULT_VALUES.NODE_ENV),
    APP_AMBIENT: z
      .enum(
        Object.values(APP_AMBIENT),
        'APP_AMBIENT deve ser um dos seguintes valores: ' +
          Object.values(APP_AMBIENT).join(', '),
      )
      .default(DEFAULT_VALUES.APP_AMBIENT),
    PORT: z.coerce
      .number('PORT deve ser um número')
      .min(
        ENV_VALIDATIONS.PORT.MIN,
        `PORT deve ser maior que ${ENV_VALIDATIONS.PORT.MIN}`,
      )
      .max(
        ENV_VALIDATIONS.PORT.MAX,
        `PORT deve ser menor que ${ENV_VALIDATIONS.PORT.MAX}`,
      )
      .default(DEFAULT_VALUES.PORT),
    HOST: z.string('HOST deve ser uma string').default(DEFAULT_VALUES.HOST),

    // Database
    DB_URI: z
      .url('DB_URI deve ser uma URL')
      .startsWith('mongodb://', 'DB_URI deve ser uma URL Válida')
      .or(
        z.url().startsWith('mongodb+srv://', 'DB_URI deve ser uma URL Válida'),
      ),
    DB_NAME: z.string('DB_NAME deve ser uma string'),
    REDIS_URL: z
      .url('REDIS_URL deve ser uma URL')
      .startsWith('redis://', 'REDIS_URL deve ser uma URL Válida')
      .or(z.url().startsWith('rediss://', 'REDIS_URL deve ser uma URL Válida')),

    // Security
    JWT_SECRET: z
      .string('JWT_SECRET deve ser uma string')
      .min(32, 'JWT_SECRET deve ter pelo menos 32 caracteres'),
    JWT_EXPIRES_IN: z
      .string('JWT_EXPIRES_IN deve ser uma string')
      .default(DEFAULT_VALUES.JWT_EXPIRES_IN),
    BCRYPT_ROUNDS: z.coerce
      .number('BCRYPT_ROUNDS deve ser um número')
      .min(
        ENV_VALIDATIONS.BCRYPT_ROUNDS.MIN,
        `BCRYPT_ROUNDS deve ser maior que ${ENV_VALIDATIONS.BCRYPT_ROUNDS.MIN}`,
      )
      .max(
        ENV_VALIDATIONS.BCRYPT_ROUNDS.MAX,
        `BCRYPT_ROUNDS deve ser menor que ${ENV_VALIDATIONS.BCRYPT_ROUNDS.MAX}`,
      )
      .default(DEFAULT_VALUES.BCRYPT_ROUNDS),

    // Rate Limiting
    RATE_LIMIT_MAX: z.coerce
      .number('RATE_LIMIT_MAX deve ser um número')
      .min(
        ENV_VALIDATIONS.RATE_LIMIT_MAX.MIN,
        `RATE_LIMIT_MAX deve ser maior que ${ENV_VALIDATIONS.RATE_LIMIT_MAX.MIN}`,
      )
      .max(
        ENV_VALIDATIONS.RATE_LIMIT_MAX.MAX,
        `RATE_LIMIT_MAX deve ser menor que ${ENV_VALIDATIONS.RATE_LIMIT_MAX.MAX}`,
      )
      .default(DEFAULT_VALUES.RATE_LIMIT_MAX),
    RATE_LIMIT_TIME_WINDOW: z.coerce
      .number('RATE_LIMIT_TIME_WINDOW deve ser um número')
      .min(
        ENV_VALIDATIONS.RATE_LIMIT_TIME_WINDOW.MIN,
        `RATE_LIMIT_TIME_WINDOW deve ser maior que ${ENV_VALIDATIONS.RATE_LIMIT_TIME_WINDOW.MIN}`,
      )
      .max(
        ENV_VALIDATIONS.RATE_LIMIT_TIME_WINDOW.MAX,
        `RATE_LIMIT_TIME_WINDOW deve ser menor que ${ENV_VALIDATIONS.RATE_LIMIT_TIME_WINDOW.MAX}`,
      )
      .default(DEFAULT_VALUES.RATE_LIMIT_TIME_WINDOW),

    // CORS
    CORS_ORIGINS: z
      .string('CORS_ORIGINS deve ser uma string')
      .default(DEFAULT_VALUES.CORS_ORIGINS)
      .transform((val) => val.split(',')),
    CORS_CREDENTIALS: z.coerce
      .boolean('CORS_CREDENTIALS deve ser um booleano')
      .default(DEFAULT_VALUES.CORS_CREDENTIALS),
  })
  .superRefine((data, { addIssue }) => {
    const nodeEnv = data.NODE_ENV;
    const appAmbient = data.APP_AMBIENT;

    if (
      nodeEnv === NODE_ENV.PRODUCTION ||
      appAmbient === APP_AMBIENT.PRODUCTION
    ) {
      if (!data.DB_NAME.startsWith('db_prod_')) {
        addIssue({
          code: 'custom',
          message: "DB_NAME deve começar com 'db_prod_' em produção",
          path: ['DB_NAME'],
        });
      }
    }

    if (
      nodeEnv === NODE_ENV.DEVELOPMENT ||
      appAmbient === APP_AMBIENT.DEVELOPMENT
    ) {
      if (!data.DB_NAME.startsWith('db_dev_')) {
        addIssue({
          code: 'custom',
          message: "DB_NAME deve começar com 'db_dev_' em desenvolvimento",
          path: ['DB_NAME'],
        });
      }
    }

    if (nodeEnv === NODE_ENV.TEST || appAmbient === APP_AMBIENT.QA) {
      if (!data.DB_NAME.startsWith('db_test_')) {
        addIssue({
          code: 'custom',
          message: "DB_NAME deve começar com 'db_test_' em teste",
          path: ['DB_NAME'],
        });
      }
    }

    if (appAmbient === APP_AMBIENT.LOCAL) {
      if (!data.DB_NAME.startsWith('db_local_')) {
        addIssue({
          code: 'custom',
          message: "DB_NAME deve começar com 'db_local_' em local",
          path: ['DB_NAME'],
        });
      }
    }

    if (appAmbient === APP_AMBIENT.HML) {
      if (!data.DB_NAME.startsWith('db_hml_')) {
        addIssue({
          code: 'custom',
          message: "DB_NAME deve começar com 'db_hml_' em hml",
          path: ['DB_NAME'],
        });
      }
    }
  });

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  throw AppError.internal(
    'Erro ao validar as variáveis de ambiente',
    _env.error.format(),
  );
}

export const env = _env.data;
