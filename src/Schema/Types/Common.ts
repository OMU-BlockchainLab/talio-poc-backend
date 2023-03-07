import { GraphQLScalarType, Kind } from 'graphql'

function toObject(value: Record<string, unknown> | string) {
  if (typeof value === 'object') {
    return value
  }

  if (value.charAt(0) === '{') {
    return JSON.parse(value)
  }
  return null
}

export const ObjectScalarType = new GraphQLScalarType({
  name: 'Object',
  description: 'Arbitrary object',
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: ast => {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value)
      case Kind.OBJECT:
        throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`)
      default:
        return null
    }
  },
})
