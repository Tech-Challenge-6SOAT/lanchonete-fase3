import { Produto } from "../../entities";
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { ProdutoUseCase } from "../../usecases/produto";

export class ProdutoController {
  constructor(private readonly produtoUseCase: ProdutoUseCase) {}

  async buscarProdutoPorId(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      if (!id) {
        return {
          data: {
            err: "ID do produto é obrigatório!",
          },
          statusCode: 400,
        };
      }

      const produto = await this.produtoUseCase.buscarProdutoPorId({
        id,
      });

      if (!produto) {
        return {
          data: {
            message: "Produto não encontrado",
          },
          statusCode: 404,
        };
      }

      return {
        data: {
          id: produto.id,
          nome: produto.nome,
          categoria: produto.categoria.categoria,
          preco: produto.preco,
        },
        statusCode: 200,
      };
    } catch (err: any) {
      return {
        data: {
          err: err?.message,
        },
        statusCode: 500,
      };
    }
  }

  async buscarProdutoPorCategoria(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoria } = request.query;

      if (!categoria) {
        return {
          data: {
            err: "Categoria do produto é obrigatório!",
          },
          statusCode: 400,
        };
      }

      const produtos = await this.produtoUseCase.buscarProdutoPorCategoria({
        categoria,
      });
      return {
        data: produtos.map(produto => ({
          id: produto.id,
          categoria: produto.categoria.categoria,
          nome: produto.nome,
          preco: produto.preco,
          descricao: produto.descricao
        })),
        statusCode: 200,
      };
    } catch (err: any) {
      return {
        data: {
          err: err?.message,
        },
        statusCode: 500,
      };
    }
  }

  async criar(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoria, nome, preco, descricao } = request.body;

      if (!categoria || !nome || !preco || !descricao) {
        return {
          data: {
            err: "Categoria, nome, preco e descricao são obrigatórios!",
          },
          statusCode: 400,
        };
      }

      const produto = await this.produtoUseCase.criar({
        nome,
        categoria,
        preco,
        descricao,
      });

      return {
        data: {
          id: produto.id,
          nome: produto.nome,
          categoria: produto.categoria,
          preco: produto.preco,
          descricao: produto.descricao
        },
        statusCode: 201,
      };
    } catch (err: any) {
      return {
        data: {
          err: err?.message,
        },
        statusCode: 500,
      };
    }
  }

  async excluir(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.body;

      if (!id) {
        return {
          data: {
            err: "ID do produto é obrigatório!",
          },
          statusCode: 400,
        };
      }

      await this.produtoUseCase.excluir({
        id,
      });

      return {
        data: {
          message: "Produto excluído com sucesso!",
        },
        statusCode: 204,
      };
    } catch (err: any) {
      return {
        data: {
          err: err?.message,
        },
        statusCode: 500,
      };
    }
  }

  async editar(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoria, nome, preco, descricao } = request.body
      const { id } = request.params

      const newProduto = new Produto(
        id,
        categoria,
        nome,
        preco,
        descricao
      )

      await this.produtoUseCase.editar(newProduto)

      return {
        data: {
          id,
          categoria,
          nome,
          preco,
          descricao
        },
        statusCode: 200
      }
    } catch (err: any) {
      return {
        data: {
          err: err?.message
        },
        statusCode: 500
      }
    }
  }
}
