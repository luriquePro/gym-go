import { FastifyError } from 'fastify';

export interface IMappedError {
  message: string;
  statusCode: number;
}

/**
 * Mapeia uma mensagem de erro individual para uma mensagem amigável
 * @param message - Mensagem de erro original
 * @returns Mensagem formatada ou a original se não for um erro esperado
 */
function mapErrorMessage(message: string): string {
  const errorMessage = message.toLowerCase();

  // Erro de conexão com banco de dados (Prisma) - condição mais específica
  if (
    errorMessage.includes('server has closed the connection') ||
    errorMessage.includes('invalid `prisma') ||
    errorMessage.includes('connect econnrefused') ||
    errorMessage.includes('connection refused')
  ) {
    return 'Falha na conexão do Banco de dados';
  }

  // Erro de timeout de conexão
  if (
    errorMessage.includes('timeout') ||
    errorMessage.includes('etimedout') ||
    errorMessage.includes('connection timeout')
  ) {
    return 'Timeout na conexão com o serviço';
  }

  // Erro de autenticação com banco
  if (
    errorMessage.includes('authentication failed') ||
    errorMessage.includes('invalid credentials') ||
    errorMessage.includes('access denied')
  ) {
    return 'Erro de autenticação no Banco de dados';
  }

  // Erro de banco não encontrado
  if (
    errorMessage.includes('database') &&
    (errorMessage.includes('does not exist') ||
      errorMessage.includes('not found'))
  ) {
    return 'Banco de dados não encontrado';
  }

  // Erro de limite de conexões
  if (
    errorMessage.includes('too many connections') ||
    errorMessage.includes('connection limit') ||
    errorMessage.includes('max connections')
  ) {
    return 'Limite de conexões com o banco excedido';
  }

  // Erro de rede geral
  if (
    errorMessage.includes('network') ||
    errorMessage.includes('dns') ||
    errorMessage.includes('host not found') ||
    errorMessage.includes('getaddrinfo enotfound')
  ) {
    return 'Erro de conexão de rede';
  }

  // Erro genérico de banco de dados (condição mais ampla)
  if (
    (errorMessage.includes('database') || errorMessage.includes('prisma')) &&
    !errorMessage.includes('does not exist') &&
    !errorMessage.includes('not found')
  ) {
    return 'Falha na conexão do Banco de dados';
  }

  return message; // Retorna a mensagem original se não for um erro esperado
}

/**
 * Formata detalhes de erro, aplicando mapeamento nas mensagens
 * @param details - Array de detalhes de erro
 * @returns Array de detalhes com mensagens formatadas
 */
export function mapErrorDetails(details: any[]): any[] {
  if (!Array.isArray(details)) {
    return details;
  }

  return details.map((detail) => {
    if (typeof detail === 'object' && detail !== null) {
      const formattedDetail = { ...detail };

      // Se tem propriedade 'error', formata a mensagem
      if (typeof detail.error === 'string') {
        formattedDetail.error = mapErrorMessage(detail.error);
      }

      // Se tem propriedade 'message', formata a mensagem
      if (typeof detail.message === 'string') {
        formattedDetail.message = mapErrorMessage(detail.message);
      }

      return formattedDetail;
    }

    // Se o item não é um objeto, verifica se é uma string para formatar
    if (typeof detail === 'string') {
      return mapErrorMessage(detail);
    }

    return detail;
  });
}

/**
 * Mapeia erros esperados para mensagens mais amigáveis
 * @param error - Erro original
 * @returns Erro mapeado ou null se não for um erro esperado
 */
export function mapExpectedErrors(error: FastifyError): IMappedError | null {
  const mappedMessage = mapErrorMessage(error.message);

  // Se a mensagem foi mapeada (diferente da original), retorna o erro mapeado
  if (mappedMessage !== error.message) {
    // Determina o status code baseado na mensagem mapeada
    let statusCode = 503; // Default

    if (mappedMessage.includes('Timeout')) {
      statusCode = 504; // Gateway Timeout
    }

    return {
      message: mappedMessage,
      statusCode,
    };
  }

  return null; // Não é um erro esperado
}
