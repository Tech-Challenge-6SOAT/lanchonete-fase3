import { Categoria } from "../../entities/categoria"
import { Produto } from "../../entities/produto"

export interface IProdutoGateway {
  buscarProdutosPorCategoria(categoria: Categoria): Promise<Produto[]>
  buscarProdutoPorId(id: string): Promise<Produto | null>
  criar(produto: Omit<Produto, 'id'>): Promise<Produto>
  excluir(id: string): Promise<void>
  editar(produto: Produto): Promise<Produto>
}

