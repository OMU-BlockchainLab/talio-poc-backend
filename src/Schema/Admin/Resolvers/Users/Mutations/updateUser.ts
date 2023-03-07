/* eslint-disable no-param-reassign */
import UserEntity from 'Entities/User'

import { UserRole } from 'Models/User'

import { AdminPolicy } from 'Policies'

import { UpdateUserArgs } from 'Schema/Admin/Args/Users'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function updateUser(ctx: Context, args: UpdateUserArgs) {
  await ctx.canAccess({
    resource: RESOURCES.USERS,
    action: ACTIONS.UPDATE,
  })

  console.log(ctx.user)
  const updateUserId = args.ids[0]
  const user = await UserEntity.getUserById(updateUserId)
  if (user?.roleObj.code.toLowerCase() !== UserRole.sysman) delete args.weight
  await AdminPolicy.canUpdateUser(args, ctx)
  await UserEntity.update(args)

  return OkType.success
}
