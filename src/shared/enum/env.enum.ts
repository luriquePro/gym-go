export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export enum APP_AMBIENT {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  LOCAL = 'local',
  HML = 'hml',
  QA = 'qa',
}

export const ENV_VALIDATIONS = {
  PORT: {
    MIN: 1000,
    MAX: 65535,
  },
  BCRYPT_ROUNDS: {
    MIN: 10,
    MAX: 15,
  },
  RATE_LIMIT_MAX: {
    MIN: 1,
    MAX: 10000,
  },
  RATE_LIMIT_TIME_WINDOW: {
    MIN: 1000,
    MAX: 1000000,
  },
};
