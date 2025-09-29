import { IHasher } from '@/application/interfaces/hasher.interface';
import { CreateUserUseCase } from '@/application/use-cases/create-user.use-case';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { UserRepository } from '@/infrastructure/repositories/user.repository';
import { BcryptHasher } from '@/infrastructure/security/bcrypt.hasher';
import { UserController } from '@/presentation/controllers/user.controller';

export class UserFactory {
  static createUserController(): UserController {
    const createUserUseCase = this.createUserUseCase();
    return new UserController(createUserUseCase);
  }

  private static createUserUseCase(
    userRepository?: IUserRepository,
    hasher?: IHasher,
  ): CreateUserUseCase {
    const repository = userRepository || this.createUserRepository();
    const crypto = hasher || new BcryptHasher(8);
    return new CreateUserUseCase(repository, crypto);
  }

  private static createUserRepository(): IUserRepository {
    return new UserRepository();
  }
}
