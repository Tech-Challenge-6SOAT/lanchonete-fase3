import { PagamentoStatus, PagamentoStatusEnum, Pedido } from "../entities";
import { IPagamentoGateway } from "../interfaces/gateways/pagamento";
import { IPlataformaPagamento } from "../interfaces/plataformaPagamento";

export class PagamentoGateway implements IPagamentoGateway {
  constructor(private readonly plataformaPagamento: IPlataformaPagamento) { }

  async gerarPagamento(pedido: Pedido): Promise<{ idTransacaoExterna: string, qrCode: string }> {
    return this.plataformaPagamento.executarTransacao(pedido);
  }

  converterMensagemWebhook(mensagem: object): { idTransacaoExterna: string, pagamentoStatus: PagamentoStatus } {
    const { idTransacaoExterna, pagamentoStatus } = this.plataformaPagamento.converterMensagemWebhook(mensagem);
    return { idTransacaoExterna, pagamentoStatus: new PagamentoStatus(pagamentoStatus as PagamentoStatusEnum) };
  }
}
