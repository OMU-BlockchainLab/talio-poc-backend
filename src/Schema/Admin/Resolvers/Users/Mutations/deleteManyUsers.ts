import UserEntity from 'Entities/User'

import { AdminPolicy } from 'Policies'

import { DeleteManyUsersArgs } from 'Schema/Admin/Args/Users'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function deleteManyUsers(
  ctx: Context,
  args: DeleteManyUsersArgs,
) {
  await ctx.canAccess({
    resource: RESOURCES.USERS,
    action: ACTIONS.DELETE,
  })

  await Promise.all(
    // eslint-disable-next-line array-callback-return
    args.ids.map(id => AdminPolicy.canDeleteUser(id, ctx)),
  )

  await UserEntity.deleteManyUsers({ ids: args.ids })

  return OkType.success
}
