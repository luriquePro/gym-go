import { describe, expect, it } from '@jest/globals';
import { FastifyError } from 'fastify';
import { mapErrorDetails, mapExpectedErrors } from './error-mapper.util';

describe('ErrorMapperUtil', () => {
  describe('mapExpectedErrors', () => {
    it('deve mapear erros de conexão do Prisma para mensagem amigável', () => {
      const error = {
        message: 'Server has closed the connection',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Falha na conexão do Banco de dados',
        statusCode: 503,
      });
    });

    it('deve mapear erros de invocação inválida do Prisma', () => {
      const error = {
        message: 'Invalid `prisma.user.findUnique()` invocation',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Falha na conexão do Banco de dados',
        statusCode: 503,
      });
    });

    it('deve mapear erros de conexão recusada', () => {
      const error = {
        message: 'connect ECONNREFUSED 127.0.0.1:5432',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Falha na conexão do Banco de dados',
        statusCode: 503,
      });
    });

    it('deve mapear erros de timeout', () => {
      const error = {
        message: 'ETIMEDOUT connection timeout',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Timeout na conexão com o serviço',
        statusCode: 504,
      });
    });

    it('deve mapear erros de autenticação falhada', () => {
      const error = {
        message: 'Authentication failed for user',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Erro de autenticação no Banco de dados',
        statusCode: 503,
      });
    });

    it('deve mapear erros de banco de dados não encontrado', () => {
      const error = {
        message: 'Database does not exist',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Banco de dados não encontrado',
        statusCode: 503,
      });
    });

    it('deve mapear erros de muitas conexões', () => {
      const error = {
        message: 'Too many connections to database',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Limite de conexões com o banco excedido',
        statusCode: 503,
      });
    });

    it('deve mapear erros de rede', () => {
      const error = {
        message: 'Network error: getaddrinfo ENOTFOUND',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Erro de conexão de rede',
        statusCode: 503,
      });
    });

    it('deve retornar null para erros desconhecidos', () => {
      const error = {
        message: 'Some random error message',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toBeNull();
    });

    it('deve tratar mensagens de erro case insensitive', () => {
      const error = {
        message: 'SERVER HAS CLOSED THE CONNECTION',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toEqual({
        message: 'Falha na conexão do Banco de dados',
        statusCode: 503,
      });
    });

    it('deve tratar mensagem de erro vazia', () => {
      const error = {
        message: '',
      } as FastifyError;

      const result = mapExpectedErrors(error);

      expect(result).toBeNull();
    });
  });

  describe('mapErrorDetails', () => {
    it('deve formatar propriedade error em detalhes', () => {
      const details = [
        {
          error: 'Server has closed the connection',
          url: '/api/v1/users',
          method: 'POST',
        },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        {
          error: 'Falha na conexão do Banco de dados',
          url: '/api/v1/users',
          method: 'POST',
        },
      ]);
    });

    it('deve formatar propriedade message em detalhes', () => {
      const details = [
        {
          message: 'Invalid `prisma.user.findUnique()` invocation',
          timestamp: '2025-09-30T09:24:06.511Z',
        },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        {
          message: 'Falha na conexão do Banco de dados',
          timestamp: '2025-09-30T09:24:06.511Z',
        },
      ]);
    });

    it('deve formatar múltiplos detalhes com diferentes tipos de erro', () => {
      const details = [
        {
          error: 'Server has closed the connection',
          url: '/api/v1/users',
        },
        {
          message: 'ETIMEDOUT connection timeout',
          timestamp: '2025-09-30T09:24:06.511Z',
        },
        {
          error: 'Authentication failed for user',
          userId: 123,
        },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        {
          error: 'Falha na conexão do Banco de dados',
          url: '/api/v1/users',
        },
        {
          message: 'Timeout na conexão com o serviço',
          timestamp: '2025-09-30T09:24:06.511Z',
        },
        {
          error: 'Erro de autenticação no Banco de dados',
          userId: 123,
        },
      ]);
    });

    it('deve formatar strings simples em detalhes', () => {
      const details = [
        'Server has closed the connection',
        'ETIMEDOUT connection timeout',
        'Invalid `prisma.user.findUnique()` invocation',
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        'Falha na conexão do Banco de dados',
        'Timeout na conexão com o serviço',
        'Falha na conexão do Banco de dados',
      ]);
    });

    it('deve manter detalhes que não são erros esperados', () => {
      const details = [
        {
          error: 'Some random error message',
          url: '/api/v1/users',
        },
        {
          message: 'Another custom error',
          timestamp: '2025-09-30T09:24:06.511Z',
        },
        {
          customField: 'custom value',
          number: 123,
        },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        {
          error: 'Some random error message',
          url: '/api/v1/users',
        },
        {
          message: 'Another custom error',
          timestamp: '2025-09-30T09:24:06.511Z',
        },
        {
          customField: 'custom value',
          number: 123,
        },
      ]);
    });

    it('deve lidar com array vazio', () => {
      const details: any[] = [];

      const result = mapErrorDetails(details);

      expect(result).toEqual([]);
    });

    it('deve lidar com entrada não array', () => {
      const details = { error: 'Server has closed the connection' };

      const result = mapErrorDetails(details as any);

      expect(result).toEqual(details);
    });

    it('deve lidar com detalhes null ou undefined', () => {
      const details = [
        null,
        undefined,
        { error: 'Server has closed the connection' },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        null,
        undefined,
        { error: 'Falha na conexão do Banco de dados' },
      ]);
    });

    it('deve formatar erros de banco não encontrado em detalhes', () => {
      const details = [
        {
          error: 'Database does not exist',
          operation: 'connect',
        },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        {
          error: 'Banco de dados não encontrado',
          operation: 'connect',
        },
      ]);
    });

    it('deve formatar erros de limite de conexões em detalhes', () => {
      const details = [
        {
          error: 'Too many connections to database',
          maxConnections: 100,
        },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        {
          error: 'Limite de conexões com o banco excedido',
          maxConnections: 100,
        },
      ]);
    });

    it('deve formatar erros de rede em detalhes', () => {
      const details = [
        {
          error: 'Network error: getaddrinfo ENOTFOUND',
          host: 'localhost',
        },
      ];

      const result = mapErrorDetails(details);

      expect(result).toEqual([
        {
          error: 'Erro de conexão de rede',
          host: 'localhost',
        },
      ]);
    });
  });
});
