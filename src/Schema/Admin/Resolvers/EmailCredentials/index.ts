import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import {
  ChangeEmailPasswordArgs,
  CheckEmailConfirmationTokenArgs,
  CheckEmailPasswordTokenArgs,
  ConfirmEmailArgs,
  RequestChangeEmailPasswordArgs,
  SignInByEmailArgs,
  SignUpByEmailArgs,
} from 'Schema/Admin/Args/EmailCredentials'

import AuthTokenType from 'Schema/Types/AuthToken'
import OkType from 'Schema/Types/Ok'

import Context from 'Services/Context'

import mutations from './Mutations'
import queries from './Queries'

@Resolver()
export default class EmailCredentialsResolver {
  @Query(() => OkType)
  public checkEmailConfirmationToken(
    @Args() args: CheckEmailConfirmationTokenArgs,
  ) {
    return queries.checkEmailConfirmationToken(args)
  }

  @Query(() => OkType)
  public checkEmailPasswordToken(@Args() args: CheckEmailPasswordTokenArgs) {
    return queries.checkChangeEmailPasswordToken(args)
  }

  @Mutation(() => AuthTokenType)
  public signInByEmail(@Ctx() ctx: Context, @Args() args: SignInByEmailArgs) {
    return mutations.signInByEmail(ctx, args)
  }

  @Mutation(() => AuthTokenType)
  public confirmEmail(@Ctx() ctx: Context, @Args() args: ConfirmEmailArgs) {
    return mutations.confirmEmail(ctx, args)
  }

  @Mutation(() => OkType)
  public requestChangeEmailPassword(
    @Args() args: RequestChangeEmailPasswordArgs,
  ) {
    return mutations.requestChangeEmailPassword(args)
  }

  @Mutation(() => OkType)
  public changeEmailPassword(
    @Ctx() ctx: Context,
    @Args() args: ChangeEmailPasswordArgs,
  ) {
    return mutations.changeEmailPassword(ctx, args)
  }

  @Mutation(() => OkType)
  public signUp(@Ctx() ctx: Context, @Args() args: SignUpByEmailArgs) {
    return mutations.signUpByEmail(ctx, args)
  }
}
