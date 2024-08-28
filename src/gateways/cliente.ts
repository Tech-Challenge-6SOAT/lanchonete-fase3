import { Cliente } from "../entities/cliente";
import { DbConnection } from "../interfaces/db/connection";
import { IClienteGateway } from "../interfaces/gateways/cliente";
import { CPF } from "../value-objects/cpf";
import { Email } from "../value-objects/email";

export class ClienteGateway implements IClienteGateway {
  constructor (
    private readonly dbConnection: DbConnection
  ) {}

  async criarCliente(cliente: Omit<Cliente, "id">): Promise<Cliente> {
    const createdCliente = await this.dbConnection.criar<{ _id: string }>({
      nome: cliente.nome,
      email: cliente.email?.getValue(),
      cpf: cliente.cpf?.getValue(),
    })
    return new Cliente(
      createdCliente._id,
      cliente.nome,
      cliente.email,
      cliente.cpf
    )
  }

  async buscarCliente(busca: { cpf?: CPF, email?: Email }): Promise<Cliente | null> {
    if (!busca.cpf && !busca.email) {
      throw new Error('CPF ou Email devem ser fornecidos')
    }

    if (busca.cpf) {
      const cliente = await this._buscaHelper({ cpf: busca.cpf.getValue() })
      return cliente
    }

    const cliente = await this._buscaHelper({ email: busca.email?.getValue() })
    return cliente
  }

  private async _buscaHelper (busca: Object): Promise<Cliente | null> {
    const cliente = await this.dbConnection.buscarUm<{
      _id: string,
      nome: string,
      email: string,
      cpf: string,
    }>(busca)

    if (!cliente) {
      return null
    }

    return new Cliente(
      cliente._id,
      cliente.nome,
      cliente.email ? new Email(cliente.email) : undefined,
      cliente.cpf ? new CPF(cliente.cpf) : undefined,
    )
  }
}
