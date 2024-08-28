import Ajv from "ajv/dist/2019";

import AjvErrors from "ajv-errors";
import AjvFormats from 'ajv-formats'
import AjvKeywords from 'ajv-keywords'
import { FastifySchemaCompiler } from "fastify";

const ajv = new Ajv({
  allErrors: true,
  $data: true,
  coerceTypes: 'array'
})

AjvErrors(ajv)
AjvFormats(ajv)
AjvKeywords(ajv)

export const validatorCompiler: FastifySchemaCompiler<any> = ({ schema }) => {
  return ajv.compile(schema)
}
