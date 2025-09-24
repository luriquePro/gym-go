import { FastifyInstance, fastify } from "fastify";
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
      .listen({ port: 3333, host: "0.0.0.0" })
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
      keepAliveTimeout: 5 * 1000,
      connectionTimeout: 10 * 1000,
      requestTimeout: 30 * 1000,
      maxParamLength: 200,
      disableRequestLogging: true
    });

    return this.app;
  }
}
