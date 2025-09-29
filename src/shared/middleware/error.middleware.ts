import { AppError } from '@/shared/errors/AppError';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ApiResponseUtil } from '../utils/api-response.util';

/**
 * Middleware global de tratamento de erros do Fastify
 * Intercepta todos os erros automaticamente com tratamento dinâmico
 */
export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const errorDetails = [
    {
      error: error.message,
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    },
  ];

  // Se for um AppError (erro de negócio)
  if (error instanceof AppError) {
    return ApiResponseUtil.businessError(
      reply,
      error.message,
      error.statusCode,
      errorDetails,
    );
  }

  // Se for um erro de validação do Zod (já tratado pelo middleware de validação)
  if (
    error.statusCode === 400 &&
    error.message.includes('Dados de entrada inválidos')
  ) {
    const details =
      error.validation?.map((err) => ({
        field: err.instancePath || err.schemaPath || 'unknown',
        message: err.message || 'Erro de validação',
        code: err.keyword || 'validation_error',
      })) || [];

    return ApiResponseUtil.validationError(reply, error.message, details);
  }

  // Se for um erro de validação do Fastify com detalhes
  if (error.statusCode === 400 && error.validation) {
    const details = error.validation.map((err) => ({
      field: err.instancePath || err.schemaPath || 'unknown',
      message: err.message || 'Erro de validação',
      code: err.keyword || 'validation_error',
    }));

    return ApiResponseUtil.validationError(
      reply,
      'Dados de entrada inválidos',
      details,
    );
  }

  // Se for um erro de schema do Fastify
  if (error.statusCode === 400) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Dados de entrada inválidos',
      400,
      errorDetails,
    );
  }

  // Se for um erro de autenticação/autorização
  if (error.statusCode === 401) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Não autorizado',
      401,
      errorDetails,
    );
  }

  // Se for um erro de permissão
  if (error.statusCode === 403) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Acesso negado',
      403,
      errorDetails,
    );
  }

  // Se for um erro de não encontrado
  if (error.statusCode === 404) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Recurso não encontrado',
      404,
      errorDetails,
    );
  }

  // Se for um erro de conflito
  if (error.statusCode === 409) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Conflito de dados',
      409,
      errorDetails,
    );
  }

  // Se for um erro de validação de schema
  if (error.statusCode === 422) {
    const details =
      error.validation?.map((err) => ({
        field: err.instancePath || err.schemaPath || 'unknown',
        message: err.message || 'Erro de validação',
        code: err.keyword || 'validation_error',
      })) || [];

    return ApiResponseUtil.validationError(
      reply,
      error.message || 'Dados inválidos',
      details,
    );
  }

  // Se for um erro de método não permitido
  if (error.statusCode === 405) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Método não permitido',
      405,
      errorDetails,
    );
  }

  // Se for um erro de timeout
  if (error.statusCode === 408) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Timeout da requisição',
      408,
      errorDetails,
    );
  }

  // Se for um erro de payload muito grande
  if (error.statusCode === 413) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Payload muito grande',
      413,
      errorDetails,
    );
  }

  // Se for um erro de URI muito longa
  if (error.statusCode === 414) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'URI muito longa',
      414,
      errorDetails,
    );
  }

  // Se for um erro de tipo de mídia não suportado
  if (error.statusCode === 415) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Tipo de mídia não suportado',
      415,
      errorDetails,
    );
  }

  // Se for um erro de limite de taxa excedido
  if (error.statusCode === 429) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Muitas requisições',
      429,
      errorDetails,
    );
  }

  // Se for um erro de servidor (5xx)
  if (error.statusCode && error.statusCode >= 500) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Erro interno do servidor',
      error.statusCode,
      errorDetails,
    );
  }

  // Se for um erro de cliente (4xx)
  if (error.statusCode && error.statusCode >= 400) {
    return ApiResponseUtil.error(
      reply,
      error.message || 'Erro na requisição',
      error.statusCode,
      errorDetails,
    );
  }

  // Erro interno do servidor (500) - fallback
  return ApiResponseUtil.internalError(reply, error.message, errorDetails);
}
