import { FastifyAdapter } from '@/shared/adapters/fastify.adapter';
import { env } from '@/shared/config/env';
import { NODE_ENV } from '@/shared/enum/env.enum';
import { IServerAdapter } from '@/shared/interface/server-adapter.interface';

export class ServerAdapterFactory {
  public static readonly ADAPTER_TYPES = {
    FASTIFY: 'fastify',
  };

  static create(type: string): IServerAdapter {
    switch (type) {
      case this.ADAPTER_TYPES.FASTIFY:
        return new FastifyAdapter(env.NODE_ENV === NODE_ENV.DEVELOPMENT);

      default:
        throw new Error(`Tipo de adapter não suportado: ${type}`);
    }
  }

  static createDefault(): IServerAdapter {
    return this.create(this.ADAPTER_TYPES.FASTIFY);
  }

  static getAvailableTypes(): string[] {
    return Object.values(this.ADAPTER_TYPES);
  }
}
