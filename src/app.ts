import { ServerAdapterFactory } from './shared/adapters/factories/server-adapter.factory';
import { env } from './shared/config/env';
import { IServerAdapter } from './shared/interface/server-adapter.interface';

export class App {
  private serverAdapter: IServerAdapter;
  private static instance: App;

  private constructor(serverAdapter?: IServerAdapter) {
    this.serverAdapter = serverAdapter || ServerAdapterFactory.createDefault();
  }

  public static getInstance(serverAdapter?: IServerAdapter): App {
    if (!App.instance) {
      App.instance = new App(serverAdapter);
    }
    return App.instance;
  }

  public async start(): Promise<void> {
    try {
      await this.serverAdapter.start(env.PORT, env.HOST);
    } catch (error) {
      console.error('❌ Erro ao iniciar aplicação:', error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.serverAdapter.stop();
    } catch (error) {
      console.error('❌ Erro ao parar aplicação:', error);
      throw error;
    }
  }

  public isRunning(): boolean {
    return this.serverAdapter.isRunning();
  }

  public getServerAdapter(): IServerAdapter {
    return this.serverAdapter;
  }

  public getServerInstance(): any {
    return this.serverAdapter.getInstance();
  }
}
