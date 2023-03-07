import { Ctx, Field, ObjectType, Root } from 'type-graphql'

import { Role } from 'Models'
import User, { OnboardingStep } from 'Models/User'

import { EmailCredentialPolicy, UserPolicy } from 'Policies'

import RoleType from 'Schema/Types/Role'

import Context from 'Services/Context'

import ContactType from './Contact'
import EmailCredentialType from './EmailCredential'
import InviteType from './Invite'
import UserProfileType from './UserProfile'
import WalletType from './Wallet'

@ObjectType('User')
export default class UserType extends User {
  @Field()
  public onboardingCompleted(@Root() root: User): boolean {
    return !!root.onboardingCompletedAt
  }

  @Field(() => [OnboardingStep], { name: 'onboardingSteps' })
  public onboardingStepsResolver(@Root() root: User) {
    return root.onboardingSteps || []
  }

  @Field(() => Boolean, { nullable: true, name: 'groupOnlyContacts' })
  public async groupOnlyContactsResolver(
    @Root() root: User,
    @Ctx() ctx: Context,
  ) {
    const canView = await UserPolicy.canViewSelf(ctx, root.id)

    if (!canView) return null

    return root.groupOnlyContacts
  }

  @Field(() => EmailCredentialType, { nullable: true })
  public async primaryEmailCredential(@Root() root: User, @Ctx() ctx: Context) {
    // // const canView = await EmailCredentialPolicy.canView(ctx, root.id)

    // if (!canView) return null

    return ctx.dataLoaders.emailCredentials.primaryByUserId.load(root.id)
  }

  @Field(() => [EmailCredentialType], { name: 'emailCredentials' })
  public async emailCredentialsResolver(
    @Root() root: User,
    @Ctx() ctx: Context,
  ) {
    // const canView = await EmailCredentialPolicy.canView(ctx, root.id)

    // if (!canView) return []

    return (
      root.emailCredentials ||
      (await ctx.dataLoaders.emailCredentials.allByUserId.load(root.id)) ||
      []
    )
  }

  @Field(() => UserProfileType, { name: 'profile' })
  public async profileResolver(@Root() root: User, @Ctx() ctx: Context) {
    return root.profile || ctx.dataLoaders.userProfiles.byUserId.load(root.id)
  }

  @Field(() => ContactType, { nullable: true })
  public async contact(@Root() root: User, @Ctx() ctx: Context) {
    if (!ctx.user?.id) return null

    return ctx.dataLoaders.contacts.byCreatorIdAndUserId.load({
      creatorId: ctx.user.id,
      userId: root.id,
    })
  }

  @Field(() => InviteType, { nullable: true })
  public async invite(@Root() root: User, @Ctx() ctx: Context) {
    if (!ctx.user?.id) return null

    return ctx.dataLoaders.invites.byCreatorIdAndInvitedUserId.load({
      creatorId: ctx.user.id,
      invitedUserId: root.id,
    })
  }

  @Field(() => [WalletType])
  public async wallets(@Root() root: User, @Ctx() ctx: Context) {
    return (await ctx.dataLoaders.wallets.allByUserId.load(root.id)) || []
  }

  @Field(() => RoleType, { name: 'roleObj' })
  public async roles(@Root() root: User, @Ctx() ctx: Context) {
    return root.roleObj
  }
}
