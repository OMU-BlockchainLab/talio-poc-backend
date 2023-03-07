import UserEntity from 'Entities/User'

import { AdminPolicy } from 'Policies'

import { UsersArgs } from 'Schema/Admin/Args/Users'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function users(ctx: Context, args: UsersArgs) {
  const user = await ctx.canAccess({
    resource: RESOURCES.USERS,
    action: ACTIONS.VIEW,
  })

  //   await AdminPolicy.isAdminOrSuperAdmin(ctx)

  return UserEntity.getUserList({
    ...args,
    currentWeight: user?.weight,
    roleCode: user.roleObj.code,
    excludeIds: [user.id],
  })
}
