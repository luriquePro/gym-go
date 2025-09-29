import {
  IApiErrorResponse,
  IApiSuccessResponse,
} from '@/shared/interface/api-response.interface';
import { FastifyReply } from 'fastify';

export class ApiResponseUtil {
  static success<T>(
    reply: FastifyReply,
    data: T,
    statusCode: number = 200,
  ): void {
    const response: IApiSuccessResponse<T> = {
      success: true,
      response: data,
    };

    reply.status(statusCode).send(response);
  }

  static created<T>(
    reply: FastifyReply,
    data: T,
    statusCode: number = 201,
  ): void {
    const response: IApiSuccessResponse<T> = {
      success: true,
      response: data,
    };

    reply.status(statusCode).send(response);
  }

  static error(
    reply: FastifyReply,
    error: string,
    statusCode: number = 400,
    details?: any[],
  ): void {
    const response: IApiErrorResponse = {
      success: false,
      response: {
        error,
        ...(details && { details }),
      },
    };

    reply.status(statusCode).send(response);
  }

  static validationError(
    reply: FastifyReply,
    error: string,
    details: any[],
  ): void {
    return this.error(reply, error, 400, details);
  }

  static businessError(
    reply: FastifyReply,
    error: string,
    statusCode: number,
    details?: any[],
  ): void {
    return this.error(reply, error, statusCode, details);
  }

  static internalError(
    reply: FastifyReply,
    error: string = 'Erro interno do servidor',
    details?: any[],
  ): void {
    return this.error(reply, error, 500, details);
  }
}
