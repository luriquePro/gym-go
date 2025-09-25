# Padrão de Agentes - GymGo

## Visão Geral

Este projeto utiliza um sistema de agentes especializados para diferentes aspectos do desenvolvimento, seguindo princípios de responsabilidade única e organização modular. Cada agente tem uma função específica e bem definida.

## Estrutura dos Agentes

Todos os agentes estão localizados na pasta `agents/` e seguem um padrão consistente de documentação e funcionalidade.

### Localização

```
agents/
├── commits.md          # Agente para gerenciamento de commits
├── backend-developer.md # Agente para desenvolvimento backend
├── correcao-bugs.md    # Agente para correção de bugs
├── implementador.md    # Agente para implementação de funcionalidades
├── planejador.md       # Agente para planejamento de tarefas
├── refatorador.md      # Agente para refatoração de código
├── revisor.md          # Agente para revisão de código
└── testes.md           # Agente para testes automatizados
```

## Padrão de Estrutura

Cada agente segue o mesmo formato de documentação:

### 1. Identidade

```markdown
## Agente [Nome]

Você é um [especialista/desenvolvedor] focado em [área específica].
```

### 2. Objetivo

- Lista clara dos objetivos principais do agente
- Foco em entregas específicas e mensuráveis

### 3. Contexto

- Informações sobre o projeto GymGo
- Tecnologias utilizadas (TypeScript, Fastify, SOLID)
- Ambiente de desenvolvimento

### 4. Restrições

- Regras obrigatórias que o agente deve seguir
- Limitações e proibições específicas
- Padrões de qualidade a serem mantidos

### 5. Entregáveis

- O que o agente deve produzir
- Formato esperado das entregas
- Critérios de qualidade

### 6. Formato da Resposta

- Como o agente deve estruturar suas respostas
- Padrões de comunicação
- Organização das informações

### 7. Critérios de Aceite

- Condições para considerar uma tarefa concluída
- Padrões de qualidade
- Requisitos obrigatórios

### 8. Fluxo

- Passos sequenciais que o agente deve seguir
- Processo padronizado de trabalho
- Metodologia aplicada

## Agentes Disponíveis

### 🤖 Agente Commits

**Arquivo**: `agents/commits.md`
**Função**: Gerenciar commits seguindo convenções
**Características**:

- Segue Conventional Commits
- Mensagens em português
- Commits granulares
- Nunca usa `git add .` ou `git push`

### 👨‍💻 Agente Backend Developer

**Arquivo**: `agents/backend-developer.md`
**Função**: Desenvolvimento de funcionalidades backend
**Características**:

- Foco em TypeScript e Fastify
- Segue princípios SOLID
- Arquitetura limpa

### 🐛 Agente Correção de Bugs

**Arquivo**: `agents/correcao-bugs.md`
**Função**: Identificar e corrigir bugs
**Características**:

- Análise sistemática de problemas
- Correções seguras e testadas
- Documentação de correções

### ⚡ Agente Implementador

**Arquivo**: `agents/implementador.md`
**Função**: Implementar funcionalidades com qualidade
**Características**:

- Código funcional e pronto para produção
- Implementação incremental
- Validação local

### 📋 Agente Planejador

**Arquivo**: `agents/planejador.md`
**Função**: Planejar tarefas e funcionalidades
**Características**:

- Quebra de tarefas complexas
- Estimativas realistas
- Priorização adequada

### 🔄 Agente Refatorador

**Arquivo**: `agents/refatorador.md`
**Função**: Refatorar código existente
**Características**:

- Melhoria de qualidade
- Manutenção de funcionalidades
- Aplicação de boas práticas

### 👁️ Agente Revisor

**Arquivo**: `agents/revisor.md`
**Função**: Revisar código e funcionalidades
**Características**:

- Análise crítica de qualidade
- Sugestões de melhoria
- Validação de padrões

### 🧪 Agente Testes

**Arquivo**: `agents/testes.md`
**Função**: Criar e manter testes automatizados
**Características**:

- Cobertura de testes adequada
- Testes unitários e de integração
- Qualidade e confiabilidade

## Princípios dos Agentes

### 1. Responsabilidade Única

Cada agente tem uma função específica e bem definida, evitando sobreposição de responsabilidades.

### 2. Especialização

Agentes são especialistas em suas áreas, com conhecimento profundo dos padrões e práticas.

### 3. Consistência

Todos os agentes seguem o mesmo padrão de estrutura e comunicação.

### 4. Qualidade

Cada agente mantém altos padrões de qualidade em suas entregas.

### 5. Colaboração

Agentes trabalham em conjunto para entregar soluções completas.

## Como Usar os Agentes

### 1. Identificar a Necessidade

Determine qual agente é mais adequado para a tarefa:

- Desenvolvimento → Backend Developer ou Implementador
- Correção de problemas → Correção de Bugs
- Melhoria de código → Refatorador
- Revisão → Revisor
- Testes → Agente Testes
- Commits → Agente Commits

### 2. Consultar o Agente

Leia a documentação do agente para entender:

- Suas capacidades
- Seus limites
- Seu processo de trabalho

### 3. Seguir o Fluxo

Cada agente tem um fluxo definido que deve ser seguido para melhores resultados.

### 4. Validar Entregas

Use os critérios de aceite para validar se a tarefa foi concluída adequadamente.

## Benefícios do Sistema de Agentes

- **Organização**: Cada aspecto do desenvolvimento tem um especialista
- **Consistência**: Padrões uniformes em todo o projeto
- **Qualidade**: Especialização garante alta qualidade
- **Produtividade**: Processos otimizados e bem definidos
- **Manutenibilidade**: Código e processos mais fáceis de manter
- **Escalabilidade**: Fácil adição de novos agentes conforme necessário

## Extensibilidade

O sistema de agentes é facilmente extensível. Para adicionar um novo agente:

1. Criar arquivo `agents/novo-agente.md`
2. Seguir o padrão de estrutura definido
3. Especificar função, objetivos e restrições
4. Documentar fluxo de trabalho e critérios de aceite

## Referências

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
