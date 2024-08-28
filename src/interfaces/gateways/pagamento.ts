import { PagamentoStatus, Pedido } from "../../entities";

export interface IPagamentoGateway {
	gerarPagamento(pedido: Pedido): Promise<object>;
	converterMensagemWebhook(mensagem: object): { idTransacaoExterna: string, pagamentoStatus: PagamentoStatus };
}
