import { GENERIC_ERRORS } from 'Constants/errors'

import RoleEntity from 'Entities/Role'

import { UserRole } from 'Models/User'

import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'
import { getRoleIdByRoleName } from 'Services/RBAC'

export default async function isSuperAdmin(ctx: Context, throwError = true) {
  const condition =
    ctx.user?.roleId === (await getRoleIdByRoleName(UserRole.superAdmin))

  if (throwError && !condition) {
    throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
  }

  return condition
}
