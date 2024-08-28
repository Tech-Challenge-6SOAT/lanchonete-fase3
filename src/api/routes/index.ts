import { FastifyInstance } from "fastify";
import { clienteRoutes } from "./cliente";
import { pedidoRoutes } from "./pedido";
import { produtoRoutes } from './produto'
import { webhookRoutes } from "./webhook";

const apiRoutes = async (app: FastifyInstance) => {
  app.register(clienteRoutes);
  app.register(pedidoRoutes);
  app.register(produtoRoutes)
  app.register(webhookRoutes)

  app.get("/", async () => {
    return {
      message: "API IS ON FIRE!",
    };
  });
};

export default apiRoutes;
