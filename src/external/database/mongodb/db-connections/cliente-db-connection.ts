import { ClienteModel } from "../models";
import { MongoDbConnection } from "./db-connections";

export class ClienteDbConnection extends MongoDbConnection {
  constructor () {
    super(ClienteModel)
  }
}
