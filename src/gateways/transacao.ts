import { Transacao } from "../entities/transacao";
import { DbConnection } from "../interfaces/db/connection";
import { ITransacaoGateway } from "../interfaces/gateways/transacao";


export class TransacaoGateway implements ITransacaoGateway {
	constructor(
		private readonly dbConnection: DbConnection
	) { }

	async criar(transacao: Omit<Transacao, "id" | "data">): Promise<Transacao> {
		const transacaoCriada = await this.dbConnection.criar<{ _id: string, createdAt: Date }>(
			{ ...transacao, pagamentoStatus: transacao.pagamentoStatus.status }
		);
		return new Transacao(
			transacaoCriada._id,
			transacao.pedido,
			transacao.valor,
			transacao.pagamentoStatus,
			transacaoCriada.createdAt,
			transacao.idTransacaoExterna
		)
	}

	async editar(params: { id: string; value: object }): Promise<Transacao | null> {
		const transacaoAtualizada = await this.dbConnection.editar<Transacao>(params);
		if (!transacaoAtualizada) return null;
		return new Transacao(
			transacaoAtualizada.id,
			transacaoAtualizada.pedido,
			transacaoAtualizada.valor,
			transacaoAtualizada.pagamentoStatus,
			transacaoAtualizada.data,
			transacaoAtualizada.idTransacaoExterna,
		);
	}

	async buscarTransacaoPorPedidoId(pedidoId: string): Promise<Transacao | null> {
		const transacao = await this.dbConnection.buscarUm<Transacao>({ pedido: pedidoId });
		if (!transacao) return null;
		return new Transacao(
			transacao.id,
			transacao.pedido,
			transacao.valor,
			transacao.pagamentoStatus,
			transacao.data,
			transacao.idTransacaoExterna,
		);
	}

	async buscarPorIdTransacaoExterna(idTransacaoExterna: string): Promise<Transacao | null> {
		const transacao = await this.dbConnection.buscarUm<Transacao>({ idTransacaoExterna: idTransacaoExterna });
		if (!transacao) return null;
		return new Transacao(
			transacao.id,
			transacao.pedido,
			transacao.valor,
			transacao.pagamentoStatus,
			transacao.data,
			transacao.idTransacaoExterna,
		);
	}
}
