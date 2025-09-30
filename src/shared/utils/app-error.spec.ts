import { describe, expect, it } from '@jest/globals';
import { AppError } from './app-error';

describe('AppError', () => {
  describe('Construtor', () => {
    it('deve criar uma instância com propriedades básicas', () => {
      const error = new AppError('Erro de teste', 400);

      expect(error.message).toBe('Erro de teste');
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe('AppError');
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.context).toEqual([]);
    });

    it('deve definir valores padrão quando não fornecidos', () => {
      const error = new AppError('Erro padrão');

      expect(error.message).toBe('Erro padrão');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
      expect(error.context).toEqual([]);
    });

    it('deve aceitar contexto personalizado', () => {
      const context = { userId: 123, action: 'create' };
      const error = new AppError('Erro com contexto', 400, true, context);

      expect(error.context).toBe(context);
    });

    it('deve definir isOperational como false quando especificado', () => {
      const error = new AppError('Erro não operacional', 500, false);

      expect(error.isOperational).toBe(false);
    });

    it('deve manter o stack trace correto', () => {
      const error = new AppError('Erro de teste');

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('AppError');
    });
  });

  describe('Métodos estáticos', () => {
    describe('validation', () => {
      it('deve criar erro de validação com status 400', () => {
        const error = AppError.validation('Dados inválidos');

        expect(error.message).toBe('Dados inválidos');
        expect(error.statusCode).toBe(400);
        expect(error.isOperational).toBe(true);
        expect(error.name).toBe('AppError');
      });

      it('deve aceitar contexto para erro de validação', () => {
        const context = { field: 'email', value: 'invalid-email' };
        const error = AppError.validation('Email inválido', context);

        expect(error.context).toBe(context);
      });
    });

    describe('notFound', () => {
      it('deve criar erro de não encontrado com status 404', () => {
        const error = AppError.notFound();

        expect(error.message).toBe('Recurso não encontrado');
        expect(error.statusCode).toBe(404);
        expect(error.isOperational).toBe(true);
      });

      it('deve aceitar mensagem personalizada', () => {
        const error = AppError.notFound('Usuário não encontrado');

        expect(error.message).toBe('Usuário não encontrado');
        expect(error.statusCode).toBe(404);
      });

      it('deve aceitar contexto para erro de não encontrado', () => {
        const context = { id: 123, type: 'user' };
        const error = AppError.notFound('Usuário não encontrado', context);

        expect(error.context).toBe(context);
      });
    });

    describe('unauthorized', () => {
      it('deve criar erro de não autorizado com status 401', () => {
        const error = AppError.unauthorized();

        expect(error.message).toBe('Não autorizado');
        expect(error.statusCode).toBe(401);
        expect(error.isOperational).toBe(true);
      });

      it('deve aceitar mensagem personalizada', () => {
        const error = AppError.unauthorized('Token inválido');

        expect(error.message).toBe('Token inválido');
        expect(error.statusCode).toBe(401);
      });

      it('deve aceitar contexto para erro de não autorizado', () => {
        const context = { token: 'invalid-token' };
        const error = AppError.unauthorized('Token inválido', context);

        expect(error.context).toBe(context);
      });
    });

    describe('forbidden', () => {
      it('deve criar erro de proibido com status 403', () => {
        const error = AppError.forbidden();

        expect(error.message).toBe('Acesso negado');
        expect(error.statusCode).toBe(403);
        expect(error.isOperational).toBe(true);
      });

      it('deve aceitar mensagem personalizada', () => {
        const error = AppError.forbidden('Permissão insuficiente');

        expect(error.message).toBe('Permissão insuficiente');
        expect(error.statusCode).toBe(403);
      });

      it('deve aceitar contexto para erro de proibido', () => {
        const context = { userId: 123, resource: 'admin-panel' };
        const error = AppError.forbidden('Acesso negado', context);

        expect(error.context).toBe(context);
      });
    });

    describe('conflict', () => {
      it('deve criar erro de conflito com status 409', () => {
        const error = AppError.conflict('Email já existe');

        expect(error.message).toBe('Email já existe');
        expect(error.statusCode).toBe(409);
        expect(error.isOperational).toBe(true);
      });

      it('deve aceitar contexto para erro de conflito', () => {
        const context = { email: 'test@example.com' };
        const error = AppError.conflict('Email já existe', context);

        expect(error.context).toBe(context);
      });
    });

    describe('internal', () => {
      it('deve criar erro interno com status 500 e isOperational false', () => {
        const error = AppError.internal();

        expect(error.message).toBe('Erro interno do servidor');
        expect(error.statusCode).toBe(500);
        expect(error.isOperational).toBe(false);
      });

      it('deve aceitar mensagem personalizada', () => {
        const error = AppError.internal('Erro de conexão com banco');

        expect(error.message).toBe('Erro de conexão com banco');
        expect(error.statusCode).toBe(500);
        expect(error.isOperational).toBe(false);
      });

      it('deve aceitar contexto para erro interno', () => {
        const context = { database: 'postgres', operation: 'query' };
        const error = AppError.internal('Erro de banco', context);

        expect(error.context).toBe(context);
      });
    });
  });

  describe('Método toJSON', () => {
    it('deve converter erro para objeto serializável', () => {
      const context = { userId: 123 };
      const error = new AppError('Erro de teste', 400, true, context);
      const json = error.toJSON();

      expect(json).toEqual({
        name: 'AppError',
        message: 'Erro de teste',
        statusCode: 400,
        isOperational: true,
        timestamp: expect.any(String),
        context: context,
        stack: expect.any(String),
      });
    });

    it('deve incluir timestamp em formato ISO string', () => {
      const error = new AppError('Erro de teste');
      const json = error.toJSON();

      expect(json['timestamp']).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });

    it('deve incluir stack trace no JSON', () => {
      const error = new AppError('Erro de teste');
      const json = error.toJSON();

      expect(json['stack']).toContain('AppError');
    });

    it('deve lidar com contexto vazio', () => {
      const error = new AppError('Erro sem contexto');
      const json = error.toJSON();

      expect(json['context']).toEqual([]);
    });
  });

  describe('Herança de Error', () => {
    it('deve ser uma instância de Error', () => {
      const error = new AppError('Erro de teste');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
    });

    it('deve ter propriedades padrão do Error', () => {
      const error = new AppError('Erro de teste');

      expect(error.name).toBe('AppError');
      expect(error.message).toBe('Erro de teste');
      expect(error.stack).toBeDefined();
    });
  });

  describe('Casos especiais', () => {
    it('deve lidar com contexto undefined', () => {
      const error = new AppError('Erro de teste', 400, true, undefined);

      expect(error.context).toEqual([]);
    });

    it('deve lidar com contexto null', () => {
      const error = new AppError('Erro de teste', 400, true, null as any);

      expect(error.context).toEqual([]);
    });

    it('deve aceitar array como contexto', () => {
      const context = [{ id: 1 }, { id: 2 }];
      const error = new AppError('Erro com array', 400, true, context);

      expect(error.context).toBe(context);
    });

    it('deve aceitar objeto complexo como contexto', () => {
      const context = {
        user: { id: 123, name: 'João' },
        request: { method: 'POST', url: '/api/users' },
        metadata: { timestamp: new Date(), version: '1.0' },
      };
      const error = new AppError('Erro complexo', 400, true, context);

      expect(error.context).toBe(context);
    });
  });
});
