import { FastifyInstance } from 'fastify';

/**
 * Registra todas as rotas da versão 2 da API
 * @param _fastify - Instância do Fastify
 */
export async function v2Routes(fastify: FastifyInstance): Promise<void> {
  return new Promise((resolve) => {
    resolve(void fastify);
  });
  // Rotas da v2 serão implementadas aqui
  // Exemplo: await fastify.register(userRoutesV2);
  // Exemplo: await fastify.register(gymRoutesV2);
}
