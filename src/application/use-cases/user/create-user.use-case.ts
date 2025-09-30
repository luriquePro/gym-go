import { IHasher } from '@/application/interfaces/hasher.interface';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { AppError } from '@/shared/utils/app-error';
import { CreateUserValidation } from '@/shared/validation/schemas/user.schema';
import { ICreatedUserResponse } from '../../interfaces/user.interface';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserValidation): Promise<ICreatedUserResponse> {
    await this.checkIfEmailIsAlreadyInUse(email);

    const hashedPassword = await this.hasher.hash(password);

    const createdUser = await this.userRepository.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  private async checkIfEmailIsAlreadyInUse(email: string): Promise<void> {
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) throw AppError.conflict('Email já está em uso', { email });
  }
}
