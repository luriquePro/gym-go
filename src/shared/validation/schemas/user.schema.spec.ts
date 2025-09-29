import { CreateUserSchema } from '@/shared/validation/schemas/user.schema';
import { describe, expect, it } from '@jest/globals';

describe('CreateUserSchema (unit)', () => {
  it('aceita payload válido', () => {
    const data = {
      name: 'João da Silva',
      email: 'joao@example.com',
      password: '123456',
    };
    const result = CreateUserSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('rejeita nome curto', () => {
    const result = CreateUserSchema.safeParse({
      name: 'J',
      email: 'joao@example.com',
      password: '123456',
    });
    expect(result.success).toBe(false);
  });

  it('rejeita email inválido', () => {
    const result = CreateUserSchema.safeParse({
      name: 'Maria',
      email: 'invalido',
      password: '123456',
    });
    expect(result.success).toBe(false);
  });

  it('rejeita email muito longo', () => {
    const result = CreateUserSchema.safeParse({
      name: 'Maria',
      email: 'invalido@example.com'.repeat(100),
      password: '123456',
    });
    expect(result.success).toBe(false);
  });

  it('rejeita senha curta', () => {
    const result = CreateUserSchema.safeParse({
      name: 'Carlos',
      email: 'carlos@example.com',
      password: '123',
    });
    expect(result.success).toBe(false);
  });

  it('rejeita senha longa', () => {
    const result = CreateUserSchema.safeParse({
      name: 'Carlos',
      email: 'carlos@example.com',
      password: '1'.repeat(51),
    });
    expect(result.success).toBe(false);
  });
});
