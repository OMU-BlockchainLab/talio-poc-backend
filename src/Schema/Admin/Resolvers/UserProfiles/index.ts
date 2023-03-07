import { Args, Ctx, Mutation, Resolver } from 'type-graphql'

import { UserProfileArgs } from 'Schema/Admin/Args/UserProfiles'

import UserProfileType from 'Schema/Types/UserProfile'

import Context from 'Services/Context'

import mutations from './Mutations'

@Resolver(() => UserProfileType)
export default class UserProfilesResolver {
  @Mutation(() => UserProfileType)
  public async updateUserProfile(
    @Ctx() ctx: Context,
    @Args() args: UserProfileArgs,
  ) {
    return mutations.updateUserProfile(ctx, args)
  }
}
