import { Logger } from "../../logs/logger"
import mongoose from "mongoose"

const connection = () => {
  const conn = mongoose.createConnection(String(process.env.MONGODB_URL))

  conn.once('connected', () => {
    Logger.info('MongoDB is connected!')
  })

  conn.on('error', (err: Error) => {
    Logger.error(`MongoDBconnection error: ${err.message}`)
  })

  conn.on('disconnected', () => {
    Logger.error('MongoDB disconnected')
  })

  return conn
}

export const ObjectId = mongoose.Types.ObjectId;
export const mongoConnection = connection()
