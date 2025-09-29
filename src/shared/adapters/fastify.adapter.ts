import { registerAllRoutes } from '@/presentation/routes';
import { env } from '@/shared/config/env';
import { NODE_ENV } from '@/shared/enum/env.enum';
import { IServerAdapter } from '@/shared/interface/server-adapter.interface';
import { errorHandler } from '@/shared/middleware/error.middleware';
import { FastifyInstance, fastify } from 'fastify';

/**
 * Adapter para Fastify seguindo o padrão Adapter
 * Implementa a interface ServerAdapter para inversão de dependência
 */
export class FastifyAdapter implements IServerAdapter {
  private server?: FastifyInstance;
  private isServerRunning = false;
  private enableConsoleLog: boolean;

  constructor(enableConsoleLog: boolean = true) {
    this.server = this.createServer();
    this.enableConsoleLog = enableConsoleLog;
  }

  /**
   * Inicia o servidor Fastify
   * @param port - Porta do servidor
   * @param host - Host do servidor
   */
  async start(port: number, host: string): Promise<void> {
    if (!this.server) {
      throw new Error('Servidor não foi inicializado corretamente');
    }

    if (this.isServerRunning) {
      throw new Error('Servidor já está rodando');
    }

    try {
      await this.server.listen({ port, host });
      this.isServerRunning = true;
      if (this.enableConsoleLog) {
        console.log(`🚀 Servidor Fastify rodando em http://${host}:${port}`);
      }
    } catch (error) {
      if (this.enableConsoleLog) {
        console.error('❌ Erro ao iniciar servidor:', error);
      }
      throw error;
    }
  }

  /**
   * Para o servidor Fastify
   */
  async stop(): Promise<void> {
    if (!this.server || !this.isServerRunning) {
      if (this.enableConsoleLog) {
        console.warn('⚠️ Servidor não está rodando');
      }
      return;
    }

    try {
      await this.server.close();
      this.isServerRunning = false;
      if (this.enableConsoleLog) {
        console.log('🛑 Servidor Fastify parado');
      }
    } catch (error) {
      if (this.enableConsoleLog) {
        console.error('❌ Erro ao parar servidor:', error);
      }
      throw error;
    }
  }

  /**
   * Verifica se o servidor está rodando
   */
  isRunning(): boolean {
    return this.isServerRunning;
  }

  /**
   * Obtém a instância do Fastify
   */
  getInstance(): FastifyInstance {
    if (!this.server) {
      throw new Error('Servidor não foi inicializado');
    }
    return this.server;
  }

  /**
   * Cria e configura a instância do Fastify
   * Configurações centralizadas seguindo Single Responsibility Principle
   */
  private createServer(): FastifyInstance {
    const isDevelopment = env['NODE_ENV'] === NODE_ENV.DEVELOPMENT;
    const isProduction = env['NODE_ENV'] === NODE_ENV.PRODUCTION;

    const server = fastify({
      logger: isDevelopment
        ? { level: 'info' }
        : isProduction
          ? { level: 'warn' }
          : false,
      trustProxy: true,
      bodyLimit: 1 * 1024 * 1024, // 1MB
      keepAliveTimeout: 5 * 1000, // 5 seconds
      connectionTimeout: 10 * 1000, // 10 seconds
      requestTimeout: 30 * 1000, // 30 seconds
      disableRequestLogging: isProduction,
      routerOptions: { maxParamLength: 200 },
      ...(isDevelopment && {
        cors: {
          origin: true,
          credentials: true,
        },
      }),
    });

    // Registra error handler global
    server.setErrorHandler(errorHandler);

    // Registra rotas automaticamente
    this.registerAllRoutes(server);

    return server;
  }

  /**
   * Registra todas as rotas da aplicação
   */
  private async registerAllRoutes(server: FastifyInstance): Promise<void> {
    // Importa e registra todas as rotas organizadas por versão
    await registerAllRoutes(server);
  }

  /**
   * Registra plugins no servidor
   * @param plugin - Plugin do Fastify
   * @param options - Opções do plugin
   */
  async registerPlugin(plugin: any, options?: any): Promise<void> {
    if (!this.server) {
      throw new Error('Servidor não foi inicializado');
    }

    try {
      await this.server.register(plugin, options);
    } catch (error) {
      if (this.enableConsoleLog) {
        console.error('❌ Erro ao registrar plugin:', error);
      }
      throw error;
    }
  }

  /**
   * Registra rotas no servidor
   * @param routes - Função que registra as rotas
   */
  async registerRoutes(
    routes: (server: FastifyInstance) => Promise<void>,
  ): Promise<void> {
    if (!this.server) {
      throw new Error('Servidor não foi inicializado');
    }

    try {
      await routes(this.server);
    } catch (error) {
      if (this.enableConsoleLog) {
        console.error('❌ Erro ao registrar rotas:', error);
      }
      throw error;
    }
  }
}
