import { Pedido } from "../../entities/pedido"
import { PedidoProdutos } from "../../types/pedido-produtos"

export interface IPedidoGateway {
  buscarPedidos(): Promise<PedidoProdutos[]>
  buscarPedido(id: string): Promise<PedidoProdutos | null>
  criar (pedido: Omit<Pedido, 'id'>): Promise<Pedido>
  editar (params: object): Promise<Pedido | null>
}
