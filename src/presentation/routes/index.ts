import { FastifyInstance } from 'fastify';
import { v1Routes } from './v1';
import { v2Routes } from './v2';

/**
 * Registra todas as rotas da API organizadas por versão
 * @param fastify - Instância do Fastify
 */
export async function registerAllRoutes(
  fastify: FastifyInstance,
): Promise<void> {
  // Registra rotas da versão 1
  await fastify.register(v1Routes, { prefix: '/api/v1' });

  // Registra rotas da versão 2
  await fastify.register(v2Routes, { prefix: '/api/v2' });

  // Futuras versões podem ser adicionadas aqui:
  // await fastify.register(v3Routes, { prefix: '/api/v3' });
}
