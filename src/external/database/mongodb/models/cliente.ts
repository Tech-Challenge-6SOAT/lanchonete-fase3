import mongoose from "mongoose";
import { mongoConnection } from "../index";

const Schema = new mongoose.Schema(
  {
    nome: {
      required: true,
      type: String,
    },
    cpf: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

Schema.index({ cpf: 1 }, { unique: true });

const DUPLICATE_KEY_CODE = 11000;

function duplicate(err: any, _doc: any, next: any): void {
  if (err.name === 'MongoServerError' && err.code === DUPLICATE_KEY_CODE) {
    next(new Error('CPF já existe'));
  }

  next();
}

Schema.post('save', duplicate);

export const ClienteModel = mongoConnection.model("clientes", Schema);
