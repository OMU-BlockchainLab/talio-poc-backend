import {
  ApolloError,
  AuthenticationError as ApolloAuthenticationError,
  ValidationError as ApolloValidationError,
} from 'apollo-server-koa'

import map from 'lodash/map'

import { GENERIC_ERRORS } from 'Constants/errors'

export interface ValidationErrors {
  [key: string]: string | ValidationErrors
}

function getErrorsString(errors: ValidationErrors): string {
  return map(errors, (message, key) => {
    if (typeof message === 'object') {
      return `${key}: { ${getErrorsString(message)} }`
    }
    return `${key}: ${message}`
  }).join(';')
}

export class ValidationError extends ApolloValidationError {
  public code: number

  public validationErrors: ValidationErrors

  public constructor(validationErrors: ValidationErrors, message?: string) {
    super(message || getErrorsString(validationErrors) || 'Validation Errors')

    this.code = 400

    this.validationErrors = validationErrors
  }
}

export class CommonError extends ApolloError {
  public constructor(
    message?: string,
    code?: string,
    extensions?: Record<string, any>,
  ) {
    super(message || GENERIC_ERRORS.ERROR, code || '400', extensions)
  }
}

export class UnauthorizedError extends ApolloAuthenticationError {
  public constructor(message?: string) {
    super(message || GENERIC_ERRORS.NOT_AUTHORIZED)
  }
}
