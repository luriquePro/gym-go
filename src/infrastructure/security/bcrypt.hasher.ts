import { IHasher } from '@/application/interfaces/hasher.interface';
import { compare, hash } from 'bcryptjs';

export class BcryptHasher implements IHasher {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 8) {
    this.saltRounds = saltRounds;
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, this.saltRounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}
