import { GENERIC_ERRORS } from 'Constants/errors'

import User, { UserRole, UserState } from 'Models/User'

import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'
import { getRoleIdByRoleName } from 'Services/RBAC'

export default async function canDeleteUser(
  id: string,
  ctx: Context,
  throwError = true,
) {
  let canDelete = false
  const superAdminCode = await getRoleIdByRoleName(UserRole.superAdmin)

  switch (ctx.user?.roleId) {
    case superAdminCode:
      canDelete = true
      break
    default:
      break
  }

  const deletedUserRoleId: string = (await User.findByPk(id))?.getDataValue(
    'roleId',
  )

  if (deletedUserRoleId === superAdminCode) {
    throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
  }

  if (throwError && !canDelete) {
    throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
  }
  return canDelete
}
