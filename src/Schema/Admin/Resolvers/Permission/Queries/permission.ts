import PermissionEntity from 'Entities/Permission'

import { AdminPolicy } from 'Policies'

import { PermissionTypeArgs } from 'Schema/Admin/Args/Role'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function permission(
  ctx: Context,
  args: PermissionTypeArgs,
) {
  await ctx.canAccess({
    resource: RESOURCES.PERMISSION,
    action: ACTIONS.VIEW,
  })

  await AdminPolicy.isAdminOrSuperAdmin(ctx)

  const rs = await PermissionEntity.findById(args.id)
  return rs
}
