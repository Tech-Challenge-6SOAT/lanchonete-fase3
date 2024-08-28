import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { CheckoutUseCase } from "../../usecases/checkout";
import { PedidoUseCase } from "../../usecases/pedido";

export class PedidoController {
  constructor(
    private readonly pedidoUseCase: PedidoUseCase,
    private readonly checkoutUseCase: CheckoutUseCase
  ) { }

  async buscarPedidos(request: HttpRequest): Promise<HttpResponse> {
    try {
      const pedidos = await this.pedidoUseCase.buscarPedidos();

      return {
        data: pedidos,
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

  async atualizarStatusPedido(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      const { status } = request.body;

      const pedido = await this.pedidoUseCase.atualizarStatusPedido({
        id,
        status,
      });

      return {
        data: {
            status: pedido?.status,
            senha: pedido?.senha,
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

  async statusPagamento(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      const statusPagamento = await this.pedidoUseCase.statusPagamento(id);

      return {
        data: {
          statusPagamento,
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

  async checkout(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { produtos, cpf } = request.body;

      const data = await this.checkoutUseCase.checkout({ produtos, cpf });

      return {
        data,
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
}
