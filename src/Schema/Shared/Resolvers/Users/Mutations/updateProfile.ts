import UserProfileEntity from 'Entities/UserProfile'

import { UpdateProfileArgs } from 'Schema/Shared/Args/Users'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function updateProfile(
  ctx: Context,
  args: UpdateProfileArgs,
) {
  const user = await ctx.canAccess({
    resource: RESOURCES.OWN_PROFILE,
    action: ACTIONS.UPDATE,
  })

  const profile = await ctx.dataLoaders.userProfiles.byUserId.load(user?.id)

  return UserProfileEntity.update({ profile, values: args })
}
