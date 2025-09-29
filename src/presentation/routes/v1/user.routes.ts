import { UserFactory } from '@/infrastructure/factories/user.factory';
import { ValidationMiddleware } from '@/shared/validation/middleware/validation.middleware';
import { CreateUserSchema } from '@/shared/validation/schemas/user.schema';
import { FastifyInstance } from 'fastify';

export function userRoutesV1(fastify: FastifyInstance) {
  const userController = UserFactory.createUserController();
  // POST /users - Criar usuário com validação
  fastify.post(
    '/users',
    { preHandler: ValidationMiddleware.validateBody(CreateUserSchema) },
    userController.create.bind(userController),
  );
}
