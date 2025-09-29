import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { App } from '../../src/app';
import { ServerAdapterFactory } from '../../src/shared/adapters/factories/server-adapter.factory';
import prisma from '../../src/shared/adapters/prisma';

describe('POST /api/v1/users', () => {
  let appInstance: ReturnType<typeof App.getInstance>;
  let server: ReturnType<typeof App.prototype.getServerInstance>;

  beforeAll(async () => {
    appInstance = App.getInstance(
      ServerAdapterFactory.create(ServerAdapterFactory.ADAPTER_TYPES.FASTIFY),
    );
    server = appInstance.getServerInstance();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  describe('Sucessos', () => {
    it('deve criar um usuário com sucesso e retornar 201', async () => {
      const payload = {
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        password: 'senhaSegura123!',
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload,
      });
      expect(response.statusCode).toBe(201);
      expect(response.json()).toEqual(
        expect.objectContaining({
          success: true,
          response: expect.objectContaining({
            message: 'Usuário criado com sucesso',
            data: expect.objectContaining({
              id: expect.any(String),
              name: payload.name,
              email: payload.email,
            }),
          }),
        }),
      );
    });
  });

  describe('Erros', () => {
    it('deve retornar 400 quando payload inválido (cenário geral)', async () => {
      const payload = {
        name: '',
        email: 'invalido',
        password: '123',
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload,
      });
      expect(response.statusCode).toBe(400);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.response.error).toBe('Dados de entrada inválidos');
      expect(Array.isArray(body.response.details)).toBe(true);
      expect(body.response.details.length).toBeGreaterThan(0);
    });

    it('deve retornar 409 quando e-mail já estiver em uso', async () => {
      const payload = {
        name: 'Usuário X',
        email: 'duplicado@example.com',
        password: 'senhaSegura123',
      };

      // Cria usuário inicial
      const created = await server.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload,
      });
      expect(created.statusCode).toBe(201);

      // Tenta criar duplicado
      const response = await server.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: { ...payload, name: 'Outro Nome' },
      });
      expect(response.statusCode).toBe(409);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.response.error).toBe('Email já está em uso');
    });
  });
});
