import { FastifyInstance } from "fastify";
import { PagamentoGateway, TransacaoGateway } from "../../../gateways";
import { TransacaoDbConnection } from "../../../external/database/mongodb/db-connections";
import { PagamentoUseCase } from "../../../usecases";
import { PlataformaPagamentoFake } from "../../../external/pagamento/plataformaPagamentoFake";
import { WebhookController } from "../../../controllers/webhook";
import { atualizarStatusPagamentoSchema } from "./schema";
import { validatorCompiler } from "../../validators/ajv";

export const webhookRoutes = async (app: FastifyInstance) => {
  const transacaoDbConnection = new TransacaoDbConnection();
  const transacaoGateway = new TransacaoGateway(transacaoDbConnection);
  const plataformaPagamentoFake = new PlataformaPagamentoFake();
  const pagamentoGateway = new PagamentoGateway(plataformaPagamentoFake);
  const pagamentoUseCase = new PagamentoUseCase(
    transacaoGateway,
    pagamentoGateway
  );
  const webhookController = new WebhookController(pagamentoUseCase);

  app.post(
    "/webhook/pagamento",
    {
      schema: atualizarStatusPagamentoSchema,
      validatorCompiler,
    },
    async function (request, reply) {
      const response = await webhookController.atualizarStatusPagamento(
        request
      );
      return reply.status(response.statusCode).send(response.data);
    }
  );
};
