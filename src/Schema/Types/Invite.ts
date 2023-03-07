import { Ctx, Field, ObjectType, Root } from 'type-graphql'

import { Invite } from 'Models'

import Context from 'Services/Context'

import UserType from './User'

@ObjectType('Invite')
export default class InviteType extends Invite {
  @Field(() => String, { nullable: true, name: 'inviteToken' })
  public async inviteTokenResolver(@Root() root: Invite, @Ctx() ctx: Context) {
    if (![root.invitedUserId, root.creatorId].includes(ctx.user?.id))
      return null

    return root.inviteToken
  }

  @Field(() => UserType, { nullable: true })
  public async invitedBy(@Root() root: Invite, @Ctx() ctx: Context) {
    return root.creator || ctx.dataLoaders.users.byId.load(root.creatorId)
  }

  @Field(() => UserType, { nullable: true, name: 'invitedUser' })
  public async invitedUserResolver(@Root() root: Invite, @Ctx() ctx: Context) {
    if (!root.invitedUserId) return null

    return (
      root.invitedUser || ctx.dataLoaders.users.byId.load(root.invitedUserId)
    )
  }
}
