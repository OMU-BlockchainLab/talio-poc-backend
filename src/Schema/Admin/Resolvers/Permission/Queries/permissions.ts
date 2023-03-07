import PermissionEntity from 'Entities/Permission'

import { AdminPolicy } from 'Policies'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function permissions(ctx: Context) {
  await ctx.canAccess({
    resource: RESOURCES.PERMISSION,
    action: ACTIONS.VIEW,
  })

  await AdminPolicy.isAdminOrSuperAdmin(ctx)

  const rs = await PermissionEntity.findAll({})
  return rs
}
