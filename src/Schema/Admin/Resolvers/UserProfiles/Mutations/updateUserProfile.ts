import { USER_PROFILE_ERRORS } from 'Constants/errors'

import UserProfileEntity from 'Entities/UserProfile'

import { UserProfile } from 'Models'

import { AdminPolicy } from 'Policies'

import { UserProfileArgs } from 'Schema/Admin/Args/UserProfiles'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'

export default async function updateUserProfile(
  ctx: Context,
  args: UserProfileArgs,
) {
  await ctx.canAccess({
    resource: RESOURCES.USER_PROFILES,
    action: ACTIONS.UPDATE,
  })

  await AdminPolicy.isAdminOrSuperAdmin(ctx)

  const { userId, ...values } = args

  const profile = await UserProfile.findByPk(userId)

  if (!profile) {
    throw new CommonError(USER_PROFILE_ERRORS.NOT_FOUND)
  }

  return UserProfileEntity.update({ profile, values })
}
