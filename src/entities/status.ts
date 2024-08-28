type StatusEnum = 'Recebido' | 'Em preparação' | 'Pronto' | 'Finalizado'

export class Status {
  constructor (
    private readonly _status: StatusEnum
  ) {}

  get status(): StatusEnum {
    return this._status
  }
}
