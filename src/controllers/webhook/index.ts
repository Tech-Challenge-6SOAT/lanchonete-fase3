import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { PagamentoUseCase } from "../../usecases";

export class WebhookController {
  constructor(
    private readonly pagamentoUseCase: PagamentoUseCase
  ) { }

  async atualizarStatusPagamento(request: HttpRequest): Promise<HttpResponse> {
    try {
      await this.pagamentoUseCase.atualizarStatusPagamento(request.body);

      return {
        data: {
          message: "Status do pagamento atualizado com sucesso!",
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
}
