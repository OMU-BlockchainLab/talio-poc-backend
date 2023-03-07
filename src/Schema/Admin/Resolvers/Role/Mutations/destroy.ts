import roleEntity from 'Entities/Role'

import { AdminPolicy } from 'Policies'

import { RoleArgs } from 'Schema/Admin/Args/Role'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function destroy(ctx: Context, args: RoleArgs) {
  await ctx.canAccess({
    resource: RESOURCES.ROLE,
    action: ACTIONS.DELETE,
  })

  await AdminPolicy.isAdminOrSuperAdmin(ctx)

  const rs = await roleEntity.destroy(args.id)
  return { ok: true }
}
