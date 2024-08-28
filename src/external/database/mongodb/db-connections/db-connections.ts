import { Model } from "mongoose";
import { DbConnection } from "../../../../interfaces/db/connection";

export class MongoDbConnection implements DbConnection {
  constructor (
    private readonly model: Model<any>
  ) {}

  async criar<T = any>(params: Object): Promise<T> {
    const newModel = new this.model(params);
    await newModel.save();
    return { _id: newModel._id } as T
  }

  async editar<T = any>(params: { id: string, value: Object }): Promise<T | null> {
    const { id, value } = params
    return this.model.findByIdAndUpdate(id, value, { new: true })
  }

  async buscar<T = any>(params: Object): Promise<T[]> {
    return this.model.find(params)
  }

  async buscarUm<T = any>(params: Object): Promise<T | null> {
    return this.model.findOne(params)
  }

  async excluir(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id)
  }

  async buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]> {
    return []
  }
}
