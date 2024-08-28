import Fastify from 'fastify'
import dotenv from 'dotenv'
import routes from './routes'
import { Logger } from '../external/logs/logger'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export class App {
  static async start() {
    dotenv.config()
    const app = Fastify()
    await app.register(swagger, {
      swagger: {
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        }
      }
    })
    await app.register(swaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      uiHooks: {
        onRequest: function (_request, _reply, next) { next() },
        preHandler: function (_request, _reply, next) { next() }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, _request, _reply) => { return swaggerObject },
      transformSpecificationClone: true,
    })
    await app.register(routes)
    await app.ready()
    await app.listen({
      port: 3000,
      host: '0.0.0.0'
    })
    Logger.info('API IS RUNNING')
  }
}
