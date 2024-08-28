export type CategoriaEnum = 'Lanche' | 'Acompanhamento' | 'Bebida' | 'Sobremesa'

export class Categoria {
  constructor (
    private readonly _categoria: CategoriaEnum
  ) {}

  get categoria(): CategoriaEnum {
    return this._categoria
  }
}
