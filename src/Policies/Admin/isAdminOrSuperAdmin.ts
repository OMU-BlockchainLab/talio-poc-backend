import { GENERIC_ERRORS } from 'Constants/errors'

import { UserRole } from 'Models/User'

import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'
import { getRoleNameByRoleId } from 'Services/RBAC'

const ADMIN_ROLES = [UserRole.superAdmin, UserRole.admin]

export default async function isAdminOrSuperAdmin(
  ctx: Context,
  throwError = true,
) {
  const condition =
    ctx.user?.roleId &&
    ADMIN_ROLES.includes(await getRoleNameByRoleId(ctx.user?.roleId))

  if (throwError && !condition) {
    throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
  }

  return condition
}
