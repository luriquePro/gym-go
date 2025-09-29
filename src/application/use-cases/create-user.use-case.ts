import { IHasher } from '@/application/interfaces/hasher.interface';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { AppError } from '@/shared/errors/AppError';
import { CreateUserValidation } from '@/shared/validation/schemas/user.schema';
import { User } from '@prisma/client';
import { ICreatedUserResponse } from '../interfaces/user.interface';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher,
  ) {}

  async execute(data: CreateUserValidation): Promise<ICreatedUserResponse> {
    await this.getUserByEmailOrThrow(data.email);

    const hashedPassword = await this.hasher.hash(data.password);

    const createdUser = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  private async getUserByEmailOrThrow(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw AppError.validation('Usuário não encontrado');

    return user;
  }
}
