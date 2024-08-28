import { FastifyInstance } from "fastify";
import { ClienteController } from "../../../controllers/cliente";
import { ClienteGateway } from "../../../gateways/cliente";
import { ClienteDbConnection } from "../../../external/database/mongodb/db-connections";
import { ClienteUseCase } from "../../../usecases/cliente";
import { getClienteSchema, createClienteSchema } from "./schemas";
import { validatorCompiler } from '../../validators/ajv'

export const clienteRoutes = async (app: FastifyInstance) => {
  const clienteDbConnection = new ClienteDbConnection()
  const clienteGateway = new ClienteGateway(clienteDbConnection)
  const clienteUseCase = new ClienteUseCase(clienteGateway)
  const clienteController = new ClienteController(clienteUseCase)

  app.post('/cliente', {
    schema: createClienteSchema,
    validatorCompiler
  }, async function (request, reply) {
    const response = await clienteController.criar(request)
    return reply.status(response.statusCode).send(response.data)
  })

  app.get('/cliente', {
    schema: getClienteSchema,
    validatorCompiler
  }, async function (request, reply) {
    const response = await clienteController.getCliente(request)
    return reply.status(response.statusCode).send(response.data)
  })
}
