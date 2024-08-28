const statusEnum = ["paid", "refused", "waiting_payment"];

export const atualizarStatusPagamentoSchema = {
  tags: ["webhook"],
  body: {
    type: "object",
    properties: {
      id: { type: "string" },
      status: {
        type: "string",
        enum: statusEnum,
        errorMessage: {
          enum: `status should be one of ${statusEnum.join(', ')}`
        }
      }
    },
    required: ["id", "status"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
