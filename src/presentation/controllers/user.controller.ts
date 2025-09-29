import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { ApiResponseUtil } from '@/shared/utils/api-response.util';
import { CreateUserValidation } from '@/shared/validation/schemas/user.schema';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = await this.createUserUseCase.execute(
      request.body as CreateUserValidation,
    );

    return ApiResponseUtil.created(reply, {
      message: 'Usuário criado com sucesso',
      data: user,
    });
  }
}
