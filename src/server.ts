import { App } from '@/app';
import { PrismaClient } from '@prisma/client';

const app = App.getInstance();

// console.log(env);
app.start();

const prisma = new PrismaClient();
prisma.user
  .aggregate({
    _count: true,
  })
  .then(({ _count }) => {
    console.log(_count);
  });

process.on('SIGINT', () => {
  app.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  app.stop();
  process.exit(0);
});
