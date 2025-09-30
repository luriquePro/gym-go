import { AppError } from '@/shared/utils/app-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, ZodSchema } from 'zod';

export class ValidationMiddleware {
  static validateBody<T>(schema: ZodSchema<T>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (request: FastifyRequest, _: FastifyReply) => {
      try {
        const validatedData = schema.parse(request.body);
        request.body = validatedData;
      } catch (error) {
        if (error instanceof ZodError) {
          throw AppError.validation('Dados de entrada inválidos', {
            validation: this.formatZodErrors(error),
          });
        }

        throw error;
      }
    };
  }

  private static formatZodErrors(error: ZodError): Array<{
    field: string;
    message: string;
    code: string;
  }> {
    return error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));
  }
}
