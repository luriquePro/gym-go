import { IHasher } from '@/application/interfaces/hasher.interface';
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { AppError } from '@/shared/utils/app-error';
import { describe, expect, it, jest } from '@jest/globals';

describe('CreateUserUseCase', () => {
  const makeHasher = (): IHasher => ({
    hash: jest.fn(
      async (p: string): Promise<string> =>
        new Promise((resolve) => resolve(`hashed:${p}`)),
    ),
    compare: jest.fn(
      async (p: string, h: string): Promise<boolean> =>
        new Promise((resolve) => {
          if (p && h) resolve(true);
          resolve(false);
        }),
    ),
  });

  const makeRepository = (): jest.Mocked<IUserRepository> => ({
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    existsByEmail: jest.fn(),
  });

  it('deve criar usuário quando e-mail não existir', async () => {
    const repo = makeRepository();
    const hasher = makeHasher();
    repo.existsByEmail.mockResolvedValue(false);
    repo.create.mockResolvedValue({
      id: 'any-id',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed:secret',
      createdAt: new Date(),
      updatedAt: new Date(),
      updateCount: 0,
    } as any);

    const sut = new CreateUserUseCase(repo, hasher);
    const output = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secret',
    });

    expect(hasher.hash).toHaveBeenCalledWith('secret');
    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'John Doe', email: 'john@example.com' }),
    );
    expect(output).toEqual(
      expect.objectContaining({
        id: 'any-id',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    );
  });

  it('deve falhar com 409 quando e-mail já existir', async () => {
    const repo = makeRepository();
    const hasher = makeHasher();
    repo.existsByEmail.mockResolvedValue(true);

    const sut = new CreateUserUseCase(repo, hasher);

    await expect(
      sut.execute({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'secret',
      }),
    ).rejects.toEqual(
      AppError.conflict('Email já está em uso', { email: 'jane@example.com' }),
    );
  });
});
