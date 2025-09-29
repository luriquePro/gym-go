import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import prisma from '@/shared/adapters/prisma';
import { User } from '@prisma/client';

/**
 * Implementação do repositório de usuários usando Prisma
 * Segue o padrão Repository e Dependency Inversion Principle
 */
export class UserRepository implements IUserRepository {
  /**
   * Cria um novo usuário
   * O ID é gerado automaticamente pelo Prisma
   */
  async create(user: User): Promise<User> {
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  /**
   * Busca usuário por email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Busca usuário por ID
   */
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Verifica se email já existe
   */
  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}
