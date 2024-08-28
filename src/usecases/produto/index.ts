import { Categoria } from "../../entities/categoria";
import { Produto } from "../../entities/produto";
import { ProdutoGateway } from "../../gateways/produto";

export class ProdutoUseCase {
  constructor(private readonly produtoGateway: ProdutoGateway) {}

  async buscarProdutoPorId(params: { id: string }): Promise<Produto | null> {
    const produto = await this.produtoGateway.buscarProdutoPorId(params.id);

    return produto;
  }

  async buscarProdutoPorCategoria(params: {
    categoria: Categoria;
  }): Promise<Produto[]> {
    const listaProdutos = await this.produtoGateway.buscarProdutosPorCategoria(
      params.categoria
    );

    return listaProdutos;
  }

  async criar(params: Omit<Produto, "id">): Promise<Produto> {
    const validParams = {
      categoria: params.categoria,
      nome: params.nome,
      preco: params.preco,
      descricao: params.descricao,
    };

    const createdProduto = await this.produtoGateway.criar(validParams);

    return createdProduto;
  }

  async excluir(params: { id: string }): Promise<void> {
    await this.produtoGateway.excluir(params.id);
  }

  async editar(params: Produto) {
    return this.produtoGateway.editar(params)
  }
}
