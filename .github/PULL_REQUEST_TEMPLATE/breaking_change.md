---
name: 💥 Breaking Change PR
about: Template para Pull Requests com mudanças que quebram compatibilidade
title: '[BREAKING] '
---

# 💥 Pull Request - Breaking Change

## ⚠️ Aviso de Breaking Change

Este PR contém mudanças que **quebram a compatibilidade** com versões anteriores.

## 📋 Descrição

Descreva detalhadamente as mudanças que quebram compatibilidade e o motivo.

## 🔗 Issue Relacionada

- Closes #(número da issue)
- Relates to #(número da issue)

## 💥 Mudanças que Quebram Compatibilidade

### APIs Removidas/Alteradas
- [ ] Endpoint removido: `GET /api/v1/endpoint`
- [ ] Parâmetro alterado: `POST /api/v1/endpoint` - campo `oldField` → `newField`
- [ ] Resposta alterada: `GET /api/v1/data` agora retorna objeto em vez de array

### Configurações Alteradas
- [ ] Variável de ambiente: `OLD_CONFIG` → `NEW_CONFIG`
- [ ] Arquivo de configuração: estrutura alterada
- [ ] Dependência removida: `package-name`

### Comportamento Alterado
- [ ] Função `functionName()` agora requer parâmetro adicional
- [ ] Classe `ClassName` métodos alterados
- [ ] Enum `EnumName` valores alterados

## 🔄 Guia de Migração

### Para Desenvolvedores
```typescript
// Antes
const result = await api.getData();

// Depois
const result = await api.getData({ includeMetadata: true });
```

### Para Usuários
1. Atualize suas configurações:
   ```bash
   # Antes
   export OLD_CONFIG=value
   
   # Depois
   export NEW_CONFIG=value
   ```

2. Atualize seu código:
   - [ ] Substitua `oldFunction()` por `newFunction()`
   - [ ] Adicione parâmetros obrigatórios
   - [ ] Atualize tratamento de resposta

## 📅 Timeline de Deploy

- [ ] **Versão**: `v2.0.0` (major version bump)
- [ ] **Data de Release**: DD/MM/YYYY
- [ ] **Período de Transição**: X dias para migração
- [ ] **Suporte à Versão Anterior**: Até DD/MM/YYYY

## 🚨 Impacto Estimado

- [ ] **Alto**: Requer mudanças significativas no código dos usuários
- [ ] **Médio**: Requer ajustes menores mas necessários
- [ ] **Baixo**: Mudanças simples de implementar

## 📚 Documentação de Migração

- [ ] Guia de migração criado em `/docs/migration/v2.0.0.md`
- [ ] CHANGELOG atualizado
- [ ] Documentação da API atualizada
- [ ] Exemplos de código atualizados

## 🧪 Testes de Compatibilidade

- [ ] Testes com versão anterior executados
- [ ] Testes de migração automatizados
- [ ] Testes de rollback validados

## 📢 Comunicação

- [ ] Issue de aviso criada com antecedência
- [ ] Discussão com a comunidade realizada
- [ ] Notas de release preparadas
- [ ] Comunicação para usuários ativos

## ✅ Checklist Final

- [ ] Todas as mudanças breaking estão documentadas
- [ ] Guia de migração está completo
- [ ] Testes cobrem cenários de migração
- [ ] Documentação está atualizada
- [ ] Comunicação foi feita adequadamente

---

**⚠️ IMPORTANTE**: Este PR deve ser revisado com atenção especial devido ao impacto em usuários existentes.
