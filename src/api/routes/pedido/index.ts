import { FastifyInstance } from "fastify";
import { PedidoController } from "../../../controllers/pedido";
import { ClienteGateway, PagamentoGateway, PedidoGateway, ProdutoGateway, TransacaoGateway } from "../../../gateways";
import { PedidoDbConnection, ProdutoDbConnection, ClienteDbConnection, TransacaoDbConnection } from "../../../external/database/mongodb/db-connections";
import { CheckoutUseCase, PagamentoUseCase, PedidoUseCase } from "../../../usecases";
import { PlataformaPagamentoFake } from "../../../external/pagamento/plataformaPagamentoFake";
import { atualizarStatusPedidoSchema, buscarPedidosSchema, checkoutSchema, statusPagamentoSchema } from "./schema";
import { validatorCompiler } from '../../validators/ajv'

export const pedidoRoutes = async (app: FastifyInstance) => {
  
  const clienteDbConnection = new ClienteDbConnection()
  const pedidoDbConnection = new PedidoDbConnection()
  const produtoDbConnection = new ProdutoDbConnection()
  const transacaoDbConnection = new TransacaoDbConnection()
  const clienteGateway = new ClienteGateway(clienteDbConnection)
  const pedidoGateway = new PedidoGateway(pedidoDbConnection)
  const produtoGateway = new ProdutoGateway(produtoDbConnection)
  const transacaoGateway = new TransacaoGateway(transacaoDbConnection)
  const plataformaPagamentoFake = new PlataformaPagamentoFake()
  const pagamentoGateway = new PagamentoGateway(plataformaPagamentoFake)
  const pagamentoUseCase = new PagamentoUseCase(transacaoGateway, pagamentoGateway)
  const pedidoUseCase = new PedidoUseCase(pedidoGateway, transacaoGateway)
  const checkoutUseCase = new CheckoutUseCase(pagamentoUseCase, pedidoUseCase, produtoGateway, clienteGateway)
  const pedidoController = new PedidoController(pedidoUseCase, checkoutUseCase)

  app.get('/pedidos', {
    schema: buscarPedidosSchema,
    validatorCompiler
  }, async function (request, reply) {
    const response = await pedidoController.buscarPedidos(request)
    return reply.status(response.statusCode).send(response.data)
  })

  app.get('/pedido/:id/status-pagamento', {
    schema: statusPagamentoSchema,
    validatorCompiler
  }, async function (request, reply) {
    const response = await pedidoController.statusPagamento(request)
    return reply.status(response.statusCode).send(response.data)
  })

  app.patch('/pedido/:id/status', {
    schema: atualizarStatusPedidoSchema,
    validatorCompiler
  }, async function (request, reply) {
    const response = await pedidoController.atualizarStatusPedido(request)
    return reply.status(response.statusCode).send(response.data)
  })

  app.post('/pedido/checkout', {
    schema: checkoutSchema,
    validatorCompiler
  }, async function (request, reply) {
    const response = await pedidoController.checkout(request)
    return reply.status(response.statusCode).send(response.data)
  })
}
