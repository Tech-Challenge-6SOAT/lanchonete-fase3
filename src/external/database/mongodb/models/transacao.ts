import mongoose from "mongoose";
import { mongoConnection } from "../index";

const Schema = new mongoose.Schema(
  {
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pedidos',
      required: true,
    },
    valor: {
      required: true,
      type: Number
    },
    pagamentoStatus: {
      required: true,
      type: String
    },
    idTransacaoExterna: {
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

export const TransacaoModel = mongoConnection.model("transacoes", Schema);
