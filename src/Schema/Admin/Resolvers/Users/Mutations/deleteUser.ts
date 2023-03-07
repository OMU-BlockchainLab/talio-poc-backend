import UserEntity from 'Entities/User'

import { AdminPolicy } from 'Policies'

import { DeleteUserArgs } from 'Schema/Admin/Args/Users'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function deleteUser(ctx: Context, args: DeleteUserArgs) {
  await ctx.canAccess({
    resource: RESOURCES.USERS,
    action: ACTIONS.DELETE,
  })

  await AdminPolicy.canDeleteUser(args.id, ctx)

  await UserEntity.delete({ id: args.id })

  return OkType.success
}
