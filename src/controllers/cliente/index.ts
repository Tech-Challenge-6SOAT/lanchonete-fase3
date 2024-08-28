import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { ClienteUseCase } from "../../usecases/cliente";

export class ClienteController {
  constructor (
    private readonly clienteUseCase: ClienteUseCase
  ) {}

  async criar (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { cpf, nome, email } = request.body

      if (!cpf && !email) {
        return {
          data: {
            err: 'CPF ou Email são obrigatórios!'
          },
          statusCode: 400
        }
      }

      const cliente = await this.clienteUseCase.criar({
        nome,
        email,
        cpf
      })

      return {
        data: {
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf?.getValue(),
          email: cliente.email?.getValue()
        },
        statusCode: 201
      }
    } catch (err: any) {
      return {
        data: {
          err: err?.message
        },
        statusCode: 500
      }
    }
  }

  async getCliente (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { cpf, email } = request.query

      if (!cpf && !email) {
        return {
          data: {
            message: 'Cpf ou Email são obrigatórios!'
          },
          statusCode: 400
        }
      }

      const cliente = await this.clienteUseCase.getCliente({
        cpf,
        email
      })

      if (!cliente) {
        return {
          data: {
            message: 'Cliente não encontrado!'
          },
          statusCode: 404
        }
      }

      return {
        data: {
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf?.getValue(),
          email: cliente.email?.getValue()
        },
        statusCode: 200
      }
    } catch (err: any) {
      return {
        data: {
          message: err?.message
        },
        statusCode: 500
      }
    }
  }
}

