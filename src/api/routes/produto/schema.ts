const categorias = ["Lanche", "Acompanhamento", "Bebida", "Sobremesa"];

const categoria = {
  type: "string",
  enum: categorias,
  errorMessage: {
    enum: `categoria should be one of ${categorias.join(', ')}`
  }
}

export const getProdutosByCategoriaSchema = {
  tags: ["produto"],
  query: {
    type: "object",
    properties: {
      categoria
    },
    required: ["categoria"],
    additionalProperties: false,
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          categoria: { type: "string" },
          nome: { type: "string" },
          preco: { type: "number" },
          descricao: { type: "string" },
        },
        required: ["categoria", "nome", "preco", "descricao"],
      },
    },
  },
};

export const getProdutoByIdSchema = {
  tags: ["produto"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string"
      }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        categoria: { type: "string" },
        nome: { type: "string" },
        preco: { type: "number" },
        descricao: { type: "string" },
      },
    },
  },
};

export const createProdutoSchema = {
  tags: ["produto"],
  body: {
    type: "object",
    properties: {
      categoria,
      nome: { type: "string" },
      preco: { type: "number" },
      descricao: { type: "string" },
    },
    required: ["categoria", "nome", "preco", "descricao"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        categoria: {
          type: "string",
          enum: categorias,
        },
        nome: { type: "string" },
        preco: { type: "number" },
        descricao: { type: "string" },
      },
    },
  },
};

export const editProdutoSchema = {
  tags: ["produto"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string"
      }
    }
  },
  body: {
    type: "object",
    properties: {
      categoria,
      nome: { type: "string" },
      preco: { type: "number" },
      descricao: { type: "string" },
    },
    required: ["categoria", "nome", "preco", "descricao"]
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        categoria: {
          type: "string",
          enum: categorias,
        },
        nome: { type: "string" },
        preco: { type: "number" },
        descricao: { type: "string" },
      },
    },
  },
};

export const deleteProdutoSchema = {
  tags: ["produto"],
  body: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    204: {
      type: "object",
    },
  },
};
