export type PagamentoStatusEnum = 'Aprovado' | 'Recusado' | 'Pendente'

export class PagamentoStatus {
  constructor (
    private readonly _status: PagamentoStatusEnum
  ) {}

  get status(): PagamentoStatusEnum {
    return this._status
  }
}
