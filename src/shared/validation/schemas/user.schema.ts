import { ICreateUserRequest } from '@/application/interfaces/user.interface';
import { z } from 'zod';

export const CreateUserSchema: z.ZodSchema<ICreateUserRequest> = z.object({
  name: z
    .string('Nome deve ser uma string')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),

  email: z
    .email('Email deve ter um formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim(),

  password: z
    .string('Senha deve ser uma string')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres'),
});

export type CreateUserValidation = z.infer<typeof CreateUserSchema>;
