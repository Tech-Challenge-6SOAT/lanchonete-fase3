export const buscarPedidosSchema = {
  tags: ['pedido'],
  response: {
    200: {
      type: 'array',
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          status: { type: "string" },
          senha: { type: "string" },
          total: { type: "number" },
          cliente: {
            type: "object",
            properties: {
              id: { type: "string" },
              nome: { type: "string" },
              cpf: { type: "string" },
              email: { type: "string" }
            }
          },
          produtos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                nome: { type: "string" },
                categoria: { type: "string" },
                descricao: { type: "string" },
                quantidade: { type: "number" },
                preco: { type: "number" },
              }
            },
          },
          transacao: {
            type: "object",
            properties: {
              id: { type: "string" },
              pagamentoStatus: { type: "string" },
            }
          }
        }
      }
    }
  }
}

export const statusPagamentoSchema = {
  tags: ["pedido"],
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
        statusPagamento: { type: "string" },
      },
    },
  },
};

export const atualizarStatusPedidoSchema = {
  tags: ["pedido"],
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
      status: {
        type: "string",
      },
    },
    required: ["status"],
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string" },
        senha: { type: "string" },
      }
    },
  },
};

export const checkoutSchema = {
  tags: ['pedido'],
  body: {
    type: 'object',
    properties: {
      produtos: {
        type: 'array',
        items: {
          type: "object",
          properties: {
            id: { type: 'string' },
            quantidade: { type: 'number' }
          },
          required: ['id', 'quantidade']
        }
      },
      cpf: { type: 'string' },
    },
    required: ['produtos']
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        senha: { type: "string" },
        qrcode: { type: "string" },
      }
    }
  }
}
