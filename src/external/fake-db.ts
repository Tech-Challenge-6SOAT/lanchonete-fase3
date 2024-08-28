import { DbConnection } from "../interfaces/db/connection";

export class FakeDb implements DbConnection {
  async criar<T = any>(params: Object): Promise<T> {
    return {
      _id: 'any id',
      ...params
    } as T
  }

  async buscar<T = any>(params: Object): Promise<T[]> {
    return []
  }

  async excluir(id: string): Promise<void> {}

  async buscarUm<T = any>(params: Object): Promise<T | null> {
    return null
  }

  async buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]> {
      return []
  }

  async editar<T = any>(params: Object): Promise<T | null> {
    return {
      _id: 'any id',
      ...params
    } as T
  }
}
