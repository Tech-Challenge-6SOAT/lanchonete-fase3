import { Cliente } from "../../entities/cliente";
import { ClienteGateway } from "../../gateways/cliente";
import { CPF } from "../../value-objects/cpf";
import { Email } from "../../value-objects/email";

export class ClienteUseCase {
  constructor (
    private readonly clienteGateway: ClienteGateway
  ) {}

  async criar (params: Omit<Cliente, "id">): Promise<Cliente> {
    const validParams = {
      cpf: params.cpf,
      email: params.email,
      nome: params.nome
    }

    if (params.cpf) {
      validParams.cpf = new CPF(String(params.cpf))
    }

    if (params.email) {
      validParams.email = new Email(String(params.email))
    }

    const cliente = await this.clienteGateway.buscarCliente(validParams)
    if (cliente) {
      return cliente
    }

    const createdCliente = await this.clienteGateway.criarCliente(validParams)
    return createdCliente
  }

  async getCliente (params: { cpf: string, email: string }) {
    const validParams: { cpf?: CPF, email?: Email } = {}

    if (params.cpf) {
      validParams.cpf = new CPF(String(params.cpf))
    }

    if (params.email) {
      validParams.email = new Email(String(params.email))
    }

    return this.clienteGateway.buscarCliente({
      email: validParams.email,
      cpf: validParams.cpf
    })
  }
}
