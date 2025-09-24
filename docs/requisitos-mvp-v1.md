# 📋 Requisitos MVP - GymPass2

## 🎯 Objetivo
Desenvolver um MVP (Minimum Viable Product) do GymPass2 - aplicação para gerenciamento de check-ins em academias, seguindo os princípios SOLID e Clean Architecture.

## 📝 Contexto
Aplicação estilo GymPass que permite:
- Cadastro e autenticação de usuários
- Busca e descoberta de academias
- Sistema de check-ins com validação geográfica
- Gestão administrativa de academias

## ⚠️ Restrições
- Desenvolvimento seguindo princípios SOLID
- Arquitetura Clean Architecture
- Banco de dados PostgreSQL
- Autenticação via JWT
- Validação de distância geográfica para check-ins
- Sistema de permissões (usuário/admin)

---

## 🎯 REQUISITOS FUNCIONAIS (RFs)

### 🔐 Autenticação e Usuário
- [ ] **RF-01** Deve ser possível se cadastrar
- [ ] **RF-02** Deve ser possível se autenticar
- [ ] **RF-03** Deve ser possível obter o perfil de um usuário logado

### 🏃 Check-ins
- [ ] **RF-04** Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] **RF-05** Deve ser possível o usuário obter seu histórico de check-ins
- [ ] **RF-08** Deve ser possível o usuário realizar check-in em uma academia
- [ ] **RF-09** Deve ser possível validar o check-in de um usuário

### 🏋️ Academias
- [ ] **RF-06** Deve ser possível o usuário buscar academias próximas
- [ ] **RF-07** Deve ser possível o usuário buscar academias pelo nome
- [ ] **RF-10** Deve ser possível cadastrar uma academia

---

## ⚖️ REGRAS DE NEGÓCIO (RNs)

### 🔐 Cadastro e Autenticação
- [ ] **RN-01** O usuário não deve poder se cadastrar com e-mail duplicado
- [ ] **RN-02** O usuário deve conseguir se cadastrar com o Gmail

### 🏃 Check-ins
- [ ] **RN-03** O usuário não deve conseguir fazer 2+ check-ins no mesmo dia
- [ ] **RN-04** O usuário não deve conseguir fazer check-in a +100m da academia
- [ ] **RN-05** O check-in só pode ser validado em até 20min após criado
- [ ] **RN-06** O check-in só pode ser validado por administradores

### 👨‍💼 Administração
- [ ] **RN-07** A academia só pode ser cadastrada por administradores

---

## 🔧 REQUISITOS NÃO FUNCIONAIS (RNFs)

### 🔒 Segurança
- [ ] **RNF-01** A senha do usuário precisa estar criptografada
- [ ] **RNF-02** O usuário deve ser identificado por um JWT

### 🗄️ Banco de Dados
- [ ] **RNF-03** Os dados da aplicação precisam estar persistidos em PostgreSQL

### ⚡ Performance
- [ ] **RNF-04** Todas as listas de dados precisam ser paginadas, com padrão de 20 itens por página

---

## 🚀 ENTREGÁVEIS MVP

### 📋 Roadmap de Desenvolvimento
1. **Fase 1 - Base** (Semanas 1-2)
   - Configuração do projeto e arquitetura
   - Banco de dados e migrações
   - Sistema de autenticação

2. **Fase 2 - Core** (Semanas 3-4)
   - CRUD de usuários e academias
   - Sistema de check-ins
   - Validações de negócio

3. **Fase 3 - Validação** (Semanas 5-6)
   - Testes automatizados
   - Validação geográfica
   - Sistema de permissões

### 📊 Backlog Priorizado

#### 🔥 Alta Prioridade (Must Have)
- RF-01, RF-02, RF-03 (Autenticação completa)
- RF-08, RF-09 (Sistema de check-ins)
- RN-01, RN-02 (Validações de cadastro)
- RN-03, RN-04 (Regras de check-in)
- RNF-01, RNF-02 (Segurança)

#### ⚡ Média Prioridade (Should Have)
- RF-06, RF-07 (Busca de academias)
- RF-04, RF-05 (Histórico de check-ins)
- RF-10 (Cadastro de academias)
- RN-05, RN-06 (Validação de check-ins)
- RNF-03, RNF-04 (Banco e performance)

#### 📈 Baixa Prioridade (Could Have)
- RN-07 (Administração de academias)
- Funcionalidades futuras do roadmap

### ✅ Critérios de Pronto (Definition of Done)

#### Para cada Requisito Funcional:
- [ ] Implementação completa seguindo SOLID
- [ ] Testes unitários com cobertura > 80%
- [ ] Validação de regras de negócio
- [ ] Documentação da API
- [ ] Validação manual

#### Para cada Regra de Negócio:
- [ ] Validação implementada
- [ ] Testes de validação
- [ ] Tratamento de exceções
- [ ] Mensagens de erro claras

#### Para cada Requisito Não Funcional:
- [ ] Implementação técnica validada
- [ ] Testes de performance (se aplicável)
- [ ] Configuração de ambiente
- [ ] Documentação técnica

---

## 🎯 Milestones MVP

### 🏁 Milestone 1: Autenticação (Semana 2)
- Sistema completo de cadastro e login
- Validações de segurança implementadas
- JWT funcionando

### 🏁 Milestone 2: Check-ins (Semana 4)
- Sistema de check-ins operacional
- Validação geográfica funcionando
- Histórico de check-ins

### 🏁 Milestone 3: MVP Completo (Semana 6)
- Todas as funcionalidades core implementadas
- Testes automatizados
- Deploy em ambiente de produção

---

## 🔄 Próximos Passos Imediatos

1. **Configurar ambiente de desenvolvimento**
   - Node.js + TypeScript
   - PostgreSQL + Prisma
   - Jest para testes

2. **Implementar arquitetura base**
   - Clean Architecture
   - Dependency Injection
   - Repository Pattern

3. **Criar entidades do domínio**
   - User, Gym, CheckIn
   - Value Objects e DTOs

4. **Implementar RF-01 e RF-02**
   - Cadastro e autenticação
   - Validações RN-01 e RN-02

---

## 📊 Métricas de Sucesso MVP

- **Funcionalidade**: 100% dos RFs de alta prioridade implementados
- **Qualidade**: Cobertura de testes > 80%
- **Performance**: Tempo de resposta < 500ms
- **Segurança**: Zero vulnerabilidades críticas
- **Usabilidade**: Fluxo de check-in em < 3 cliques
