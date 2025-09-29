process.env['NODE_ENV'] = process.env['NODE_ENV'] || 'TEST';
process.env['APP_AMBIENT'] = process.env['APP_AMBIENT'] || 'QA';
process.env['DB_NAME'] = process.env['DB_NAME'] || 'db_test_gym_go';
process.env['DB_URI'] =
  process.env['DB_URI'] ||
  'postgresql://root:root@localhost:5432/db_test_gym_go?schema=public';
process.env['JWT_SECRET'] =
  process.env['JWT_SECRET'] || 'abcdefghijklmnopqrstuvwxyz123456';
process.env['JWT_EXPIRES_IN'] = process.env['JWT_EXPIRES_IN'] || '1h';
process.env['HOST'] = process.env['HOST'] || '127.0.0.1';
process.env['PORT'] = process.env['PORT'] || '4000';
process.env['RATE_LIMIT_MAX'] = process.env['RATE_LIMIT_MAX'] || '1000';
process.env['RATE_LIMIT_TIME_WINDOW'] =
  process.env['RATE_LIMIT_TIME_WINDOW'] || '60000';
process.env['CORS_ORIGINS'] = process.env['CORS_ORIGINS'] || '*';
process.env['CORS_CREDENTIALS'] = process.env['CORS_CREDENTIALS'] || 'false';
