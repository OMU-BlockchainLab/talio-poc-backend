import UserEntity from 'Entities/User'

import { UserPolicy } from 'Policies'

import { InviteUserByEmailArgs } from 'Schema/Admin/Args/Users'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function inviteUserByEmail(
  ctx: Context,
  args: InviteUserByEmailArgs,
) {
  await ctx.canAccess({
    resource: RESOURCES.USERS,
    action: ACTIONS.CREATE,
  })

  await UserPolicy.canInviteByEmail(args)

  await UserEntity.createUserByEmail(args)

  return OkType.success
}
