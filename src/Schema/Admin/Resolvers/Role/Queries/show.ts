import roleEntity from 'Entities/Role'

import { AdminPolicy } from 'Policies'

import { RoleArgs } from 'Schema/Admin/Args/Role'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function show(ctx: Context, args: RoleArgs) {
  await ctx.canAccess({
    resource: RESOURCES.ROLE,
    action: ACTIONS.VIEW,
  })

  await AdminPolicy.isAdminOrSuperAdmin(ctx)

  const rs = await roleEntity.findById(args.id)
  return rs
}
