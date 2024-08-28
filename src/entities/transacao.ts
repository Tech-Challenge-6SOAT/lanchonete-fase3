import { PagamentoStatus } from "./pagamentoStatus";
import { Pedido } from "./pedido";

export class Transacao {
	constructor(
		private readonly _id: string,
		private readonly _pedido: Pedido,
		private readonly _valor: number,
		private readonly _pagamentoStatus: PagamentoStatus,
		private readonly _data: Date,
		private readonly _idTransacaoExterna: string,
	) { }

	get id(): string {
		return this._id
	}

	get pedido(): Pedido {
		return this._pedido
	}

	get valor(): number {
		return this._valor
	}

	get pagamentoStatus(): PagamentoStatus {
		return this._pagamentoStatus
	}

	get data(): Date {
		return this._data
	}

	get idTransacaoExterna(): string {
		return this._idTransacaoExterna
	}
}
