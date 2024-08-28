import { Cliente } from "../../entities/cliente"
import { CPF } from "../../value-objects/cpf"
import { Email } from "../../value-objects/email"

export interface IClienteGateway {
  buscarCliente(busca: { cpf?: CPF, email?: Email }): Promise<Cliente | null>
  criarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente>
}
