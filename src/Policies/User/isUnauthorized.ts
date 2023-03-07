import { AUTH_ERRORS } from 'Constants/errors'

import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'

export default async function isUnauthorized(ctx: Context, message?: string) {
  if (ctx.user?.id) {
    throw new CommonError(message || AUTH_ERRORS.USER_ALREADY_AUTHORIZED)
  }
}
