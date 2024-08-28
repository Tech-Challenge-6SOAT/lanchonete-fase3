import { ProdutoModel } from "../models";
import { MongoDbConnection } from "./db-connections";

export class ProdutoDbConnection extends MongoDbConnection {
  constructor () {
    super(ProdutoModel)
  }
}
