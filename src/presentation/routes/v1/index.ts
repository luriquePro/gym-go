import { FastifyInstance } from 'fastify';
import { userRoutesV1 } from './user.routes';

export async function v1Routes(fastify: FastifyInstance): Promise<void> {
  await fastify.register(userRoutesV1);
}
