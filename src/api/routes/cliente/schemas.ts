export const getClienteSchema = {
  tags: ['cliente'],
  query: {
    type: "object",
    properties: {
      cpf: {
        type: "string",
      },
    },
    required: ["cpf"],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        cpf: { type: "string" },
        email: { type: "string" },
      }
    }
  }
};

export const createClienteSchema = {
  tags: ['cliente'],
  body: {
    type: "object",
    properties: {
      nome: { type: "string" },
      cpf: { type: "string" },
      email: { type: "string" },
    },
    required: ["nome", "cpf", "email"],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        cpf: { type: "string" },
        email: { type: "string" },
      }
    }
  }
};
