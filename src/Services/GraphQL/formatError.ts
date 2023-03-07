import { GraphQLError } from 'graphql'
import { JsonWebTokenError } from 'jsonwebtoken'
import { ArgumentValidationError } from 'type-graphql'

import identity from 'lodash/identity'
import map from 'lodash/map'
import pickBy from 'lodash/pickBy'

import { GENERIC_ERRORS } from 'Constants/errors'

import { CommonError, UnauthorizedError } from 'Services/Errors'
import { createScopedLog } from 'Services/Log'
import prettyError from 'Services/PrettyError'

const log = createScopedLog('[GraphQL]')

export default function formatError(error: GraphQLError) {
  const { originalError } = error

  let { message } = error
  const { extensions } = error

  let validationErrors

  if (originalError instanceof ArgumentValidationError) {
    validationErrors = map(
      extensions?.exception?.validationErrors,
      exception => ({
        argument: exception.property,
        messages: exception.constraints,
      }),
    )
    message = GENERIC_ERRORS.VALIDATION
  }

  if (
    originalError instanceof CommonError ||
    originalError instanceof UnauthorizedError ||
    originalError instanceof ArgumentValidationError ||
    originalError instanceof JsonWebTokenError
  ) {
    log.warn(`${originalError.name}: ${originalError.message}`)
  } else {
    log.error(prettyError(originalError || error))
  }

  return { message, ...pickBy({ validationErrors }, identity) }
}
