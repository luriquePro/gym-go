/**
 * Classe base para erros da aplicação
 * Fornece estrutura consistente para tratamento de erros
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, unknown>,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();
    this.context = context ?? {};

    // Mantém o stack trace correto
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Cria um erro de validação
   */
  static validation(
    message: string,
    context?: Record<string, unknown>,
  ): AppError {
    return new AppError(message, 400, true, context);
  }

  /**
   * Cria um erro de não encontrado
   */
  static notFound(
    message: string = 'Recurso não encontrado',
    context?: Record<string, unknown>,
  ): AppError {
    return new AppError(message, 404, true, context);
  }

  /**
   * Cria um erro de não autorizado
   */
  static unauthorized(
    message: string = 'Não autorizado',
    context?: Record<string, unknown>,
  ): AppError {
    return new AppError(message, 401, true, context);
  }

  /**
   * Cria um erro de proibido
   */
  static forbidden(
    message: string = 'Acesso negado',
    context?: Record<string, unknown>,
  ): AppError {
    return new AppError(message, 403, true, context);
  }

  /**
   * Cria um erro de conflito
   */
  static conflict(
    message: string,
    context?: Record<string, unknown>,
  ): AppError {
    return new AppError(message, 409, true, context);
  }

  /**
   * Cria um erro interno do servidor
   */
  static internal(
    message: string = 'Erro interno do servidor',
    context?: Record<string, unknown>,
  ): AppError {
    return new AppError(message, 500, false, context);
  }

  /**
   * Converte o erro para um objeto serializável
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
      stack: this.stack,
    };
  }
}
