import { PrismaClient } from '@prisma/client';

// Cache para armazenar informações sobre quais modelos têm updateCount
const modelUpdateCountCache = new Map<string, boolean>();

// Cache para armazenar informações sobre colunas existentes
const columnExistsCache = new Map<string, boolean>();

// Função para verificar se o modelo tem o campo updateCount via introspecção do banco
async function checkModelHasUpdateCount(
  modelName: string,
  prisma: PrismaClient,
): Promise<boolean> {
  // Verifica cache primeiro
  if (modelUpdateCountCache.has(modelName)) {
    return modelUpdateCountCache.get(modelName)!;
  }

  try {
    // Converte o nome do modelo para o nome da tabela (snake_case)
    const tableName = modelNameToTableName(modelName);

    // Verifica se a coluna updateCount existe na tabela
    const hasUpdateCount = await checkColumnExists(
      prisma,
      tableName,
      'updateCount',
    );

    // Armazena no cache
    modelUpdateCountCache.set(modelName, hasUpdateCount);

    return hasUpdateCount;
  } catch (error) {
    console.warn(
      `Erro ao verificar campo updateCount para modelo ${modelName}:`,
      error,
    );
    // Em caso de erro, assume que não tem o campo
    modelUpdateCountCache.set(modelName, false);
    return false;
  }
}

// Função para converter nome do modelo para nome da tabela
function modelNameToTableName(modelName: string): string {
  // Converte de PascalCase para snake_case
  return modelName
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

// Função para verificar se uma coluna existe em uma tabela
async function checkColumnExists(
  prisma: PrismaClient,
  tableName: string,
  columnName: string,
): Promise<boolean> {
  // Cria uma chave única para o cache (tabela + coluna)
  const cacheKey = `${tableName}.${columnName}`;

  // Verifica cache primeiro
  if (columnExistsCache.has(cacheKey)) {
    return columnExistsCache.get(cacheKey)!;
  }

  try {
    // Query para verificar se a coluna existe
    const result = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = ${tableName} 
      AND column_name = ${columnName}
      AND table_schema = 'public'
    `;

    const columnExists = result.length > 0;

    // Armazena no cache
    columnExistsCache.set(cacheKey, columnExists);

    return columnExists;
  } catch (error) {
    console.warn(
      `Erro ao verificar coluna ${columnName} na tabela ${tableName}:`,
      error,
    );
    // Em caso de erro, assume que a coluna não existe e armazena no cache
    columnExistsCache.set(cacheKey, false);
    return false;
  }
}

// Cria o PrismaClient base
const basePrisma = new PrismaClient();

// Cria o PrismaClient estendido com middleware
const prisma = basePrisma.$extends({
  query: {
    // Middleware para operações de update
    $allModels: {
      async update({ model, args, query }) {
        // Verifica se o modelo tem o campo updateCount
        if (await checkModelHasUpdateCount(model, basePrisma)) {
          // Inicializa args.data se não existir
          if (!args.data) {
            args.data = {};
          }

          // Adiciona incremento do updateCount
          args.data.updateCount = {
            increment: 1,
          };
        }

        return query(args);
      },
      async updateMany({ model, args, query }) {
        // Verifica se o modelo tem o campo updateCount
        if (await checkModelHasUpdateCount(model, basePrisma)) {
          // Inicializa args.data se não existir
          if (!args.data) {
            args.data = {};
          }

          // Adiciona incremento do updateCount
          args.data.updateCount = {
            increment: 1,
          };
        }

        return query(args);
      },
    },
  },
});

// Função para limpar cache (útil para testes ou reinicialização)
export function clearModelCache(): void {
  modelUpdateCountCache.clear();
}

// Função para limpar cache de colunas
export function clearColumnCache(): void {
  columnExistsCache.clear();
}

// Função para limpar todos os caches
export function clearAllCaches(): void {
  modelUpdateCountCache.clear();
  columnExistsCache.clear();
}

// Função para adicionar manualmente um modelo ao cache
export function addModelToUpdateCountCache(
  modelName: string,
  hasUpdateCount: boolean,
): void {
  modelUpdateCountCache.set(modelName, hasUpdateCount);
}

// Função para adicionar manualmente uma coluna ao cache
export function addColumnToCache(
  tableName: string,
  columnName: string,
  exists: boolean,
): void {
  const cacheKey = `${tableName}.${columnName}`;
  columnExistsCache.set(cacheKey, exists);
}

// Função para obter informações do cache de modelos
export function getModelCacheInfo(): Record<string, boolean> {
  return Object.fromEntries(modelUpdateCountCache);
}

// Função para obter informações do cache de colunas
export function getColumnCacheInfo(): Record<string, boolean> {
  return Object.fromEntries(columnExistsCache);
}

// Função para obter informações de todos os caches
export function getAllCacheInfo(): {
  models: Record<string, boolean>;
  columns: Record<string, boolean>;
} {
  return {
    models: getModelCacheInfo(),
    columns: getColumnCacheInfo(),
  };
}

// Função para verificar manualmente se um modelo tem updateCount
export async function checkModelUpdateCount(
  modelName: string,
): Promise<boolean> {
  return checkModelHasUpdateCount(modelName, basePrisma);
}

export default prisma;
