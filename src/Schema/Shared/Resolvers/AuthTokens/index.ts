import { Args, Ctx, Mutation, Resolver } from 'type-graphql'

import { RefreshTokenArgs } from 'Schema/Shared/Args/AuthTokens'

import AuthTokenType from 'Schema/Types/AuthToken'

import Context from 'Services/Context'

import mutations from './Mutations'

@Resolver()
export default class AuthTokensResolver {
  @Mutation(() => AuthTokenType)
  public refreshToken(@Ctx() ctx: Context, @Args() args: RefreshTokenArgs) {
    return mutations.refreshToken(ctx, args)
  }
}
