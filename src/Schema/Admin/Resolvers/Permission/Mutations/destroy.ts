import PermissionEntity from 'Entities/Permission'

import { PermissionTypeArgs } from 'Schema/Admin/Args/Role'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function destroy(ctx: Context, args: PermissionTypeArgs) {
  await ctx.canAccess({
    resource: RESOURCES.PERMISSION,
    action: ACTIONS.DELETE,
  })
  return PermissionEntity.destroy(args.id)
}
