import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { FastifyReply } from 'fastify';
import { ApiResponseUtil } from './api-response.util';

describe('ApiResponseUtil', () => {
  let mockReply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('success', () => {
    it('deve enviar resposta de sucesso com status 200 padrão', () => {
      const data = { id: 1, name: 'João' };

      ApiResponseUtil.success(mockReply, data);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: data,
      });
    });

    it('deve enviar resposta de sucesso com status personalizado', () => {
      const data = { message: 'Operação realizada' };

      ApiResponseUtil.success(mockReply, data, 202);

      expect(mockReply.status).toHaveBeenCalledWith(202);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: data,
      });
    });

    it('deve enviar resposta com dados nulos', () => {
      ApiResponseUtil.success(mockReply, null);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: null,
      });
    });

    it('deve enviar resposta com array vazio', () => {
      const data: any[] = [];

      ApiResponseUtil.success(mockReply, data);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: [],
      });
    });

    it('deve enviar resposta com objeto complexo', () => {
      const data = {
        users: [
          { id: 1, name: 'João' },
          { id: 2, name: 'Maria' },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
        },
      };

      ApiResponseUtil.success(mockReply, data);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: data,
      });
    });
  });

  describe('created', () => {
    it('deve enviar resposta de criação com status 201 padrão', () => {
      const data = { id: 1, name: 'Novo usuário' };

      ApiResponseUtil.created(mockReply, data);

      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: data,
      });
    });

    it('deve enviar resposta de criação com status personalizado', () => {
      const data = { id: 1, name: 'Novo recurso' };

      ApiResponseUtil.created(mockReply, data, 202);

      expect(mockReply.status).toHaveBeenCalledWith(202);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: data,
      });
    });

    it('deve enviar resposta de criação com dados undefined', () => {
      ApiResponseUtil.created(mockReply, undefined as any);

      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: undefined,
      });
    });
  });

  describe('error', () => {
    it('deve enviar resposta de erro com status 400 padrão', () => {
      const error = 'Erro de validação';

      ApiResponseUtil.error(mockReply, error);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
        },
      });
    });

    it('deve enviar resposta de erro com status personalizado', () => {
      const error = 'Recurso não encontrado';

      ApiResponseUtil.error(mockReply, error, 404);

      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
        },
      });
    });

    it('deve enviar resposta de erro com detalhes', () => {
      const error = 'Dados inválidos';
      const details = [
        { field: 'email', message: 'Email inválido', code: 'invalid_email' },
        {
          field: 'password',
          message: 'Senha muito curta',
          code: 'short_password',
        },
      ];

      ApiResponseUtil.error(mockReply, error, 400, details);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
          details,
        },
      });
    });

    it('deve enviar resposta de erro sem detalhes quando array vazio', () => {
      const error = 'Erro sem detalhes';
      const details: any[] = [];

      ApiResponseUtil.error(mockReply, error, 400, details);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
          details,
        },
      });
    });

    it('deve enviar resposta de erro com detalhes undefined', () => {
      const error = 'Erro simples';

      ApiResponseUtil.error(mockReply, error, 500, undefined);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
        },
      });
    });
  });

  describe('validationError', () => {
    it('deve enviar resposta de erro de validação com status 400', () => {
      const error = 'Dados de entrada inválidos';
      const details = [
        { field: 'email', message: 'Email é obrigatório', code: 'required' },
      ];

      ApiResponseUtil.validationError(mockReply, error, details);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
          details,
        },
      });
    });

    it('deve enviar resposta de erro de validação com múltiplos detalhes', () => {
      const error = 'Múltiplos erros de validação';
      const details = [
        { field: 'name', message: 'Nome é obrigatório', code: 'required' },
        { field: 'age', message: 'Idade deve ser maior que 0', code: 'min' },
        {
          field: 'email',
          message: 'Email deve ter formato válido',
          code: 'email',
        },
      ];

      ApiResponseUtil.validationError(mockReply, error, details);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
          details,
        },
      });
    });
  });

  describe('businessError', () => {
    it('deve enviar resposta de erro de negócio com status personalizado', () => {
      const error = 'Email já está em uso';

      ApiResponseUtil.businessError(mockReply, error, 409);

      expect(mockReply.status).toHaveBeenCalledWith(409);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
        },
      });
    });

    it('deve enviar resposta de erro de negócio com detalhes', () => {
      const error = 'Limite de requisições excedido';
      const details = [
        {
          field: 'rate_limit',
          message: 'Máximo de 100 requisições por hora',
          code: 'rate_limit_exceeded',
        },
      ];

      ApiResponseUtil.businessError(mockReply, error, 429, details);

      expect(mockReply.status).toHaveBeenCalledWith(429);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
          details,
        },
      });
    });

    it('deve enviar resposta de erro de negócio sem detalhes', () => {
      const error = 'Acesso negado';

      ApiResponseUtil.businessError(mockReply, error, 403);

      expect(mockReply.status).toHaveBeenCalledWith(403);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
        },
      });
    });
  });

  describe('internalError', () => {
    it('deve enviar resposta de erro interno com mensagem padrão', () => {
      ApiResponseUtil.internalError(mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error: 'Erro interno do servidor',
        },
      });
    });

    it('deve enviar resposta de erro interno com mensagem personalizada', () => {
      const error = 'Erro de conexão com banco de dados';

      ApiResponseUtil.internalError(mockReply, error);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
        },
      });
    });

    it('deve enviar resposta de erro interno com detalhes', () => {
      const error = 'Erro de configuração';
      const details = [
        {
          field: 'database',
          message: 'Conexão falhou',
          code: 'connection_error',
        },
      ];

      ApiResponseUtil.internalError(mockReply, error, details);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
          details,
        },
      });
    });

    it('deve enviar resposta de erro interno com detalhes undefined', () => {
      const error = 'Erro crítico';

      ApiResponseUtil.internalError(mockReply, error, undefined);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        response: {
          error,
        },
      });
    });
  });

  describe('Integração com FastifyReply', () => {
    it('deve chamar status e send em sequência', () => {
      const data = { test: 'data' };

      ApiResponseUtil.success(mockReply, data, 201);

      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: data,
      });

      // Verifica se ambos foram chamados
      expect(mockReply.status).toHaveBeenCalledTimes(1);
      expect(mockReply.send).toHaveBeenCalledTimes(1);
    });

    it('deve funcionar com diferentes tipos de dados', () => {
      // String
      ApiResponseUtil.success(mockReply, 'string data');
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: 'string data',
      });

      // Number
      ApiResponseUtil.success(mockReply, 42);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: 42,
      });

      // Boolean
      ApiResponseUtil.success(mockReply, true);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: true,
      });

      // Object
      const obj = { key: 'value' };
      ApiResponseUtil.success(mockReply, obj);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        response: obj,
      });
    });

    it('deve manter referência do mockReply entre chamadas', () => {
      const data1 = { id: 1 };
      const data2 = { id: 2 };

      ApiResponseUtil.success(mockReply, data1, 200);
      ApiResponseUtil.success(mockReply, data2, 201);

      expect(mockReply.status).toHaveBeenCalledTimes(2);
      expect(mockReply.send).toHaveBeenCalledTimes(2);
      expect(mockReply.status).toHaveBeenNthCalledWith(1, 200);
      expect(mockReply.status).toHaveBeenNthCalledWith(2, 201);
    });
  });
});
