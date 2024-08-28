import { Pedido } from "../../entities";

export interface IPlataformaPagamento {
	executarTransacao(pedido: Pedido): Promise<{ idTransacaoExterna: string, qrCode: string }>;
	converterMensagemWebhook(mensagem: object): { idTransacaoExterna: string, pagamentoStatus: string };
}
