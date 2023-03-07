import userEntity from 'Entities/User'

import { UserArgs } from 'Schema/Admin/Args/Users'

import Context from 'Services/Context'

export default async function users(ctx: Context, args: UserArgs) {
  //   await ctx.canAccess({
  //     resource: RESOURCES.User,
  //     action: ACTIONS.VIEW,
  //   })

  //   await AdminPolicy.isAdminOrSuperAdmin(ctx)

  return userEntity.getUserById(args.id)
}
