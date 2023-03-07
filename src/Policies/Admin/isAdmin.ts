import { GENERIC_ERRORS } from 'Constants/errors'

import { UserRole } from 'Models/User'

import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'
import { getRoleIdByRoleName } from 'Services/RBAC'

export default async function isAdmin(ctx: Context, throwError = true) {
  const condition =
    ctx.user?.roleId === (await getRoleIdByRoleName(UserRole.admin))

  if (throwError && !condition) {
    throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
  }

  return condition
}
