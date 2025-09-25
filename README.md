# Gym-Go

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![SOLID](https://img.shields.io/badge/SOLID-000000?style=for-the-badge&logo=solid&logoColor=white)](https://en.wikipedia.org/wiki/SOLID)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> **Plataforma moderna de gerenciamento de check-ins em academias**

Gym-Go é uma aplicação robusta e escalável para gerenciamento de check-ins em academias, desenvolvida com TypeScript, Fastify e seguindo os princípios SOLID e Clean Architecture. A plataforma oferece uma experiência completa para usuários e administradores de academias.

## 🚀 Quick Start

### Pré-requisitos

- Node.js 20+
- npm ou yarn
- PostgreSQL 13+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/luriquePro/gym-go.git
cd gym-go

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

| Script               | Descrição                                           |
| -------------------- | --------------------------------------------------- |
| `npm run dev`        | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build`      | Compila o projeto para produção                     |
| `npm run start`      | Inicia o servidor de produção                       |
| `npm run test`       | Executa os testes unitários com Jest                |
| `npm run test:watch` | Executa os testes em modo watch com Jest            |
| `npm run test:e2e`   | Executa os testes end-to-end com SuperTest          |

## 📚 Documentação

### 📋 Requisitos e Especificações

- **[Requisitos MVP v1.0](./docs/requisitos-mvp-v1.md)** - Especificações da versão inicial
- **[Requisitos MVP v2.0](./docs/requisitos-mvp-v2.md)** - Evolução com funcionalidades avançadas

### 🤖 Sistema de Agentes

- **[Padrão de Agentes](./docs/padrao-agentes.md)** - Documentação completa do sistema de agentes
- **[Padrão de Commits](./docs/padrao-commits.md)** - Convenções de commits do projeto

### 🏗️ Arquitetura

- **[Clean Architecture](./docs/arquitetura.md)** - Documentação da arquitetura (em desenvolvimento)
- **[Domain Model](./docs/domain-model.md)** - Modelo de domínio (em desenvolvimento)

---

## ✨ Funcionalidades

### 🔐 Autenticação e Usuários

- Sistema de cadastro e login seguro
- Autenticação JWT com refresh tokens
- Integração com provedores OAuth (Google)
- Gerenciamento de perfis de usuário

### 🏋️ Check-ins

- Check-in geolocalizado com validação de proximidade
- Histórico completo de check-ins
- Sistema de validação por administradores
- Notificações em tempo real

### 🏢 Academias

- Cadastro e gerenciamento de academias
- Busca por proximidade geográfica
- Sistema de administração completo
- Perfis personalizados para cada academia

## 🏗️ Arquitetura

### Princípios Arquiteturais

O Gym-Go segue uma arquitetura robusta baseada em:

- **🏛️ Clean Architecture** - Separação clara de responsabilidades
- **🎯 Domain-Driven Design** - Foco no domínio de negócio
- **🔧 SOLID Principles** - Código maintível e extensível
- **📦 Dependency Injection** - Baixo acoplamento e alta testabilidade

### Stack Tecnológica

| Camada        | Tecnologia | Versão |
| ------------- | ---------- | ------ |
| **Runtime**   | Node.js    | 20.0.0 |
| **Language**  | TypeScript | 5.9.2  |
| **Framework** | Fastify    | 5.6.1  |
| **Database**  | PostgreSQL | 13.0.0 |
| **ORM**       | Prisma     | 5.0.0  |
| **Testing**   | Jest       | 29.0.0 |
| **E2E Tests** | SuperTest  | 6.3.0  |
| **Build**     | tsup       | 8.5.0  |

### Estrutura do Projeto

```
src/
├── app.ts                 # Configuração da aplicação
├── server.ts              # Ponto de entrada
├── domain/                # Regras de negócio
│   ├── entities/          # Entidades do domínio
│   ├── repositories/      # Interfaces dos repositórios
│   └── use-cases/         # Casos de uso
├── infrastructure/        # Implementações técnicas
│   ├── database/          # Configuração do banco
│   ├── repositories/      # Implementação dos repositórios
│   └── external/          # Serviços externos
├── presentation/          # Camada de apresentação
│   ├── controllers/       # Controllers HTTP
│   ├── routes/           # Definição das rotas
│   └── middlewares/      # Middlewares personalizados
└── shared/               # Utilitários compartilhados
    ├── errors/           # Tratamento de erros
    ├── validators/       # Validações
    └── types/            # Tipos TypeScript
```

## 🤖 Sistema de Agentes

O projeto utiliza um sistema inovador de agentes especializados para automatizar diferentes aspectos do desenvolvimento:

| Agente                | Responsabilidade                           |
| --------------------- | ------------------------------------------ |
| **Backend Developer** | Desenvolvimento de funcionalidades backend |
| **Commits**           | Gerenciamento de commits e versionamento   |
| **Correção de Bugs**  | Identificação e correção de problemas      |
| **Implementador**     | Implementação de funcionalidades           |
| **Planejador**        | Planejamento e organização de tarefas      |
| **Refatorador**       | Melhoria e refatoração de código           |
| **Revisor**           | Revisão de código e qualidade              |
| **Testes**            | Criação e manutenção de testes             |

## 📋 Roadmap

### 🎯 MVP v1.0 (Atual)

- [x] Estrutura base do projeto
- [x] Sistema de agentes
- [x] Configuração TypeScript
- [ ] Autenticação básica
- [ ] CRUD de usuários
- [ ] Sistema de check-ins

### 🚀 MVP v2.0 (Próximo)

- [ ] Integração com Google OAuth
- [ ] Sistema de notificações
- [ ] Dashboard administrativo
- [ ] API de geolocalização
- [ ] Testes automatizados

### 🌟 Futuro

- [ ] Mobile app (React Native)
- [ ] Sistema de pagamentos
- [ ] Analytics avançado
- [ ] Integração com wearables
- [ ] IA para recomendações

## 🧪 Qualidade e Testes

### Estratégia de Testes

- **🔬 Testes Unitários** - Jest com cobertura > 80%
- **🔗 Testes de Integração** - APIs e banco de dados com Jest
- **🎭 Testes E2E** - Fluxos críticos do usuário com SuperTest
- **📊 Code Coverage** - Relatórios automatizados com Jest

### Ferramentas de Qualidade

- **ESLint** - Linting e formatação
- **Prettier** - Formatação consistente
- **Jest** - Framework de testes unitários
- **SuperTest** - Testes de integração HTTP
- **Husky** - Git hooks
- **Commitlint** - Validação de commits

## 🤝 Contribuindo

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Padrões de Desenvolvimento

- Seguir [Conventional Commits](https://www.conventionalcommits.org/)
- Manter cobertura de testes > 80% com Jest
- Seguir os princípios SOLID
- Documentar mudanças significativas
- Executar testes unitários e E2E antes de commits

## 📄 Licença

Este projeto está licenciado sob a licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe

- **Luiz Henrique** - Desenvolvedor Principal

## 📞 Suporte

- 📧 **Email**: suporte@gym-go.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/luriquePro/gym-go/issues)
- 💬 **Discord**: [Comunidade Gym-Go](https://discord.gg/gym-go)

---

<div align="center">

**Feito com ❤️ pela equipe Gym-Go**

[![GitHub stars](https://img.shields.io/github/stars/luriquePro/gym-go?style=social)](https://github.com/luriquePro/gym-go)
[![GitHub forks](https://img.shields.io/github/forks/luriquePro/gym-go?style=social)](https://github.com/luriquePro/gym-go/fork)

</div>
