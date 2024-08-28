import { Categoria } from "./categoria";

export class Produto {
  constructor (
    private readonly _id: string,
    private readonly _categoria: Categoria,
    private readonly _nome: string,
    private readonly _preco: number,
    private readonly _descricao: string
  ) {}

  get id(): string {
    return this._id
  }

  get categoria(): Categoria {
    return this._categoria
  }

  get nome(): string {
    return this._nome
  }

  get preco(): number {
    return this._preco
  }

  get descricao(): string {
    return this._descricao
  }
}
