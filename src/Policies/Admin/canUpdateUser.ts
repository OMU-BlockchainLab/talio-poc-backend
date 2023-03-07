import { GENERIC_ERRORS } from 'Constants/errors'

import { UserRole } from 'Models/User'

import { UpdateUserArgs } from 'Schema/Admin/Args/Users'

import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'
import { getRoleNameByRoleId } from 'Services/RBAC'

async function canUpdateSuperAdminByOther(id: string) {
  if ((await getRoleNameByRoleId(id)) === UserRole.superAdmin) {
    return false
  }

  return true
}

export default async function canUpdateUser(
  updateItemsArgs: UpdateUserArgs,
  ctx: Context,
  throwError = true,
) {
  const roleCode = await getRoleNameByRoleId(ctx.user?.id)
  if (roleCode === UserRole.superAdmin) return true

  const listUpdateItems = await Promise.all(
    updateItemsArgs.ids.map(x => canUpdateSuperAdminByOther(x)),
  )
  const canUpdate = !listUpdateItems.includes(false)

  if (throwError && !canUpdate) {
    throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
  }
  return true
}
