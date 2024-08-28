import { Transacao } from "../../entities/transacao";

export interface ITransacaoGateway {
	criar(transacao: Omit<Transacao, "id">): Promise<Transacao>;
	editar(params: object): Promise<Transacao | null>;
	buscarTransacaoPorPedidoId(pedidoId: string): Promise<Transacao | null>
}
