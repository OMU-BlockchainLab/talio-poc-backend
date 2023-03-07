import Context from 'Services/Context'
import { UnauthorizedError } from 'Services/Errors'

export default async function isAuthorized(ctx: Context, message?: string) {
  if (!ctx.user?.id) {
    throw new UnauthorizedError(message)
  }

  return ctx.user
}
