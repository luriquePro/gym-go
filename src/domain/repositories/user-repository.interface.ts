import { User } from '@prisma/client';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  existsByEmail(email: string): Promise<boolean>;
}
