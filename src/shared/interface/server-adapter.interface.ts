/**
 * Interface para adapters de servidor web
 * Segue o princípio de Inversão de Dependência (SOLID)
 */
export interface IServerAdapter {
  /**
   * Inicia o servidor na porta e host especificados
   * @param port - Porta do servidor
   * @param host - Host do servidor
   * @returns Promise que resolve quando o servidor estiver rodando
   */
  start(port: number, host: string): Promise<void>;

  /**
   * Para o servidor
   * @returns Promise que resolve quando o servidor for parado
   */
  stop(): Promise<void>;

  /**
   * Verifica se o servidor está rodando
   * @returns true se estiver rodando, false caso contrário
   */
  isRunning(): boolean;

  /**
   * Obtém a instância do servidor (para configurações específicas)
   * @returns Instância do servidor
   */
  getInstance(): any;
}
