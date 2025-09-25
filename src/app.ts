import { FastifyInstance, fastify } from 'fastify';
import { env } from './shared/config/env';

export class App {
  private app?: FastifyInstance;
  private static instance: App;

  private constructor() {}

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  public start(): void {
    const app = this.createApp();

    app
      .listen({ port: env.PORT, host: env.HOST })
      .then((address) => {
        console.log(`Server is running on ${address}`);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }

  public stop(): void {
    if (this.app) {
      this.app.close();
    }
  }

  private createApp(): FastifyInstance {
    this.app = fastify({
      logger: false,
      trustProxy: true,
      bodyLimit: 1 * 1024 * 1024, // 1MB
      keepAliveTimeout: 5 * 1000, // 5 seconds
      connectionTimeout: 10 * 1000, // 10 seconds
      requestTimeout: 30 * 1000, // 30 seconds
      disableRequestLogging: true,
      routerOptions: {
        maxParamLength: 200,
      },
    });

    return this.app;
  }
}
