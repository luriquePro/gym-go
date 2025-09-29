import { App } from './app';
import { ServerAdapterFactory } from './shared/adapters/factories/server-adapter.factory';
import prisma from './shared/adapters/prisma';

async function bootstrap() {
  const app = App.getInstance(
    ServerAdapterFactory.create(ServerAdapterFactory.ADAPTER_TYPES.FASTIFY),
  );

  try {
    await app.start();

    if (!app.isRunning()) throw new Error('Servidor não está rodando');

    setupGracefulShutdown(app);
  } catch (error) {
    console.error('❌ Erro ao inicializar aplicação:', error);
    process.exit(1);
  }
}

function setupGracefulShutdown(app: App) {
  const shutdown = async (signal: string) => {
    console.log(
      `\n🛑 Recebido sinal ${signal}. Iniciando shutdown graceful...`,
    );

    try {
      await app.stop();
      await prisma.$disconnect();
      console.log('✅ Aplicação finalizada com sucesso');
      process.exit(0);
    } catch (error) {
      console.error('❌ Erro durante shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGQUIT', () => shutdown('SIGQUIT'));
}

// Inicia a aplicação
bootstrap();
