import { PagamentoStatus, Pedido, Transacao } from "../../entities";
import { TransacaoGateway, PagamentoGateway } from "../../gateways";

export class PagamentoUseCase {

    constructor(
        private readonly transacaoGateway: TransacaoGateway,
        private readonly pagamentoGateway: PagamentoGateway
    ) { }

    async gerarPagamento(pedido: Pedido): Promise<{ transacao: Transacao, qrcode: string }> {
        const output = await this.pagamentoGateway.gerarPagamento(pedido);
        const transacao = await this.transacaoGateway.criar({
            pedido: pedido,
            valor: pedido.total,
            pagamentoStatus: new PagamentoStatus('Pendente'),
            idTransacaoExterna: output.idTransacaoExterna
        });

        return { transacao, qrcode: output.qrCode };
    }

    async atualizarStatusPagamento(body: object): Promise<void> {
        const { idTransacaoExterna, pagamentoStatus } = this.pagamentoGateway.converterMensagemWebhook(body);
        const transacao = await this.transacaoGateway.buscarPorIdTransacaoExterna(idTransacaoExterna);
        if (!transacao) throw new Error('Transação não encontrada');
        await this.transacaoGateway.editar({ id: transacao.id, value: { pagamentoStatus: pagamentoStatus.status } });
    }
}
