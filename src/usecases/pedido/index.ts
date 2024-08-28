import { Transacao } from "../../entities";
import { PagamentoStatus } from "../../entities/pagamentoStatus";
import { Pedido } from "../../entities/pedido";
import { Status } from "../../entities/status";
import { PedidoGateway, TransacaoGateway } from "../../gateways";
import { PedidoProdutos } from "../../types/pedido-produtos";

export class PedidoUseCase {

    constructor(
        private readonly pedidoGateway: PedidoGateway,
        private readonly transacaoGateway: TransacaoGateway
    ) { }

    async buscarPedidos(): Promise<PedidoProdutos[]> {
        return this.pedidoGateway.buscarPedidos()
    }

    async criar({ cliente, produtos, total, status, senha }: Omit<Pedido, "id" | "transacao">): Promise<Pedido> {
        return this.pedidoGateway.criar({
            cliente,
            produtos,
            total,
            status,
            senha,
            transacao: null
        })
    }

    async atualizarStatusPedido(params: { id: string, status: Status }): Promise<PedidoProdutos | null> {
        const pedido = await this.pedidoGateway.buscarPedido(params.id)
        if (!pedido) {
            throw new Error('Pedido não encontrado')
        }

        return this.pedidoGateway.editar({ id: params.id, value: { status: params.status } })
    }

    async adicionarTransacao(params: { id: string, transacao: Transacao }): Promise<PedidoProdutos | null> {
        const pedido = await this.pedidoGateway.buscarPedido(params.id)
        if (!pedido) {
            throw new Error('Pedido não encontrado')
        }

        return this.pedidoGateway.editar({ id: params.id, value: { transacao: params.transacao } })
    }

    async statusPagamento(id: string): Promise<PagamentoStatus | null> {
        const pedido = await this.pedidoGateway.buscarPedido(id)
        if (!pedido) {
            throw new Error('Pedido não encontrado')
        }
        const transacao = await this.transacaoGateway.buscarTransacaoPorPedidoId(id)

        return transacao?.pagamentoStatus || null
    }
}
