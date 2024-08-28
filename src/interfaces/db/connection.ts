export interface DbConnection {
  buscar<T = any>(params: Object): Promise<T[]>
  buscarUm<T = any>(params: Object): Promise<T | null>
  criar<T = any>(params: Object): Promise<T>
  excluir(id: string): Promise<void>
  buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]>
  editar<T = any>(params: Object): Promise<T | null>
}

