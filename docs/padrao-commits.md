# Padrão de Commits - GymPass2

## Visão Geral

Este projeto segue rigorosamente a convenção de commits para manter um histórico limpo, organizado e compreensível. Todas as mensagens de commit são escritas em português e seguem um formato padronizado.

## Convenção de Commits

### Formato Básico

```
emoji tipo(escopo): descrição da mudança

Corpo da mensagem (opcional)
```

**Exemplo:**
```
✨ feat(auth): adiciona sistema de autenticação JWT

Implementa autenticação segura usando JWT tokens
com refresh token e middleware de validação
```

### Tipos de Commit

| Tipo | Emoji | Descrição | Exemplo |
|------|-------|-----------|---------|
| `feat` | ✨ | Nova funcionalidade | `feat(auth): adiciona sistema de autenticação JWT` |
| `fix` | 🐛 | Correção de bug | `fix(api): corrige validação de dados de entrada` |
| `docs` | 📚 | Documentação | `docs(readme): atualiza instruções de instalação` |
| `style` | 💄 | Formatação, sem mudança de código | `style(eslint): corrige formatação do código` |
| `refactor` | ♻️ | Refatoração de código | `refactor(domain): melhora estrutura das entidades` |
| `test` | 🧪 | Adição ou correção de testes | `test(unit): adiciona testes para service de usuário` |
| `chore` | 🔧 | Tarefas de manutenção | `chore(deps): atualiza dependências do projeto` |
| `perf` | ⚡ | Melhoria de performance | `perf(api): otimiza consultas do banco de dados` |
| `ci` | 👷 | Configuração de CI/CD | `ci(github): adiciona workflow de testes` |
| `build` | 📦 | Mudanças no sistema de build | `build(webpack): atualiza configuração de bundle` |
| `revert` | ⏪ | Reversão de commit | `revert: desfaz alterações do commit abc123` |

### Escopos Comuns

- `core`: Estrutura principal da aplicação
- `auth`: Sistema de autenticação
- `api`: Endpoints e rotas da API
- `domain`: Entidades e regras de negócio
- `infrastructure`: Camada de infraestrutura
- `presentation`: Camada de apresentação
- `shared`: Utilitários compartilhados
- `agents`: Agentes de desenvolvimento
- `docs`: Documentação
- `config`: Configurações do projeto

## Regras Obrigatórias

### ✅ Obrigatório

- **Sempre usar convenção de commits**
- **Sempre escrever mensagens em português**
- **Sempre fazer um comentário por ação**
- **Sempre fazer um commit por funcionalidade**
- **Sempre especificar arquivos individualmente no `git add`**

### ❌ Proibido

- **NUNCA usar `git add .`**
- **NUNCA usar `git push`** (apenas quando solicitado explicitamente)
- **NUNCA misturar funcionalidades em um único commit**
- **NUNCA usar mensagens genéricas como "fix" ou "update"**

## Exemplos Práticos

### ✅ Bons Exemplos

```bash
# Nova funcionalidade
git commit -m "feat(auth): adiciona sistema de login com JWT"

# Correção de bug
git commit -m "fix(api): corrige validação de email no cadastro"

# Documentação
git commit -m "docs(api): adiciona documentação dos endpoints"

# Refatoração
git commit -m "refactor(domain): melhora estrutura da entidade User"

# Testes
git commit -m "test(auth): adiciona testes unitários para AuthService"

# Configuração
git commit -m "chore(config): atualiza configurações do TypeScript"

# Performance
git commit -m "perf(database): otimiza consultas de check-ins"

# CI/CD
git commit -m "ci(github): adiciona workflow de deploy automático"

# Build
git commit -m "build(tsup): atualiza configuração de bundling"
```

### ❌ Maus Exemplos

```bash
# Muito genérico
git commit -m "fix"

# Em inglês (proibido)
git commit -m "feat: add user authentication"

# Múltiplas funcionalidades
git commit -m "feat: adiciona auth e corrige bug na API"

# Usando git add .
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

## Fluxo de Trabalho

1. **Analisar as mudanças realizadas**
2. **Identificar o tipo de commit** (feat, fix, docs, style, refactor, test, chore)
3. **Definir escopo quando relevante**
4. **Escrever descrição clara em português**
5. **Executar git add com arquivos específicos**
6. **Fazer commit com mensagem formatada**
7. **Explicar o que foi commitado**

## Benefícios

- **Histórico limpo**: Facilita a navegação no histórico do projeto
- **Rastreabilidade**: Permite identificar rapidamente o que foi alterado
- **Colaboração**: Facilita o trabalho em equipe
- **Automação**: Permite automação de releases e changelogs
- **Debugging**: Facilita a identificação de problemas

## Ferramentas de Apoio

Este projeto utiliza o **Agente Commits** (`agents/commits.md`) que automatiza e valida o processo de commits seguindo estas regras.

## Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
